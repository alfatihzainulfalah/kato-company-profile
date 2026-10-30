const observer =
  typeof IntersectionObserver !== "undefined"
    ? new IntersectionObserver(
        (entries) =>
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              observer.unobserve(entry.target);
            }
          }),
        { threshold: 0.12 },
      )
    : null;

export const vReveal = {
  mounted(el) {
    el.classList.add("reveal");
    if (observer) observer.observe(el);
    else el.classList.add("visible");
  },
  unmounted(el) {
    if (observer) observer.unobserve(el);
  },
};
