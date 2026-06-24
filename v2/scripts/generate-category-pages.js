#!/usr/bin/env node
/**
 * Generate static category pages /{category}.html for v2 after build.
 * Reads v2/dist/index.html, v2/public/products.json, v2/public/categories.json.
 * Run: node scripts/generate-category-pages.js
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.resolve(__dirname, '..', 'dist');
const PRODUCTS_FILE = path.resolve(__dirname, '..', 'public', 'products.json');
const CATEGORIES_FILE = path.resolve(__dirname, '..', 'public', 'categories.json');

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatPrice(price) {
  return Number(price).toLocaleString('ru-RU');
}

function generateCategoryJsonLd(category, products) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: category.seoTitle || `Скидки на ${category.name}`,
    itemListElement: products.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Product',
        name: p.title,
        image: p.image,
        sku: p.itemId || String(p.id),
        offers: {
          '@type': 'Offer',
          price: String(p.price),
          priceCurrency: 'RUB',
          availability: 'https://schema.org/InStock',
        },
      },
    })),
  };
}

function generateCategoryHtml(category, products, indexHtml) {
  const slug = category.slug || category.id;
  const title =
    category.seoTitle ||
    `Скидки AliExpress на ${category.name} — лучшие предложения | SmartSkidka.ru`;
  const description =
    category.seoDescription ||
    `Лучшие скидки на ${category.name} с AliExpress. Реальные скидки, проверенные отзывы.`;
  const canonical = `https://smart-skidka.ru/${slug}.html`;

  const catProducts = products.filter((p) => p.category === slug).slice(0, 24);
  const jsonLd = generateCategoryJsonLd(category, catProducts);

  const productCards = catProducts
    .map((p) => {
      const itemId = p.itemId || String(p.id);
      return `
    <article class="product-card" data-item-id="${escapeHtml(itemId)}">
      <a href="/item/${escapeHtml(itemId)}.html">
        <img src="${escapeHtml(p.image)}" alt="${escapeHtml(p.title)}" width="200" height="200" loading="lazy" />
        <h3>${escapeHtml(p.title)}</h3>
      </a>
      <p class="price">${formatPrice(p.price)} ₽</p>
      ${p.oldPrice > p.price ? `<p class="old-price"><s>${formatPrice(p.oldPrice)} ₽</s></p>` : ''}
      <p class="discount">Скидка ${p.discount}%</p>
      <p class="rating">★ ${p.rating}</p>
    </article>`;
    })
    .join('\n');

  const ssrContent = `
    <article class="category-ssr" data-category="${escapeHtml(slug)}">
      <header>
        <nav><a href="/">← SmartSkidka.ru</a></nav>
        <h1>${escapeHtml(category.name)} — лучшие скидки на AliExpress</h1>
        <p>${escapeHtml(description)}</p>
      </header>
      <section class="product-grid">
        ${productCards}
      </section>
    </article>
  `;

  const headInject = `
  <meta name="description" content="${escapeHtml(description)}" />
  <link rel="canonical" href="${canonical}" />
  <meta property="og:title" content="${escapeHtml(title)}" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:site_name" content="SmartSkidka.ru" />
  <meta property="og:locale" content="ru_RU" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(title)}" />
  <meta name="twitter:description" content="${escapeHtml(description)}" />
  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
  <script>window.__CATEGORY_SLUG__ = ${JSON.stringify(slug)};</script>
`;

  let html = indexHtml
    .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
    .replace('</head>', `${headInject}\n</head>`)
    .replace('<div id="root"></div>', `<div id="root">${ssrContent}</div>`);

  return html;
}

function main() {
  if (!fs.existsSync(PRODUCTS_FILE)) {
    console.error(`❌ products.json not found at ${PRODUCTS_FILE}`);
    process.exit(1);
  }
  if (!fs.existsSync(CATEGORIES_FILE)) {
    console.error(`❌ categories.json not found at ${CATEGORIES_FILE}`);
    process.exit(1);
  }
  const indexHtmlPath = path.join(DIST_DIR, 'index.html');
  if (!fs.existsSync(indexHtmlPath)) {
    console.error(`❌ dist/index.html not found. Run vite build first.`);
    process.exit(1);
  }

  const products = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf-8'));
  const categories = JSON.parse(fs.readFileSync(CATEGORIES_FILE, 'utf-8'));
  const indexHtml = fs.readFileSync(indexHtmlPath, 'utf-8');

  let generated = 0;
  for (const category of categories) {
    if (category.id === 'all') continue;
    const html = generateCategoryHtml(category, products, indexHtml);
    const slug = category.slug || category.id;
    fs.writeFileSync(path.join(DIST_DIR, `${slug}.html`), html, 'utf-8');
    generated++;
  }

  console.log(
    `✅ Generated ${generated} category pages in ${path.relative(process.cwd(), DIST_DIR)}`
  );
}

main();
