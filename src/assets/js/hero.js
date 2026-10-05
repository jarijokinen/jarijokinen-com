export const hero = () => {
  const hero = document.querySelector('.hero');
  const content = hero?.querySelector('.hero-content');

  // Parallax effect for hero

  if (hero && content) {
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    );

    const strength = 0.25;
    let scheduled = false;

    function update() {
      scheduled = false;

      if (reducedMotion.matches) {
        content.style.setProperty('--parallax-y', '0px');
        return;
      }

      const rect = hero.getBoundingClientRect();
      const distance = Math.min(
        Math.max(-rect.top, 0),
        rect.height
      );

      content.style.setProperty(
        '--parallax-y',
        `${distance * strength}px`
      );
    }

    function scheduleUpdate() {
      if (scheduled) return;

      scheduled = true;
      requestAnimationFrame(update);
    }

    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    reducedMotion.addEventListener('change', scheduleUpdate);

    update();
  }
};
