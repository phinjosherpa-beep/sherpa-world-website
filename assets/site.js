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

// Gallery lightbox: opens the original full-size image for each screen in "Explore the experience".
(() => {
  const box = document.getElementById('lightbox');
  if (!box) return;
  const img = box.querySelector('.lightbox-img');
  const caption = box.querySelector('.lightbox-caption');
  const closeBtn = box.querySelector('.lightbox-close');
  let lastTrigger = null;

  const open = (trigger) => {
    const thumb = trigger.querySelector('img');
    lastTrigger = trigger;
    img.src = trigger.dataset.full;
    img.alt = thumb ? thumb.alt : '';
    const title = trigger.closest('figure')?.querySelector('figcaption strong');
    caption.textContent = title ? title.textContent : '';
    box.hidden = false;
    document.body.classList.add('lightbox-open');
    closeBtn.focus();
  };

  const close = () => {
    if (box.hidden) return;
    box.hidden = true;
    img.removeAttribute('src');
    document.body.classList.remove('lightbox-open');
    if (lastTrigger) lastTrigger.focus();
  };

  document.querySelectorAll('.gallery-trigger').forEach((btn) => {
    btn.addEventListener('click', () => open(btn));
  });

  closeBtn.addEventListener('click', close);

  // Clicking the dark backdrop (anything outside the image) closes the viewer.
  box.addEventListener('click', (event) => {
    if (event.target !== img && event.target !== closeBtn) close();
  });

  document.addEventListener('keydown', (event) => {
    if (box.hidden) return;
    if (event.key === 'Escape') close();
    // Keep keyboard focus inside the lightbox while it is open.
    if (event.key === 'Tab') {
      event.preventDefault();
      closeBtn.focus();
    }
  });
})();

// Acknowledgements: show/hide with the button, and open automatically when linked to (e.g. from the footer).
(() => {
  const wrap = document.getElementById('acknowledgements');
  const btn = document.getElementById('ack-toggle');
  const panel = document.getElementById('ack-panel');
  if (!wrap || !btn || !panel) return;
  const icon = btn.querySelector('.ack-icon');
  const setOpen = (open) => {
    panel.hidden = !open;
    btn.setAttribute('aria-expanded', String(open));
    if (icon) icon.textContent = open ? '\u2212' : '+';
  };
  btn.addEventListener('click', () => setOpen(panel.hidden));
  const openFromLink = () => {
    if (location.hash === '#acknowledgements') {
      setOpen(true);
      wrap.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  window.addEventListener('hashchange', openFromLink);
  openFromLink();
})();
