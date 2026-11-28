// Google Consent Mode v2 + inicio de Google Tag Manager (contenedor GTM-KJN464LP).
// Se carga de forma síncrona en el <head>, ANTES de gtm.js, para que ninguna etiqueta
// guarde cookies sin permiso. Va en un archivo propio (y no en línea) para que la
// política de seguridad (Content-Security-Policy) siga sin permitir scripts en línea.
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}

// 1. Por defecto, todo lo que no es necesario parte denegado.
gtag('consent', 'default', {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  functionality_storage: 'granted',
  security_storage: 'granted',
  wait_for_update: 500
});
gtag('set', 'ads_data_redaction', true);

// 2. Si la persona ya eligió en una visita anterior, se aplica de inmediato (sin esperar al banner).
(function () {
  try {
    var c = JSON.parse(localStorage.getItem('tributarium_cookie_consent_v1'));
    if (c && typeof c === 'object') {
      gtag('consent', 'update', {
        analytics_storage: c.analytics ? 'granted' : 'denied',
        ad_storage: c.marketing ? 'granted' : 'denied',
        ad_user_data: c.marketing ? 'granted' : 'denied',
        ad_personalization: c.marketing ? 'granted' : 'denied'
      });
    }
  } catch (e) { /* sin acceso a localStorage: se mantiene todo denegado */ }
})();

gtag('js', new Date());
