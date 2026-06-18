const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
  await page.goto('http://localhost:8080/index.html?nocache=15', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);

  // Hero
  await page.screenshot({ path: 'mobile_hero_final.png' });

  // Collections + Top10
  await page.evaluate(() => window.scrollTo(0, 500));
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'mobile_collections_final.png' });

  // Products grid
  await page.evaluate(() => window.scrollTo(0, 1000));
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'mobile_products_final.png' });

  // Banner + more products
  await page.evaluate(() => window.scrollTo(0, 1800));
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'mobile_banner_final.png' });

  await browser.close();
})();
