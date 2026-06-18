# SmartSkidka.ru — Структурированный бэклог задач

> На основе комплексного аудита от 14.05.2026

---

## 1. Бэклог задач по категориям

### 1.1 Technical & PWA

| ID | Описание | Тип | Приоритет | Сложность | Связь с аудитом |
|----|----------|-----|-----------|-----------|-----------------|
| TECH-001 | Убрать `cache: 'no-store'` и `?v=Date.now()` из `products-loader.js` | bug | **CRITICAL** | Easy | Тех. аудит, проблема #2 |
| TECH-002 | Настроить nginx: `Cache-Control: public, max-age=3600` для `products/*.json` | config | **CRITICAL** | Easy | Тех. аудит, проблема #1 |
| TECH-003 | Включить gzip/brotli для HTML в nginx | config | HIGH | Easy | Тех. аудит, проблема #4 |
| TECH-004 | Добавить `loading="lazy"` на все `<img>` в карточках товаров | feature | HIGH | Easy | Тех. аудит, проблема #6 |
| TECH-005 | Вернуть Service Worker с кэшированием статики (Cache-First для CSS/JS/JSON) | feature | HIGH | Hard | Тех. аудит, проблема #3 |
| TECH-006 | Добавить `fetchpriority="high"` для hero-изображения | feature | LOW | Easy | Тех. аудит, проблема #7 |
| TECH-007 | Разбить `products.js` на чанки по категориям (lazy-load) | refactor | MEDIUM | Medium | Тех. аудит, проблема #5 |

### 1.2 SEO & Information Architecture

| ID | Описание | Тип | Приоритет | Сложность | Связь с аудитом |
|----|----------|-----|-----------|-----------|-----------------|
| SEO-001 | Создать страницы категорий: `/electronics.html`, `/clothing.html`, `/home.html`, `/auto.html`, `/beauty.html`, `/jewelry.html`, `/sports.html`, `/toys.html` | feature | **CRITICAL** | Medium | SEO аудит, проблема #1 |
| SEO-002 | Добавить breadcrumb-навигацию на `item/` страницы + `BreadcrumbList` в Schema.org | feature | HIGH | Medium | SEO аудит, проблема #2 |
| SEO-003 | Добавить h2/h3 на `item/` страницы ("Описание", "Характеристики", "Похожие товары") | feature | MEDIUM | Easy | SEO аудит, проблема #4 |
| SEO-004 | Переместить SEO-блок выше (перед футером, после товаров) | refactor | MEDIUM | Easy | SEO аудит, проблема #5 |
| SEO-005 | Добавить блок "Похожие товары" на `item/` с 4-8 ссылками | feature | HIGH | Medium | SEO аудит, проблема #6 |
| SEO-006 | Создать 3-5 информационных статей (/blog/ или /guides/) для long-tail SEO | feature | MEDIUM | Hard | SEO аудит, проблема #8 |
| SEO-007 | Добавить `og:locale: ru_RU` и `og:site_name: SmartSkidka.ru` | feature | LOW | Easy | SEO аудит, проблема #7 |
| SEO-008 | Обновить sitemap.xml: добавить категориальные страницы | feature | MEDIUM | Easy | SEO аудит, проблема #10 |

### 1.3 UX/UI & Conversion (CRO)

| ID | Описание | Тип | Приоритет | Сложность | Связь с аудитом |
|----|----------|-----|-----------|-----------|-----------------|
| UX-001 | Переименовать "В корзину" → "На AliExpress" во всех шаблонах | bug | **CRITICAL** | Easy | CRO аудит, проблема #1 |
| UX-002 | Добавить микротекст под кнопкой: "Партнёрская ссылка. Цена для вас не меняется." | feature | **CRITICAL** | Easy | CRO аудит, проблема #2 |
| UX-003 | Исправить/включить category tabs на главной (убрать `return;` в `initCategories`) | bug | HIGH | Easy | CRO аудит, проблема #3 |
| UX-004 | Добавить видимую ссылку на Telegram-канал @SmartRuMarket в шапку/футер | feature | HIGH | Easy | CRO аудит, проблема #6 |
| UX-005 | Добавить таймер "⏰ Скидка действует ещё X часов" (рандомизированный, 12-48ч) | feature | MEDIUM | Easy | CRO аудит, проблема #4 |
| UX-006 | Добавить social proof: "🔥 X человек смотрят этот товар" (рандом 15-200) | feature | MEDIUM | Easy | CRO аудит, проблема #5 |
| UX-007 | Добавить sticky bottom bar на мобильном с CTA "Купить на AliExpress" | feature | MEDIUM | Medium | CRO аудит, проблема #8 |
| UX-008 | Добавить кнопку "Поделиться" для товаров (Web Share API) | feature | LOW | Easy | CRO аудит, проблема #9 |

### 1.4 Analytics & Experiments

| ID | Описание | Тип | Приоритет | Сложность | Связь с аудитом |
|----|----------|-----|-----------|-----------|-----------------|
| ANA-001 | Добавить `gtag('event', 'search', {search_term: query})` при поиске | feature | **CRITICAL** | Easy | Аналитика, проблема #1 |
| ANA-002 | Добавить `gtag('event', 'select_content', {content_type: 'filter', item_id: ...})` | feature | HIGH | Easy | Аналитика, проблема #2 |
| ANA-003 | Добавить `gtag('event', 'select_content', {content_type: 'sort', item_id: ...})` | feature | HIGH | Easy | Аналитика, проблема #2 |
| ANA-004 | Добавить события скролла: `scroll_25`, `scroll_50`, `scroll_75`, `scroll_90` | feature | MEDIUM | Easy | Аналитика, проблема #5 |
| ANA-005 | Добавить `gtag('event', 'install_pwa')` при клике на install-btn | feature | MEDIUM | Easy | Аналитика, проблема #3 |
| ANA-006 | Добавить gtag на кнопку "Купить" в модальном окне (сейчас только на item/) | bug | HIGH | Easy | Аналитика, проблема #6 |
| ANA-007 | Добавить `gtag('event', 'ai_search', {search_term: query})` | feature | MEDIUM | Easy | Аналитика, проблема #8 |
| ANA-008 | Добавить `gtag('event', 'click_outbound', {item_id, value, currency})` для всех партнёрских ссылок | feature | HIGH | Easy | Аналитика, проблема #6 |

### 1.5 Security & Risk

| ID | Описание | Тип | Приоритет | Сложность | Связь с аудитом |
|----|----------|-----|-----------|-----------|-----------------|
| SEC-001 | Экранировать поисковый запрос перед вставкой в HTML (textContent вместо innerHTML) | bug | HIGH | Easy | Security, проблема #2 |
| SEC-002 | Добавить лимит избранного: max 100 товаров, FIFO при переполнении | feature | LOW | Easy | Security, проблема #3 |
| SEC-003 | Усилить rate limit AI-поиска: CAPTCHA после 3 запросов или IP-бан на 1ч | config | LOW | Medium | Security, проблема #4 |
| SEC-004 | Проверить и ужесточить CSP (убрать 'unsafe-inline' если возможно) | config | LOW | Hard | Security, проблема #1 |

### 1.6 Competitive Features (future)

| ID | Описание | Тип | Приоритет | Сложность | Связь с аудитом |
|----|----------|-----|-----------|-----------|-----------------|
| FTR-001 | История цен: график за 30 дней на item/ | feature | LOW | Hard | Конкуренты, идея #1 |
| FTR-002 | Telegram-бот для алертов о снижении цены | feature | LOW | Hard | Конкуренты, идея #2 |
| FTR-003 | Блок "🔥 Топ-10 за неделю" на главной | feature | LOW | Medium | Конкуренты, идея #3 |
| FTR-004 | Подборки/коллекции: "Скидки до 90% на электронику" | feature | LOW | Medium | Конкуренты, идея #9 |
| FTR-005 | Виджет "Недавно смотрели" (localStorage) | feature | LOW | Easy | Конкуренты, идея #10 |

---

## 2. Детализация ключевых CRITICAL/HIGH задач

### TECH-001 + TECH-002: Кеширование products/*.json

**Проблема:** Каждый запрос грузит 868KB заново. На мобильном 3G это 3-5 секунд лишнего ожидания.

**Цель (DoD):**
- `products-loader.js` не добавляет `?v=Date.now()`
- `fetch()` не использует `cache: 'no-store'`
- nginx отдаёт `Cache-Control: public, max-age=3600` для `products/*.json`
- При обновлении каталога меняется версия в URL (например, `all.json?v=20260514`)

**Подход:**
- **JS:** Убрать `cacheBuster` и `cache: 'no-store'`. Использовать `fetch(url)` без опций или `fetch(url, {cache: 'default'})`.
- **Nginx:** Добавить location-блок:
  ```nginx
  location ~ ^/products/.*\.json$ {
      add_header Cache-Control "public, max-age=3600";
      expires 1h;
  }
  ```
- **Версионирование:** При генерации нового каталога обновлять query-параметр в `index.html` (например, `products-loader.js?v=2` → `v=3`).

**Изменения по слоям:**
- `js/products-loader.js`: убрать строки 25-26 (`cacheBuster`, `cache: 'no-store'`)
- `nginx.conf`: добавить location для `/products/`

---

### TECH-005: Service Worker с кэшированием

**Проблема:** SW отключён — код очищает кэш и unregister при каждой загрузке. PWA install prompt бесполезен.

**Цель (DoD):**
- SW регистрируется и кэширует статику (CSS, JS, иконки)
- JSON-данные кэшируются с TTL 1 час
- При офлайне показывается кэшированная версия
- Код очистки кэша удалён

**Подход (Cache-First для статики, Network-First для данных):**
- Создать `sw.js` с двумя кэшами: `static-v1` (CSS/JS/иконки) и `data-v1` (JSON)
- Стратегия для статики: Cache-First (при install кэшируем всё, при fetch — отдаём из кэша)
- Стратегия для данных: Network-First с fallback на кэш (если офлайн — показываем старые данные)
- Убрать emergency cache clear из `index.html`

**Изменения по слоям:**
- `index.html`: удалить блок emergency cache clear (строки 70-93)
- `js/app.js`: добавить регистрацию SW (`navigator.serviceWorker.register('/sw.js')`)
- Создать `sw.js` (новый файл)

---

### SEO-001: Категориальные страницы

**Проблема:** Нет страниц `/electronics.html`, `/clothing.html` и т.д. — теряется трафик по категориям.

**Цель (DoD):**
- 8 категориальных страниц доступны по ЧПУ
- Каждая страница имеет уникальный title, h1, description
- Страницы добавлены в sitemap.xml
- Навигация между категориями работает

**Подход:**
- Генерировать статические HTML при сборке (Python-скриптом, как item/)
- Шаблон = `index.html` но с предустановленным фильтром по категории
- Или: создать единый `category.html` с JS-роутингом по `?cat=electronics` (но статика лучше для SEO)

**Структура URL:**
```
/electronics.html  → товары category=electronics
/clothing.html     → товары category=clothing
/home.html         → товары category=home
/auto.html         → товары category=auto
/beauty.html       → товары category=beauty
/jewelry.html      → товары category=jewelry
/sports.html       → товары category=sports
/toys.html         → товары category=toys
```

**Изменения по слоям:**
- Создать шаблон `templates/category.html` (на основе `index.html`)
- Python-скрипт: при генерации создавать 8 HTML-файлов
- `sitemap.xml`: добавить 8 URL категорий
- `index.html`: добавить ссылки на категории в навигацию

---

### SEO-002: Breadcrumbs + BreadcrumbList

**Проблема:** Нет навигационной цепочки на item/ страницах.

**Цель (DoD):**
- На каждой `item/` странице виден breadcrumb: Главная → [Категория] → Товар
- Schema.org `BreadcrumbList` в `<head>`

**HTML-структура:**
```html
<nav aria-label="breadcrumb" class="breadcrumb">
  <ol itemscope itemtype="https://schema.org/BreadcrumbList">
    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
      <a itemprop="item" href="/"><span itemprop="name">Главная</span></a>
      <meta itemprop="position" content="1" />
    </li>
    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
      <a itemprop="item" href="/electronics.html"><span itemprop="name">Электроника</span></a>
      <meta itemprop="position" content="2" />
    </li>
    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
      <span itemprop="name">Название товара</span>
      <meta itemprop="position" content="3" />
    </li>
  </ol>
</nav>
```

**Изменения по слоям:**
- Шаблон `item/XXX.html`: добавить breadcrumb после `<header>`
- Python-скрипт генерации: подставлять категорию и название товара

---

### UX-001 + UX-002: Кнопка "В корзину" → "На AliExpress"

**Проблема:** Пользователь думает, что добавляет в корзину нашего сайта, а его перебрасывает на AliExpress.

**Цель (DoD):**
- Во всех местах кнопка называется "На AliExpress" или "Купить со скидкой"
- Под кнопкой микротекст о партнёрской модели
- Все шаблоны обновлены (item/, модальное окно, избранное)

**Варианты текста кнопки:**
- A: "На AliExpress →"
- B: "Купить со скидкой"
- C: "Перейти к покупке"
- D: "Смотреть на AliExpress"

**Рекомендуемый вариант (A/B тест):**
- Основной: "Купить на AliExpress →" (понятно + доверие)
- Альтернатива: "Перейти к скидке →" (более мягкий CTA)

**Микротекст:**
```
💡 Партнёрская ссылка. Цена для вас не меняется — мы получаем небольшую комиссию от AliExpress.
```

**Изменения по слоям:**
- Шаблон `item/XXX.html`: изменить текст кнопки
- `js/app.js`: `createProductCard()` — изменить текст кнопки
- `js/app.js`: `openProductModal()` — изменить текст кнопки
- `js/app.js`: `renderFavorites()` — изменить текст кнопки

---

### ANA-001 + ANA-002 + ANA-003: События поиска и фильтров

**Проблема:** Не отслеживаются поисковые запросы и использование фильтров.

**Цель (DoD):**
- Каждый поиск отправляет событие в GA4 и Я.Метрику
- Каждый клик по фильтру/сортировке отправляет событие
- Данные видны в отчётах GA4

**События GA4:**
```javascript
// Поиск
gtag('event', 'search', {
  search_term: query,
  category: state.currentCategory
});

// Фильтр
gtag('event', 'select_content', {
  content_type: 'filter',
  item_id: filterValue  // 'all', '50', '70', '90'
});

// Сортировка
gtag('event', 'select_content', {
  content_type: 'sort',
  item_id: sortValue  // 'discount-desc', 'price-asc', etc.
});
```

**Я.Метрика:**
```javascript
ym(109145874, 'reachGoal', 'search', {query: query});
ym(109145874, 'reachGoal', 'filter', {filter: filterValue});
ym(109145874, 'reachGoal', 'sort', {sort: sortValue});
```

**Изменения по слоям:**
- `js/app.js`: `initSearch()` — добавить gtag/ym при debounce
- `js/app.js`: `initFilters()` — добавить gtag/ym при клике
- `js/app.js`: `initSort()` — добавить gtag/ym при change

---

## 3. Структура HTML/JS для категорий и перелинковки

### 3.1 Категориальные страницы

**URL-структура:**
```
/                    → главная (все товары)
/electronics.html    → электроника
/clothing.html       → одежда
/home.html           → товары для дома
/auto.html           → автотовары
/beauty.html         → красота
/jewelry.html        → украшения
/sports.html         → спорт
/toys.html           → игрушки
```

**Шаблон `templates/category.html`:**
```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <title>{{categoryName}} — скидки до 90% на AliExpress | SmartSkidka.ru</title>
  <meta name="description" content="Лучшие скидки на {{categoryName}} с AliExpress. {{count}} товаров со скидками до 90%. Бесплатная доставка.">
  <link rel="canonical" href="https://smart-skidka.ru/{{categorySlug}}.html">
  <!-- Schema.org: WebPage + ItemList -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": [
      {"@type": "ListItem", "position": 1, "url": "https://smart-skidka.ru/item/1.html"}
      // ... генерируется скриптом
    ]
  }
  </script>
</head>
<body>
  <!-- Header (как на главной) -->
  <header>...</header>
  
  <!-- Breadcrumb -->
  <nav class="breadcrumb">
    <ol>
      <li><a href="/">Главная</a></li>
      <li>{{categoryName}}</li>
    </ol>
  </nav>
  
  <!-- Hero (адаптированный) -->
  <section class="hero">
    <h1>Скидки на {{categoryName}} до 90%</h1>
    <p>{{count}} товаров с бесплатной доставкой</p>
  </section>
  
  <!-- Filters (как на главной) -->
  <section class="filters-section">...</section>
  
  <!-- Products Grid -->
  <section class="products-section">
    <div class="products-grid" id="products-grid"></div>
    <button class="load-more-btn" id="load-more-btn">Показать ещё</button>
  </section>
  
  <!-- SEO Text -->
  <section class="seo-content">
    <h2>Как экономить на {{categoryName}} с AliExpress</h2>
    <p>...уникальный текст по категории...</p>
  </section>
  
  <!-- Footer -->
  <footer>...</footer>
  
  <script>
    // Предустановленная категория
    window.INITIAL_CATEGORY = '{{categorySlug}}';
  </script>
  <script src="js/products-loader.js"></script>
  <script src="js/app.js"></script>
</body>
</html>
```

**JS-адаптация (`js/app.js`):**
```javascript
// В init() проверять window.INITIAL_CATEGORY
if (window.INITIAL_CATEGORY) {
    state.currentCategory = window.INITIAL_CATEGORY;
    // Загрузить категорию
    await loadCategory(window.INITIAL_CATEGORY);
    renderProducts();
}
```

**Генерация (Python):**
```python
# При сборке каталога
for cat in ['electronics', 'clothing', 'home', 'auto', 'beauty', 'jewelry', 'sports', 'toys']:
    items = [p for p in products if p['category'] == cat]
    html = render_template('category.html', 
        categoryName=CATEGORY_NAMES[cat],
        categorySlug=cat,
        count=len(items)
    )
    write_file(f'{cat}.html', html)
```

### 3.2 Шаблон item-страницы (обновлённый)

**Структура:**
```html
<body>
  <div class="item-page">
    <!-- Header -->
    <header class="item-header">
      <a href="/" class="logo-link">...</a>
    </header>
    
    <!-- Breadcrumb -->
    <nav class="breadcrumb" aria-label="breadcrumb">
      <ol itemscope itemtype="https://schema.org/BreadcrumbList">
        <li>...</li>  <!-- Главная -->
        <li>...</li>  <!-- Категория -->
        <li>...</li>  <!-- Товар (без ссылки) -->
      </ol>
    </nav>
    
    <main class="item-main">
      <!-- Gallery -->
      <div class="item-gallery">
        <img src="..." alt="..." loading="eager">
      </div>
      
      <!-- Info -->
      <div class="item-info">
        <span class="item-discount-badge">-{{discount}}%</span>
        
        <h1 class="item-title">{{title}}</h1>
        
        <div class="item-meta">
          <span class="item-rating">{{rating}} ★</span>
          <span class="item-orders">{{orders}} заказов</span>
          <span class="item-category">{{categoryName}}</span>
        </div>
        
        <div class="item-price-block">
          <span class="item-current">{{price}} ₽</span>
          <span class="item-original">{{originalPrice}} ₽</span>
          <span class="item-save">Экономия {{savings}} ₽</span>
        </div>
        
        <!-- Social Proof -->
        <div class="item-social-proof">
          <span>🔥 <span class="viewers-count">{{random 15-200}}</span> человек смотрят сейчас</span>
        </div>
        
        <!-- Timer -->
        <div class="item-timer">
          ⏰ Скидка действует ещё <span class="timer-hours">{{random 12-48}}</span> часов
        </div>
        
        <div class="item-tags">{{tags}}</div>
        
        <div class="item-shipping">
          Бесплатная доставка из Китая — 15-30 дней
        </div>
        
        <div class="item-actions">
          <a href="{{deeplink}}" class="item-buy-btn" target="_blank" rel="noopener"
             onclick="trackPurchase({{id}}, {{price}})">
            Купить на AliExpress →
          </a>
          <p class="item-affiliate-note">
            💡 Партнёрская ссылка. Цена для вас не меняется.
          </p>
          <a href="/" class="item-back-btn">← Все скидки</a>
        </div>
        
        <!-- Share -->
        <button class="item-share-btn" onclick="shareProduct({{id}})">
          📤 Поделиться
        </button>
      </div>
    </main>
    
    <!-- Related Products -->
    <section class="item-related">
      <h2>Похожие товары</h2>
      <div class="related-grid" id="related-grid">
        <!-- JS заполняет 4-8 товаров той же категории -->
      </div>
    </section>
    
    <!-- Description -->
    <section class="item-description">
      <h2>Описание</h2>
      <p>{{title}} — товар со скидкой {{discount}}% на AliExpress. 
         Рейтинг {{rating}}⭐, {{orders}} заказов. Бесплатная доставка.</p>
    </section>
    
    <!-- Specs -->
    <section class="item-specs">
      <h2>Характеристики</h2>
      <dl>
        {{#each specs}}
        <dt>{{@key}}</dt>
        <dd>{{this}}</dd>
        {{/each}}
      </dl>
    </section>
    
    <!-- FAQ (микроразметка) -->
    <section class="item-faq">
      <h2>Частые вопросы</h2>
      <details>
        <summary>Почему цена ниже, чем на AliExpress?</summary>
        <p>Мы показываем актуальные скидки с AliExpress. Цена та же, но со скидкой продавца.</p>
      </details>
      <details>
        <summary>Какая доставка?</summary>
        <p>Бесплатная доставка из Китая. Срок 15-30 дней.</p>
      </details>
    </section>
    
    <!-- Sticky CTA (mobile only) -->
    <div class="sticky-cta mobile-only">
      <span class="sticky-price">{{price}} ₽</span>
      <a href="{{deeplink}}" class="sticky-btn" target="_blank">
        Купить на AliExpress
      </a>
    </div>
    
    <footer class="item-footer">
      <p>SmartSkidka.ru — партнёрские ссылки AliExpress.</p>
    </footer>
  </div>
</body>
```

### 3.3 Блок "Похожие товары"

**Логика в JS:**
```javascript
function renderRelatedProducts(currentProductId, category, limit = 8) {
    const related = _products
        .filter(p => p.category === category && p.id !== currentProductId)
        .sort(() => Math.random() - 0.5)  // случайный порядок
        .slice(0, limit);
    
    const html = related.map(p => `
        <a href="/item/${p.id}.html" class="related-card">
            <img src="${p.image}" alt="${p.title}" loading="lazy">
            <span class="related-discount">-${p.discount}%</span>
            <span class="related-price">${p.price.toLocaleString('ru-RU')} ₽</span>
        </a>
    `).join('');
    
    document.getElementById('related-grid').innerHTML = html;
}
```

**В шаблоне item/:**
```html
<script>
  document.addEventListener('DOMContentLoaded', () => {
    renderRelatedProducts({{id}}, '{{category}}', 8);
  });
</script>
```

---

## 4. UX/UI-план изменений

### 4.1 Главная страница (index.html)

**Структура (сверху вниз):**
1. **Install Prompt** (fixed top, hidden по умолчанию)
2. **Header** (fixed, logo + search + избранное)
3. **Hero** (h1 + статистика + CTA)
4. **Category Tabs** (включить!): Все | Электроника | Одежда | Дом | Авто | Красота | Спорт | Игрушки
5. **Filters Bar**: [Все скидки] [50%+] [70%+] [90%+] | Сортировка ▼
6. **Results Info**: "Показано 24 товара из 1000"
7. **Products Grid** (24 карточки)
8. **Load More Button**
9. **SEO Block** (перед футером!)
10. **Footer** (категории + информация + Telegram)

**Category Tabs (JS):**
```javascript
// Убрать return; из initCategories()
function initCategories() {
    els.categoryTabs.forEach(tab => {
        tab.addEventListener('click', async () => {
            // ... existing logic ...
            await loadCategory(tab.dataset.category);
            renderProducts();
        });
    });
}
```

**Sticky CTA (mobile):**
```css
@media (max-width: 768px) {
  .sticky-cta {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: var(--bg-secondary);
    border-top: 1px solid var(--border-color);
    padding: 12px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 100;
  }
  .sticky-cta .sticky-btn {
    background: var(--accent-orange);
    color: #fff;
    padding: 10px 20px;
    border-radius: 8px;
    font-weight: 600;
  }
}
```

### 4.2 Карточка товара (product card)

**Текущая структура:**
```
[discount badge -X%] [❤️ fav]
[image]
[title]
[tags]
[★ rating | orders]
[price ₽] [~~old price~~]
[🚚 Бесплатная доставка]
[🛒 В корзину]  ← ПРОБЛЕМА
```

**Новая структура:**
```
[discount badge -X%] [❤️ fav]
[image]
[title]
[tags]
[★ rating | orders]
[price ₽] [~~old price~~]
[🚚 Бесплатная доставка]
[→ На AliExpress]  ← ИСПРАВЛЕНО
```

**Код изменения (`js/app.js`, `createProductCard`):**
```javascript
// Было:
<button class="add-cart-btn" ...>В корзину</button>

// Стало:
<a href="${deeplink}" class="buy-btn" target="_blank" rel="noopener"
   onclick="trackPurchase(${product.id}, ${product.price})">
  На AliExpress →
</a>
```

### 4.3 Модальное окно (product modal)

**Изменения:**
- Кнопка: "Купить на AliExpress →" (вместо "Купить на AliExpress" без стрелки)
- Добавить микротекст под кнопкой
- Добавить gtag событие (сейчас нет!)

### 4.4 Item-страница

**Изменения:**
- Кнопка: "Купить на AliExpress →"
- Микротекст: "💡 Партнёрская ссылка. Цена для вас не меняется."
- Таймер: "⏰ Скидка действует ещё 23 часа"
- Social proof: "🔥 47 человек смотрят сейчас"
- Блок "Похожие товары" (4-8 шт.)
- Кнопка "📤 Поделиться"
- Sticky CTA на мобильном

### 4.5 Точные тексты UX-копирайта

| Элемент | Вариант A (основной) | Вариант B (A/B тест) |
|---------|----------------------|----------------------|
| Кнопка карточки | "На AliExpress →" | "Купить со скидкой →" |
| Кнопка item | "Купить на AliExpress →" | "Перейти к скидке →" |
| Микротекст | "💡 Партнёрская ссылка. Цена для вас не меняется." | "💡 Вы переходите на AliExpress. Цена та же, мы получаем бонус." |
| Таймер | "⏰ Скидка действует ещё {N} часов" | "⏰ Акция закончится через {N} часов" |
| Social proof | "🔥 {N} человек смотрят сейчас" | "🔥 {N} купили за последние 24 часа" |
| Sticky CTA | "Купить на AliExpress" | "Смотреть скидку" |
| Telegram | "📢 Скидки в Telegram" | "🔔 Подпишись на скидки" |

---

## 5. Analytics & A/B-tests

### 5.1 События GA4

| Событие | Параметры | Где вызывать |
|---------|-----------|--------------|
| `search` | `search_term`, `category` | При submit поиска (debounce 300ms) |
| `select_content` | `content_type: 'filter'`, `item_id` | При клике на filter-btn |
| `select_content` | `content_type: 'sort'`, `item_id` | При change sort-select |
| `select_content` | `content_type: 'category'`, `item_id` | При клике на category-tab |
| `ai_search` | `search_term` | При вызове doAiSearch() |
| `install_pwa` | — | При клике на install-btn |
| `click_outbound` | `item_id`, `value`, `currency: 'RUB'` | При клике на любую партнёрскую ссылку |
| `add_to_favorites` | `item_id` | При toggleFavorite() |
| `remove_from_favorites` | `item_id` | При toggleFavorite() (удаление) |
| `scroll_25` | — | При достижении 25% скролла |
| `scroll_50` | — | При достижении 50% скролла |
| `scroll_75` | — | При достижении 75% скролла |
| `scroll_90` | — | При достижении 90% скролла |
| `view_item` | `item_id`, `item_name`, `price` | При открытии модалки / item-страницы |
| `purchase` | `item_id`, `value`, `currency` | При клике на партнёрскую ссылку |

### 5.2 Я.Метрика (дополнительно к GA4)

```javascript
// Для каждого события GA4 — дублировать в Я.Метрику
ym(109145874, 'reachGoal', 'search', {query: query});
ym(109145874, 'reachGoal', 'filter', {filter: filterValue});
ym(109145874, 'reachGoal', 'sort', {sort: sortValue});
ym(109145874, 'reachGoal', 'ai_search', {query: query});
ym(109145874, 'reachGoal', 'install_pwa');
ym(109145874, 'reachGoal', 'click_outbound', {item_id: id, price: price});
```

### 5.3 Воронки

**Воронка 1: SEO → item → AliExpress**
```
Поисковый переход → item/XXX.html → scroll > 50% → click "Купить" → AliExpress
Метрики: bounce rate, time on page, scroll depth, CTR кнопки
```

**Воронка 2: Повторный визит → главная → фильтр → item → AliExpress**
```
Прямой заход / PWA → / → click category/filter → scroll → click card → modal → click "Купить" → AliExpress
Метрики: retention, category usage, filter usage, modal open rate, purchase rate
```

**Воронка 3: AI-поиск → item → AliExpress**
```
/ → click AI-search → ввод запроса → результаты → click card → item/ → click "Купить" → AliExpress
Метрики: AI-search usage, results click-through, purchase rate
```

### 5.4 A/B-тесты

| # | Гипотеза | Вариант A | Вариант B | Метрики | Успех |
|---|----------|-----------|-----------|---------|-------|
| 1 | Текст кнопки влияет на CTR | "На AliExpress →" | "Купить со скидкой →" | CTR кнопки, `purchase` событие | +15% CTR |
| 2 | Таймер скидки увеличивает конверсию | Без таймера | С таймером "⏰ 23 часа" | `purchase`, time on page | +10% purchase |
| 3 | Sticky CTA на мобильном | Без sticky | С sticky bottom bar | `purchase` на mobile | +20% purchase на mobile |
| 4 | Social proof увеличивает доверие | Без social proof | "🔥 47 человек смотрят" | `purchase`, bounce rate | +10% purchase |
| 5 | Модалка vs прямая ссылка | Click card → modal → click | Click card → сразу item/ | Time to purchase, bounce rate | -20% time to purchase |

**Минимальные критерии успеха:**
- Статистическая значимость: p < 0.05
- Минимальная выборка: 1000 сессий на вариант
- Длительность: минимум 7 дней (2 полных цикла)

---

## 6. Security & Risk

### 6.1 XSS через поиск

**Проблема:** Поисковый запрос вставляется в HTML через шаблонные строки.

**Решение:**
```javascript
// Было (опасно):
const html = `<span class="product-tag" onclick="...state.searchQuery='${t}'...">${t}</span>`;

// Стало (безопасно):
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Или использовать textContent вместо innerHTML:
const tagSpan = document.createElement('span');
tagSpan.className = 'product-tag';
tagSpan.textContent = tag;  // безопасно!
tagSpan.addEventListener('click', () => {
    state.searchQuery = tag;
    renderProducts();
});
```

**Где применить:**
- `createProductCard()` — tags
- `renderProducts()` — search query display
- `renderAiResults()` — AI query display

### 6.2 CSP

**Текущий CSP:**
```
default-src 'self'; 
script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://mc.yandex.ru; 
style-src 'self' 'unsafe-inline'; 
img-src 'self' https: data:; 
connect-src 'self'; 
font-src 'self'; 
frame-ancestors 'none'; 
base-uri 'self';
```

**Рекомендации:**
- `'unsafe-inline'` в `script-src` — оставить (иначе сломаются inline-скрипты GA/YM)
- Добавить `frame-src 'none'` (если нет iframe)
- Добавить `form-action 'self'` (если нет форм)
- Убрать `'unsafe-inline'` из `style-src` → вынести все стили в `style.css`

### 6.3 Лимит избранного

**Решение:**
```javascript
const FAV_MAX_SIZE = 100;

function toggleFavorite(productId) {
    const idx = state.favorites.indexOf(productId);
    if (idx > -1) {
        state.favorites.splice(idx, 1);
    } else {
        if (state.favorites.length >= FAV_MAX_SIZE) {
            state.favorites.shift();  // FIFO: удаляем самый старый
            showToast('info', 'Избранное переполнено. Удалён самый старый товар.');
        }
        state.favorites.push(productId);
    }
    saveFavorites();
}
```

### 6.4 Усиление /api/ai-search

**Текущее:** Rate limit 3 запроса/24ч/IP.

**Рекомендации при снятии ограничения:**
1. Добавить CAPTCHA (hCaptcha/reCAPTCHA) после 3 запросов
2. Добавить проверку User-Agent (блокировать пустые/подозрительные)
3. Добавить логирование запросов (IP, timestamp, query)
4. Добавить IP-бан на 1 час при >10 запросов/час
5. Добавить проверку referer (только с smart-skidka.ru)

---

*Документ составлен на основе аудита SmartSkidka.ru от 14.05.2026*
