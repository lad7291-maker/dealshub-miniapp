/**
 * Tests for sitemap.xml generation.
 * Run after `npm run build`.
 */

const fs = require('fs');
const path = require('path');

const V2_DIR = path.join(__dirname, '..');
const SITEMAP_PATH = path.join(V2_DIR, 'dist', 'sitemap.xml');

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    passed++;
    console.log('  ✓ ' + name);
  } catch (e) {
    failed++;
    console.log('  ✗ ' + name);
    console.log('    ' + e.message);
  }
}

function assert(cond, msg) {
  if (!cond) throw new Error(msg || 'Assertion failed');
}

function assertIncludes(haystack, needle, msg) {
  if (!haystack.includes(needle)) throw new Error(msg || `Expected to include: ${needle}`);
}

console.log('\n=== Sitemap Tests ===\n');

const sitemap = fs.readFileSync(SITEMAP_PATH, 'utf-8');

test('sitemap.xml exists', () => {
  assert(fs.existsSync(SITEMAP_PATH), 'sitemap.xml should exist in dist/');
});

test('sitemap is valid XML with urlset', () => {
  assert(sitemap.includes('<?xml version="1.0" encoding="UTF-8"?>'), 'should have XML declaration');
  assert(sitemap.includes('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'), 'should have urlset');
  assert(sitemap.includes('</urlset>'), 'should close urlset');
});

test('sitemap contains homepage', () => {
  assertIncludes(sitemap, 'https://smart-skidka.ru/');
});

test('sitemap contains static pages', () => {
  assertIncludes(sitemap, 'https://smart-skidka.ru/promo');
  assertIncludes(sitemap, 'https://smart-skidka.ru/blog');
  assertIncludes(sitemap, 'https://smart-skidka.ru/about.html');
  assertIncludes(sitemap, 'https://smart-skidka.ru/contact.html');
  assertIncludes(sitemap, 'https://smart-skidka.ru/privacy.html');
  assertIncludes(sitemap, 'https://smart-skidka.ru/terms.html');
});

test('sitemap contains category pages', () => {
  assertIncludes(sitemap, 'https://smart-skidka.ru/electronics.html');
  assertIncludes(sitemap, 'https://smart-skidka.ru/clothing.html');
  assertIncludes(sitemap, 'https://smart-skidka.ru/shoes.html');
  assertIncludes(sitemap, 'https://smart-skidka.ru/home.html');
  assertIncludes(sitemap, 'https://smart-skidka.ru/auto.html');
  assertIncludes(sitemap, 'https://smart-skidka.ru/beauty.html');
  assertIncludes(sitemap, 'https://smart-skidka.ru/sport.html');
});

test('sitemap contains product pages', () => {
  assertIncludes(sitemap, 'https://smart-skidka.ru/item/1005012206415022.html');
  assertIncludes(sitemap, 'https://smart-skidka.ru/item/1005012265934486.html');
});

test('sitemap contains blog posts', () => {
  assertIncludes(sitemap, 'https://smart-skidka.ru/blog/dostavka-s-aliexpress-v-rossiyu-2026.html');
  assertIncludes(sitemap, 'https://smart-skidka.ru/blog/kak-ekonomit-na-aliexpress.html');
});

test('sitemap does not contain /all.html category', () => {
  assert(!sitemap.includes('/all.html'), 'should not include all.html');
});

test('sitemap does not contain /api/ or query strings', () => {
  assert(!sitemap.includes('/api/'), 'should not include API URLs');
  // XML declaration contains ?, that's fine — check for ? in actual URLs
  const urlMatches = sitemap.match(/<loc>(.*?)<\/loc>/g) || [];
  for (const m of urlMatches) {
    const url = m.replace(/<\/?loc>/g, '');
    assert(!url.includes('?'), `URL should not contain query string: ${url}`);
  }
});

test('all URLs use https://smart-skidka.ru', () => {
  const matches = sitemap.match(/<loc>(.*?)<\/loc>/g) || [];
  for (const m of matches) {
    const url = m.replace(/<\/?loc>/g, '');
    assert(url.startsWith('https://smart-skidka.ru/'), `URL should use smart-skidka.ru: ${url}`);
  }
});

test('sitemap has correct URL count', () => {
  const urlCount = (sitemap.match(/<url>/g) || []).length;
  // 8 static + 7 categories + 1050 products + 10 blog = 1075
  assert(urlCount >= 1075, `Expected at least 1075 URLs, got ${urlCount}`);
});

console.log('\n' + (failed === 0 ? '✅ All tests passed' : `❌ ${failed} test(s) failed`) + '\n');
process.exit(failed === 0 ? 0 : 1);
