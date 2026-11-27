#!/usr/bin/env node
/**
 * Genera js/posts.js a partir de los artículos en content/blog/*.md
 *
 * Uso:   node scripts/build-blog.mjs
 * Netlify lo ejecuta solo en cada publicación (ver netlify.toml).
 * No necesita dependencias: solo Node 18 o superior.
 *
 * Los archivos que empiezan con "_" (por ejemplo _plantilla.md) se ignoran.
 */
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, 'content', 'blog');
const IMG = join(ROOT, 'assets', 'img', 'blog');
const OUT = join(ROOT, 'js', 'posts.js');

const MONTHS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sept', 'oct', 'nov', 'dic'];
const COVERS = ['deep', 'mint', 'white', 'emerald'];
const errors = [];

const escapeHtml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// **negrita**, *cursiva* y [enlace](https://...)
function inline(text) {
  let s = escapeHtml(text.trim());
  s = s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/(^|[^*])\*([^*\s][^*]*?)\*(?!\*)/g, '$1<em>$2</em>');
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (m, label, url) => {
    if (/^https?:\/\//.test(url)) return `<a href="${url.replace(/"/g, '%22')}" target="_blank" rel="noopener noreferrer">${label}</a>`;
    if (/^#[a-z0-9-]+$/.test(url)) return `<a href="${url}">${label}</a>`;
    return label; // enlaces de otro tipo se descartan por seguridad
  });
  return s;
}

function parseFrontMatter(raw, file) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) { errors.push(`${file}: falta el bloque de datos entre líneas ---`); return null; }
  const data = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^([a-záéíóúñ]+):\s*(.*)$/i);
    if (kv) data[kv[1].toLowerCase()] = kv[2].trim().replace(/^["']|["']$/g, '');
  }
  return { data, body: m[2] };
}

function parseBody(md) {
  const blocks = [];
  const lines = md.replace(/\r/g, '').split('\n');
  let para = [], list = null;
  const flush = () => {
    if (para.length) { blocks.push(['p', inline(para.join(' '))]); para = []; }
    if (list) { blocks.push(['ul', list.map(inline)]); list = null; }
  };
  for (const line of lines) {
    const t = line.trim();
    if (!t) { flush(); continue; }
    let m;
    if ((m = t.match(/^#{2,3}\s+(.*)$/))) { flush(); blocks.push(['h2', inline(m[1])]); continue; }
    if ((m = t.match(/^[-*]\s+(.*)$/))) { if (para.length) { blocks.push(['p', inline(para.join(' '))]); para = []; } (list = list || []).push(m[1]); continue; }
    if ((m = t.match(/^>\s?(.*)$/))) { flush(); blocks.push(['blockquote', inline(m[1])]); continue; }
    if (list) { blocks.push(['ul', list.map(inline)]); list = null; }
    para.push(t);
  }
  flush();
  return blocks;
}

function formatDate(iso, file) {
  const m = iso && iso.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) { errors.push(`${file}: "fecha" debe tener el formato AAAA-MM-DD`); return iso || ''; }
  return `${+m[3]} ${MONTHS[+m[2] - 1]} ${m[1]}`;
}

const files = existsSync(SRC) ? readdirSync(SRC).filter((f) => f.endsWith('.md') && !f.startsWith('_')) : [];
const posts = [];
for (const file of files) {
  const parsed = parseFrontMatter(readFileSync(join(SRC, file), 'utf8'), file);
  if (!parsed) continue;
  const d = parsed.data;
  const slug = (d.slug || file.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, '')).toLowerCase();
  if (!/^[a-z0-9-]+$/.test(slug)) errors.push(`${file}: el slug solo puede tener letras minúsculas sin tilde, números y guiones`);
  for (const k of ['titulo', 'tema', 'fecha', 'extracto']) if (!d[k]) errors.push(`${file}: falta "${k}"`);
  if (d.imagen && !existsSync(join(IMG, d.imagen))) errors.push(`${file}: no existe la imagen assets/img/blog/${d.imagen}`);
  const body = parseBody(parsed.body);
  const words = parsed.body.split(/\s+/).filter(Boolean).length;
  posts.push({
    slug,
    topic: d.tema,
    iso: d.fecha,
    date: formatDate(d.fecha, file),
    min: +d.lectura || Math.max(2, Math.round(words / 200)),
    cover: COVERS.includes(d.portada) ? d.portada : 'deep',
    big: d.palabra || d.tema,
    img: d.imagen ? 'assets/img/blog/' + d.imagen : '',
    alt: d.alt || '',
    service: d.servicio || '',
    sample: d.muestra === 'si',
    title: d.titulo,
    excerpt: d.extracto,
    body
  });
}

const slugs = new Set();
for (const p of posts) { if (slugs.has(p.slug)) errors.push(`slug repetido: ${p.slug}`); slugs.add(p.slug); }

if (errors.length) {
  console.error('\nNo se generó el blog. Revisa:\n - ' + errors.join('\n - ') + '\n');
  process.exit(1);
}

posts.sort((a, b) => (a.iso < b.iso ? 1 : a.iso > b.iso ? -1 : 0));
posts.forEach((p) => delete p.iso);

const out = '/* Archivo generado por scripts/build-blog.mjs a partir de content/blog/*.md. No editar a mano. */\n' +
  'window.TRIBUTARIUM_POSTS = ' + JSON.stringify(posts, null, 2) + ';\n';
writeFileSync(OUT, out);
console.log(`Blog generado: ${posts.length} artículos → js/posts.js`);
