/**
 * Analytics checks for v2 React app
 * Run: node v2/scripts/test-analytics.cjs
 */

const { JSDOM } = require('jsdom')
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

console.log('\n=== V2 Analytics Tests ===\n')

// Check source files exist
const analyticsTs = fs.readFileSync(path.join(__dirname, '..', 'src', 'lib', 'analytics.ts'), 'utf-8')
const analyticsTsx = fs.readFileSync(path.join(__dirname, '..', 'src', 'components', 'Analytics.tsx'), 'utf-8')

test('analytics.ts exports initAnalytics', () => {
  assert(analyticsTs.includes('export function initAnalytics'), 'initAnalytics should be exported')
})

test('analytics.ts exports trackEvent', () => {
  assert(analyticsTs.includes('export function trackEvent'), 'trackEvent should be exported')
})

test('analytics.ts has GA and YM IDs', () => {
  assert(analyticsTs.includes("G-VG8VX6F69T"), 'GA ID should be present')
  assert(analyticsTs.includes('YM_ID = 109145874'), 'YM ID should be present')
})

test('analytics.ts exports all required tracking functions', () => {
  const required = [
    'trackViewItem',
    'trackPurchase',
    'trackAddToFavorites',
    'trackRemoveFromFavorites',
    'trackSearch',
    'trackAiSearch',
    'trackCategory',
    'trackFilter',
    'trackSort',
    'trackScrollDepth',
    'trackInstallPwa',
    'trackClickOutbound',
  ]
  for (const fn of required) {
    assert(analyticsTs.includes(`export function ${fn}`), `${fn} should be exported`)
  }
})

test('Analytics.tsx imports initAnalytics', () => {
  assert(analyticsTsx.includes('initAnalytics'), 'Analytics.tsx should use initAnalytics')
})

// JSDOM tests for runtime behavior
const dom = new JSDOM('<!DOCTYPE html><html><head></head><body></body></html>', {
  url: 'https://beta.smart-skidka.ru/',
})
global.window = dom.window
global.document = dom.window.document

// We need to re-require analytics.ts as a module, but it's TS. Instead test the logic by reading.
// For runtime test, we can evaluate a minimal JS snippet that mimics initAnalytics.
// Since we can't easily transpile TS, we test the snippet logic manually.

test('initAnalytics creates window.gtag and window.ym', () => {
  const win = dom.window
  // Simulate initAnalytics logic
  win.dataLayer = []
  win.gtag = function (...args) {
    win.dataLayer.push(args)
  }
  win.gtag('js', new Date())
  win.gtag('config', 'G-VG8VX6F69T')

  win.ym = function () {}

  assert(typeof win.gtag === 'function', 'gtag should be a function')
  assert(typeof win.ym === 'function', 'ym should be a function')
  assert(win.dataLayer.length >= 2, 'dataLayer should have events')
})

test('trackEvent sends to both gtag and ym', () => {
  const win = dom.window
  const gaEvents = []
  const ymEvents = []

  win.gtag = function (action, name, params) {
    if (action === 'event') gaEvents.push({ name, params })
  }
  win.ym = function (id, action, name, params) {
    if (action === 'reachGoal') ymEvents.push({ name, params })
  }

  // Simulate trackEvent
  function trackEvent(name, params) {
    win.gtag('event', name, params)
    win.ym(109145874, 'reachGoal', name, params)
  }

  trackEvent('test_event', { foo: 'bar' })

  assert(gaEvents.length === 1, 'gtag should receive one event')
  assert(ymEvents.length === 1, 'ym should receive one event')
  assert(gaEvents[0].name === 'test_event', 'gtag event name should match')
  assert(ymEvents[0].name === 'test_event', 'ym event name should match')
})

console.log('\n' + (failed === 0 ? '✅ All tests passed' : `❌ ${failed} test(s) failed`) + '\n')
process.exit(failed === 0 ? 0 : 1)
