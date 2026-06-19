/**
 * Tests for JSON-LD structured data across v2 pages.
 * Run after `npm run build` (or check source files for SPA JSON-LD).
 */

const fs = require('fs');
const path = require('path');

const V2_DIR = path.join(__dirname, '..');
const DIST_DIR = path.join(V2_DIR, 'dist');

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

function extractJsonLd(html) {
  const matches = [];
  const regex = /<script type="application\/ld\+json">(.*?)<\/script>/gs;
  let m;
  while ((m = regex.exec(html)) !== null) {
    try {
      matches.push(JSON.parse(m[1]));
    } catch {
      // ignore invalid JSON
    }
  }
  return matches;
}

function findSchema(ldArray, type) {
  return ldArray.flatMap(ld => {
    if (ld['@type'] === type) return [ld];
    if (Array.isArray(ld['@graph'])) return ld['@graph'].filter(g => g['@type'] === type);
    return [];
  });
}

console.log('\n=== JSON-LD Structured Data Tests ===\n');

// Test 1: Product pages have Product + Offer + AggregateRating
const productHtml = fs.readFileSync(path.join(DIST_DIR, 'item', '1005012206415022.html'), 'utf-8');
const productLd = extractJsonLd(productHtml);

test('product page has JSON-LD Product schema', () => {
  const products = findSchema(productLd, 'Product');
  assert(products.length > 0, 'should have at least one Product schema');
});

test('product page JSON-LD has Offer', () => {
  const products = findSchema(productLd, 'Product');
  assert(products[0].offers && products[0].offers['@type'] === 'Offer', 'should have Offer');
});

test('product page JSON-LD has AggregateRating', () => {
  const products = findSchema(productLd, 'Product');
  assert(products[0].aggregateRating && products[0].aggregateRating['@type'] === 'AggregateRating', 'should have AggregateRating');
});

test('product page JSON-LD has correct sku', () => {
  const products = findSchema(productLd, 'Product');
  assert(products[0].sku === '1005012206415022', 'sku should match itemId');
});

test('product page JSON-LD has correct priceCurrency', () => {
  const products = findSchema(productLd, 'Product');
  assert(products[0].offers.priceCurrency === 'RUB', 'priceCurrency should be RUB');
});

// Test 2: SPA source has JSON-LD generation functions
const appTsx = fs.readFileSync(path.join(V2_DIR, 'src', 'App.tsx'), 'utf-8');
const seoTsx = fs.readFileSync(path.join(V2_DIR, 'src', 'components', 'SEO.tsx'), 'utf-8');

test('App.tsx has generateHomeJsonLd function', () => {
  assertIncludes(appTsx, 'function generateHomeJsonLd');
});

test('App.tsx has generateCategoryJsonLd function', () => {
  assertIncludes(appTsx, 'function generateCategoryJsonLd');
});

test('App.tsx has generateBreadcrumbJsonLd function', () => {
  assertIncludes(appTsx, 'function generateBreadcrumbJsonLd');
});

test('SEO.tsx supports jsonLd prop', () => {
  assertIncludes(seoTsx, 'jsonLd?: Record<string, unknown>');
});

test('SEO.tsx renders jsonLd script tag', () => {
  assertIncludes(seoTsx, 'type="application/ld+json"');
  assertIncludes(seoTsx, 'JSON.stringify(jsonLd)');
});

test('App.tsx passes jsonLd to SEO component', () => {
  assertIncludes(appTsx, 'jsonLd={seo.jsonLd}');
});

test('Home page returns WebSite + Organization + ItemList JSON-LD', () => {
  assertIncludes(appTsx, "'@type': 'WebSite'");
  assertIncludes(appTsx, "'@type': 'Organization'");
  assertIncludes(appTsx, "'@type': 'ItemList'");
  assertIncludes(appTsx, "'@type': 'SearchAction'");
});

test('Category page returns ItemList JSON-LD', () => {
  assertIncludes(appTsx, 'generateCategoryJsonLd(activeCat, products)');
});

test('Product page returns BreadcrumbList JSON-LD', () => {
  assertIncludes(appTsx, 'generateBreadcrumbJsonLd');
  assertIncludes(appTsx, "'@type': 'BreadcrumbList'");
});

test('FAQPage schema still works via faqSchema prop', () => {
  assertIncludes(seoTsx, "'@type': 'FAQPage'");
});

console.log('\n' + (failed === 0 ? '✅ All tests passed' : `❌ ${failed} test(s) failed`) + '\n');
process.exit(failed === 0 ? 0 : 1);
