#!/usr/bin/env node
/**
 * Validate JSON-LD structured data on key pages (v2 structure)
 * v2 index.html is a React SPA — JSON-LD is rendered client-side or injected into item pages
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

const pages = [];

// Skip index.html — v2 React SPA renders JSON-LD client-side
// Check item pages which have SSR-injected JSON-LD

const itemDir = path.join(ROOT_DIR, 'item');
if (fs.existsSync(itemDir)) {
  const itemPages = fs
    .readdirSync(itemDir)
    .filter((f) => f.endsWith('.html'))
    .slice(0, 5);
  pages.push(...itemPages.map((f) => ({ path: path.join('item', f), types: ['Product'] })));
}

if (pages.length === 0) {
  console.log('⚠️ No item pages found to validate');
  process.exit(0);
}

let totalErrors = 0;
for (const page of pages) {
  try {
    const result = validateJsonLd(page.path, page.types);
    if (result.errors.length > 0) {
      console.error(`❌ ${result.file}:`);
      result.errors.forEach((e) => console.error(`   - ${e}`));
      totalErrors += result.errors.length;
    } else {
      console.log(`✅ ${result.file}`);
    }
  } catch (err) {
    console.error(`❌ ${page.path}: ${err.message}`);
    totalErrors++;
  }
}

if (totalErrors > 0) {
  console.error(`\n✗ ${totalErrors} JSON-LD error(s) found`);
  process.exit(1);
}

console.log('\n✓ All JSON-LD is valid');
