<template>
  <section id="about" class="section kato-about" aria-labelledby="about-title">
    <div class="kato-about__art" v-reveal>
      <div class="kato-about__frame">
        <img
          src="/assets/Sunlit-Eco-Household-Still-Life-overlay.png"
          alt="Pilihan kantong dan kemasan KATO untuk kebutuhan rumah tangga dan usaha"
          class="kato-about__photo"
          width="2080"
          height="1042"
          loading="lazy"
        />
        <span class="kato-about__logo">
          <img
            src="/assets/Logo-KATO1.svg"
            alt="KATO"
            width="1080"
            height="1080"
            loading="lazy"
          />
        </span>
      </div>
    </div>
    <div class="kato-about__copy" v-reveal>
      <h2 id="about-title" class="kato-about__title">About Us</h2>
      <p>
        KATO hadir sebagai solusi kemasan terpercaya dari PT KATO PIAGAM INDONESIA untuk mendukung berbagai
        kebutuhan harian hingga operasional bisnis. Mulai dari kantong sampah, plastik laundry, kresek, hingga
        beragam kebutuhan pendukung lainnya, seluruh produk kami dirancang praktis dan berkualitas untuk
        memudahkan setiap aktivitas Anda.
      </p>
      <p>
        Bagi kami, kantong bukan sekadar pembungkus. Di balik setiap kemasan, ada produk UMKM yang siap
        dipasarkan, paket yang harus sampai dengan aman, serta urusan rumah tangga yang perlu diselesaikan
        tanpa ribet. Karena itu, KATO berkomitmen menjadi partner setia pelaku usaha dan keluarga melalui
        produk yang dapat diandalkan setiap saat.
      </p>
      <p>
        Sebagai jagonya kantong, KATO memastikan setiap produk dirancang untuk memberikan kemudahan dan
        ketahanan terbaik, agar urusan bungkus-membungkus di rumah maupun tempat usaha jadi lebih praktis,
        efisien, dan bebas drama.
      </p>
    </div>
  </section>
</template>

<style scoped>
.kato-about {
  display: grid;
  grid-template-columns: minmax(0, 1.04fr) minmax(0, 1fr);
  align-items: center;
  gap: clamp(40px, 6vw, 88px);
  padding-block: clamp(72px, 7vw, 104px);
  background: #fafaf7;
}

.kato-about__art {
  --about-cut: clamp(48px, 5.5vw, 80px);
  --about-offset: 10px;
  --about-shape: polygon(
    0 0,
    calc(100% - var(--about-cut)) 0,
    100% var(--about-cut),
    100% 100%,
    var(--about-cut) 100%,
    0 calc(100% - var(--about-cut))
  );
  position: relative;
  isolation: isolate;
  aspect-ratio: 1 / 1;
}

.kato-about__art::before {
  content: "";
  position: absolute;
  inset: var(--about-offset) 0 0 var(--about-offset);
  border-radius: 14px;
  background: #d8a039;
  clip-path: var(--about-shape);
  pointer-events: none;
}

.kato-about__frame {
  position: absolute;
  inset: 0 var(--about-offset) var(--about-offset) 0;
  overflow: hidden;
  border-radius: 14px;
  background: #e9e6dd;
  clip-path: var(--about-shape);
}

.kato-about__photo {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.kato-about__logo {
  position: absolute;
  top: clamp(22px, 2.5vw, 36px);
  left: clamp(22px, 2.5vw, 36px);
  width: clamp(104px, 11vw, 140px);
  aspect-ratio: 840 / 220;
  overflow: hidden;
}

.kato-about__logo img {
  position: absolute;
  top: 50%;
  left: 50%;
  /* Crop the original SVG's empty margins while preserving its proportions. */
  width: calc(100% * 1080 / 840);
  height: auto;
  transform: translate(-50%, -50%);
}

.kato-about__title {
  margin: 0 0 26px;
  color: #081e32;
  font-family: "Outfit", sans-serif;
  font-size: clamp(36px, 3.6vw, 50px);
  font-weight: 600;
  line-height: 1.15;
  letter-spacing: -1.4px;
}

.kato-about__copy p {
  margin: 0 0 20px;
  color: #52616a;
  font-size: 15px;
  line-height: 1.9;
}

.kato-about__copy p:last-child {
  margin-bottom: 0;
}

@media (max-width: 900px) {
  .kato-about {
    grid-template-columns: minmax(0, 1fr);
    gap: 36px;
  }

  .kato-about__art {
    aspect-ratio: 16 / 10;
  }

  .kato-about__logo {
    width: 120px;
  }

  .kato-about__copy {
    max-width: 680px;
  }
}

@media (max-width: 760px) {
  .kato-about {
    gap: 30px;
    padding-block: 56px;
  }

  .kato-about__art {
    --about-cut: clamp(40px, 10vw, 56px);
    --about-offset: 7px;
    aspect-ratio: 4 / 3;
  }

  .kato-about__art::before,
  .kato-about__frame {
    border-radius: 10px;
  }

  .kato-about__logo {
    top: 20px;
    left: 20px;
    width: 104px;
  }

  .kato-about__title {
    margin-bottom: 20px;
    font-size: 36px;
    letter-spacing: -1px;
  }

  .kato-about__copy p {
    font-size: 14px;
    line-height: 1.85;
  }
}
</style>
