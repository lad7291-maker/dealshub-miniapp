#!/usr/bin/env node
/**
 * Check npm dependency licenses against an allow-list
 */

const checker = require('license-checker');

const ALLOWED_LICENSES = [
  'MIT',
  'Apache-2.0',
  'Apache-2.0 WITH LLVM-exception',
  'BSD',
  'BSD-2-Clause',
  'BSD-3-Clause',
  'ISC',
  'CC0-1.0',
  'CC-BY-3.0',
  '0BSD',
  'Unlicense',
  'Python-2.0',
  'WTFPL',
  'MPL-2.0',
  'BlueOak-1.0.0',
];

const FORBIDDEN_LICENSES = ['GPL', 'GPL-2.0', 'GPL-3.0', 'AGPL', 'LGPL', 'SSPL', 'Proprietary'];

const ALLOWED_PACKAGES = new Set([]);

checker.init({ start: process.cwd() }, (err, packages) => {
  if (err) {
    console.error('Failed to check licenses:', err);
    process.exit(1);
  }

  const issues = [];

  for (const [name, info] of Object.entries(packages)) {
    if (ALLOWED_PACKAGES.has(name)) continue;

    const license = (info.licenses || 'UNKNOWN').toString();
    const isForbidden = FORBIDDEN_LICENSES.some((forbidden) =>
      license.toUpperCase().includes(forbidden.toUpperCase())
    );
    const isAllowed = ALLOWED_LICENSES.some((allowed) =>
      license.toUpperCase().includes(allowed.toUpperCase())
    );

    if (isForbidden || (!isAllowed && license !== 'UNKNOWN')) {
      issues.push(`${name}: ${license}`);
    } else if (license === 'UNKNOWN') {
      console.warn(`⚠️  ${name}: unknown license`);
    }
  }

  if (issues.length > 0) {
    console.error('\n❌ Forbidden or unapproved licenses found:');
    issues.forEach((i) => console.error(`  - ${i}`));
    process.exit(1);
  }

  console.log('✓ All dependency licenses are approved');
});
