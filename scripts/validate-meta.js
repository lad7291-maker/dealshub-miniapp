#!/usr/bin/env node
/**
 * Validate meta tags on key pages
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
  else if (title.length < 30 || title.length > 60)
    errors.push(`title length ${title.length} (expected 30-60)`);

  if (!description) errors.push('missing meta description');
  else if (description.length < 70 || description.length > 160)
    errors.push(`description length ${description.length} (expected 70-160)`);

  if (!canonical) errors.push('missing canonical');
  if (!ogTitle) errors.push('missing og:title');
  if (!ogDescription) errors.push('missing og:description');
  if (!ogImage) errors.push('missing og:image');
  if (!ogUrl) errors.push('missing og:url');

  if (expectedType === 'product') {
    const ogPrice = doc.querySelector('meta[property="og:price:amount"]')?.getAttribute('content');
    if (!ogPrice) errors.push('missing og:price:amount for product');
  }

  return { file: filePath, title, description, errors };
}

const pages = [
  { path: 'index.html', type: 'website' },
  { path: 'electronics.html', type: 'website' },
  { path: 'clothing.html', type: 'website' },
];

// Add random sample of item pages
const itemDir = path.join(ROOT_DIR, 'item');
const itemPages = fs
  .readdirSync(itemDir)
  .filter((f) => f.endsWith('.html'))
  .slice(0, 5);
pages.push(...itemPages.map((f) => ({ path: path.join('item', f), type: 'product' })));

let totalErrors = 0;
for (const page of pages) {
  const result = validatePage(page.path, page.type);
  if (result.errors.length > 0) {
    console.error(`❌ ${result.file}:`);
    result.errors.forEach((e) => console.error(`   - ${e}`));
    totalErrors += result.errors.length;
  } else {
    console.log(`✅ ${result.file}`);
  }
}

if (totalErrors > 0) {
  console.error(`\n✗ ${totalErrors} meta tag error(s) found`);
  process.exit(1);
}

console.log('\n✓ All meta tags are valid');
