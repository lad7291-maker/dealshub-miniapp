#!/usr/bin/env node
/**
 * Generate yandex-market.yml (YML) feed for Yandex Market.
 * Reads v2/public/products.json and v2/public/categories.json.
 * Run: node scripts/generate-yml.js
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

function todayYml() {
  const d = new Date()
  const pad = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`
}

function main() {
  if (!fs.existsSync(PRODUCTS_FILE) || !fs.existsSync(CATEGORIES_FILE)) {
    console.error('❌ products.json or categories.json not found')
    process.exit(1)
  }

  const products = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf-8'))
  const categories = JSON.parse(fs.readFileSync(CATEGORIES_FILE, 'utf-8'))

  const catMap = {}
  let catId = 1
  for (const c of categories) {
    if (c.id !== 'all') {
      catMap[c.id] = catId
      catId++
    }
  }

  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<!DOCTYPE yml_catalog SYSTEM "shops.dtd">',
    `  <yml_catalog date="${todayYml()}">`,
    '  <shop>',
    '    <name>SmartSkidka.ru</name>',
    '    <company>SmartSkidka.ru</company>',
    `    <url>${BASE_URL}/</url>`,
    '    <platform>Custom</platform>',
    '    <version>2.0</version>',
    '    <agency>SmartSkidka.ru</agency>',
    '    <email>support@smart-skidka.ru</email>',
    '    <currencies>',
    '      <currency id="RUR" rate="1"/>',
    '    </currencies>',
    '    <categories>',
  ]

  for (const c of categories) {
    if (c.id !== 'all') {
      lines.push(`      <category id="${catMap[c.id]}">${escapeXml(c.name)}</category>`)
    }
  }

  lines.push('    </categories>', '    <offers>')

  for (const product of products) {
    const itemId = product.itemId || String(product.id)
    const catId = catMap[product.category] || 1
    lines.push(`      <offer id="${escapeXml(itemId)}" available="true">`)
    lines.push(`        <url>${BASE_URL}/item/${escapeXml(itemId)}.html</url>`)
    lines.push(`        <price>${product.price}</price>`)
    lines.push('        <currencyId>RUR</currencyId>')
    lines.push(`        <categoryId>${catId}</categoryId>`)
    lines.push(`        <picture>${escapeXml(product.image)}</picture>`)
    lines.push(`        <name>${escapeXml(product.title)}</name>`)
    lines.push(`        <description>${escapeXml(product.subtitle || product.title)}</description>`)
    lines.push('      </offer>')
  }

  lines.push('    </offers>', '  </shop>', '</yml_catalog>')

  fs.mkdirSync(DIST_DIR, { recursive: true })
  fs.writeFileSync(path.join(DIST_DIR, 'yandex-market.yml'), lines.join('\n') + '\n', 'utf-8')

  console.log(`✅ Generated yandex-market.yml with ${products.length} offers in ${path.relative(process.cwd(), DIST_DIR)}`)
}

main()
