import { useState } from 'react'
import { BookOpen, Clock, Calendar, ArrowRight, ChevronLeft } from 'lucide-react'
import type { BlogPost, Product } from '@/types'
import { ProductCard } from '@/components/ProductCard'

interface BlogSectionProps {
  posts: BlogPost[]
  products: Product[]
  favorites: number[]
  onToggleFavorite: (id: number) => void
  onProductClick: (id: number) => void
}

export function BlogSection({ posts, products, favorites, onToggleFavorite, onProductClick }: BlogSectionProps) {
  const [activePost, setActivePost] = useState<BlogPost | null>(null)

  if (activePost) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <button
          onClick={() => setActivePost(null)}
          className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-cyan-400 transition-colors mb-4"
        >
          <ChevronLeft className="w-4 h-4" />
          Назад к статьям
        </button>

        <article className="max-w-4xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full">{activePost.category}</span>
            <span className="flex items-center gap-1 text-xs text-slate-500">
              <Calendar className="w-3 h-3" /> {activePost.date}
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-500">
              <Clock className="w-3 h-3" /> {activePost.readTime}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
            {activePost.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-400 mb-6 leading-relaxed">
            {activePost.excerpt}
          </p>

          <img
            src={activePost.image}
            alt={activePost.title}
            className="w-full aspect-[2/1] object-cover rounded-2xl mb-6 sm:mb-8"
          />

          {/* Content */}
          <div className="space-y-4 sm:space-y-6">
            {activePost.content.map((block, i) => {
              if (block.type === 'h2') {
                return <h2 key={i} className="text-xl sm:text-2xl font-bold text-white mt-8">{block.content}</h2>
              }
              if (block.type === 'h3') {
                return <h3 key={i} className="text-lg sm:text-xl font-semibold text-white mt-6">{block.content}</h3>
              }
              if (block.type === 'p') {
                return <p key={i} className="text-sm sm:text-base text-slate-400 leading-relaxed" dangerouslySetInnerHTML={{ __html: block.content }} />
              }
              if (block.type === 'promo-block') {
                return (
                  <div key={i} className="bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 border border-cyan-500/20 rounded-2xl p-4 sm:p-6 my-6">
                    <h4 className="text-base font-bold text-white mb-3">Актуальные промокоды AliExpress</h4>
                    <div className="flex flex-wrap gap-2">
                      {['NEWUSER50', 'TECH30', 'HOME20', 'SHOES15'].map(code => (
                        <span key={code} className="px-3 py-1.5 bg-[#0f172a] text-cyan-400 text-sm font-mono rounded-lg border border-cyan-500/20">
                          {code}
                        </span>
                      ))}
                    </div>
                  </div>
                )
              }
              if (block.type === 'tip') {
                return (
                  <div key={i} className="bg-amber-500/5 border-l-4 border-amber-400 rounded-r-xl p-4 sm:p-5 my-4">
                    <p className="text-sm text-amber-300/90 leading-relaxed">{block.content}</p>
                  </div>
                )
              }
              if (block.type === 'product-grid') {
                const relatedProducts = products.slice(0, 3)
                return (
                  <div key={i} className="my-6">
                    <h4 className="text-base font-bold text-white mb-3">Рекомендуемые товары</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {relatedProducts.map(p => (
                        <ProductCard
                          key={p.id}
                          product={p}
                          isFavorite={favorites.includes(p.id)}
                          onToggleFavorite={onToggleFavorite}
                          onProductClick={onProductClick}
                        />
                      ))}
                    </div>
                  </div>
                )
              }
              return null
            })}
          </div>

          {/* Navigation back */}
          <div className="mt-10 pt-6 border-t border-slate-700/30">
            <button
              onClick={() => setActivePost(null)}
              className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              Все статьи
            </button>
          </div>
        </article>
      </div>
    )
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="text-center mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded-full mb-4">
          <BookOpen className="w-4 h-4 text-cyan-400" />
          <span className="text-sm font-semibold text-cyan-300">Блог и советы</span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
          Советы по экономии на AliExpress
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
          Гайды, подборки, лайфхаки и секреты максимальной экономии на покупках
        </p>
      </div>

      {/* Posts Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {posts.map(post => (
          <button
            key={post.id}
            onClick={() => setActivePost(post)}
            className="group text-left bg-[#1e293b] hover:bg-[#23304a] border border-slate-700/50 hover:border-cyan-500/30 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
          >
            <div className="aspect-[2/1] overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
            <div className="p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full">{post.category}</span>
                <span className="flex items-center gap-1 text-xs text-slate-500">
                  <Clock className="w-3 h-3" /> {post.readTime}
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-semibold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 mb-2">
                {post.title}
              </h3>
              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{post.excerpt}</p>
              <div className="flex items-center gap-1 mt-3 text-xs text-cyan-400 group-hover:text-cyan-300">
                Читать статью
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Tips for linking */}
      <div className="mt-10 sm:mt-14 bg-gradient-to-br from-[#1e293b] to-[#1a2636] border border-slate-700/50 rounded-2xl p-5 sm:p-8">
        <h3 className="text-lg sm:text-xl font-bold text-white mb-4">
          Популярные темы
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { title: 'Как находить скидки до 90%', desc: 'Полное руководство по поиску максимальных скидок' },
            { title: 'Промокоды AliExpress 2026', desc: 'Все актуальные коды и купоны' },
            { title: 'Товары для дома до 1000 ₽', desc: 'Лучшие мелочи для дома по минимальной цене' },
            { title: 'Электроника со скидками', desc: 'Гаджеты, наушники, умный дом' },
            { title: 'Размеры одежды и обуви', desc: 'Таблицы размеров и советы по выбору' },
            { title: 'Защита от фейковых скидок', desc: 'Как проверить реальность экономии' },
          ].map((tip, i) => (
            <div key={i} className="p-3 sm:p-4 bg-[#0f172a]/50 rounded-xl hover:bg-[#0f172a] transition-colors cursor-pointer">
              <h4 className="text-sm font-medium text-white mb-0.5">{tip.title}</h4>
              <p className="text-xs text-slate-500">{tip.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
