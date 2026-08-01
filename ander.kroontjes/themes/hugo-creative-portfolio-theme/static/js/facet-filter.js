/* Faceted filtering for the portfolio landing page.
 * Multi-select: AND across categories (kleur / patroon / voor wie),
 * OR within a category. Integrates with Masonry and keeps the active
 * selection in the URL hash so a filtered view can be shared. */
(function () {
  if (typeof jQuery === 'undefined') return;
  var $ = jQuery;

  var $grid = $('[data-facet-grid]');
  if (!$grid.length) return; // only present on the portfolio landing page

  var $row = $grid.find('.row').first();
  var $items = $grid.find('.masonry-item'); // cached in original order
  var $pills = $('.sidebar-filter [data-term]');
  var $resets = $('.sidebar-filter .filter-reset');
  var $status = $('[data-facet-status]');
  var $count = $('[data-facet-count]');
  var $empty = $('[data-facet-empty]');
  var $clearBtn = $('.filter-status [data-facet-clear]');

  var active = {}; // { taxonomy: { term: true } }

  function norm(s) { return (s || '').toLowerCase(); }

  function itemTerms($it, tax) {
    return norm($it.attr('data-' + tax)).split(',').filter(Boolean);
  }

  function activeTaxes() {
    return Object.keys(active).filter(function (t) {
      return Object.keys(active[t]).length;
    });
  }

  function matches($it, taxes) {
    return taxes.every(function (tax) {
      var terms = itemTerms($it, tax);
      var wanted = active[tax];
      return terms.some(function (t) { return wanted[t]; });
    });
  }

  function relayout() {
    try {
      $grid.masonry('reloadItems').masonry('layout');
    } catch (e) { /* masonry not ready yet */ }
  }

  function apply(updateUrl) {
    var taxes = activeTaxes();
    var $matching = $items.filter(function () { return matches($(this), taxes); });

    $items.detach();
    if ($matching.length) $row.append($matching);
    relayout();

    $pills.each(function () {
      var $p = $(this);
      var tax = $p.attr('data-tax');
      var term = norm($p.attr('data-term'));
      $p.toggleClass('is-active', !!(active[tax] && active[tax][term]));
    });

    var any = taxes.length > 0;
    $count.text($matching.length);
    $status.prop('hidden', false);
    $clearBtn.toggle(any);
    $empty.prop('hidden', $matching.length !== 0);
    $resets.toggleClass('is-active', !any);
    openActiveGroups();

    if (updateUrl !== false) writeHash(any);
  }

  function openActiveGroups() {
    $('.sidebar-filter .filter-section').each(function () {
      if ($(this).find('.filter-pill.is-active').length) {
        this.setAttribute('open', '');
      }
    });
  }

  function toggle(tax, term) {
    term = norm(term);
    if (!active[tax]) active[tax] = {};
    if (active[tax][term]) delete active[tax][term];
    else active[tax][term] = true;
    apply();
  }

  function clearAll() { active = {}; apply(); }

  function writeHash(any) {
    var hash = '';
    if (any) {
      hash = '#' + activeTaxes().map(function (tax) {
        return encodeURIComponent(tax) + '=' +
          Object.keys(active[tax]).map(encodeURIComponent).join(',');
      }).join('&');
    }
    var url = location.pathname + location.search + hash;
    if (window.history && history.replaceState) {
      history.replaceState(null, '', url);
    } else {
      location.hash = hash;
    }
  }

  function readHash() {
    active = {};
    var h = location.hash.replace(/^#/, '');
    if (!h) return;
    h.split('&').forEach(function (pair) {
      var i = pair.indexOf('=');
      if (i < 0) return;
      var tax = decodeURIComponent(pair.slice(0, i));
      var terms = decodeURIComponent(pair.slice(i + 1)).split(',').map(norm).filter(Boolean);
      if (terms.length) {
        active[tax] = {};
        terms.forEach(function (t) { active[tax][t] = true; });
      }
    });
  }

  $pills.on('click', function (e) {
    e.preventDefault();
    toggle($(this).attr('data-tax'), $(this).attr('data-term'));
  });
  $resets.on('click', function (e) { e.preventDefault(); clearAll(); });
  $('[data-facet-clear]').on('click', function (e) { e.preventDefault(); clearAll(); });
  $(window).on('hashchange', function () { readHash(); apply(false); });

  readHash();
  apply(false);
  // re-run once images have loaded so Masonry positions the filtered set correctly
  if ($grid.imagesLoaded) { $grid.imagesLoaded(function () { apply(false); }); }
})();
