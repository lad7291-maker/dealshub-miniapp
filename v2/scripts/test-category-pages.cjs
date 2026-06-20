/**
 * Tests for static category pages /{category}.html.
 * Run after `npm run build`.
 */

const fs = require('fs');
const path = require('path');

const V2_DIR = path.join(__dirname, '..');
const DIST_DIR = path.join(V2_DIR, 'dist');
const CATEGORIES_FILE = path.join(V2_DIR, 'public', 'categories.json');

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

console.log('\n=== Category Pages Tests ===\n');

const categories = JSON.parse(fs.readFileSync(CATEGORIES_FILE, 'utf-8'));
const catSlugs = categories.filter(c => c.id !== 'all').map(c => c.slug);

for (const slug of catSlugs) {
  const filePath = path.join(DIST_DIR, `${slug}.html`);
  const html = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf-8') : '';

  test(`category page ${slug}.html exists`, () => {
    assert(fs.existsSync(filePath), `file ${slug}.html should exist`);
  });

  test(`category page ${slug}.html has correct title`, () => {
    assert(html.includes(`<title>`), 'should have title tag');
    assert(html.includes('SmartSkidka'), 'title should contain SmartSkidka');
  });

  test(`category page ${slug}.html has meta description`, () => {
    assertIncludes(html, '<meta name="description"', 'description meta should exist');
  });

  test(`category page ${slug}.html has canonical pointing to /${slug}.html`, () => {
    assertIncludes(html, `https://smart-skidka.ru/${slug}.html`, 'canonical should point to category url');
  });

  test(`category page ${slug}.html has JSON-LD ItemList schema`, () => {
    assertIncludes(html, '"@type":"ItemList"', 'JSON-LD should contain ItemList schema');
  });

  test(`category page ${slug}.html exposes window.__CATEGORY_SLUG__`, () => {
    assertIncludes(html, `window.__CATEGORY_SLUG__ = "${slug}"`, 'window.__CATEGORY_SLUG__ should be set');
  });

  test(`category page ${slug}.html contains SSR product grid`, () => {
    assertIncludes(html, '<article class="product-card"', 'should have product cards');
    assertIncludes(html, '<section class="product-grid">', 'should have product grid section');
  });

  test(`category page ${slug}.html has OG meta tags`, () => {
    assertIncludes(html, 'property="og:title"', 'should have og:title');
    assertIncludes(html, 'property="og:description"', 'should have og:description');
    assertIncludes(html, 'property="og:url"', 'should have og:url');
  });

  test(`category page ${slug}.html has Twitter meta tags`, () => {
    assertIncludes(html, 'name="twitter:card"', 'should have twitter:card');
  });
}

test('all expected category pages exist', () => {
  const expected = ['electronics', 'clothing', 'shoes', 'home', 'auto', 'beauty', 'sport'];
  for (const slug of expected) {
    assert(fs.existsSync(path.join(DIST_DIR, `${slug}.html`)), `${slug}.html should exist`);
  }
});

test('no all.html category page generated', () => {
  assert(!fs.existsSync(path.join(DIST_DIR, 'all.html')), 'all.html should not exist');
});

console.log('\n' + (failed === 0 ? '✅ All tests passed' : `❌ ${failed} test(s) failed`) + '\n');
process.exit(failed === 0 ? 0 : 1);
