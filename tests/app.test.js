/* ============================================
   SmartSkidka.ru — v2 Tests
   Run: node tests/app.test.js
   ============================================ */

const fs = require('fs');

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

console.log('\n=== SmartSkidka v2 Tests ===\n');

// Test 1: v2 Files exist
console.log('File Structure:');
test('index.html exists', () => assert(fs.existsSync('index.html')));
test('sw.js exists', () => assert(fs.existsSync('sw.js')));
test('assets/index-*.js exists', () => {
  const assets = fs.readdirSync('assets').filter((f) => f.endsWith('.js'));
  assert(assets.length > 0, 'no JS assets found');
});
test('assets/index-*.css exists', () => {
  const assets = fs.readdirSync('assets').filter((f) => f.endsWith('.css'));
  assert(assets.length > 0, 'no CSS assets found');
});

// Test 2: v2 Data files
console.log('\nData Files:');
test('products.json exists', () => assert(fs.existsSync('products.json')));
test('categories.json exists', () => assert(fs.existsSync('categories.json')));
test('products.json has items', () => {
  const data = JSON.parse(fs.readFileSync('products.json', 'utf8'));
  assert(Array.isArray(data) && data.length > 0, 'products.json is empty');
});

// Test 3: Item pages exist
console.log('\nItem Pages:');
test('item directory exists and has pages', () => {
  const items = fs.readdirSync('item').filter((f) => f.endsWith('.html'));
  assert(items.length > 0, 'no item pages found');
});
test('item pages have product meta', () => {
  const items = fs.readdirSync('item').filter((f) => f.endsWith('.html'));
  const sample = fs.readFileSync('item/' + items[0], 'utf8');
  assert(sample.includes('product:price:amount'), 'missing product:price:amount');
});

// Test 4: SEO
console.log('\nSEO:');
test('sitemap.xml exists', () => assert(fs.existsSync('sitemap.xml')));
test('robots.txt exists', () => assert(fs.existsSync('robots.txt')));
test('sitemap has item pages', () => {
  const sitemap = fs.readFileSync('sitemap.xml', 'utf8');
  assert(sitemap.includes('item/'), 'item pages not in sitemap');
});
test('blog posts in sitemap', () => {
  const sitemap = fs.readFileSync('sitemap.xml', 'utf8');
  assert(sitemap.includes('blog/'), 'blog not in sitemap');
});

// Test 5: PWA
console.log('\nPWA:');
test('manifest.json exists', () => assert(fs.existsSync('manifest.json')));
test('manifest.webmanifest exists', () => assert(fs.existsSync('manifest.webmanifest')));
test('Service Worker script exists', () => assert(fs.existsSync('sw.js')));
test('registerSW.js exists', () => assert(fs.existsSync('registerSW.js')));

// Test 6: Affiliate links
console.log('\nAffiliate Links:');
test('products have affiliate links', () => {
  const products = JSON.parse(fs.readFileSync('products.json', 'utf8'));
  const hasLink = products.some((p) => p.affiliateLink || p.aliLink);
  assert(hasLink, 'no affiliate links found');
});

// Test 7: Performance
console.log('\nPerformance:');
test('products.json is reasonable (< 5MB)', () => {
  const size = fs.statSync('products.json').size;
  assert(size < 5 * 1024 * 1024, 'products.json is ' + size + ' bytes, should be < 5MB');
});

// Summary
console.log('\n=== Results ===');
console.log('Passed: ' + passed);
console.log('Failed: ' + failed);
console.log(failed === 0 ? '\n✓ All tests passed!' : '\n✗ Some tests failed.');
process.exit(failed > 0 ? 1 : 0);
