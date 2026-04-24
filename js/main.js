/* ============================================================
   A & E Auto Upholstery — Main JavaScript
   Handles: footer year, mobile nav, dropdowns, active nav
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. Footer Year ── */
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ── 2. Mobile Hamburger ── */
  const hamburger = document.getElementById('hamburger-btn');
  const nav       = document.getElementById('site-nav');

  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', String(!isOpen));
      hamburger.classList.toggle('is-active', !isOpen);
      nav.classList.toggle('is-open', !isOpen);
    });

    // Close nav when clicking outside the header
    document.addEventListener('click', (e) => {
      const header = document.getElementById('site-header');
      if (header && !header.contains(e.target)) {
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.classList.remove('is-active');
        nav.classList.remove('is-open');
      }
    });
  }

  /* ── 3. Dropdown Menus (handles any number of .nav-dropdown elements) ── */
  const closeAllDropdowns = () => {
    document.querySelectorAll('.nav-dropdown-toggle').forEach((t) => {
      t.setAttribute('aria-expanded', 'false');
      t.parentElement.querySelector('.dropdown-menu')?.classList.remove('is-open');
    });
  };

  document.querySelectorAll('.nav-dropdown').forEach((dropdown) => {
    const toggle = dropdown.querySelector('.nav-dropdown-toggle');
    const menu   = dropdown.querySelector('.dropdown-menu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      // Close all other dropdowns first
      document.querySelectorAll('.nav-dropdown-toggle').forEach((t) => {
        if (t !== toggle) {
          t.setAttribute('aria-expanded', 'false');
          t.parentElement.querySelector('.dropdown-menu')?.classList.remove('is-open');
        }
      });
      toggle.setAttribute('aria-expanded', String(!isOpen));
      menu.classList.toggle('is-open', !isOpen);
    });
  });

  // Close all dropdowns on Escape or outside click
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllDropdowns();
  });
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-dropdown')) closeAllDropdowns();
  });

  /* ── 4. Active Nav Indicator ── */
  const page = document.body.getAttribute('data-page');
  if (page) {
    const activeLink = document.querySelector(`[data-nav="${page}"]`);
    if (activeLink) activeLink.classList.add('is-active');

    const servicePages = ['auto-rv', 'boat', 'classic-car', 'motorcycle'];
    if (servicePages.includes(page)) {
      const servicesToggle = document.querySelector('[data-nav="services"]');
      if (servicesToggle) servicesToggle.classList.add('is-active');
    }
  }

  /* ── 5. Disable tel: links on desktop ── */
  document.querySelectorAll('a[href^="tel"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      if (window.innerWidth >= 1024) e.preventDefault();
    });
  });

  /* ── 6. Smooth Scroll for anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── 7. Chat Widget — show after 3-second delay ── */
  const chatWidget = document.getElementById('chat-widget');
  if (chatWidget) {
    setTimeout(() => chatWidget.classList.add('is-visible'), 3000);
  }

});
