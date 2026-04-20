/* ============================================================
   A & E Auto Upholstery — Gallery Carousel
   Pure JS, no dependencies. Handles 4 independent carousels.
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

    this.current       = 0;
    this.slidesVisible = this.getSlidesVisible();
    this.autoTimer     = null;

    this.init();
  }

  getSlidesVisible() {
    if (window.innerWidth < 640)  return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  }

  get pageCount() {
    return Math.ceil(this.slides.length / this.slidesVisible);
  }

  init() {
    this.buildDots();
    this.update();
    this.prevBtn.addEventListener('click', () => this.prev());
    this.nextBtn.addEventListener('click', () => this.next());
    this.startAuto();
    this.wrap.addEventListener('mouseenter', () => this.stopAuto());
    this.wrap.addEventListener('mouseleave', () => this.startAuto());
    this.addSwipe();
    window.addEventListener('resize', () => {
      const newVisible = this.getSlidesVisible();
      if (newVisible !== this.slidesVisible) {
        this.slidesVisible = newVisible;
        this.current = 0;
        this.rebuildDots();
        this.update();
      }
    });
  }

  buildDots() {
    this.dotsWrap.innerHTML = '';
    for (let i = 0; i < this.pageCount; i++) {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot';
      dot.setAttribute('aria-label', `Go to slide page ${i + 1}`);
      dot.addEventListener('click', () => { this.current = i; this.update(); });
      this.dotsWrap.appendChild(dot);
    }
  }

  rebuildDots() { this.buildDots(); }

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
    this.track.style.transform = `translateX(-${this.current * this.slidesVisible * slideWidth}px)`;

    const dots = this.dotsWrap.querySelectorAll('.carousel-dot');
    dots.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === this.current);
      dot.setAttribute('aria-pressed', String(i === this.current));
    });

    this.prevBtn.setAttribute('aria-disabled', String(this.current === 0 && this.pageCount > 1));
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
      if (Math.abs(diff) > 50) {
        diff > 0 ? this.next() : this.prev();
      }
    }, { passive: true });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new Carousel('carousel-auto');
  new Carousel('carousel-boat');
  new Carousel('carousel-motorcycle');
  new Carousel('carousel-rv');
});
