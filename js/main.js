(() => {
  const header = document.querySelector(".header"),
    nav = document.querySelector(".nav"),
    toggle = document.querySelector(".menu-toggle");
  const scroll = () => header.classList.toggle("scrolled", window.scrollY > 24);
  window.addEventListener("scroll", scroll, { passive: true });
  scroll();
  toggle.addEventListener("click", () => {
    const opened = nav.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", String(opened));
    toggle.setAttribute("aria-label", opened ? "Tutup menu" : "Buka menu");
    toggle.querySelector(".menu-glyph").textContent = opened ? "×" : "☰";
  });
  document.querySelectorAll(".nav a").forEach((link) =>
    link.addEventListener("click", () => {
      nav.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.querySelector(".menu-glyph").textContent = "☰";
    }),
  );
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
  } else {
    document
      .querySelectorAll(".reveal")
      .forEach((el) => el.classList.add("visible"));
  }
})();
