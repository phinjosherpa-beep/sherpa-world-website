(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.primary-nav');
  if (toggle && nav) {
    const setMenuOpen = (open) => {
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    };

    // One click on the menu button opens or closes the navigation.
    toggle.addEventListener('click', (event) => {
      event.preventDefault();
      setMenuOpen(!nav.classList.contains('is-open'));
    });

    // One click on any navigation link follows the link and closes the mobile menu.
    nav.addEventListener('click', (event) => {
      const link = event.target.closest('a');
      if (link) setMenuOpen(false);
    });

    // Close the menu with Escape or when the visitor clicks outside it.
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    });
    document.addEventListener('click', (event) => {
      if (nav.classList.contains('is-open') &&
          !nav.contains(event.target) && !toggle.contains(event.target)) {
        setMenuOpen(false);
      }
    });

    // Avoid leaving the mobile menu open after switching to a desktop layout.
    window.addEventListener('resize', () => {
      if (window.innerWidth > 700) setMenuOpen(false);
    });
  }
  document.querySelectorAll('[data-year]').forEach(el => {
    el.textContent = new Date().getFullYear();
  });
})();
