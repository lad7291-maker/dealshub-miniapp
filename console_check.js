const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
    
    const errors = [];
    const warnings = [];
    
    page.on('console', msg => {
        if (msg.type() === 'error') errors.push(msg.text());
        if (msg.type() === 'warning') warnings.push(msg.text());
    });
    
    page.on('pageerror', err => {
        errors.push('PAGE ERROR: ' + err.message);
    });
    
    await page.goto('http://localhost:8080/index.html?nocache=27', { waitUntil: 'networkidle' });
    await page.waitForTimeout(3000);
    
    // Click around to trigger more JS
    const card = await page.$('.product-card');
    if (card) await card.click();
    await page.waitForTimeout(1000);
    await page.keyboard.press('Escape');
    
    const search = await page.$('#search-input');
    if (search) {
        await search.fill('test');
        await page.waitForTimeout(500);
    }
    
    await page.waitForTimeout(1000);
    
    console.log('=== ERRORS ===');
    errors.forEach(e => console.log(e));
    console.log('\n=== WARNINGS ===');
    warnings.forEach(w => console.log(w));
    console.log(`\nTotal errors: ${errors.length}, warnings: ${warnings.length}`);
    
    await browser.close();
})();
