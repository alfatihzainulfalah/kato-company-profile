<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { items } from "../data/items";

const viewportRef = ref(null);
const trackRef = ref(null);
const activePage = ref(0);
const pageCount = ref(1);
const isPaused = ref(false);
const isHovered = ref(false);
const hasFocus = ref(false);
const isInView = ref(false);
const isPageVisible = ref(false);
const prefersReducedMotion = ref(false);
const canAutoplay = computed(() =>
  pageCount.value > 1 && isInView.value && isPageVisible.value &&
  !isPaused.value && !isHovered.value && !hasFocus.value && !prefersReducedMotion.value,
);
const formatNumber = (number) => String(number).padStart(2, "0");
let pageOffsets = [0];
let autoplayTimer = null;
let scrollRaf = null;
let resizeObserver = null;
let visibilityObserver = null;
let motionPreference = null;

const goToPage = (page, smooth = true) => {
  const viewport = viewportRef.value;
  if (!viewport) return;
  const target = (page + pageCount.value) % pageCount.value;
  viewport.scrollTo({
    left: pageOffsets[target],
    behavior: smooth && !prefersReducedMotion.value ? "smooth" : "instant",
  });
};

const updateLayout = () => {
  const viewport = viewportRef.value;
  const track = trackRef.value;
  if (!viewport || !track) return;
  const cardsPerPage = Number(getComputedStyle(track).getPropertyValue("--cards-per-page")) || 1;
  const cards = Array.from(track.children);
  const maxScroll = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
  // Measure real card positions so the final page and mobile swipe stay aligned.
  pageOffsets = cards.filter((_, index) => index % cardsPerPage === 0)
    .map((card) => Math.min(card.offsetLeft, maxScroll));
  if (!pageOffsets.length) pageOffsets = [0];
  pageCount.value = pageOffsets.length;
  activePage.value = Math.min(activePage.value, pageCount.value - 1);
  goToPage(activePage.value, false);
};

const onScroll = () => {
  if (scrollRaf !== null) return;
  scrollRaf = requestAnimationFrame(() => {
    const left = viewportRef.value?.scrollLeft ?? 0;
    activePage.value = pageOffsets.reduce((nearest, offset, index) =>
      Math.abs(offset - left) < Math.abs(pageOffsets[nearest] - left) ? index : nearest, 0);
    scrollRaf = null;
  });
};

const stopAutoplay = () => {
  if (autoplayTimer !== null) clearInterval(autoplayTimer);
  autoplayTimer = null;
};

const syncAutoplay = () => {
  stopAutoplay();
  if (canAutoplay.value) {
    autoplayTimer = setInterval(() => goToPage(activePage.value + 1), 6000);
  }
};

const onFocusOut = (event) => {
  hasFocus.value = event.currentTarget.contains(event.relatedTarget);
};
const onVisibilityChange = () => {
  isPageVisible.value = document.visibilityState === "visible";
};
const onMotionChange = (event) => {
  prefersReducedMotion.value = event.matches;
};
const onKeydown = (event) => {
  if (event.target !== viewportRef.value) return;
  if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
    event.preventDefault();
    goToPage(activePage.value + (event.key === "ArrowRight" ? 1 : -1));
  }
};

watch([canAutoplay, activePage], syncAutoplay);

onMounted(() => {
  motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
  prefersReducedMotion.value = motionPreference.matches;
  motionPreference.addEventListener("change", onMotionChange);
  document.addEventListener("visibilitychange", onVisibilityChange);
  onVisibilityChange();
  updateLayout();
  resizeObserver = new ResizeObserver(updateLayout);
  resizeObserver.observe(viewportRef.value);
  visibilityObserver = new IntersectionObserver(([entry]) => {
    isInView.value = entry.isIntersecting;
  }, { threshold: 0.2 });
  visibilityObserver.observe(viewportRef.value);
});

onUnmounted(() => {
  stopAutoplay();
  if (scrollRaf !== null) cancelAnimationFrame(scrollRaf);
  resizeObserver?.disconnect();
  visibilityObserver?.disconnect();
  motionPreference?.removeEventListener("change", onMotionChange);
  document.removeEventListener("visibilitychange", onVisibilityChange);
});
</script>

<template>
  <section id="brands" class="section brands-section" aria-labelledby="brands-title">
    <div class="brands-heading" v-reveal>
      <div>
        <p class="brands-eyebrow">PILIHAN PRODUK KAMI</p>
        <h2 id="brands-title" class="brands-title">
          <span>Brand</span>
          <span class="brands-logo">
            <img src="/assets/Logo-KATO1.svg" alt="KATO" width="1080" height="1080" />
          </span>
        </h2>
      </div>
    </div>

    <div
      class="brands-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="Koleksi brand KATO"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
      @focusin="hasFocus = true"
      @focusout="onFocusOut"
    >
      <div
        id="brands-viewport"
        ref="viewportRef"
        class="brands-viewport"
        tabindex="0"
        aria-label="Daftar brand. Gunakan tombol panah kiri dan kanan untuk menggeser."
        @scroll.passive="onScroll"
        @keydown="onKeydown"
        @touchstart.passive="stopAutoplay"
        @touchend.passive="syncAutoplay"
        @touchcancel.passive="syncAutoplay"
      >
        <div ref="trackRef" class="brands-track">
          <article
            v-for="(item, index) in items"
            :key="item.name"
            class="brands-card"
            :aria-labelledby="'brand-name-' + index"
          >
            <div class="brands-card__image-wrap">
              <img
                :src="item.image"
                :alt="'Produk ' + item.name"
                class="brands-card__image"
                width="900"
                height="575"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div class="brands-card__body">
              <div class="brands-card__heading">
                <h3 :id="'brand-name-' + index">{{ item.name }}</h3>
                <span class="brands-card__number" aria-hidden="true">{{ formatNumber(index + 1) }}</span>
              </div>
              <p class="brands-card__material"><span>Bahan</span> {{ item.material }}</p>
              <ul class="brands-card__features">
                <li v-for="feature in item.features" :key="feature">{{ feature }}</li>
              </ul>
              <a href="#contact" class="brands-card__link" :aria-label="'Tanyakan produk ' + item.name">
                <span>Tanya produk</span>
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M5 12h14m-6-6 6 6-6 6" />
                </svg>
              </a>
            </div>
          </article>
        </div>
      </div>

      <div class="brands-footer">
        <p class="brands-total"><span>{{ formatNumber(items.length) }}</span> pilihan brand</p>
        <div v-if="pageCount > 1" class="brands-controls">
          <button
            type="button"
            class="brands-arrow"
            aria-label="Brand sebelumnya"
            aria-controls="brands-viewport"
            @click="goToPage(activePage - 1)"
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M19 12H5m6-6-6 6 6 6" />
            </svg>
          </button>
          <p class="brands-counter" :aria-live="canAutoplay ? 'off' : 'polite'" aria-atomic="true">
            <span class="brands-sr-only">Halaman </span>
            {{ formatNumber(activePage + 1) }}
            <span class="brands-counter__divider" aria-hidden="true">/</span>
            <span class="brands-sr-only"> dari </span>
            <span class="brands-counter__total">{{ formatNumber(pageCount) }}</span>
          </p>
          <button
            type="button"
            class="brands-arrow"
            aria-label="Brand berikutnya"
            aria-controls="brands-viewport"
            @click="goToPage(activePage + 1)"
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12h14m-6-6 6 6-6 6" />
            </svg>
          </button>
          <button
            v-if="!prefersReducedMotion"
            type="button"
            class="brands-pause"
            :aria-label="isPaused ? 'Lanjutkan pergantian brand otomatis' : 'Jeda pergantian brand otomatis'"
            :aria-pressed="isPaused"
            aria-controls="brands-viewport"
            @click="isPaused = !isPaused"
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path v-if="isPaused" d="m9 5 10 7-10 7V5Z" />
              <path v-else d="M9 5v14M15 5v14" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.brands-section {
  --brands-ink: #081e32;
  --brands-muted: #65716f;
  --brands-line: #dde2dc;
  background: #fafaf7;
}
.brands-section::before { content: none; }
.brands-heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 32px;
  margin-bottom: 40px;
}
.brands-eyebrow {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0 0 22px;
  color: #49635e;
  font-size: 10px;
  font-weight: 700;
  line-height: 1.6;
  letter-spacing: 1.8px;
}
.brands-eyebrow::before {
  width: 26px;
  height: 2px;
  background: #b38332;
  content: "";
}
.brands-section .brands-title {
  display: flex;
  align-items: center;
  gap: 0.28em;
  margin: 0;
  font-family: "Outfit", sans-serif;
  font-size: clamp(42px, 4.2vw, 64px);
  font-weight: 600;
  line-height: 1.1;
  letter-spacing: -1.8px;
}
.brands-logo {
  position: relative;
  display: block;
  width: 2.65em;
  height: 0.74em;
  flex-shrink: 0;
  overflow: hidden;
}
.brands-logo img {
  position: absolute;
  top: 50%;
  left: 50%;
  /* Fit the artwork inside the square SVG, preserving its original proportions. */
  width: calc(100% * 1080 / 840);
  height: auto;
  transform: translate(-50%, -50%);
}
.brands-description {
  max-width: 330px;
  margin: 0 0 2px;
  color: var(--brands-muted);
  font-size: 14px;
  line-height: 1.85;
}
.brands-viewport {
  overflow-x: auto;
  overscroll-behavior-x: contain;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
}
.brands-viewport::-webkit-scrollbar { display: none; }
.brands-track {
  --cards-per-page: 3;
  position: relative;
  display: flex;
  align-items: stretch;
  gap: 24px;
}
.brands-card {
  display: flex;
  flex: 0 0 calc((100% - 48px) / 3);
  flex-direction: column;
  min-width: 0;
  overflow: hidden;
  border: 1px solid var(--brands-line);
  border-radius: 8px;
  background: #fff;
  scroll-snap-align: start;
  transition: border-color 200ms ease;
}
.brands-card:hover,
.brands-card:focus-within { border-color: #a6b4a9; }
.brands-card__image-wrap {
  aspect-ratio: 4 / 3;
  margin: 9px 9px 0;
  overflow: hidden;
  border-radius: 3px;
  background: #eeeae1;
}
.brands-card__image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 450ms cubic-bezier(0.22, 1, 0.36, 1);
}
.brands-card:hover .brands-card__image { transform: scale(1.035); }
.brands-card__body {
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 24px 24px 0;
}
.brands-card__heading {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
}
.brands-card h3 {
  margin: 0;
  font-family: "Outfit", sans-serif;
  font-size: clamp(20px, 1.65vw, 25px);
  font-weight: 600;
  line-height: 1.25;
  letter-spacing: -0.4px;
}
.brands-card__number {
  color: #89918a;
  font-size: 10px;
  font-variant-numeric: tabular-nums;
}
.brands-card__material {
  display: flex;
  gap: 8px;
  margin: 10px 0 0;
  color: #365b50;
  font-size: 11px;
  font-weight: 600;
  line-height: 1.6;
}
.brands-card__material > span {
  color: var(--brands-muted);
  font-weight: 400;
}
.brands-card__features {
  display: grid;
  gap: 9px;
  margin: 23px 0 26px;
  padding: 0;
  list-style: none;
}
.brands-card__features li {
  display: flex;
  align-items: baseline;
  gap: 10px;
  color: #566460;
  font-size: 12px;
  line-height: 1.6;
}
.brands-card__features li::before {
  width: 5px;
  height: 5px;
  flex: 0 0 5px;
  align-self: start;
  margin-top: 7px;
  border-radius: 50%;
  background: #b38332;
  content: "";
}
.brands-card__link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  min-height: 59px;
  margin-top: auto;
  border-top: 1px solid #e8ebe5;
  color: var(--brands-ink);
  font-size: 12px;
  font-weight: 600;
  transition: color 180ms ease;
}
.brands-card__link:hover { color: #0b7565; }
.brands-section svg {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  stroke: currentColor;
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.brands-card__link svg { transition: transform 180ms ease; }
.brands-card__link:hover svg { transform: translateX(3px); }
.brands-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-top: 28px;
  padding-top: 22px;
  border-top: 1px solid var(--brands-line);
}
.brands-total {
  margin: 0;
  color: var(--brands-muted);
  font-size: 12px;
  line-height: 1.6;
}
.brands-total > span {
  margin-right: 7px;
  color: var(--brands-ink);
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}
.brands-controls {
  display: flex;
  align-items: center;
  gap: 12px;
}
.brands-arrow,
.brands-pause {
  display: grid;
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  place-items: center;
  padding: 0;
  border: 1px solid #cbd2c9;
  border-radius: 50%;
  background: transparent;
  color: var(--brands-ink);
  cursor: pointer;
  transition: background 180ms ease, border-color 180ms ease;
}
.brands-arrow:hover,
.brands-pause:hover {
  border-color: #98a69a;
  background: #eef0e9;
}
.brands-pause {
  width: 36px;
  border-color: transparent;
  border-radius: 4px;
  color: var(--brands-muted);
}
.brands-counter {
  display: flex;
  gap: 10px;
  margin: 0 3px;
  font-size: 12px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}
.brands-counter__divider { color: #a5afa3; }
.brands-counter__total { color: var(--brands-muted); font-weight: 400; }
.brands-section :is(button, a, [tabindex]):focus-visible {
  outline: 2px solid #0b7565;
  outline-offset: -3px;
}
.brands-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
@media (max-width: 1100px) {
  .brands-track { --cards-per-page: 2; gap: 20px; }
  .brands-card { flex-basis: calc((100% - 20px) / 2); }
  .brands-card h3 { font-size: 24px; }
}
@media (max-width: 760px) {
  .brands-heading {
    align-items: start;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 28px;
  }
  .brands-eyebrow { margin-bottom: 18px; font-size: 9px; }
  .brands-section .brands-title {
    font-size: clamp(38px, 8.5vw, 50px);
    letter-spacing: -1.2px;
  }
  .brands-description { max-width: 360px; font-size: 13px; }
  .brands-viewport { margin-right: -6.82%; padding-right: 6%; }
  .brands-track { --cards-per-page: 1; gap: 16px; }
  .brands-card { flex-basis: 88%; }
  .brands-card__body { padding: 22px 20px 0; }
  .brands-card h3 { font-size: 23px; }
  .brands-footer { gap: 10px; margin-top: 22px; padding-top: 16px; }
  .brands-total { font-size: 11px; }
  .brands-total > span { margin-right: 3px; }
  .brands-controls { gap: 6px; }
  .brands-counter { gap: 7px; margin-inline: 3px; font-size: 11px; }
  .brands-pause { width: 30px; }
}
@media (max-width: 360px) {
  .brands-footer { align-items: flex-start; flex-direction: column; gap: 12px; }
  .brands-controls { align-self: flex-end; }
}
@media (prefers-reduced-motion: reduce) {
  .brands-card__image,
  .brands-card__link svg { transition: none; }
  .brands-card:hover .brands-card__image,
  .brands-card__link:hover svg { transform: none; }
}
</style>
