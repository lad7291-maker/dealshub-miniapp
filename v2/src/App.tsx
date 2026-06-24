import { useState, useCallback, useEffect, useRef } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Header } from '@/components/Header';
import { SEO } from '@/components/SEO';
import { HeroSection } from '@/sections/HeroSection';
import { ProductCatalog } from '@/sections/ProductCatalog';
import { CollectionsSection } from '@/sections/CollectionsSection';
import { TopProducts } from '@/sections/TopProducts';
import { HowItWorks } from '@/sections/HowItWorks';
import { StatsSection } from '@/sections/StatsSection';
import { FAQSection } from '@/sections/FAQSection';
import { TelegramBanner } from '@/sections/TelegramBanner';
import { PromoCodesSection } from '@/sections/PromoCodesSection';
import { BlogSection } from '@/sections/BlogSection';
import { FavoritesPage } from '@/sections/FavoritesPage';
import { ProductPage } from '@/sections/ProductPage';
import { AISearchResults } from '@/sections/AISearchResults';
import { Footer } from '@/sections/Footer';
import { SEOSection } from '@/sections/SEOSection';
import { Analytics } from '@/components/Analytics';
import { PWAInstallPrompt } from '@/components/PWAInstallPrompt';
import { useFavorites } from '@/hooks/useFavorites';
import { trackSearch, trackAiSearch, trackCategory, trackScrollDepth } from '@/lib/analytics';
import {
  loadProducts,
  loadCategories,
  promoCodes,
  blogPosts,
  collections,
  stats,
  mainFAQ,
  promoFAQ,
} from '@/data/products';
import { searchProductsAI } from '@/lib/search';
import type { Product, Category } from '@/types';

type Page = 'home' | 'promo' | 'blog' | 'favorites' | 'product' | 'ai-search';

function generateHomeJsonLd(products: Product[]) {
  const electronics = products.filter((p) => p.category === 'electronics').slice(0, 6);
  const clothing = products.filter((p) => p.category === 'clothing').slice(0, 6);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        name: 'SmartSkidka.ru',
        url: 'https://smart-skidka.ru/',
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://smart-skidka.ru/?search={search_term_string}',
          },
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'Organization',
        name: 'SmartSkidka.ru',
        url: 'https://smart-skidka.ru/',
        logo: 'https://smart-skidka.ru/icons/icon-512x512.png',
        sameAs: ['https://t.me/SmartRuMarket'],
      },
      {
        '@type': 'ItemList',
        name: 'Лучшие скидки на электронику',
        itemListElement: electronics.map((p, i) => ({
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
      },
      {
        '@type': 'ItemList',
        name: 'Лучшие скидки на одежду',
        itemListElement: clothing.map((p, i) => ({
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
      },
    ],
  };
}

function generateCategoryJsonLd(category: Category, products: Product[]) {
  const catProducts = products.filter((p) => p.category === category.id).slice(0, 12);
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: category.seoTitle || `Скидки на ${category.name}`,
    itemListElement: catProducts.map((p, i) => ({
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

function generateBreadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

function getInitialItemId(): string | null {
  if (typeof window === 'undefined') return null;
  return (
    (window as { __PRODUCT_ITEM_ID__?: string }).__PRODUCT_ITEM_ID__ ||
    window.location.pathname.match(/\/item\/(\d+)\.html$/)?.[1] ||
    null
  );
}

function getInitialCategory(): string {
  if (typeof window === 'undefined') return 'all';
  const slug = (window as { __CATEGORY_SLUG__?: string }).__CATEGORY_SLUG__;
  if (slug) return slug;
  const match = window.location.pathname.match(/^\/(\w+)\.html$/);
  if (!match) return 'all';
  const cat = match[1];
  const valid = ['electronics', 'clothing', 'shoes', 'home', 'auto', 'beauty', 'sport'];
  return valid.includes(cat) ? cat : 'all';
}

function App() {
  const { favorites, toggleFavorite, clearFavorites } = useFavorites();
  const initialItemId = getInitialItemId();
  const initialCategory = getInitialCategory();
  const [currentPage, setCurrentPage] = useState<Page>(initialItemId ? 'product' : 'home');
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProductItemId, setSelectedProductItemId] = useState<string | null>(initialItemId);
  const [aiSearchQuery, setAiSearchQuery] = useState('');
  const [aiSearchResults, setAiSearchResults] = useState<Product[]>([]);
  const trackedScrollMarks = useRef<Set<number>>(new Set());

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function fetchData() {
      try {
        setLoading(true);
        const [p, c] = await Promise.all([loadProducts(), loadCategories()]);
        if (cancelled) return;
        setProducts(p);
        setCategories(c);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Ошибка загрузки');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchData();
    return () => {
      cancelled = true;
    };
  }, []);

  const selectedProduct =
    selectedProductItemId != null
      ? products.find((p) => p.itemId === selectedProductItemId) || null
      : null;

  // Scroll depth tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;
      const scrollPercent = Math.round((window.scrollY / scrollHeight) * 100);
      const marks = [25, 50, 75, 90];
      for (const mark of marks) {
        if (scrollPercent >= mark && !trackedScrollMarks.current.has(mark)) {
          trackedScrollMarks.current.add(mark);
          trackScrollDepth(mark);
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = useCallback((page: string) => {
    setCurrentPage(page as Page);
    setSelectedProductItemId(null);
    const path = page === 'home' ? '/' : `/${page}`;
    if (window.location.pathname !== path) {
      history.replaceState(null, '', path);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleCategorySelect = useCallback((cat: string) => {
    setActiveCategory(cat);
    setCurrentPage('home');
    setSelectedProductItemId(null);
    trackCategory(cat);
    if (window.location.pathname !== '/') history.replaceState(null, '', '/');
    // Scroll to catalog, not to top
    setTimeout(() => {
      const catalog = document.getElementById('catalog');
      if (catalog) catalog.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  }, []);

  const handleSearch = useCallback(
    (query: string) => {
      setSearchQuery(query);
      setCurrentPage('home');
      setSelectedProductItemId(null);
      if (window.location.pathname !== '/') history.replaceState(null, '', '/');
      if (query) {
        trackSearch(query, activeCategory);
        setTimeout(() => {
          const el = document.getElementById('catalog');
          el?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    },
    [activeCategory]
  );

  const handleAISearch = useCallback(
    (query: string) => {
      const results = searchProductsAI(products, query);
      setAiSearchQuery(query);
      setAiSearchResults(results);
      setCurrentPage('ai-search');
      setSelectedProductItemId(null);
      trackAiSearch(query);
      if (window.location.pathname !== '/ai-search') history.replaceState(null, '', '/ai-search');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [products]
  );

  const handleProductClick = useCallback(
    (id: number) => {
      const product = products.find((p) => p.id === id);
      if (!product) return;
      const itemId = product.itemId || String(product.id);
      setSelectedProductItemId(itemId);
      setCurrentPage('product');
      const productPath = `/item/${itemId}.html`;
      if (window.location.pathname !== productPath) history.replaceState(null, '', productPath);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [products]
  );

  const handleCollectionClick = useCallback((collection: (typeof collections)[0]) => {
    if (collection.tags.includes('электроника')) setActiveCategory('electronics');
    else if (collection.tags.includes('одежда')) setActiveCategory('clothing');
    else if (collection.tags.includes('обувь')) setActiveCategory('shoes');
    else if (collection.tags.includes('для дома')) setActiveCategory('home');
    setCurrentPage('home');
    setSelectedProductItemId(null);
    if (window.location.pathname !== '/') history.replaceState(null, '', '/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const getSEOProps = () => {
    const activeCat = categories.find((c) => c.id === activeCategory);

    if (currentPage === 'product' && selectedProduct) {
      const breadcrumb = generateBreadcrumbJsonLd([
        { name: 'Главная', url: 'https://smart-skidka.ru/' },
        {
          name:
            selectedProduct.category === 'electronics'
              ? 'Электроника'
              : selectedProduct.category === 'clothing'
                ? 'Одежда'
                : selectedProduct.category === 'shoes'
                  ? 'Обувь'
                  : selectedProduct.category === 'home'
                    ? 'Дом'
                    : selectedProduct.category === 'auto'
                      ? 'Авто'
                      : selectedProduct.category === 'beauty'
                        ? 'Красота'
                        : 'Спорт',
          url: `https://smart-skidka.ru/${selectedProduct.category}.html`,
        },
        {
          name: selectedProduct.title,
          url: `https://smart-skidka.ru/item/${selectedProduct.itemId}.html`,
        },
      ]);
      return {
        title: `${selectedProduct.title} — купить со скидкой ${selectedProduct.discount}% | SmartSkidka`,
        description:
          selectedProduct.subtitle ||
          `Скидка ${selectedProduct.discount}% на ${selectedProduct.title}. Цена ${selectedProduct.price.toLocaleString('ru')} ₽ на AliExpress.`,
        canonical: `/item/${selectedProduct.itemId}.html`,
        ogImage: selectedProduct.image,
        ogType: 'product',
        jsonLd: breadcrumb,
      };
    }

    if (currentPage === 'ai-search') {
      return {
        title: `AI-поиск: ${aiSearchQuery} | SmartSkidka`,
        description: `Результаты интеллектуального поиска по запросу "${aiSearchQuery}". Найдено ${aiSearchResults.length} товаров со скидками на AliExpress.`,
      };
    }

    if (currentPage === 'promo') {
      return {
        title: 'Промокоды AliExpress 2026 — все актуальные купоны и коды',
        description:
          'Актуальные промокоды и купоны AliExpress на июнь 2026. Скидки до 70% на электронику, одежду, товары для дома. Копируйте и применяйте!',
        keywords: 'промокоды AliExpress, купоны AliExpress, скидки AliExpress 2026, коды скидок',
        faqSchema: promoFAQ,
      };
    }
    if (currentPage === 'blog') {
      return {
        title: 'Блог SmartSkidka — советы по экономии на AliExpress',
        description:
          'Гайды, подборки, лайфхаки и секреты максимальной экономии на покупках в AliExpress. Читайте и экономьте умнее!',
        keywords: 'советы AliExpress, как экономить на AliExpress, подборки товаров',
      };
    }
    if (currentPage === 'favorites') {
      return {
        title: 'Избранные товары — SmartSkidka',
        description:
          'Ваши сохранённые товары со скидками AliExpress. Сравнивайте цены и следите за скидками.',
      };
    }
    if (activeCategory !== 'all' && activeCat) {
      return {
        title: activeCat.seoTitle || `Скидки AliExpress на ${activeCat.name} — лучшие предложения`,
        description:
          activeCat.seoDescription ||
          `Лучшие скидки на ${activeCat.name} с AliExpress. Реальные скидки, проверенные отзывы.`,
        faqSchema: activeCat.faq,
        jsonLd: generateCategoryJsonLd(activeCat, products),
      };
    }
    // Home
    return {
      title: 'Скидки AliExpress до 90% — электроника, одежда, товары для дома | SmartSkidka.ru',
      description:
        'SmartSkidka.ru собирает лучшие товары с AliExpress со скидками до 90%. Электроника, одежда, обувь, товары для дома с бесплатной доставкой. Реальные скидки, проверенные отзывы!',
      keywords:
        'скидки AliExpress, товары с AliExpress со скидкой, промокоды AliExpress, купоны AliExpress, скидки на электронику, одежда с AliExpress',
      faqSchema: mainFAQ,
      jsonLd: generateHomeJsonLd(products),
    };
  };

  const seo = getSEOProps();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center text-white">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-400">Загрузка товаров...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center text-white px-4">
        <div className="text-center max-w-md">
          <p className="text-red-400 text-lg mb-2">Ошибка загрузки</p>
          <p className="text-slate-400 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg text-white font-medium"
          >
            Попробовать снова
          </button>
        </div>
      </div>
    );
  }

  return (
    <HelmetProvider>
      <div className="min-h-screen bg-[#0f172a] text-white">
        <SEO
          title={seo.title}
          description={seo.description}
          keywords={seo.keywords}
          faqSchema={seo.faqSchema}
          canonical={currentPage === 'home' ? '/' : `/${currentPage}`}
          jsonLd={seo.jsonLd}
        />

        <Header
          favoritesCount={favorites.length}
          onSearch={handleSearch}
          onAISearch={handleAISearch}
          onNavigate={handleNavigate}
          currentPage={currentPage}
        />

        <main>
          {currentPage === 'home' && (
            <>
              <HeroSection onNavigate={handleNavigate} onCategorySelect={handleCategorySelect} />

              <CollectionsSection
                collections={collections}
                onCollectionClick={handleCollectionClick}
              />

              <div id="catalog">
                <ProductCatalog
                  products={products}
                  categories={categories}
                  activeCategory={activeCategory}
                  onCategoryChange={handleCategorySelect}
                  favorites={favorites}
                  onToggleFavorite={toggleFavorite}
                  onProductClick={handleProductClick}
                  searchQuery={searchQuery}
                />
              </div>

              <TopProducts
                products={products}
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
                onProductClick={handleProductClick}
              />

              <TelegramBanner />

              <HowItWorks />

              <StatsSection
                stats={{
                  ...stats,
                  productCount: products.length,
                  categoryCount: categories.length - 1,
                }}
              />

              <SEOSection
                title="Скидки на AliExpress до 90% — как это работает"
                paragraphs={[
                  '<strong>SmartSkidka.ru</strong> собирает лучшие товары с AliExpress со скидками до 90%. Мы ежедневно обновляем каталог, чтобы вы всегда находили самые выгодные предложения на электронику, одежду, обувь, товары для дома и авто. Все цены указаны в рублях с учётом актуального курса Центробанка.',
                  'Используйте наш поиск по товарам или AI-поиск для подбора идеальных покупок. Добавляйте товары в избранное, чтобы вернуться к ним позже. Каждая карточка содержит реальный рейтинг, количество заказов и характеристики — никаких фейковых скидок.',
                  `В нашем каталоге более ${products.length} товаров с реальными скидками 20–90%. Все ссылки ведут напрямую на AliExpress через партнёрскую программу Admitad — вы получаете ту же цену, а мы небольшую комиссию за направление. Актуальная цена на AliExpress. Это позволяет нам поддерживать сервис и добавлять новые функции.`,
                ]}
                keywords={[
                  'скидки AliExpress',
                  'купоны AliExpress',
                  'промокоды AliExpress',
                  'товары с AliExpress',
                  'экономия на AliExpress',
                  'дешёвые товары AliExpress',
                ]}
              />

              <FAQSection faq={mainFAQ} />
            </>
          )}

          {currentPage === 'promo' && <PromoCodesSection promos={promoCodes} faq={promoFAQ} />}

          {currentPage === 'blog' && (
            <BlogSection
              posts={blogPosts}
              products={products}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
              onProductClick={handleProductClick}
            />
          )}

          {currentPage === 'favorites' && (
            <FavoritesPage
              products={products}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
              onClearFavorites={clearFavorites}
              onProductClick={handleProductClick}
            />
          )}

          {currentPage === 'product' && selectedProduct && (
            <ProductPage
              product={selectedProduct}
              isFavorite={favorites.includes(selectedProduct.id)}
              onToggleFavorite={toggleFavorite}
              onBack={() => handleNavigate('home')}
            />
          )}

          {currentPage === 'ai-search' && (
            <AISearchResults
              query={aiSearchQuery}
              results={aiSearchResults}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
              onProductClick={handleProductClick}
            />
          )}
        </main>

        {currentPage === 'home' && <TelegramBanner variant="bottom" />}
        <Footer />
        <Analytics />
        <PWAInstallPrompt />
      </div>
    </HelmetProvider>
  );
}

export default App;
