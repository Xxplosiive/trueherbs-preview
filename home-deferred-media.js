// Homepage below-fold media: load shortly before it becomes visible.
// No input, analytics, third-party requests, or animation.
(() => {
 const images=[...document.querySelectorAll('img[data-deferred-src]')];
 function load(img){const pic=img.closest('picture');if(pic)for(const source of pic.querySelectorAll('source[data-deferred-srcset]')){source.srcset=source.dataset.deferredSrcset;source.removeAttribute('data-deferred-srcset');}if(img.dataset.deferredSrcset){img.srcset=img.dataset.deferredSrcset;img.removeAttribute('data-deferred-srcset');}img.src=img.dataset.deferredSrc;img.removeAttribute('data-deferred-src');img.loading='eager';}
 if(!('IntersectionObserver'in window)){images.forEach(load);return;}
 const observer=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting){load(entry.target);observer.unobserve(entry.target);}},{rootMargin:'200px 0px'});images.forEach(img=>observer.observe(img));
})();
