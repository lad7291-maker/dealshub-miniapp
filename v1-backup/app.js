/* ============================================
   SmartSkidka.ru — Main Application
   ============================================ */

// ============================================
// STATE
// ============================================
const state = {
  currentCategory: 'all',
  currentFilter: 'all',
  currentSort: 'discount-desc',
  searchQuery: '',
  minPrice: null,
  maxPrice: null,
  displayedCount: 24,
  favorites: JSON.parse(localStorage.getItem('smartskidka_favorites') || '[]'),
  deferredPrompt: null,
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
  priceMin: $('#price-min'),
  priceMax: $('#price-max'),
  priceApply: $('#price-apply'),
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
};

// ============================================
// INITIALIZATION (async — wait for products)
// ============================================
document.addEventListener('DOMContentLoaded', async () => {
  // Wait for initial products (lazy loader)
  if (typeof loadInitialProducts === 'function') {
    await loadInitialProducts();
  }
  convertAllLinksToDeeplinks();
  initProducts();
  initSearch();
  initCategories();
  initFilters();
  initSort();
  initFavPanel();
  initModal();
  initScrollTop();
  initOffline();
  initInstall();
  initKeyboard();
  initAiSearch();
  updateBadges();
  renderFavorites();
});

// ============================================
// PRODUCT RENDERING
// ============================================
function initProducts() {
  renderProducts();
  els.loadMoreBtn.addEventListener('click', () => {
    state.displayedCount += 24;
    renderProducts();
    showToast('success', 'Загружено ещё товаров');
  });
}

function getFilteredProducts() {
  let products = getProductsByCategory(state.currentCategory);

  // Apply search (enhanced: title, category, tags, specs, aliLink)
  if (state.searchQuery) {
    const q = state.searchQuery.toLowerCase().trim();
    const words = q.split(/\s+/).filter((w) => w.length > 2);

    if (words.length > 1) {
      // Multi-word search: ALL words must match somewhere
      products = products.filter((p) => {
        const searchText = [
          p.title || '',
          p.category || '',
          (p.tags || []).join(' '),
          (p.specs && Object.values(p.specs).join(' ')) || '',
          p.aliLink || '',
        ]
          .join(' ')
          .toLowerCase();
        return words.every((w) => searchText.includes(w));
      });
    } else {
      // Single word search
      products = products.filter(
        (p) =>
          (p.title || '').toLowerCase().includes(q) ||
          (p.category || '').toLowerCase().includes(q) ||
          (p.tags || []).some((t) => t.toLowerCase().includes(q)) ||
          (p.specs && Object.values(p.specs).some((v) => v.toLowerCase().includes(q))) ||
          (p.aliLink || '').toLowerCase().includes(q)
      );
    }
  }

  // Apply discount filter
  if (state.currentFilter !== 'all') {
    const minDiscount = parseInt(state.currentFilter);
    products = products.filter((p) => p.discount >= minDiscount);
  }

  // Apply price filter
  if (state.minPrice !== null && state.minPrice > 0) {
    products = products.filter((p) => p.price >= state.minPrice);
  }
  if (state.maxPrice !== null && state.maxPrice > 0) {
    products = products.filter((p) => p.price <= state.maxPrice);
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
    case 'rating-desc':
      sorted.sort((a, b) => b.rating - a.rating);
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

function renderProducts() {
  // Check if we have AI results to show
  if (state._aiResults && state._aiResults.length > 0) {
    renderAiResults(state._aiResults);
    return;
  }

  const products = getFilteredProducts();
  const displayProducts = products.slice(0, state.displayedCount);

  // Update results info
  // Build filter description
  const filters = [];
  if (state.currentFilter !== 'all') filters.push('скидка ' + state.currentFilter + '%+');
  if (state.minPrice) filters.push('от ' + state.minPrice.toLocaleString('ru-RU') + ' ₽');
  if (state.maxPrice) filters.push('до ' + state.maxPrice.toLocaleString('ru-RU') + ' ₽');
  if (state.searchQuery) filters.push('поиск: ' + state.searchQuery);
  if (state.currentCategory !== 'all') filters.push('категория: ' + state.currentCategory);
  const filterText = filters.length > 0 ? ' (' + filters.join(', ') + ')' : '';
  els.resultsInfo.textContent =
    `Показано ${displayProducts.length} из ${products.length} товаров` + filterText;

  // Show/hide load more
  if (displayProducts.length >= products.length) {
    els.loadMoreBtn.classList.add('hidden');
  } else {
    els.loadMoreBtn.classList.remove('hidden');
  }

  // Update hero stats
  $('#total-products').textContent = products.length + '+';

  // Render grid
  if (displayProducts.length === 0) {
    els.productsGrid.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1; padding: 60px;">
                <div class="empty-icon">🔍</div>
                <p class="empty-title">Ничего не найдено</p>
                <p class="empty-subtitle">Попробуйте изменить фильтры или поисковый запрос</p>
            </div>
        `;
    return;
  }

  els.productsGrid.innerHTML = displayProducts
    .map((product, index) => createProductCard(product, index))
    .join('');

  // Attach event listeners to rendered cards
  attachCardListeners();
}

function createProductCard(product, index) {
  const isFav = state.favorites.includes(product.id);
  const animationDelay = (index % 24) * 0.05;
  const savings = product.originalPrice - product.price;

  // DEBUG: Log card creation
  if (index <= 2) {
    console.log(
      '[createProductCard] index=' +
        index +
        ' id=' +
        product.id +
        ' title=' +
        product.title.substring(0, 30)
    );
  }

  return `
        <div class="product-card" data-id="${product.id}" style="animation-delay: ${animationDelay}s">
            <div class="discount-badge">-${product.discount}%</div>
            <button class="fav-btn ${isFav ? 'active' : ''}" data-id="${product.id}" aria-label="В избранное">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
            </button>
            <div class="product-image">
                <img src="${product.image}" alt="${product.title}" loading="lazy" onerror="this.src='https://via.placeholder.com/400?text=${encodeURIComponent(product.title.substring(0, 20))}'">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                ${
                  product.tags && product.tags.length > 0
                    ? `<div class="product-tags">${product.tags
                        .slice(0, 3)
                        .map(
                          (t) =>
                            `<span class="product-tag" onclick="event.stopPropagation(); state.searchQuery='${t}'; renderProducts();">${t}</span>`
                        )
                        .join('')}</div>`
                    : ''
                }
                <div class="product-rating">
                    <div class="stars">${renderStars(product.rating)}</div>
                    <span class="rating-value">${product.rating}</span>
                    ${product.orders > 0 ? `<span class="orders-count">${formatOrders(product.orders)} заказов</span>` : ''}
                </div>
                <div class="product-price">
                    <span class="current-price">${product.price.toLocaleString('ru-RU')} ₽</span>
                    <span class="original-price">${product.originalPrice.toLocaleString('ru-RU')} ₽</span>
                </div>
                <div class="shipping-badge">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    Бесплатная доставка
                </div>
            </div>
        </div>
    `;
}

function renderStars(rating) {
  let stars = '';
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars += '<span class="star">★</span>';
    } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
      stars += '<span class="star" style="opacity:0.6">★</span>';
    } else {
      stars += '<span class="star empty">★</span>';
    }
  }
  return stars;
}

function formatOrders(orders) {
  if (orders >= 1000) {
    return (orders / 1000).toFixed(orders >= 10000 ? 0 : 1) + 'K';
  }
  return orders.toString();
}

function copyPromoCode(element) {
  const code = element.textContent.trim();
  navigator.clipboard
    .writeText(code)
    .then(() => {
      const btn = element.closest('.promo-banner-code')?.querySelector('.promo-copy-btn');
      if (btn) {
        btn.classList.add('copied');
        btn.innerHTML =
          '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>';
        setTimeout(() => {
          btn.classList.remove('copied');
          btn.innerHTML =
            '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';
        }, 2000);
      }
    })
    .catch(() => {
      const textarea = document.createElement('textarea');
      textarea.value = code;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    });
}

function attachCardListeners() {
  // Remove old delegated listener to prevent duplicates
  if (state._cardClickHandler) {
    els.productsGrid.removeEventListener('click', state._cardClickHandler);
  }

  // Use event delegation for reliability
  state._cardClickHandler = (e) => {
    if (e.target.closest('.fav-btn')) return;
    const card = e.target.closest('.product-card');
    if (!card) return;
    const id = parseInt(card.dataset.id);
    if (isNaN(id)) {
      console.warn('[CardClick] Invalid ID:', card.dataset.id);
      return;
    }
    console.log('[CardClick] Opening product id:', id);
    openProductModal(id);
  };

  els.productsGrid.addEventListener('click', state._cardClickHandler);

  // Image zoom on long press (mouse down/up) - fills entire card
  $$('.product-image').forEach((imgContainer) => {
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
      }, 150);
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
    imgContainer.addEventListener(
      'touchstart',
      (e) => {
        isPressed = true;
        pressTimer = setTimeout(() => {
          if (isPressed && card) {
            imgContainer.classList.add('zoom-active');
            card.classList.add('zoom-mode');
          }
        }, 150);
      },
      { passive: true }
    );

    imgContainer.addEventListener('touchend', endZoom);
    imgContainer.addEventListener('touchcancel', cancelZoom);
  });

  // Favorite button
  $$('.fav-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = parseInt(btn.dataset.id);
      toggleFavorite(id);
      btn.classList.toggle('active');
    });
  });
}

// ============================================
// SEARCH
// ============================================
function initSearch() {
  let debounceTimer;
  els.searchInput.addEventListener('input', (e) => {
    clearTimeout(debounceTimer);
    const query = e.target.value;
    els.searchClear.classList.toggle('hidden', !query);

    debounceTimer = setTimeout(async () => {
      state.searchQuery = query;
      state.displayedCount = 24;
      state._aiResults = null; // Clear AI results on normal search

      // Lazy load all products if searching across all categories
      if (query && state.currentCategory === 'all' && typeof loadAllProducts === 'function') {
        await loadAllProducts();
      }

      renderProducts();

      if (query) {
        els.hero.style.display = 'none';
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
    renderProducts();
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
    els.categoryTabs.forEach((t) => t.classList.toggle('active', t.dataset.category === 'all'));
    els.filterBtns.forEach((f) => f.classList.toggle('active', f.dataset.filter === 'all'));
    els.sortSelect.value = 'discount-desc';
    state._aiResults = null;

    renderProducts();
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
  if (info) info.textContent = `🔮 AI-поиск: ${remaining} из ${AI_SEARCH_LIMIT} осталось`;
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

  showToast('info', '🔮 Ищу умно...');

  try {
    const res = await fetch(`/api/ai-search?q=${encodeURIComponent(query)}`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();

    if (data.error) {
      throw new Error(data.error);
    }

    incrementAiSearchUsed();

    if (data.results && data.results.length > 0) {
      // Inject AI results into _products for rendering
      const aiProducts = data.results.map((r) => ({
        id: r.id,
        title: r.title,
        category: r.category || 'home',
        image: r.image || '',
        price: r.price || 0,
        originalPrice: r.originalPrice || r.price * 1.5,
        discount: r.discount || 0,
        rating: r.rating || 4.5,
        orders: r.orders || 0,
        specs: r.specs || { Тип: r.category || 'Товар' },
        tags: r.tags || [],
        aliLink: r.aliLink || '',
        _aiResult: true,
      }));

      // Temporarily override products for this render
      state._aiResults = aiProducts;
      state.searchQuery = '';
      state.displayedCount = aiProducts.length;
      els.hero.style.display = 'none';
      els.loadMoreBtn.classList.add('hidden');
      els.resultsInfo.textContent = `🔮 AI-поиск: найдено ${aiProducts.length} товаров по «${query}»`;

      renderAiResults(aiProducts);
      showToast('success', `🔮 Найдено ${aiProducts.length} товаров!`);
    } else {
      showToast('info', '🔮 AI не нашёл товаров, пробую обычный поиск...');
      state.searchQuery = query;
      state._aiResults = null;
      renderProducts();
    }
  } catch (e) {
    console.error('[AI Search] Error:', e);
    showToast('error', '🔮 AI-поиск недоступен, использую обычный');
    state.searchQuery = query;
    state._aiResults = null;
    renderProducts();
  }
}

function renderAiResults(products) {
  if (products.length === 0) {
    els.productsGrid.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1; padding: 60px;">
                <div class="empty-icon">🔮</div>
                <p class="empty-title">Ничего не найдено</p>
                <p class="empty-subtitle">Попробуйте изменить запрос</p>
            </div>
        `;
    return;
  }

  els.productsGrid.innerHTML = products
    .map((product, index) => createProductCard(product, index))
    .join('');
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
// CATEGORIES (async — lazy load)
// ============================================
function initCategories() {
  els.categoryTabs.forEach((tab) => {
    tab.addEventListener('click', async () => {
      els.categoryTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      state.currentCategory = tab.dataset.category;
      state.displayedCount = 24;
      state._aiResults = null; // Clear AI results when switching categories

      // Lazy load category data
      if (typeof loadCategory === 'function' && state.currentCategory !== 'all') {
        await loadCategory(state.currentCategory);
      } else if (state.currentCategory === 'all' && typeof loadAllProducts === 'function') {
        await loadAllProducts();
      }

      renderProducts();
      document
        .getElementById('products-section')
        .scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

// ============================================
// FILTERS & SORT
// ============================================
function initFilters() {
  els.filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      els.filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      state.currentFilter = btn.dataset.filter;
      state.displayedCount = 24;
      renderProducts();
    });
  });

  // Price filter listeners
  if (els.priceMin) {
    els.priceMin.addEventListener('change', () => {
      state.minPrice = parseInt(els.priceMin.value) || null;
    });
    els.priceMin.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        state.minPrice = parseInt(els.priceMin.value) || null;
        state.maxPrice = parseInt(els.priceMax.value) || null;
        state.displayedCount = 24;
        renderProducts();
      }
    });
  }
  if (els.priceMax) {
    els.priceMax.addEventListener('change', () => {
      state.maxPrice = parseInt(els.priceMax.value) || null;
    });
    els.priceMax.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        state.minPrice = parseInt(els.priceMin.value) || null;
        state.maxPrice = parseInt(els.priceMax.value) || null;
        state.displayedCount = 24;
        renderProducts();
      }
    });
  }
  if (els.priceApply) {
    els.priceApply.addEventListener('click', () => {
      state.minPrice = parseInt(els.priceMin.value) || null;
      state.maxPrice = parseInt(els.priceMax.value) || null;
      state.displayedCount = 24;
      renderProducts();
    });
  }
}

function initSort() {
  els.sortSelect.addEventListener('change', (e) => {
    state.currentSort = e.target.value;
    state.displayedCount = 24;
    renderProducts();
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
  console.log('[openProductModal] Requested id=' + id + ' type=' + typeof id);
  const product = getProductById(id);
  if (!product) {
    console.error('[openProductModal] Product not found for id=' + id);
    return;
  }
  console.log(
    '[openProductModal] Found product id=' + product.id + ' title=' + product.title.substring(0, 40)
  );

  // Analytics: view item
  if (typeof gtag === 'function')
    gtag('event', 'view_item', { item_id: id, item_name: product.title, price: product.price });
  if (typeof ym === 'function') ym(109145874, 'reachGoal', 'view_item');

  const isFav = state.favorites.includes(id);
  const savings = product.originalPrice - product.price;

  els.modalContent.innerHTML = `
        <div class="modal-image-section">
            <img src="${product.image}" alt="${product.title}" onerror="this.src='https://via.placeholder.com/600?text=${encodeURIComponent(product.title.substring(0, 20))}'">
        </div>
        <div class="modal-details">
            <span class="modal-discount">Экономия ${product.discount}% — ${Math.round(savings).toLocaleString('ru-RU')} ₽</span>
            <h2 class="modal-title">${product.title}</h2>
            <div class="modal-rating-row">
                <div class="stars">${renderStars(product.rating)}</div>
                <span class="rating-value">${product.rating}</span>
                ${product.orders > 0 ? `<span class="orders-count">${formatOrders(product.orders)} заказов</span>` : ''}
            </div>
            <div class="modal-price-row">
                <span class="modal-current-price">${product.price.toLocaleString('ru-RU')} ₽</span>
                <span class="modal-original-price">${product.originalPrice.toLocaleString('ru-RU')} ₽</span>
                <span class="modal-save">Скидка ${Math.round(savings).toLocaleString('ru-RU')} ₽</span>
            </div>
            <div class="modal-specs">
                ${Object.entries(product.specs)
                  .map(
                    ([key, val]) => `
                    <div class="spec-row">
                        <span class="spec-label">${key}</span>
                        <span class="spec-value">${val}</span>
                    </div>
                `
                  )
                  .join('')}
            </div>
            <div class="shipping-badge" style="font-size:13px; margin-top:4px;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                Бесплатная доставка из Китая — 15-30 дней
            </div>
            <div class="modal-actions">
                <a href="${product.itemId ? generateDeeplink(product.itemId, product.category) : product.aliLink}" class="buy-btn" target="_blank" rel="noopener" onclick="showToast('success', 'Переход на AliExpress...'); if(typeof gtag==='function')gtag('event','purchase',{item_id:${product.id},value:${product.price},currency:'RUB'}); if(typeof ym==='function')ym(109145874,'reachGoal','purchase');">
                    Купить на AliExpress
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                </a>
                <button class="modal-fav-btn" style="border-color: var(--discount-red); color: var(--discount-red);" onclick="toggleFavorite(${product.id}); updateModalFavBtn(this, ${product.id})">
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
  imgSection.addEventListener(
    'touchstart',
    (e) => {
      isPressed = true;
      pressTimer = setTimeout(() => {
        if (isPressed) {
          imgSection.classList.add('zoom-active');
          modalContent.classList.add('zoom-mode');
        }
      }, 150);
    },
    { passive: true }
  );

  imgSection.addEventListener('touchend', endZoom);
  imgSection.addEventListener('touchcancel', cancelZoom);
}

function closeProductModal() {
  els.modal.classList.add('hidden');
  document.body.classList.remove('no-scroll');
}

function updateModalFavBtn(btn, id) {
  const isFav = state.favorites.includes(id);
  btn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="${isFav ? 'var(--discount-red)' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        ${isFav ? 'В избранном' : 'В избранное'}
    `;
  renderProducts();
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

function toggleFavorite(productId) {
  const idx = state.favorites.indexOf(productId);
  if (idx > -1) {
    state.favorites.splice(idx, 1);
    showToast('info', 'Удалено из избранного');
  } else {
    state.favorites.push(productId);
    showToast('success', 'Добавлено в избранное');
    // Analytics
    if (typeof gtag === 'function') gtag('event', 'add_to_favorites', { item_id: productId });
    if (typeof ym === 'function') ym(109145874, 'reachGoal', 'add_to_favorites');
  }
  saveFavorites();
  updateBadges();
  renderFavorites();
  renderProducts();
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

  els.favItems.innerHTML = state.favorites
    .map((id) => {
      const product = getProductById(id);
      if (!product) return '';

      return `
            <div class="fav-item">
                <img src="${product.image}" alt="${product.title}" class="fav-item-img" loading="lazy" onerror="this.src='https://via.placeholder.com/72?text=?'">
                <div class="fav-item-details">
                    <div class="fav-item-title">${product.title}</div>
                    <div class="fav-item-price">${product.price.toLocaleString('ru-RU')} ₽</div>
                    <div class="fav-item-original">${product.originalPrice.toLocaleString('ru-RU')} ₽</div>
                    <div class="fav-item-actions">
                        <a href="${product.itemId ? generateDeeplink(product.itemId, product.category) : product.aliLink}" class="fav-buy-btn" target="_blank" rel="noopener" target="_blank" rel="noopener">Купить</a>
                        <button class="fav-remove-btn" onclick="toggleFavorite(${product.id})">Удалить</button>
                    </div>
                </div>
            </div>
        `;
    })
    .join('');
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

  const icons = { success: '✓', info: 'ℹ', error: '✕' };
  els.toastIcon.textContent = icons[type] || 'ℹ';

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
  window.addEventListener('scroll', () => {
    els.scrollTop.classList.toggle('hidden', window.scrollY < 500);
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
