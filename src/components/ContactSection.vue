<script setup>
const linkGroups = [
  {
    title: "Follow Us",
    id: "contact-socials",
    links: [
      { name: "Instagram", detail: "@kato.factory", icon: "instagram", href: "https://www.instagram.com/kato.factory/" },
      { name: "TikTok", detail: "@kato.factory", icon: "tiktok", href: "https://www.tiktok.com/@kato.factory" },
      { name: "Facebook", detail: "KATO Factory", icon: "facebook", href: "https://www.facebook.com/profile.php?id=61591586348161" },
    ],
  },
  {
    title: "Official Shop",
    id: "contact-shops",
    links: [
      { name: "Shopee", detail: "katofactory", icon: "shopee", href: "https://shopee.co.id/katofactory" },
      { name: "Tokopedia", detail: "kato-factory", icon: "tokopedia", href: "https://www.tokopedia.com/kato-factory" },
      { name: "TikTok Shop", detail: "Kunjungi toko", icon: "tiktok", href: "https://vt.tiktok.com/ZSggaYhXg/?page=Mall" },
    ],
  },
];
</script>

<template>
  <section id="contact" class="contact-us" aria-labelledby="contact-title">
    <div class="contact-us__inner">
      <header class="contact-us__heading">
        <div>
          <p class="contact-us__eyebrow">04 / HUBUNGI KAMI</p>
          <h2 id="contact-title">Contact Us<span aria-hidden="true">.</span></h2>
          <p class="contact-us__intro">Informasi produk, pemesanan, dan kerja sama.</p>
        </div>
        <img
          class="contact-us__logo"
          src="/assets/Logo-KATO-putih.svg"
          alt="KATO"
          width="1350"
          height="448"
        />
      </header>

      <div class="contact-us__columns">
        <div class="contact-us__details">
          <h3>Hubungi KATO</h3>
          <a
            class="contact-us__whatsapp"
            href="https://wa.me/6281190057235"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Hubungi KATO melalui WhatsApp di 081190057235 (buka tab baru)"
          >
            <img class="contact-us__icon" src="/assets/platforms/whatsapp.svg" alt="" width="24" height="24" />
            <span>
              <span class="contact-us__label">WhatsApp</span>
              <span class="contact-us__phone">0811 9005 7235</span>
            </span>
            <svg class="contact-us__arrow" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 18 18 6M6 6h12v12" />
            </svg>
          </a>

          <div class="contact-us__address">
            <svg class="contact-us__pin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
            <div>
              <span class="contact-us__label">Alamat</span>
              <address>
                Komplek Ruko Duta Garden<br />
                Blok B4 No. 08–09, Kel. Jurumudi Baru,<br />
                Kec. Benda, Kota Tangerang,<br />
                Banten 15124
              </address>
            </div>
          </div>
        </div>

        <nav
          v-for="group in linkGroups"
          :key="group.id"
          class="contact-us__group"
          :aria-labelledby="group.id"
        >
          <h3 :id="group.id">{{ group.title }}</h3>
          <ul class="contact-us__links">
            <li v-for="link in group.links" :key="link.name">
              <a
                class="contact-us__link"
                :href="link.href"
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="`${link.name} KATO (buka tab baru)`"
              >
                <img
                  class="contact-us__icon"
                  :src="`/assets/platforms/${link.icon}.svg`"
                  alt=""
                  width="24"
                  height="24"
                  loading="lazy"
                />
                <span class="contact-us__link-copy">
                  <span class="contact-us__platform">{{ link.name }}</span>
                  <span class="contact-us__handle">{{ link.detail }}</span>
                </span>
                <svg class="contact-us__arrow" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M6 18 18 6M6 6h12v12" />
                </svg>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-us {
  padding: 88px var(--gutter) 92px;
  scroll-margin-top: 88px;
  background: #081e32;
  color: #fff;
}
.contact-us__inner {
  max-width: 1240px;
  margin-inline: auto;
}
.contact-us__heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  padding-bottom: 42px;
  border-bottom: 1px solid #ffffff26;
}
.contact-us__eyebrow {
  margin: 0 0 16px;
  color: #d8a039;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1.8px;
}
.contact-us h2 {
  margin: 0;
  font: 600 clamp(42px, 4.5vw, 64px)/1.1 "Outfit", sans-serif;
  letter-spacing: -1.8px;
}
.contact-us h2 > span {
  color: #d8a039;
}
.contact-us__intro {
  margin: 18px 0 0;
  color: #b5c7cd;
  font-size: 15px;
  line-height: 1.7;
}
.contact-us__logo {
  display: block;
  flex-shrink: 0;
  width: 152px;
  height: auto;
}
.contact-us__columns {
  display: grid;
  grid-template-columns: 1.3fr 1fr 1fr;
  gap: clamp(32px, 5vw, 80px);
  padding-top: 38px;
}
.contact-us__columns > * {
  min-width: 0;
}
.contact-us h3 {
  margin: 0 0 15px;
  font: 500 20px/1.4 "Outfit", sans-serif;
}
.contact-us__whatsapp,
.contact-us__link,
.contact-us__address {
  display: flex;
  align-items: center;
  gap: 16px;
}
.contact-us__whatsapp {
  padding: 17px 0;
}
.contact-us__icon,
.contact-us__pin {
  display: block;
  flex: 0 0 24px;
  width: 24px;
  height: 24px;
}
.contact-us__icon {
  object-fit: contain;
  filter: brightness(0) invert(1);
}
.contact-us__label,
.contact-us__phone,
.contact-us__platform,
.contact-us__handle {
  display: block;
}
.contact-us__label,
.contact-us__handle {
  color: #b5c7cd;
  font-size: 12px;
  line-height: 1.5;
}
.contact-us__phone {
  margin-top: 3px;
  font-size: 20px;
  font-weight: 500;
  line-height: 1.4;
  font-variant-numeric: tabular-nums;
}
.contact-us__address {
  align-items: flex-start;
  margin-top: 22px;
}
.contact-us__pin {
  margin-top: 2px;
  stroke: #b5c7cd;
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.contact-us address {
  margin-top: 6px;
  color: #dce5e9;
  font-size: 13px;
  font-style: normal;
  line-height: 1.9;
}
.contact-us__links {
  margin: 0;
  padding: 0;
  list-style: none;
}
.contact-us__links li + li {
  border-top: 1px solid #ffffff1a;
}
.contact-us__link {
  min-height: 83px;
  padding: 17px 0;
}
.contact-us__link-copy {
  min-width: 0;
}
.contact-us__platform {
  font-size: 15px;
  font-weight: 500;
  line-height: 1.5;
}
.contact-us__handle {
  margin-top: 3px;
  overflow-wrap: anywhere;
}
.contact-us__arrow {
  flex: 0 0 17px;
  width: 17px;
  height: 17px;
  margin-left: auto;
  color: #9aafb9;
  stroke: currentColor;
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: color 0.2s;
}
.contact-us a {
  border-radius: 2px;
}
.contact-us a:hover .contact-us__platform,
.contact-us a:hover .contact-us__phone,
.contact-us a:hover .contact-us__arrow {
  color: #e8b85d;
}
.contact-us a:focus-visible {
  outline: 2px solid #e8b85d;
  outline-offset: 6px;
}
@media (max-width: 1000px) {
  .contact-us__columns {
    grid-template-columns: 1.2fr 1fr 1fr;
    gap: 28px;
  }
  .contact-us__whatsapp,
  .contact-us__link,
  .contact-us__address {
    gap: 12px;
  }
  .contact-us__phone {
    font-size: 18px;
  }
}
@media (max-width: 760px) {
  .contact-us {
    padding: 64px 6%;
    scroll-margin-top: 72px;
  }
  .contact-us__heading {
    align-items: flex-start;
    gap: 20px;
    padding-bottom: 30px;
  }
  .contact-us__heading > div {
    min-width: 0;
  }
  .contact-us__logo {
    width: 92px;
    margin-top: 4px;
  }
  .contact-us__intro {
    font-size: 14px;
  }
  .contact-us__columns {
    grid-template-columns: 1fr 1fr;
    gap: 36px 28px;
    padding-top: 30px;
  }
  .contact-us__details {
    grid-column: 1 / -1;
  }
  .contact-us__whatsapp {
    max-width: 330px;
  }
  .contact-us__address {
    margin-top: 15px;
  }
}
@media (max-width: 480px) {
  .contact-us__heading {
    flex-direction: column-reverse;
    gap: 30px;
  }
  .contact-us__logo {
    width: 104px;
    margin: 0;
  }
  .contact-us__columns {
    grid-template-columns: 1fr;
    gap: 32px;
  }
  .contact-us__group {
    padding-top: 28px;
    border-top: 1px solid #ffffff26;
  }
  .contact-us__link {
    min-height: 78px;
  }
}
</style>
