import { useEffect } from 'react'
import { initAnalytics } from '@/lib/analytics'

export function Analytics() {
  useEffect(() => {
    // Defer analytics initialization to window.load to avoid blocking render
    if (document.readyState === 'complete') {
      initAnalytics()
    } else {
      window.addEventListener('load', initAnalytics)
      return () => window.removeEventListener('load', initAnalytics)
    }
  }, [])

  return null
}
