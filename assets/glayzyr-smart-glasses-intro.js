/**
 * GLAYZYR intro — cinematic float-in for the media column.
 *
 * The image drifts upward and settles as the section enters the viewport,
 * reading as a continuation of the hero above it. Transform-only, driven by a
 * scroll-linked rAF loop that runs solely while the section is on screen.
 */
(() => {
  const lib = window.GlayzyrSections;
  if (!lib) return;

  lib.register('smart-glasses-intro', (root) => {
    const media = root.querySelector('[data-glayzyr-media]');
    const disposer = lib.createDisposer();
    const animate = root.dataset.animate === 'true';
    if (!media || !animate || lib.reducedMotion.matches) return () => disposer.dispose();

    const intensity = (parseFloat(root.dataset.intensity) || 45) / 100;
    let visible = false;
    let frame = 0;

    const render = () => {
      frame = 0;
      const rect = root.getBoundingClientRect();
      const span = window.innerHeight + rect.height;
      // 1 → section still below the fold, 0 → fully scrolled past.
      const progress = lib.clamp((window.innerHeight - rect.top) / span, 0, 1);
      const eased = (0.5 - progress) * 2;
      media.style.transform = `translate3d(0, ${eased * 70 * intensity}px, 0) scale(${1 + eased * 0.05 * intensity})`;
    };

    const schedule = () => {
      if (!visible || frame) return;
      frame = requestAnimationFrame(render);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        schedule();
      },
      { rootMargin: '15% 0px' }
    );
    observer.observe(root);

    disposer.listen(window, 'scroll', schedule, { passive: true });
    disposer.listen(window, 'resize', schedule, { passive: true });
    disposer.add(() => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      media.style.transform = '';
    });

    render();
    return () => disposer.dispose();
  });
})();
