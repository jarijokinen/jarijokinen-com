export const header = () => {
  const body = document.querySelector('body');
  const header = body.querySelector('.header');
  const nav = header.querySelector('.header-nav');
  const navToggle = nav.querySelector('.header-nav-toggle');
  const fadeDistance = 100;

  navToggle.onclick = () => {
    const open = nav.toggleAttribute('data-open');
    navToggle.setAttribute('aria-expanded', String(open));
    body.classList.toggle('noscroll');
  };

  const updateHeader = () => {
    const progress = Math.min(window.scrollY / fadeDistance, 1) * 100;
    header.style.setProperty('--header-progress', progress + '%');
  };

  window.addEventListener('scroll', updateHeader, { passive: true});

  updateHeader();
};
