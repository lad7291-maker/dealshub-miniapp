const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
    await page.goto('http://localhost:8080/index.html?nocache=21', { waitUntil: 'networkidle' });
    await page.waitForTimeout(3000);
    
    // Hero
    await page.screenshot({ path: 'final_hero.png' });
    
    // Products with cards
    await page.evaluate(() => window.scrollTo(0, 1800));
    await page.waitForTimeout(800);
    await page.screenshot({ path: 'final_products.png' });
    
    await browser.close();
})();
