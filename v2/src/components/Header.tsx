import { useState } from 'react';
import { Search, Heart, Menu, X, Zap, Tag, BookOpen, ExternalLink, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface HeaderProps {
  favoritesCount: number;
  onSearch: (query: string) => void;
  onAISearch: (query: string) => void;
  onNavigate: (page: string) => void;
  currentPage: string;
}

export function Header({
  favoritesCount,
  onSearch,
  onAISearch,
  onNavigate,
  currentPage,
}: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [aiMode, setAiMode] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      if (aiMode) {
        onAISearch(searchQuery.trim());
      } else {
        onSearch(searchQuery.trim());
      }
    }
  };

  const navItems = [
    { id: 'home', label: 'Главная', icon: Zap },
    { id: 'promo', label: 'Промокоды', icon: Tag },
    { id: 'blog', label: 'Блог', icon: BookOpen },
    { id: 'favorites', label: 'Избранное', icon: Heart },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0f172a]/95 backdrop-blur-md border-b border-cyan-500/20">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-2 sm:gap-4">
          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-1.5 sm:gap-2 shrink-0"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <span className="text-base sm:text-lg font-bold text-white hidden sm:inline">
              Smart<span className="text-cyan-400">Skidka</span>.ru
            </span>
            <span className="text-base font-bold text-white sm:hidden">
              SS<span className="text-cyan-400">.ru</span>
            </span>
          </button>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-xl">
            <div
              className={`relative flex items-center bg-[#1e293b] rounded-xl border transition-all duration-200 ${searchFocused ? 'border-cyan-400 ring-1 ring-cyan-400/30' : 'border-slate-600'}`}
            >
              <Search className="absolute left-3 w-4 h-4 text-slate-400" />
              <Input
                type="text"
                placeholder={aiMode ? 'AI-поиск: напишите что ищете...' : 'Поиск товаров...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className="pl-9 pr-[4.5rem] h-9 sm:h-10 bg-transparent border-0 text-white placeholder:text-slate-400 text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    onSearch('');
                  }}
                  className="absolute right-10 w-6 h-6 flex items-center justify-center text-slate-400 hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
              <button
                type="submit"
                className="absolute right-2 w-7 h-7 flex items-center justify-center bg-cyan-500/20 rounded-lg text-cyan-400 hover:bg-cyan-500/30 transition-colors"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>

          {/* AI Search Toggle + Favorites - Desktop */}
          <div className="hidden lg:flex items-center gap-2">
            <button
              type="button"
              onClick={() => setAiMode(!aiMode)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-colors ${
                aiMode
                  ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-cyan-500/40 text-cyan-300'
                  : 'bg-slate-700/30 border-slate-600 text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="text-xs font-medium">{aiMode ? 'AI-поиск' : 'Обычный'}</span>
            </button>
            <button
              onClick={() => onNavigate('favorites')}
              className="relative p-2 text-slate-300 hover:text-white transition-colors"
            >
              <Heart
                className={`w-5 h-5 ${currentPage === 'favorites' ? 'fill-red-500 text-red-500' : ''}`}
              />
              {favoritesCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 min-w-[18px] flex items-center justify-center bg-red-500 text-white text-[10px] font-bold rounded-full">
                  {favoritesCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0f172a] border-t border-slate-700/50">
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${currentPage === item.id ? 'bg-cyan-500/10 text-cyan-400' : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'}`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
                {item.id === 'favorites' && favoritesCount > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {favoritesCount}
                  </span>
                )}
              </button>
            ))}
            <a
              href="https://t.me/SmartRuMarket"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-700/50 hover:text-white transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Telegram-канал
            </a>
          </div>
        </div>
      )}

      {/* Desktop Nav */}
      <nav className="hidden lg:block border-t border-slate-700/30">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${currentPage === item.id ? 'text-cyan-400 border-cyan-400' : 'text-slate-400 border-transparent hover:text-white hover:border-slate-500'}`}
              >
                <item.icon className="w-3.5 h-3.5" />
                {item.label}
                {item.id === 'favorites' && favoritesCount > 0 && (
                  <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {favoritesCount}
                  </span>
                )}
              </button>
            ))}
            <a
              href="https://t.me/SmartRuMarket"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-slate-400 border-b-2 border-transparent hover:text-cyan-400 hover:border-cyan-400 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Telegram
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
