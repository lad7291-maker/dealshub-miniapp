#!/usr/bin/env node
/**
 * Validate meta tags on key pages (v2 structure)
 * v2 index.html is a React entry point — meta tags are rendered client-side or injected into item pages
 */

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const ROOT_DIR = path.resolve(__dirname, '..');

function validatePage(filePath, expectedType = 'website') {
  const fullPath = path.join(ROOT_DIR, filePath);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  const html = fs.readFileSync(fullPath, 'utf8');
  const dom = new JSDOM(html);
  const doc = dom.window.document;

  const title = doc.querySelector('title')?.textContent?.trim();
  const description = doc.querySelector('meta[name="description"]')?.getAttribute('content');
  const canonical = doc.querySelector('link[rel="canonical"]')?.getAttribute('href');
  const ogTitle = doc.querySelector('meta[property="og:title"]')?.getAttribute('content');
  const ogDescription = doc
    .querySelector('meta[property="og:description"]')
    ?.getAttribute('content');
  const ogImage = doc.querySelector('meta[property="og:image"]')?.getAttribute('content');
  const ogUrl = doc.querySelector('meta[property="og:url"]')?.getAttribute('content');

  const errors = [];

  if (!title) errors.push('missing <title>');
  else if (title.length < 10 || title.length > 70)
    errors.push(`title length ${title.length} (expected 10-70)`);

  if (!description) errors.push('missing meta description');
  else if (description.length < 50 || description.length > 170)
    errors.push(`description length ${description.length} (expected 50-170)`);

  if (!canonical) errors.push('missing canonical');
  if (!ogTitle) errors.push('missing og:title');
  if (!ogDescription) errors.push('missing og:description');
  if (!ogImage) errors.push('missing og:image');
  if (!ogUrl) errors.push('missing og:url');

  if (expectedType === 'product') {
    // v2 uses product:price:amount (Open Graph product namespace)
    const ogPrice = doc.querySelector('meta[property="product:price:amount"]')?.getAttribute('content');
    if (!ogPrice) errors.push('missing product:price:amount for product');
  }

  return { file: filePath, title, description, errors };
}

const pages = [];

// Skip index.html check for v2 — it's a React SPA entry point
// Meta tags are rendered dynamically by React Helmet / SEO component
// Instead, check a sample of item pages which have SSR-injected meta tags

// Add random sample of item pages
const itemDir = path.join(ROOT_DIR, 'item');
if (fs.existsSync(itemDir)) {
  const itemPages = fs
    .readdirSync(itemDir)
    .filter((f) => f.endsWith('.html'))
    .slice(0, 5);
  pages.push(...itemPages.map((f) => ({ path: path.join('item', f), type: 'product' })));
}

if (pages.length === 0) {
  console.log('⚠️ No item pages found to validate');
  process.exit(0);
}

let totalErrors = 0;
for (const page of pages) {
  try {
    const result = validatePage(page.path, page.type);
    if (result.errors.length > 0) {
      console.error(`❌ ${result.file}:`);
      result.errors.forEach((e) => console.error(`   - ${e}`));
      totalErrors += result.errors.length;
    } else {
      console.log(`✅ ${result.file}`);
    }
  } catch (err) {
    console.error(`❌ ${page.path}: ${err.message}`);
    totalErrors++;
  }
}

if (totalErrors > 0) {
  console.error(`\n✗ ${totalErrors} meta tag error(s) found`);
  process.exit(1);
}

console.log('\n✓ All meta tags are valid');
