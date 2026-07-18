document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  var scrim = document.querySelector('.nav-scrim');

  function closeNav() {
    nav.classList.remove('open');
    scrim.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  if (toggle && nav && scrim) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('open');
      scrim.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
    scrim.addEventListener('click', closeNav);
  }

  // Mobile: tap a dropdown parent link to expand its submenu instead of navigating away
  document.querySelectorAll('.has-dropdown > a').forEach(function (link) {
    link.addEventListener('click', function (e) {
      if (window.innerWidth <= 720) {
        var parent = link.parentElement;
        if (!parent.classList.contains('open')) {
          e.preventDefault();
          document.querySelectorAll('.has-dropdown.open').forEach(function (el) { el.classList.remove('open'); });
          parent.classList.add('open');
        }
      }
    });
  });

  // Contact / enquiry form: front-end only placeholder submit
  document.querySelectorAll('form[data-enquiry-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var status = form.querySelector('.form-status');
      if (status) {
        status.textContent = 'Thanks! This form is not connected to email yet — see README for how to wire it up. For now, please call or email us directly.';
        status.style.display = 'block';
      }
      form.reset();
    });
  });

  // Highlight current page in nav
  var current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href === current) a.classList.add('active');
  });

  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Carousels: [data-carousel] with [data-autoplay] (ms) for auto-advance
  document.querySelectorAll('[data-carousel]').forEach(function (root) {
    var track = root.querySelector('.carousel-track');
    var slides = Array.prototype.slice.call(root.querySelectorAll('.carousel-slide'));
    var dotsWrap = root.querySelector('.carousel-dots');
    var prevBtn = root.querySelector('.carousel-btn.prev');
    var nextBtn = root.querySelector('.carousel-btn.next');
    if (!track || slides.length === 0) return;

    var index = 0;
    var timer = null;
    var autoplay = parseInt(root.getAttribute('data-autoplay') || '5000', 10);

    var dots = slides.map(function (_, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('aria-label', 'Go to slide ' + (i + 1));
      b.addEventListener('click', function () { goTo(i); restart(); });
      if (dotsWrap) dotsWrap.appendChild(b);
      return b;
    });

    function render() {
      track.style.transform = 'translateX(-' + (index * 100) + '%)';
      dots.forEach(function (d, i) { d.classList.toggle('active', i === index); });
    }
    function goTo(i) { index = (i + slides.length) % slides.length; render(); }
    function next() { goTo(index + 1); }
    function prev() { goTo(index - 1); }
    function restart() {
      if (timer) clearInterval(timer);
      if (autoplay > 0) timer = setInterval(next, autoplay);
    }

    if (nextBtn) nextBtn.addEventListener('click', function () { next(); restart(); });
    if (prevBtn) prevBtn.addEventListener('click', function () { prev(); restart(); });
    root.addEventListener('mouseenter', function () { if (timer) clearInterval(timer); });
    root.addEventListener('mouseleave', restart);

    render();
    restart();
  });
});
