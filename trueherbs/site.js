const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#site-navigation');
menuButton.hidden = false;
document.documentElement.classList.add('enhanced');
const wide = window.matchMedia('(min-width: 1001px)');
function closeMenu(returnFocus = false) {
  const wasOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.querySelector('.menu-label').textContent = '選單';
  navigation.classList.remove('is-open');
  if (returnFocus && wasOpen) menuButton.focus();
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.querySelector('.menu-label').textContent = open ? '關閉' : '選單';
  navigation.classList.toggle('is-open', open);
});
navigation.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => closeMenu()));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu(true);
});
document.addEventListener('click', (event) => {
  if (!event.target.closest('.site-header')) closeMenu();
});
document.addEventListener('focusin', (event) => {
  if (!event.target.closest('.site-header')) closeMenu();
});
wide.addEventListener('change', () => closeMenu());

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
const pause = document.querySelector('#motion-toggle');
if (pause) {
  let paused = false;
  function renderMotionState() {
    const stopped = paused || reduced.matches;
    document.body.classList.toggle('paused', stopped);
    pause.setAttribute('aria-pressed', String(stopped));
    pause.disabled = reduced.matches;
    pause.querySelector('.motion-label').textContent = reduced.matches
      ? '已減少動態'
      : paused
        ? '恢復動態'
        : '暫停動態';
    pause.querySelector('.motion-symbol').textContent = stopped ? '▷' : 'Ⅱ';
  }
  pause.hidden = false;
  renderMotionState();
  document.documentElement.classList.add('motion-ready');
  pause.addEventListener('click', () => {
    paused = !paused;
    renderMotionState();
  });
  reduced.addEventListener('change', renderMotionState);
  function renderVisibility() {
    document.body.classList.toggle('not-visible', document.hidden);
  }
  document.addEventListener('visibilitychange', renderVisibility);
  renderVisibility();
}
if (!document.body.classList.contains('article-page') && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries)
        if (entry.isIntersecting) {
          navigation.querySelectorAll('a').forEach((a) => {
            if (a.hash === `#${entry.target.id}`) a.setAttribute('aria-current', 'location');
            else a.removeAttribute('aria-current');
          });
        }
    },
    { rootMargin: '-15% 0px -60% 0px' },
  );
  document.querySelectorAll('main section[id]').forEach((section) => observer.observe(section));
}

// Native dialog preserves keyboard containment, Escape and return focus.
const galleryDialog = document.querySelector('#gallery-dialog');
if (galleryDialog && typeof galleryDialog.showModal === 'function') {
  let opener = null;
  document.querySelectorAll('[data-gallery-title]').forEach((link) =>
    link.addEventListener('click', (event) => {
      event.preventDefault();
      opener = link;
      const img = galleryDialog.querySelector('img');
      img.src = link.href;
      img.alt = link.querySelector('img').alt;
      galleryDialog.querySelector('h2').textContent = link.dataset.galleryTitle;
      galleryDialog.querySelector('#gallery-dialog-note').textContent = link.dataset.galleryNote;
      galleryDialog.showModal();
    }),
  );
  galleryDialog
    .querySelector('.dialog-close')
    .addEventListener('click', () => galleryDialog.close());
  galleryDialog.addEventListener('close', () => {
    if (opener) opener.focus();
  });
}
// Add an entrance only after visibility; never hide content before JavaScript.
if (!reduced.matches && 'IntersectionObserver' in window) {
  const once = new IntersectionObserver(
    (entries) => {
      for (const entry of entries)
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-once');
          once.unobserve(entry.target);
        }
    },
    { threshold: 0.12 },
  );
  document
    .querySelectorAll('.offers .offer-rows article,.training-layout,.forest-copy,.forest-scene:not(.forest-scene--background):not(.forest-scene--texture)')
    .forEach((el) => once.observe(el));
}

// One global interaction stylesheet for every current and future route.
// Load from the same origin so the existing Content Security Policy stays valid.
(() => {
  const href = '/trueherbs-preview/editorial-system-20261029.css';
  if (!document.querySelector('link[href$="/editorial-system-20261029.css"]')) {
    const sheet = document.createElement('link');
    sheet.rel = 'stylesheet';
    sheet.href = href;
    sheet.dataset.thEditorialSystem = '';
    document.head.appendChild(sheet);
  }
  // Remove diagonal shortcut-arrow decorations while keeping anchors, names
  // and destinations intact. Plain left/back and up/top arrows are unaffected.
  const diagonal = /[↗↖⇗➚⤴]/gu;
  document.querySelectorAll('a,button').forEach((control) => {
    control.querySelectorAll('span[aria-hidden="true"]').forEach((span) => {
      if (diagonal.test(span.textContent) && !span.textContent.replace(diagonal, '').trim()) {
        span.remove();
      }
      diagonal.lastIndex = 0;
    });
    const walker = document.createTreeWalker(control, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if (diagonal.test(node.nodeValue)) node.nodeValue = node.nodeValue.replace(/\s*[↗↖⇗➚⤴]/gu, '');
      diagonal.lastIndex = 0;
    }
  });
})();
