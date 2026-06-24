interface SEOSectionProps {
  title: string;
  paragraphs: string[];
  keywords?: string[];
}

export function SEOSection({ title, paragraphs, keywords }: SEOSectionProps) {
  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="max-w-4xl">
        <h2 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">{title}</h2>
        <div className="space-y-3 sm:space-y-4">
          {paragraphs.map((p, i) => (
            <p
              key={i}
              className="text-sm sm:text-base text-slate-400 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: p }}
            />
          ))}
        </div>
        {keywords && keywords.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-slate-700/30">
            {keywords.map((kw, i) => (
              <span
                key={i}
                className="text-xs text-slate-500 bg-slate-700/30 px-2.5 py-1 rounded-full"
              >
                {kw}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
