/* Shannons HVAC Limited — shared interactions */
(function () {
  // nav scroll state
  var nav = document.getElementById('nav');
  if (nav) {
    var onScroll = function () {
      if (window.scrollY > 40) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
  }

  // mobile menu
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  if (toggle && links) {
    var setOpen = function (open) {
      links.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
    };
    toggle.addEventListener('click', function () { setOpen(!links.classList.contains('open')); });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setOpen(false); });
    });
  }

  // rolling hero (first slide stays static under reduced motion)
  var slides = document.querySelectorAll('.hero-slide');
  if (slides.length > 1) {
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduce) {
      var i = 0;
      setInterval(function () {
        slides[i].classList.remove('active');
        i = (i + 1) % slides.length;
        slides[i].classList.add('active');
      }, 6000);
    }
  }

  // scroll reveal
  var rev = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && rev.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    rev.forEach(function (el) { io.observe(el); });
  } else {
    rev.forEach(function (el) { el.classList.add('in'); });
  }
})();

/* Gmail compose (no literal email in the HTML) */
(function () {
  document.querySelectorAll('a[data-gmail]').forEach(function (a) {
    var to = a.getAttribute('data-user') + '@' + a.getAttribute('data-domain');
    var su = a.getAttribute('data-su') || '';
    var body = a.getAttribute('data-body') || '';
    a.href = 'https://mail.google.com/mail/?view=cm&fs=1&to=' + encodeURIComponent(to) + '&su=' + su + '&body=' + body;
    a.target = '_blank'; a.rel = 'noopener';
  });
})();

/* Accordions: open the one the URL points at, so the Services drop-down
   and any shared link land on an open panel rather than a closed heading. */
(function () {
  function openTarget() {
    var id = location.hash.slice(1);
    if (!id) return;
    var el = document.getElementById(id);
    if (el && el.tagName === 'DETAILS' && !el.open) {
      el.open = true;
      el.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }
  }
  window.addEventListener('hashchange', openTarget);
  openTarget();
})();
