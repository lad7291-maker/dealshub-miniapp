/* ============================================
   SmartSkidka.ru — Products Loader (Lazy)
   ============================================ */

const PRODUCTS_BASE = 'products/';

let _loadedCategories = new Set();
let _products = [];
let _allLoaded = false;

/**
 * Загружает стартовый набор (24 товара) для мгновенного рендера.
 */
async function loadInitialProducts() {
    if (_products.length > 0) return _products;
    // Use PRODUCTS_DB from js/products.js if available (sync load, faster)
    if (typeof PRODUCTS_DD !== 'undefined' && Array.isArray(PRODUCTS_DB)) {
        _products = PRODUCTS_DB;
        window.PRODUCTS_DB = _products;
        return _products;
    }
    // Fallback to fetch all.json
    try {
        const res = await fetch(PRODUCTS_BASE + 'all.json');
        if (!res.ok) throw new Error('all.json failed: ' + res.status);
        _products = await res.json();
        window.PRODUCTS_DB = _products;
        return _products;
    } catch (e) {
        window.PRODUCTS_DB = [];
        return [];
    }
}

/**
 * Загружает категорию по требованию (лениво).
 * @param {string} category — 'electronics', 'auto', 'clothing', ...
 */
async function loadCategory(category) {
    if (_loadedCategories.has(category)) return _products;
    try {
        const res = await fetch(PRODUCTS_BASE + category + '.json');
        if (!res.ok) {
    // console.warn('[Products] Category not found: ' + category);
            return _products;
        }
        const items = await res.json();
        // Удаляем старые товары этой категории (если были) и добавляем новые
        _products = _products.filter(p => p.category !== category);
        _products.push(...items);
        _loadedCategories.add(category);
        window.PRODUCTS_DB = _products;
    // console.log('[Products] Loaded ' + category + ': ' + items.length + ' items');
        return _products;
    } catch (e) {
    // console.error('[Products] Failed to load ' + category + ':', e);
        return _products;
    }
}

/**
 * Загружает все категории (для поиска или «Все»).
 */
async function loadAllProducts() {
    if (_allLoaded) return _products;
    const categories = ['auto','beauty','clothing','electronics','home','jewelry','sports','toys'];
    await Promise.all(categories.map(c => loadCategory(c)));
    _allLoaded = true;
    // console.log('[Products] All loaded: ' + _products.length + ' items');
    return _products;
}

/**
 * Получить товар по ID (из уже загруженных).
 */
function getProductById(id) {
    return _products.find(p => p.id === id);
}

/**
 * Получить товары по категории (загружает если нужно).
 */
async function getProductsByCategory(category) {
    if (category === 'all') {
        await loadAllProducts();
        return _products;
    }
    await loadCategory(category);
    return _products.filter(p => p.category === category);
}

/**
 * Синхронная версия getProductsByCategory (для обратной совместимости).
 * Возвращает уже загруженные товары.
 */
function getProductsByCategorySync(category) {
    if (category === 'all') return _products;
    return _products.filter(p => p.category === category);
}

// Экспорт глобальных функций (app.js ожидает их)
window.getProductById = getProductById;
window.getProductsByCategory = getProductsByCategorySync;

// Auto-init: загрузить стартовый набор при подключении скрипта
if (typeof document !== 'undefined') {
    loadInitialProducts();
}

// Экспорт для модульных сред
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        loadInitialProducts,
        loadCategory,
        loadAllProducts,
        getProductById,
        getProductsByCategory,
        getProductsByCategorySync
    };
}
