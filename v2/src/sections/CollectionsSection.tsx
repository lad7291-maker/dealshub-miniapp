import { ArrowRight, Monitor, Shirt, Footprints, Home } from 'lucide-react'
import type { Collection } from '@/types'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Monitor, Shirt, Footprints, Home,
}

interface CollectionsSectionProps {
  collections: Collection[]
  onCollectionClick: (collection: Collection) => void
}

export function CollectionsSection({ collections, onCollectionClick }: CollectionsSectionProps) {
  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="flex items-center gap-2 mb-5 sm:mb-6">
        <div className="w-1 h-5 bg-cyan-500 rounded-full" />
        <h2 className="text-lg sm:text-xl font-bold text-white">Подборки скидок</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {collections.map(col => {
          const Icon = iconMap[col.icon] || Monitor
          return (
            <button
              key={col.id}
              onClick={() => onCollectionClick(col)}
              className="group flex items-center gap-3 sm:gap-4 p-4 sm:p-5 bg-[#1e293b]/80 hover:bg-[#243447] border border-slate-700/50 hover:border-cyan-500/30 rounded-2xl transition-all duration-300 hover:-translate-y-0.5 text-left"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 bg-cyan-500/10 group-hover:bg-cyan-500/20 rounded-xl flex items-center justify-center transition-colors">
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-sm sm:text-base font-semibold text-white group-hover:text-cyan-300 transition-colors line-clamp-2">
                  {col.title}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">{col.description}</p>
              </div>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600 group-hover:text-cyan-400 shrink-0 transition-colors" />
            </button>
          )
        })}
      </div>
    </section>
  )
}
