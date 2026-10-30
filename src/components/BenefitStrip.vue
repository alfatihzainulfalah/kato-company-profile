<script setup>
const benefits = [
  "Bahan berkualitas",
  "Harga lebih hemat",
  "Stok siap kirim",
  "Pilihan lengkap",
];
</script>

<template>
  <div class="benefit-strip">
    <div class="benefit-track">
      <ul
        v-for="group in 2"
        :key="group"
        class="benefit-list"
        aria-label="Keunggulan KATO"
        :aria-hidden="group === 2 ? true : undefined"
      >
        <li v-for="benefit in benefits" :key="benefit" class="benefit-item">
          {{ benefit }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.benefit-strip {
  overflow: hidden;
  padding: 24px 0;
  border-block: 1px solid #e3dfd5;
  background: #f2efe7;
  color: #485149;
}

.benefit-track {
  display: flex;
  width: max-content;
  animation: benefit-scroll 24s linear infinite;
}

.benefit-strip:hover .benefit-track {
  animation-play-state: paused;
}

.benefit-list {
  display: flex;
  flex-shrink: 0;
  min-width: 100vw;
  margin: 0;
  padding: 0;
  list-style: none;
}

.benefit-item {
  flex: 1 0 auto;
  padding: 4px clamp(28px, 4vw, 72px);
  border-right: 1px solid #d7d2c6;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.6;
  text-align: center;
  white-space: nowrap;
}

@keyframes benefit-scroll {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@media (max-width: 760px) {
  .benefit-strip {
    padding: 18px 0;
  }

  .benefit-track {
    animation-duration: 16s;
  }

  .benefit-item {
    font-size: 13px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .benefit-track {
    width: auto;
    animation: none;
  }

  .benefit-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    width: 100%;
    min-width: 0;
    row-gap: 16px;
  }

  .benefit-list[aria-hidden="true"] {
    display: none;
  }

  .benefit-item {
    padding-inline: 10px;
    white-space: normal;
  }

  .benefit-item:nth-child(even) {
    border-right: 0;
  }
}
</style>
