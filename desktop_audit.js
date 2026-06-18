const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
    await page.goto('http://localhost:8080/index.html?nocache=26', { waitUntil: 'networkidle' });
    await page.waitForTimeout(3000);
    
    // 1. Hero section
    await page.screenshot({ path: 'desktop_01_hero.png' });
    
    // 2. Scroll to products
    await page.evaluate(() => window.scrollTo(0, 800));
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'desktop_02_products.png' });
    
    // 3. Scroll to banner
    await page.evaluate(() => window.scrollTo(0, 1600));
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'desktop_03_banner.png' });
    
    // 4. Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight - 1000));
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'desktop_04_footer.png' });
    
    // 5. Test modal - click first product card
    await page.evaluate(() => window.scrollTo(0, 800));
    await page.waitForTimeout(500);
    const card = await page.$('.product-card');
    if (card) {
        await card.click();
        await page.waitForTimeout(1500);
        await page.screenshot({ path: 'desktop_05_modal.png' });
        await page.keyboard.press('Escape');
        await page.waitForTimeout(500);
    }
    
    // 6. Test search
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);
    const search = await page.$('#search-input');
    if (search) {
        await search.fill('nike');
        await page.waitForTimeout(1000);
        await page.screenshot({ path: 'desktop_06_search.png' });
        await search.fill('');
        await page.keyboard.press('Escape');
    }
    
    // 7. Test category filter
    const catBtn = await page.$('button[data-category="electronics"]');
    if (catBtn) {
        await catBtn.click();
        await page.waitForTimeout(1500);
        await page.screenshot({ path: 'desktop_07_category.png' });
    }
    
    // 8. Console errors check
    const logs = [];
    page.on('console', msg => {
        if (msg.type() === 'error') logs.push(msg.text());
    });
    
    await browser.close();
    console.log('Audit complete');
})();
