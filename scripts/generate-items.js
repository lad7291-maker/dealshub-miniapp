#!/usr/bin/env node
/**
 * SmartSkidka.ru — Generate item/ HTML pages with breadcrumbs and related products
 */

const fs = require('fs');
const path = require('path');

const PRODUCTS_FILE = path.join(__dirname, '..', 'products', 'all.json');
const ITEM_DIR = path.join(__dirname, '..', 'item');

const CATEGORY_NAMES = {
  shoes: 'Обувь',
  clothing: 'Одежда',
  electronics: 'Электроника',
  home: 'Товары для дома',
  auto: 'Автотовары',
  beauty: 'Красота',
  sports: 'Спорт',
  jewelry: 'Украшения',
  toys: 'Игрушки'
};

function escapeHtml(text) {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function formatPrice(price) {
  return price.toLocaleString('ru-RU');
}

function generateRelatedProducts(product, allProducts, limit = 8) {
  const related = allProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .sort(() => Math.random() - 0.5)
    .slice(0, limit);
  
  if (related.length === 0) return '';
  
  const cards = related.map(p => `
        <a href="/item/${p.id}.html" class="related-card">
          <img src="${escapeHtml(p.image)}" alt="${escapeHtml(p.title)}" loading="lazy">
          <span class="related-discount">-${p.discount}%</span>
          <span class="related-price">${formatPrice(p.price)} ₽</span>
        </a>`).join('');
  
  return `
    <section class="item-related">
      <h2>Похожие товары</h2>
      <div class="related-grid">
        ${cards}
      </div>
    </section>`;
}

function generateItemHtml(product, allProducts) {
  const catName = CATEGORY_NAMES[product.category] || product.category;
  const catSlug = product.category;
  const savings = product.originalPrice - product.price;
  const tagsHtml = product.tags && product.tags.length > 0 
    ? product.tags.join(', ') 
    : '';
  
  const breadcrumbJson = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Главная", "item": "https://smart-skidka.ru/" },
      { "@type": "ListItem", "position": 2, "name": catName, "item": `https://smart-skidka.ru/${catSlug}.html` },
      { "@type": "ListItem", "position": 3, "name": product.title }
    ]
  });

  const relatedSection = generateRelatedProducts(product, allProducts);

  return `<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="${escapeHtml(product.title)} — скидка ${product.discount}% на AliExpress. Цена ${formatPrice(product.price)} ₽ вместо ${formatPrice(product.originalPrice)} ₽.">
    <meta name="theme-color" content="#0a0a0f">
    <meta property="og:title" content="${escapeHtml(product.title)} — скидка ${product.discount}%">
    <meta property="og:description" content="${formatPrice(product.price)} ₽ вместо ${formatPrice(product.originalPrice)} ₽. Рейтинг ${product.rating}⭐ (${product.orders} заказов).">
    <meta property="og:image" content="${escapeHtml(product.image)}">
    <meta property="og:type" content="product">
    <meta property="og:price:amount" content="${product.price}">
    <meta property="og:price:currency" content="RUB">
    <script type="application/ld+json">{"@context": "https://schema.org", "@type": "Product", "name": "${escapeHtml(product.title)}", "image": "${escapeHtml(product.image)}", "offers": {"@type": "Offer", "price": "${product.price}", "priceCurrency": "RUB", "availability": "https://schema.org/InStock", "url": "https://smart-skidka.ru/item/${product.itemId || product.id}.html"}, "aggregateRating": {"@type": "AggregateRating", "ratingValue": "${product.rating}", "reviewCount": "${product.orders}"}}</script>
    <script type="application/ld+json">${breadcrumbJson}</script>
    <title>${escapeHtml(product.title)} — ${formatPrice(product.price)} ₽ | SmartSkidka</title>
    <link rel="canonical" href="https://smart-skidka.ru/item/${product.itemId || product.id}.html">
    <link rel="icon" type="image/png" href="/icons/icon-72x72.png">
    <link rel="stylesheet" href="/css/style.css">
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-VG8VX6F69T"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-VG8VX6F69T');
    </script>
</head>
<body>
    <div class="item-page">
        <header class="item-header">
            <a href="/" class="logo-link">
                <span class="logo-brand">SmartSkidka</span><span class="logo-domain">.ru</span>
            </a>
        </header>
        
        <nav class="breadcrumb" aria-label="breadcrumb">
            <ol itemscope itemtype="https://schema.org/BreadcrumbList">
                <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
                    <a itemprop="item" href="/"><span itemprop="name">Главная</span></a>
                    <meta itemprop="position" content="1" />
                </li>
                <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
                    <a itemprop="item" href="/${catSlug}.html"><span itemprop="name">${catName}</span></a>
                    <meta itemprop="position" content="2" />
                </li>
                <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
                    <span itemprop="name">${escapeHtml(product.title.substring(0, 50))}...</span>
                    <meta itemprop="position" content="3" />
                </li>
            </ol>
        </nav>
        
        <main class="item-main">
            <div class="item-gallery">
                <img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.title)}" loading="eager" onerror="this.src='/icons/icon-192x192.png'">
            </div>
            <div class="item-info">
                <span class="item-discount-badge">-${product.discount}%</span>
                <h1 class="item-title">${escapeHtml(product.title)}</h1>
                <div class="item-meta">
                    <span class="item-rating">${product.rating} ★</span>
                    <span class="item-orders">${product.orders} заказов</span>
                    <span class="item-category">${catName}</span>
                </div>
                <div class="item-price-block">
                    <span class="item-current">${formatPrice(product.price)} ₽</span>
                    <span class="item-original">${formatPrice(product.originalPrice)} ₽</span>
                    <span class="item-save">Экономия ${formatPrice(savings)} ₽</span>
                </div>
                ${tagsHtml ? `<div class="item-tags">${escapeHtml(tagsHtml)}</div>` : ''}
                <div class="item-shipping">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    Бесплатная доставка из Китая — 15-30 дней
                </div>
                <div class="item-actions">
                    <a href="${product.aliLink}" id="buy-btn" class="item-buy-btn" target="_blank" rel="noopener"
                       onclick="if(typeof gtag==='function')gtag('event','purchase',{item_id:'${product.id}',value:${product.price},currency:'RUB'});if(typeof ym==='function')ym(109145874,'reachGoal','purchase');">
                        Купить на AliExpress
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                    </a>
                    <p class="affiliate-note"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; margin-right: 4px;"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2v1"/><path d="M12 7a5 5 0 0 1 5 5c0 2.5-2 4.5-5 6-3-1.5-5-3.5-5-6a5 5 0 0 1 5-5z"/></svg>Партнёрская ссылка. Цена для вас не меняется — мы получаем небольшую комиссию от AliExpress.</p>
                    <a href="/" class="item-back-btn">← Все скидки</a>
                </div>
            </div>
        </main>
        
        <section class="item-description">
            <h2>Описание</h2>
            <p>${escapeHtml(product.title)} — товар со скидкой ${product.discount}% на AliExpress. Рейтинг ${product.rating}⭐, ${product.orders} заказов. Бесплатная доставка.</p>
        </section>
        
        <section class="item-specs">
            <h2>Характеристики</h2>
            <dl>
                ${Object.entries(product.specs || {}).map(([key, val]) => `<dt>${escapeHtml(key)}</dt><dd>${escapeHtml(val)}</dd>`).join('\n                ')}
            </dl>
        </section>
        
        ${relatedSection}
        
        <footer class="item-footer">
            <p>SmartSkidka.ru — партнёрские ссылки AliExpress. Цены актуальны на момент публикации.</p>
        </footer>
    </div>
    <script src="/js/deeplink.js"></script>
    <script>
        (function() {
            var btn = document.getElementById('buy-btn');
            if (btn && typeof generateDeeplink === 'function' && '${product.itemId || ''}') {
                btn.href = generateDeeplink('${product.itemId || ''}', '${(product.aliLink || '').replace(/'/g, "\\'")}', '${product.category}');
            }
        })();
    </script>
</body>
</html>`;
}

function main() {
  console.log('[Items] Loading products...');
  const allProducts = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf8'));
  console.log(`[Items] Loaded ${allProducts.length} products`);

  if (!fs.existsSync(ITEM_DIR)) {
    fs.mkdirSync(ITEM_DIR, { recursive: true });
  }

  let count = 0;
  for (const product of allProducts) {
    const html = generateItemHtml(product, allProducts);
    const filePath = path.join(ITEM_DIR, `${product.itemId || product.id}.html`);
    fs.writeFileSync(filePath, html, 'utf8');
    count++;
    if (count % 100 === 0) {
      console.log(`[Items] Generated ${count} pages...`);
    }
  }

  console.log(`[Items] Done! Generated ${count} item pages in ${ITEM_DIR}`);
}

main();
