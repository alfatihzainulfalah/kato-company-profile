<script setup>
import { onMounted, onUnmounted, ref } from "vue";

const scrolled = ref(false);
const navOpen = ref(false);

const onScroll = () => {
  scrolled.value = window.scrollY > 24;
};

const toggleNav = () => {
  navOpen.value = !navOpen.value;
};

const closeNav = () => {
  navOpen.value = false;
};

onMounted(() => {
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
});

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
});
</script>

<template>
  <header class="header" :class="{ scrolled }">
    <a href="#home" class="brand" aria-label="KATO beranda"
      ><img src="/assets/Logo-KATO-putih.svg" alt="KATO" class="brand-logo"
    /></a>
    <nav class="nav" :class="{ 'nav-open': navOpen }" aria-label="Navigasi utama">
      <a href="#home" @click="closeNav">Beranda</a
      ><a href="#about" @click="closeNav">Tentang Kami</a
      ><a href="#brands" @click="closeNav">Produk</a
      ><a href="#contact" @click="closeNav">Kontak</a>
    </nav>
    <button
      class="menu-toggle"
      :aria-label="navOpen ? 'Tutup menu' : 'Buka menu'"
      :aria-expanded="navOpen"
      @click="toggleNav"
    >
      <span class="menu-glyph">{{ navOpen ? "×" : "☰" }}</span>
    </button>
  </header>
</template>
