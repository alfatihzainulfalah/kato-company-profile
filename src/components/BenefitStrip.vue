<script setup>
const benefits = [
  { icon: "✓", label: "Bahan Berkualitas" },
  { icon: "%", label: "Harga Lebih Hemat" },
  { icon: "➜", label: "Stok Siap Kirim" },
  { icon: "▣", label: "Pilihan Lengkap" },
];
</script>

<template>
  <div class="benefit-strip">
    <div class="benefit-track">
      <div class="benefit-track-group" v-for="group in 2" :key="group" :aria-hidden="group === 2 ? true : undefined">
        <template v-for="(benefit, i) in benefits" :key="benefit.label">
          <div class="benefit-item"><span class="inline-icon" aria-hidden="true">{{ benefit.icon }}</span> {{ benefit.label }}</div>
          <span class="strip-star" aria-hidden="true">✳</span>
        </template>
      </div>
    </div>
  </div>
</template>
