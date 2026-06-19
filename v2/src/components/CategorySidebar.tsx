import { LayoutGrid, Monitor, Shirt, Footprints, Home, Car, Sparkles, Dumbbell } from 'lucide-react'
import type { Category } from '@/types'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutGrid, Monitor, Shirt, Footprints, Home, Car, Sparkles, Dumbbell,
}

interface CategorySidebarProps {
  categories: Category[]
  activeCategory: string
  onCategoryChange: (cat: string) => void
}

export function CategorySidebar({ categories, activeCategory, onCategoryChange }: CategorySidebarProps) {
  return (
    <div className="bg-[#1e293b]/60 border border-slate-700/30 rounded-2xl p-4 sticky top-24">
      <h3 className="text-sm font-bold text-white mb-3 px-2">Категории</h3>
      <div className="space-y-0.5">
        {categories.map(cat => {
          const Icon = iconMap[cat.icon] || LayoutGrid
          return (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm transition-all ${activeCategory === cat.id ? 'bg-cyan-500/15 text-cyan-400 font-medium' : 'text-slate-400 hover:text-white hover:bg-slate-700/30'}`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span className="flex-1 text-left">{cat.name}</span>
              <span className={`text-xs ${activeCategory === cat.id ? 'text-cyan-500' : 'text-slate-600'}`}>
                {cat.count}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
