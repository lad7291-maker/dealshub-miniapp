const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, '..', 'blog');
const outputFile = path.join(__dirname, '..', 'blog.json');

function parseBlogPost(htmlPath) {
  const html = fs.readFileSync(htmlPath, 'utf-8');
  
  // Extract title
  const titleMatch = html.match(/<title>(.*?)<\/title>/);
  const title = titleMatch ? titleMatch[1] : path.basename(htmlPath, '.html');
  
  // Extract first paragraph as excerpt
  const pMatch = html.match(/<p>(.*?)<\/p>/);
  const excerpt = pMatch ? pMatch[1].substring(0, 200) : '';
  
  // Extract category from first H2 or default
  const h2Match = html.match(/<h2>(.*?)<\/h2>/);
  const category = h2Match ? h2Match[1] : 'Обзор';
  
  // Extract date from filename or use today
  const basename = path.basename(htmlPath, '.html');
  const dateMatch = basename.match(/(\d{4}-\d{2}-\d{2})/);
  const date = dateMatch ? dateMatch[1] : new Date().toISOString().split('T')[0];
  
  return {
    id: basename,
    title,
    excerpt: excerpt.replace(/<[^>]*>/g, '').substring(0, 150) + '...',
    category,
    date,
    readTime: '5 мин',
    url: `/blog/${basename}.html`,
  };
}

function main() {
  if (!fs.existsSync(blogDir)) {
    console.log('No blog directory');
    fs.writeFileSync(outputFile, '[]');
    return;
  }
  
  const files = fs.readdirSync(blogDir)
    .filter(f => f.endsWith('.html'))
    .sort((a, b) => {
      const statA = fs.statSync(path.join(blogDir, a));
      const statB = fs.statSync(path.join(blogDir, b));
      return statB.mtime - statA.mtime; // newest first
    });
  
  const posts = files.map(f => parseBlogPost(path.join(blogDir, f)));
  
  fs.writeFileSync(outputFile, JSON.stringify(posts, null, 2), 'utf-8');
  console.log(`Generated blog.json with ${posts.length} posts`);
}

main();
