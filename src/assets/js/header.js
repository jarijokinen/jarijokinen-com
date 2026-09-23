export const header = () => {
  const body = document.querySelector('body');
  const nav = body.querySelector('.header-nav');
  const navToggle = nav.querySelector('.header-nav-toggle');

  navToggle.onclick = () => {
    const open = nav.toggleAttribute('data-open');
    toggle.setAttribute('aria-expanded', String(open));
    body.classList.toggle('noscroll');
  };
};
