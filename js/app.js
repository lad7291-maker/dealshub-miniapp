// Build: 1778633786
/* ============================================
   SmartSkidka.ru — Main Application
   ============================================ */

// XSS Protection: escape HTML entities
function escapeHtml(text) {
    if (text == null) return '';
    return String(text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

// Category name mapping
const CATEGORY_NAMES = {
    'all': 'Все',
    'shoes': 'Обувь',
    'clothing': 'Одежда',
    'electronics': 'Электроника',
    'home': 'Дом',
    'auto': 'Авто',
    'beauty': 'Красота',
    'sports': 'Спорт',
    'jewelry': 'Украшения',
    'toys': 'Игрушки'
};

function getCategoryName(cat) {
    if (!cat) return cat;
    const lower = cat.toLowerCase();
    return CATEGORY_NAMES[lower] || cat;
}

// ============================================
// STATE
// ============================================
const state = {
    currentCategory: 'all',
    activeSubcategory: null,
    activeChip: 'all',
    activeTag: null,
    currentFilter: 'all',
    currentSort: 'discount-desc',
    searchQuery: '',
    displayedCount: 24,
    favorites: JSON.parse(localStorage.getItem('smartskidka_favorites') || '[]'),
    deferredPrompt: null,
    sidebarOpen: false
};

// ============================================
// DOM ELEMENTS
// ============================================
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const els = {
    productsGrid: $('#products-grid'),
    searchInput: $('#search-input'),
    searchClear: $('#search-clear'),
    categoryTabs: $$('.category-tab'),
    filterBtns: $$('.filter-btn'),
    sortSelect: $('#sort-select'),
    loadMoreBtn: $('#load-more-btn'),
    resultsInfo: $('#results-info'),
    toast: $('#toast'),
    toastIcon: $('#toast-icon'),
    toastMsg: $('#toast-message'),
    favBadge: $('#fav-badge'),
    favPanel: $('#fav-panel'),
    favOverlay: $('#fav-overlay'),
    favClose: $('#fav-close'),
    favToggle: $('#favorites-toggle'),
    favItems: $('#fav-items'),
    favEmpty: $('#fav-empty'),
    modal: $('#product-modal'),
    modalClose: $('#modal-close'),
    modalContent: $('#modal-content'),
    scrollTop: $('#scroll-top'),
    offlineInd: $('#offline-indicator'),
    installPrompt: $('#install-prompt'),
    installBtn: $('#install-btn'),
    installClose: $('#install-close'),
    logoBtn: $('#logo-btn'),
    hero: $('#hero'),
    sidebar: $('#sidebar'),
    sidebarNav: $('#sidebar-nav'),
    sidebarClose: $('#sidebar-close'),
    sidebarOverlay: null, // created dynamically
    chipsBar: $('#chips-bar'),
    catToggleBtn: $('#cat-toggle-btn')
};

// ============================================
// INITIALIZATION (async — wait for products)
// ============================================
document.addEventListener('DOMContentLoaded', async () => {
    if (typeof loadInitialProducts === 'function') {
        await loadInitialProducts();
    }
    // Handle category pages (window.INITIAL_CATEGORY from 3.1)
    if (window.INITIAL_CATEGORY && typeof loadCategory === 'function') {
        state.currentCategory = window.INITIAL_CATEGORY;
        await loadCategory(window.INITIAL_CATEGORY);
        // Set active tab
        els.categoryTabs.forEach(t => t.classList.toggle('active', t.dataset.category === window.INITIAL_CATEGORY));
    }
    initProducts();
    initSearch();
    initCategories();
    renderTagFilters();
    initFilters();
    initSort();
    initFavPanel();
    initModal();
    initScrollTop();
    initOffline();
    initInstall();
    initKeyboard();
    initAiSearch();
    initScrollTracking();
    initRecentlyViewed();
    await renderTop10();
    renderCollections();
    updateBadges();
    renderFavorites();
});

// ============================================
// PRODUCT RENDERING
// ============================================
function initProducts() {
    renderProducts().catch(console.error);
    els.loadMoreBtn.addEventListener('click', async () => {
        state.displayedCount += 24;
        await renderProducts();
        showToast('success', 'Загружено ещё товаров');
    });
}

async function getFilteredProducts() {
    let products = await getProductsByCategory(state.currentCategory);

    // Apply subcategory filter
    if (state.activeSubcategory) {
        products = products.filter(p => p.subcategory === state.activeSubcategory);
    }

    // Apply chip filter
    if (state.activeChip && state.activeChip !== 'all') {
        const chip = state.activeChip.toLowerCase();
        products = products.filter(p =>
            (p.tags || []).some(t => t.toLowerCase().includes(chip)) ||
            (p.title || '').toLowerCase().includes(chip) ||
            (p.subcategory || '').toLowerCase().includes(chip)
        );
    }

    // Apply tag filter
    if (state.activeTag) {
        const tag = state.activeTag.toLowerCase();
        products = products.filter(p =>
            (p.tags || []).some(t => t.toLowerCase().includes(tag))
        );
    }

    // Apply search (enhanced: title, category, tags, specs, aliLink)
    if (state.searchQuery) {
        const q = state.searchQuery.toLowerCase().trim();
        const words = q.split(/\s+/).filter(w => w.length > 1);
        
        if (words.length > 1) {
            // Multi-word search: ALL words must match somewhere
            products = products.filter(p => {
                const searchText = [
                    p.title || '',
                    p.category || '',
                    p.subcategory || '',
                    (p.tags || []).join(' '),
                    (p.specs && Object.values(p.specs).join(' ')) || '',
                    p.aliLink || ''
                ].join(' ').toLowerCase();
                return words.every(w => searchText.includes(w));
            });
        } else {
            // Single word search
            products = products.filter(p =>
                (p.title || '').toLowerCase().includes(q) ||
                (p.category || '').toLowerCase().includes(q) ||
                (p.subcategory || '').toLowerCase().includes(q) ||
                (p.tags || []).some(t => t.toLowerCase().includes(q)) ||
                (p.specs && Object.values(p.specs).some(v => v.toLowerCase().includes(q))) ||
                (p.aliLink || '').toLowerCase().includes(q)
            );
        }
    }

    // Apply discount filter
    if (state.currentFilter !== 'all') {
        const minDiscount = parseInt(state.currentFilter);
        products = products.filter(p => p.discount >= minDiscount);
    }

    // Apply sort
    products = sortProducts(products, state.currentSort);

    return products;
}

function sortProducts(products, sortType) {
    const sorted = [...products];
    switch (sortType) {
        case 'price-asc':
            sorted.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            sorted.sort((a, b) => b.price - a.price);
            break;
        case 'orders-desc':
            sorted.sort((a, b) => b.orders - a.orders);
            break;
        case 'discount-desc':
        default:
            sorted.sort((a, b) => b.discount - a.discount);
            break;
    }
    return sorted;
}

async function renderProducts() {
    // Check if we have AI results to show
    if (state._aiResults && state._aiResults.length > 0) {
        renderAiResults(state._aiResults);
        return;
    }
    
    const products = await getFilteredProducts();
    const displayProducts = products.slice(0, state.displayedCount);

    // Update results info
    els.resultsInfo.textContent = products.length + ' товаров';

    // Show/hide load more
    if (displayProducts.length >= products.length) {
        els.loadMoreBtn.classList.add('hidden');
    } else {
        els.loadMoreBtn.classList.remove('hidden');
    }

    // Update hero stats
    $('#total-products').textContent = products.length + '+';

    // Show/hide featured sections based on filters
    const hasActiveFilters = !!(state.currentCategory !== 'all' || (state.activeChip && state.activeChip !== 'all') || state.activeSubcategory || state.searchQuery || state.minPrice || state.maxPrice || state.activeDiscount);
    const collectionsSection = $('#collections-section');
    const top10Section = $('#top10-section');
    if (collectionsSection) collectionsSection.style.display = hasActiveFilters ? 'none' : '';
    if (top10Section) top10Section.style.display = hasActiveFilters ? 'none' : '';

    // Render grid
    if (displayProducts.length === 0) {
        els.productsGrid.innerHTML = '\n            <div class="empty-state empty-state-full">\n                <div class="empty-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></div>\n                <p class="empty-title">Ничего не найдено</p>\n                <p class="empty-subtitle">Попробуйте изменить фильтры или поисковый запрос</p>\n            </div>\n        ';
        return;
    }

    els.productsGrid.innerHTML = displayProducts.map((product, index) => createProductCard(product, index)).join('');

    // Attach event listeners to rendered cards
    attachCardListeners();
}

function createProductCard(product, index) {
    const isFav = state.favorites.includes(product.id);
    const animationDelay = (index % 24) * 0.05;
    const imgAttrs = index < 4 ? 'fetchpriority="high"' : 'loading="lazy"';
    const timerHours = Math.floor(Math.random() * 37) + 12;
    const viewers = Math.floor(Math.random() * 186) + 15;

    return `
        <div class="product-card" data-id="${product.id}" data-delay="${animationDelay}">
            <div class="discount-badge">-${product.discount}%</div>
            <button class="fav-btn ${isFav ? 'active' : ''}" data-id="${product.id}" aria-label="В избранное">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
            </button>
            <div class="product-image">
                <img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.title)}" ${imgAttrs} onerror="this.src='https://via.placeholder.com/400?text=${encodeURIComponent(product.title.substring(0,20))}'">
            </div>
            <div class="product-info">
                <h3 class="product-title">${escapeHtml(product.title)}</h3>
                ${product.tags && product.tags.length > 0 ? '<div class="product-tags">' + product.tags.slice(0,3).map(t => '<span class="product-tag" onclick="event.stopPropagation(); state.searchQuery=' + escapeHtml(JSON.stringify(t)) + '; renderProducts();">' + escapeHtml(t) + '</span>').join('') + '</div>' : ''}
                ${product.orders > 0 ? `<div class="product-orders"><span class="orders-count">${formatOrders(product.orders)} заказов</span></div>` : ''}
                <div class="product-price">
                    <span class="current-price">${product.price.toLocaleString('ru-RU')} ₽</span>
                    <span class="original-price">${product.originalPrice.toLocaleString('ru-RU')} ₽</span>
                </div>
                <div class="product-social-proof">
                    <span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; margin-right: 3px;"><path d="M17.5 19c0-1.7-1.3-3-3-3c-1.1 0-2.1.6-2.6 1.5c-.5-.9-1.5-1.5-2.6-1.5c-1.7 0-3 1.3-3 3"/><path d="M22 12c0-5.5-4.5-10-10-10S2 6.5 2 12s4.5 10 10 10"/><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5"/></svg> ${viewers} человек смотрят сейчас</span>
                </div>
                <div class="product-timer">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; margin-right: 3px;"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> Скидка действует ещё ${timerHours} часов
                </div>
                <div class="shipping-badge">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    Доставка по условиям продавца на AliExpress
                </div>
                <a href="${product.itemId ? generateDeeplink(product.itemId, product.aliLink, product.category) : product.aliLink}" class="buy-btn" data-id="${product.id}" target="_blank" rel="noopener">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                    На AliExpress →
                </a>
                <p class="affiliate-note"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; margin-right: 3px;"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2v1"/><path d="M12 7a5 5 0 0 1 5 5c0 2.5-2 4.5-5 6-3-1.5-5-3.5-5-6a5 5 0 0 1 5-5z"/></svg> Актуальная цена на AliExpress</p>
                <button class="share-btn" data-id="${product.id}" onclick="event.stopPropagation(); shareProduct(${product.id})" aria-label="Поделиться">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; margin-right: 4px;"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>Поделиться
                </button>
            </div>
        </div>
    `;
}

function formatOrders(orders) {
    if (orders >= 1000) {
        return (orders / 1000).toFixed(orders >= 10000 ? 0 : 1) + 'K';
    }
    return orders.toString();
}

function copyPromoCode(element) {
    const code = element.textContent.trim();
    navigator.clipboard.writeText(code).then(() => {
        const btn = element.closest('.promo-banner-code')?.querySelector('.promo-copy-btn');
        if (btn) {
            btn.classList.add('copied');
            btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>';
            setTimeout(() => {
                btn.classList.remove('copied');
                btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';
            }, 2000);
        }
    }).catch(() => {
        // Fallback
        const textarea = document.createElement('textarea');
        textarea.value = code;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    });
}

function attachCardListeners() {
    // Product card click (open modal) — use event delegation for reliability
    if (state._cardClickHandler) {
        els.productsGrid.removeEventListener('click', state._cardClickHandler);
    }
    state._cardClickHandler = (e) => {
        if (e.target.closest('.fav-btn') || e.target.closest('.buy-btn')) return;
        const card = e.target.closest('.product-card');
        if (!card) return;
        const id = parseInt(card.dataset.id);
        if (isNaN(id)) { console.warn('[CardClick] Invalid ID:', card.dataset.id); return; }
        console.log('[CardClick] card.dataset.id=' + card.dataset.id + ' parsed=' + id);
        openProductModal(id);
    };
    els.productsGrid.addEventListener('click', state._cardClickHandler);

    // Image zoom on long press (mouse down/up) - fills entire card
    $$('.product-image').forEach(imgContainer => {
        let isPressed = false;
        let pressTimer = null;
        const card = imgContainer.closest('.product-card');
        
        const startZoom = (e) => {
            if (e.button !== 0) return; // Only left mouse button
            isPressed = true;
            pressTimer = setTimeout(() => {
                if (isPressed && card) {
                    imgContainer.classList.add('zoom-active');
                    card.classList.add('zoom-mode');
                }
            }, 150); // Small delay to prevent accidental zoom on quick clicks
        };
        
        const endZoom = () => {
            isPressed = false;
            clearTimeout(pressTimer);
            imgContainer.classList.remove('zoom-active');
            if (card) card.classList.remove('zoom-mode');
        };
        
        const cancelZoom = () => {
            isPressed = false;
            clearTimeout(pressTimer);
            imgContainer.classList.remove('zoom-active');
            if (card) card.classList.remove('zoom-mode');
        };
        
        imgContainer.addEventListener('mousedown', startZoom);
        imgContainer.addEventListener('mouseup', endZoom);
        imgContainer.addEventListener('mouseleave', cancelZoom);
        imgContainer.addEventListener('dragstart', (e) => e.preventDefault());
        
        // Touch support for mobile
        imgContainer.addEventListener('touchstart', (e) => {
            isPressed = true;
            pressTimer = setTimeout(() => {
                if (isPressed && card) {
                    imgContainer.classList.add('zoom-active');
                    card.classList.add('zoom-mode');
                }
            }, 150);
        }, {passive: true});
        
        imgContainer.addEventListener('touchend', endZoom);
        imgContainer.addEventListener('touchcancel', cancelZoom);
    });

    // Favorite button
    $$('.fav-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = parseInt(btn.dataset.id);
            toggleFavorite(id);
            btn.classList.toggle('active');
        });
    });

    // Buy button tracking
    $$('.buy-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = parseInt(btn.dataset.id);
            if (typeof gtag === 'function') gtag('event', 'click_outbound', {item_id: id, value: getProductById(id)?.price || 0, currency: 'RUB'});
            if (typeof ym === 'function') ym(109145874, 'reachGoal', 'click_outbound', {item_id: id});
        });
    });
}

// ============================================
// SEARCH
// ============================================

// Tag filter functions
function renderTagFilters() {
    // Disabled — no tag chips
    return;
}

function filterByTag(tag) {
    state.activeTag = tag;
    renderTagFilters();
    
    // Reset to page 1 when filter changes
    state.displayedCount = state.productsPerPage;
    
    renderProducts().catch(console.error);
    
    // Scroll to products
    document.getElementById('products-grid').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function initSearch() {
    let debounceTimer;
    els.searchInput.addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        const query = e.target.value;
        els.searchClear.classList.toggle('hidden', !query);

        debounceTimer = setTimeout(async () => {
            state.searchQuery = query;
            state.displayedCount = 24;
            state._aiResults = null;

            if (query && state.currentCategory === 'all' && typeof loadAllProducts === 'function') {
                await loadAllProducts().catch(() => {});
            }

            renderProducts().catch(console.error);

            if (query) {
                els.hero.style.display = 'none';
                // ANA-001: search event
                if (typeof gtag === 'function') gtag('event', 'search', {search_term: query, category: state.currentCategory});
                if (typeof ym === 'function') ym(109145874, 'reachGoal', 'search', {query: query});
            } else {
                els.hero.style.display = 'block';
            }
        }, 300);
    });

    els.searchClear.addEventListener('click', () => {
        els.searchInput.value = '';
        els.searchClear.classList.add('hidden');
        state.searchQuery = '';
        state.displayedCount = 24;
        state._aiResults = null;
        els.hero.style.display = 'block';
        renderProducts().catch(console.error);
        els.searchInput.focus();
    });

    // Logo reset
    els.logoBtn.addEventListener('click', (e) => {
        e.preventDefault();
        state.searchQuery = '';
        state.currentCategory = 'all';
        state.currentFilter = 'all';
        state.currentSort = 'discount-desc';
        state.displayedCount = 24;
        els.searchInput.value = '';
        els.searchClear.classList.add('hidden');
        els.hero.style.display = 'block';

        // Reset tabs
        els.categoryTabs.forEach(t => t.classList.toggle('active', t.dataset.category === 'all'));
        els.filterBtns.forEach(f => f.classList.toggle('active', f.dataset.filter === 'all'));
        els.sortSelect.value = 'discount-desc';
        state._aiResults = null;

        renderProducts().catch(console.error);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ============================================
// AI SEARCH (Smart offline keyword search via API)
// ============================================
const AI_SEARCH_LIMIT = 3;
const AI_SEARCH_RESET_HOURS = 24;

function getAiSearchState() {
    const now = Date.now();
    const lastReset = parseInt(localStorage.getItem('aiSearchLastReset') || '0');
    const used = parseInt(localStorage.getItem('aiSearchUsed') || '0');
    
    // Reset if 24h passed
    if (now - lastReset > AI_SEARCH_RESET_HOURS * 3600 * 1000) {
        localStorage.setItem('aiSearchLastReset', now.toString());
        localStorage.setItem('aiSearchUsed', '0');
        return { remaining: AI_SEARCH_LIMIT, used: 0 };
    }
    
    return { remaining: Math.max(0, AI_SEARCH_LIMIT - used), used };
}

function incrementAiSearchUsed() {
    const used = parseInt(localStorage.getItem('aiSearchUsed') || '0');
    localStorage.setItem('aiSearchUsed', (used + 1).toString());
    updateAiSearchUI();
}

function updateAiSearchUI() {
    const { remaining } = getAiSearchState();
    const btn = document.getElementById('ai-search-btn');
    const info = document.getElementById('ai-search-info');
    if (btn) btn.disabled = remaining <= 0;
    if (info) info.textContent = `AI-поиск: ${remaining} из ${AI_SEARCH_LIMIT} осталось`;
}

async function doAiSearch(query) {
    if (!query || query.length < 2) {
        showToast('info', 'Введите запрос для AI-поиска');
        return;
    }
    
    const { remaining } = getAiSearchState();
    if (remaining <= 0) {
        showToast('error', 'Лимит AI-поиска исчерпан (3 запроса в сутки)');
        return;
    }
    
    showToast('info', 'Ищу умно...');
    
    try {
        const res = await fetch(`/api/ai-search?q=${encodeURIComponent(query)}`, {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
        });
        
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        
        const data = await res.json();
        
        if (data.error) {
            throw new Error(data.error);
        }
        
        incrementAiSearchUsed();
        if (typeof gtag === 'function') gtag('event', 'ai_search', {search_term: query});
        if (typeof ym === 'function') ym(109145874, 'reachGoal', 'ai_search', {query: query});
        
        if (data.results && data.results.length > 0) {
            // Inject AI results into _products for rendering
            const aiProducts = data.results.map(r => ({
                id: r.id,
                title: r.title,
                category: r.category || 'home',
                image: r.image || '',
                price: r.price || 0,
                originalPrice: r.originalPrice || r.price * 1.5,
                discount: r.discount || 0,
                rating: 0,
                orders: r.orders || 0,
                specs: r.specs || {Тип: r.category || 'Товар'},
                tags: r.tags || [],
                aliLink: r.aliLink || '',
                _aiResult: true
            }));
            
            // Temporarily override products for this render
            state._aiResults = aiProducts;
            state.searchQuery = '';
            state.displayedCount = aiProducts.length;
            els.hero.style.display = 'none';
            els.loadMoreBtn.classList.add('hidden');
            els.resultsInfo.textContent = 'AI-поиск: найдено ' + aiProducts.length + ' товаров';
            
            renderAiResults(aiProducts);
            showToast('success', `Найдено ${aiProducts.length} товаров!`);
        } else {
            showToast('info', 'AI не нашёл товаров, пробую обычный поиск...');
            state.searchQuery = query;
            state._aiResults = null;
            renderProducts().catch(console.error);
        }
    } catch (e) {
        console.error('[AI Search] Error:', e);
        showToast('error', 'AI-поиск недоступен, использую обычный');
        state.searchQuery = query;
        state._aiResults = null;
        renderProducts().catch(console.error);
    }
}

function renderAiResults(products) {
    if (products.length === 0) {
        els.productsGrid.innerHTML = '\n            <div class="empty-state empty-state-full">\n                <div class="empty-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z"/><path d="M9 21h6"/></svg></div>\n                <p class="empty-title">Ничего не найдено</p>\n                <p class="empty-subtitle">Попробуйте изменить запрос</p>\n            </div>\n        ';
        return;
    }

    els.productsGrid.innerHTML = products.map((product, index) => createProductCard(product, index)).join('');
    attachCardListeners();
}

function initAiSearch() {
    updateAiSearchUI();
    
    const btn = document.getElementById('ai-search-btn');
    if (btn) {
        btn.addEventListener('click', () => {
            const query = els.searchInput.value.trim();
            doAiSearch(query);
        });
    }
}

// ============================================
// SIDEBAR & CATEGORIES
// ============================================

// Category config — only main categories
const CATEGORY_CONFIG = {
    'all': { name: 'Все', icon: '⊞' },
    'electronics': { name: 'Электроника', icon: '💻' },
    'clothing': { name: 'Одежда', icon: '👕' },
    'shoes': { name: 'Обувь', icon: '👟' },
    'home': { name: 'Дом', icon: '🏠' },
    'auto': { name: 'Авто', icon: '🚗' },
    'beauty': { name: 'Красота', icon: '💄' },
    'sports': { name: 'Спорт', icon: '⚽' }
};

// Chips config per category
const CHIPS_CONFIG = {
    'all': ['Все', 'Для детей', 'Аксессуары', 'Брендовое'],
    'electronics': ['Все', 'Накопители', 'Периферия', 'Для ноутбука', 'Сети', 'Планшеты'],
    'clothing': ['Все', 'Мужское', 'Женское', 'Сумки', 'Рюкзаки', 'Детское'],
    'shoes': ['Все', 'Кроссовки', 'Бег', 'Баскетбол', 'Nike', 'Adidas'],
    'home': ['Все', 'Кухня', 'Ванная', 'Для малыша', 'Стройка'],
    'auto': ['Все', 'Двигатель', 'Свет', 'Инструменты', 'Мото'],
    'beauty': ['Все', 'Стоматология', 'Маникюр', 'Волосы', 'Парфюм'],
    'sports': ['Все', 'Лыжи', 'Сумки', 'Активный отдых']
};

function initCategories() {
    // Create sidebar overlay
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    overlay.id = 'sidebar-overlay';
    document.body.appendChild(overlay);
    els.sidebarOverlay = overlay;
    
    // Render sidebar
    renderSidebar();
    
    // Render chips
    renderChips();
    
    // Sidebar toggle (mobile)
    if (els.catToggleBtn) {
        els.catToggleBtn.addEventListener('click', openSidebar);
    }
    if (els.sidebarClose) {
        els.sidebarClose.addEventListener('click', closeSidebar);
    }
    els.sidebarOverlay.addEventListener('click', closeSidebar);
    
    // Legacy category tabs (if still present)
    els.categoryTabs.forEach(tab => {
        tab.addEventListener('click', async () => {
            els.categoryTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            state.currentCategory = tab.dataset.category;
            state.activeSubcategory = null;
            state.activeChip = 'all';
            state.displayedCount = 24;

            if (typeof loadCategory === 'function' && state.currentCategory !== 'all') {
                await loadCategory(state.currentCategory);
            } else if (state.currentCategory === 'all' && typeof loadAllProducts === 'function') {
                await loadAllProducts().catch(() => {});
            }

            renderChips();
            renderProducts().catch(console.error);
            const section = document.getElementById('products-section');
            if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            if (typeof gtag === 'function') gtag('event', 'select_content', {content_type: 'category', item_id: tab.dataset.category});
            if (typeof ym === 'function') ym(109145874, 'reachGoal', 'category', {category: tab.dataset.category});
        });
    });
}

function renderSidebar() {
    if (!els.sidebarNav) return;
    
    // Get counts from current products
    const counts = {};
    const allProducts = window.PRODUCTS_DB || [];
    for (const p of allProducts) {
        counts[p.category] = (counts[p.category] || 0) + 1;
    }
    
    let html = '';
    for (const [cat, config] of Object.entries(CATEGORY_CONFIG)) {
        const count = counts[cat] || 0;
        const isActive = state.currentCategory === cat;

        html += `
            <div class="sidebar-category ${isActive ? 'expanded' : ''}" data-category="${cat}">
                <button class="sidebar-cat-btn ${isActive ? 'active' : ''}" data-category="${cat}">
                    <span>${config.icon} ${config.name}</span>
                    <span class="cat-count">${count > 0 ? count : ''}</span>
                </button>
            </div>
        `;
    }

    els.sidebarNav.innerHTML = html;

    // Attach listeners
    els.sidebarNav.querySelectorAll('.sidebar-cat-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const cat = btn.dataset.category;
            state.currentCategory = cat;
            state.activeSubcategory = null;
            state.activeChip = 'all';
            state.displayedCount = 24;

            if (typeof loadCategory === 'function' && cat !== 'all') {
                await loadCategory(cat);
            } else if (cat === 'all' && typeof loadAllProducts === 'function') {
                await loadAllProducts().catch(() => {});
            }

            renderSidebar();
            renderChips();
            renderProducts().catch(console.error);
            closeSidebar();

            const section = document.getElementById('products-section');
            if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
}

function renderChips() {
    if (!els.chipsBar) return;
    const chips = CHIPS_CONFIG[state.currentCategory] || CHIPS_CONFIG['all'];
    
    let html = '';
    for (const chip of chips) {
        const isActive = state.activeChip === chip || (chip === 'Все' && state.activeChip === 'all');
        html += `<button class="chip ${isActive ? 'active' : ''}" data-chip="${chip === 'Все' ? 'all' : chip}">${chip}</button>`;
    }
    
    els.chipsBar.innerHTML = html;
    
    els.chipsBar.querySelectorAll('.chip').forEach(btn => {
        btn.addEventListener('click', () => {
            state.activeChip = btn.dataset.chip;
            state.displayedCount = 24;
            renderChips();
            renderProducts().catch(console.error);
        });
    });
}

function openSidebar() {
    state.sidebarOpen = true;
    if (els.sidebar) els.sidebar.classList.add('open');
    if (els.sidebarOverlay) els.sidebarOverlay.classList.add('open');
    document.body.classList.add('no-scroll');
}

function closeSidebar() {
    state.sidebarOpen = false;
    if (els.sidebar) els.sidebar.classList.remove('open');
    if (els.sidebarOverlay) els.sidebarOverlay.classList.remove('open');
    document.body.classList.remove('no-scroll');
}

// ============================================
// FILTERS & SORT
// ============================================
function initFilters() {
    els.filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            els.filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.currentFilter = btn.dataset.filter;
            state.displayedCount = 24;
            renderProducts().catch(console.error);
            // ANA-002: filter event
            if (typeof gtag === 'function') gtag('event', 'select_content', {content_type: 'filter', item_id: btn.dataset.filter});
            if (typeof ym === 'function') ym(109145874, 'reachGoal', 'filter', {filter: btn.dataset.filter});
        });
    });
}

function initSort() {
    els.sortSelect.addEventListener('change', (e) => {
        state.currentSort = e.target.value;
        state.displayedCount = 24;
        renderProducts().catch(console.error);
        // ANA-003: sort event
        if (typeof gtag === 'function') gtag('event', 'select_content', {content_type: 'sort', item_id: e.target.value});
        if (typeof ym === 'function') ym(109145874, 'reachGoal', 'sort', {sort: e.target.value});
    });
}

// ============================================
// PRODUCT MODAL
// ============================================
function initModal() {
    els.modalClose.addEventListener('click', closeProductModal);
    els.modal.addEventListener('click', (e) => {
        if (e.target === els.modal) closeProductModal();
    });
}

function openProductModal(id) {
    const product = getProductById(id);
    console.log('[openProductModal] id=' + id + ' product=' + (product ? product.title.substring(0,40) : 'NOT FOUND'));
    if (!product) return;

    // Analytics: view item
    if (typeof gtag === 'function') gtag('event', 'view_item', {item_id: id, item_name: product.title, price: product.price});
    if (typeof ym === 'function') ym(109145874, 'reachGoal', 'view_item');

    const isFav = state.favorites.includes(id);
    const savings = product.originalPrice - product.price;

    els.modalContent.innerHTML = `
        <div class="modal-image-section">
            <img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.title)}" loading="lazy" onerror="this.src='https://via.placeholder.com/600?text=${encodeURIComponent(product.title.substring(0,20))}'">
        </div>
        <div class="modal-details">
            <span class="modal-discount">Экономия ${product.discount}% — ${Math.round(savings).toLocaleString('ru-RU')} ₽</span>
            <h2 class="modal-title">${escapeHtml(product.title)}</h2>
            ${product.orders > 0 ? `<div class="modal-orders-row"><span class="orders-count">${formatOrders(product.orders)} заказов</span></div>` : ''}
            <div class="modal-price-row">
                <span class="modal-current-price">${product.price.toLocaleString('ru-RU')} ₽</span>
                <span class="modal-original-price">${product.originalPrice.toLocaleString('ru-RU')} ₽</span>
                <span class="modal-save">Скидка ${Math.round(savings).toLocaleString('ru-RU')} ₽</span>
            </div>
            <div class="modal-specs">
                ${Object.entries(product.specs).map(([key, val]) => {
                    let displayVal = val;
                    if (key === 'Тип' || key === 'Category') {
                        displayVal = getCategoryName(val);
                    }
                    return '\n                    <div class="spec-row">\n                        <span class="spec-label">' + escapeHtml(key) + '</span>\n                        <span class="spec-value">' + escapeHtml(displayVal) + '</span>\n                    </div>\n                ';
                }).join('')}
            </div>
            <div class="shipping-badge shipping-badge-sm">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                Доставка по условиям продавца на AliExpress
            </div>
            <div class="modal-actions">
                <a href="${product.itemId ? generateDeeplink(product.itemId, product.aliLink, product.category) : product.aliLink}" class="buy-btn" target="_blank" rel="noopener" onclick="showToast('success', 'Переход на AliExpress...'); if(typeof gtag==='function')gtag('event','purchase',{item_id:${product.id},value:${product.price},currency:'RUB'}); if(typeof ym==='function')ym(109145874,'reachGoal','purchase');">
                    Купить на AliExpress →
                </a>
                <p class="affiliate-note"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; margin-right: 4px;"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2v1"/><path d="M12 7a5 5 0 0 1 5 5c0 2.5-2 4.5-5 6-3-1.5-5-3.5-5-6a5 5 0 0 1 5-5z"/></svg>Актуальная цена на AliExpress</p>
                <button class="modal-fav-btn" onclick="toggleFavorite(${product.id}); updateModalFavBtn(this, ${product.id})">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="${isFav ? 'var(--discount-red)' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                    ${isFav ? 'В избранном' : 'В избранное'}
                </button>
            </div>
        </div>
    `;

    els.modal.classList.remove('hidden');
    document.body.classList.add('no-scroll');
    
    // Attach zoom handlers to modal image
    attachModalZoom();
}

function attachModalZoom() {
    const imgSection = els.modalContent.querySelector('.modal-image-section');
    const modalContent = els.modalContent;
    if (!imgSection || !modalContent) return;
    
    let isPressed = false;
    let pressTimer = null;
    
    const startZoom = (e) => {
        if (e.button !== 0) return;
        isPressed = true;
        pressTimer = setTimeout(() => {
            if (isPressed) {
                imgSection.classList.add('zoom-active');
                modalContent.classList.add('zoom-mode');
            }
        }, 150);
    };
    
    const endZoom = () => {
        isPressed = false;
        clearTimeout(pressTimer);
        imgSection.classList.remove('zoom-active');
        modalContent.classList.remove('zoom-mode');
    };
    
    const cancelZoom = () => {
        isPressed = false;
        clearTimeout(pressTimer);
        imgSection.classList.remove('zoom-active');
        modalContent.classList.remove('zoom-mode');
    };
    
    imgSection.addEventListener('mousedown', startZoom);
    imgSection.addEventListener('mouseup', endZoom);
    imgSection.addEventListener('mouseleave', cancelZoom);
    imgSection.addEventListener('dragstart', (e) => e.preventDefault());
    
    // Touch support
    imgSection.addEventListener('touchstart', (e) => {
        isPressed = true;
        pressTimer = setTimeout(() => {
            if (isPressed) {
                imgSection.classList.add('zoom-active');
                modalContent.classList.add('zoom-mode');
            }
        }, 150);
    }, {passive: true});
    
    imgSection.addEventListener('touchend', endZoom);
    imgSection.addEventListener('touchcancel', cancelZoom);
}

function closeProductModal() {
    els.modal.classList.add('hidden');
    document.body.classList.remove('no-scroll');
}

function updateModalFavBtn(btn, id) {
    const isFav = state.favorites.includes(id);
    btn.innerHTML = '\n        <svg width="16" height="16" viewBox="0 0 24 24" fill="' + (isFav ? 'var(--discount-red)' : 'none') + '" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>\n        ' + (isFav ? 'В избранном' : 'В избранное') + '\n    ';
    renderProducts().catch(console.error);
    renderFavorites();
}

// ============================================
// FAVORITES
// ============================================
function initFavPanel() {
    els.favToggle.addEventListener('click', openFavorites);
    els.favClose.addEventListener('click', closeFavorites);
    els.favOverlay.addEventListener('click', closeFavorites);
}

function openFavorites() {
    els.favPanel.classList.remove('hidden');
    els.favOverlay.classList.remove('hidden');
    document.body.classList.add('no-scroll');
    renderFavorites();
}

function closeFavorites() {
    els.favPanel.classList.add('hidden');
    els.favOverlay.classList.add('hidden');
    document.body.classList.remove('no-scroll');
}

const FAV_MAX_SIZE = 100;

function toggleFavorite(productId) {
    const idx = state.favorites.indexOf(productId);
    if (idx > -1) {
        state.favorites.splice(idx, 1);
        showToast('info', 'Удалено из избранного');
        if (typeof gtag === 'function') gtag('event', 'remove_from_favorites', {item_id: productId});
        if (typeof ym === 'function') ym(109145874, 'reachGoal', 'remove_from_favorites');
    } else {
        if (state.favorites.length >= FAV_MAX_SIZE) {
            const removed = state.favorites.shift();
            showToast('info', 'Избранное переполнено (макс. 100). Удалён самый старый товар.');
            if (typeof gtag === 'function') gtag('event', 'remove_from_favorites', {item_id: removed});
        }
        state.favorites.push(productId);
        showToast('success', 'Добавлено в избранное');
        if (typeof gtag === 'function') gtag('event', 'add_to_favorites', {item_id: productId});
        if (typeof ym === 'function') ym(109145874, 'reachGoal', 'add_to_favorites');
    }
    saveFavorites();
    updateBadges();
    renderFavorites();
    renderProducts().catch(console.error);
}

function saveFavorites() {
    localStorage.setItem('smartskidka_favorites', JSON.stringify(state.favorites));
}

function renderFavorites() {
    if (state.favorites.length === 0) {
        els.favEmpty.classList.remove('hidden');
        els.favItems.classList.add('hidden');
        return;
    }

    els.favEmpty.classList.add('hidden');
    els.favItems.classList.remove('hidden');

    els.favItems.innerHTML = state.favorites.map(id => {
        const product = getProductById(id);
        if (!product) return '';

        return `
            <div class="fav-item">
                <img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.title)}" class="fav-item-img" loading="lazy" onerror="this.src='https://via.placeholder.com/72?text=?'">
                <div class="fav-item-details">
                    <div class="fav-item-title">${escapeHtml(product.title)}</div>
                    <div class="fav-item-price">${product.price.toLocaleString('ru-RU')} ₽</div>
                    <div class="fav-item-original">${product.originalPrice.toLocaleString('ru-RU')} ₽</div>
                    <div class="fav-item-actions">
                        <a href="${product.itemId ? generateDeeplink(product.itemId, product.aliLink, product.category) : product.aliLink}" class="fav-buy-btn" target="_blank" rel="noopener">Купить на AliExpress →</a>
                        <button class="fav-remove-btn" onclick="toggleFavorite(${product.id})">Удалить</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// ============================================
// BADGES
// ============================================
function updateBadges() {
    els.favBadge.textContent = state.favorites.length;
    els.favBadge.classList.toggle('hidden', state.favorites.length === 0);
}

// ============================================
// TOAST
// ============================================
function showToast(type, message) {
    els.toast.className = 'toast ' + type;
    els.toastMsg.textContent = message;

    const icons = {
        success: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
        info: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',
        error: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>'
    };
    els.toastIcon.innerHTML = icons[type] || icons.info;

    els.toast.classList.add('show');

    clearTimeout(window._toastTimer);
    window._toastTimer = setTimeout(() => {
        els.toast.classList.remove('show');
    }, 2500);
}

// ============================================
// SCROLL TO TOP
// ============================================
function initScrollTop() {
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        els.scrollTop.classList.toggle('hidden', window.scrollY < 500);
        // Glassmorphism effect on header
        if (header) {
            header.classList.toggle('scrolled', window.scrollY > 100);
        }
    });
    els.scrollTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ============================================
// OFFLINE DETECTION
// ============================================
function initOffline() {
    const updateOnline = () => {
        els.offlineInd.classList.toggle('hidden', navigator.onLine);
        if (!navigator.onLine) {
            showToast('info', 'Офлайн-режим активирован');
        }
    };
    window.addEventListener('online', () => {
        els.offlineInd.classList.add('hidden');
        showToast('success', 'Соединение восстановлено');
    });
    window.addEventListener('offline', updateOnline);
    updateOnline();
}

// ============================================
// PWA INSTALL PROMPT
// ============================================
function initInstall() {
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        state.deferredPrompt = e;
        els.installPrompt.classList.remove('hidden');
    });

    els.installBtn.addEventListener('click', async () => {
        if (!state.deferredPrompt) return;
        state.deferredPrompt.prompt();
        const { outcome } = await state.deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            showToast('success', 'Приложение установлено!');
            // ANA-005: install_pwa event
            if (typeof gtag === 'function') gtag('event', 'install_pwa');
            if (typeof ym === 'function') ym(109145874, 'reachGoal', 'install_pwa');
        }
        state.deferredPrompt = null;
        els.installPrompt.classList.add('hidden');
    });

    els.installClose.addEventListener('click', () => {
        els.installPrompt.classList.add('hidden');
    });

    // Hide on appinstalled
    window.addEventListener('appinstalled', () => {
        els.installPrompt.classList.add('hidden');
        state.deferredPrompt = null;
    });
}

// ============================================
// KEYBOARD SHORTCUTS
// ============================================
function initKeyboard() {
    document.addEventListener('keydown', (e) => {
        // ESC closes modals/panels
        if (e.key === 'Escape') {
            closeProductModal();
            closeFavorites();
        }
        // / focuses search
        if (e.key === '/' && document.activeElement !== els.searchInput) {
            e.preventDefault();
            els.searchInput.focus();
        }
    });
}

// ============================================
// EXPOSE TO GLOBAL SCOPE (for HTML onclick handlers)
// ============================================
window.toggleFavorite = toggleFavorite;
window.showToast = showToast;
window.openProductModal = openProductModal;
window.closeProductModal = closeProductModal;
window.updateModalFavBtn = updateModalFavBtn;

function shareProduct(productId) {
    const product = getProductById(productId);
    if (!product) return;
    const shareData = {
        title: product.title,
        text: `Скидка ${product.discount}% — ${product.price.toLocaleString('ru-RU')} ₽ на AliExpress`,
        url: `https://smart-skidka.ru/item/${product.id}.html`
    };
    if (navigator.share) {
        navigator.share(shareData).catch(() => {});
    } else {
        navigator.clipboard.writeText(shareData.url).then(() => showToast('success', 'Ссылка скопирована!'));
    }
}
window.shareProduct = shareProduct;

// ============================================
// SCROLL TRACKING (ANA-004)
// ============================================
function initScrollTracking() {
    const scrollMarks = {25: false, 50: false, 75: false, 90: false};
    window.addEventListener('scroll', () => {
        const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        for (const [mark, fired] of Object.entries(scrollMarks)) {
            if (!fired && scrollPercent >= parseInt(mark)) {
                scrollMarks[mark] = true;
                if (typeof gtag === 'function') gtag('event', `scroll_${mark}`);
                if (typeof ym === 'function') ym(109145874, 'reachGoal', `scroll_${mark}`);
            }
        }
    });
}

// ============================================
// RECENTLY VIEWED (FTR-005)
// ============================================
const RV_KEY = 'smartskidka_recently_viewed';
const RV_MAX = 8;

function addToRecentlyViewed(productId) {
    let rv = JSON.parse(localStorage.getItem(RV_KEY) || '[]');
    rv = rv.filter(id => id !== productId);
    rv.unshift(productId);
    if (rv.length > RV_MAX) rv = rv.slice(0, RV_MAX);
    localStorage.setItem(RV_KEY, JSON.stringify(rv));
}

function initRecentlyViewed() {
    const rv = JSON.parse(localStorage.getItem(RV_KEY) || '[]');
    const container = document.getElementById('recently-viewed');
    if (!container || rv.length === 0) return;
    
    const products = rv.map(id => getProductById(id)).filter(Boolean);
    if (products.length === 0) {
        // Clear invalid IDs from localStorage
        const validIds = rv.filter(id => getProductById(id));
        localStorage.setItem(RV_KEY, JSON.stringify(validIds));
        return;
    }
    
    container.innerHTML = products.map(p => `
        <a href="/item/${p.id}.html" class="recent-card">
            <img src="${escapeHtml(p.image)}" alt="${escapeHtml(p.title)}" loading="lazy">
            <span class="recent-discount">-${p.discount}%</span>
            <span class="recent-title">${escapeHtml(p.title.substring(0, 30))}</span>
            <span class="recent-price">${p.price.toLocaleString('ru-RU')} ₽</span>
        </a>
    `).join('');
    container.closest('.recently-viewed-section').classList.remove('hidden');
}

// Hook into modal open
const _origOpenModal = openProductModal;
window.openProductModal = function(id) {
    addToRecentlyViewed(id);
    return _origOpenModal(id);
};

// ============================================
// TOP-10 WEEKLY (FTR-003)
// ============================================
async function renderTop10() {
    const container = document.getElementById('top10-grid');
    if (!container) return;
    
    // Wait for products to be loaded
    if (typeof loadAllProducts === 'function') {
        await loadAllProducts().catch(() => {});
    }
    
    // Get top 10 by orders (proxy for popularity)
    const all = getProductsByCategorySync('all');
    if (!all || !Array.isArray(all) || all.length === 0) {
        container.innerHTML = '';
        return;
    }
    const top10 = [...all].sort((a, b) => b.orders - a.orders).slice(0, 10);
    
    container.innerHTML = top10.map((p, i) => `
        <a href="/item/${p.id}.html" class="top10-card" data-delay="${i * 0.05}">
            <span class="top10-rank">${i + 1}</span>
            <img src="${escapeHtml(p.image)}" alt="${escapeHtml(p.title)}" loading="lazy">
            <div class="top10-info">
                <span class="top10-title">${escapeHtml(p.title.substring(0, 40))}</span>
                <span class="top10-price">${p.price.toLocaleString('ru-RU')} ₽</span>
                ${p.orders > 0 ? `<span class="top10-orders">${formatOrders(p.orders)} заказов</span>` : ''}
            </div>
            <span class="top10-discount">-${p.discount}%</span>
        </a>
    `).join('');
}

// ============================================
// COLLECTIONS (FTR-004)
// ============================================
function renderCollections() {
    const container = document.getElementById('collections-grid');
    if (!container) return;
    
    const icons = {
        electronics: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 9h6v6H9z"/></svg>',
        clothing: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/></svg>',
        shoes: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 11 3.8 11 8c0 1.25-.5 2-1 3"/><path d="M4 16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-2.5"/><path d="M10 16V9a2 2 0 0 1 2-2h.5"/></svg>',
        home: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>'
    };
    
    const collections = [
        { title: 'Скидки до 90% на электронику', filter: '90', category: 'electronics' },
        { title: 'Топ одежды со скидками 70%+', filter: '70', category: 'clothing' },
        { title: 'Лучшие цены на кроссовки', filter: 'all', category: 'shoes' },
        { title: 'Всё для дома до 1000₽', filter: 'all', category: 'home' },
    ];
    
    container.innerHTML = collections.map(c => `
        <a href="/${c.category}.html?filter=${c.filter}" class="collection-card">
            <span class="collection-icon">${icons[c.category] || ''}</span>
            <span class="collection-title">${c.title}</span>
            <span class="collection-arrow">→</span>
        </a>
    `).join('');
}

// ============================================
// A/B TESTING FRAMEWORK (5.4)
// ============================================
const AB_TESTS = {
    // Test 1: Button text (UX-001)
    btn_text: {
        name: 'btn_text',
        variants: [
            { id: 'a', label: 'На AliExpress →' },
            { id: 'b', label: 'Купить со скидкой →' }
        ]
    },
    // Test 2: Timer visibility (UX-005)
    timer: {
        name: 'timer',
        variants: [
            { id: 'a', label: 'with_timer' },
            { id: 'b', label: 'no_timer' }
        ]
    },
    // Test 3: Sticky CTA (UX-007)
    sticky: {
        name: 'sticky',
        variants: [
            { id: 'a', label: 'with_sticky' },
            { id: 'b', label: 'no_sticky' }
        ]
    },
    // Test 4: Social proof (UX-006)
    social: {
        name: 'social',
        variants: [
            { id: 'a', label: 'with_social' },
            { id: 'b', label: 'no_social' }
        ]
    }
};

function getAbVariant(testName) {
    const test = AB_TESTS[testName];
    if (!test) return 'a';
    
    const storageKey = 'ab_' + testName;
    let variant = localStorage.getItem(storageKey);
    
    if (!variant || !test.variants.find(v => v.id === variant)) {
        // Random assignment (50/50)
        variant = Math.random() < 0.5 ? 'a' : 'b';
        localStorage.setItem(storageKey, variant);
    }
    
    return variant;
}

function trackAbEvent(testName, eventName, params) {
    const variant = getAbVariant(testName);
    const eventData = Object.assign({ ab_test: testName, ab_variant: variant }, params || {});
    
    if (typeof gtag === 'function') {
        gtag('event', eventName, eventData);
    }
    if (typeof ym === 'function') {
        ym(109145874, 'reachGoal', 'ab_' + eventName, eventData);
    }
}

// Expose for debugging
window.getAbVariant = getAbVariant;
window.trackAbEvent = trackAbEvent;
