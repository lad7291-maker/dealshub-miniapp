#!/usr/bin/env node
/**
 * Fix critical blockers for v2 migration.
 * Run after: npm run build
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.resolve(__dirname, '..', 'dist');
const V1_DIR = '/var/www/dealshub-miniapp';

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getAssetFiles() {
  const assetsDir = path.join(DIST_DIR, 'assets');
  const files = fs.readdirSync(assetsDir);
  const jsFile = files.find((f) => f.endsWith('.js') && f.startsWith('index'));
  const cssFile = files.find((f) => f.endsWith('.css') && f.startsWith('index'));
  return { jsFile, cssFile };
}

// ─── BLOCKER 1: index.html SEO ───
function fixIndexSEO() {
  const indexPath = path.join(DIST_DIR, 'index.html');
  let html = fs.readFileSync(indexPath, 'utf-8');

  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        name: 'SmartSkidka.ru',
        url: 'https://smart-skidka.ru/',
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://smart-skidka.ru/?search={search_term_string}',
          },
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'Organization',
        name: 'SmartSkidka.ru',
        url: 'https://smart-skidka.ru/',
        logo: 'https://smart-skidka.ru/icons/icon-512x512.png',
        sameAs: ['https://t.me/SmartRuMarket'],
      },
    ],
  });

  const seoInject = `
  <meta name="description" content="SmartSkidka.ru — скидки и купоны на AliExpress. Ежедневно обновляем каталог товаров со скидками до 84%. Актуальные предложения на основе данных AliExpress." />
  <meta name="keywords" content="скидки AliExpress, купоны AliExpress, промокоды, скидки, распродажа, кэшбэк" />
  <link rel="canonical" href="https://smart-skidka.ru/" />
  <meta property="og:title" content="SmartSkidka.ru — скидки на AliExpress до 84%" />
  <meta property="og:description" content="Скидки и купоны AliExpress. Актуальные предложения со скидками до 84%." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://smart-skidka.ru/" />
  <meta property="og:site_name" content="SmartSkidka.ru" />
  <meta property="og:image" content="https://smart-skidka.ru/icons/icon-512x512.png" />
  <meta property="og:locale" content="ru_RU" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="SmartSkidka.ru — скидки на AliExpress до 84%" />
  <meta name="twitter:description" content="Скидки и купоны AliExpress. Актуальные предложения." />
  <meta name="twitter:image" content="https://smart-skidka.ru/icons/icon-512x512.png" />
  <script type="application/ld+json">${jsonLd}</script>
`;

  html = html.replace(
    /<title>.*<\/title>/,
    '<title>SmartSkidka.ru — скидки на AliExpress до 84%</title>'
  );
  html = html.replace('</head>', `${seoInject}</head>`);

  fs.writeFileSync(indexPath, html, 'utf-8');
  console.log('✅ Blocker 1 fixed: index.html SEO');
}

// ─── BLOCKER 2 & 3: Privacy + Terms ───
function generateLegalPage(title, content, slug, assets) {
  const js = assets.jsFile
    ? `<script type="module" crossorigin src="/assets/${assets.jsFile}"></script>`
    : '';
  const css = assets.cssFile
    ? `<link rel="stylesheet" crossorigin href="/assets/${assets.cssFile}">`
    : '';
  const html = `<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="robots" content="index, follow">
<meta name="description" content="${escapeHtml(title)} — SmartSkidka.ru">
<title>${escapeHtml(title)} — SmartSkidka.ru</title>
<link rel="canonical" href="https://smart-skidka.ru/${slug}.html" />
${js}
${css}
</head>
<body>
<div id="root"></div>
<div style="max-width:800px;margin:40px auto;padding:20px;font-family:sans-serif;line-height:1.6">
<h1>${escapeHtml(title)}</h1>
${content}
</div>
</body>
</html>`;
  return html;
}

function fixPrivacyTerms() {
  const assets = getAssetFiles();
  const privacy = generateLegalPage(
    'Политика конфиденциальности',
    '<p>SmartSkidka.ru соблюдает политику конфиденциальности. Мы не собираем персональные данные без согласия.</p>',
    'privacy',
    assets
  );
  const terms = generateLegalPage(
    'Пользовательское соглашение',
    '<p>Используя SmartSkidka.ru, вы соглашаетесь с нашими условиями использования.</p>',
    'terms',
    assets
  );
  fs.writeFileSync(path.join(DIST_DIR, 'privacy.html'), privacy, 'utf-8');
  fs.writeFileSync(path.join(DIST_DIR, 'terms.html'), terms, 'utf-8');
  console.log('✅ Blocker 2 & 3 fixed: privacy.html + terms.html');
}

// ─── BLOCKER 4: SPA fallback pages ───
function fixSpaFallbacks() {
  const assets = getAssetFiles();
  const js = assets.jsFile
    ? `<script type="module" crossorigin src="/assets/${assets.jsFile}"></script>`
    : '';
  const css = assets.cssFile
    ? `<link rel="stylesheet" crossorigin href="/assets/${assets.cssFile}">`
    : '';

  const pages = [
    { slug: 'promo', title: 'Промокоды AliExpress' },
    { slug: 'blog', title: 'Блог SmartSkidka' },
    { slug: 'favorites', title: 'Избранные товары' },
    { slug: 'ai-search', title: 'AI Поиск' },
  ];

  for (const page of pages) {
    const dir = path.join(DIST_DIR, page.slug);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    const html = `<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="${page.title} — SmartSkidka.ru">
<title>${page.title} — SmartSkidka.ru</title>
${js}
${css}
</head>
<body>
<div id="root"></div>
<div style="text-align:center;padding:40px"><h1>Загрузка...</h1><p>${page.title}</p></div>
</body>
</html>`;
    fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf-8');
  }
  console.log('✅ Blocker 4 fixed: SPA fallback pages');
}

// ─── BLOCKER 5: 404.html ───
function fix404() {
  const html = `<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="refresh" content="3;url=/">
<title>Страница не найдена — SmartSkidka.ru</title>
</head>
<body style="text-align:center;padding:40px;font-family:sans-serif">
<h1>404 — Страница не найдена</h1>
<p>Вы будете перенаправлены на главную через 3 секунды...</p>
<a href="/">На главную</a>
</body>
</html>`;
  fs.writeFileSync(path.join(DIST_DIR, '404.html'), html, 'utf-8');
  console.log('✅ Blocker 5 fixed: 404.html');
}

// ─── BLOCKER 6: favicon.ico ───
function copyFavicon() {
  const src = path.join(V1_DIR, 'favicon.ico');
  const dst = path.join(DIST_DIR, 'favicon.ico');
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dst);
    console.log('✅ Blocker 6 fixed: favicon.ico copied');
  } else {
    console.log('⚠️ favicon.ico not found in V1');
  }
}

// ─── BLOCKER 7: Clean sitemap ───
function fixSitemap() {
  const sitemapPath = path.join(DIST_DIR, 'sitemap.xml');
  if (!fs.existsSync(sitemapPath)) return;
  let xml = fs.readFileSync(sitemapPath, 'utf-8');
  // Remove dead URLs
  xml = xml.replace(
    /<url>\s*<loc>https:\/\/smart-skidka\.ru\/(about|contact|jewelry|sports|toys)(\.html)?<\/loc>.*?<\/url>/gs,
    ''
  );
  xml = xml.replace(/<url>\s*<loc>https:\/\/smart-skidka\.ru\/blog\/.*?<\/loc>.*?<\/url>/gs, '');
  fs.writeFileSync(sitemapPath, xml, 'utf-8');
  console.log('✅ Blocker 7 fixed: sitemap.xml cleaned');
}

// ─── MAIN ───
console.log('=== Fixing critical blockers for v2 ===');
const assets = getAssetFiles();
console.log(`Assets found: JS=${assets.jsFile}, CSS=${assets.cssFile}`);

fixIndexSEO();
fixPrivacyTerms();
fixSpaFallbacks();
fix404();
copyFavicon();
fixSitemap();

console.log('\n=== All blockers fixed ===');
const files = fs.readdirSync(DIST_DIR);
console.log(
  'HTML files:',
  files.filter((f) => f.endsWith('.html') || f.includes('/index.html'))
);
