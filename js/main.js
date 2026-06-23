// Hamburger menu
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

if (hamburger && nav) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    nav.classList.toggle('active');
  });
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      nav.classList.remove('active');
    });
  });
}

// Fade-in on scroll
const fadeElements = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });
fadeElements.forEach(el => observer.observe(el));

// Mobile gallery carousel counter
const galleryCarousel = document.querySelector('[data-gallery-carousel]');
const galleryCurrent = document.querySelector('[data-gallery-current]');
const galleryTotal = document.querySelector('[data-gallery-total]');

if (galleryCarousel && galleryCurrent && galleryTotal) {
  const galleryItems = Array.from(galleryCarousel.querySelectorAll('.gallery-item'));
  galleryTotal.textContent = String(galleryItems.length);

  let ticking = false;

  const updateGalleryCounter = () => {
    const carouselLeft = galleryCarousel.getBoundingClientRect().left;
    let activeIndex = 0;
    let smallestDistance = Number.POSITIVE_INFINITY;

    galleryItems.forEach((item, index) => {
      const distance = Math.abs(item.getBoundingClientRect().left - carouselLeft);
      if (distance < smallestDistance) {
        smallestDistance = distance;
        activeIndex = index;
      }
    });

    galleryCurrent.textContent = String(activeIndex + 1);
    ticking = false;
  };

  const requestGalleryCounterUpdate = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateGalleryCounter);
  };

  galleryCarousel.addEventListener('scroll', requestGalleryCounterUpdate, { passive: true });
  window.addEventListener('resize', requestGalleryCounterUpdate);
  window.addEventListener('load', requestGalleryCounterUpdate);
  requestGalleryCounterUpdate();
}
