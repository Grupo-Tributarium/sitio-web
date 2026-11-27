# Tributarium — sitio web

Sitio estático (HTML, CSS y JavaScript sin dependencias) para Tributarium, abogados tributarios para pymes y empresas en Chile. El único paso de build genera el blog a partir de archivos Markdown.

## Estructura

```
.
├── index.html            Estructura de la página (encabezado, menú, pie, contenedor de vistas)
├── css/
│   └── main.css          Todos los estilos: tokens de marca, componentes y animaciones
├── js/
│   ├── main.js           Contenido (servicios, preguntas) y lógica: rutas, animaciones, acordeones
│   └── posts.js          Artículos del blog (generado automáticamente, no editar)
├── content/blog/         Un archivo .md por artículo del blog
├── scripts/
│   └── build-blog.mjs    Convierte content/blog/*.md en js/posts.js
├── assets/
│   ├── brand/            Logo, ícono y araucaria (PNG con transparencia)
│   └── img/              Fotografías de las secciones (img/blog/: portadas del blog)
├── icons/                Favicons e íconos para iPhone y Android
├── favicon.ico
├── site.webmanifest      Nombre, colores e íconos para instalar en el celular
├── robots.txt            Permite indexar el sitio
├── _headers              Cabeceras de seguridad (Netlify y Cloudflare Pages)
├── vercel.json           Las mismas cabeceras, para Vercel
├── netlify.toml          Comando de build para Netlify
├── .editorconfig         Formato común entre editores
└── .gitignore            Archivos que nunca se suben (secretos, basura del sistema)
```

## Cómo verlo en local

Desde esta carpeta:

```bash
python3 -m http.server 5178
```

Luego abre `http://localhost:5178`.

## Publicar

El único paso de build es generar el blog (`node scripts/build-blog.mjs`, sin dependencias). El resto se publica tal cual.

- **Netlify (recomendado):** conecta el repositorio. `netlify.toml` ya define el comando (`node scripts/build-blog.mjs`) y el directorio de publicación. Toma `_headers` solo.
- **Cloudflare Pages:** comando de build `node scripts/build-blog.mjs`, directorio `/`. Toma `_headers` solo.
- **Vercel:** preset "Other", comando de build `node scripts/build-blog.mjs`. Toma `vercel.json` solo.
- **GitHub Pages:** funciona, pero no permite cabeceras de seguridad propias; es preferible una de las anteriores.

## Seguridad

- No hay claves, contraseñas ni tokens en el código. Si en el futuro se agregan (por ejemplo, para un formulario o un CRM), van en variables de entorno de la plataforma, nunca en el repositorio.
- El sitio no envía datos a ningún servidor: el formulario de contacto es una vista previa y no se transmite nada.
- Las rutas internas (`#desbloqueo-sii`, `#blog`, etc.) solo aceptan valores de una lista fija, así que la URL no puede inyectar contenido en la página.
- Los enlaces externos (WhatsApp) abren con `rel="noopener"`.
- `_headers` y `vercel.json` activan: Content-Security-Policy (solo scripts propios), protección contra iframes de terceros, HTTPS obligatorio (HSTS), `nosniff`, `Referrer-Policy` y `Permissions-Policy` (sin cámara, micrófono ni ubicación).
- Fuentes: se cargan desde Google Fonts, permitido en la política de seguridad. Si se alojan en el propio sitio, se pueden quitar esos dominios de la política.

## Blog: cómo publicar un artículo

Cada artículo es un archivo en `content/blog/` y su foto va en `assets/img/blog/`. El diseño (tarjetas, filtros por tema, artículo destacado y vista de lectura) se arma solo. La página del blog muestra el artículo más reciente destacado y debajo hasta 9 por página; cuando hay más, aparecen solos los botones de página (1, 2, 3…). Para cambiar ese número, edita `PER_PAGE` en `js/main.js`.

1. Copia `content/blog/_plantilla.md` y nómbralo `AAAA-MM-DD-titulo-corto.md` (por ejemplo `2026-12-02-iva-atrasado.md`). La parte después de la fecha es la dirección del artículo: solo minúsculas sin tilde, números y guiones.
2. Completa los datos de arriba:

   | Campo | Obligatorio | Qué es |
   |---|---|---|
   | `titulo` | Sí | Título del artículo |
   | `tema` | Sí | Filtro del blog: `SII`, `Tesorería TGR`, `Quiebras`, `Sociedades` (si pones un tema nuevo, aparece solo como filtro) |
   | `fecha` | Sí | `AAAA-MM-DD`. El blog se ordena del más nuevo al más antiguo y el más nuevo queda destacado |
   | `extracto` | Sí | Una o dos frases de resumen |
   | `imagen` | No | Nombre del archivo en `assets/img/blog/` (JPG horizontal, idealmente 1600 px de ancho) |
   | `alt` | No | Descripción de la foto, para accesibilidad y Google |
   | `lectura` | No | Minutos de lectura; si no se pone, se calcula solo |
   | `portada`, `palabra` | No | Si no hay foto: color de la portada ilustrada (`deep`, `mint`, `white`, `emerald`) y la palabra grande que muestra |
   | `servicio` | No | Servicio que recomienda el recuadro lateral (`convenio-especial-tgr`, `desbloqueo-sii`, `prescripcion-tributaria`, `liquidacion-y-reestructuracion`); si no se pone, se elige según el tema |

3. Escribe el texto debajo: `## Subtítulo`, párrafos separados por una línea en blanco, listas con `- `, citas con `> `, `**negrita**`, `*cursiva*` y `[enlace](https://...)`.
4. Ejecuta `node scripts/build-blog.mjs` para revisar en local (avisa si falta un dato o la foto no existe). En Netlify se ejecuta solo al publicar.
5. Sube los cambios a GitHub: Netlify publica el artículo en uno o dos minutos.

`js/posts.js` se genera automáticamente: no se edita a mano.
