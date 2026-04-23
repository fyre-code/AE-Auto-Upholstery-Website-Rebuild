/* ============================================================
   A & E Auto Upholstery — Gallery Carousel + Lightbox
   Pure JS, no dependencies. One slide visible at a time.
   Click any image to open it full-size in the lightbox.
   ============================================================ */

class Carousel {
  constructor(wrapperId) {
    this.wrap = document.getElementById(wrapperId);
    if (!this.wrap) return;

    this.track    = this.wrap.querySelector('.carousel-track');
    this.slides   = Array.from(this.wrap.querySelectorAll('.carousel-slide'));
    this.prevBtn  = this.wrap.querySelector('.carousel-btn--prev');
    this.nextBtn  = this.wrap.querySelector('.carousel-btn--next');
    this.dotsWrap = this.wrap.querySelector('.carousel-dots');

    this.current   = 0;
    this.autoTimer = null;

    this.init();
  }

  get pageCount() { return this.slides.length; }

  init() {
    this.buildDots();
    this.update();
    this.prevBtn.addEventListener('click', () => this.prev());
    this.nextBtn.addEventListener('click', () => this.next());
    this.startAuto();
    this.wrap.addEventListener('mouseenter', () => this.stopAuto());
    this.wrap.addEventListener('mouseleave', () => this.startAuto());
    this.addSwipe();
  }

  buildDots() {
    this.dotsWrap.innerHTML = '';
    for (let i = 0; i < this.pageCount; i++) {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot';
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      dot.addEventListener('click', () => { this.current = i; this.update(); });
      this.dotsWrap.appendChild(dot);
    }
  }

  prev() {
    this.current = this.current > 0 ? this.current - 1 : this.pageCount - 1;
    this.update();
  }

  next() {
    this.current = this.current < this.pageCount - 1 ? this.current + 1 : 0;
    this.update();
  }

  update() {
    if (!this.slides.length) return;
    const slideWidth = this.slides[0].offsetWidth;
    this.track.style.transform = `translateX(-${this.current * slideWidth}px)`;

    const dots = this.dotsWrap.querySelectorAll('.carousel-dot');
    dots.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === this.current);
      dot.setAttribute('aria-pressed', String(i === this.current));
    });
  }

  startAuto() {
    this.stopAuto();
    this.autoTimer = setInterval(() => this.next(), 5000);
  }

  stopAuto() {
    if (this.autoTimer) clearInterval(this.autoTimer);
  }

  addSwipe() {
    let startX = 0;
    this.wrap.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    }, { passive: true });
    this.wrap.addEventListener('touchend', (e) => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) diff > 0 ? this.next() : this.prev();
    }, { passive: true });
  }
}

/* ── Lightbox ── */
function initLightbox() {
  const lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.setAttribute('role', 'dialog');
  lb.setAttribute('aria-modal', 'true');
  lb.setAttribute('aria-label', 'Image viewer');
  lb.innerHTML = `
    <button class="lightbox-close" aria-label="Close image viewer">&times;</button>
    <img class="lightbox-img" src="" alt="">
  `;
  document.body.appendChild(lb);

  const lbImg   = lb.querySelector('.lightbox-img');
  const lbClose = lb.querySelector('.lightbox-close');

  function open(src, alt) {
    lbImg.src = src;
    lbImg.alt = alt;
    lb.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    lbClose.focus();
  }

  function close() {
    lb.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  lbClose.addEventListener('click', close);
  lb.addEventListener('click', (e) => { if (e.target === lb) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });

  document.querySelectorAll('.carousel-slide img, .rv-single-img').forEach((img) => {
    img.addEventListener('click', () => open(img.src, img.alt));
  });
}

document.addEventListener('DOMContentLoaded', () => {
  new Carousel('carousel-auto');
  new Carousel('carousel-boat');
  new Carousel('carousel-motorcycle');
  initLightbox();
});
