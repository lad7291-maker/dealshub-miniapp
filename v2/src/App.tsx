import { useState, useCallback, useEffect, useRef } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { Header } from '@/components/Header'
import { SEO } from '@/components/SEO'
import { HeroSection } from '@/sections/HeroSection'
import { ProductCatalog } from '@/sections/ProductCatalog'
import { CollectionsSection } from '@/sections/CollectionsSection'
import { TopProducts } from '@/sections/TopProducts'
import { HowItWorks } from '@/sections/HowItWorks'
import { StatsSection } from '@/sections/StatsSection'
import { FAQSection } from '@/sections/FAQSection'
import { TelegramBanner } from '@/sections/TelegramBanner'
import { PromoCodesSection } from '@/sections/PromoCodesSection'
import { BlogSection } from '@/sections/BlogSection'
import { FavoritesPage } from '@/sections/FavoritesPage'
import { ProductPage } from '@/sections/ProductPage'
import { AISearchResults } from '@/sections/AISearchResults'
import { Footer } from '@/sections/Footer'
import { SEOSection } from '@/sections/SEOSection'
import { Analytics } from '@/components/Analytics'
import { useFavorites } from '@/hooks/useFavorites'
import { trackSearch, trackAiSearch, trackCategory, trackScrollDepth } from '@/lib/analytics'
import { loadProducts, loadCategories, promoCodes, blogPosts, collections, stats, mainFAQ, promoFAQ } from '@/data/products'
import { searchProductsAI } from '@/lib/search'
import type { Product, Category } from '@/types'

type Page = 'home' | 'promo' | 'blog' | 'favorites' | 'product' | 'ai-search'

function App() {
  const { favorites, toggleFavorite, clearFavorites } = useFavorites()
  const [currentPage, setCurrentPage] = useState<Page>('home')
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null)
  const [aiSearchQuery, setAiSearchQuery] = useState('')
  const [aiSearchResults, setAiSearchResults] = useState<Product[]>([])
  const trackedScrollMarks = useRef<Set<number>>(new Set())

  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    async function fetchData() {
      try {
        setLoading(true)
        const [p, c] = await Promise.all([loadProducts(), loadCategories()])
        if (cancelled) return
        setProducts(p)
        setCategories(c)
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Ошибка загрузки')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    fetchData()
    return () => { cancelled = true }
  }, [])

  const selectedProduct = selectedProductId != null
    ? products.find(p => p.id === selectedProductId) || null
    : null

  // Scroll depth tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      if (scrollHeight <= 0) return
      const scrollPercent = Math.round((window.scrollY / scrollHeight) * 100)
      const marks = [25, 50, 75, 90]
      for (const mark of marks) {
        if (scrollPercent >= mark && !trackedScrollMarks.current.has(mark)) {
          trackedScrollMarks.current.add(mark)
          trackScrollDepth(mark)
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavigate = useCallback((page: string) => {
    setCurrentPage(page as Page)
    setSelectedProductId(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const handleCategorySelect = useCallback((cat: string) => {
    setActiveCategory(cat)
    setCurrentPage('home')
    setSelectedProductId(null)
    trackCategory(cat)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query)
    setCurrentPage('home')
    setSelectedProductId(null)
    if (query) {
      trackSearch(query, activeCategory)
      setTimeout(() => {
        const el = document.getElementById('catalog')
        el?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }, [activeCategory])

  const handleAISearch = useCallback((query: string) => {
    const results = searchProductsAI(products, query)
    setAiSearchQuery(query)
    setAiSearchResults(results)
    setCurrentPage('ai-search')
    setSelectedProductId(null)
    trackAiSearch(query)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [products])

  const handleProductClick = useCallback((id: number) => {
    setSelectedProductId(id)
    setCurrentPage('product')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const handleCollectionClick = useCallback((collection: typeof collections[0]) => {
    if (collection.tags.includes('электроника')) setActiveCategory('electronics')
    else if (collection.tags.includes('одежда')) setActiveCategory('clothing')
    else if (collection.tags.includes('обувь')) setActiveCategory('shoes')
    else if (collection.tags.includes('для дома')) setActiveCategory('home')
    setCurrentPage('home')
    setSelectedProductId(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const getSEOProps = () => {
    const activeCat = categories.find(c => c.id === activeCategory)

    if (currentPage === 'product' && selectedProduct) {
      return {
        title: `${selectedProduct.title} — купить со скидкой ${selectedProduct.discount}% | SmartSkidka`,
        description: selectedProduct.subtitle || `Скидка ${selectedProduct.discount}% на ${selectedProduct.title}. Цена ${selectedProduct.price.toLocaleString('ru')} ₽ на AliExpress.`,
      }
    }

    if (currentPage === 'ai-search') {
      return {
        title: `AI-поиск: ${aiSearchQuery} | SmartSkidka`,
        description: `Результаты интеллектуального поиска по запросу "${aiSearchQuery}". Найдено ${aiSearchResults.length} товаров со скидками на AliExpress.`,
      }
    }

    if (currentPage === 'promo') {
      return {
        title: 'Промокоды AliExpress 2026 — все актуальные купоны и коды',
        description: 'Актуальные промокоды и купоны AliExpress на июнь 2026. Скидки до 70% на электронику, одежду, товары для дома. Копируйте и применяйте!',
        keywords: 'промокоды AliExpress, купоны AliExpress, скидки AliExpress 2026, коды скидок',
        faqSchema: promoFAQ,
      }
    }
    if (currentPage === 'blog') {
      return {
        title: 'Блог SmartSkidka — советы по экономии на AliExpress',
        description: 'Гайды, подборки, лайфхаки и секреты максимальной экономии на покупках в AliExpress. Читайте и экономьте умнее!',
        keywords: 'советы AliExpress, как экономить на AliExpress, подборки товаров',
      }
    }
    if (currentPage === 'favorites') {
      return {
        title: 'Избранные товары — SmartSkidka',
        description: 'Ваши сохранённые товары со скидками AliExpress. Сравнивайте цены и следите за скидками.',
      }
    }
    if (activeCategory !== 'all' && activeCat) {
      return {
        title: activeCat.seoTitle || `Скидки AliExpress на ${activeCat.name} — лучшие предложения`,
        description: activeCat.seoDescription || `Лучшие скидки на ${activeCat.name} с AliExpress. Реальные скидки, проверенные отзывы.`,
        faqSchema: activeCat.faq,
      }
    }
    // Home
    return {
      title: 'Скидки AliExpress до 90% — электроника, одежда, товары для дома | SmartSkidka.ru',
      description: 'SmartSkidka.ru собирает лучшие товары с AliExpress со скидками до 90%. Электроника, одежда, обувь, товары для дома с бесплатной доставкой. Реальные скидки, проверенные отзывы!',
      keywords: 'скидки AliExpress, товары с AliExpress со скидкой, промокоды AliExpress, купоны AliExpress, скидки на электронику, одежда с AliExpress',
      faqSchema: mainFAQ,
    }
  }

  const seo = getSEOProps()

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center text-white">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-400">Загрузка товаров...</p>
        </div>
      </div>
    )
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
    )
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
              <HeroSection
                onNavigate={handleNavigate}
                onCategorySelect={handleCategorySelect}
              />

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

              <StatsSection stats={{
                ...stats,
                productCount: products.length,
                categoryCount: categories.length - 1,
              }} />

              <SEOSection
                title="Скидки на AliExpress до 90% — как это работает"
                paragraphs={[
                  '<strong>SmartSkidka.ru</strong> собирает лучшие товары с AliExpress со скидками до 90%. Мы ежедневно обновляем каталог, чтобы вы всегда находили самые выгодные предложения на электронику, одежду, обувь, товары для дома и авто. Все цены указаны в рублях с учётом актуального курса Центробанка.',
                  'Используйте наш поиск по товарам или AI-поиск для подбора идеальных покупок. Добавляйте товары в избранное, чтобы вернуться к ним позже. Каждая карточка содержит реальный рейтинг, количество заказов и характеристики — никаких фейковых скидок.',
                  `В нашем каталоге более ${products.length} товаров с реальными скидками 20–90%. Все ссылки ведут напрямую на AliExpress через партнёрскую программу Admitad — вы получаете ту же цену, а мы небольшую комиссию за направление. Актуальная цена на AliExpress. Это позволяет нам поддерживать сервис и добавлять новые функции.`,
                ]}
                keywords={['скидки AliExpress', 'купоны AliExpress', 'промокоды AliExpress', 'товары с AliExpress', 'экономия на AliExpress', 'дешёвые товары AliExpress']}
              />

              <FAQSection faq={mainFAQ} />
            </>
          )}

          {currentPage === 'promo' && (
            <PromoCodesSection promos={promoCodes} faq={promoFAQ} />
          )}

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
      </div>
    </HelmetProvider>
  )
}

export default App
