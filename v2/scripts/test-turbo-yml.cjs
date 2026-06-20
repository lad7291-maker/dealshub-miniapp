/**
 * Tests for Yandex Turbo and Yandex Market feeds.
 * Run after `npm run build`.
 */

const fs = require('fs');
const path = require('path');

const V2_DIR = path.join(__dirname, '..');
const DIST_DIR = path.join(V2_DIR, 'dist');
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

function assertIncludes(haystack, needle, msg) {
  if (!haystack.includes(needle)) throw new Error(msg || `Expected to include: ${needle}`);
}

console.log('\n=== Yandex Turbo / Market Tests ===\n');

const turboPath = path.join(DIST_DIR, 'turbo.xml');
const ymlPath = path.join(DIST_DIR, 'yandex-market.yml');
const products = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf-8'));

test('turbo.xml exists', () => {
  assert(fs.existsSync(turboPath), 'turbo.xml should exist in dist/');
});

test('yandex-market.yml exists', () => {
  assert(fs.existsSync(ymlPath), 'yandex-market.yml should exist in dist/');
});

// Turbo tests
const turbo = fs.readFileSync(turboPath, 'utf-8');

test('turbo.xml is valid RSS with turbo namespace', () => {
  assertIncludes(turbo, '<?xml version="1.0" encoding="UTF-8"?>', 'should have XML declaration');
  assertIncludes(turbo, '<rss xmlns:yandex="http://news.yandex.ru"', 'should have yandex namespace');
  assertIncludes(turbo, 'xmlns:turbo="http://turbo.yandex.ru"', 'should have turbo namespace');
  assertIncludes(turbo, '<channel>', 'should have channel');
  assertIncludes(turbo, '</channel>', 'should close channel');
  assertIncludes(turbo, '</rss>', 'should close rss');
});

test('turbo.xml has channel metadata', () => {
  assertIncludes(turbo, '<title>SmartSkidka.ru', 'should have title');
  assertIncludes(turbo, 'https://smart-skidka.ru/', 'should have link');
  assertIncludes(turbo, '<language>ru</language>', 'should have language ru');
});

test('turbo.xml has Yandex analytics', () => {
  assertIncludes(turbo, '<turbo:analytics type="Yandex" id="109145874"/>', 'should have Yandex analytics');
});

test('turbo.xml has homepage item', () => {
  assertIncludes(turbo, '<link>https://smart-skidka.ru/</link>', 'should have homepage link');
  assertIncludes(turbo, 'turbo="true"', 'should have turbo="true"');
});

test('turbo.xml has category items', () => {
  assertIncludes(turbo, '/electronics.html', 'should have electronics category');
  assertIncludes(turbo, '/clothing.html', 'should have clothing category');
  assertIncludes(turbo, '/shoes.html', 'should have shoes category');
});

test('turbo.xml has product items with real data', () => {
  // Check that at least some product items exist with real product data
  const productCount = (turbo.match(/<item turbo="true">/g) || []).length;
  assert(productCount > 7, `Expected more than 7 items (homepage + categories), got ${productCount}`);
  assertIncludes(turbo, 'item/', 'should have product item links');
});

test('turbo.xml product items have required fields', () => {
  assertIncludes(turbo, '<turbo:source>', 'should have turbo:source');
  assertIncludes(turbo, '<turbo:topic>', 'should have turbo:topic');
  assertIncludes(turbo, '<pubDate>', 'should have pubDate');
  assertIncludes(turbo, '<turbo:content>', 'should have turbo:content');
  assertIncludes(turbo, '<![CDATA[', 'should have CDATA sections');
});

// Yandex Market tests
const yml = fs.readFileSync(ymlPath, 'utf-8');

test('yandex-market.yml is valid YML catalog', () => {
  assertIncludes(yml, '<?xml version="1.0" encoding="UTF-8"?>', 'should have XML declaration');
  assertIncludes(yml, '<!DOCTYPE yml_catalog SYSTEM "shops.dtd">', 'should have DOCTYPE');
  assertIncludes(yml, '<yml_catalog', 'should have yml_catalog');
  assertIncludes(yml, '</yml_catalog>', 'should close yml_catalog');
});

test('yandex-market.yml has shop metadata', () => {
  assertIncludes(yml, '<name>SmartSkidka.ru</name>', 'should have shop name');
  assertIncludes(yml, 'https://smart-skidka.ru/', 'should have shop URL');
  assertIncludes(yml, '<currency id="RUR"', 'should have RUR currency');
});

test('yandex-market.yml has categories', () => {
  assertIncludes(yml, '<categories>', 'should have categories');
  assertIncludes(yml, 'Электроника', 'should have electronics category');
  assertIncludes(yml, 'Одежда', 'should have clothing category');
  assertIncludes(yml, '</categories>', 'should close categories');
});

test('yandex-market.yml has offers section', () => {
  assertIncludes(yml, '<offers>', 'should have offers');
  assertIncludes(yml, '</offers>', 'should close offers');
});

test('yandex-market.yml contains all products', () => {
  const offerCount = (yml.match(/<offer /g) || []).length;
  assert(offerCount >= products.length * 0.9, `Expected at least ${Math.floor(products.length * 0.9)} offers, got ${offerCount}`);
});

test('yandex-market.yml offers have required fields', () => {
  assertIncludes(yml, '<url>', 'should have offer URLs');
  assertIncludes(yml, '<price>', 'should have prices');
  assertIncludes(yml, '<currencyId>RUR</currencyId>', 'should have RUR currencyId');
  assertIncludes(yml, '<categoryId>', 'should have categoryId');
  assertIncludes(yml, '<picture>', 'should have pictures');
  assertIncludes(yml, '<name>', 'should have names');
});

test('yandex-market.yml uses correct product URLs', () => {
  const sampleProduct = products[0];
  const itemId = sampleProduct.itemId || String(sampleProduct.id);
  assertIncludes(yml, `/item/${itemId}.html`, 'should use /item/{itemId}.html URLs');
});

test('yandex-market.yml does not use placeholder data', () => {
  assert(!yml.includes('Товар со скидкой с AliExpress'), 'should not contain placeholder product name');
  assert(!yml.includes('icons/icon-512x512.png'), 'should not use icon as product picture');
});

console.log('\n' + (failed === 0 ? '✅ All tests passed' : `❌ ${failed} test(s) failed`) + '\n');
process.exit(failed === 0 ? 0 : 1);
