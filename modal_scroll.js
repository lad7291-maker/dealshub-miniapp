const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
  await page.goto('http://localhost:8080/index.html?nocache=19', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);

  // Click card
  await page.evaluate(() => window.scrollTo(0, 1000));
  await page.waitForTimeout(500);
  const card = await page.$('.product-card');
  if (card) await card.click();
  await page.waitForTimeout(1500);

  // Screenshot top
  await page.screenshot({ path: 'modal_top.png' });

  // Scroll inside modal and screenshot bottom
  await page.evaluate(() => {
    const modal = document.querySelector('.modal-details');
    if (modal) modal.scrollTop = modal.scrollHeight;
  });
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'modal_bottom.png' });

  await browser.close();
})();
