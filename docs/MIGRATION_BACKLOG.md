# SmartSkidka.ru — Бэклог миграции на React V2

> Создан на основе `docs/MIGRATION_ANALYSIS.md`
> Дата: 2026-06-19
> Ветка: `v2-react-migration`

## Легенда

- **P0 (Blocker)** — без этого нельзя переключать основной домен
- **P1 (Critical)** — сильно влияет на трафик/доход/UX, делаем до переключения
- **P2 (Important)** — делаем в первые 2-4 недели после старта или параллельно
- **P3 (Nice to have)** — можно отложить

- **Сложность**: S (1-2 часа), M (3-8 часов), L (1-3 дня), XL (3-7 дней)
- **Статус**: `backlog` | `in_progress` | `review` | `done`

---

## Definition of Done (DoD)

Каждая задача в этом бэклоге считается выполненной только при соблюдении следующих правил:

1. **Код реализован и протестирован**
   - Написаны автоматические тесты (unit/integration/e2e) для нового функционала.
   - Тесты запускаются командой `npm test` или эквивалентной.
   - Ручное тестирование на https://beta.smart-skidka.ru подтверждено.

2. **Проверки качества пройдены**
   - `npm run lint` без ошибок.
   - `npm run build` успешно собирает проект.
   - Lighthouse / SEO / accessibility проверки не показывают регрессий (если применимо).

3. **Статус задачи обновлён**
   - В `docs/MIGRATION_BACKLOG.md` заголовок задачи вычёркивается: `~~### X.Y Название задачи~~ ✅`.
   - Статус задачи изменён на `✅ Выполнено`.
   - В `MIGRATION_BACKLOG.md` добавлена короткая заметка о результате (опционально).

4. **Коммит и push**
   - Все изменения закоммичены в ветку `v2-react-migration`.
   - Сообщение коммита следует conventional commits: `feat(v2): ...`, `fix(v2): ...`, `test(v2): ...`, `docs: ...`.
   - Изменения запушены в origin.

5. **Документация обновлена**
   - Если задача меняет архитектуру, API или деплой — обновлён соответствующий README / AGENTS.md / docs.

---

## Эпик 1: Блокеры миграции (P0)

Без выполнения этих задач переключение `smart-skidka.ru` на новый сайт запрещено.

### ~~1.1 Сохранение товарных URL~~ ✅

- **Приоритет:** P0
- **Сложность:** L-XL
- **Статус:** ✅ Выполнено
- **Владелец:** TBD
- **Контекст:** Старый сайт имеет 1,050 страниц `/item/{itemId}.html`, которые проиндексированы поисковиками.
- **Результат:** Реализован **Вариант C (гибрид)**: React SPA на `/`, статические `/item/{itemId}.html` генерируются при сборке.
  - Скрипт `v2/scripts/generate-product-pages.js` создаёт 1,050 HTML-файлов в `v2/dist/item/`.
  - Каждая страница содержит SEO-мета, canonical, Open Graph, JSON-LD Product/Offer/AggregateRating и SSR-контент.
  - `window.__PRODUCT_ITEM_ID__` + fallback на парсинг pathname позволяет React-SPA открыть нужный товар при прямом заходе.
  - Service Worker исключил `/item/` из `navigateFallback`, чтобы статические страницы отдавались напрямую.
  - В `App.tsx` добавлена инициализация товара по `itemId` из URL/inline-переменной и `history.replaceState` для синхронизации адресной строки.
  - `scripts/convert-products-to-v2.js` теперь сохраняет `itemId` в `v2/public/products.json`.
- **DoD:** См. раздел [Definition of Done](#definition-of-done-dod).
- **Критерии приёмки:**
  - Все старые `/item/{itemId}.html` отдают 200 или 301.
  - Нет 404 на проиндексированных URL.
  - Страницы содержат JSON-LD Product, Offer, AggregateRating.
  - Внешние ссылки из поиска ведут на рабочие страницы.
- **Зависимости:** 1.2 (SEO-заголовки и canonical), 3.1 (перенос всех товаров)
- **Тесты:** `v2/scripts/test-product-pages.cjs` (1050 файлов, title, meta, canonical, JSON-LD, `__PRODUCT_ITEM_ID__`, SSR-контент).

### ~~1.2 Исправление SEO-базовых ошибок~~ ✅

- **Приоритет:** P0
- **Сложность:** S-M
- **Статус:** ✅ Выполнено
- **Результат:** `lang="ru"`, canonical `smart-skidka.ru`, `robots.txt` добавлен. Тесты: `v2/scripts/test-seo.cjs`.
- **Владелец:** TBD
- **Задача:**
  - Поменять `<html lang="en">` → `<html lang="ru">` в `v2/index.html`.
  - Исправить canonical с `https://smartskidka.ru` на `https://smart-skidka.ru`.
  - Добавить `robots.txt` с sitemap.
- **DoD:** См. раздел [Definition of Done](#definition-of-done-dod).
- **Критерии приёмки:**
  - Все страницы имеют `lang="ru"`.
  - Canonical соответствует основному домену `smart-skidka.ru`.
  - `robots.txt` доступен и ссылается на sitemap.

### ~~1.3 Подключение аналитики~~ ✅

- **Приоритет:** P0
- **Сложность:** M
- **Статус:** ✅ Выполнено
- **Результат:** GA4 `G-VG8VX6F69T` и Yandex Metrika `109145874` подключены. События: view_item, purchase, add/remove_favorites, search, ai_search, category, filter, sort, scroll_25/50/75/90, click_outbound. Тесты: `v2/scripts/test-analytics.cjs`.
- **Владелец:** TBD
- **Контекст:** Старый сайт использует GA4 `G-VG8VX6F69T` и Yandex Metrika `109145874`.
- **Задача:**
  - Добавить GA4 и Yandex Metrika в `v2/index.html`.
  - Восстановить ключевые события:
    - `view_item` — открытие страницы/модала товара
    - `purchase` / `reachGoal('purchase')` — клик "На AliExpress"
    - `add_to_favorites` / `remove_from_favorites`
    - `search` / `reachGoal('search')`
    - `select_content` — выбор категории/фильтра/сортировки
    - `ai_search`
    - `scroll_25/50/75/90`
- **DoD:** См. раздел [Definition of Done](#definition-of-done-dod).
- **Критерии приёмки:**
  - В консоли GA/YM видны события при действиях на beta.
  - Старые цели в Yandex не ломаются.

### ~~1.4 Восстановление PWA~~ ✅

- **Приоритет:** P0
- **Сложность:** M-L
- **Статус:** ✅ Выполнено
- **Результат:** `manifest.json`, `vite-plugin-pwa` Service Worker, install prompt, offline indicator. Иконки скопированы в beta. Тесты: `v2/scripts/test-pwa.cjs`.
- **Владелец:** TBD
- **Контекст:** Старый сайт имеет manifest, Service Worker, install prompt, offline indicator.
- **Задача:**
  - Создать `v2/public/manifest.json` с иконками, theme-color, shortcuts.
  - Добавить Service Worker (vite-plugin-pwa или ручной).
  - Добавить install prompt и offline indicator.
- **DoD:** См. раздел [Definition of Done](#definition-of-done-dod).
- **Критерии приёмки:**
  - Chrome предлагает установить приложение.
  - Lighthouse PWA audit проходит.
  - Offline-страница работает.

---

## Эпик 2: SEO и индексация (P1)

### ~~2.1 Генерация sitemap.xml~~ ✅

- **Приоритет:** P1
- **Сложность:** M
- **Статус:** ✅ Выполнено
- **Владелец:** TBD
- **Задача:** Написать скрипт `v2/scripts/generate-sitemap.js`, который генерирует `v2/dist/sitemap.xml` со всеми URL.
- **Результат:**
  - Скрипт `v2/scripts/generate-sitemap.js` создаёт `sitemap.xml` в `v2/dist/` при сборке.
  - 1,075 URL: 8 статических, 7 категорий, 1,050 товаров, 10 блог-постов.
  - Все URL на `https://smart-skidka.ru/`, без `/api/` и query strings.
  - `robots.txt` уже ссылается на `https://smart-skidka.ru/sitemap.xml`.
  - Запускается автоматически: `npm run build` → `vite build && generate-product-pages.js && generate-sitemap.js`.
- **DoD:** См. раздел [Definition of Done](#definition-of-done-dod).
- **Критерии приёмки:**
  - Sitemap содержит все URL, валиден по схеме.
  - robots.txt ссылается на sitemap.
  - Запускается автоматически при сборке.
- **Тесты:** `v2/scripts/test-sitemap.cjs` (XML, URL count, no /api/, no query strings, all smart-skidka.ru).

### ~~2.2 Добавление структурированных данных~~ ✅

- **Приоритет:** P1
- **Сложность:** L
- **Статус:** ✅ Выполнено
- **Владелец:** TBD
- **Задача:** Добавить JSON-LD schema.org на все типы страниц.
- **Результат:**
  - **Главная:** `WebSite` + `SearchAction` + `Organization` + 2×`ItemList` (электроника, одежда)
  - **Категории:** `ItemList` с 12 товарами
  - **Товар (статические страницы):** `Product` + `Offer` + `AggregateRating` (уже было в 1.1)
  - **Товар (SPA):** `BreadcrumbList` (хлебные крошки: Главная → Категория → Товар)
  - **FAQ:** `FAQPage` на главной, категориях, промокодах (уже было)
  - **SEO.tsx:** расширен проп `jsonLd` для произвольного JSON-LD
- **DoD:** См. раздел [Definition of Done](#definition-of-done-dod).
- **Критерии приёмки:**
  - Google Rich Results Test не показывает критических ошибок.
  - `validate-jsonld.js` проходит для всех типов страниц.
- **Тесты:** `v2/scripts/test-jsonld.cjs` (Product/Offer/AggregateRating на статических страницах, WebSite/Organization/ItemList/BreadcrumbList в коде SPA).

### ~~2.3 Open Graph и Twitter Cards~~ ✅

- **Приоритет:** P1
- **Сложность:** S
- **Статус:** ✅ Выполнено
- **Владелец:** TBD
- **Задача:** Добавить `og:image`, `og:url`, `twitter:card` и т.д. Подготовить og-image шаблон или статичное изображение.
- **Результат:**
  - **SEO.tsx:** `og:title`, `og:description`, `og:type`, `og:url`, `og:site_name`, `og:image`, `og:locale` (ru_RU), `twitter:card` (summary_large_image), `twitter:title`, `twitter:description`, `twitter:image`
  - **Статические товарные страницы:** все OG + Twitter meta + `product:price:amount` + `product:price:currency` (RUB)
  - og:image использует изображение товара (для товарных страниц) или не задаётся (для остальных, пока нет шаблона)
- **DoD:** См. раздел [Definition of Done](#definition-of-done-dod).
- **Критерии приёмки:**
  - Facebook/Twitter/Telegram показывают красивую карточку при шаринге.
- **Тесты:** `v2/scripts/test-og.cjs` (SEO.tsx и статические товарные страницы).

### ~~2.4 Генерация статических категорийных страниц~~ ✅

- **Приоритет:** P1
- **Сложность:** L
- **Статус:** ✅ Выполнено
- **Владелец:** TBD
- **Задача:** Сгенерировать `/{category}.html` страницы с ItemList JSON-LD (или настроить SSR/SSG).
- **Результат:**
  - Скрипт `v2/scripts/generate-category-pages.js` создаёт 7 HTML-файлов в `v2/dist/` (electronics, clothing, shoes, home, auto, beauty, sport).
  - Каждая страница содержит: SEO-title, meta description, canonical, OG, Twitter, JSON-LD ItemList с 24 товарами, SSR-контент с карточками товаров.
  - `window.__CATEGORY_SLUG__` для инициализации SPA при прямом заходе.
  - Интегрирован в `npm run build` после товарных страниц.
- **DoD:** См. раздел [Definition of Done](#definition-of-done-dod).
- **Критерии приёмки:**
  - `/electronics.html` и другие категории отдают 200 с SEO-контентом.
  - Сохраняются старые URL категорий.
- **Тесты:** `v2/scripts/test-category-pages.cjs` (7 категорий, title, meta, canonical, JSON-LD, SSR, OG, Twitter).

### ~~2.5 Яндекс Turbo и Yandex Market~~ ✅

- **Приоритет:** P1
- **Сложность:** M-L
- **Статус:** ✅ Выполнено
- **Владелец:** TBD
- **Задача:** Заполнить `turbo.xml` реальными страницами. Заполнить `yandex-market.yml` реальными товарами с правильной валютой (RUB).
- **Результат:**
  - `generate-turbo.js`: создаёт `turbo.xml` с homepage + 7 категорий + 100 лучших товаров (rating ≥4.0, discount ≥50%, отсортированы по скидке). Все с реальными данными, CDATA-контентом, Yandex analytics ID.
  - `generate-yml.js`: создаёт `yandex-market.yml` с 1,050 offers, реальными названиями, ценами, изображениями, категориями. Валюта RUR. URL `/item/{itemId}.html`.
  - Оба фида интегрированы в `npm run build`.
  - Убраны placeholder-данные из legacy фидов (старый yandex-market.yml имел 1 dummy offer).
- **DoD:** См. раздел [Definition of Done](#definition-of-done-dod).
- **Критерии приёмки:**
  - Feeds валидны и содержат >90% товаров.
- **Тесты:** `v2/scripts/test-turbo-yml.cjs` (валидность XML/YML, наличие всех полей, отсутствие placeholder-данных, 100+ items в turbo, 1050 offers в YML).

---

## Эпик 3: Данные и контент (P1)

### 3.1 Перенос всех товаров

- **Приоритет:** P1
- **Сложность:** L
- **Статус:** backlog
- **Владелец:** TBD
- **Контекст:** Сейчас перенесены только 1,050 товаров из `all.json`. В `shoes-1.json`...`shoes-10.json` ещё ~5,500 товаров.
- **Задача:**
  - Обновить `scripts/convert-products-to-v2.js` чтобы брать все товары из всех JSON-файлов.
  - Решить проблему с ID (в `shoes-*.json` ID пересекаются/выходят за диапазон `all.json`).
  - Обновить `categories.json` и `stats`.
- **DoD:** См. раздел [Definition of Done](#definition-of-done-dod).
- **Критерии приёмки:**
  - Общее количество товаров соответствует реальному (6,500+).
  - Нет дубликатов ID.
  - Категории и counts корректны.

### 3.2 Перенос блога

- **Приоритет:** P1
- **Сложность:** M
- **Статус:** backlog
- **Владелец:** TBD
- **Задача:**
  - Перенести 10 статей из `blog/*.html` в `v2/src/data/products.ts` или отдельный JSON.
  - Дать каждой статье отдельный URL `/blog/{slug}` (SSG или роутинг).
  - Добавить JSON-LD BlogPosting.
- **DoD:** См. раздел [Definition of Done](#definition-of-done-dod).
- **Критерии приёмки:**
  - Все старые URL `/blog/{slug}.html` отдают 200 или 301.
  - Контент статей сохранён.

### 3.3 Перенос промокодов

- **Приоритет:** P1
- **Сложность:** S
- **Статус:** backlog
- **Владелец:** TBD
- **Задача:** Заменить тестовые промокоды в v2 на реальные из старого сайта.
- **DoD:** См. раздел [Definition of Done](#definition-of-done-dod).
- **Критерии приёмки:**
  - Все актуальные промокоды отображаются.
  - FAQ по промокодам перенесён.

### 3.4 Перенос коллекций

- **Приоритет:** P2
- **Сложность:** S-M
- **Статус:** backlog
- **Владелец:** TBD
- **Задача:** Перенести маркетинговые коллекции из старого сайта.
- **DoD:** См. раздел [Definition of Done](#definition-of-done-dod).
- **Критерии приёмки:**
  - Коллекции ссылаются на реальные товары/категории.

---

## Эпик 4: Производительность (P1-P2)

### 4.1 Пагинация / виртуализация каталога

- **Приоритет:** P1
- **Сложность:** L
- **Статус:** backlog
- **Владелец:** TBD
- **Контекст:** Сейчас все 1,050 товаров рендерятся в DOM сразу. При 6,500+ станет катастрофа.
- **Задача:**
  - Добавить пагинацию или бесконечный скролл.
  - Или виртуализацию списка (react-window / react-virtualized).
- **DoD:** См. раздел [Definition of Done](#definition-of-done-dod).
- **Критерии приёмки:**
  - First Contentful Paint и Time to Interactive не ухудшаются при росте каталога.
  - Прокрутка плавная на мобильных устройствах.

### 4.2 Оптимизация products.json

- **Приоритет:** P1
- **Сложность:** S
- **Статус:** backlog
- **Владелец:** TBD
- **Задача:**
  - Минифицировать `products.json` (убрать whitespace) → ~300 KB вместо 1.2 MB.
  - Рассмотреть разбиение по категориям.
  - Включить gzip static в nginx.
- **DoD:** См. раздел [Definition of Done](#definition-of-done-dod).
- **Критерии приёмки:**
  - JSON < 400 KB gzipped.
  - Загрузка каталога < 1s на 3G.

### 4.3 Resource hints

- **Приоритет:** P2
- **Сложность:** S
- **Статус:** backlog
- **Владелец:** TBD
- **Задача:** Добавить `preconnect`/`dns-prefetch` для AliExpress CDN, fonts, аналитики.
- **DoD:** См. раздел [Definition of Done](#definition-of-done-dod).
- **Критерии приёмки:**
  - Lighthouse не ругается на preconnect.

### 4.4 Оптимизация изображений

- **Приоритет:** P2
- **Сложность:** M
- **Статус:** backlog
- **Владелец:** TBD
- **Задача:**
  - Добавить `width`/`height` для картинок.
  - Использовать `loading="eager"` для первых 4 карточек.
  - Рассмотреть lazy loading с blur placeholder.
- **DoD:** См. раздел [Definition of Done](#definition-of-done-dod).
- **Критерии приёмки:**
  - CLS < 0.1.

---

## Эпик 5: UX и функционал (P2)

### 5.1 Сортировка товаров

- **Приоритет:** P2
- **Сложность:** S
- **Статус:** backlog
- **Владелец:** TBD
- **Задача:** Добавить сортировку в ProductCatalog (по цене, скидке, популярности).
- **DoD:** См. раздел [Definition of Done](#definition-of-done-dod).
- **Критерии приёмки:**
  - Пользователь может отсортировать товары.

### 5.2 Модал быстрого просмотра товара

- **Приоритет:** P2
- **Сложность:** M
- **Статус:** backlog
- **Владелец:** TBD
- **Задача:** Добавить модальное окно при клике на карточку, как в старом сайте.
- **DoD:** См. раздел [Definition of Done](#definition-of-done-dod).
- **Критерии приёмки:**
  - Клик на карточку открывает модал с деталями.
  - Кнопка "Подробнее" ведёт на полную страницу товара.

### 5.3 Недавно просмотренные

- **Приоритет:** P2
- **Сложность:** S
- **Статус:** backlog
- **Владелец:** TBD
- **Задача:** Добавить localStorage-based "Недавно просмотренные" на главную.
- **DoD:** См. раздел [Definition of Done](#definition-of-done-dod).
- **Критерии приёмки:**
  - Просмотренные товары сохраняются и отображаются.

### 5.4 Подвал и навигация

- **Приоритет:** P2
- **Сложность:** S
- **Статус:** backlog
- **Владелец:** TBD
- **Задача:**
  - Добавить полный footer с категориями, info-страницами, Telegram.
  - Добавить breadcrumb-навигацию.
- **DoD:** См. раздел [Definition of Done](#definition-of-done-dod).
- **Критерии приёмки:**
  - Footer содержит ссылки на все категории и info-страницы.

### 5.5 Инфо-страницы

- **Приоритет:** P2
- **Сложность:** S-M
- **Статус:** backlog
- **Владелец:** TBD
- **Задача:** Перенести `/about.html`, `/contact.html`, `/privacy.html`, `/terms.html`, `/404.html`.
- **DoD:** См. раздел [Definition of Done](#definition-of-done-dod).
- **Критерии приёмки:**
  - Все info-страницы доступны по старым URL.
  - 404.html кастомная.

---

## Эпик 6: Безопасность и инфраструктура (P2)

### 6.1 XSS защита

- **Приоритет:** P2
- **Сложность:** S
- **Статус:** backlog
- **Владелец:** TBD
- **Задача:**
  - Заменить или экранировать `dangerouslySetInnerHTML` в SEOSection и BlogSection.
  - Добавить `DOMPurify` для пользовательского контента, если он появится.
- **DoD:** См. раздел [Definition of Done](#definition-of-done-dod).
- **Критерии приёмки:**
  - Нет `dangerouslySetInnerHTML` с необработанным контентом.

### 6.2 Affiliate-ссылки

- **Приоритет:** P2
- **Сложность:** S
- **Статус:** backlog
- **Владелец:** TBD
- **Задача:** Добавить `rel="nofollow sponsored"` ко всем ссылкам на AliExpress.
- **DoD:** См. раздел [Definition of Done](#definition-of-done-dod).
- **Критерии приёмки:**
  - Все affiliate-ссылки имеют правильные rel-атрибуты.

### 6.3 Security headers и CSP

- **Приоритет:** P2
- **Сложность:** M
- **Статус:** backlog
- **Владелец:** TBD
- **Задача:**
  - Настроить CSP meta-tag или nginx headers.
  - Добавить X-Frame-Options, X-Content-Type-Options, Referrer-Policy, HSTS.
- **DoD:** См. раздел [Definition of Done](#definition-of-done-dod).
- **Критерии приёмки:**
  - Securityheaders.io показывает A или B.
  - Сайт не ломается от CSP.

### 6.4 CI/CD для v2

- **Приоритет:** P2
- **Сложность:** M
- **Статус:** backlog
- **Владелец:** TBD
- **Задача:**
  - Создать GitHub Actions workflow для сборки v2.
  - Деплой на VPS в `/var/www/smartskidka` (для prod) или `/var/www/smartskidka-beta` (для beta).
- **DoD:** См. раздел [Definition of Done](#definition-of-done-dod).
- **Критерии приёмки:**
  - Push в `main` триггерит сборку и деплой.

---

## Эпик 7: Дополнительно (P3)

### 7.1 A/B тесты

- **Приоритет:** P3
- **Сложность:** XL
- **Статус:** backlog
- **Владелец:** TBD
- **Задача:** Решить, нужен ли A/B фреймворк в v2. Если да — внедрить.

### 7.2 Улучшение AI-поиска

- **Приоритет:** P3
- **Сложность:** L-XL
- **Статус:** backlog
- **Владелец:** TBD
- **Задача:**
  - Подключить настоящую LLM/векторную семантику.
  - Или улучшить keyword matching (синонимы, морфология).

### 7.3 Отзывы и рейтинги

- **Приоритет:** P3
- **Сложность:** XL
- **Статус:** backlog
- **Владелец:** TBD
- **Задача:** Добавить отзывы с AliExpress (если API позволяет).

### 7.4 Мультиязычность

- **Приоритет:** P3
- **Сложность:** XL
- **Статус:** backlog
- **Владелец:** TBD
- **Задача:** Добавить i18n (хотя бы RU/EN).

### 7.5 Удаление мусора из репозитория

- **Приоритет:** P3
- **Сложность:** S
- **Статус:** backlog
- **Владелец:** TBD
- **Задача:**
  - Удалить `category/test-category.html`, `category/.html`, `test.html`.
  - Удалить неиспользуемые `js/products.js`, `js/products_real.js`, `js/mobile-fix.js` или перенести в архив.
  - Исправить `products/index.json` (total/counts).

---

## Рекомендуемый порядок выполнения

### Фаза 1: Блокеры (недели 1-2)

1.1 → 1.2 → 1.3 → 1.4

### Фаза 2: SEO и данные (недели 2-4)

2.1 → 2.2 → 2.3 → 3.2 → 3.3 → 2.4 → 2.5

### Фаза 3: Производительность (недели 3-5)

3.1 → 4.1 → 4.2 → 4.3 → 4.4

### Фаза 4: UX и безопасность (недели 4-6)

5.1 → 5.2 → 5.3 → 5.4 → 5.5 → 6.1 → 6.2 → 6.3

### Фаза 5: Инфраструктура и запуск (неделя 6)

6.4 → переключение домена → мониторинг

### Фаза 6: Дополнительно (после стабилизации)

7.1 → 7.2 → 7.3 → 7.4 → 7.5

---

## Метрики успеха миграции

- 0 ошибок 404 на старых URL в течение 7 дней после переключения
- Сохранение ≥90% органического трафика в течение 30 дней
- Core Web Vitals: LCP < 2.5s, CLS < 0.1, INP < 200ms
- Lighthouse SEO score ≥ 90
- Аналитика показывает события без потерь
- PWA installable
