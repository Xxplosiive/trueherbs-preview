const filter = document.querySelector('[data-editorial-filter]');
if (filter) {
  const rows = [...document.querySelectorAll('[data-editorial-row]')];
  const apply = () => {
    const query = filter.querySelector('input').value.trim().toLocaleLowerCase();
    const category = filter.querySelector('select').value;
    let total = 0;
    for (const row of rows) {
      row.hidden = !(
        row.textContent.toLocaleLowerCase().includes(query) &&
        (!category || row.dataset.category === category)
      );
      if (!row.hidden) total++;
    }
    document.querySelector('[data-result-count]').textContent = `${total} 篇內容`;
    document.querySelector('[data-no-results]').hidden = total !== 0;
    window.TrueHerbsEvents.emit('search_used', {
      placement: 'content',
      result_bucket: total === 0 ? 'none' : total <= 5 ? 'one-to-five' : 'six-plus',
    });
  };
  filter.addEventListener('input', apply);
  filter.addEventListener('change', apply);
}
// Local event interface only. No network, IDs, cookies or personal data.
document.addEventListener('click', (event) => {
  const a = event.target.closest('a');
  if (!a) return;
  let type;
  if (a.href.startsWith('mailto:')) type = 'contact_email_open';
  else if (a.href.includes('docs.google.com/forms/')) type = 'questionnaire_open';
  else if (a.pathname.startsWith('/trueherbs-preview/trueherbs/tools/')) type = 'tool_open';
  else if (a.pathname.startsWith('/trueherbs-preview/trueherbs/partnerships/')) type = 'partnership_open';
  if (type)
    document.dispatchEvent(
      new CustomEvent('trueherbs:interaction', {
        detail: { event: type, placement: a.closest('main') ? 'content' : 'navigation' },
      }),
    );
});

// Versioned, allowlisted intent events. No transport, persistence, user identifiers or free text.
const conversionNames = new Set([
  'cooperation_cta',
  'product_open',
  'product_info_cta',
  'article_open',
  'search_used',
  'tool_open',
  'tool_interaction',
  'inquiry_open',
  'questionnaire_open',
]);
const toolNames = new Set([
  'retention',
  'followup',
  'conversion',
  'package-profit',
  'health-check',
  'message-builder',
]);
const placementOf = (el) => (el.closest('main') ? 'content' : 'navigation');
const pageType = () => {
  const path = window.location.pathname;
  if (path === '/trueherbs-preview/trueherbs/') return 'home';
  if (path.startsWith('/trueherbs-preview/trueherbs/products/')) return 'product';
  if (path.startsWith('/trueherbs-preview/trueherbs/partnerships/')) return 'partnerships';
  if (path.startsWith('/trueherbs-preview/trueherbs/tools/')) return 'tools';
  if (path.startsWith('/trueherbs-preview/trueherbs/resources/')) return 'resources';
  return 'editorial';
};
window.TrueHerbsEvents = Object.freeze({
  emit(name, data = {}) {
    if (!conversionNames.has(name)) return false;
    const detail = { version: 1, event: name, page_type: pageType() };
    if (['content', 'navigation'].includes(data.placement)) detail.placement = data.placement;
    if (['beauty', 'brand', 'consumer', 'general'].includes(data.audience))
      detail.audience = data.audience;
    if (toolNames.has(data.tool_id)) detail.tool_id = data.tool_id;
    if (['none', 'one-to-five', 'six-plus'].includes(data.result_bucket))
      detail.result_bucket = data.result_bucket;
    document.dispatchEvent(
      new CustomEvent('trueherbs:conversion', { detail: Object.freeze(detail) }),
    );
    return true;
  },
});
document.addEventListener('click', (event) => {
  const a = event.target.closest('a');
  if (a) {
    const placement = placementOf(a);
    const audience =
      a.dataset.audience ||
      (a.closest('#brand-proposal')
        ? 'brand'
        : a.closest('#beauty-partners')
          ? 'beauty'
          : a.closest('#product-inquiry')
            ? 'consumer'
            : 'general');
    if (a.href.startsWith('mailto:') || a.href.startsWith('tel:'))
      window.TrueHerbsEvents.emit('inquiry_open', { placement, audience });
    else if (a.href.includes('docs.google.com/forms/'))
      window.TrueHerbsEvents.emit('questionnaire_open', { placement });
    else if (a.pathname.startsWith('/trueherbs-preview/trueherbs/products/'))
      window.TrueHerbsEvents.emit(a.hash ? 'product_info_cta' : 'product_open', {
        placement,
        audience,
      });
    else if (a.pathname.startsWith('/trueherbs-preview/trueherbs/partnerships/') || a.dataset.audience)
      window.TrueHerbsEvents.emit('cooperation_cta', { placement, audience });
    else if (
      a.pathname.startsWith('/trueherbs-preview/trueherbs/resources/') &&
      a.pathname !== '/trueherbs-preview/trueherbs/resources/'
    )
      window.TrueHerbsEvents.emit('article_open', { placement });
    else if (a.pathname.startsWith('/trueherbs-preview/trueherbs/tools/'))
      window.TrueHerbsEvents.emit('tool_open', { placement, tool_id: a.pathname.split('/')[3] });
  }
  const root = event.target.closest('#company-tool-root');
  if (root && event.target.closest('button,a'))
    window.TrueHerbsEvents.emit('tool_interaction', {
      placement: 'content',
      tool_id: root.dataset.tool,
    });
});
