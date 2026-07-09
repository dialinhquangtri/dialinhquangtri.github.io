// NĂM ĐỊA LINH — hiệu ứng nhẹ, tôn trọng nội dung tưởng niệm
(function () {
  'use strict';

  // 1) Reveal khi cuộn tới
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.14 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  // 2) Nav active theo mục đang xem
  var sections = document.querySelectorAll('section[id]');
  var links = {};
  document.querySelectorAll('.nav a').forEach(function (a) {
    var id = a.getAttribute('href');
    if (id && id.charAt(0) === '#') links[id.slice(1)] = a;
  });
  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && links[e.target.id]) {
          Object.keys(links).forEach(function (k) { links[k].classList.remove('active'); });
          links[e.target.id].classList.add('active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { spy.observe(s); });
  }

  // 3) Parallax nhẹ cho hero
  var bg = document.querySelector('.hero__bg');
  if (bg) {
    window.addEventListener('scroll', function () {
      var y = window.scrollY;
      if (y < window.innerHeight) bg.style.transform = 'scale(1.06) translateY(' + (y * 0.18) + 'px)';
    }, { passive: true });
  }
})();
