<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { items } from "../data/items";

const GROUP_SIZE = 3;
const AUTOPLAY_DELAY = 10000;
const groups = computed(() =>
  Array.from({ length: Math.ceil(items.length / GROUP_SIZE) }, (_, index) =>
    items.slice(index * GROUP_SIZE, (index + 1) * GROUP_SIZE),
  ),
);
const activeGroup = ref(0);
const currentCards = computed(() => groups.value[activeGroup.value] || []);
const direction = ref(1);
const isPaused = ref(false);
const isHovered = ref(false);
const isFocused = ref(false);
const prefersReducedMotion = ref(false);
const isPageVisible = ref(false);
const canAutoplay = computed(() =>
  groups.value.length > 1 && isPageVisible.value && !isPaused.value &&
  !isHovered.value && !isFocused.value && !prefersReducedMotion.value,
);
const formatNumber = (number) => String(number).padStart(2, "0");
let autoplayTimer = null;
let motionPreference = null;

const goTo = (index) => {
  const count = groups.value.length;
  if (count < 2) return;
  direction.value = index >= activeGroup.value ? 1 : -1;
  activeGroup.value = ((index % count) + count) % count;
};

const stopAutoplay = () => {
  if (autoplayTimer !== null) clearInterval(autoplayTimer);
  autoplayTimer = null;
};

const syncAutoplay = () => {
  stopAutoplay();
  if (canAutoplay.value) {
    autoplayTimer = setInterval(() => goTo(activeGroup.value + 1), AUTOPLAY_DELAY);
  }
};

const onFocusOut = (event) => {
  isFocused.value = event.currentTarget.contains(event.relatedTarget);
};
const onVisibilityChange = () => {
  isPageVisible.value = document.visibilityState === "visible";
};
const onMotionChange = (event) => {
  prefersReducedMotion.value = event.matches;
};

watch([canAutoplay, activeGroup], syncAutoplay);

onMounted(() => {
  motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
  prefersReducedMotion.value = motionPreference.matches;
  motionPreference.addEventListener("change", onMotionChange);
  document.addEventListener("visibilitychange", onVisibilityChange);
  onVisibilityChange();
});

onUnmounted(() => {
  stopAutoplay();
  motionPreference?.removeEventListener("change", onMotionChange);
  document.removeEventListener("visibilitychange", onVisibilityChange);
});
</script>

<template>
  <section id="home" class="kato-hero" aria-labelledby="hero-title">
    <div class="kato-hero__layout">
      <div class="kato-hero__copy">
        <p class="kato-hero__eyebrow">KANTONG UNTUK RUMAH &amp; USAHA</p>
        <h1 id="hero-title" class="kato-hero__title">
          <span class="kato-hero__sr-only">KATO: </span>
          <span class="kato-hero__title-line">
            <span class="kato-hero__logo" aria-hidden="true">
              <img src="/assets/Logo-KATO1.svg" alt="" width="1080" height="1080" />
            </span>
            <span>Kantongnya</span>
          </span>
          <span>Pantang Jebol!</span>
        </h1>
        <p class="kato-hero__description">
          Dari urusan dapur hingga kebutuhan usaha, temukan kantong yang tepat.
          Pilihan bahan dan ukuran lengkap untuk setiap aktivitas Anda.
        </p>
        <div class="kato-hero__actions">
          <a href="#brands" class="kato-hero__primary">
            Jelajahi Produk
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12h14m-6-6 6 6-6 6" />
            </svg>
          </a>
          <a href="#contact" class="kato-hero__secondary">Tanya Pemesanan</a>
        </div>
        <div class="kato-hero__details">
          <p class="kato-hero__details-title">Untuk aktivitas sehari-hari</p>
          <p>
            Rumah tangga <span aria-hidden="true">/</span> Kuliner
            <span aria-hidden="true">/</span> Laundry
            <span aria-hidden="true">/</span> Retail
          </p>
        </div>
      </div>

      <div
        v-if="currentCards.length"
        class="kato-hero__showcase"
        role="region"
        aria-roledescription="carousel"
        aria-label="Pilihan produk KATO"
        @mouseenter="isHovered = true"
        @mouseleave="isHovered = false"
        @focusin="isFocused = true"
        @focusout="onFocusOut"
      >
        <div class="kato-hero__showcase-heading">
          <span>KENALI PILIHAN KATO</span>
          <span class="kato-hero__counter" aria-hidden="true">
            {{ formatNumber(activeGroup + 1) }}
            <span>/ {{ formatNumber(groups.length) }}</span>
          </span>
        </div>
        <div
          id="hero-carousel"
          class="kato-hero__collage"
          :style="{ '--slide-direction': direction }"
          :aria-live="canAutoplay ? 'off' : 'polite'"
          aria-atomic="true"
        >
          <Transition name="hero-collage">
            <div
              :key="activeGroup"
              class="kato-hero__collage-panel"
              role="group"
              aria-roledescription="slide"
              :aria-label="`Koleksi ${activeGroup + 1} dari ${groups.length}`"
            >
              <figure
                v-for="(product, index) in currentCards"
                :key="product.name"
                class="kato-hero__card"
                :class="{ 'kato-hero__card--main': index === 0 }"
                :style="{ '--card-delay': `${index * 60}ms` }"
              >
                <img
                  :src="product.image"
                  :alt="product.name"
                  width="900"
                  height="575"
                  :fetchpriority="activeGroup === 0 && index === 0 ? 'high' : 'auto'"
                  class="kato-hero__card-image"
                  :style="{ objectPosition: product.heroImagePosition || 'center' }"
                />
                <figcaption class="kato-hero__card-caption">
                  <span>{{ product.material }}</span>
                  <h2>{{ product.name }}</h2>
                </figcaption>
              </figure>
            </div>
          </Transition>
        </div>
        <div v-if="groups.length > 1" class="kato-hero__carousel-controls">
          <button
            type="button"
            class="kato-hero__carousel-arrow"
            aria-label="Koleksi produk sebelumnya"
            aria-controls="hero-carousel"
            @click="goTo(activeGroup - 1)"
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M19 12H5m6-6-6 6 6 6" />
            </svg>
          </button>
          <div class="kato-hero__carousel-dots" role="group" aria-label="Pilih koleksi produk">
            <button
              v-for="(_, index) in groups"
              :key="index"
              type="button"
              class="kato-hero__carousel-dot"
              :class="{ 'is-active': index === activeGroup }"
              :aria-label="`Tampilkan koleksi ${index + 1}`"
              :aria-pressed="index === activeGroup"
              aria-controls="hero-carousel"
              @click="goTo(index)"
            ><span></span></button>
          </div>
          <button
            type="button"
            class="kato-hero__carousel-arrow"
            aria-label="Koleksi produk berikutnya"
            aria-controls="hero-carousel"
            @click="goTo(activeGroup + 1)"
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12h14m-6-6 6 6-6 6" />
            </svg>
          </button>
          <button
            v-if="!prefersReducedMotion"
            type="button"
            class="kato-hero__carousel-pause"
            :aria-label="isPaused ? 'Lanjutkan pergantian otomatis' : 'Jeda pergantian otomatis'"
            :aria-pressed="isPaused"
            aria-controls="hero-carousel"
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
    <div class="kato-hero__footer">
      <span>PT KATO PIAGAM INDONESIA</span>
      <a href="#about">
        Lebih dekat dengan KATO
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 5v14m-6-6 6 6 6-6" />
        </svg>
      </a>
    </div>
  </section>
</template>

<style scoped>
.kato-hero {
  --hero-ink: #081e32;
  --hero-muted: #5e6b72;
  --hero-line: #dadeda;
  padding: 88px max(5.5%, calc((100vw - 1400px) / 2)) 0;
  color: var(--hero-ink);
  background: #fafaf7;
}
.kato-hero__layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.08fr);
  align-items: center;
  gap: clamp(40px, 6vw, 96px);
  max-width: 1400px;
  margin-inline: auto;
  padding-block: clamp(56px, 6vw, 88px) 64px;
}
.kato-hero__eyebrow {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0 0 26px;
  color: #49635e;
  font-size: 10px;
  font-weight: 700;
  line-height: 1.6;
  letter-spacing: 1.8px;
}
.kato-hero__eyebrow::before {
  width: 26px;
  height: 2px;
  flex-shrink: 0;
  background: #b38332;
  content: "";
}
.kato-hero__title {
  margin: 0;
  font-family: "Outfit", sans-serif;
  font-size: clamp(46px, 4.7vw, 72px);
  font-weight: 650;
  line-height: 1.08;
  letter-spacing: -2.5px;
}
.kato-hero__title > span:last-child { color: #d8a039; }
.kato-hero__title-line {
  display: flex;
  align-items: center;
  gap: 0.2em;
  white-space: nowrap;
}
.kato-hero__logo {
  position: relative;
  display: block;
  width: 2.5em;
  height: 0.7em;
  flex-shrink: 0;
  overflow: hidden;
}
.kato-hero__logo img {
  position: absolute;
  top: 50%;
  left: 50%;
  /* Crop the empty margins in the square SVG without stretching the logo. */
  width: calc(100% * 1080 / 840);
  height: auto;
  transform: translate(-50%, -50%);
}
.kato-hero__description {
  max-width: 410px;
  margin: 26px 0 0;
  color: var(--hero-muted);
  font-size: 15px;
  line-height: 1.85;
}
.kato-hero__actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px 26px;
  margin-top: 30px;
}
.kato-hero__primary,
.kato-hero__secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 50px;
  font-size: 13px;
  font-weight: 700;
}
.kato-hero__primary {
  gap: 22px;
  padding: 14px 22px;
  border: 1px solid var(--hero-ink);
  border-radius: 4px;
  background: var(--hero-ink);
  color: #fff;
  transition: background 180ms ease, border-color 180ms ease;
}
.kato-hero__primary:hover {
  border-color: #164c47;
  background: #164c47;
}
.kato-hero__secondary {
  text-decoration: underline;
  text-decoration-color: #a5afab;
  text-underline-offset: 6px;
  transition: text-decoration-color 180ms ease;
}
.kato-hero__secondary:hover { text-decoration-color: var(--hero-ink); }
.kato-hero svg {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  stroke: currentColor;
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.kato-hero__details {
  margin-top: 42px;
  padding-top: 22px;
  border-top: 1px solid var(--hero-line);
}
.kato-hero__details p {
  margin: 0;
  color: var(--hero-muted);
  font-size: 11px;
  line-height: 1.9;
}
.kato-hero__details .kato-hero__details-title {
  margin-bottom: 5px;
  color: var(--hero-ink);
  font-size: 12px;
  font-weight: 600;
}
.kato-hero__details p > span {
  padding-inline: 7px;
  color: #a6afa9;
}
.kato-hero__showcase { min-width: 0; }
.kato-hero__showcase-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 1.5px;
}
.kato-hero__counter {
  flex-shrink: 0;
  font-variant-numeric: tabular-nums;
  letter-spacing: 1px;
}
.kato-hero__counter > span {
  margin-left: 4px;
  color: var(--hero-muted);
}
.kato-hero__collage {
  position: relative;
  isolation: isolate;
  aspect-ratio: 1.12;
}
.kato-hero__collage::before {
  position: absolute;
  z-index: -1;
  inset: -3% 32% -3% 42%;
  background: #d8a039;
  transform: skew(-12deg);
  content: "";
}
.kato-hero__collage-panel {
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: 1.08fr 1fr;
  grid-template-rows: repeat(2, minmax(0, 1fr));
  gap: 14px;
}
.kato-hero__card {
  position: relative;
  min-width: 0;
  min-height: 0;
  margin: 0;
  overflow: hidden;
  border: 4px solid #fff;
  border-radius: 14px;
  background: #e9e6dd;
  box-shadow: 0 12px 28px #081e3212;
}
.kato-hero__card--main {
  grid-column: 1;
  grid-row: 1 / span 2;
}
.kato-hero__card-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
.kato-hero__card-caption {
  position: absolute;
  /* Keep captions above the packaging labels in the lower part of each photo. */
  inset: 0 0 auto;
  padding: 14px 16px 32px;
  background: linear-gradient(#081e32e8, transparent);
  color: #fff;
}
.kato-hero__card-caption > span {
  font-size: 9px;
  line-height: 1.5;
  letter-spacing: 0.8px;
}
.kato-hero__card-caption h2 {
  margin: 3px 0 0;
  font-family: "Outfit", sans-serif;
  font-size: clamp(12px, 1.1vw, 17px);
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: 0.3px;
}
.kato-hero__card--main .kato-hero__card-caption {
  padding: 20px 20px 48px;
}
.kato-hero__card--main h2 {
  font-size: clamp(16px, 1.6vw, 24px);
}
.kato-hero__carousel-controls {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 20px;
  padding-inline: 44px;
}
.kato-hero__carousel-arrow,
.kato-hero__carousel-pause,
.kato-hero__carousel-dot {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  flex-shrink: 0;
  padding: 0;
  background: transparent;
  color: var(--hero-ink);
  cursor: pointer;
}
.kato-hero__carousel-arrow {
  width: 44px;
  border: 1px solid var(--hero-line);
  border-radius: 50%;
  transition: background 180ms ease, border-color 180ms ease;
}
.kato-hero__carousel-arrow:hover {
  border-color: #a5afab;
  background: #eef0ea;
}
.kato-hero__carousel-dots { display: flex; }
.kato-hero__carousel-dot {
  width: 28px;
  border: 0;
}
.kato-hero__carousel-dot > span {
  width: 6px;
  height: 6px;
  border-radius: 8px;
  background: #abb5ae;
  transition: width 250ms ease, background 250ms ease;
}
.kato-hero__carousel-dot.is-active > span {
  width: 18px;
  background: #a47020;
}
.kato-hero__carousel-pause {
  position: absolute;
  right: 0;
  width: 44px;
  border: 0;
  border-radius: 50%;
  color: var(--hero-muted);
}
.kato-hero__carousel-pause:hover { background: #eef0ea; }
.kato-hero__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  max-width: 1400px;
  min-height: 65px;
  margin-inline: auto;
  padding-block: 18px;
  border-top: 1px solid var(--hero-line);
  color: var(--hero-muted);
  font-size: 11px;
}
.kato-hero__footer a {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  min-height: 28px;
  color: var(--hero-ink);
}
.kato-hero a:focus-visible,
.kato-hero button:focus-visible {
  outline: 2px solid #0e8e82;
  outline-offset: 5px;
}
.kato-hero__sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
.hero-collage-enter-active {
  transition: opacity 400ms ease, transform 650ms cubic-bezier(0.22, 1, 0.36, 1);
}
.hero-collage-leave-active {
  transition: opacity 300ms ease, transform 400ms ease;
  pointer-events: none;
}
.hero-collage-enter-from {
  opacity: 0;
  transform: translateX(calc(var(--slide-direction) * 26px));
}
.hero-collage-leave-to {
  opacity: 0;
  transform: translateX(calc(var(--slide-direction) * -26px));
}
.hero-collage-enter-active .kato-hero__card {
  animation: hero-card-in 480ms cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: var(--card-delay);
}
@keyframes hero-card-in {
  from { opacity: 0; transform: translateY(18px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

@media (min-width: 761px) and (max-width: 1100px) {
  .kato-hero__layout {
    gap: 34px;
    padding-block: 56px 48px;
  }
  .kato-hero__title {
    font-size: clamp(37px, 4.65vw, 51px);
    letter-spacing: -1.7px;
  }
  .kato-hero__actions { gap: 10px 18px; }
  .kato-hero__primary {
    gap: 14px;
    padding-inline: 16px;
  }
}
@media (max-width: 760px) {
  .kato-hero { padding: 72px 6% 0; }
  .kato-hero__layout {
    grid-template-columns: minmax(0, 1fr);
    gap: 40px;
    padding-block: 46px 32px;
  }
  .kato-hero__eyebrow {
    gap: 10px;
    margin-bottom: 20px;
    font-size: 9px;
    letter-spacing: 1.4px;
  }
  .kato-hero__title {
    font-size: clamp(38px, 9vw, 62px);
    letter-spacing: -1.6px;
  }
  .kato-hero__description {
    margin-top: 20px;
    font-size: 14px;
    line-height: 1.8;
  }
  .kato-hero__actions {
    gap: 10px 22px;
    margin-top: 24px;
  }
  .kato-hero__details {
    margin-top: 28px;
    padding-top: 18px;
  }
  .kato-hero__collage-panel { gap: 10px; }
  .kato-hero__card { border-width: 3px; border-radius: 12px; }
  .kato-hero__card-caption { padding: 10px 10px 28px; }
  .kato-hero__card-caption h2 { font-size: 12px; }
  .kato-hero__card--main .kato-hero__card-caption { padding: 14px 12px 36px; }
  .kato-hero__card--main h2 { font-size: 17px; }
  .kato-hero__footer { min-height: 60px; }
  .kato-hero__footer > span { display: none; }
  .kato-hero__footer a {
    justify-content: space-between;
    width: 100%;
  }
}
@media (max-width: 360px) {
  .kato-hero__title { font-size: 34px; }
  .kato-hero__primary,
  .kato-hero__secondary { font-size: 12px; }
  .kato-hero__primary {
    gap: 14px;
    padding-inline: 16px;
  }
  .kato-hero__details p > span { padding-inline: 4px; }
}
@media (prefers-reduced-motion: reduce) {
  .hero-collage-enter-active,
  .hero-collage-leave-active { transition: none; }
  .hero-collage-enter-active .kato-hero__card { animation: none; }
  .hero-collage-enter-from,
  .hero-collage-leave-to { transform: none; }
}
</style>
