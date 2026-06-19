import { useState, useCallback } from 'react'
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
import { Footer } from '@/sections/Footer'
import { SEOSection } from '@/sections/SEOSection'
import { useFavorites } from '@/hooks/useFavorites'
import { products, categories, promoCodes, blogPosts, collections, stats, mainFAQ, promoFAQ } from '@/data/products'

type Page = 'home' | 'promo' | 'blog' | 'favorites'

function App() {
  const { favorites, toggleFavorite, clearFavorites } = useFavorites()
  const [currentPage, setCurrentPage] = useState<Page>('home')
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const handleNavigate = useCallback((page: string) => {
    setCurrentPage(page as Page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const handleCategorySelect = useCallback((cat: string) => {
    setActiveCategory(cat)
    setCurrentPage('home')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query)
    setCurrentPage('home')
    if (query) {
      setTimeout(() => {
        const el = document.getElementById('catalog')
        el?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }, [])

  const handleCollectionClick = useCallback((collection: typeof collections[0]) => {
    if (collection.tags.includes('электроника')) setActiveCategory('electronics')
    else if (collection.tags.includes('одежда')) setActiveCategory('clothing')
    else if (collection.tags.includes('обувь')) setActiveCategory('shoes')
    else if (collection.tags.includes('для дома')) setActiveCategory('home')
    setCurrentPage('home')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const getSEOProps = () => {
    const activeCat = categories.find(c => c.id === activeCategory)
    
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
                  searchQuery={searchQuery}
                />
              </div>

              <TopProducts
                products={products}
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
              />

              <TelegramBanner />

              <HowItWorks />

              <StatsSection stats={stats} />

              <SEOSection
                title="Скидки на AliExpress до 90% — как это работает"
                paragraphs={[
                  '<strong>SmartSkidka.ru</strong> собирает лучшие товары с AliExpress со скидками до 90%. Мы ежедневно обновляем каталог, чтобы вы всегда находили самые выгодные предложения на электронику, одежду, обувь, товары для дома и авто. Все цены указаны в рублях с учётом актуального курса Центробанка.',
                  'Используйте наш поиск по товарам или AI-поиск для подбора идеальных покупок. Добавляйте товары в избранное, чтобы вернуться к ним позже. Каждая карточка содержит реальный рейтинг, количество заказов и характеристики — никаких фейковых скидок.',
                  'В нашем каталоге более 1000 товаров с реальными скидками 20–90%. Все ссылки ведут напрямую на AliExpress через партнёрскую программу Admitad — вы получаете ту же цену, а мы небольшую комиссию за направление. Актуальная цена на AliExpress. Это позволяет нам поддерживать сервис и добавлять новые функции.',
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
            />
          )}

          {currentPage === 'favorites' && (
            <FavoritesPage
              products={products}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
              onClearFavorites={clearFavorites}
            />
          )}
        </main>

        {currentPage === 'home' && <TelegramBanner variant="bottom" />}
        <Footer />
      </div>
    </HelmetProvider>
  )
}

export default App
