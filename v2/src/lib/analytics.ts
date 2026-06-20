declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
    ym?: (id: number, action: string, ...args: unknown[]) => void
  }
}

const GA_ID = 'G-VG8VX6F69T'
const YM_ID = 109145874

export function initAnalytics(): void {
  if (typeof window === 'undefined') return

  // Google Analytics 4
  if (!window.gtag) {
    const s = document.createElement('script')
    s.async = true
    s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
    document.head.appendChild(s)

    window.dataLayer = window.dataLayer || []
    window.gtag = function (...args: unknown[]) {
      window.dataLayer?.push(args)
    }
    window.gtag('js', new Date())
    window.gtag('config', GA_ID)
  }

  // Yandex Metrika
  if (!window.ym) {
    const script = document.createElement('script')
    script.async = true
    script.src = 'https://mc.yandex.ru/metrika/tag.js'
    document.head.appendChild(script)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    window.ym = function (id: number, _action: string, ..._args: unknown[]) {
      // Queue calls until the YM script loads
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(window as any)[`yaCounter${id}`] = (window as any)[`yaCounter${id}`] || {
        reachGoal: () => {},
      }
    }

    script.onload = () => {
      if (typeof window.ym === 'function') {
        window.ym(YM_ID, 'init', {
          clickmap: true,
          trackLinks: true,
          accurateTrackBounce: true,
          webvisor: true,
        })
      }
    }

    // noscript pixel fallback
    const noscript = document.createElement('noscript')
    const div = document.createElement('div')
    const img = document.createElement('img')
    img.src = `https://mc.yandex.ru/watch/${YM_ID}`
    img.style.position = 'absolute'
    img.style.left = '-9999px'
    img.alt = ''
    div.appendChild(img)
    noscript.appendChild(div)
    document.body.appendChild(noscript)
  }
}

function gaEvent(name: string, params?: Record<string, unknown>): void {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', name, params)
  }
}

function ymGoal(name: string, params?: Record<string, unknown>): void {
  if (typeof window !== 'undefined' && typeof window.ym === 'function') {
    window.ym(YM_ID, 'reachGoal', name, params)
  }
}

export function trackEvent(name: string, params?: Record<string, unknown>): void {
  gaEvent(name, params)
  ymGoal(name, params)
}

export function trackViewItem(product: { id: number; title: string; price: number }): void {
  trackEvent('view_item', { item_id: product.id, item_name: product.title, price: product.price })
}

export function trackPurchase(product: { id: number; title: string; price: number }): void {
  trackEvent('purchase', { item_id: product.id, item_name: product.title, value: product.price, currency: 'RUB' })
}

export function trackAddToFavorites(productId: number): void {
  trackEvent('add_to_favorites', { item_id: productId })
}

export function trackRemoveFromFavorites(productId: number): void {
  trackEvent('remove_from_favorites', { item_id: productId })
}

export function trackSearch(query: string, category?: string): void {
  trackEvent('search', { search_term: query, category: category || 'all' })
}

export function trackAiSearch(query: string): void {
  trackEvent('ai_search', { query })
}

export function trackCategory(category: string): void {
  trackEvent('select_content', { content_type: 'category', item_id: category })
}

export function trackFilter(filter: string): void {
  trackEvent('select_content', { content_type: 'filter', item_id: filter })
}

export function trackSort(sort: string): void {
  trackEvent('select_content', { content_type: 'sort', item_id: sort })
}

export function trackPagination(page: number, category?: string): void {
  trackEvent('pagination', { page, category: category || 'all' })
}

export function trackScrollDepth(mark: number): void {
  trackEvent(`scroll_${mark}`)
}

export function trackInstallPwa(): void {
  trackEvent('install_pwa')
}

export function trackClickOutbound(itemId: number): void {
  trackEvent('click_outbound', { item_id: itemId })
}
