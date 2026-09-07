/**
 * GLAYZYR FAQ accordion.
 *
 * Panels animate between height 0 and their measured height, then settle on
 * `auto` so reflowing content (fonts, images) is never clipped. The `hidden`
 * attribute is removed before measuring and restored after collapsing, keeping
 * closed answers out of the accessibility tree and out of find-in-page.
 */
(() => {
  const lib = window.GlayzyrSections;
  if (!lib) return;

  lib.register('faq', (root) => {
    const items = Array.from(root.querySelectorAll('[data-faq-item]'));
    if (!items.length) return;

    const disposer = lib.createDisposer();
    const singleOpen = root.dataset.singleOpen === 'true';

    const entries = items
      .map((item) => ({
        item,
        trigger: item.querySelector('[data-faq-trigger]'),
        panel: item.querySelector('[data-faq-panel]'),
      }))
      .filter((entry) => entry.trigger && entry.panel);

    function collapse(entry) {
      const { trigger, panel } = entry;
      if (trigger.getAttribute('aria-expanded') !== 'true') return;
      trigger.setAttribute('aria-expanded', 'false');

      if (lib.reducedMotion.matches) {
        panel.style.height = '';
        panel.hidden = true;
        return;
      }

      panel.style.height = `${panel.scrollHeight}px`;
      requestAnimationFrame(() => {
        panel.style.height = '0px';
      });
    }

    function expand(entry) {
      const { trigger, panel } = entry;
      if (trigger.getAttribute('aria-expanded') === 'true') return;
      trigger.setAttribute('aria-expanded', 'true');
      panel.hidden = false;

      if (lib.reducedMotion.matches) {
        panel.style.height = 'auto';
        return;
      }

      panel.style.height = '0px';
      requestAnimationFrame(() => {
        panel.style.height = `${panel.scrollHeight}px`;
      });
    }

    entries.forEach((entry) => {
      const { trigger, panel } = entry;

      disposer.listen(trigger, 'click', () => {
        const isOpen = trigger.getAttribute('aria-expanded') === 'true';
        if (isOpen) {
          collapse(entry);
          return;
        }
        if (singleOpen) entries.forEach((other) => other !== entry && collapse(other));
        expand(entry);
      });

      // Settle to auto/hidden once the height transition finishes.
      disposer.listen(panel, 'transitionend', (event) => {
        if (event.propertyName !== 'height' || event.target !== panel) return;
        if (trigger.getAttribute('aria-expanded') === 'true') {
          panel.style.height = 'auto';
        } else {
          panel.style.height = '';
          panel.hidden = true;
        }
      });

      disposer.add(() => {
        panel.style.height = '';
      });
    });

    return () => disposer.dispose();
  });
})();
