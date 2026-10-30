<script setup>
const advantages = [
  { icon: "✓", num: "01", title: "Kualitas Terjaga", desc: "Material yang dipilih untuk mendukung penggunaan sehari-hari." },
  { icon: "%", num: "02", title: "Harga Bersahabat", desc: "Pilihan ekonomis untuk kebutuhan pribadi maupun bisnis." },
  { icon: "▣", num: "03", title: "Variasi Lengkap", desc: "Beragam jenis dan ukuran untuk kebutuhan yang beragam." },
  { icon: "➜", num: "04", title: "Siap Melayani", desc: "Hubungi tim kami untuk informasi produk dan ketersediaan stok." },
];
</script>

<template>
  <section id="advantages" class="section advantages-section">
    <div class="section-heading" v-reveal>
      <div>
        <div class="section-kicker">03 — KEUNGGULAN KAMI</div>
        <h2>Lebih dari sekadar<br /><em>kantong biasa.</em></h2>
      </div>
      <p>Kebutuhan berbeda, satu pilihan yang bisa diandalkan.</p>
    </div>
    <div class="advantages-grid">
      <div v-for="adv in advantages" :key="adv.num" class="advantage" v-reveal>
        <div class="adv-icon"><span class="inline-icon" aria-hidden="true">{{ adv.icon }}</span></div>
        <span>{{ adv.num }}</span>
        <h3>{{ adv.title }}</h3>
        <p>{{ adv.desc }}</p>
      </div>
    </div>
  </section>
</template>
