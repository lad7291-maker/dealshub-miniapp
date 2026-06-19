import type { Product } from '@/types'

const CATEGORY_NAMES_RU: Record<string, string> = {
  electronics: 'электроника',
  clothing: 'одежда',
  shoes: 'обувь',
  home: 'дом',
  auto: 'авто',
  beauty: 'красота',
  sport: 'спорт',
}

export function searchProductsAI(products: Product[], query: string, limit = 20): Product[] {
  const q = query.trim().toLowerCase()
  if (!q || q.length < 2) return []

  const queryWords = q.split(/\s+/).filter((w) => w.length >= 2)
  if (queryWords.length === 0) return []

  const scored = products.map((product) => {
    const categoryRu = CATEGORY_NAMES_RU[product.category] || product.category
    const text = [
      product.title,
      product.subtitle,
      product.category,
      categoryRu,
      ...product.tags,
      ...product.features,
      product.shopName,
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()

    let score = 0

    // Exact phrase match in title — highest score
    const titleLower = product.title.toLowerCase()
    if (titleLower.includes(q)) score += 10

    // Word matches
    for (const word of queryWords) {
      if (titleLower.includes(word)) score += 4
      else if (text.includes(word)) score += 1
    }

    // Category match (en or ru)
    if (product.category.toLowerCase() === q || categoryRu.includes(q)) {
      score += 3
    }

    // Tag match
    const tagMatch = product.tags.some((t) => t.toLowerCase().includes(q))
    if (tagMatch) score += 2

    return { product, score }
  })

  scored.sort((a, b) => b.score - a.score)
  return scored.filter((s) => s.score > 0).slice(0, limit).map((s) => s.product)
}
