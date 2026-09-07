/**
 * GLAYZYR section library — shared runtime.
 *
 * Exposes window.GlayzyrSections with helpers every section reuses:
 *   register(name, initFn) — binds a per-section initializer to Theme Editor
 *   lifecycle events, guards against double init, and runs teardown on unload.
 *
 * initFn(root) may return a cleanup function. Sections are scoped to their own
 * root element, so multiple instances on one page never interfere.
 */
(() => {
  if (window.GlayzyrSections) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const registry = new Map();
  const instances = new WeakMap();

  function initRoot(name, root, initFn) {
    if (instances.has(root)) return;
    let cleanup;
    try {
      cleanup = initFn(root);
    } catch (error) {
      console.error(`[glayzyr:${name}]`, error);
      return;
    }
    instances.set(root, typeof cleanup === 'function' ? cleanup : () => {});
  }

  function destroyRoot(root) {
    const cleanup = instances.get(root);
    if (!cleanup) return;
    instances.delete(root);
    cleanup();
  }

  function roots(name, scope) {
    const selector = `[data-glayzyr-section="${name}"]`;
    const found = [];
    if (scope instanceof Element && scope.matches(selector)) found.push(scope);
    (scope || document).querySelectorAll(selector).forEach((el) => found.push(el));
    return found;
  }

  function register(name, initFn) {
    registry.set(name, initFn);
    const run = () => roots(name, document).forEach((root) => initRoot(name, root, initFn));
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', run, { once: true });
    } else {
      run();
    }
  }

  document.addEventListener('shopify:section:load', (event) => {
    registry.forEach((initFn, name) => {
      roots(name, event.target).forEach((root) => initRoot(name, root, initFn));
    });
  });

  document.addEventListener('shopify:section:unload', (event) => {
    registry.forEach((_, name) => {
      roots(name, event.target).forEach(destroyRoot);
    });
  });

  /** Reveals [data-glayzyr-reveal] children once, then disconnects. */
  function observeReveals(root) {
    const targets = root.querySelectorAll('[data-glayzyr-reveal]');
    if (!targets.length) return () => {};
    if (reducedMotion.matches || !('IntersectionObserver' in window)) {
      targets.forEach((el) => el.setAttribute('data-glayzyr-inview', ''));
      return () => {};
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.setAttribute('data-glayzyr-inview', '');
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.12 }
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }

  /** Collects listeners/frames/observers so a section can tear down in one call. */
  function createDisposer() {
    const disposers = [];
    return {
      listen(target, type, handler, options) {
        target.addEventListener(type, handler, options);
        disposers.push(() => target.removeEventListener(type, handler, options));
      },
      add(fn) {
        disposers.push(fn);
      },
      frame(id) {
        disposers.push(() => cancelAnimationFrame(id));
      },
      dispose() {
        while (disposers.length) disposers.pop()();
      },
    };
  }

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  window.GlayzyrSections = { register, observeReveals, createDisposer, reducedMotion, clamp };

  // Every section gets scroll reveals, whether or not it registers behaviour.
  const revealed = new WeakMap();

  const autoReveal = (scope) => {
    scope.querySelectorAll('[data-glayzyr-section]').forEach((root) => {
      if (revealed.has(root)) return;
      revealed.set(root, observeReveals(root));
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => autoReveal(document), { once: true });
  } else {
    autoReveal(document);
  }

  document.addEventListener('shopify:section:load', (event) => autoReveal(event.target));
  document.addEventListener('shopify:section:unload', (event) => {
    event.target.querySelectorAll('[data-glayzyr-section]').forEach((root) => {
      const disconnect = revealed.get(root);
      if (!disconnect) return;
      revealed.delete(root);
      disconnect();
    });
  });
})();
