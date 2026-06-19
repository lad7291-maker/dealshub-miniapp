/**
 * PWA checks for v2 React app
 * Run: node v2/scripts/test-pwa.cjs
 */

const fs = require('fs')
const path = require('path')

let passed = 0
let failed = 0

function test(name, fn) {
  try {
    fn()
    passed++
    console.log('  ✓ ' + name)
  } catch (e) {
    failed++
    console.log('  ✗ ' + name)
    console.log('    ' + e.message)
  }
}

function assert(cond, msg) {
  if (!cond) throw new Error(msg || 'Assertion failed')
}

console.log('\n=== V2 PWA Tests ===\n')

const v2Dir = path.join(__dirname, '..')
const indexHtml = fs.readFileSync(path.join(v2Dir, 'index.html'), 'utf-8')
const manifestJson = fs.readFileSync(path.join(v2Dir, 'public', 'manifest.json'), 'utf-8')
const manifest = JSON.parse(manifestJson)
const pwaPromptTsx = fs.readFileSync(path.join(v2Dir, 'src', 'components', 'PWAInstallPrompt.tsx'), 'utf-8')
const viteConfig = fs.readFileSync(path.join(v2Dir, 'vite.config.ts'), 'utf-8')

test('index.html has lang="ru"', () => {
  assert(indexHtml.includes('<html lang="ru">'), 'lang should be ru')
})

test('index.html has theme-color meta', () => {
  assert(indexHtml.includes('name="theme-color"'), 'theme-color meta should be present')
})

test('index.html has apple-mobile-web-app meta tags', () => {
  assert(indexHtml.includes('name="apple-mobile-web-app-capable"'), 'apple-mobile-web-app-capable should be present')
  assert(indexHtml.includes('name="apple-mobile-web-app-status-bar-style"'), 'apple-mobile-web-app-status-bar-style should be present')
})

test('index.html has apple-touch-icon', () => {
  assert(indexHtml.includes('rel="apple-touch-icon"'), 'apple-touch-icon should be present')
})

test('manifest.json is valid JSON with required fields', () => {
  assert(manifest.name, 'manifest should have name')
  assert(manifest.short_name, 'manifest should have short_name')
  assert(manifest.start_url, 'manifest should have start_url')
  assert(manifest.display, 'manifest should have display')
  assert(manifest.theme_color, 'manifest should have theme_color')
  assert(manifest.background_color, 'manifest should have background_color')
  assert(Array.isArray(manifest.icons) && manifest.icons.length > 0, 'manifest should have icons')
})

test('manifest icons include required sizes', () => {
  const sizes = manifest.icons.map(i => i.sizes)
  assert(sizes.includes('192x192'), 'should have 192x192 icon')
  assert(sizes.includes('512x512'), 'should have 512x512 icon')
})

test('manifest icons use absolute paths from root', () => {
  for (const icon of manifest.icons) {
    assert(icon.src.startsWith('/'), `icon ${icon.src} should be absolute path`)
  }
})

test('PWAInstallPrompt.tsx exists and handles install prompt', () => {
  assert(pwaPromptTsx.includes('beforeinstallprompt'), 'should listen to beforeinstallprompt')
  assert(pwaPromptTsx.includes('prompt'), 'should call prompt()')
})

test('PWAInstallPrompt.tsx has offline indicator', () => {
  assert(pwaPromptTsx.includes('online') || pwaPromptTsx.includes('offline'), 'should handle online/offline events')
})

test('vite.config.ts uses VitePWA plugin', () => {
  assert(viteConfig.includes('VitePWA'), 'should import VitePWA')
  assert(viteConfig.includes('registerType'), 'should configure registerType')
})

test('vite.config.ts caches product/category data', () => {
  assert(viteConfig.includes('NetworkFirst'), 'should use NetworkFirst strategy')
  assert(viteConfig.includes('api-data'), 'should have api-data cache')
})

console.log('\n' + (failed === 0 ? '✅ All tests passed' : `❌ ${failed} test(s) failed`) + '\n')
process.exit(failed === 0 ? 0 : 1)
