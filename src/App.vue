<script setup>
import AppHeader from "./components/AppHeader.vue";
import HeroSection from "./components/HeroSection.vue";
import BenefitStrip from "./components/BenefitStrip.vue";
import AboutSection from "./components/AboutSection.vue";
import ProductsSection from "./components/ProductsSection.vue";
import BrandsCarousel from "./components/BrandsCarousel.vue";
import AdvantagesSection from "./components/AdvantagesSection.vue";
import ContactSection from "./components/ContactSection.vue";
import AppFooter from "./components/AppFooter.vue";
</script>

<template>
  <div class="site-shell">
    <AppHeader />
    <main>
      <HeroSection />
      <BenefitStrip />
      <AboutSection />
      <ProductsSection />
      <BrandsCarousel />
      <AdvantagesSection />
      <ContactSection />
    </main>
    <AppFooter />
  </div>
</template>
