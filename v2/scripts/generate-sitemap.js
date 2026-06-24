#!/usr/bin/env node
/**
 * Generate sitemap.xml for v2 after build.
 * Reads v2/public/products.json and v2/public/categories.json.
 * Run: node scripts/generate-sitemap.js
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.resolve(__dirname, '..', 'dist');
const PUBLIC_DIR = path.resolve(__dirname, '..', 'public');
const SITEMAP_PATH = path.join(DIST_DIR, 'sitemap.xml');

const BASE_URL = 'https://smart-skidka.ru';

const STATIC_PAGES = [
  { path: '/', priority: '1.0', changefreq: 'daily' },
  { path: '/promo', priority: '0.8', changefreq: 'weekly' },
  { path: '/blog', priority: '0.7', changefreq: 'weekly' },
  { path: '/favorites', priority: '0.3', changefreq: 'weekly' },
  { path: '/about.html', priority: '0.5', changefreq: 'monthly' },
  { path: '/contact.html', priority: '0.5', changefreq: 'monthly' },
  { path: '/privacy.html', priority: '0.3', changefreq: 'monthly' },
  { path: '/terms.html', priority: '0.3', changefreq: 'monthly' },
];

const BLOG_POSTS = [
  { slug: 'dostavka-s-aliexpress-v-rossiyu-2026', priority: '0.7', changefreq: 'monthly' },
  { slug: 'elektronika-iz-kitaya-stoit-li-pokupat', priority: '0.7', changefreq: 'monthly' },
  { slug: 'kak-ekonomit-na-aliexpress', priority: '0.8', changefreq: 'monthly' },
  { slug: 'krasota-dlya-kazhdoi', priority: '0.6', changefreq: 'monthly' },
  { slug: 'letnie-trendy-v-kosmetike-2026', priority: '0.6', changefreq: 'monthly' },
  { slug: 'luchshie-krossovki-aliexpress-2026', priority: '0.7', changefreq: 'monthly' },
  { slug: 'modnie-trendy-leta-2026', priority: '0.6', changefreq: 'monthly' },
  { slug: 'samye-populyarnye-tovary-aliexpress', priority: '0.7', changefreq: 'monthly' },
  { slug: 'top-tovary-dlya-krasoty-2026', priority: '0.6', changefreq: 'monthly' },
  { slug: 'ukhod-za-kozhei-2026', priority: '0.6', changefreq: 'monthly' },
];

function escapeXml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function today() {
  return new Date().toISOString().split('T')[0];
}

function urlEntry(loc, priority, changefreq, lastmod = today()) {
  return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

function main() {
  if (!fs.existsSync(path.join(PUBLIC_DIR, 'products.json'))) {
    console.error(`❌ products.json not found at ${PUBLIC_DIR}`);
    process.exit(1);
  }
  if (!fs.existsSync(path.join(PUBLIC_DIR, 'categories.json'))) {
    console.error(`❌ categories.json not found at ${PUBLIC_DIR}`);
    process.exit(1);
  }

  const products = JSON.parse(fs.readFileSync(path.join(PUBLIC_DIR, 'products.json'), 'utf-8'));
  const categories = JSON.parse(fs.readFileSync(path.join(PUBLIC_DIR, 'categories.json'), 'utf-8'));

  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ];

  // Static pages
  for (const p of STATIC_PAGES) {
    lines.push(urlEntry(`${BASE_URL}${p.path}`, p.priority, p.changefreq));
  }

  // Category pages (skip 'all')
  for (const cat of categories) {
    if (cat.id === 'all') continue;
    lines.push(urlEntry(`${BASE_URL}/${cat.slug}.html`, '0.8', 'daily'));
  }

  // Product pages
  for (const product of products) {
    const itemId = product.itemId || String(product.id);
    lines.push(urlEntry(`${BASE_URL}/item/${itemId}.html`, '0.6', 'daily'));
  }

  // Blog posts
  for (const post of BLOG_POSTS) {
    lines.push(urlEntry(`${BASE_URL}/blog/${post.slug}.html`, post.priority, post.changefreq));
  }

  lines.push('</urlset>');

  fs.mkdirSync(DIST_DIR, { recursive: true });
  fs.writeFileSync(SITEMAP_PATH, lines.join('\n') + '\n', 'utf-8');

  const totalUrls =
    STATIC_PAGES.length + (categories.length - 1) + products.length + BLOG_POSTS.length;
  console.log(`✅ Generated sitemap.xml with ${totalUrls} URLs at ${SITEMAP_PATH}`);
  console.log(`   - Static pages: ${STATIC_PAGES.length}`);
  console.log(`   - Categories: ${categories.length - 1}`);
  console.log(`   - Products: ${products.length}`);
  console.log(`   - Blog posts: ${BLOG_POSTS.length}`);
}

main();
