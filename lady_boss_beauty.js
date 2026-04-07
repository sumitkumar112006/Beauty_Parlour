/* ======================================================
       LOADER
       ====================================================== */
    window.addEventListener('load', () => {
      setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
      }, 2000);
    });

    /* ======================================================
       CUSTOM CURSOR
       ====================================================== */
    const dot  = document.getElementById('cursorDot');
    const ring = document.getElementById('cursorRing');
    let mouseX = 0, mouseY = 0;
    let ringX  = 0, ringY  = 0;

    document.addEventListener('mousemove', e => {
      mouseX = e.clientX; mouseY = e.clientY;
      dot.style.left = mouseX + 'px';
      dot.style.top  = mouseY + 'px';
    });

    (function animateRing() {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.left = ringX + 'px';
      ring.style.top  = ringY + 'px';
      requestAnimationFrame(animateRing);
    })();

    document.querySelectorAll('a, button, .service-card, .gallery-item').forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('hovered'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hovered'));
    });

    /* ======================================================
       NAVBAR SCROLL BEHAVIOUR
       ====================================================== */
    const navbar    = document.getElementById('navbar');
    const scrollTop = document.getElementById('scroll-top');

    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      navbar.classList.toggle('scrolled', y > 50);
      scrollTop.classList.toggle('visible', y > 400);
    });

    /* ======================================================
       HAMBURGER / MOBILE MENU
       ====================================================== */
    const hamburger  = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');

    hamburger.addEventListener('click', () => {
      const open = hamburger.classList.toggle('open');
      mobileMenu.style.display = open ? 'flex' : 'none';
      setTimeout(() => mobileMenu.classList.toggle('open', open), 10);
    });

    function closeMobile() {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      setTimeout(() => { mobileMenu.style.display = 'none'; }, 400);
    }

    /* ======================================================
       HERO SLIDESHOW
       ====================================================== */
    const slides    = document.querySelectorAll('.hero-slide');
    const heroDots  = document.querySelectorAll('.hero-dot');
    let   heroIndex = 0;
    let   heroTimer;

    function goToSlide(n) {
      slides[heroIndex].classList.remove('active');
      heroDots[heroIndex].classList.remove('active');
      heroIndex = (n + slides.length) % slides.length;
      slides[heroIndex].classList.add('active');
      heroDots[heroIndex].classList.add('active');
    }

    function nextSlide() { goToSlide(heroIndex + 1); }

    heroDots.forEach(d => {
      d.addEventListener('click', () => {
        clearInterval(heroTimer);
        goToSlide(parseInt(d.dataset.index));
        heroTimer = setInterval(nextSlide, 5500);
      });
    });

    heroTimer = setInterval(nextSlide, 5500);

    /* ======================================================
       TESTIMONIALS SLIDER
       ====================================================== */
    const track   = document.getElementById('testimonialsTrack');
    const tDots   = document.querySelectorAll('.t-dot');
    let   tIndex  = 0;
    const tTotal  = document.querySelectorAll('.testimonial-card').length;

    function goToTestimonial(n) {
      tDots[tIndex].classList.remove('active');
      tIndex = (n + tTotal) % tTotal;
      track.style.transform = `translateX(-${tIndex * 100}%)`;
      tDots[tIndex].classList.add('active');
    }

    document.getElementById('tNext').addEventListener('click', () => goToTestimonial(tIndex + 1));
    document.getElementById('tPrev').addEventListener('click', () => goToTestimonial(tIndex - 1));
    tDots.forEach((d, i) => d.addEventListener('click', () => goToTestimonial(i)));

    // Auto-advance
    setInterval(() => goToTestimonial(tIndex + 1), 6000);

    /* ======================================================
       SCROLL REVEAL (IntersectionObserver)
       ====================================================== */
    const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });

    revealEls.forEach(el => observer.observe(el));

    /* ======================================================
       COUNTER ANIMATION
       ====================================================== */
    function animateCount(el, target, suffix) {
      let current = 0;
      const step  = Math.ceil(target / 60);
      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = current + suffix;
        if (current >= target) clearInterval(timer);
      }, 25);
    }

    const statsObserver = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const nums = e.target.querySelectorAll('.stat-number');
          nums.forEach(n => {
            const raw = n.textContent.replace(/[^0-9.]/g,'');
            const val = parseFloat(raw);
            if (!isNaN(val) && !n.dataset.animated) {
              n.dataset.animated = '1';
              const sups = n.querySelector('sup')?.outerHTML || '';
              n.innerHTML = '0' + sups;
              setTimeout(() => {
                n.innerHTML = Math.round(val) + sups;
                animateCount({ set textContent(v){ n.innerHTML = v + sups; } }, Math.round(val), '');
              }, 300);
            }
          });
          statsObserver.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('.about-stats').forEach(el => statsObserver.observe(el));

    /* ======================================================
       FORM SUBMISSION
       ====================================================== */
    function handleSubmit(e) {
      e.preventDefault();
      const btn = e.currentTarget;
      btn.innerHTML = '<span>✦ Booking Request Sent! We\'ll Call You Soon ✦</span>';
      btn.style.background = 'linear-gradient(135deg, #1A7A4A, #0F5C35)';
      setTimeout(() => {
        btn.innerHTML = '<span>✦ Send Booking Request ✦</span>';
        btn.style.background = '';
      }, 4000);
    }

    /* ======================================================
       PARALLAX — subtle hero
       ====================================================== */
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      const heroSlides = document.querySelectorAll('.hero-slide.active img');
      heroSlides.forEach(img => {
        img.style.transform = `translateY(${y * 0.25}px) scale(1)`;
      });
    });

