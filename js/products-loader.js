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
    try {
        const res = await fetch(PRODUCTS_BASE + 'all.json');
        if (!res.ok) throw new Error('all.json failed: ' + res.status);
        _products = await res.json();
        window.PRODUCTS_DB = _products;
        return _products;
    } catch (e) {
        console.error('[Products] Failed to load all.json:', e);
        window.PRODUCTS_DB = [];
        return [];
    }
}

/**
 * Загружает категорию по требованию (лениво).
 * Поддерживает разбитые категории (shoes-1.json, shoes-2.json...)
 * @param {string} category — 'electronics', 'auto', 'clothing', ...
 */
async function loadCategory(category) {
    if (_loadedCategories.has(category)) return _products;
    try {
        const res = await fetch(PRODUCTS_BASE + category + '.json');
        if (res.ok) {
            const items = await res.json();
            _products = _products.filter(p => p.category !== category);
            _products.push(...items);
            _loadedCategories.add(category);
            window.PRODUCTS_DB = _products;
            return _products;
        }
        // If .json not found, try chunked loading
        if (res.status === 404) {
            return await loadChunkedCategory(category);
        }
        console.warn('[Products] Category not found: ' + category);
        return _products;
    } catch (e) {
        console.error('[Products] Failed to load ' + category + ':', e);
        return _products;
    }
}

/**
 * Загружает категорию, разбитую на части (shoes-1.json...shoes-N.json)
 */
async function loadChunkedCategory(category) {
    const items = [];
    let chunkNum = 1;
    let hasMore = true;
    while (hasMore) {
        try {
            const res = await fetch(PRODUCTS_BASE + category + '-' + chunkNum + '.json');
            if (!res.ok) {
                hasMore = false;
                break;
            }
            const chunk = await res.json();
            if (!Array.isArray(chunk) || chunk.length === 0) {
                hasMore = false;
                break;
            }
            items.push(...chunk);
            chunkNum++;
        } catch (e) {
            hasMore = false;
        }
    }
    if (items.length > 0) {
        _products = _products.filter(p => p.category !== category);
        _products.push(...items);
        _loadedCategories.add(category);
        window.PRODUCTS_DB = _products;
    }
    return _products;
}

/**
 * Загружает все категории (для поиска или «Все»).
 */
async function loadAllProducts() {
    if (_allLoaded) return _products;
    const categories = ['shoes','auto','beauty','clothing','electronics','home','jewelry','sports','toys'];
    await Promise.all(categories.map(c => loadCategory(c)));
    _allLoaded = true;
    return _products;
}

/**
 * Получить товар по ID (из уже загруженных).
 */
function getProductById(id) {
    const product = _products.find(p => p.id === id);
    if (!product) {
        console.warn('[getProductById] NOT FOUND id=' + id + ' _products.length=' + _products.length);
    }
    return product;
}

/**
 * Получить товары по категории (АСИНХРОННАЯ — загружает если нужно).
 * Эта функция используется app.js для рендеринга.
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

// Экспорт глобальных функций
window.getProductById = getProductById;
window.getProductsByCategory = getProductsByCategory;
window.getProductsByCategorySync = getProductsByCategorySync;

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
