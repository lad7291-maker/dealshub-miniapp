/**
 * Tests for static /item/{itemId}.html product pages.
 * Run after `npm run build`.
 */

const fs = require('fs');
const path = require('path');

const V2_DIR = path.join(__dirname, '..');
const ITEM_DIR = path.join(V2_DIR, 'dist', 'item');
const PRODUCTS_FILE = path.join(V2_DIR, 'public', 'products.json');

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

console.log('\n=== Product Pages Tests ===\n');

const products = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf-8'));

let generatedFiles;
try {
  generatedFiles = fs.readdirSync(ITEM_DIR).filter((f) => f.endsWith('.html'));
} catch (e) {
  generatedFiles = [];
}

test('products.json contains itemId for every product', () => {
  const missing = products.filter((p) => !p.itemId);
  assert(missing.length === 0, `${missing.length} products missing itemId`);
});

test('dist/item directory exists and contains html files', () => {
  assert(fs.existsSync(ITEM_DIR), 'dist/item directory should exist');
  assert(generatedFiles.length > 0, 'dist/item should contain html files');
});

test('generated one html file per product', () => {
  assert(
    generatedFiles.length === products.length,
    `expected ${products.length} files, got ${generatedFiles.length}`
  );
});

const sampleProducts = [
  products[0],
  products[Math.floor(products.length / 2)],
  products[products.length - 1],
].filter(Boolean);

for (const product of sampleProducts) {
  const itemId = product.itemId;
  const filePath = path.join(ITEM_DIR, `${itemId}.html`);
  const html = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf-8') : '';

  test(`page for ${itemId} exists`, () => {
    assert(fs.existsSync(filePath), `file ${itemId}.html should exist`);
  });

  test(`page for ${itemId} has correct title`, () => {
    assert(html.includes(`<title>${product.title}`), 'title should contain product title');
    assert(html.includes('SmartSkidka.ru'), 'title should contain SmartSkidka.ru');
  });

  test(`page for ${itemId} has meta description`, () => {
    assert(html.includes('<meta name="description"'), 'description meta should exist');
  });

  test(`page for ${itemId} has canonical pointing to /item/${itemId}.html`, () => {
    assert(
      html.includes(`https://smart-skidka.ru/item/${itemId}.html`),
      'canonical should point to product url'
    );
  });

  test(`page for ${itemId} has JSON-LD Product schema`, () => {
    assert(html.includes('"@type":"Product"'), 'JSON-LD should contain Product schema');
    assert(html.includes(`"sku":"${itemId}"`), 'JSON-LD should contain correct sku');
  });

  test(`page for ${itemId} exposes window.__PRODUCT_ITEM_ID__`, () => {
    assert(
      html.includes(`window.__PRODUCT_ITEM_ID__ = "${itemId}"`),
      'window.__PRODUCT_ITEM_ID__ should be set'
    );
  });

  test(`page for ${itemId} contains SSR content`, () => {
    assert(html.includes('<article class="product-ssr"'), 'SSR article should be present');
    assert(html.includes(product.title), 'SSR content should include product title');
  });
}

console.log('\n' + (failed === 0 ? '✅ All tests passed' : `❌ ${failed} test(s) failed`) + '\n');
process.exit(failed === 0 ? 0 : 1);
