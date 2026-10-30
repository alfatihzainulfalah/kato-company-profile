<script setup>
const products = [
  {
    kicker: "KEBERSIHAN",
    illustration: "trash",
    hasTie: true,
    title: "Kantong Sampah",
    desc: "Praktis dan kuat untuk kebutuhan kebersihan sehari-hari.",
  },
  {
    kicker: "LAUNDRY",
    illustration: "laundry",
    hasTie: false,
    title: "Kantong Laundry",
    desc: "Kemasan rapi untuk bisnis laundry dan kebutuhan rumah.",
  },
  {
    kicker: "KEMASAN",
    illustration: "polybag",
    hasTie: false,
    title: "Polybag",
    desc: "Beragam pilihan kemasan untuk kebutuhan usaha Anda.",
  },
  {
    kicker: "SERBAGUNA",
    illustration: "kresek",
    hasTie: false,
    title: "Kantong Kresek",
    desc: "Tersedia berbagai ukuran untuk kebutuhan yang berbeda.",
  },
];
</script>

<template>
  <section id="products" class="section products-section">
    <div class="section-heading" v-reveal>
      <div>
        <div class="section-kicker">PRODUK KAMI</div>
        <h2>Produk untuk<br /><em>semua kebutuhan.</em></h2>
      </div>
      <p>Temukan pilihan kantong dan kemasan untuk rumah, usaha, dan kebutuhan sehari-hari.</p>
    </div>
    <div class="product-grid">
      <article
        v-for="(product, i) in products"
        :key="product.title"
        class="product-card"
        v-reveal
        :style="{ '--delay': `${i * 90}ms` }"
      >
        <div class="product-card-top"><span>{{ product.kicker }}</span><span>{{ String(i + 1).padStart(2, "0") }} / 04</span></div>
        <div class="product-illustration" :class="product.illustration">
          <div class="mini-bag"><span v-if="product.hasTie" class="mini-tie"></span></div>
        </div>
        <div class="product-card-bottom">
          <div>
            <h3>{{ product.title }}</h3>
            <p>{{ product.desc }}</p>
          </div>
          <a href="#contact" :aria-label="`Tanyakan ${product.title}`" class="product-arrow">↗</a>
        </div>
      </article>
    </div>
  </section>
</template>
