/* Keep below-fold maps out of the first-paint network and CPU budget. */
for (const frame of document.querySelectorAll('iframe[data-map-src]')) {
 const load = () => { if (frame.dataset.mapSrc) { frame.src = frame.dataset.mapSrc; delete frame.dataset.mapSrc; } };
 frame.addEventListener('focus', load, {once:true});
 if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => { if (entries.some(entry => entry.isIntersecting)) { load(); observer.disconnect(); } }, {rootMargin:'0px'});
  observer.observe(frame);
 } else { load(); }
}
