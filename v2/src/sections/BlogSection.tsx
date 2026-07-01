import { useState } from 'react';
import { BookOpen, Clock, Calendar, ArrowRight } from 'lucide-react';
import type { BlogPost } from '@/types';

interface BlogSectionProps {
  posts: BlogPost[];
}

export function BlogSection({
  posts,
}: BlogSectionProps) {
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  if (activePost && (activePost as any).url) {
    window.open((activePost as any).url, '_blank');
    setActivePost(null);
    return null;
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="flex items-center gap-2 mb-6">
        <BookOpen className="w-5 h-5 text-cyan-400" />
        <h2 className="text-xl sm:text-2xl font-bold text-white">Блог</h2>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12 text-slate-500">
          <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p className="text-lg">Пока нет статей</p>
          <p className="text-sm mt-2">Агенты скоро создадут контент</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {posts.map((post) => (
            <button
              key={post.id}
              onClick={() => setActivePost(post)}
              className="text-left group bg-slate-800/50 border border-slate-700/50 rounded-2xl p-4 sm:p-5 hover:border-cyan-500/30 transition-all"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full">
                  {post.category}
                </span>
                <span className="flex items-center gap-1 text-xs text-slate-500">
                  <Calendar className="w-3 h-3" /> {post.date}
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                {post.title}
              </h3>

              <p className="text-sm text-slate-400 mb-3 line-clamp-2">{post.excerpt}</p>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1 text-xs text-slate-500">
                  <Clock className="w-3 h-3" /> {post.readTime}
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-cyan-400 group-hover:translate-x-1 transition-transform">
                  Читать <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
