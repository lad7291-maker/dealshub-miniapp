const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://smart-skidka.ru';
const ROOT_DIR = path.resolve(__dirname, '..');

function getTodayDate() {
  return new Date().toISOString().split('T')[0];
}

function escapeXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function createUrlEntry(loc, lastmod, changefreq, priority) {
  return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

function getHtmlFiles(dir) {
  try {
    return fs
      .readdirSync(dir)
      .filter((f) => f.endsWith('.html'))
      .sort();
  } catch (e) {
    return [];
  }
}

function generateSitemap() {
  const today = getTodayDate();
  const urls = [];

  // Static pages with priorities
  const staticPages = [
    { path: '/', priority: '1.0', freq: 'daily' },
    { path: '/about.html', priority: '0.5', freq: 'monthly' },
    { path: '/contact.html', priority: '0.5', freq: 'monthly' },
    { path: '/privacy.html', priority: '0.3', freq: 'monthly' },
    { path: '/terms.html', priority: '0.3', freq: 'monthly' },
  ];

  // Category pages
  const categories = [
    'electronics.html',
    'auto.html',
    'beauty.html',
    'clothing.html',
    'home.html',
    'shoes.html',
    'sports.html',
  ];

  // Blog posts
  const blogPosts = getHtmlFiles(path.join(ROOT_DIR, 'blog'));

  // Product items
  const items = getHtmlFiles(path.join(ROOT_DIR, 'item'));

  console.log(
    `Found: ${items.length} items, ${categories.length} categories, ${blogPosts.length} blog posts`
  );

  // Add static pages
  for (const page of staticPages) {
    urls.push(createUrlEntry(`${BASE_URL}${page.path}`, today, page.freq, page.priority));
  }

  // Add categories
  for (const cat of categories) {
    if (fs.existsSync(path.join(ROOT_DIR, cat))) {
      urls.push(createUrlEntry(`${BASE_URL}/${cat}`, today, 'weekly', '0.7'));
    }
  }

  // Add blog posts
  for (const post of blogPosts) {
    urls.push(createUrlEntry(`${BASE_URL}/blog/${post}`, today, 'monthly', '0.6'));
  }

  // Add product items
  for (const item of items) {
    urls.push(createUrlEntry(`${BASE_URL}/item/${item}`, today, 'weekly', '0.8'));
  }

  // Build XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

  // Write sitemap
  const sitemapPath = path.join(ROOT_DIR, 'sitemap.xml');
  fs.writeFileSync(sitemapPath, xml, 'utf8');

  console.log(`✅ Sitemap generated: ${urls.length} URLs`);
  console.log(`📁 Saved to: ${sitemapPath}`);
  console.log(`📊 Size: ${(fs.statSync(sitemapPath).size / 1024).toFixed(1)} KB`);
}

generateSitemap();
