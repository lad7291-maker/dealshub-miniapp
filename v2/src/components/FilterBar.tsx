import { SlidersHorizontal, X, ArrowUpDown } from 'lucide-react';

interface FilterBarProps {
  discountFilter: string;
  onDiscountFilterChange: (filter: string) => void;
  onResetFilters: () => void;
  productCount: number;
  sortValue?: string;
  onSortChange?: (value: string) => void;
}

export function FilterBar({
  discountFilter,
  onDiscountFilterChange,
  onResetFilters,
  productCount,
  sortValue = 'discount',
  onSortChange,
}: FilterBarProps) {
  const discountOptions = [
    { value: 'all', label: 'Все скидки' },
    { value: '30', label: '30%+' },
    { value: '50', label: '50%+' },
    { value: '70', label: '70%+' },
    { value: '90', label: '90%+' },
  ];

  const sortOptions = [
    { value: 'discount', label: 'По скидке' },
    { value: 'price_asc', label: 'Цена ↑' },
    { value: 'price_desc', label: 'Цена ↓' },
    { value: 'orders', label: 'По популярности' },
  ];

  const hasActiveFilters = discountFilter !== 'all';

  return (
    <div className="bg-[#1e293b]/60 border border-slate-700/30 rounded-2xl p-3 sm:p-4 mb-4 sm:mb-6">
      <div className="flex flex-col gap-3">
        {/* Discount Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-slate-400 mr-1" />
          {discountOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onDiscountFilterChange(opt.value)}
              className={`px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all ${discountFilter === opt.value ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20' : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700 hover:text-white'}`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Sort & Reset */}
        <div className="flex items-center gap-2">
          {onSortChange && (
            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={sortValue}
                onChange={(e) => onSortChange(e.target.value)}
                className="h-8 px-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white text-xs focus:outline-none focus:border-cyan-500"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="flex items-center gap-1 text-xs text-slate-400 hover:text-red-400 transition-colors"
            >
              <X className="w-3 h-3" />
              Сбросить
            </button>
          )}

          <div className="text-xs text-slate-500 ml-auto">{productCount} товаров</div>
        </div>
      </div>
    </div>
  );
}
