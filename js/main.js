(function () {
  'use strict';
  /* ===== Configuración ===== */
  var WA_NUMBER = '56900000000';          // Reemplazar por el número real del estudio
  var WA_LABEL = '+56 9 0000 0000';
  var WA_URL = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent('Hola, necesito evaluar un caso tributario de mi empresa.');

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!reduce && 'IntersectionObserver' in window) document.documentElement.classList.add('motion');

  /* ===== Iconos (geométricos, angulares) ===== */
  var I = {
    arrow: '<svg class="arrow" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M4 10h11M11 5.5l4.5 4.5-4.5 4.5"/></svg>',
    wa: '<svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M6.2 26.2l1.6-5A10.6 10.6 0 1 1 11.6 25z" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/><path d="M12.3 10.6c.3-.6.6-.6 1-.6h.6c.2 0 .5 0 .7.6l.9 2.1c.1.3 0 .5-.1.7l-.6.7c-.1.2-.2.4 0 .7.6 1 1.4 1.8 2.4 2.4.3.2.5.1.7 0l.7-.7c.2-.2.4-.2.7-.1l2 1c.4.2.5.3.5.6 0 .8-.4 1.5-1 1.8-.7.4-1.5.4-2.3.2-2.7-.9-4.8-3-5.8-5.7-.4-1-.2-2 .3-2.7z" fill="currentColor"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4.5 12.5l4.5 4.5 10-10"/></svg>',
    tgr: '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h22L16 5z"/><path d="M8 12v11M13.3 12v11M18.7 12v11M24 12v11M5 27h22"/></svg>',
    sii: '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M8 4h11l5 5v19H8z"/><path d="M19 4v5h5M12 15h8M12 20h5"/><path d="M21 19l5 5M26 19l-5 5" stroke-linecap="round"/></svg>',
    time: '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M9 4h14M9 28h14M10 4c0 7 12 7 12 12s-12 5-12 12M22 4c0 7-12 7-12 12s12 5 12 12"/></svg>',
    restart: '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M16 27V13M16 13l-6 5M16 13l6 5M16 8l-3-3 3-3 3 3z"/><path d="M6 27h20"/></svg>',
    shield: '<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M18 4l12 5v8c0 8-5.5 12.5-12 15-6.5-2.5-12-7-12-15V9z"/><path d="M12.5 18l4 4 7-8"/></svg>',
    person: '<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M18 5l6 6-6 6-6-6z"/><path d="M7 31c1.5-6 6-9 11-9s9.5 3 11 9"/></svg>',
    map: '<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M15 4l-3 8 2 6-2 7 3 7M21 4l3 8-2 6 2 7-3 7"/></svg>',
    card: '<svg viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M5 10h26v17H5z"/><path d="M5 15h26M10 22h6"/><path d="M27 4l-20 28" stroke-linecap="round"/></svg>',
    info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 3l9 9-9 9-9-9z"/><path d="M12 11v5M12 8v.01" stroke-linecap="round"/></svg>',
    cal: '<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M6 9h28v25H6zM6 16h28M13 5v7M27 5v7"/><path d="M15 25l4 4 7-8"/></svg>',
    motif: '<svg class="motif" viewBox="0 0 200 200" fill="none" stroke="currentColor" stroke-width="10" stroke-linejoin="miter" aria-hidden="true"><path d="M100 40v160M100 120L40 92M100 120l60-28M100 80L66 62M100 80l34-18M40 92l-6-26M160 92l6-26M66 62l-8-20M134 62l8-20"/><path d="M100 14l14 16-14 14-14-14z" fill="currentColor" stroke="none"/></svg>'
  };

  /* ===== Datos ===== */
  var SERVICES = [
    {
      slug: 'convenio-especial-tgr', q: '¿Debes IVA o Renta y Tesorería te cobra intereses?', icon: 'tgr', tag: 'Tesorería · TGR', short: 'Convenio Especial TGR',
      menu: 'Rebaja de pie y cuotas reales fuera del sistema automático.',
      problem: '¿No pudiste pagar tus cuentas de IVA o Renta y Tesorería te cobra intereses impagables?',
      solution: 'Negociamos Convenios Especiales con la TGR para rebajar el pie y pactar cuotas reales, fuera del sistema automático de convenios web.',
      cta: 'Repactar deuda en Tesorería',
      h1: 'Tesorería te cobra intereses impagables. Negociemos un convenio que sí puedas pagar.',
      lead: 'Cuando la deuda de IVA o Renta crece más rápido que tu flujo de caja, el convenio web de la TGR suele exigir un pie que no tienes. Preparamos y negociamos un Convenio Especial con condiciones acordes a la realidad de tu empresa.',
      facts: [['Para quién', 'Pymes y empresas con deuda fiscal de IVA, Renta o Contribuciones'], ['Modalidad', '100% remota. Si el convenio debe tramitarse presencialmente, lo hacemos en Antofagasta'], ['Plazo referencial', '2 a 6 semanas, según la oficina TGR y el monto']],
      how: [['Diagnóstico de la deuda', 'Revisamos tu Certificado de Deuda Fiscal: montos, períodos, intereses, multas y si hay cobranza judicial en curso.'], ['Propuesta financiera', 'Armamos una propuesta de pie y cuotas que tu empresa pueda sostener, con los antecedentes que la respaldan.'], ['Negociación con la TGR', 'Presentamos la solicitud de Convenio Especial y negociamos condiciones y eventuales condonaciones de intereses y multas.'], ['Seguimiento', 'Te acompañamos en el pago de las cuotas para que el convenio no caduque y no vuelva el riesgo de embargo.']],
      req: ['Certificado de Deuda Fiscal TGR actualizado', 'RUT de la empresa y del representante legal', 'Clave Tributaria para revisar tu situación en el SII', 'Antecedentes de flujo de caja o ventas recientes', 'Notificaciones de cobranza o embargo, si las hay'],
      time: [['Diagnóstico inicial', '24–48 h', 12, 1], ['Preparación de la propuesta', '1–2 semanas', 35, 1], ['Negociación y resolución TGR', '2–6 semanas', 80, 0]],
      faq: [['¿En qué se diferencia del convenio web?', 'El convenio web aplica condiciones estándar según el monto y el comportamiento de pago. El Convenio Especial se negocia caso a caso y permite proponer un pie y cuotas distintas, justificando la situación de la empresa.'], ['¿Se detiene el embargo si firmamos un convenio?', 'Un convenio vigente normalmente suspende las acciones de cobro mientras se cumplan las cuotas. Lo revisamos en tu caso concreto antes de prometer un resultado.'], ['¿Atienden deudas de CAE o Préstamo Solidario?', 'No. Nos enfocamos en deudas tributarias de empresas: IVA, Renta y Contribuciones.']]
    },
    {
      slug: 'desbloqueo-sii', q: '¿Tienes bloqueado el SII y no puedes facturar?', icon: 'sii', tag: 'SII · Facturación', short: 'Desbloqueo SII',
      menu: 'Levantamiento de anotaciones y facturación para seguir cobrando.',
      problem: '¿Te bloquearon las facturas en el SII y no puedes cobrar a tus clientes?',
      solution: 'Levantamos anotaciones y gestionamos la emisión rápida de facturas provisorias para devolverle liquidez a tu empresa, seguido del desbloqueo definitivo.',
      cta: 'Desbloquear mi facturación',
      h1: 'Te bloquearon las facturas en el SII. Recuperemos tu facturación cuanto antes.',
      lead: 'Una anotación en el SII puede dejarte sin poder emitir facturas de un día para otro. Primero buscamos que vuelvas a facturar y a cobrar; después resolvemos la causa de fondo para que no se repita.',
      facts: [['Para quién', 'Empresas con anotaciones o restricciones de timbraje en el SII'], ['Modalidad', '100% remota, en todo Chile'], ['Plazo referencial', 'Primeras gestiones en días; desbloqueo definitivo en 1 a 4 semanas']],
      how: [['Identificar la anotación', 'Revisamos tu carpeta tributaria y la anotación exacta que originó el bloqueo.'], ['Liquidez inmediata', 'Gestionamos la alternativa de facturación disponible para tu caso para que puedas seguir cobrando mientras se resuelve el fondo.'], ['Corregir la causa', 'Regularizamos declaraciones, rectificamos o aportamos los antecedentes que el SII requiere.'], ['Desbloqueo definitivo', 'Solicitamos el levantamiento de la anotación y verificamos que tu facturación quede normalizada.']],
      req: ['Clave Tributaria de la empresa', 'Notificaciones o mensajes del SII sobre la anotación', 'Últimas declaraciones (F29 y F22)', 'Datos de contacto de tu contador actual, si lo tienes'],
      time: [['Diagnóstico de la anotación', '24 h', 10, 1], ['Alternativa para volver a facturar', '2–5 días', 25, 1], ['Corrección y levantamiento definitivo', '1–4 semanas', 70, 0]],
      faq: [['¿Por qué me bloquearon las facturas?', 'Las causas más comunes son declaraciones pendientes, inconsistencias detectadas por el SII o problemas de domicilio. Cada anotación tiene su propio camino de solución.'], ['¿Puedo seguir trabajando mientras tanto?', 'En muchos casos existe una alternativa transitoria para facturar. La evaluamos en el diagnóstico.'], ['¿Tengo que cambiar de contador?', 'No necesariamente. Podemos trabajar junto a tu contador o, si lo prefieres, asumir la contabilidad mensual después.']]
    },
    {
      slug: 'prescripcion-tributaria', q: '¿Tienes deudas tributarias de hace más de 3 años?', icon: 'time', tag: 'Prescripción', short: 'Prescripción tributaria',
      menu: 'Acción judicial para extinguir deudas antiguas.',
      problem: '¿Tienes deudas tributarias antiguas (más de 3 años) que siguen frenando tu negocio?',
      solution: 'Interponemos la acción judicial de Prescripción Tributaria para extinguir definitivamente el cobro de impuestos, multas e intereses acumulados.',
      cta: 'Revisar si mi deuda prescribió',
      h1: 'Tu deuda tributaria antigua podría estar prescrita.',
      lead: 'Si el fisco no ejerció su derecho de cobro dentro de los plazos legales, esa deuda puede extinguirse. Revisamos tus períodos uno por uno y, si corresponde, pedimos al tribunal que declare la prescripción.',
      facts: [['Para quién', 'Empresas o personas con deudas de impuestos de más de 3 años'], ['Modalidad', '100% remota, en todo Chile'], ['Plazo referencial', '4 a 10 meses, según el tribunal']],
      how: [['Revisión de períodos', 'Analizamos tu Certificado de Deuda Fiscal y la historia de cada período: declaraciones, giros y notificaciones.'], ['Cálculo de plazos', 'Verificamos si se cumplieron los plazos legales de 3 o 6 años y si hubo hechos que los interrumpieron.'], ['Acción judicial', 'Preparamos y presentamos la acción de prescripción ante el tribunal competente.'], ['Alzamiento y cierre', 'Con la sentencia, gestionamos que la deuda prescrita deje de figurar y se alcen embargos asociados.']],
      req: ['Certificado de Deuda Fiscal TGR con detalle por período', 'Clave Tributaria para revisar declaraciones históricas', 'Notificaciones de cobro, giros o embargos recibidos', 'Convenios de pago firmados anteriormente, si los hubo'],
      time: [['Análisis de prescripción', '48–72 h', 12, 1], ['Preparación y presentación', '2–4 semanas', 30, 1], ['Tramitación judicial', '4–10 meses', 95, 0]],
      faq: [['¿Cuándo prescribe una deuda tributaria?', 'Por regla general, en 3 años desde que debió pagarse el impuesto. El plazo se extiende a 6 años en ciertos casos, por ejemplo si no se presentó la declaración.'], ['¿Qué interrumpe la prescripción?', 'Entre otros, reconocer la deuda por escrito, firmar un convenio de pago o recibir una notificación de cobro judicial. Por eso revisamos cada período antes de recomendarte esta vía.'], ['¿Qué pasa si no está prescrita?', 'Te proponemos otra salida, como un Convenio Especial con la TGR.']]
    },
    {
      slug: 'liquidacion-y-reestructuracion', q: '¿Las deudas no te dejan seguir operando?', icon: 'restart', tag: 'Ley 20.720', short: 'Liquidación y reestructuración',
      menu: 'Cierre legal de la empresa y una nueva sociedad para seguir operando.',
      problem: '¿Las deudas fiscales y comerciales hacen imposible seguir operando con tu empresa actual?',
      solution: 'Cierre legal definitivo mediante Liquidación Concursal (Ley 20.720) y creación de una nueva sociedad bien estructurada para que sigas trabajando sin arrastrar el pasado.',
      cta: 'Cerrar y reestructurar mi empresa',
      h1: 'Cierra tu empresa con orden y vuelve a emprender sin arrastrar las deudas.',
      lead: 'Cuando las deudas superan lo que la empresa puede pagar, seguir postergando solo agrava el problema. La Liquidación Concursal de la Ley 20.720 permite cerrar de forma legal y ordenada; en paralelo, preparamos la nueva sociedad para que sigas operando.',
      facts: [['Para quién', 'Empresas con deudas fiscales y comerciales que ya no pueden sostener'], ['Modalidad', '100% remota, en todo Chile'], ['Plazo referencial', '4 a 8 meses de tramitación']],
      how: [['Evaluación de viabilidad', 'Revisamos activos, pasivos y deudas para confirmar que la liquidación es la mejor salida, o si existe una alternativa.'], ['Preparación de la solicitud', 'Reunimos los antecedentes que exige la Ley 20.720 y preparamos la solicitud de liquidación voluntaria.'], ['Tramitación ante tribunal', 'Representamos a la empresa durante el procedimiento hasta su término.'], ['Nueva sociedad', 'Constituimos una nueva sociedad con una estructura sana y te acompañamos con su contabilidad mensual.']],
      req: ['Balance o estado de situación de la empresa', 'Listado de acreedores y montos adeudados', 'Certificado de Deuda Fiscal TGR', 'Antecedentes legales de la sociedad (escritura, extractos, poderes)'],
      time: [['Evaluación y estrategia', '1 semana', 15, 1], ['Preparación de la solicitud', '2–4 semanas', 35, 1], ['Procedimiento de liquidación', '4–8 meses', 90, 0], ['Constitución de nueva sociedad', '1–5 días', 10, 1]],
      faq: [['¿Las deudas pasan a mí como dueño?', 'Depende de la estructura de la empresa y de si hay garantías personales. Lo revisamos en la evaluación inicial.'], ['¿Puedo seguir trabajando durante el proceso?', 'Sí, a través de una nueva sociedad bien constituida. Te explicamos los cuidados necesarios para hacerlo correctamente.'], ['¿Qué pasa con las deudas fiscales?', 'Las deudas se tratan dentro del procedimiento concursal según las reglas de la Ley 20.720.']]
    }
  ];

  // Los artículos viven en content/blog/*.md y se generan en js/posts.js (node scripts/build-blog.mjs)
  var POSTS = window.TRIBUTARIUM_POSTS || [];
  var TOPICS = ['Todos'].concat(POSTS.map(function (p) { return p.topic; }).filter(function (t, i, all) { return all.indexOf(t) === i; }));

  /* ===== Utilidades ===== */
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function svc(slug) { for (var i = 0; i < SERVICES.length; i++) if (SERVICES[i].slug === slug) return SERVICES[i]; }
  function post(slug) { for (var i = 0; i < POSTS.length; i++) if (POSTS[i].slug === slug) return POSTS[i]; }
  function waBtn(cls, label) { return '<a class="button ' + cls + '" href="' + WA_URL + '" target="_blank" rel="noopener" data-magnetic>' + I.wa + ' ' + label + '</a>'; }

  /* ===== Bloques reutilizables ===== */
  function coverHtml(p, extra, label) {
    if (p.img) return '<div class="cover cover--photo' + (extra || '') + '"' + (extra ? ' data-reveal style="--d:250ms"' : '') + '><img src="' + p.img + '" alt="' + esc(p.alt || '') + '" loading="lazy"><span class="topic">' + esc(label) + '</span></div>';
    return '<div class="cover cover--' + p.cover + (extra || '') + '"' + (extra ? ' data-reveal style="--d:250ms"' : '') + '><span class="topic">' + esc(label) + '</span><span class="big">' + esc(p.big) + '</span>' + I.motif + '</div>';
  }
  function postCard(p, i) {
    return '<a class="post" href="#articulo-' + p.slug + '" data-topic="' + esc(p.topic) + '" data-reveal style="--d:' + (i % 3) * 90 + 'ms">' +
      coverHtml(p, '', p.topic) +
      '<div class="meta"><span>' + p.date + '</span><span aria-hidden="true">·</span><span>' + p.min + ' min de lectura</span></div>' +
      '<h3><span>' + esc(p.title) + '</span></h3></a>';
  }

  function contactBlock(title) {
    var days = ['L', 'M', 'M', 'J', 'V', 'S', 'D'], grid = '';
    days.forEach(function (d) { grid += '<span class="h">' + d + '</span>'; });
    for (var n = 0; n < 35; n++) { var day = n - 1; var cls = (day > 0 && day < 31 && n % 7 < 5 && [3, 6, 9, 10, 15, 17, 22, 24, 29].indexOf(day) > -1) ? 'av' : ''; grid += '<span class="' + cls + '">' + (day > 0 && day < 31 ? day : '') + '</span>'; }
    return '<section class="section section--dark contact" id="contacto" aria-labelledby="contactTitle">' +
      '<img class="contact-araucaria" data-parallax="-0.08" src="assets/brand/araucaria.png" alt="">' +
      '<div class="container contact-wide">' +
        '<div class="contact-head"><span class="section-label" data-reveal>Contacto</span>' +
        '<h2 id="contactTitle" data-reveal="split">' + (title || 'No dejes que una contingencia tributaria frene años de trabajo. Elige cómo quieres empezar hoy.') + '</h2></div>' +
        '<div class="channels" data-stagger>' +
          '<div class="ch ch-wa"><div style="display:grid;gap:1rem"><span class="ch-k"><b>1</b> Atención inmediata</span><h3>¿Es urgente? Escríbenos ahora.</h3><p>Embargos, facturas bloqueadas o una notificación que no entiendes. Cuéntanos tu caso por WhatsApp y un abogado te orienta.</p></div>' +
            '<div style="display:grid;gap:.75rem">' + waBtn('', 'Escribir por WhatsApp') + '<span class="num">Número: <span data-wa-num></span></span></div></div>' +
          '<div class="ch ch-light"><span class="ch-k"><b>2</b> Pre-evaluación</span><h3>Cuéntanos tu caso en 2 minutos</h3><span class="preview-tag">Vista previa — Formulario externo a integrar</span>' +
            '<form class="form" id="preForm" novalidate>' +
              '<div class="row2"><div class="field"><label for="f-nombre">Nombre</label><input id="f-nombre" name="nombre" autocomplete="name" placeholder="Ej: Carolina Muñoz"></div>' +
              '<div class="field"><label for="f-empresa">Empresa</label><input id="f-empresa" name="empresa" autocomplete="organization" placeholder="Ej: Muebles del Sur SpA"></div></div>' +
              '<div class="row2"><div class="field"><label for="f-tipo">Tipo de deuda</label><select id="f-tipo" name="tipo"><option>IVA</option><option>Renta</option><option>Contribuciones</option><option>Facturas bloqueadas SII</option><option>Otra</option></select></div>' +
              '<div class="field"><label for="f-monto">Monto aproximado</label><select id="f-monto" name="monto"><option>Menos de $5 MM</option><option>$5 – 20 MM</option><option>$20 – 100 MM</option><option>Más de $100 MM</option></select></div></div>' +
              '<button class="button button--primary" type="submit">Enviar pre-evaluación ' + I.arrow + '</button>' +
              '<p class="form-msg" id="formMsg" hidden role="status">Esta es una vista previa. Aquí se incrustará el formulario externo.</p>' +
            '</form></div>' +
          '<div class="ch ch-light"><span class="ch-k"><b>3</b> Agenda directa</span><h3>Reserva una videollamada</h3>' +
            '<div class="cal" aria-label="Espacio reservado para el widget de agendamiento"><div class="cal-head"><span>Diciembre 2026</span><span class="nav-dots"><i></i><i></i></span></div><div class="cal-grid" aria-hidden="true">' + grid + '</div>' +
            '<div class="cal-over"><div>' + I.cal + '<strong>Aquí irá el plugin de agendamiento directo que instalaremos</strong><span class="caption">Ej. Calendly / Cal.com</span></div></div></div></div>' +
        '</div>' +
      '</div></section>';
  }

  function constellation() {
    var pts = [[50, 12], [50, 40], [30, 30], [70, 30], [50, 62], [20, 52], [80, 52], [50, 92], [14, 40], [86, 40]];
    var lines = [[0, 1], [1, 2], [1, 3], [1, 4], [4, 5], [4, 6], [4, 7], [5, 8], [6, 9]];
    var l = lines.map(function (e, k) { var a = pts[e[0]], b = pts[e[1]]; return '<line class="ln-draw" pathLength="1" style="--k:' + k + '" x1="' + a[0] + '" y1="' + a[1] + '" x2="' + b[0] + '" y2="' + b[1] + '" stroke="currentColor" stroke-width=".5" fill="none"/>'; }).join('');
    var n = pts.map(function (q, k) { return '<rect class="node" style="--k:' + k + '" x="' + (q[0] - 1.6) + '" y="' + (q[1] - 1.6) + '" width="3.2" height="3.2" fill="currentColor" transform="rotate(45 ' + q[0] + ' ' + q[1] + ')"/>'; }).join('');
    return '<svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="52" r="40" stroke="currentColor" stroke-width=".2" fill="none" opacity=".35"/><circle cx="50" cy="52" r="26" stroke="currentColor" stroke-width=".2" fill="none" opacity=".25"/>' + l + n + '</svg>';
  }

  var CHK = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M3 8.5l3 3 7-7"/></svg>';
  var MINI = {
    form: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M3 2h10v12H3zM5.5 6h5M5.5 9h5M5.5 12h3"/></svg>',
    cal: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M2.5 4h11v9.5h-11zM2.5 7h11M5.5 2v3M10.5 2v3"/></svg>',
    phone: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" aria-hidden="true"><path d="M4 2.5l2 .5 1 3-1.5 1a7 7 0 0 0 3.5 3.5l1-1.5 3 1 .5 2c-.5 1-1.5 1.5-2.5 1.5A10 10 0 0 1 2.5 5C2.5 4 3 3 4 2.5z"/></svg>',
    video: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" aria-hidden="true"><path d="M2 4.5h8.5v7H2zM10.5 7l3.5-2v6l-3.5-2"/></svg>',
    sign: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" aria-hidden="true"><path d="M2 13.5h12M3.5 11l7-7 2 2-7 7H3.5z"/></svg>',
    cuotas: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M2 4h12v8H2zM2 7h12"/></svg>',
    time: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="8" cy="8" r="6"/><path d="M8 4.5V8l2.5 1.5"/></svg>',
    wa: '<svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M6.2 26.2l1.6-5A10.6 10.6 0 1 1 11.6 25z" stroke="currentColor" stroke-width="2.6" stroke-linejoin="round"/></svg>'
  };
  var SVC_FAQ = {
    'convenio-especial-tgr': {
      title: 'Preguntas frecuentes sobre el Convenio Especial con Tesorería.',
      img: 'faq-convenio', alt: 'Dueña de una pyme revisa un calendario de pagos con una calculadora',
      items: [
        ['¿En qué se diferencia un Convenio Especial del convenio que puedo firmar en la web de Tesorería?', 'El convenio web aplica condiciones estándar según el monto y el comportamiento de pago. El Convenio Especial se negocia caso a caso y permite proponer un pie y cuotas distintas, justificando la situación de tu empresa.'],
        ['Si firmo el convenio, ¿se detiene el embargo?', 'Un convenio vigente normalmente suspende las acciones de cobro mientras se cumplan las cuotas. Lo revisamos en tu caso concreto antes de prometerte un resultado.'],
        ['No tengo para pagar el pie que me pide la web. ¿Igual se puede negociar?', 'Sí, para eso existe el Convenio Especial. Armamos una propuesta de pie y cuotas que tu empresa pueda sostener, con los antecedentes que la respaldan, y la negociamos con la TGR. También se pueden pedir condonaciones de intereses y multas, según el caso.'],
        ['¿Cuánto se demora Tesorería en aprobar el convenio?', 'Como referencia, entre 2 y 6 semanas, según la oficina de la TGR y el monto de la deuda.'],
        ['¿Tengo que ir en persona a Tesorería?', 'No. Trabajamos 100% en línea. Si tu convenio debe tramitarse de forma presencial, lo hacemos nosotros en Antofagasta.'],
        ['¿Qué pasa si después no puedo pagar una cuota?', 'El convenio puede caducar y volvería el riesgo de embargo. Por eso te acompañamos durante el pago de las cuotas para evitar que eso pase.']
      ]
    },
    'desbloqueo-sii': {
      title: 'Preguntas frecuentes sobre el bloqueo de facturas en el SII.',
      img: 'faq-sii', alt: 'Dueña de un negocio revisa la facturación en su celular detrás del mostrador',
      items: [
        ['¿Por qué me bloquearon las facturas si yo no hice nada raro?', 'Las causas más comunes son declaraciones pendientes, inconsistencias detectadas por el SII o problemas de domicilio. Cada anotación tiene su propio camino de solución; lo primero es identificar cuál es la tuya.'],
        ['Tengo clientes esperando factura. ¿Puedo seguir facturando mientras lo resuelven?', 'En muchos casos existe una alternativa transitoria para facturar. La evaluamos en el diagnóstico para que puedas seguir cobrando mientras se resuelve el fondo.'],
        ['¿Cuánto se demora en quedar desbloqueado?', 'Las primeras gestiones se hacen en días. El desbloqueo definitivo toma como referencia entre 1 y 4 semanas.'],
        ['¿Tengo que cambiar de contador?', 'No necesariamente. Podemos trabajar junto a tu contador o, si lo prefieres, asumir la contabilidad mensual después.'],
        ['¿Qué necesitan de mí para empezar?', 'La Clave Tributaria de la empresa, las notificaciones o mensajes del SII sobre la anotación, tus últimas declaraciones (F29 y F22) y, si lo tienes, el contacto de tu contador.'],
        ['¿Me pueden volver a bloquear más adelante?', 'Por eso no solo levantamos la anotación: corregimos la causa de fondo para que no se repita. Si quieres, después te acompañamos con la contabilidad mensual.']
      ]
    },
    'prescripcion-tributaria': {
      title: 'Preguntas frecuentes sobre la prescripción de deudas tributarias.',
      img: 'faq-prescripcion', alt: 'Manos abren una carpeta de archivo con documentos tributarios antiguos',
      items: [
        ['¿Cuándo prescribe una deuda tributaria?', 'Por regla general, en 3 años desde que debió pagarse el impuesto. El plazo se extiende a 6 años en ciertos casos, por ejemplo si no se presentó la declaración.'],
        ['Hace años firmé un convenio con Tesorería. ¿Igual puede prescribir mi deuda?', 'Firmar un convenio de pago, reconocer la deuda por escrito o recibir una notificación de cobro judicial pueden interrumpir la prescripción. Por eso revisamos cada período antes de recomendarte esta vía.'],
        ['¿Cuánto se demora el juicio?', 'Como referencia, entre 4 y 10 meses, según el tribunal.'],
        ['Si se declara prescrita, ¿qué pasa con los embargos?', 'Con la sentencia, gestionamos que la deuda prescrita deje de figurar y que se alcen los embargos asociados.'],
        ['¿Tengo que ir al tribunal?', ''],
        ['¿Y si mi deuda no está prescrita?', 'Te proponemos otra salida, como un Convenio Especial con la TGR.']
      ]
    },
    'liquidacion-y-reestructuracion': {
      title: 'Preguntas frecuentes sobre liquidación y reestructuración de empresas.',
      img: 'faq-liquidacion', alt: 'Dueño de una pyme cierra una caja en su oficina casi vacía',
      items: [
        ['¿Las deudas de la empresa pasan a mí como dueño?', 'Depende de la estructura de la empresa y de si hay garantías personales. Lo revisamos en la evaluación inicial.'],
        ['¿Puedo seguir trabajando mientras se liquida la empresa?', 'Sí, a través de una nueva sociedad bien constituida. Te explicamos los cuidados necesarios para hacerlo correctamente.'],
        ['¿Qué pasa con lo que le debo al fisco?', 'Las deudas se tratan dentro del procedimiento concursal según las reglas de la Ley 20.720.'],
        ['¿Cuánto dura el proceso?', 'Como referencia, entre 4 y 8 meses de tramitación. La nueva sociedad se puede constituir en 1 a 5 días.'],
        ['¿Qué pasa con mis trabajadores?', ''],
        ['¿Cómo sé si me conviene liquidar o si hay otra salida?', 'Antes de recomendarte la liquidación revisamos tus activos, pasivos y deudas. Si existe una alternativa mejor, te la planteamos.']
      ]
    }
  };
  function qaList(items, pre) {
    return '<div class="qa">' + items.map(function (f, i) { var id = pre + i; return '<div class="qa-item" data-reveal style="--d:' + (i * 70) + 'ms"><button class="qa-q" type="button" aria-expanded="false" aria-controls="' + id + 'a" id="' + id + 'q">' + f[0] + '<span class="qa-ic" aria-hidden="true"></span></button><div class="qa-a" id="' + id + 'a" role="region" aria-labelledby="' + id + 'q"><div><p>' + f[1] + '</p></div></div></div>'; }).join('') + '</div>';
  }
  var HOME_FAQ = [
    ['¿Cuánto cuesta que revisen mi caso?', 'Antes de empezar te explicamos qué es viable, en cuánto tiempo y cuánto cuesta. No avanzamos hasta que aceptes una propuesta por escrito.'],
    ['¿Tengo que ir a una oficina?', 'No. Trabajamos 100% en línea: conversamos por WhatsApp, llamada o videollamada y firmas todo de forma digital, estés donde estés en Chile.'],
    ['¿Cuánto tiempo toma resolver mi problema?', 'Depende del caso. Un desbloqueo en el SII suele resolverse en semanas; un convenio con Tesorería o una prescripción puede tomar más. El plazo estimado va siempre en la propuesta.'],
    ['¿Pueden detener un embargo de Tesorería?', 'En muchos casos sí, por ejemplo con un convenio que suspenda el cobro o alegando la prescripción de la deuda. Revisamos tu situación antes de prometerte un resultado.'],
    ['¿Qué necesito para la primera conversación?', 'El RUT de tu empresa y, si los tienes, el certificado de deuda o la notificación que recibiste. Si no tienes nada a mano, igual podemos empezar.'],
    ['¿Atienden deudas de personas o del CAE?', 'No. Nos enfocamos en deudas tributarias de empresas y pymes: IVA, Renta y Contribuciones.']
  ];
  var HOW_STEPS = [
    { n: 1, img: 'paso1', t: 'Escríbenos', d: 'Contáctanos por WhatsApp, el formulario o la agenda. Cuéntanos qué pasó con el SII o la Tesorería.', k: 'Por', via: [['wa', 'WhatsApp'], ['form', 'Formulario'], ['cal', 'Agenda']],
      ui: '<div class="ui ui-chat"><div class="bub in">Hola, me bloquearon las facturas en el SII. ¿Me pueden ayudar?</div><div class="typing" aria-hidden="true"><i></i><i></i><i></i></div><div class="bub out">Claro. Te llamamos hoy para revisar tu caso.</div></div>' },
    { n: 2, img: 'paso2', t: 'Conversa con un especialista', d: 'Te llamamos o agendamos una videollamada con un abogado socio para revisar tu deuda TGR y tu carpeta tributaria.', k: 'Vía', via: [['phone', 'Teléfono'], ['video', 'Videollamada']],
      ui: '<div class="ui ui-call glass"><div class="call-top"><span>Reunión de diagnóstico</span><span class="live"><span class="call-timer">00:00</span></span></div><div class="call-tiles"><div class="call-tile"><span class="av">Tú</span><span class="nm">Tu empresa</span></div><div class="call-tile sp"><span class="av"><img src="assets/brand/icon-light.png" alt="" style="width:18px;height:auto"></span><span class="nm">Abogado socio</span></div></div><div class="wave" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div></div>' },
    { n: 3, img: 'paso3', t: 'Acepta la propuesta', d: 'Recibes un plan claro con plazos y alcance definidos. Al aceptar, gestionamos todo por ti.', k: 'Con', via: [['sign', 'Firma digital'], ['form', 'Plan por escrito']],
      ui: '<div class="ui ui-chat ui-chat2"><div class="bub out file"><span class="doc">' + MINI.form + '<span><b>Propuesta_SII.pdf</b><small>Plazo 1–4 semanas · Plan de trabajo</small></span></span></div><div class="typing l" aria-hidden="true"><i></i><i></i><i></i></div><div class="bub in">¡Muchas gracias! Acepto la propuesta.</div><span class="seen">Visto · Comenzamos hoy</span></div>' },
    { n: 4, img: 'paso4', t: 'Problema resuelto', d: 'En el plazo acordado cerramos tu caso: convenio, desbloqueo, prescripción o liquidación. Y si quieres, seguimos contigo.', k: 'Plazo', via: [['time', 'Definido en tu propuesta']],
      ui: '<div class="ui ui-mail glass"><div class="mail-h"><span class="mail-av"><img src="assets/brand/icon-dark.png" alt=""></span><span class="mail-who"><b>Tributarium</b><small>Re: Desbloqueo de tu facturación</small></span></div>' +
        '<div class="mail-body"><span class="ml" style="--k:0">Hola, buenas noticias:</span><span class="ml" style="--k:1">tu facturación en el SII ya</span><span class="ml" style="--k:2">está habilitada. Caso cerrado.</span></div>' +
        '<div class="mail-bar"><span class="mail-send"><span class="lbl">Enviar</span><span class="sep"></span><svg viewBox="0 0 12 12" fill="currentColor" aria-hidden="true"><path d="M2.5 4.5h7L6 8z"/></svg></span>' +
        '<span class="mail-tools" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 12.5L8 3l4 9.5M5.5 9h5"/></svg><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M10.5 5L6 9.5a1.5 1.5 0 0 0 2.1 2.1l5-5a3 3 0 0 0-4.2-4.2l-5 5a4.5 4.5 0 0 0 6.4 6.4l3-3"/></svg><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3.5 4.5h9M6 4.5V3h4v1.5M5 4.5l.6 8.5h4.8l.6-8.5"/></svg></span></div>' +
        '<span class="mail-toast"><span style="display:inline-flex;align-items:center;gap:.35rem">' + CHK + ' Mensaje enviado</span></span></div>' }
  ];
  function stepCard(st, i) {
    return '<article class="stepc" data-reveal style="--d:' + i * 110 + 'ms">' +
      '<div class="stepc-media"><img src="assets/img/' + st.img + '.jpg" alt="" loading="lazy"><span class="stepc-tab" aria-hidden="true"></span><span class="stepc-num" aria-label="Paso ' + st.n + '">' + st.n + '</span>' + st.ui + '</div>' +
      '<div class="stepc-body"><h3>' + st.t + '</h3><p>' + st.d + '</p><span class="rule-sp"></span>' +
      '<div class="stepc-foot"><span>' + st.k + '</span><span class="via">' + st.via.map(function (v) { return '<span>' + MINI[v[0]] + v[1] + '</span>'; }).join('') + '</span></div></div></article>';
  }

  // Cronómetro de la llamada (paso 2)
  setInterval(function () {
    $$('.is-in .call-timer').forEach(function (el) {
      var t = (+el.dataset.t || 0) + 1; if (t > 59 * 60) t = 0; el.dataset.t = t;
      el.textContent = ('0' + Math.floor(t / 60)).slice(-2) + ':' + ('0' + t % 60).slice(-2);
    });
  }, 1000);

  /* ===== Vistas ===== */
  function viewHome() {
    var cards = SERVICES.map(function (s, i) {
      return '<a class="pcard" href="#' + s.slug + '" data-reveal style="--d:' + (i % 2) * 110 + 'ms">' +
        '<div class="pcard-top"><span class="pill">' + s.tag + '</span><span class="pcard-icon">' + I[s.icon] + '</span></div>' +
        '<h3>' + esc(s.problem) + '</h3>' +
        '<div><p class="sol-k">Cómo lo resolvemos</p><p class="sol">' + esc(s.solution) + '</p></div>' +
        '<span class="cta">' + esc(s.cta) + '<span class="arr">' + I.arrow + '</span></span></a>';
    }).join('');

    var statement = 'Democratizar el derecho societario y tributario en Chile.'.split(' ').map(function (w) {
      var hl = /societario|tributario/.test(w) ? ' hl' : '';
      return '<span class="sw' + hl + '">' + w + '</span>';
    }).join(' ');

    var tickerItems = ['Embargos de Tesorería', 'Facturas bloqueadas', 'Convenios Especiales TGR', 'Prescripción tributaria', 'Liquidación Ley 20.720', 'Constitución de sociedades', 'Contabilidad mensual'];
    var tick = tickerItems.concat(tickerItems).map(function (t) { return '<span>' + t + '</span>'; }).join('');

    return '' +
    '<section class="hero" aria-labelledby="heroTitle"><div class="hero-card" id="heroCard">' +
      '<div class="hero-photo"><img src="assets/img/hero.jpg" alt="Dueña de una pyme escucha con atención durante una reunión con su abogado" fetchpriority="high"></div>' +
      '<div class="hero-scrim" aria-hidden="true"></div>' +
      '<div class="hero-content">' +
        '<h1 id="heroTitle"><span class="ln"><span style="--i:0">Abogados Tributarios</span></span><span class="ln"><span style="--i:1">para <em>Pymes y Empresas</em></span></span><span class="ln"><span style="--i:2">en Chile</span></span></h1>' +
        '<p class="lead hero-reveal" style="--i:0">Detenemos embargos de Tesorería, desbloqueamos tu facturación en el SII y reestructuramos tus deudas fiscales.</p>' +
        '<div class="hero-ctas hero-reveal" style="--i:1">' + waBtn('button--ghost', 'Hablar con un abogado ahora') + '</div>' +
      '</div>' +
      '<div class="hero-notch"><a class="hero-round" href="#soluciones" aria-label="Bajar a las soluciones por problema"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 4v15M5.5 12.5L12 19l6.5-6.5"/></svg></a></div>' +
    '</div></section>' +

    '<div class="ticker" aria-hidden="true"><div class="ticker-track">' + tick + '</div></div>' +

    '<section class="svc" id="soluciones" aria-labelledby="solTitle"><div class="svc-sticky">' +
      '<div class="svc-grid" aria-hidden="true">' +
        '<div class="tile tile-side tile-a" data-dir="-1">' + constellation() + '</div>' +
        '<div class="tile tile-side tile-b" data-dir="-1"><img src="assets/img/socios.jpg" alt="" loading="lazy"></div>' +
        '<div class="tile tile-center"><div class="dark"></div></div>' +
        '<div class="tile tile-side tile-c" data-dir="1"><img src="assets/img/notas.jpg" alt="" loading="lazy"></div>' +
        '<div class="tile tile-side tile-d" data-dir="1"><span class="k">Estado del caso · ejemplo</span>' +
          '<div class="row"><span>Convenio TGR</span><span class="pill pill--live">Aprobado</span></div>' +
          '<div class="row"><span>Facturación SII</span><span class="pill pill--live">Habilitada</span></div>' +
          '<div class="row"><span>Prescripción 2019</span><span class="pill">En trámite</span></div></div>' +
      '</div>' +
      '<div class="svc-final">' +
        '<div class="svc-mstage" aria-hidden="true"><div class="ms-sticky">' +
          '<div class="ms-box"><div class="ms-slot"></div>' +
            '<div class="ms ms-a tile-a">' + constellation() + '</div>' +
            '<div class="ms ms-b"><img src="assets/img/notas.jpg" alt="" loading="lazy"></div>' +
          '</div>' +
          '<div class="ms-bg"></div>' +
          '<p class="ms-h">Te ayudamos a solucionar los problemas tributarios de <span class="hl-pyme ms-hl">tu pyme</span>.</p>' +
        '</div></div>' +
        '<div class="svc-head"><h2 id="solTitle">Te ayudamos a solucionar los problemas tributarios de <span class="hl-pyme">tu pyme</span>.</h2><a class="svc-arrow" href="#soluciones-detalle" aria-label="Bajar a los problemas y soluciones"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 4v15M5.5 12.5L12 19l6.5-6.5"/></svg></a></div>' +
        '<div class="svc-tabs" id="soluciones-detalle">' +
          '<div class="tabbar" role="tablist" aria-label="Soluciones por problema">' + SERVICES.map(function (s, i) { return '<button type="button" role="tab" id="tab-' + i + '" aria-controls="panel-' + i + '" aria-selected="' + (i === 0) + '" tabindex="' + (i === 0 ? 0 : -1) + '">' + esc(s.q) + '</button>'; }).join('') + '<span class="tab-ind"><i></i></span></div>' +
          '<div class="panels">' + SERVICES.map(function (s, i) {
            var img = { 'convenio-especial-tgr': 'convenio', 'desbloqueo-sii': 'sii', 'prescripcion-tributaria': 'prescripcion', 'liquidacion-y-reestructuracion': 'liquidacion' }[s.slug];
            return '<div class="panel' + (i === 0 ? ' on' : '') + '" role="tabpanel" id="panel-' + i + '" aria-labelledby="tab-' + i + '"' + (i === 0 ? '' : ' hidden') + '>' +
              '<div class="txt"><span class="pill">' + s.tag + '</span><h3>' + esc(s.short) + '</h3><p>' + esc(s.solution) + '</p><a class="textlink sol-link" href="#' + s.slug + '">' + esc(s.cta) + ' <span class="arr-dot">' + I.arrow + '</span></a></div>' +
              '<div class="img"><img src="assets/img/' + img + '.jpg" alt="" loading="lazy"></div></div>';
          }).join('') + '</div>' +
        '</div>' +
        '<div class="svc-stack" id="soluciones-stack">' + SERVICES.map(function (s, i) {
          var img = { 'convenio-especial-tgr': 'convenio', 'desbloqueo-sii': 'sii', 'prescripcion-tributaria': 'prescripcion', 'liquidacion-y-reestructuracion': 'liquidacion' }[s.slug];
          return '<article class="sc" style="--i:' + i + '"><div class="sc-in"><span class="sc-shade"></span>' +
            '<div class="sc-img"><img src="assets/img/' + img + '.jpg" alt="" loading="lazy"><span class="sc-n">0' + (i + 1) + ' / 0' + SERVICES.length + '</span></div>' +
            '<div class="sc-txt"><span class="pill">' + s.tag + '</span><p class="sc-q">' + esc(s.q) + '</p><h3>' + esc(s.short) + '</h3><p>' + esc(s.solution) + '</p>' +
            '<a class="textlink sol-link" href="#' + s.slug + '">' + esc(s.cta) + ' <span class="arr-dot">' + I.arrow + '</span></a></div>' +
          '</div></article>';
        }).join('') + '</div>' +
      '</div>' +
    '</div></section>' +

    '<section class="section" id="como-trabajamos" aria-labelledby="procTitle"><div class="container">' +
      '<div class="how4-head">' +
        '<h2 id="procTitle" data-reveal="split">Así de simple, en cuatro pasos.</h2>' +
        '<div class="how4-side">' +
        '<p data-reveal style="--d:150ms">Sin trámites eternos ni letra chica: te decimos qué es viable, cuánto cuesta y en cuánto tiempo lo resolvemos.</p></div></div>' +
      '<div class="how4">' + HOW_STEPS.map(stepCard).join('') + '</div>' +
    '</div></section>' +

    '<section class="section" id="preguntas-frecuentes" aria-labelledby="faqTitle"><div class="container"><div class="hfaq">' +
      '<h2 class="hfaq-title" id="faqTitle" data-reveal="split">Preguntas frecuentes sobre problemas tributarios de pymes.</h2><div class="hfaq-media">' +
        '<div class="hfaq-photo" data-reveal style="--d:150ms"><img data-parallax="-0.1" src="assets/img/faq.jpg" alt="Cuaderno abierto y formularios tributarios sobre un escritorio" loading="lazy"><span class="badge"><b>?</b><span>¿No está tu pregunta?<br>Escríbenos y te respondemos.</span></span></div></div>' +
      '<div class="hfaq-main"><p class="hfaq-lead" data-reveal>Reunimos lo que más nos preguntan los dueños de pymes, con respuestas claras para que no te quede ninguna duda.</p>' +
        '<div class="qa">' + HOME_FAQ.map(function (f, i) { return '<div class="qa-item" data-reveal style="--d:' + (i * 70) + 'ms"><button class="qa-q" type="button" aria-expanded="false" aria-controls="qa' + i + '" id="qq' + i + '">' + f[0] + '<span class="qa-ic" aria-hidden="true"></span></button><div class="qa-a" id="qa' + i + '" role="region" aria-labelledby="qq' + i + '"><div><p>' + f[1] + '</p></div></div></div>'; }).join('') + '</div>' +
        '<div class="hfaq-foot" data-reveal>¿Tienes otra duda? ' + waBtn('button--secondary', 'Pregúntanos por WhatsApp') + '</div>' +
      '</div></div></div></section>' +

    '<section class="section" id="recursos" aria-labelledby="blogTitle"><div class="container">' +
      '<div class="sec-head"><div class="t"><span class="section-label" data-reveal>Recursos y guías para pymes</span><h2 id="blogTitle" data-reveal="split">Aprende a anticiparte al SII y a Tesorería.</h2></div>' +
      '<p class="d" data-reveal>Guías prácticas escritas para dueños de empresa, sin jerga legal.</p></div>' +
      '<div class="posts">' + POSTS.slice(0, 3).map(postCard).join('') + '</div>' +
      '<div class="sec-foot" data-reveal><a class="textlink" href="#blog">Ver todos los artículos del Blog ' + I.arrow + '</a></div>' +
    '</div></section>' +

    contactBlock();
  }

  function viewService(s) {
    var how = s.how.map(function (h, i) { return '<div class="how" data-reveal style="--d:' + i * 90 + 'ms"><div class="rule" data-reveal style="--d:' + i * 90 + 'ms"></div><span class="n">Paso ' + (i + 1) + '</span><h4>' + h[0] + '</h4><p>' + h[1] + '</p></div>'; }).join('');
    var req = s.req.map(function (r) { return '<li>' + I.check + '<span>' + r + '</span></li>'; }).join('');
    var tl = s.time.map(function (t, i) { return '<div class="tl ' + (t[3] ? '' : 'war') + '"><div class="top"><b>' + t[0] + '</b><span>' + t[1] + '</span></div><div class="bar"><i style="--w:' + t[2] + '%;--k:' + i + '"></i></div></div>'; }).join('');
    var faq = s.faq.map(function (f) { return '<details><summary>' + f[0] + '<i aria-hidden="true"></i></summary><p class="ans">' + f[1] + '</p></details>'; }).join('');
    var relImg = { 'convenio-especial-tgr': 'convenio', 'desbloqueo-sii': 'sii', 'prescripcion-tributaria': 'prescripcion', 'liquidacion-y-reestructuracion': 'liquidacion' };
    var rel = SERVICES.filter(function (x) { return x.slug !== s.slug; }).map(function (x, i) { return '<a class="relc stepc" href="#' + x.slug + '" data-reveal style="--d:' + i * 110 + 'ms">' +
      '<div class="stepc-media"><img src="assets/img/' + relImg[x.slug] + '.jpg" alt="" loading="lazy"><span class="stepc-tab" aria-hidden="true"></span><span class="stepc-num relc-ic" aria-hidden="true">' + I[x.icon] + '</span></div>' +
      '<div class="stepc-body"><span class="pill" style="justify-self:start;align-self:flex-start">' + x.tag + '</span><h3>' + x.short + '</h3><p>' + esc(x.problem) + '</p><span class="rule-sp"></span>' +
      '<span class="textlink sol-link">' + x.cta + ' <span class="arr-dot">' + I.arrow + '</span></span></div></a>'; }).join('');
    var photo = { 'convenio-especial-tgr': 'convenio', 'desbloqueo-sii': 'sii', 'prescripcion-tributaria': 'prescripcion', 'liquidacion-y-reestructuracion': 'liquidacion' }[s.slug];
    return '' +
    '<section class="lp-hero"><div class="container">' +
      '<nav class="crumbs" aria-label="Ruta"><a href="#inicio">Inicio</a><span aria-hidden="true">/</span><a href="#soluciones">Soluciones</a><span aria-hidden="true">/</span><span aria-current="page">' + s.short + '</span></nav>' +
      '<div class="lp-grid"><div class="lp-main"><span class="section-label">' + s.tag + '</span><h1 data-reveal="split">' + esc(s.h1) + '</h1><p class="lead" data-reveal style="--d:200ms">' + esc(s.lead) + '</p>' +
        '<div class="hero-ctas" data-reveal style="--d:300ms">' + waBtn('button--primary', 'Hablar con un abogado ahora') + '</div>' +
        '<div class="lp-photo" data-reveal style="--d:350ms"><img data-parallax="-0.1" src="assets/img/' + photo + '.jpg" alt="" loading="lazy"></div></div>' +
        '<aside class="lp-aside" data-reveal style="--d:250ms"><div class="factsheet"><span class="pcard-icon">' + I[s.icon] + '</span><h4>' + s.short + '</h4><dl>' + s.facts.map(function (f) { return '<div><dt>' + f[0] + '</dt><dd>' + f[1] + '</dd></div>'; }).join('') + '</dl><a class="button button--primary" href="#contacto">Evaluar mi caso ' + I.arrow + '</a></div></aside>' +
      '</div></div></section>' +
    '<section class="section section--mint"><div class="container"><div class="sec-head"><div class="t"><span class="section-label" data-reveal>Cómo lo resolvemos</span><h2 data-reveal="split">Un proceso claro, de principio a fin.</h2></div></div><div class="howgrid">' + how + '</div></div></section>' +
    '<section class="section"><div class="container"><div class="two">' +
      '<div><span class="section-label" data-reveal>Requisitos</span><h2 data-reveal="split" style="margin-top:1rem">Lo que necesitamos para empezar</h2><ul class="checklist" data-stagger>' + req + '</ul></div>' +
      '<div><span class="section-label" data-reveal>Plazos estimados</span><h3 data-reveal style="margin-top:1rem">Tiempos referenciales</h3><div class="timeline" data-reveal>' + tl + '</div><p class="caption" style="margin-top:1rem" data-reveal>Plazos referenciales. Dependen de la autoridad o tribunal y de los antecedentes de cada caso; te damos un plazo concreto después del diagnóstico.</p></div>' +
    '</div></div></section>' +
    '<section class="section" id="preguntas-servicio" aria-labelledby="sfaqTitle"><div class="container"><div class="hfaq">' +
      '<h2 class="hfaq-title" id="sfaqTitle" data-reveal="split">' + SVC_FAQ[s.slug].title + '</h2>' +
      '<div class="hfaq-media"><div class="hfaq-photo" data-reveal style="--d:150ms"><img data-parallax="-0.1" src="assets/img/' + SVC_FAQ[s.slug].img + '.jpg" alt="' + SVC_FAQ[s.slug].alt + '" loading="lazy"><span class="badge"><b>?</b><span>¿No está tu pregunta?<br>Escríbenos y te respondemos.</span></span></div></div>' +
      '<div class="hfaq-main"><p class="hfaq-lead" data-reveal>Las dudas que más nos plantean los dueños de pymes en esta situación, respondidas sin letra chica.</p>' + qaList(SVC_FAQ[s.slug].items, 'sq') +
        '<div class="hfaq-foot" data-reveal>¿Tienes otra duda? ' + waBtn('button--secondary', 'Pregúntanos por WhatsApp') + '</div></div>' +
    '</div></div></section>' +
    contactBlock('¿Te pasó esto? <em>Conversemos hoy</em> y te decimos qué es viable para tu empresa.') +
    '<section class="section"><div class="container"><div class="sec-head"><div class="t"><span class="section-label" data-reveal>Otras soluciones</span><h2 data-reveal="split">¿Tu problema es otro?</h2></div></div><div class="related">' + rel + '</div></div></section>';
  }

  function viewAbout() {
    // [nombre, cargo, áreas (vacío = no se muestra), grupo, foto en assets/img/, ¿foto referencial?, LinkedIn]
    var team = [
      ['Javier Pezoa', 'Socio fundador', [], 'socios', 'team-javier-pezoa', false, 'https://www.linkedin.com/in/javierpezoamundaca/'],
      ['Felipe Moreno', 'Socio fundador', [], 'socios', 'team-felipe-moreno', false, 'https://www.linkedin.com/in/felipe-ignacio-moreno-martinez-444244249/']
    ];
    var LI = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/></svg>';
    return '' +
    '<section class="ab-hero team-sec" id="equipo" aria-labelledby="teamTitle"><div class="container">' +
      '<nav class="crumbs" aria-label="Ruta"><a href="#inicio">Inicio</a><span aria-hidden="true">/</span><span aria-current="page">Nosotros</span></nav>' +
      '<span class="section-label section-label--pop">Equipo de especialistas de Tributarium</span>' +
      '<div class="team-head">' +
      '<h1 class="team-statement" id="teamTitle" data-reveal="split">El derecho tributario era un privilegio de las grandes empresas. Lo pusimos <span class="hl-mark">al alcance de las pymes</span>.</h1>' +
      '<p class="team-intro" data-reveal style="--d:150ms">Durante años, la asesoría tributaria especializada fue un nicho reservado para las grandes compañías. Los socios fundadores creamos Tributarium para que las <strong>pequeñas y medianas empresas de Chile</strong> también puedan hacer valer sus derechos frente al SII y la Tesorería, con el mismo respaldo legal que antes tenían solo unos pocos.</p>' +
      '</div>' +
      (team.some(function (m) { return m[3] !== team[0][3]; }) ? '<div class="team-filter" role="group" aria-label="Filtrar equipo" data-reveal>' +
        '<button type="button" class="tf" aria-pressed="true" data-team="todos">Todos</button>' +
        '<button type="button" class="tf" aria-pressed="false" data-team="socios">Socios fundadores</button>' +
        '<button type="button" class="tf" aria-pressed="false" data-team="abogados">Abogados</button>' +
      '</div>' : '') +
      '<div class="team-grid">' + team.map(function (m, i) {
        return '<article class="tm" data-group="' + m[3] + '" data-reveal style="--d:' + (i % 2) * 110 + 'ms">' +
          '<img src="assets/img/' + m[4] + '.jpg" alt="' + m[0] + ', ' + m[1].toLowerCase() + ' de Tributarium" loading="lazy">' +
          (m[5] ? '<span class="tm-ref">Foto referencial</span>' : '') +
          '<div class="tm-card"><p class="tm-name">' + m[0] + ', <span>' + m[1] + '</span>' +
            (m[6] ? '<a class="tm-li" href="' + m[6] + '" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn de ' + m[0] + '">' + LI + '</a>' : '') + '</p>' +
            (m[2].length ? '<p class="tm-areas">' + m[2].join(' · ') + '</p>' : '') + '</div>' +
        '</article>';
      }).join('') + '</div>' +
    '</div></section>' +
    contactBlock('Conversemos sobre tu empresa. <em>Elige cómo empezar.</em>');
  }

  function viewBlog() {
    var counts = {}; POSTS.forEach(function (p) { counts[p.topic] = (counts[p.topic] || 0) + 1; });
    var f = POSTS[0];
    return '' +
    '<section class="ab-hero"><div class="container">' +
      '<nav class="crumbs" aria-label="Ruta"><a href="#inicio">Inicio</a><span aria-hidden="true">/</span><span aria-current="page">Blog</span></nav>' +
      '<span class="section-label">Blog</span>' +
      '<h1 data-reveal="split" style="margin-top:1.25rem;max-width:18ch">Recursos y guías para pymes</h1>' +
      '<p class="lead prose" data-reveal style="--d:200ms;margin-top:1.25rem">Lo que necesitas saber sobre el SII, la Tesorería, las quiebras y las sociedades, explicado para dueños de empresa.</p>' +
      '<div class="filters" role="group" aria-label="Filtrar por tema" data-reveal style="--d:300ms">' + TOPICS.map(function (t, i) { return '<button class="filter" type="button" aria-pressed="' + (i === 0) + '" data-filter="' + t + '">' + t + ' <span class="c">' + (i === 0 ? POSTS.length : (counts[t] || 0)) + '</span></button>'; }).join('') + '</div>' +
    '</div></section>' +
    '<section class="section" style="padding-top:clamp(2.5rem,5vw,4rem)"><div class="container">' +
      '<a class="feature post" href="#articulo-' + f.slug + '" data-topic="' + f.topic + '" data-reveal>' + coverHtml(f, '', 'Destacado · ' + f.topic) + '' +
        '<div class="txt"><div class="meta"><span>' + f.date + '</span><span aria-hidden="true">·</span><span>' + f.min + ' min de lectura</span></div><h2><span>' + f.title + '</span></h2><p>' + f.excerpt + '</p><span class="textlink">Leer artículo ' + I.arrow + '</span></div></a>' +
      '<div class="posts" id="postGrid">' + POSTS.slice(1).map(postCard).join('') + '</div>' +
      '<nav class="pager" id="pager" aria-label="Páginas del blog" hidden></nav>' +
      '<p class="empty" id="emptyMsg" hidden>Aún no hay artículos en este tema.</p>' +
    '</div></section>';
  }

  function viewArticle(p) {
    var toc = [], body = p.body.map(function (b, i) {
      if (b[0] === 'h2') { var id = 'sec-' + i; toc.push('<a href="#articulo-' + p.slug + '" data-target="' + id + '">' + b[1] + '</a>'); return '<h2 id="' + id + '">' + b[1] + '</h2>'; }
      if (b[0] === 'ul') return '<ul>' + b[1].map(function (li) { return '<li>' + li + '</li>'; }).join('') + '</ul>';
      if (b[0] === 'blockquote') return '<blockquote>' + b[1] + '</blockquote>';
      return '<p>' + b[1] + '</p>';
    }).join('');
    var service = { 'SII': 'desbloqueo-sii', 'Tesorería TGR': 'convenio-especial-tgr', 'Quiebras': 'liquidacion-y-reestructuracion', 'Sociedades': 'liquidacion-y-reestructuracion' }[p.topic];
    if (p.service && svc(p.service)) service = p.service;
    var sv = svc(service || 'desbloqueo-sii');
    var rel = POSTS.filter(function (x) { return x.slug !== p.slug; }).slice(0, 3);
    return '' +
    '<div class="container"><header class="art-head">' +
      '<nav class="crumbs" aria-label="Ruta" style="margin-bottom:0"><a href="#inicio">Inicio</a><span aria-hidden="true">/</span><a href="#blog">Blog</a><span aria-hidden="true">/</span><span>' + p.topic + '</span></nav>' +
      '<span class="pill" style="justify-self:start">' + p.topic + '</span>' +
      '<h1 data-reveal="split">' + esc(p.title) + '</h1>' +
      '<div class="art-meta" data-reveal style="--d:200ms"><span>Equipo Tributarium</span><span aria-hidden="true">·</span><span>' + p.date + '</span><span aria-hidden="true">·</span><span>' + p.min + ' min de lectura</span></div>' +
    '</header>' +
    coverHtml(p, ' art-cover', p.topic) +
    '<div class="art-layout"><article class="art-body"><div class="prose"><p class="lead">' + esc(p.excerpt) + '</p>' + body + '</div>' +
      '<p class="caption disclaimer">Contenido orientativo; no reemplaza la asesoría para tu caso.' + (p.sample ? ' Artículo de muestra para el diseño: validar antes de publicar.' : '') + '</p></article>' +
      '<aside class="art-aside"><div class="stick">' + (toc.length ? '<nav class="toc" aria-label="En este artículo"><span class="section-label" style="margin-bottom:.5rem">En este artículo</span>' + toc.join('') + '</nav>' : '') +
        '<div class="cta-card"><strong>¿Te está pasando esto?</strong><p>' + esc(sv.problem) + '</p>' + waBtn('button--accent', 'Evaluar mi caso') + '<a class="textlink" href="#' + sv.slug + '" style="color:var(--color-background)">' + sv.cta + ' ' + I.arrow + '</a></div>' +
      '</div></aside></div></div>' +
    '<section class="section section--mint"><div class="container"><div class="sec-head"><div class="t"><span class="section-label" data-reveal>Sigue leyendo</span><h2 data-reveal="split">Otros artículos para tu empresa</h2></div></div><div class="posts">' + rel.map(postCard).join('') + '</div></div></section>';
  }

  /* ===== Router ===== */
  var SECTION_ROUTES = { 'soluciones': 1, 'soluciones-detalle': 1, 'como-trabajamos': 1, 'contacto': 1, 'recursos': 1, 'por-que': 1 };
  var app = $('#app'), currentView = null;

  function resolve(hash) {
    var h = (hash || '').replace(/^#/, '');
    if (!h || h === 'inicio' || h === 'top') return { view: 'home', html: viewHome };
    if (SECTION_ROUTES[h]) {
      if (h === 'contacto' && currentView && currentView !== 'home' && $('#contacto')) return { view: currentView, keep: true, scroll: h };
      return { view: 'home', html: viewHome, scroll: h };
    }
    if (svc(h)) return { view: h, html: function () { return viewService(svc(h)); } };
    if (h === 'nosotros') return { view: h, html: viewAbout };
    if (h === 'blog') return { view: h, html: viewBlog };
    if (h.indexOf('articulo-') === 0 && post(h.slice(9))) return { view: h, html: function () { return viewArticle(post(h.slice(9))); } };
    return { view: 'home', html: viewHome };
  }

  var glideRaf = null;
  function glideTo(y, dur) {
    cancelAnimationFrame(glideRaf);
    var y0 = window.scrollY, dy = y - y0, t0 = null;
    var stop = function () { cancelAnimationFrame(glideRaf); window.removeEventListener('wheel', stop); window.removeEventListener('touchstart', stop); };
    window.addEventListener('wheel', stop, { passive: true }); window.addEventListener('touchstart', stop, { passive: true });
    (function step(ts) {
      if (t0 === null) t0 = ts;
      var k = Math.min(1, (ts - t0) / dur);
      window.scrollTo(0, y0 + dy * (0.5 - Math.cos(Math.PI * k) / 2));
      if (k < 1) glideRaf = requestAnimationFrame(step); else stop();
    })(performance.now());
  }
  function scrollToId(id, smooth) {
    var st = document.getElementById('soluciones');
    if ((id === 'soluciones' || id === 'soluciones-detalle') && st && st.classList.contains('stage-on')) {
      var top = st.getBoundingClientRect().top + window.scrollY + (st.offsetHeight - window.innerHeight) * 0.72;
      if (smooth && !reduce) glideTo(top, Math.min(5600, Math.max(3000, Math.abs(top - window.scrollY) * 2.4))); else window.scrollTo(0, top);
      return;
    }
    var el = document.getElementById(id); if (!el) return;
    if (id === 'soluciones-detalle' && !el.offsetParent) el = document.getElementById('soluciones') || el;
    var y = el.getBoundingClientRect().top + window.scrollY - 84;
    window.scrollTo({ top: Math.max(0, y), behavior: smooth && !reduce ? 'smooth' : 'auto' });
  }

  function route(first) {
    closeMenu(); closeDrop();
    var r = resolve(location.hash);
    if (r.view === currentView && (r.keep || r.view === 'home' || r.scroll)) { if (r.scroll) scrollToId(r.scroll, true); else if (!first) window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }); setNav(); return; }
    var swap = function () {
      currentView = r.view;
      app.innerHTML = r.html();
      document.body.classList.toggle('has-hero', r.view === 'home');
      document.body.classList.toggle('on-hero', r.view === 'home');
      document.documentElement.classList.remove('loaded');
      setNav();
      if (r.scroll) { initPage(); requestAnimationFrame(function () { scrollToId(r.scroll, false); }); }
      else { window.scrollTo(0, 0); initPage(); }
      app.classList.remove('leaving');
      if (!first) app.focus({ preventScroll: true });
      var markLoaded = function () { document.documentElement.classList.add('loaded'); };
      requestAnimationFrame(function () { requestAnimationFrame(markLoaded); });
      setTimeout(markLoaded, 120);
    };
    if (first || reduce) swap(); else { app.classList.add('leaving'); setTimeout(swap, 280); }
  }

  function setNav() {
    var v = currentView || 'home';
    $$('.nav [data-nav]').forEach(function (a) {
      var on = a.getAttribute('data-nav') === v || (v.indexOf('articulo-') === 0 && a.getAttribute('data-nav') === 'blog');
      if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    $('#readbar').hidden = v.indexOf('articulo-') !== 0;
  }

  /* ===== Inicializadores por página ===== */
  var io, scrollers = [];
  function splitText(el) {
    if (el.dataset.splitDone) return; el.dataset.splitDone = '1';
    var i = 0;
    (function walk(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (n) {
        if (n.nodeType === 3) {
          var frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(function (part) {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
            var w = document.createElement('span'); w.className = 'w';
            var s = document.createElement('span'); s.textContent = part; s.style.setProperty('--i', i++);
            w.appendChild(s); frag.appendChild(w);
          });
          n.parentNode.replaceChild(frag, n);
        } else if (n.nodeType === 1) walk(n);
      });
    })(el);
  }

  function initPage() {
    $$('[data-reveal="split"]', app).forEach(splitText);
    $$('[data-stagger]', app).forEach(function (g) { Array.prototype.forEach.call(g.children, function (c, i) { if (!c.hasAttribute('data-reveal')) c.setAttribute('data-reveal', ''); c.style.setProperty('--d', i * 90 + 'ms'); }); });
    if (io) io.disconnect();
    var targets = $$('[data-reveal]', app);
    if (document.documentElement.classList.contains('motion')) {
      io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
      targets.forEach(function (t) { io.observe(t); });
    } else targets.forEach(function (t) { t.classList.add('is-in'); });

    // Formulario (maqueta)
    var form = $('#preForm', app);
    if (form) form.addEventListener('submit', function (e) { e.preventDefault(); $('#formMsg').hidden = false; });

    // Filtros del blog
    // Blog: filtros por tema + paginación (1 destacado arriba y máximo 9 artículos por página debajo)
    var grid = $('#postGrid', app), pager = $('#pager', app);
    if (grid) {
      var PER_PAGE = 9, topic = 'Todos', page = 1;
      var renderBlog = function (animate) {
        var feature = $('.feature', app), shown = 0;
        if (feature) {
          var fOk = topic === 'Todos' || feature.getAttribute('data-topic') === topic;
          feature.classList.toggle('hide', !fOk || page > 1);
          if (fOk) shown++;
        }
        var list = $$('.post', grid).filter(function (p) { return topic === 'Todos' || p.getAttribute('data-topic') === topic; });
        var pages = Math.max(1, Math.ceil(list.length / PER_PAGE));
        if (page > pages) page = pages;
        $$('.post', grid).forEach(function (p) { p.classList.add('hide'); });
        list.slice((page - 1) * PER_PAGE, page * PER_PAGE).forEach(function (p, k) {
          p.classList.remove('hide');
          if (animate) { p.classList.remove('pop', 'is-in'); void p.offsetWidth; p.classList.add('pop', 'is-in'); p.style.setProperty('--d', (k % 6) * 60 + 'ms'); }
        });
        shown += list.length;
        $('#emptyMsg', app).hidden = shown > 0;
        if (pages < 2) { pager.hidden = true; pager.innerHTML = ''; return; }
        var nums = [];
        for (var n = 1; n <= pages; n++) {
          if (n === 1 || n === pages || Math.abs(n - page) <= 1) nums.push(n);
          else if (nums[nums.length - 1] !== '…') nums.push('…');
        }
        pager.innerHTML =
          '<button type="button" class="pg pg-arrow" data-page="' + (page - 1) + '" aria-label="Página anterior"' + (page === 1 ? ' disabled' : '') + '>' + I.arrow + '</button>' +
          nums.map(function (n) {
            return n === '…' ? '<span class="pg-gap" aria-hidden="true">…</span>' :
              '<button type="button" class="pg" data-page="' + n + '"' + (n === page ? ' aria-current="page"' : '') + ' aria-label="Página ' + n + '">' + n + '</button>';
          }).join('') +
          '<button type="button" class="pg pg-arrow pg-next" data-page="' + (page + 1) + '" aria-label="Página siguiente"' + (page === pages ? ' disabled' : '') + '>' + I.arrow + '</button>';
        pager.hidden = false;
      };
      pager.addEventListener('click', function (e) {
        var b = e.target.closest('.pg'); if (!b || b.disabled) return;
        page = +b.getAttribute('data-page');
        renderBlog(true);
        var top = (page > 1 ? grid : ($('.feature:not(.hide)', app) || grid)).getBoundingClientRect().top + window.scrollY - 110;
        window.scrollTo({ top: Math.max(0, top), behavior: reduce ? 'auto' : 'smooth' });
      });
      $$('.filter', app).forEach(function (b) {
        b.addEventListener('click', function () {
          topic = b.getAttribute('data-filter'); page = 1;
          $$('.filter', app).forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
          var feature = $('.feature', app);
          if (feature) { feature.classList.remove('pop', 'is-in'); void feature.offsetWidth; feature.classList.add('pop', 'is-in'); }
          renderBlog(true);
        });
      });
      renderBlog(false);
    }

    // TOC del artículo
    $$('.team-filter', app).forEach(function (bar) {
      bar.addEventListener('click', function (e) {
        var b = e.target.closest('.tf'); if (!b) return;
        var g = b.getAttribute('data-team');
        $$('.tf', bar).forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
        var k = 0;
        $$('.team-grid .tm', app).forEach(function (t) {
          var show = g === 'todos' || t.getAttribute('data-group') === g;
          t.classList.remove('pop'); t.classList.toggle('hide', !show);
          if (show) { t.style.setProperty('--d', (k++ * 90) + 'ms'); void t.offsetWidth; t.classList.add('pop'); }
        });
      });
    });
    $$('.qa', app).forEach(function (qa) {
      qa.addEventListener('click', function (e) {
        var b = e.target.closest('.qa-q'); if (!b) return;
        var it = b.parentNode, on = !it.classList.contains('open');
        $$('.qa-item.open', qa).forEach(function (o) { o.classList.remove('open'); $('.qa-q', o).setAttribute('aria-expanded', 'false'); });
        if (on) { it.classList.add('open'); b.setAttribute('aria-expanded', 'true'); }
      });
    });
    $$('.toc a', app).forEach(function (a) { a.addEventListener('click', function (e) { e.preventDefault(); scrollToId(a.getAttribute('data-target'), true); }); });

    // WhatsApp número visible
    $$('[data-wa-num]').forEach(function (n) { n.textContent = WA_LABEL; });
    bindMagnetic(app);
    initTabs($('#soluciones.svc', app));
    collectScrollers();
    onScroll();
  }

  /* ===== Scroll-linked ===== */
  function collectScrollers() {
    scrollers = [];
    var hero = $('#heroCard', app);
    if (hero) scrollers.push(function () {
      var r = hero.getBoundingClientRect();
      hero.style.setProperty('--p', Math.min(1, Math.max(0, -r.top / r.height)).toFixed(3));
    });
    $$('[data-parallax]', app).forEach(function (el) {
      var k = parseFloat(el.getAttribute('data-parallax'));
      scrollers.push(function (vh) { var r = el.parentNode.getBoundingClientRect(); var c = r.top + r.height / 2 - vh / 2; var lim = el.classList.contains('contact-araucaria') ? 400 : r.height * 0.09; var v = Math.max(-lim, Math.min(lim, c * k)); el.style.setProperty('--py', v.toFixed(1) + 'px'); });
    });
    var stage = $('#soluciones.svc', app);
    if (stage) { scrollers.push(stageScroller(stage)); scrollers.push(mobileSvcScroller(stage)); }
    var steps = $('#steps', app);
    if (steps) {
      var fill = $('#railFill', app), items = $$('.step', steps), phase = $('#phase', app);
      scrollers.push(function (vh) {
        var r = steps.getBoundingClientRect();
        var prog = Math.min(1, Math.max(0, (vh * 0.6 - r.top) / r.height));
        fill.style.setProperty('--prog', prog.toFixed(3));
        var last = null;
        items.forEach(function (it) { var on = it.getBoundingClientRect().top < vh * 0.6; it.classList.toggle('active', on); if (on) last = it; });
        phase.setAttribute('data-phase', last ? last.getAttribute('data-phase') : 'guerra');
      });
    }
    var st = $('#statement', app);
    if (st) {
      var words = $$('.sw', st);
      scrollers.push(function (vh) {
        var r = st.getBoundingClientRect();
        var prog = (vh * 0.85 - r.top) / (vh * 0.5);
        words.forEach(function (w, i) { w.classList.toggle('on', reduce || prog > i / words.length); });
      });
    }
    var art = $('.art-body', app);
    if (art) {
      var bar = $('#readbar'), tocs = $$('.toc a', app);
      scrollers.push(function (vh) {
        var r = art.getBoundingClientRect();
        bar.style.setProperty('--read', Math.min(1, Math.max(0, (vh * 0.3 - r.top) / (r.height - vh * 0.5))).toFixed(3));
        var cur = null; tocs.forEach(function (a) { var t = document.getElementById(a.getAttribute('data-target')); if (t && t.getBoundingClientRect().top < vh * 0.35) cur = a; });
        tocs.forEach(function (a) { a.classList.toggle('on', a === cur); });
      });
    }
  }

  function clamp01(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
  function easeIO(t) { return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function stageEnabled() { return document.documentElement.classList.contains('motion') && window.innerWidth >= 900 && window.innerHeight >= 640; }
  function stageScroller(stage) {
    var sticky = $('.svc-sticky', stage), grid = $('.svc-grid', stage), center = $('.tile-center', stage), dark = $('.tile-center .dark', stage);
    var sides = $$('.tile-side', stage), head = $('.svc-head', stage), h2 = $('.svc-head h2', stage), cta = $('.svc-arrow', stage), hl = $('.hl-pyme', stage), tabs = $('.svc-tabs', stage);
    var from = [245, 249, 250], to = [23, 59, 102];
    return function (vh) {
      var on = stageEnabled();
      if (on !== stage.classList.contains('stage-on')) {
        stage.classList.toggle('stage-on', on);
        [center, head, h2, tabs, cta].concat(sides).forEach(function (el) { el.removeAttribute('style'); });
        stage.style.removeProperty('--head-c');
        if (!on) return;
      }
      if (!on) { var hr = hl && hl.getBoundingClientRect(); if (hr && hr.top < vh * .85) hl.classList.add('on'); return; }
      var r = stage.getBoundingClientRect(), total = r.height - vh;
      var p = clamp01(-r.top / total);
      var e = easeIO(clamp01(p / 0.36)), c = clamp01((p - 0.34) / 0.16), t = easeIO(clamp01((p - 0.46) / 0.34));
      var g = grid.getBoundingClientRect(), sr = sticky.getBoundingClientRect();
      var iL = g.width * 0.255, iW = g.width * 0.49, fL = sr.left - g.left, fT = sr.top - g.top;
      center.style.left = lerp(iL, fL, e) + 'px';
      center.style.top = lerp(0, fT, e) + 'px';
      center.style.width = lerp(iW, sr.width, e) + 'px';
      center.style.height = lerp(g.height, sr.height, e) + 'px';
      center.style.borderRadius = lerp(20, 0, e) + 'px';
      dark.style.opacity = (1 - c).toFixed(3);
      sides.forEach(function (el) {
        var d = +el.getAttribute('data-dir');
        el.style.transform = 'translateX(' + (d * e * 45).toFixed(2) + '%) scale(' + (1 - e * .08).toFixed(3) + ')';
        el.style.opacity = clamp01(1 - e * 1.5).toFixed(3);
      });
      var col = from.map(function (v, k) { return Math.round(lerp(v, to[k], c)); });
      stage.style.setProperty('--head-c', 'rgb(' + col.join(',') + ')');
      var fade = clamp01(1 - t * 3.5);
      if (hl) hl.classList.toggle('on', t > .9);
      cta.style.opacity = fade.toFixed(3);
      cta.style.pointerEvents = fade < .2 ? 'none' : '';
      cta.style.visibility = fade < .01 ? 'hidden' : 'visible';
      cta.tabIndex = fade < .2 ? -1 : 0;
      h2.style.maxWidth = (20 + 10 * t).toFixed(2) + 'ch';
      var off = (tabs.offsetHeight + 40) / 2 - 46;
      head.style.transform = 'translateY(' + (off * (1 - t) * (1 - t)).toFixed(1) + 'px)';
      tabs.style.opacity = clamp01((t - .45) / .55).toFixed(3);
      tabs.style.transform = 'translateY(' + (22 * (1 - t)).toFixed(1) + 'px)';
      tabs.classList.toggle('inert', t < .6);
      if (t > .9) startTabs(stage); else stopAuto();
    };
  }

  /* Soluciones en el teléfono: la tarjeta azul crece hasta llenar la pantalla (como en el computador)
     y después las soluciones llegan como tarjetas que se apilan. Solo se animan transform, opacity y
     clip-path, y el avance se suaviza en cada cuadro para que no se sienta entrecortado. */
  function mobileSvcScroller(stage) {
    var ms = $('.svc-mstage', stage);
    if (!ms) return function () {};
    var sticky = $('.ms-sticky', ms), slot = $('.ms-slot', ms), bg = $('.ms-bg', ms), h = $('.ms-h', ms), hl = $('.ms-hl', ms);
    var ta = $('.ms-a', ms), tb = $('.ms-b', ms);
    var cards = $$('.sc', stage), ins = cards.map(function (c) { return $('.sc-in', c); });
    var shades = cards.map(function (c) { return $('.sc-shade', c); }), pics = cards.map(function (c) { return $('.sc-img img', c); });
    var from = [245, 249, 250], to = [23, 59, 102];
    var geo = null, key = '', cur = -1, target = 0, raf = 0, hh = 76, last = {};

    function measure(vh) {
      hh = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 76;
      var st = sticky.getBoundingClientRect(), sl = slot.getBoundingClientRect();
      geo = { t: sl.top - st.top, l: sl.left - st.left, r: st.right - sl.right, b: st.bottom - sl.bottom, dy: (sl.top + sl.height / 2) - (st.top + st.height / 2) };
      cards.forEach(function (c, i) { c.style.top = Math.min(hh + 8 + i * 12, vh - c.offsetHeight - 16) + 'px'; });
    }
    function set(el, prop, v) { var k = prop + (el.className || ''); if (last[k] === v) return; last[k] = v; el.style[prop] = v; }
    function render(p) {
      var e = easeIO(clamp01(p / 0.52)), c = easeIO(clamp01((p - 0.62) / 0.3)), q = 1 - e;
      var clip = 'inset(' + (geo.t * q).toFixed(1) + 'px ' + (geo.r * q).toFixed(1) + 'px ' + (geo.b * q).toFixed(1) + 'px ' + (geo.l * q).toFixed(1) + 'px round ' + (24 * q).toFixed(1) + 'px)';
      bg.style.clipPath = clip; bg.style.webkitClipPath = clip;
      set(bg, 'opacity', (1 - c).toFixed(3));
      h.style.transform = 'translate3d(0,' + (geo.dy * q).toFixed(1) + 'px,0) scale(' + (1 + 0.06 * e).toFixed(4) + ')';
      set(h, 'color', 'rgb(' + from.map(function (v, k) { return Math.round(lerp(v, to[k], c)); }).join(',') + ')');
      hl.classList.toggle('on', c > 0.85);
      ta.style.transform = 'translate3d(' + (-22 * e).toFixed(2) + '%,' + (28 * e).toFixed(2) + '%,0) scale(' + (1 - 0.12 * e).toFixed(4) + ')';
      tb.style.transform = 'translate3d(' + (22 * e).toFixed(2) + '%,' + (28 * e).toFixed(2) + '%,0) scale(' + (1 - 0.12 * e).toFixed(4) + ')';
      var o = clamp01(1 - e * 1.6).toFixed(3); set(ta, 'opacity', o); set(tb, 'opacity', o);
    }
    function tick() {
      raf = 0;
      var d = target - cur;
      cur = Math.abs(d) < 0.0004 ? target : cur + d * 0.16;
      render(cur);
      if (cur !== target) raf = requestAnimationFrame(tick);
    }

    return function (vh) {
      if (!ms.offsetParent) return;
      var k2 = vh + 'x' + window.innerWidth;
      if (k2 !== key || !geo) { key = k2; measure(vh); }
      // Escena de la tarjeta azul
      if (reduce) { if (cur < 0) { ms.classList.add('ms-static'); measure(vh); cur = 0; render(0); } }
      else {
        var r = ms.getBoundingClientRect(), len = r.height - sticky.offsetHeight;
        target = clamp01(-r.top / len);
        if (cur < 0) { cur = target; render(cur); }
        else if (!raf) raf = requestAnimationFrame(tick);
      }
      // Tarjetas apiladas: primero se leen todas las posiciones y luego se escribe.
      var rects = cards.map(function (c) { return c.getBoundingClientRect(); });
      rects.forEach(function (a, i) {
        var nb = rects[i + 1], kk = nb ? clamp01(1 - (nb.top - a.top) / a.height) : 0;
        ins[i].style.transform = 'scale(' + (1 - 0.06 * kk).toFixed(4) + ')';
        shades[i].style.opacity = (kk * 0.22).toFixed(3);
        pics[i].style.transform = 'scale(' + (1.04 + 0.08 * kk).toFixed(4) + ')';
        if (a.top < vh * 0.9) cards[i].classList.add('in');
      });
    };
  }

  /* Pestañas de soluciones */
  var tabTimer = null, tabUser = false, TAB_DUR = 7000;
  function stopAuto() { clearTimeout(tabTimer); tabTimer = null; var ind = document.querySelector('.tab-ind'); if (ind) ind.classList.remove('run'); }
  function setTab(root, idx, fromUser) {
    var btns = $$('.tabbar [role="tab"]', root), panels = $$('.panel', root), ind = $('.tab-ind', root);
    btns.forEach(function (b, i) { var on = i === idx; b.setAttribute('aria-selected', String(on)); b.tabIndex = on ? 0 : -1; });
    panels.forEach(function (pn, i) { var on = i === idx; if (on && pn.hidden) { pn.hidden = false; void pn.offsetWidth; } pn.classList.toggle('on', on); if (!on) setTimeout(function () { if (!pn.classList.contains('on')) pn.hidden = true; }, 520); });
    var b = btns[idx], bar = b.parentNode;
    ind.style.left = (b.offsetLeft) + 'px'; ind.style.width = b.offsetWidth + 'px';
    if (fromUser) { tabUser = true; stopAuto(); ind.classList.add('user'); }
    if (bar.scrollWidth > bar.clientWidth) bar.scrollTo({ left: b.offsetLeft - 16, behavior: reduce ? 'auto' : 'smooth' });
    root.dataset.tab = idx;
  }
  function startTabs(root) {
    if (tabUser || tabTimer || reduce) return;
    var tb = $('.tabbar', root); if (!tb || !tb.offsetParent) return;
    var ind = $('.tab-ind', root);
    ind.classList.remove('run'); void ind.offsetWidth; ind.style.setProperty('--dur', TAB_DUR + 'ms'); ind.classList.add('run');
    tabTimer = setTimeout(function () {
      tabTimer = null;
      var n = $$('.tabbar [role="tab"]', root).length;
      setTab(root, ((+root.dataset.tab || 0) + 1) % n, false);
      startTabs(root);
    }, TAB_DUR);
  }
  function initTabs(root) {
    if (!root) return;
    tabUser = false; stopAuto();
    var btns = $$('.tabbar [role="tab"]', root);
    btns.forEach(function (b, i) {
      b.addEventListener('click', function () { setTab(root, i, true); });
      b.addEventListener('keydown', function (ev) {
        var k = ev.key, n = btns.length, j = null;
        if (k === 'ArrowRight') j = (i + 1) % n; else if (k === 'ArrowLeft') j = (i - 1 + n) % n; else if (k === 'Home') j = 0; else if (k === 'End') j = n - 1;
        if (j !== null) { ev.preventDefault(); setTab(root, j, true); btns[j].focus(); }
      });
    });
    setTab(root, 0, false);
    window.addEventListener('resize', function () { if (document.body.contains(root)) setTab(root, +root.dataset.tab || 0, false); });
    if (!stageEnabled()) { var ob = new IntersectionObserver(function (en) { en.forEach(function (x) { if (x.isIntersecting) startTabs(root); else stopAuto(); }); }, { threshold: .5 }); ob.observe(root); }
  }

  var header = $('.site-header'), ticking = false;
  function onScroll() {
    if (ticking) return; ticking = true;
    requestAnimationFrame(function () {
      ticking = false;
      header.classList.toggle('is-scrolled', window.scrollY > 12);
      document.body.classList.toggle('compact', window.scrollY > 60);
      var hc = document.getElementById('heroCard');
      document.body.classList.toggle('on-hero', !!hc && hc.getBoundingClientRect().bottom > 90);
      var vh = window.innerHeight;
      scrollers.forEach(function (f) { f(vh); });
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);

  /* ===== Botones magnéticos ===== */
  function bindMagnetic(root) {
    if (!finePointer || reduce) return;
    $$('[data-magnetic]', root).forEach(function (b) {
      if (b.dataset.magBound) return; b.dataset.magBound = '1';
      b.addEventListener('pointermove', function (e) {
        var r = b.getBoundingClientRect();
        var x = (e.clientX - r.left - r.width / 2) / r.width, y = (e.clientY - r.top - r.height / 2) / r.height;
        b.style.transform = 'translate(' + (x * 10).toFixed(1) + 'px,' + (y * 8).toFixed(1) + 'px)';
      });
      b.addEventListener('pointerleave', function () { b.style.transform = ''; });
    });
  }

  /* ===== Navegación global ===== */
  var drop = $('#dropSol'), dropBtn = drop.querySelector('button');
  $('#dropPanel').innerHTML = SERVICES.map(function (s) { return '<a href="#' + s.slug + '"><strong>' + s.short + '</strong><span>' + s.menu + '</span></a>'; }).join('');
  $('#mobileSub').innerHTML = SERVICES.map(function (s) { return '<a href="#' + s.slug + '">' + s.short + '</a>'; }).join('');
  $('#footSol').innerHTML = SERVICES.map(function (s) { return '<li><a href="#' + s.slug + '">' + s.short + '</a></li>'; }).join('');
  function openDrop() { drop.classList.add('open'); dropBtn.setAttribute('aria-expanded', 'true'); }
  function closeDrop() { drop.classList.remove('open'); dropBtn.setAttribute('aria-expanded', 'false'); }
  dropBtn.addEventListener('click', function () { drop.classList.contains('open') ? closeDrop() : openDrop(); });
  if (finePointer) { var dt; drop.addEventListener('pointerenter', function () { clearTimeout(dt); openDrop(); }); drop.addEventListener('pointerleave', function () { dt = setTimeout(closeDrop, 160); }); }
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { closeDrop(); closeMenu(); } });
  document.addEventListener('click', function (e) { if (!drop.contains(e.target)) closeDrop(); });

  var burger = $('.burger');
  function closeMenu() { document.body.classList.remove('menu-open'); burger.setAttribute('aria-expanded', 'false'); burger.setAttribute('aria-label', 'Abrir menú'); }
  burger.addEventListener('click', function () {
    var open = !document.body.classList.contains('menu-open');
    document.body.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', String(open)); burger.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  });

  // Mismo hash: hashchange no se dispara, así que forzamos el desplazamiento.
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a) return;
    var href = a.getAttribute('href');
    if ((href === '#soluciones' || href === '#soluciones-detalle') && document.getElementById('soluciones')) {
      e.preventDefault(); closeMenu(); closeDrop(); scrollToId('soluciones-detalle', true); return;
    }
    if (a.getAttribute('href') === location.hash || (a.getAttribute('href') === '#inicio' && !location.hash)) { e.preventDefault(); route(false); }
  });

  $('.wa-btn').href = WA_URL; $('.wa-btn').innerHTML = I.wa;
  if (!reduce) setTimeout(function () { var w = $('#waFloat'); w.classList.add('peek'); setTimeout(function () { w.classList.remove('peek'); }, 3800); }, 3200);

  window.addEventListener('hashchange', function () { route(false); });
  route(true);
})();
