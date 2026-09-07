/**
 * GLAYZYR depth showcase — center-focused depth carousel.
 *
 * The centred slide is the visual hero; the rest fan out symmetrically on both
 * sides with progressive scale, z-depth, opacity, blur and perspective tilt.
 * Placement is expressed purely as CSS custom properties per slide, so the
 * browser interpolates the motion — no animation library, no per-frame JS.
 *
 * Supports prev/next, drag, swipe, wheel, arrow keys, dots, and optional
 * autoplay that pauses on hover, focus and when scrolled out of view.
 */
(() => {
  const lib = window.GlayzyrSections;
  if (!lib) return;

  const DRAG_THRESHOLD = 60;

  lib.register('depth-carousel', (root) => {
    const viewport = root.querySelector('[data-glayzyr-viewport]');
    const slides = Array.from(root.querySelectorAll('[data-glayzyr-slide]'));
    if (!viewport || slides.length === 0) return;

    const disposer = lib.createDisposer();
    const dots = Array.from(root.querySelectorAll('[data-glayzyr-dot]'));
    const status = root.querySelector('[data-glayzyr-status]');
    const prevButton = root.querySelector('[data-glayzyr-prev]');
    const nextButton = root.querySelector('[data-glayzyr-next]');

    const total = slides.length;
    const config = {
      sides: parseInt(root.dataset.visibleSides, 10) || 3,
      spread: (parseFloat(root.dataset.spread) || 82) / 100,
      depth: (parseFloat(root.dataset.depth) || 60) / 100,
      tilt: parseFloat(root.dataset.tilt) || 22,
    };
    const autoplayEnabled = root.dataset.autoplay === 'true' && total > 1;
    const autoplayDelay = (parseFloat(root.dataset.autoplaySpeed) || 5) * 1000;

    let current = Math.floor(total / 2);
    let timer = 0;
    let paused = false;
    let onScreen = false;

    /** Signed distance to `index` on the shortest way around the loop. */
    function relativeOffset(index) {
      let delta = index - current;
      const half = total / 2;
      if (delta > half) delta -= total;
      if (delta < -half) delta += total;
      return delta;
    }

    /** How many cards fit per side at this width, never more than configured. */
    function sidesForWidth() {
      const width = window.innerWidth;
      if (width < 750) return Math.min(config.sides, 1);
      if (width < 1100) return Math.min(config.sides, 2);
      return config.sides;
    }

    function render() {
      const sides = sidesForWidth();
      // Measure the centred slide — it is the one guaranteed to be visible.
      const cardWidth = slides[current].offsetWidth || 300;

      slides.forEach((slide, index) => {
        const offset = relativeOffset(index);
        const distance = Math.abs(offset);
        const beyond = distance > sides;

        slide.hidden = beyond;
        slide.setAttribute('aria-hidden', beyond ? 'true' : 'false');
        if (beyond) return;

        const direction = Math.sign(offset);
        // Sub-linear spacing keeps far cards from flying off the viewport.
        const x = direction * Math.pow(distance, 0.82) * cardWidth * config.spread;
        const z = -distance * 190 * config.depth;
        const scale = Math.max(0.55, 1 - distance * 0.14);
        const fade = Math.max(0.18, 1 - distance * (0.16 + config.depth * 0.16));
        const blur = distance === 0 ? 0 : Math.min(6, distance * 1.5 * config.depth);
        const tint = distance === 0 ? 0 : Math.min(0.42, distance * 0.11);

        slide.style.setProperty('--glayzyr-x', `${x}px`);
        slide.style.setProperty('--glayzyr-z', `${z}px`);
        slide.style.setProperty('--glayzyr-rotate', `${-direction * config.tilt * Math.min(distance, 2)}deg`);
        slide.style.setProperty('--glayzyr-scale', `${scale}`);
        slide.style.setProperty('--glayzyr-fade', `${fade}`);
        slide.style.setProperty('--glayzyr-blur', `${blur}px`);
        slide.style.setProperty('--glayzyr-tint', `${tint}`);
        slide.style.zIndex = `${100 - distance}`;

        if (distance === 0) {
          slide.setAttribute('data-current', '');
        } else {
          slide.removeAttribute('data-current');
        }

        // Only the focal card is reachable by keyboard.
        slide.querySelectorAll('a, button, input').forEach((el) => {
          el.tabIndex = distance === 0 ? 0 : -1;
        });
      });

      dots.forEach((dot, index) => {
        dot.setAttribute('aria-selected', index === current ? 'true' : 'false');
      });

      if (status) status.textContent = `Product ${current + 1} of ${total}`;
    }

    function goTo(index) {
      current = ((index % total) + total) % total;
      render();
      restartAutoplay();
    }

    const next = () => goTo(current + 1);
    const prev = () => goTo(current - 1);

    /* Autoplay ------------------------------------------------------------ */

    function stopAutoplay() {
      clearInterval(timer);
      timer = 0;
    }

    function restartAutoplay() {
      stopAutoplay();
      if (!autoplayEnabled || paused || !onScreen || lib.reducedMotion.matches) return;
      timer = setInterval(next, autoplayDelay);
    }

    function setPaused(value) {
      paused = value;
      restartAutoplay();
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        restartAutoplay();
      },
      { threshold: 0.2 }
    );
    observer.observe(root);

    disposer.listen(root, 'pointerenter', () => setPaused(true));
    disposer.listen(root, 'pointerleave', () => setPaused(false));
    disposer.listen(root, 'focusin', () => setPaused(true));
    disposer.listen(root, 'focusout', () => setPaused(false));

    /* Controls ------------------------------------------------------------ */

    if (prevButton) disposer.listen(prevButton, 'click', prev);
    if (nextButton) disposer.listen(nextButton, 'click', next);
    dots.forEach((dot) => {
      disposer.listen(dot, 'click', () => goTo(parseInt(dot.dataset.index, 10) || 0));
    });

    disposer.listen(viewport, 'keydown', (event) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        prev();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        next();
      }
    });

    /* Drag & swipe -------------------------------------------------------- */

    let pointerId = null;
    let startX = 0;
    let startY = 0;
    let horizontal = false;

    disposer.listen(viewport, 'pointerdown', (event) => {
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      pointerId = event.pointerId;
      startX = event.clientX;
      startY = event.clientY;
      horizontal = false;
      viewport.dataset.dragging = 'true';
    });

    disposer.listen(viewport, 'pointermove', (event) => {
      if (event.pointerId !== pointerId) return;
      const dx = event.clientX - startX;
      const dy = event.clientY - startY;
      // Let vertical gestures scroll the page untouched.
      if (!horizontal && Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 10) horizontal = true;
      if (!horizontal || Math.abs(dx) < DRAG_THRESHOLD) return;
      if (dx < 0) next();
      else prev();
      startX = event.clientX;
    });

    const endDrag = (event) => {
      if (event.pointerId !== pointerId) return;
      pointerId = null;
      delete viewport.dataset.dragging;
    };

    disposer.listen(viewport, 'pointerup', endDrag);
    disposer.listen(viewport, 'pointercancel', endDrag);

    /* Horizontal wheel / trackpad ----------------------------------------- */

    let wheelLock = 0;
    disposer.listen(
      viewport,
      'wheel',
      (event) => {
        if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
        event.preventDefault();
        const now = Date.now();
        if (now - wheelLock < 350) return;
        wheelLock = now;
        if (event.deltaX > 0) next();
        else prev();
      },
      { passive: false }
    );

    const onResize = () => render();
    disposer.listen(window, 'resize', onResize, { passive: true });
    disposer.add(() => {
      observer.disconnect();
      stopAutoplay();
    });

    render();
    return () => disposer.dispose();
  });
})();
