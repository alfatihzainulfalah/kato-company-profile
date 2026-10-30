<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import { items } from "../data/items";

const GROUP_SIZE = 3;
const groups = computed(() => {
  const chunks = [];
  for (let i = 0; i < items.length; i += GROUP_SIZE) {
    chunks.push(items.slice(i, i + GROUP_SIZE));
  }
  return chunks;
});

const activeGroup = ref(0);
const currentCards = computed(() => groups.value[activeGroup.value] || []);
let autoplayTimer = null;

const goTo = (index) => {
  activeGroup.value = (index + groups.value.length) % groups.value.length;
};

const stopAutoplay = () => {
  if (autoplayTimer) clearInterval(autoplayTimer);
  autoplayTimer = null;
};

const startAutoplay = () => {
  stopAutoplay();
  autoplayTimer = setInterval(() => goTo(activeGroup.value + 1), 3800);
};

const onDotClick = (i) => {
  goTo(i);
  startAutoplay();
};

onMounted(startAutoplay);
onUnmounted(stopAutoplay);
</script>

<template>
  <section id="home" class="hero">
    <div class="hero-grid"></div>
    <div class="hero-inner">
      <div class="hero-copy">
        <h1>
          <span class="h1-logo-wrap"
            ><img src="/assets/logo-kato.svg" alt="KATO" class="h1-logo"
          /></span><span class="h1-dark">: Kantongnya</span>
          <span class="h1-highlight">Pantang Jebol!</span>
        </h1>
        <div class="hero-actions">
          <a href="#contact" class="btn btn-order">Beli Sekarang</a>
        </div>
        <div class="hero-proof">
          <div class="proof-avatars"><span>K</span><span>A</span><span>T</span></div>
          <div><strong>Lengkap. Kuat. Hemat.</strong><small>Solusi praktis untuk setiap kebutuhan</small></div>
        </div>
      </div>
      <div class="hero-visual" @mouseenter="stopAutoplay" @mouseleave="startAutoplay">
        <div class="hero-collage">
          <span class="collage-accent" aria-hidden="true"></span>
          <div class="collage-card collage-card-main">
            <Transition name="collage-fade" mode="out-in">
              <img
                :key="currentCards[0]?.name"
                :src="currentCards[0]?.image"
                :alt="currentCards[0]?.name"
                class="collage-img"
              />
            </Transition>
          </div>
          <div class="collage-card collage-card-top">
            <Transition name="collage-fade" mode="out-in">
              <img
                :key="currentCards[1]?.name"
                :src="currentCards[1]?.image"
                :alt="currentCards[1]?.name"
                class="collage-img"
              />
            </Transition>
            <img src="/assets/Logo-KATO-putih.svg" alt="" class="collage-badge collage-badge-top" />
          </div>
          <div class="collage-card collage-card-bottom">
            <Transition name="collage-fade" mode="out-in">
              <img
                :key="currentCards[2]?.name"
                :src="currentCards[2]?.image"
                :alt="currentCards[2]?.name"
                class="collage-img"
              />
            </Transition>
            <img src="/assets/Logo-KATO-putih.svg" alt="" class="collage-badge collage-badge-bottom" />
          </div>
        </div>
        <div class="collage-dots">
          <button
            v-for="(group, i) in groups"
            :key="i"
            type="button"
            class="collage-dot"
            :class="{ active: i === activeGroup }"
            :aria-label="`Tampilkan produk set ${i + 1}`"
            @click="onDotClick(i)"
          ></button>
        </div>
      </div>
    </div>
    <a href="#about" class="scroll-cue"
      >SCROLL UNTUK JELAJAH <span class="inline-icon" aria-hidden="true">↓</span></a
    >
    <div class="hero-index">01 / 04</div>
  </section>
</template>
