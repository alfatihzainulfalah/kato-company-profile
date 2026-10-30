<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { items } from "../data/items";

const viewportRef = ref(null);
const trackRef = ref(null);

const activePage = ref(0);
const pageCount = ref(1);
let autoplayTimer = null;
let scrollRaf = null;
let resizeTimer = null;

const getPageCount = () => {
  const viewport = viewportRef.value;
  const track = trackRef.value;
  if (!viewport || !track || !viewport.clientWidth) return 1;
  return Math.max(1, Math.round(track.scrollWidth / viewport.clientWidth));
};

const goToPage = (page, smooth = true) => {
  const viewport = viewportRef.value;
  if (!viewport) return;
  const target = Math.max(0, Math.min(page, pageCount.value - 1));
  viewport.scrollTo({ left: target * viewport.clientWidth, behavior: smooth ? "smooth" : "auto" });
  activePage.value = target;
};

const goNext = () => {
  if (activePage.value >= pageCount.value - 1) goToPage(0);
  else goToPage(activePage.value + 1);
};

const goPrev = () => {
  if (activePage.value <= 0) goToPage(pageCount.value - 1);
  else goToPage(activePage.value - 1);
};

const stopAutoplay = () => {
  if (autoplayTimer) clearInterval(autoplayTimer);
  autoplayTimer = null;
};

const startAutoplay = () => {
  stopAutoplay();
  autoplayTimer = setInterval(goNext, 4200);
};

const restartAutoplay = () => {
  stopAutoplay();
  startAutoplay();
};

const onDotClick = (page) => {
  goToPage(page);
  restartAutoplay();
};

const onNextClick = () => {
  goNext();
  restartAutoplay();
};

const onPrevClick = () => {
  goPrev();
  restartAutoplay();
};

const onScroll = () => {
  if (scrollRaf) return;
  scrollRaf = requestAnimationFrame(() => {
    const viewport = viewportRef.value;
    if (viewport && viewport.clientWidth) {
      activePage.value = Math.round(viewport.scrollLeft / viewport.clientWidth);
    }
    scrollRaf = null;
  });
};

const onResize = () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    pageCount.value = getPageCount();
    goToPage(Math.min(activePage.value, pageCount.value - 1), false);
  }, 200);
};

onMounted(() => {
  pageCount.value = getPageCount();
  const viewport = viewportRef.value;
  viewport.addEventListener("scroll", onScroll);
  ["mouseenter", "focusin", "touchstart"].forEach((evt) => viewport.addEventListener(evt, stopAutoplay, { passive: true }));
  ["mouseleave", "focusout", "touchend"].forEach((evt) => viewport.addEventListener(evt, startAutoplay, { passive: true }));
  window.addEventListener("resize", onResize);
  startAutoplay();
});

onUnmounted(() => {
  stopAutoplay();
  clearTimeout(resizeTimer);
  if (scrollRaf) cancelAnimationFrame(scrollRaf);
  window.removeEventListener("resize", onResize);
});
</script>

<template>
  <section id="brands" class="section brands-section">
    <div class="section-heading" v-reveal>
      <div>
        <div class="section-kicker">02b — PRODUK UNGGULAN</div>
        <h2>Brand <em>KATO.</em></h2>
      </div>
      <p>Setiap brand dirancang untuk kebutuhan yang berbeda, dengan kualitas yang sama tingginya.</p>
    </div>
    <div class="brands-carousel" v-reveal>
      <div class="carousel-viewport" ref="viewportRef">
        <div class="carousel-track" ref="trackRef">
          <div
            v-for="(item, i) in items"
            :key="item.name"
            class="brand-card"
            v-reveal
            :style="{ '--delay': `${i * 60}ms` }"
          >
            <img :src="item.image" :alt="item.name" class="brand-card-img" />
            <h3>{{ item.name }}</h3>
            <span class="brand-card-material">{{ item.material }}</span>
            <ul class="brand-card-features">
              <li v-for="f in item.features" :key="f">{{ f }}</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="carousel-controls">
        <button type="button" class="carousel-btn carousel-prev" aria-label="Produk sebelumnya" @click="onPrevClick">
          <span aria-hidden="true">‹</span>
        </button>
        <div class="carousel-dots">
          <button
            v-for="page in pageCount"
            :key="page"
            type="button"
            class="carousel-dot"
            :class="{ active: activePage === page - 1 }"
            :aria-label="`Ke halaman ${page}`"
            @click="onDotClick(page - 1)"
          ></button>
        </div>
        <button type="button" class="carousel-btn carousel-next" aria-label="Produk berikutnya" @click="onNextClick">
          <span aria-hidden="true">›</span>
        </button>
      </div>
    </div>
  </section>
</template>
