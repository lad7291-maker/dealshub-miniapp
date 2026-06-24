#!/usr/bin/env node
/**
 * Generate static /item/{itemId}.html pages for v2 after build.
 * Reads v2/dist/index.html and v2/public/products.json.
 * Run: node scripts/generate-product-pages.js
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.resolve(__dirname, '..', 'dist');
const PRODUCTS_FILE = path.resolve(__dirname, '..', 'public', 'products.json');
const ITEM_DIR = path.join(DIST_DIR, 'item');

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

function generateJsonLd(product, canonical) {
  const offer = {
    '@type': 'Offer',
    url: canonical,
    priceCurrency: 'RUB',
    price: String(product.price),
    availability: 'https://schema.org/InStock',
    itemCondition: 'https://schema.org/NewCondition',
    priceValidUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  };

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    image: product.image,
    description: product.subtitle || product.title,
    sku: product.itemId,
    offers: offer,
  };

  if (product.rating > 0) {
    ld.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: String(product.rating),
      reviewCount: String(product.orders || 1),
    };
  }

  return ld;
}

function generateProductHtml(product, indexHtml) {
  const itemId = product.itemId || String(product.id);
  const title =
    product.title.length > 35
      ? `${product.title.substring(0, 35)}… — скидка ${product.discount}% | SmartSkidka.ru`
      : `${product.title} — скидка ${product.discount}% | SmartSkidka.ru`;
  const description =
    product.subtitle ||
    `Скидка ${product.discount}% на ${product.title}. Цена ${formatPrice(product.price)} ₽ на AliExpress.`;
  const canonical = `https://smart-skidka.ru/item/${itemId}.html`;
  const jsonLd = generateJsonLd(product, canonical);

  const ssrContent = `
    <article class="product-ssr" data-item-id="${escapeHtml(itemId)}">
      <header>
        <nav><a href="/">← SmartSkidka.ru</a></nav>
        <h1>${escapeHtml(product.title)}</h1>
      </header>
      <figure>
        <img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.title)}" width="400" height="400" loading="eager" />
      </figure>
      <section>
        <p class="price">Цена: <strong>${formatPrice(product.price)} ₽</strong></p>
        ${product.oldPrice > product.price ? `<p class="old-price">Старая цена: <s>${formatPrice(product.oldPrice)} ₽</s></p>` : ''}
        <p class="discount">Экономия: <strong>${product.discount}%</strong></p>
        <p class="rating">Рейтинг: ${product.rating} ★</p>
        <p class="orders">Заказов: ${product.orders}</p>
        <p><a class="buy-link" href="${escapeHtml(product.affiliateLink || product.aliLink || '')}" target="_blank" rel="nofollow noopener">Купить на AliExpress</a></p>
      </section>
    </article>
  `;

  const headInject = `
  <meta name="description" content="${escapeHtml(description)}" />
  <meta name="keywords" content="${escapeHtml(product.tags.join(', '))}" />
  <link rel="canonical" href="${canonical}" />
  <meta property="og:title" content="${escapeHtml(title)}" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta property="og:type" content="product" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:site_name" content="SmartSkidka.ru" />
  <meta property="og:image" content="${escapeHtml(product.image)}" />
  <meta property="og:locale" content="ru_RU" />
  <meta property="product:price:amount" content="${String(product.price)}" />
  <meta property="product:price:currency" content="RUB" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(title)}" />
  <meta name="twitter:description" content="${escapeHtml(description)}" />
  <meta name="twitter:image" content="${escapeHtml(product.image)}" />
  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
  <script>window.__PRODUCT_ITEM_ID__ = ${JSON.stringify(itemId)};</script>
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
  const indexHtmlPath = path.join(DIST_DIR, 'index.html');
  if (!fs.existsSync(indexHtmlPath)) {
    console.error(`❌ dist/index.html not found. Run vite build first.`);
    process.exit(1);
  }

  const products = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf-8'));
  const indexHtml = fs.readFileSync(indexHtmlPath, 'utf-8');

  fs.mkdirSync(ITEM_DIR, { recursive: true });

  let generated = 0;
  for (const product of products) {
    const itemId = product.itemId || String(product.id);
    const html = generateProductHtml(product, indexHtml);
    fs.writeFileSync(path.join(ITEM_DIR, `${itemId}.html`), html, 'utf-8');
    generated++;
  }

  console.log(
    `✅ Generated ${generated} product pages in ${path.relative(process.cwd(), ITEM_DIR)}`
  );
}

main();
