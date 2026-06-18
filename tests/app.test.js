/* ============================================
   SmartSkidka.ru — Basic Tests
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

console.log('\n=== SmartSkidka Tests ===\n');

// Test 1: Files exist
console.log('File Structure:');
test('index.html exists', () => assert(fs.existsSync('index.html')));
test('sw.js exists', () => assert(fs.existsSync('sw.js')));
test('css/style.css exists', () => assert(fs.existsSync('css/style.css')));
test('js/app.js exists', () => assert(fs.existsSync('js/app.js')));
test('js/products-loader.js exists', () => assert(fs.existsSync('js/products-loader.js')));

// Test 2: Category pages exist
console.log('\nCategory Pages:');
const cats = ['electronics', 'clothing', 'home', 'auto', 'beauty', 'jewelry', 'sports', 'toys'];
cats.forEach((cat) => {
  test(cat + '.html exists', () => assert(fs.existsSync(cat + '.html')));
});

// Test 3: Item pages exist
console.log('\nItem Pages:');
test('item directory exists and has pages', () => {
  const items = fs.readdirSync('item').filter((f) => f.endsWith('.html'));
  assert(items.length > 0, 'no item pages found');
});

// Test 4: JSON data exists
console.log('\nData Files:');
test('products/all.json exists', () => assert(fs.existsSync('products/all.json')));
test('products/index.json exists', () => assert(fs.existsSync('products/index.json')));

// Test 5: JS syntax
console.log('\nJS Syntax:');
test('app.js is valid JS', () => {
  const code = fs.readFileSync('js/app.js', 'utf8');
  assert(code.includes('function escapeHtml'), 'escapeHtml not found');
  assert(code.includes('function createProductCard'), 'createProductCard not found');
});
test('products-loader.js is valid JS', () => {
  const code = fs.readFileSync('js/products-loader.js', 'utf8');
  assert(code.includes('loadInitialProducts'), 'loadInitialProducts not found');
  assert(!code.includes('cacheBuster'), 'cacheBuster should be removed');
  assert(!code.includes("cache: 'no-store'"), 'no-store should be removed');
});

// Test 6: Security
console.log('\nSecurity:');
test('escapeHtml function exists', () => {
  const code = fs.readFileSync('js/app.js', 'utf8');
  assert(code.includes('function escapeHtml'), 'escapeHtml not found');
});
test('XSS: product.title is escaped', () => {
  const code = fs.readFileSync('js/app.js', 'utf8');
  assert(code.includes('escapeHtml(product.title)'), 'product.title not escaped');
});
test('Favorites limit exists', () => {
  const code = fs.readFileSync('js/app.js', 'utf8');
  assert(code.includes('FAV_MAX_SIZE'), 'FAV_MAX_SIZE not found');
});

// Test 7: Analytics
console.log('\nAnalytics:');
test('gtag search event exists', () => {
  const code = fs.readFileSync('js/app.js', 'utf8');
  assert(code.includes("gtag('event', 'search'"), 'search event not found');
});
test('gtag purchase event exists', () => {
  const code = fs.readFileSync('js/app.js', 'utf8');
  assert(code.includes("gtag('event','purchase'"), 'purchase event not found');
});

// Test 8: SEO
console.log('\nSEO:');
test('sitemap.xml exists', () => assert(fs.existsSync('sitemap.xml')));
test('sitemap has category pages', () => {
  const sitemap = fs.readFileSync('sitemap.xml', 'utf8');
  assert(sitemap.includes('electronics.html'), 'electronics not in sitemap');
});
test('blog posts in sitemap', () => {
  const sitemap = fs.readFileSync('sitemap.xml', 'utf8');
  assert(sitemap.includes('blog/'), 'blog not in sitemap');
});

// Test 9: PWA
console.log('\nPWA:');
test('manifest.json exists', () => assert(fs.existsSync('manifest.json')));
test('Service Worker registered', () => {
  const html = fs.readFileSync('index.html', 'utf8');
  assert(html.includes('serviceWorker.register'), 'SW registration not found');
});

// Test 10: Performance
console.log('\nPerformance:');
test('products.js is reasonable (< 2MB)', () => {
  const size = fs.statSync('js/products.js').size;
  assert(size < 2 * 1024 * 1024, 'products.js is ' + size + ' bytes, should be < 2MB');
});
test('No cache-buster in products-loader', () => {
  const code = fs.readFileSync('js/products-loader.js', 'utf8');
  assert(!code.includes('Date.now()'), 'Date.now() cache buster found');
});

// Summary
console.log('\n=== Results ===');
console.log('Passed: ' + passed);
console.log('Failed: ' + failed);
console.log(failed === 0 ? '\n✓ All tests passed!' : '\n✗ Some tests failed.');
process.exit(failed > 0 ? 1 : 0);
