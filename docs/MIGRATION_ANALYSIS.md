# SmartSkidka.ru — Анализ миграции: старый сайт vs React V2

> Дата анализа: 2026-06-19
> Старый сайт: `/var/www/dealshub-miniapp` (static HTML/CSS/JS)
> Новый сайт: `/var/www/dealshub-miniapp/v2` (React + Vite + Tailwind)
> Beta-версия: https://beta.smart-skidka.ru
> Продакшен: https://smart-skidka.ru

---

## 1. Общая архитектура

| Параметр | Старый сайт | Новый сайт (v2) | Влияние на миграцию |
|----------|-------------|-----------------|---------------------|
| Тип | Статический HTML/CSS/JS + client-side рендеринг каталога | React SPA (Single Page Application) | Новый сайт — полная смена парадигмы. Все URL становятся `/#/` или требуют `try_files` в nginx. |
| Страницы | 1,050 item-страниц + 10 блогов + категории + статика | Только `index.html` + роутинг внутри React | Потеря всех проиндексированных URL без дополнительной работы. |
| Данные | `products/all.json` (761 KB) + категории + chunked shoes | `public/products.json` (1.2 MB) + `public/categories.json` | Новый JSON больше, но грузится отдельно. Нужна оптимизация размера. |
| Сборка | Нет сборки, файлы как есть | Vite build → `dist/` | Нужен CI/CD для сборки и деплоя. |
| Хостинг | `/var/www/dealshub-miniapp` | `/var/www/smartskidka-beta` (пока beta) | При переключении нужно обновить nginx root. |

---

## 2. Страницы и URL

### Старый сайт

| Тип страницы | URL | Количество | Особенности |
|--------------|-----|------------|-------------|
| Главная | `/` | 1 | SPA-оболочка, каталог рендерится JS |
| Категории | `/{category}.html` | 8 | electronics, clothing, shoes, home, auto, beauty, sports, jewelry, toys |
| Товары | `/item/{itemId}.html` | 1,050 | Статические страницы с JSON-LD, хлебными крошками, related products |
| Блог | `/blog/{slug}.html` | 10 | Ручные статьи |
| Инфо | `/about.html`, `/contact.html`, `/privacy.html`, `/terms.html`, `/404.html` | 5 | Статические страницы |

### Новый сайт (v2)

| Тип страницы | URL | Количество | Особенности |
|--------------|-----|------------|-------------|
| Главная | `/` | 1 | React SPA |
| Категории | `/` (фильтр внутри SPA) | — | Нет отдельных URL для категорий |
| Товары | `/` (страница товара внутри SPA) | — | Нет прямых URL `/item/...`. SEO-заголовок меняется динамически, но URL не меняется. |
| Блог | `/` (страница блога внутри SPA) | — | Блог внутри SPA, slug не отражается в URL |
| Промокоды | `/` (страница promo внутри SPA) | — | Внутри SPA |
| Избранное | `/` (страница favorites внутри SPA) | — | Внутри SPA |
| AI-поиск | `/` (страница results внутри SPA) | — | Внутри SPA |

### 🔴 Критические риски

- **1,050 проиндексированных товарных URL пропадут** при переключении домена.
- **Категорийные страницы пропадут** — потеря трафика по категориям.
- **Блог не имеет отдельных URL** — нельзя делиться статьями, поисковики не проиндексируют.
- **В новом сайте нет 404.html** — при ошибках nginx отдаёт стандартную страницу.

---

## 3. SEO: мета-теги и структурированные данные

### Старый сайт

| Элемент | Статус | Примечание |
|---------|--------|------------|
| Title | ✅ | На всех страницах, динамический для товаров |
| Description | ✅ | На всех страницах, иногда слишком длинный (>160) |
| Keywords | ✅ | Только на главной |
| Canonical | ✅ | На всех страницах |
| Open Graph | ✅ | На главной, категориях, товарах |
| Twitter Cards | ✅ | summary_large_image |
| JSON-LD WebSite | ✅ | На главной + SearchAction |
| JSON-LD Organization | ✅ | На главной |
| JSON-LD ItemList | ✅ | На категориях (но пустой на auto/jewelry/toys) |
| JSON-LD Product | ✅ | На каждой item-странице + Offer + AggregateRating |
| JSON-LD BreadcrumbList | ✅ | На item-страницах |
| JSON-LD BlogPosting | ❌ | Нет на блогах |
| Sitemap | ✅ | 1,072 URL |
| robots.txt | ✅ | Но `Disallow: /*?*` блокирует поиск из SearchAction |
| Turbo (Yandex) | ⚠️ | `turbo.xml` — только 1 страница |
| Yandex Market | ⚠️ | `yandex-market.yml` — 1 dummy-оффер |

### Новый сайт (v2)

| Элемент | Статус | Примечание |
|---------|--------|------------|
| Title | ✅ | Динамический через react-helmet-async |
| Description | ✅ | Динамический |
| Keywords | ✅ | Динамический |
| Canonical | ⚠️ | Есть, но указывает на `https://smartskidka.ru` (без дефиса!), а основной домен `smart-skidka.ru` |
| Open Graph | ⚠️ | Есть базовые title/description/type/site_name, но нет og:image |
| Twitter Cards | ❌ | Нет |
| JSON-LD WebSite | ❌ | Нет |
| JSON-LD Organization | ❌ | Нет |
| JSON-LD ItemList | ❌ | Нет |
| JSON-LD Product | ❌ | Нет на странице товара |
| JSON-LD BreadcrumbList | ❌ | Нет |
| JSON-LD FAQPage | ✅ | Есть на главной и категориях |
| JSON-LD BlogPosting | ❌ | Нет |
| Sitemap | ❌ | Нет генерации sitemap |
| robots.txt | ❌ | Нет |
| Turbo / Yandex Market | ❌ | Нет |
| lang атрибут | ❌ | `<html lang="en">` вместо `ru` |

### 🔴 Критические риски

- **Потеря всех rich results** (Product, ItemList, BreadcrumbList) при миграции.
- **Неправильный canonical** указывает на неосновной домен.
- **Отсутствие sitemap** для 1,050+ страниц — поисковики не узнают о новых URL.
- **Нет WebSite/Organization schema** — снижает доверие поисковиков.
- **Язык `en`** вместо `ru` — может влиять на гео-ранжирование.

---

## 4. Функционал и UX

### Старый сайт

| Функция | Статус | Детали |
|---------|--------|--------|
| Каталог | ✅ | Пагинация "Показать ещё" по 24 товара |
| Категории | ✅ | 8 категорий + chips/subcategories |
| Фильтры | ✅ | Скидка 30/50/70/90+, цена от/до, сортировка |
| Обычный поиск | ✅ | По title/category/tags/specs |
| AI-поиск | ⚠️ | Есть UI, но сервер возвращает `ids`, а клиент ждёт `results` — работает fallback |
| Избранное | ✅ | localStorage, панель, лимит 100 |
| Недавно просмотренные | ✅ | localStorage, max 8 |
| Страница товара | ✅ | 1,050 статических страниц |
| Модал товара | ✅ | Быстрый просмотр без перехода |
| Поделиться | ⚠️ | Генерирует ссылки по internal `id` — битые ссылки |
| Блог | ✅ | 10 отдельных страниц |
| Промокоды | ✅ | Страница с FAQ |
| PWA / Install | ✅ | Манифест, SW, custom install prompt |
| Offline | ✅ | SW cache-first для статики, network-first для JSON |
| Аналитика | ✅ | GA4 G-VG8VX6F69T, Yandex Metrika 109145874, много событий |
| Telegram | ✅ | Ссылка на @SmartRuMarket |
| ИКС счётчик | ✅ | Яндекс вебмастер |
| A/B тесты | ⚠️ | Фреймворк есть, но не применяется |

### Новый сайт (v2)

| Функция | Статус | Детали |
|---------|--------|--------|
| Каталог | ✅ | Все 1,050 товаров сразу, без пагинации (тяжело для DOM) |
| Категории | ✅ | 7 категорий + "Все" |
| Фильтры | ✅ | Скидка, цена от/до |
| Сортировка | ❌ | Нет сортировки |
| Обычный поиск | ✅ | Фильтрация по title/subtitle/tags |
| AI-поиск | ✅ | Локальный keyword matching, понимает русские категории, без лимитов |
| Избранное | ✅ | localStorage, отдельная страница, сортировка по скидке/цене/дате |
| Недавно просмотренные | ❌ | Нет |
| Страница товара | ✅ | Внутри SPA, красивая страница с характеристиками |
| Модал товара | ❌ | Нет |
| Поделиться | ✅ | Web Share API + fallback на clipboard |
| Блог | ⚠️ | 5 тестовых постов с placeholder контентом |
| Промокоды | ✅ | 8 промокодов с FAQ |
| PWA / Install | ❌ | Нет manifest, нет SW |
| Offline | ❌ | Нет |
| Аналитика | ❌ | GA и Yandex не подключены |
| Telegram | ✅ | Ссылка на @SmartRuMarket |
| ИКС счётчик | ❌ | Нет |
| A/B тесты | ❌ | Нет |

### 🔴 Критические риски

- **Нет аналитики** — переключение = слепота.
- **Нет PWA** — потеря install base и оффлайн-функционала.
- **Все товары рендерятся сразу** — тормоза на слабых устройствах.
- **Нет сортировки** — ухудшение UX.
- **Блог в placeholder-режиме** — нельзя переносить как есть.

---

## 5. Производительность

### Старый сайт

| Метрика | Значение |
|---------|----------|
| Размер основных JS | app.js 57 KB + products-loader.js 6 KB + deeplink.js 2 KB |
| CSS | 67 KB |
| Данные | products/all.json 761 KB (minified) |
| Первоначальная загрузка | HTML + CSS + JS, затем JSON |
| Lazy loading | ✅ Картинки, first 4 eager |
| Resource hints | ✅ preload, preconnect, dns-prefetch |
| Кэширование | ✅ SW + meta cache-control |
| Минимизация | ❌ Нет, файлы human-readable |

### Новый сайт (v2)

| Метрика | Значение |
|---------|----------|
| Размер JS бандла | 357 KB (gzip 104 KB) |
| CSS | 102 KB (gzip 16.6 KB) |
| Данные | products.json 1.2 MB + categories.json 3.6 KB |
| Первоначальная загрузка | HTML + JS + CSS, затем JSON |
| Lazy loading | ✅ Картинки через loading="lazy" |
| Resource hints | ❌ Нет preload/preconnect для AliExpress CDN |
| Кэширование | ❌ Нет SW, только nginx static cache |
| Минимизация | ✅ Vite минифицирует |

### 🔴 Критические риски

- **products.json 1.2 MB** — можно минифицировать до ~300 KB.
- **Нет пагинации** — 1,050 карточек в DOM сразу.
- **Нет resource hints** — медленнее загрузка картинок.
- **Нет SW** — каждый визит грузит всё заново.

---

## 6. Безопасность

### Старый сайт

| Аспект | Статус | Детали |
|--------|--------|--------|
| XSS защита | ✅ | `escapeHtml()` в app.js |
| CSP | ⚠️ | Рекомендован в документации, но не найден в коде/заголовках |
| Security headers | ⚠️ | Вероятно, на nginx уровне (вне репозитория) |
| Rate limiting AI | ✅ | 3 запроса/24ч/IP |
| CORS | ✅ | Только `smart-skidka.ru` |
| Affiliate links | ⚠️ | Нет `rel="nofollow sponsored"` |

### Новый сайт (v2)

| Аспект | Статус | Детали |
|--------|--------|--------|
| XSS защита | ⚠️ | Нет явной escapeHtml, React сам экранирует, но SEO текст вставляется через dangerouslySetInnerHTML |
| CSP | ❌ | Нет |
| Security headers | ❌ | Нет |
| Rate limiting AI | N/A | Локальный поиск, лимитов нет |
| CORS | N/A | Не использует серверный AI |
| Affiliate links | ❌ | Нет `rel="nofollow sponsored"` |

### 🔴 Критические риски

- **`dangerouslySetInnerHTML`** в SEOSection и BlogSection — потенциальная XSS-уязвимость, если контент придёт из внешнего источника.
- **Отсутствие CSP и security headers** — регресс.
- **Нет nofollow sponsored** — риск санкций поисковиков за affiliate ссылки.

---

## 7. Данные и контент

### Старый сайт

| Источник | Статус |
|----------|--------|
| Товары | 1,050 в all.json + 5,500 в shoes-1...shoes-10 |
| Категории | 8 |
| Блог | 10 полноценных статей на русском |
| Промокоды | Реальные промокоды с условиями |
| Коллекции | Маркетинговые карточки |
| Отзывы | Нет, только orders |
| Картинки | Реальные AliExpress CDN |
| Ссылки | Реальные affiliate-ссылки |

### Новый сайт (v2)

| Источник | Статус |
|----------|--------|
| Товары | 1,050 из all.json (shoes-1...shoes-10 не перенесены) |
| Категории | 7 (нет jewelry, toys) |
| Блог | 5 тестовых постов с placeholder контентом |
| Промокоды | 8 тестовых промокодов |
| Коллекции | 4 тестовые коллекции |
| Отзывы | Нет |
| Картинки | Реальные AliExpress CDN |
| Ссылки | Реальные affiliate-ссылки |

### 🔴 Критические риски

- **Не перенесены 5,500 товаров из shoes-1...shoes-10**.
- **Потеря 5 категорийных/блог-статей**.
- **Блог и промокоды в тестовом режиме**.

---

## 8. Скрипты и автоматизация

### Старый сайт

| Скрипт | Назначение |
|--------|------------|
| `update-feed.js` / `update-feed-stream.js` | Загрузка Admitad feed, обновление товаров |
| `generate-items.js` | Генерация 1,050 item-страниц |
| `generate-sitemap.js` | Генерация sitemap.xml |
| `generate-itemlist.js` | Инъекция ItemList JSON-LD в категории |
| `validate-jsonld.js` | Валидация JSON-LD |
| `validate-meta.js` | Валидация meta-тегов |
| `update-feeds.sh` | Обновление turbo.xml / yandex-market.yml |
| `add-iks-counter.js` | Добавление ИКС счётчика |

### Новый сайт (v2)

| Скрипт | Назначение |
|--------|------------|
| `convert-products-to-v2.js` | Конвертация products/all.json → v2 формат |

### 🔴 Критические риски

- **Нет автоматической генерации sitemap, item-страниц, JSON-LD** для нового сайта.
- **Нет валидации SEO**.
- **Нет обновления feed** для v2.

---

## 9. CI/CD и деплой

### Старый сайт

- GitHub Actions `deploy.yml` на push в `main`:
  1. `npm ci`
  2. `npm run update-feed`
  3. `npm run generate-items`
  4. `npm run build` (sitemap + feeds)
  5. `rsync` на VPS
  6. Restart AI search service

### Новый сайт (v2)

- Пока ручная сборка и копирование в `/var/www/smartskidka-beta`.
- Нет CI/CD для v2.

---

## 10. Рекомендации по миграции

### 🔴 Блокеры (нельзя переключать домен без этого)

1. **Сохранить старые URL**
   - Вариант A: сгенерировать статические `/item/{itemId}.html` из нового дизайна.
   - Вариант B: настроить 301 редиректы старых URL на новые `/product/{id}`.
   - Вариант C: гибрид — React SPA на `/`, статические item-страницы на `/item/`.

2. **Аналитика**
   - Перенести GA4 `G-VG8VX6F69T` и Yandex Metrika `109145874`.
   - Восстановить все custom events (view_item, purchase, add_to_favorites, search, ai_search, scroll marks).

3. **SEO**
   - Исправить canonical на `https://smart-skidka.ru`.
   - Добавить `<html lang="ru">`.
   - Добавить sitemap.xml с item-страницами.
   - Добавить JSON-LD Product, ItemList, BreadcrumbList, WebSite, Organization.
   - Добавить robots.txt.
   - Добавить Open Graph image и Twitter Cards.

4. **PWA**
   - Добавить manifest.json.
   - Добавить Service Worker.
   - Добавить install prompt и offline indicator.

### 🟡 Важно (сильно влияет на UX/SEO)

5. **Пагинация / виртуализация**
   - Не рендерить 1,050 карточек сразу.
   - Добавить пагинацию, бесконечный скролл или виртуализацию.

6. **Оптимизация products.json**
   - Минифицировать JSON → ~300 KB.
   - Рассмотреть разбиение по категориям или gzip static в nginx.

7. **Перенос всех товаров**
   - Добавить shoes-1...shoes-10 (ещё ~5,500 товаров).
   - Вернуть категории jewelry и toys.

8. **Блог**
   - Перенести 10 реальных статей.
   - Дать каждой статье отдельный URL (`/blog/{slug}`).
   - Добавить JSON-LD BlogPosting.

9. **Промокоды**
   - Перенести реальные промокоды из старого сайта.

10. **Resource hints**
    - Добавить preconnect к AliExpress CDN.

### 🟢 Желательно

11. **Security**
    - Добавить CSP и security headers.
    - Добавить `rel="nofollow sponsored"` на affiliate-ссылки.
    - Убрать или экранировать `dangerouslySetInnerHTML`.

12. **Turbo / Yandex Market**
    - Восстановить/заполнить turbo.xml и yandex-market.yml.

13. **A/B тесты**
    - Решить, нужны ли они в новом сайте.

14. **CI/CD для v2**
    - Настроить GitHub Actions для сборки и деплоя v2.

---

## 11. Вывод

**Новый сайт визуально современнее, но сейчас он — beta-заглушка, а не полноценная замена.**

Переключать основной домен **нельзя** до решения блокеров:
1. Сохранение/редирект 1,050 item URL
2. Аналитика
3. SEO (canonical, sitemap, JSON-LD, lang)
4. PWA (manifest + SW)

После устранения блокеров можно переключать домен. Дальнейшая работа — перенос всех данных, оптимизация производительности и восстановление функционала.
