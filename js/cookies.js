/* Banner de cookies + modal de preferencias, conectado a Google Consent Mode v2.
   El estado por defecto (todo denegado) y la restauración de una elección previa
   ocurren antes, en js/gtm-init.js. Aquí solo se pregunta y se guarda la elección.

   - Se guarda en localStorage: { necessary: true, analytics, marketing, updatedAt }.
   - Al guardar: gtag('consent', 'update', ...) y evento { event: 'cookie_consent_update' } en el dataLayer.
   - Para reabrir el modal desde cualquier parte: un elemento con [data-cookie-settings]
     o window.dispatchEvent(new Event('tributarium-open-cookie-settings')). */
(function () {
  'use strict';
  var KEY = 'tributarium_cookie_consent_v1';
  var OPEN_EVENT = 'tributarium-open-cookie-settings';

  window.dataLayer = window.dataLayer || [];
  var gtag = window.gtag || function () { window.dataLayer.push(arguments); };

  function read() {
    try { var c = JSON.parse(localStorage.getItem(KEY)); return c && typeof c === 'object' ? c : null; } catch (e) { return null; }
  }

  // Al revocar, se borran las cookies que Google ya hubiera dejado.
  function clearCookies(prefixes) {
    var host = location.hostname, parts = host.split('.'), domains = ['', host];
    for (var i = 1; i < parts.length - 1; i++) domains.push('.' + parts.slice(i).join('.'));
    document.cookie.split(';').forEach(function (raw) {
      var name = raw.split('=')[0].trim();
      if (!prefixes.some(function (p) { return name.indexOf(p) === 0; })) return;
      domains.forEach(function (d) { document.cookie = name + '=; Max-Age=0; path=/' + (d ? '; domain=' + d : ''); });
    });
  }

  function save(analytics, marketing) {
    var prev = read();
    var c = { necessary: true, analytics: !!analytics, marketing: !!marketing, updatedAt: new Date().toISOString() };
    try { localStorage.setItem(KEY, JSON.stringify(c)); } catch (e) { /* modo privado: se aplica solo a esta visita */ }
    gtag('consent', 'update', {
      analytics_storage: c.analytics ? 'granted' : 'denied',
      ad_storage: c.marketing ? 'granted' : 'denied',
      ad_user_data: c.marketing ? 'granted' : 'denied',
      ad_personalization: c.marketing ? 'granted' : 'denied'
    });
    window.dataLayer.push({ event: 'cookie_consent_update', consent_analytics: c.analytics, consent_marketing: c.marketing });
    if (prev && prev.analytics && !c.analytics) clearCookies(['_ga', '_gid', '_gat']);
    if (prev && prev.marketing && !c.marketing) clearCookies(['_gcl', '_fbp', '_fbc']);
    hideBanner();
    closeModal();
  }

  var ARROW = '<svg class="arrow" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M4 10h11M11 5.5l4.5 4.5-4.5 4.5"/></svg>';

  /* ---------- Banner ---------- */
  var banner = document.createElement('section');
  banner.className = 'cc-banner';
  banner.setAttribute('aria-label', 'Aviso de cookies');
  banner.hidden = true;
  banner.innerHTML =
    '<div class="cc-txt"><p class="cc-title">Cuidamos tus datos</p>' +
      '<p>Usamos cookies necesarias para que el sitio funcione. Si lo aceptas, también usamos cookies analíticas y de publicidad para medir las visitas y mejorar nuestros anuncios. Puedes cambiar tu elección cuando quieras. <a href="#privacidad">Política de privacidad</a></p></div>' +
    '<div class="cc-actions">' +
      '<button type="button" class="button button--secondary" data-cc="necessary">Solo necesarias</button>' +
      '<button type="button" class="button button--secondary" data-cc="config">Configurar</button>' +
      '<button type="button" class="button button--primary" data-cc="all">Aceptar todas</button>' +
    '</div>';

  /* ---------- Modal ---------- */
  function cat(id, title, text, fixed) {
    var ctl = fixed
      ? '<span class="cc-always">Siempre activas</span>'
      : '<span class="cc-switch"><input type="checkbox" id="cc-' + id + '" role="switch" aria-describedby="cc-' + id + '-d"><i aria-hidden="true"></i></span>';
    return '<div class="cc-cat">' +
      (fixed ? '<div class="cc-row"><span class="cc-name">' + title + '</span>' + ctl + '</div>'
             : '<label class="cc-row" for="cc-' + id + '"><span class="cc-name">' + title + '</span>' + ctl + '</label>') +
      '<p id="cc-' + id + '-d">' + text + '</p></div>';
  }
  var modal = document.createElement('dialog');
  modal.className = 'cc-modal';
  modal.setAttribute('aria-labelledby', 'ccTitle');
  modal.setAttribute('aria-describedby', 'ccIntro');
  modal.innerHTML =
    '<div class="cc-in">' +
      '<div class="cc-head"><span class="section-label">Preferencias de cookies</span>' +
        '<h2 id="ccTitle">Tú decides qué cookies usamos</h2>' +
        '<p id="ccIntro">Las cookies necesarias siempre están activas. Las demás solo se usan si las activas, y puedes cambiar tu elección cuando quieras desde «Preferencias de cookies», al pie de la página. Más detalles en nuestra <a href="#privacidad">Política de privacidad</a>.</p>' +
        '<button type="button" class="cc-x" data-cc="close" aria-label="Cerrar sin guardar"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M5 5l10 10M15 5L5 15"/></svg></button></div>' +
      '<div class="cc-cats">' +
        cat('necessary', 'Estrictamente necesarias', 'Permiten que el sitio funcione y sea seguro, y guardan la elección que hagas en este aviso. No se pueden desactivar.', true) +
        cat('analytics', 'Analíticas y rendimiento', 'Nos ayudan a entender cómo se usa el sitio (páginas vistas, recorridos y de dónde llegan las visitas) con Google Analytics 4, a través de Google Tag Manager. Usamos esta información de forma agregada para mejorar el sitio.') +
        cat('marketing', 'Marketing y publicidad', 'Permiten medir el resultado de nuestros anuncios en plataformas como Google Ads y Meta (Facebook e Instagram) y mostrarte publicidad relacionada con nuestros servicios.') +
      '</div>' +
      '<div class="cc-foot">' +
        '<button type="button" class="button button--secondary" data-cc="necessary">Solo necesarias</button>' +
        '<button type="button" class="button button--secondary" data-cc="save">Guardar mis preferencias</button>' +
        '<button type="button" class="button button--primary" data-cc="all">Aceptar todas ' + ARROW + '</button>' +
      '</div>' +
    '</div>';

  document.body.appendChild(banner);
  document.body.appendChild(modal);

  var chkA = modal.querySelector('#cc-analytics'), chkM = modal.querySelector('#cc-marketing');
  var lastFocus = null, ro = null;

  function showBanner() {
    banner.hidden = false;
    document.documentElement.classList.add('cc-on');
    var setH = function () { document.documentElement.style.setProperty('--cc-h', banner.offsetHeight + 'px'); };
    setH();
    if (window.ResizeObserver) { ro = new ResizeObserver(setH); ro.observe(banner); } else window.addEventListener('resize', setH);
    requestAnimationFrame(function () { banner.classList.add('in'); });
  }
  function hideBanner() {
    if (banner.hidden) return;
    banner.classList.remove('in');
    document.documentElement.classList.remove('cc-on');
    if (ro) ro.disconnect();
    setTimeout(function () { banner.hidden = true; }, 350);
  }

  function openModal() {
    var c = read();
    chkA.checked = !!(c && c.analytics);
    chkM.checked = !!(c && c.marketing);
    lastFocus = document.activeElement;
    if (typeof modal.showModal === 'function') { if (!modal.open) modal.showModal(); }
    else modal.setAttribute('open', '');
    document.documentElement.classList.add('cc-modal-open');
    var first = modal.querySelector('.cc-x');
    if (first) first.focus();
  }
  function closeModal() {
    if (!modal.open && !modal.hasAttribute('open')) return;
    if (typeof modal.close === 'function') modal.close(); else modal.removeAttribute('open');
  }
  modal.addEventListener('close', function () {
    document.documentElement.classList.remove('cc-modal-open');
    if (lastFocus && document.body.contains(lastFocus)) lastFocus.focus({ preventScroll: true });
  });
  // Clic fuera de la tarjeta (en el fondo oscuro) cierra sin guardar.
  modal.addEventListener('click', function (e) { if (e.target === modal) closeModal(); });

  function onAction(e) {
    var b = e.target.closest('[data-cc]'); if (!b) return;
    var a = b.getAttribute('data-cc');
    if (a === 'all') save(true, true);
    else if (a === 'necessary') save(false, false);
    else if (a === 'save') save(chkA.checked, chkM.checked);
    else if (a === 'config') openModal();
    else if (a === 'close') closeModal();
  }
  banner.addEventListener('click', onAction);
  modal.addEventListener('click', onAction);
  // Los enlaces a la política cierran el modal para que la página se vea.
  modal.addEventListener('click', function (e) { if (e.target.closest('a[href="#privacidad"]')) closeModal(); });

  window.addEventListener(OPEN_EVENT, openModal);
  document.addEventListener('click', function (e) {
    if (e.target.closest('[data-cookie-settings]')) { e.preventDefault(); window.dispatchEvent(new Event(OPEN_EVENT)); }
  });

  if (!read()) showBanner();
})();
