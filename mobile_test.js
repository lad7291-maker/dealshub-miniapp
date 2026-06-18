const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 },
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1',
  });
  const page = await context.newPage();

  // Screenshot 1: Hero section
  await page.goto('http://localhost:8080/index.html?nocache=5', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'mobile_hero_v2.png', fullPage: false });

  // Screenshot 2: Scroll to products
  await page.evaluate(() => window.scrollTo(0, 600));
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'mobile_products_v2.png', fullPage: false });

  // Screenshot 3: Scroll to filters
  await page.evaluate(() => window.scrollTo(0, 400));
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'mobile_filters_v2.png', fullPage: false });

  // Screenshot 4: Modal
  const card = await page.$('.product-card');
  if (card) {
    await card.click();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'mobile_modal_v2.png', fullPage: false });

    // Close modal
    await page.keyboard.press('Escape');
    await page.waitForTimeout(500);
  }

  // Screenshot 5: Footer
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'mobile_footer_v2.png', fullPage: false });

  await browser.close();
  console.log('Screenshots saved');
})();
