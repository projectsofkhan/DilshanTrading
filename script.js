/* ============================================================
   DILSHAN TRADING — script.js
   Menu, sticky header, reveals, counters, view-more, anchors,
   back-to-top, external link safety.
   ============================================================ */

(() => {
  'use strict';

  /* ----------------------------------------------------------
     00 · HELPERS
     ---------------------------------------------------------- */
  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ----------------------------------------------------------
     01 · MOBILE MENU
     ---------------------------------------------------------- */
  const nav    = $('#nav');
  const burger = $('.burger');
  const body   = document.body;

  const setMenu = (open) => {
    if (!burger || !nav) return;
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    nav.classList.toggle('is-open', open);
    body.classList.toggle('nav-open', open);
  };

  const closeMenu = () => setMenu(false);

  if (burger && nav) {
    burger.addEventListener('click', () => {
      const open = burger.getAttribute('aria-expanded') !== 'true';
      setMenu(open);
    });

    $$('a', nav).forEach((link) =>
      link.addEventListener('click', closeMenu)
    );

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });

    let resizeTimer = 0;
    window.addEventListener('resize', () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        if (window.innerWidth > 820) closeMenu();
      }, 150);
    }, { passive: true });
  }

  /* ----------------------------------------------------------
     02 · STICKY HEADER
     ---------------------------------------------------------- */
  const header = $('#header');
  let headerScheduled = false;

  const updateHeader = () => {
    if (!header) return;
    const y = window.scrollY || document.documentElement.scrollTop;
    header.classList.toggle('is-stuck', y > 20);
    headerScheduled = false;
  };

  /* ----------------------------------------------------------
     03 · BACK TO TOP
     ---------------------------------------------------------- */
  const toTop = $('.to-top');
  let toTopScheduled = false;

  const updateToTop = () => {
    if (!toTop) return;
    const y = window.scrollY || document.documentElement.scrollTop;
    toTop.classList.toggle('is-visible', y > 460);
    toTopScheduled = false;
  };

  /* ----------------------------------------------------------
     04 · SCROLL PIPELINE
     ---------------------------------------------------------- */
  const onScroll = () => {
    if (!headerScheduled) {
      window.requestAnimationFrame(updateHeader);
      headerScheduled = true;
    }
    if (!toTopScheduled) {
      window.requestAnimationFrame(updateToTop);
      toTopScheduled = true;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  updateHeader();
  updateToTop();

  if (toTop) {
    toTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: reduceMotion ? 'auto' : 'smooth'
      });
    });
  }

  /* ----------------------------------------------------------
     05 · REVEAL ON SCROLL
     ---------------------------------------------------------- */
  const reveals = $$('.reveal');

  if (reduceMotion || !('IntersectionObserver' in window)) {
    reveals.forEach((el) => el.classList.add('in-view'));
  } else {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in-view');
        obs.unobserve(entry.target);
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -8% 0px'
    });

    reveals.forEach((el) => io.observe(el));
  }

  /* ----------------------------------------------------------
     06 · STAT COUNTERS
     ---------------------------------------------------------- */
  const counters = $$('[data-count]');

  const runCounter = (el) => {
    const target = Number(el.dataset.count || 0);
    const duration = 1400;
    const start = performance.now();

    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = String(Math.round(target * eased));
      if (t < 1) window.requestAnimationFrame(tick);
      else el.textContent = String(target);
    };

    window.requestAnimationFrame(tick);
  };

  if (counters.length) {
    if (reduceMotion || !('IntersectionObserver' in window)) {
      counters.forEach((el) => {
        el.textContent = String(el.dataset.count || 0);
      });
    } else {
      const co = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          runCounter(entry.target);
          obs.unobserve(entry.target);
        });
      }, { threshold: 0.55 });

      counters.forEach((el) => co.observe(el));
    }
  }

  /* ----------------------------------------------------------
     07 · VIEW MORE — DELIVERY PLACES
     ---------------------------------------------------------- */
  const viewMore = $('.view-more');
  const extra    = $('#places-extra');

  if (viewMore && extra) {
    viewMore.addEventListener('click', () => {
      const open = viewMore.getAttribute('aria-expanded') !== 'true';
      viewMore.setAttribute('aria-expanded', String(open));
      extra.hidden = !open;

      const label = viewMore.querySelector('span');
      if (label) label.textContent = open ? 'View Less' : 'View More';
    });
  }

  /* ----------------------------------------------------------
     08 · SMOOTH ANCHOR SCROLL WITH HEADER OFFSET
     ---------------------------------------------------------- */
  $$('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const id = link.getAttribute('href');

      if (!id || id === '#' || id.length < 2) return;

      const target = document.querySelector(id);
      if (!target) return;

      event.preventDefault();

      const headerH = header ? header.getBoundingClientRect().height : 0;
      const top =
        target.getBoundingClientRect().top +
        window.scrollY -
        headerH -
        20;

      window.scrollTo({
        top: Math.max(top, 0),
        behavior: reduceMotion ? 'auto' : 'smooth'
      });

      if (history.replaceState) {
        history.replaceState(null, '', id);
      }
    });
  });

  /* ----------------------------------------------------------
     09 · FOOTER YEAR
     ---------------------------------------------------------- */
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ----------------------------------------------------------
     10 · EXTERNAL LINK SAFETY
     ---------------------------------------------------------- */
  $$('a[target="_blank"]').forEach((link) => {
    const rel = link.getAttribute('rel') || '';
    if (!rel.includes('noopener')) {
      link.setAttribute('rel', `${rel} noopener noreferrer`.trim());
    }
  });

})();