/**
 * SEO basic checks for v2 React app
 * Run: node v2/scripts/test-seo.js
 */

const fs = require('fs');
const path = require('path');

const V2_DIR = path.join(__dirname, '..');

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

console.log('\n=== V2 SEO Basic Tests ===\n');

const indexHtml = fs.readFileSync(path.join(V2_DIR, 'index.html'), 'utf-8');
const seoTsx = fs.readFileSync(path.join(V2_DIR, 'src', 'components', 'SEO.tsx'), 'utf-8');
const robotsTxt = fs.readFileSync(path.join(V2_DIR, 'public', 'robots.txt'), 'utf-8');

test('index.html has lang="ru"', () => {
  assert(indexHtml.includes('<html lang="ru">'), 'lang attribute should be ru');
});

test('index.html does not have lang="en"', () => {
  assert(!indexHtml.includes('<html lang="en">'), 'lang attribute should not be en');
});

test('SEO.tsx uses smart-skidka.ru for canonical', () => {
  assert(seoTsx.includes('https://smart-skidka.ru'), 'canonical should use smart-skidka.ru');
});

test('SEO.tsx does not use smartskidka.ru (without dash) for canonical', () => {
  assert(
    !seoTsx.includes('https://smartskidka.ru'),
    'canonical should not use smartskidka.ru without dash'
  );
});

test('SEO.tsx includes og:url', () => {
  assert(seoTsx.includes('property="og:url"'), 'og:url meta tag should be present');
});

test('robots.txt exists and allows all', () => {
  assert(robotsTxt.includes('User-agent: *'), 'robots.txt should have User-agent');
  assert(robotsTxt.includes('Allow: /'), 'robots.txt should allow root');
});

test('robots.txt points to smart-skidka.ru sitemap', () => {
  assert(
    robotsTxt.includes('Sitemap: https://smart-skidka.ru/sitemap.xml'),
    'robots.txt sitemap should use smart-skidka.ru'
  );
});

test('robots.txt blocks /api/ and query strings', () => {
  assert(robotsTxt.includes('Disallow: /api/'), 'robots.txt should block /api/');
  assert(robotsTxt.includes('Disallow: /*?*'), 'robots.txt should block query strings');
});

console.log('\n' + (failed === 0 ? '✅ All tests passed' : `❌ ${failed} test(s) failed`) + `\n`);
process.exit(failed === 0 ? 0 : 1);
