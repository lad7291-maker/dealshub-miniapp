#!/usr/bin/env node
/**
 * Generate turbo.xml for Yandex Turbo pages.
 * Reads v2/public/products.json and v2/public/categories.json.
 * Run: node scripts/generate-turbo.js
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DIST_DIR = path.resolve(__dirname, '..', 'dist')
const PRODUCTS_FILE = path.resolve(__dirname, '..', 'public', 'products.json')
const CATEGORIES_FILE = path.resolve(__dirname, '..', 'public', 'categories.json')

const BASE_URL = 'https://smart-skidka.ru'

function escapeXml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function formatPrice(price) {
  return Number(price).toLocaleString('ru-RU')
}

function todayRfc822() {
  const d = new Date()
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const pad = (n) => String(n).padStart(2, '0')
  const tz = -d.getTimezoneOffset()
  const tzSign = tz >= 0 ? '+' : '-'
  const tzHours = pad(Math.floor(Math.abs(tz) / 60))
  const tzMins = pad(Math.abs(tz) % 60)
  return `${days[d.getDay()]}, ${pad(d.getDate())} ${months[d.getMonth()]} ${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())} ${tzSign}${tzHours}${tzMins}`
}

function generateProductTurbo(product, categoryMap) {
  const itemId = product.itemId || String(product.id)
  const url = `${BASE_URL}/item/${itemId}.html`
  const catName = categoryMap[product.category] || product.category

  return `
    <item turbo="true">
      <link>${url}</link>
      <turbo:source>${url}</turbo:source>
      <turbo:topic>${escapeXml(product.title)}</turbo:topic>
      <pubDate>${todayRfc822()}</pubDate>
      <author>SmartSkidka.ru</author>
      <title>${escapeXml(product.title)} — скидка ${product.discount}%</title>
      <description>${escapeXml(product.subtitle || product.title)}</description>
      <turbo:content>
        <![CDATA[
          <h1>${escapeXml(product.title)}</h1>
          <figure>
            <img src="${escapeXml(product.image)}" />
          </figure>
          <p>Цена: <strong>${formatPrice(product.price)} ₽</strong></p>
          ${product.oldPrice > product.price ? `<p><s>${formatPrice(product.oldPrice)} ₽</s></p>` : ''}
          <p>Скидка: <strong>${product.discount}%</strong></p>
          <p>Рейтинг: ${product.rating} ★</p>
          <p>Категория: ${escapeXml(catName)}</p>
          <a href="${escapeXml(product.affiliateLink)}">Купить на AliExpress</a>
        ]]>
      </turbo:content>
    </item>`
}

function generateCategoryTurbo(category) {
  const url = `${BASE_URL}/${category.slug}.html`
  return `
    <item turbo="true">
      <link>${url}</link>
      <turbo:source>${url}</turbo:source>
      <turbo:topic>${escapeXml(category.name)} — скидки AliExpress</turbo:topic>
      <pubDate>${todayRfc822()}</pubDate>
      <author>SmartSkidka.ru</author>
      <title>${escapeXml(category.seoTitle || `Скидки на ${category.name}`)}</title>
      <description>${escapeXml(category.seoDescription || `Лучшие скидки на ${category.name}`)}</description>
      <turbo:content>
        <![CDATA[
          <h1>${escapeXml(category.name)}</h1>
          <p>${escapeXml(category.seoDescription || `Лучшие скидки на ${category.name} с AliExpress.`)}</p>
          <a href="${url}">Смотреть все товары</a>
        ]]>
      </turbo:content>
    </item>`
}

function main() {
  if (!fs.existsSync(PRODUCTS_FILE) || !fs.existsSync(CATEGORIES_FILE)) {
    console.error('❌ products.json or categories.json not found')
    process.exit(1)
  }

  const products = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf-8'))
  const categories = JSON.parse(fs.readFileSync(CATEGORIES_FILE, 'utf-8'))

  const categoryMap = {}
  for (const c of categories) {
    if (c.id !== 'all') categoryMap[c.id] = c.name
  }

  const topProducts = products
    .filter(p => p.rating >= 4.0 && p.discount >= 50)
    .sort((a, b) => b.discount - a.discount)
    .slice(0, 100)

  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss xmlns:yandex="http://news.yandex.ru"',
    '     xmlns:media="http://search.yahoo.com/mrss/"',
    '     xmlns:turbo="http://turbo.yandex.ru"',
    '     version="2.0">',
    '  <channel>',
    '    <title>SmartSkidka.ru — скидки AliExpress</title>',
    `    <link>${BASE_URL}/</link>`,
    '    <description>Лучшие скидки на товары с AliExpress. 1000+ товаров со скидками до 90%.</description>',
    '    <language>ru</language>',
    '    <turbo:analytics type="Yandex" id="109145874"/>',
    '    <item turbo="true">',
    `      <link>${BASE_URL}/</link>`,
    `      <turbo:source>${BASE_URL}/</turbo:source>`,
    '      <turbo:topic>SmartSkidka.ru — Лучшие скидки AliExpress</turbo:topic>',
    `      <pubDate>${todayRfc822()}</pubDate>`,
    '      <author>SmartSkidka.ru</author>',
    '      <title>Лучшие скидки AliExpress — до 90%</title>',
    '      <description>1000+ товаров со скидками до 90%. Электроника, одежда, обувь, товары для дома и авто.</description>',
    '      <turbo:content>',
    '        <![CDATA[',
    '          <h1>Лучшие скидки AliExpress</h1>',
    '          <p>1000+ товаров со скидками до 90%. Бесплатная доставка. Обновляется ежедневно.</p>',
    '          <p>Популярные категории: электроника, одежда, обувь, товары для дома, авто, красота, спорт.</p>',
    `          <a href="${BASE_URL}/">Перейти к товарам</a>`,
    '        ]]>',
    '      </turbo:content>',
    '    </item>',
  ]

  for (const cat of categories) {
    if (cat.id === 'all') continue
    lines.push(generateCategoryTurbo(cat))
  }

  for (const product of topProducts) {
    lines.push(generateProductTurbo(product, categoryMap))
  }

  lines.push('  </channel>', '</rss>')

  fs.mkdirSync(DIST_DIR, { recursive: true })
  fs.writeFileSync(path.join(DIST_DIR, 'turbo.xml'), lines.join('\n') + '\n', 'utf-8')

  console.log(`✅ Generated turbo.xml with ${topProducts.length} products + ${categories.length - 1} categories + homepage in ${path.relative(process.cwd(), DIST_DIR)}`)
}

main()
