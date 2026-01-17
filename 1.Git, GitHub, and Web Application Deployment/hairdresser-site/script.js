// Mobile nav toggle
document.addEventListener('DOMContentLoaded', function () {
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('primary-nav');
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      const expanded = this.getAttribute('aria-expanded') === 'true' || false;
      this.setAttribute('aria-expanded', !expanded);
      nav.setAttribute('aria-expanded', !expanded);
    });
  }

  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      if (!name || !email || !message) {
        alert('Please fill out all fields before sending.');
        return;
      }
      // In a real site you'd send this to an API. Here we just show a confirmation.
      alert('Thanks, ' + name + '! Your message has been received. We will reply to ' + email + '.');
      form.reset();
    });
  }

  /* Gallery lightbox */
  const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
  if (galleryItems.length) {
    const images = galleryItems.map(btn => btn.querySelector('img').src);
    // create lightbox markup
    const lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.innerHTML = `
      <div class="lightbox-content">
        <button class="lightbox-close" aria-label="Close">✕</button>
        <button class="lightbox-prev" aria-label="Previous">◀</button>
        <img src="" alt="" />
        <button class="lightbox-next" aria-label="Next">▶</button>
      </div>`;
    document.body.appendChild(lb);

    const lbImg = lb.querySelector('img');
    const btnClose = lb.querySelector('.lightbox-close');
    const btnPrev = lb.querySelector('.lightbox-prev');
    const btnNext = lb.querySelector('.lightbox-next');
    let current = 0;

    function openLightbox(index) {
      current = index;
      lbImg.src = images[current];
      lb.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function closeLightbox() {
      lb.classList.remove('open');
      document.body.style.overflow = '';
    }
    function showNext() { current = (current + 1) % images.length; lbImg.src = images[current]; }
    function showPrev() { current = (current - 1 + images.length) % images.length; lbImg.src = images[current]; }

    galleryItems.forEach((btn, i) => {
      btn.addEventListener('click', () => openLightbox(i));
    });

    btnClose.addEventListener('click', closeLightbox);
    btnNext.addEventListener('click', showNext);
    btnPrev.addEventListener('click', showPrev);

    lb.addEventListener('click', function (e) {
      if (e.target === lb) closeLightbox();
    });

    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    });
  }
});