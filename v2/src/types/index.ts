// ===== Product Types =====

export interface Product {
  id: number
  title: string
  subtitle?: string
  category: string
  subcategory?: string
  price: number
  oldPrice: number
  discount: number
  rating: number
  orders: number
  viewers: number
  timer?: string
  image: string
  tags: string[]
  badges: Badge[]
  features: string[]
  affiliateLink: string
  shipping: string
  shopName: string
}

export type Badge = 'bestseller' | 'topRated' | 'bestPrice' | 'flash' | 'new'

export interface Category {
  id: string
  name: string
  slug: string
  count: number
  icon: string
  seoTitle: string
  seoDescription: string
  seoText: string
  faq: FAQItem[]
}

export interface FAQItem {
  question: string
  answer: string
}

export interface SEOItem {
  title: string
  paragraphs: string[]
  keywords?: string[]
}

export interface PromoCode {
  id: number
  code: string
  description: string
  minOrder: number
  expiry: string
  category: string
  discount: string
  isNew?: boolean
}

export interface BlogPost {
  id: number
  slug: string
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
  image: string
  content: BlogContent[]
  products?: number[]
}

export interface BlogContent {
  type: 'h2' | 'h3' | 'p' | 'product-grid' | 'promo-block' | 'tip'
  content: string
}

export interface Collection {
  id: string
  title: string
  description: string
  slug: string
  tags: string[]
  productIds: number[]
  icon: string
}

export interface Stats {
  productCount: number
  categoryCount: number
  yearLaunched: number
  dailyDeals: number
}
