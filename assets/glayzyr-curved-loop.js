/**
 * GLAYZYR curved loop — SVG textPath marquee.
 *
 * The phrase is repeated until it overflows the curve, then `startOffset` is
 * scrolled by exactly one repetition width and wrapped, so the loop is seamless
 * with no clone/reflow. Pointer drag adds velocity that decays back to the
 * configured speed. rAF only runs while the section is on screen.
 */
(() => {
  const lib = window.GlayzyrSections;
  if (!lib) return;

  const SPACER = '  ';

  lib.register('curved-loop', (root) => {
    const svg = root.querySelector('svg');
    const textEl = root.querySelector('[data-glayzyr-text]');
    const textPath = root.querySelector('[data-glayzyr-path]');
    const path = svg && svg.querySelector('path');
    if (!svg || !textEl || !textPath || !path) return;

    const disposer = lib.createDisposer();
    const phrase = textPath.textContent.trim() + SPACER;
    const baseSpeed = ((parseFloat(root.dataset.speed) || 30) / 100) * 90; // user units / second
    const sign = root.dataset.direction === 'right' ? 1 : -1;
    const draggable = root.dataset.draggable === 'true';

    let unitWidth = 0;
    let offset = 0;
    let velocity = 0;
    let visible = false;
    let frame = 0;
    let last = 0;

    /** Repeats the phrase until it covers the path plus one spare repetition. */
    function layout() {
      textPath.textContent = phrase;
      unitWidth = textEl.getComputedTextLength();
      if (!unitWidth) return;
      const pathLength = path.getTotalLength();
      const repeats = Math.ceil((pathLength + unitWidth) / unitWidth) + 1;
      textPath.textContent = phrase.repeat(repeats);
      offset = ((offset % unitWidth) + unitWidth) % unitWidth;
      apply();
    }

    function apply() {
      textPath.setAttribute('startOffset', `${offset - unitWidth}`);
    }

    function tick(now) {
      frame = 0;
      const delta = last ? Math.min((now - last) / 1000, 0.05) : 0;
      last = now;

      const speed = lib.reducedMotion.matches ? 0 : baseSpeed;
      offset += (sign * speed + velocity) * delta;
      velocity *= 0.92;
      if (Math.abs(velocity) < 0.5) velocity = 0;

      if (unitWidth) offset = ((offset % unitWidth) + unitWidth) % unitWidth;
      apply();

      if (visible && (speed || velocity)) frame = requestAnimationFrame(tick);
    }

    function start() {
      if (frame || !visible) return;
      last = 0;
      frame = requestAnimationFrame(tick);
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
    });
    observer.observe(root);

    if (draggable) {
      let pointerId = null;
      let lastX = 0;

      const toUnits = (px) => (px / svg.clientWidth) * svg.viewBox.baseVal.width;

      disposer.listen(root, 'pointerdown', (event) => {
        if (event.pointerType === 'mouse' && event.button !== 0) return;
        pointerId = event.pointerId;
        lastX = event.clientX;
        velocity = 0;
        root.setPointerCapture(pointerId);
        root.dataset.dragging = 'true';
      });

      disposer.listen(root, 'pointermove', (event) => {
        if (event.pointerId !== pointerId) return;
        const delta = toUnits(event.clientX - lastX);
        lastX = event.clientX;
        offset += delta;
        velocity = delta * 30;
        if (unitWidth) offset = ((offset % unitWidth) + unitWidth) % unitWidth;
        apply();
      });

      const endDrag = (event) => {
        if (event.pointerId !== pointerId) return;
        root.releasePointerCapture(pointerId);
        pointerId = null;
        delete root.dataset.dragging;
        start();
      };

      disposer.listen(root, 'pointerup', endDrag);
      disposer.listen(root, 'pointercancel', endDrag);
    }

    const onResize = () => layout();
    disposer.listen(window, 'resize', onResize, { passive: true });
    disposer.add(() => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    });

    layout();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(layout);

    return () => disposer.dispose();
  });
})();
