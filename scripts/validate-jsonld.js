#!/usr/bin/env node
/**
 * Validate JSON-LD structured data on key pages
 */

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const ROOT_DIR = path.resolve(__dirname, '..');

function validateJsonLd(filePath, expectedTypes) {
  const fullPath = path.join(ROOT_DIR, filePath);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  const html = fs.readFileSync(fullPath, 'utf8');
  const dom = new JSDOM(html);
  const scripts = dom.window.document.querySelectorAll('script[type="application/ld+json"]');

  const errors = [];
  const foundTypes = [];

  if (scripts.length === 0) {
    errors.push('no JSON-LD scripts found');
    return { file: filePath, errors };
  }

  scripts.forEach((script) => {
    try {
      const data = JSON.parse(script.textContent);
      const schemas = Array.isArray(data) ? data : [data];
      schemas.forEach((schema) => {
        if (schema['@type']) foundTypes.push(schema['@type']);
      });
    } catch (e) {
      errors.push(`invalid JSON-LD: ${e.message}`);
    }
  });

  for (const expected of expectedTypes) {
    if (!foundTypes.includes(expected)) {
      errors.push(`missing ${expected} schema (found: ${foundTypes.join(', ')})`);
    }
  }

  return { file: filePath, errors };
}

const pages = [
  { path: 'index.html', types: ['WebSite'] },
  { path: 'electronics.html', types: ['ItemList'] },
];

const itemDir = path.join(ROOT_DIR, 'item');
const itemPages = fs
  .readdirSync(itemDir)
  .filter((f) => f.endsWith('.html'))
  .slice(0, 5);
pages.push(
  ...itemPages.map((f) => ({ path: path.join('item', f), types: ['Product', 'BreadcrumbList'] }))
);

let totalErrors = 0;
for (const page of pages) {
  const result = validateJsonLd(page.path, page.types);
  if (result.errors.length > 0) {
    console.error(`❌ ${result.file}:`);
    result.errors.forEach((e) => console.error(`   - ${e}`));
    totalErrors += result.errors.length;
  } else {
    console.log(`✅ ${result.file}`);
  }
}

if (totalErrors > 0) {
  console.error(`\n✗ ${totalErrors} JSON-LD error(s) found`);
  process.exit(1);
}

console.log('\n✓ All JSON-LD is valid');
