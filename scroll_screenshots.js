const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
    await page.goto('http://localhost:8080/index.html?nocache=18', { waitUntil: 'networkidle' });
    await page.waitForTimeout(3000);
    
    const positions = [500, 1000, 1600, 2200, 2800];
    for (let i = 0; i < positions.length; i++) {
        await page.evaluate(y => window.scrollTo(0, y), positions[i]);
        await page.waitForTimeout(800);
        await page.screenshot({ path: `mobile_pos_${i+1}.png` });
    }
    
    // Test modal
    await page.evaluate(() => window.scrollTo(0, 1000));
    await page.waitForTimeout(500);
    const card = await page.$('.product-card');
    if (card) {
        await card.click();
        await page.waitForTimeout(1500);
        await page.screenshot({ path: 'mobile_modal_final.png' });
    }
    
    await browser.close();
    console.log('Done');
})();
