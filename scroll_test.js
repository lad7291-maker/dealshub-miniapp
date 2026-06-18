const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
  await page.goto('http://localhost:8080/index.html?nocache=13', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // Scroll positions
  const scrolls = [400, 800, 1200, 1600, 2000, 2400];
  for (let i = 0; i < scrolls.length; i++) {
    await page.evaluate((y) => window.scrollTo(0, y), scrolls[i]);
    await page.waitForTimeout(500);
    await page.screenshot({ path: `mobile_scroll_${i + 1}.png` });
  }

  await browser.close();
})();
