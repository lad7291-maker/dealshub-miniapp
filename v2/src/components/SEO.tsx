import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title: string
  description: string
  keywords?: string
  ogImage?: string
  ogType?: string
  canonical?: string
  faqSchema?: { question: string; answer: string }[]
}

export function SEO({ title, description, keywords, ogImage, ogType = 'website', canonical, faqSchema }: SEOProps) {
  const fullTitle = title.includes('SmartSkidka')
    ? title
    : `${title} — SmartSkidka.ru`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={`https://smart-skidka.ru${canonical || '/'}`} />
      <meta property="og:site_name" content="SmartSkidka.ru" />
      {ogImage && <meta property="og:image" content={ogImage} />}
      <link rel="canonical" href={`https://smart-skidka.ru${canonical || '/'}`} />
      
      {faqSchema && faqSchema.length > 0 && (
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqSchema.map(item => ({
              '@type': 'Question',
              name: item.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer,
              },
            })),
          })}
        </script>
      )}
    </Helmet>
  )
}
