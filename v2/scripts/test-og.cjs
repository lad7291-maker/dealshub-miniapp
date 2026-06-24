/**
 * Tests for Open Graph and Twitter Cards meta tags.
 */

const fs = require('fs');
const path = require('path');

const V2_DIR = path.join(__dirname, '..');
const SEO_TSX = fs.readFileSync(path.join(V2_DIR, 'src', 'components', 'SEO.tsx'), 'utf-8');
const ITEM_PAGE = fs.readFileSync(
  path.join(V2_DIR, 'dist', 'item', '1005012187879342.html'),
  'utf-8'
);

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

console.log('\n=== Open Graph / Twitter Cards Tests ===\n');

// SEO.tsx source tests
test('SEO.tsx has og:locale ru_RU', () => {
  assertIncludes(SEO_TSX, 'og:locale', 'should have og:locale');
  assertIncludes(SEO_TSX, 'ru_RU', 'should use ru_RU locale');
});

test('SEO.tsx has twitter:card summary_large_image', () => {
  assertIncludes(SEO_TSX, 'twitter:card', 'should have twitter:card');
  assertIncludes(SEO_TSX, 'summary_large_image', 'should use summary_large_image');
});

test('SEO.tsx has twitter:title', () => {
  assertIncludes(SEO_TSX, 'twitter:title', 'should have twitter:title');
});

test('SEO.tsx has twitter:description', () => {
  assertIncludes(SEO_TSX, 'twitter:description', 'should have twitter:description');
});

test('SEO.tsx has twitter:image conditional', () => {
  assertIncludes(SEO_TSX, 'twitter:image', 'should have twitter:image');
});

test('SEO.tsx has og:image conditional', () => {
  assertIncludes(SEO_TSX, 'og:image', 'should have og:image');
});

test('SEO.tsx has og:site_name', () => {
  assertIncludes(SEO_TSX, 'og:site_name', 'should have og:site_name');
});

test('SEO.tsx has og:type', () => {
  assertIncludes(SEO_TSX, 'og:type', 'should have og:type');
});

test('SEO.tsx has og:url', () => {
  assertIncludes(SEO_TSX, 'og:url', 'should have og:url');
});

// Product page static HTML tests
test('product page has og:title', () => {
  assertIncludes(ITEM_PAGE, 'property="og:title"', 'should have og:title');
});

test('product page has og:description', () => {
  assertIncludes(ITEM_PAGE, 'property="og:description"', 'should have og:description');
});

test('product page has og:type product', () => {
  assertIncludes(ITEM_PAGE, 'property="og:type"', 'should have og:type');
  assertIncludes(ITEM_PAGE, 'product', 'should have product type');
});

test('product page has og:url', () => {
  assertIncludes(ITEM_PAGE, 'property="og:url"', 'should have og:url');
});

test('product page has og:image', () => {
  assertIncludes(ITEM_PAGE, 'property="og:image"', 'should have og:image');
});

test('product page has og:site_name', () => {
  assertIncludes(ITEM_PAGE, 'property="og:site_name"', 'should have og:site_name');
});

test('product page has product:price:amount', () => {
  assertIncludes(ITEM_PAGE, 'property="product:price:amount"', 'should have product:price:amount');
});

test('product page has product:price:currency RUB', () => {
  assertIncludes(
    ITEM_PAGE,
    'property="product:price:currency"',
    'should have product:price:currency'
  );
  assertIncludes(ITEM_PAGE, 'RUB', 'should have RUB currency');
});

test('product page has og:locale', () => {
  assertIncludes(ITEM_PAGE, 'property="og:locale"', 'should have og:locale');
});

test('product page has twitter:card', () => {
  assertIncludes(ITEM_PAGE, 'name="twitter:card"', 'should have twitter:card');
});

test('product page has twitter:image', () => {
  assertIncludes(ITEM_PAGE, 'name="twitter:image"', 'should have twitter:image');
});

console.log('\n' + (failed === 0 ? '✅ All tests passed' : `❌ ${failed} test(s) failed`) + '\n');
process.exit(failed === 0 ? 0 : 1);
