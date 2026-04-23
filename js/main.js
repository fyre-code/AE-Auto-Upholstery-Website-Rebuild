/* ============================================================
   A & E Auto Upholstery — Main JavaScript
   Handles: footer year, mobile nav, Services dropdown, active nav
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

  /* ── 3. Services Dropdown ── */
  const dropdownToggle = document.querySelector('.nav-dropdown-toggle');
  const dropdownMenu   = document.getElementById('services-menu');

  if (dropdownToggle && dropdownMenu) {
    dropdownToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = dropdownToggle.getAttribute('aria-expanded') === 'true';
      dropdownToggle.setAttribute('aria-expanded', String(!isOpen));
      dropdownMenu.classList.toggle('is-open', !isOpen);
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        dropdownToggle.setAttribute('aria-expanded', 'false');
        dropdownMenu.classList.remove('is-open');
      }
    });

    // Close when clicking outside the dropdown
    document.addEventListener('click', (e) => {
      if (!dropdownToggle.parentElement.contains(e.target)) {
        dropdownToggle.setAttribute('aria-expanded', 'false');
        dropdownMenu.classList.remove('is-open');
      }
    });
  }

  /* ── 4. Active Nav Indicator ── */
  const page = document.body.getAttribute('data-page');
  if (page) {
    // Highlight exact page link
    const activeLink = document.querySelector(`[data-nav="${page}"]`);
    if (activeLink) activeLink.classList.add('is-active');

    // Highlight "Services" parent for all service sub-pages
    const servicePages = ['auto-rv', 'boat', 'classic-car', 'motorcycle'];
    if (servicePages.includes(page)) {
      const servicesToggle = document.querySelector('[data-nav="services"]');
      if (servicesToggle) servicesToggle.classList.add('is-active');
    }
  }

  /* ── 5. Smooth Scroll for anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── 6. Chat Widget — show after 3-second delay ── */
  const chatWidget = document.getElementById('chat-widget');
  if (chatWidget) {
    setTimeout(() => chatWidget.classList.add('is-visible'), 3000);
  }

});
