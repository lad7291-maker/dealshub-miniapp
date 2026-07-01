import type { BlogPost } from '@/types';

export async function loadBlogPosts(): Promise<BlogPost[]> {
  try {
    const res = await fetch('/blog.json');
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}
