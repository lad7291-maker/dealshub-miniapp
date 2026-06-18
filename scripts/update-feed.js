#!/usr/bin/env node
/**
 * SmartSkidka.ru — Admitad Feed Processor
 * 
 * Загружает CSV-фид Admitad, конвертирует в JSON-категории сайта.
 * Каждый товар получает прямую партнёрскую ссылку на конкретный товар AliExpress.
 * 
 * Usage: node update-feed.js
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// ============================================
// CONFIG
// ============================================
const FEED_URL = 'http://export.admitad.com/en/webmaster/websites/2940069/products/export_adv_products/?user=vladislav_sotnikov56e18&code=4fkgb3nkie&feed_id=14284&format=csv&fcid=6115';
const USD_TO_RUB = 92; // Курс конвертации USD → RUB
const MAX_PER_CATEGORY = 3000; // Макс товаров на категорию
const OUTPUT_DIR = path.join(__dirname, '..', 'products');
const PRODUCTS_JS_PATH = path.join(__dirname, '..', 'js', 'products.js');

// ============================================
// CATEGORY MAPPING: Admitad category → site category
// ============================================
const CATEGORY_MAP = {
  // Обувь
  'Sneakers': 'shoes',
  "Women's Shoes": 'shoes',
  "Men's Shoes": 'shoes',
  'Cycling': 'shoes',
  'Roller,Skateboard': 'shoes',
  'Sport Bags': 'sports',
  'Basketball（New）': 'shoes',
  'Football（New）': 'shoes',
  'Children\'s Sports': 'shoes',
  
  // Одежда
  'Cosplay Costumes': 'clothing',
  'Suits & Blazer': 'clothing',
  'Parkas': 'clothing',
  'Shirts & Blouses': 'clothing',
  'Down Coats': 'clothing',
  'Matching Sets': 'clothing',
  'Denim（New）': 'clothing',
  'Jeans（New）': 'clothing',
  'Blazer & Suits': 'clothing',
  'Plus Size Clothes': 'clothing',
  'Ready-to-wear Dresses': 'clothing',
  'Fur & Faux Fur': 'clothing',
  'Real Fur': 'clothing',
  'Men\'s Shirts': 'clothing',
  'Shorts': 'clothing',
  'Muslim Fashion': 'clothing',
  'Swimwears': 'clothing',
  'Men\'s Underwears': 'clothing',
  'Men\'s Sleep & Lounge': 'clothing',
  'Women\'s Sleep & Lounge': 'clothing',
  'Middle East Fashion': 'clothing',
  'Customized Dresses': 'clothing',
  'Customized Skirts': 'clothing',
  'Tailor-made Hoodies & Sweatshirts': 'clothing',
  'Functional Apparel': 'clothing',
  'World Apparel': 'clothing',
  'Oversleeve & Arm Warmer': 'clothing',
  
  // Электроника
  'Laptop Parts & Accessories': 'electronics',
  'Computer Peripherals': 'electronics',
  'Computer Components': 'electronics',
  'Tablet Accessories & Parts': 'electronics',
  'Smart Electronics': 'electronics',
  'Office Electronics': 'electronics',
  'Servers & Industrial Computer': 'electronics',
  'Networking': 'electronics',
  'Storage Device': 'electronics',
  'Mobile Phone Cases & Covers': 'electronics',
  'Tablets': 'electronics',
  'Mobile Phone Protective Film': 'electronics',
  'Mobile Phone Photography Accessories': 'electronics',
  'Mobile Phone Decorations': 'electronics',
  'Holders & Stands': 'electronics',
  'Used&Refurbished Phones': 'electronics',
  'Walkie Talkie Accessories & Parts': 'electronics',
  'Sim Cards & Accessories': 'electronics',
  'Personal Care Appliances': 'electronics',
  
  // Дом
  'Household Merchandises': 'home',
  'Bathroom Fixture': 'home',
  'Kitchen Fixture': 'home',
  'Café Furniture': 'home',
  'Ornamental & Cleaning': 'home',
  'Senior Furniture': 'home',
  'Building Supplies': 'home',
  'Arts,Crafts & Sewing': 'home',
  
  // Авто
  'Engines & Engine Parts': 'auto',
  'Exterior Parts': 'auto',
  'Motorcycle Parts': 'auto',
  'Interior Accessories': 'auto',
  'Car Lights': 'auto',
  'Wear Parts': 'auto',
  'Exterior Accessories': 'auto',
  'Chassis Parts': 'auto',
  'Automotive Sensors': 'auto',
  'Interior Parts': 'auto',
  'Car Maintenance Tools': 'auto',
  'Modification&Protection': 'auto',
  'Power Tool Parts & Accessories': 'auto',
  'Tool Sets': 'auto',
  'Drill Bits, Saw Blades & Cutting Tools': 'auto',
  'Air Compressors, Pneumatics & Hydraulics': 'auto',
  'Motorcycle & ATV': 'auto',
  'New Energy Vehicle Parts & Accessories': 'auto',
  'RV Parts & Accessories': 'auto',
  'Motorcycle Equipments': 'auto',
  'Other Vehicle Parts & Accessories': 'auto',
  'Motorcycle Accessories': 'auto',
  'Car Lock System': 'auto',
  'Transmission & Cables': 'auto',
  'Blowers, Industrial Fans & Exhaust Equipment': 'auto',
  'Abrasive Tools & Abrasives': 'auto',
  'Boats': 'auto',
  'Aircraft': 'auto',
  'Construction Machinery & Accessories': 'auto',
  'Industry Machinery & Equipment': 'auto',
  'Industrial Spare Parts': 'auto',
  'Laser Engraving Machine & Accessories': 'auto',
  'Food Machine and Supporting Equipment': 'auto',
  'Agricultural Machinery & Supplies': 'auto',
  'Industrial Automation Control & Accessories': 'auto',
  '3D Printing & Additive Manufacturing': 'auto',
  'Printing Products': 'auto',
  'Packaging, Printing & Supporting Equipment': 'auto',
  'Metals & Alloys': 'auto',
  'Rubbers & Plastics': 'auto',
  'Functional Material': 'auto',
  'Chemicals': 'auto',
  
  // Красота
  'Nail Art & Tools': 'beauty',
  'Hair Care & Styling': 'beauty',
  'Hair Tools & Accessories': 'beauty',
  'Tattoo & Body Art': 'beauty',
  'Fragrances & Deodorants': 'beauty',
  'Perfume': 'beauty',
  'Bath & Shower': 'beauty',
  'Rehabilitation Supplies': 'beauty',
  'Health Care': 'beauty',
  'Sex Products': 'beauty',
  'Dental Supplies': 'beauty',
  
  // Спорт
  'Skiing & Snowboarding': 'sports',
  'Sport Bags': 'sports',
  'Activity & Gear': 'sports',
  'Sports Accessories': 'sports',
  'Racquet Sports': 'sports',
  'Dance': 'sports',
  
  // Украшения
  'Fine Jewelry': 'jewelry',
  'Jewelry Packaging & Display': 'jewelry',
  'Jewelry Tools & Equipments': 'jewelry',
  'Customized Watches': 'jewelry',
  
  // Игрушки
  'Action & Toy Figures': 'toys',
  'Building & Construction Toys': 'toys',
  'Remote Control Toys': 'toys',
  'Play Vehicles & Models': 'toys',
  'Dolls & Accessories': 'toys',
  'Entertainment': 'toys',
  'Trendy Blind Box': 'toys',
  'Baby Strollers&Accessories': 'toys',
  'Stuffed Animals & Plush': 'toys',
  'Games and Puzzles': 'toys',
  'Novelty & Gag Toys': 'toys',
  'Electronic Toys': 'toys',
  'ACG Goods': 'toys',
  
  // Сумки
  'Women\'s Handbags': 'clothing',
  'Luggage': 'clothing',
  'Backpack': 'clothing',
  'Men\'s Bags': 'clothing',
  'Travel Bags': 'clothing',
  'Kids\' Bags': 'clothing',
  'Chest Bags': 'clothing',
  'Waist Packs': 'clothing',
  'Winter Bags': 'clothing',
  'Organizer Bag': 'clothing',
  
  // Электрика
  'Electrical Equipment': 'electronics',
  'Electrical Equipment & Supplies': 'electronics',
  'Commercial Lighting': 'home',
  'Professional Light': 'home',
  'Novelty Lighting（new）': 'home',
  'Access Building Automation': 'home',
  'Emergency Safety Supplies': 'home',
  'Safety': 'home',
  'Security Alarm': 'home',
  'Smart Public Safety Systems': 'home',
  
  // Остальное → home
  'Pens, Pencils & Writing Supplies': 'home',
  'Filing Products': 'home',
  'Stationery Sticker': 'home',
  'Cultural Derivatives(Office Supplies)': 'home',
  'Books & Cultural Merchandise': 'home',
  'Music, CDs & Vinyl Records': 'home',
  'Baby Care': 'home',
  'Feeding': 'home',
  'Baby Sterilization & Appliances': 'home',
  'Giveaways': 'home',
  'First Aid Kits': 'home',
  'Mailing & Shipping': 'home',
  'Travel Accessories': 'home',
  'Men Socks': 'clothing',
  'New Headwear': 'clothing',
  'Kids Accessories': 'clothing',
  'Fabric & Textile Raw Material': 'clothing',
  'Electronic Cigarettes': 'electronics',
};

// ============================================
// UTILS
// ============================================
function downloadFeed(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    console.log('[Feed] Downloading...');
    const req = client.get(url, { timeout: 120000 }, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode}`));
        return;
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('Timeout')); });
  });
}

function parseParam(paramStr) {
  const result = {};
  if (!paramStr) return result;
  const pairs = paramStr.split(';').filter(Boolean);
  for (const pair of pairs) {
    const parts = pair.split('|');
    if (parts.length >= 2) {
      result[parts[0].trim()] = parts[1].trim();
    }
  }
  return result;
}

function extractTags(name, category) {
  const tags = [];
  const lower = name.toLowerCase();
  
  const brands = ['nike', 'adidas', 'puma', 'skechers', 'new balance', 'reebok', 'asics', 'under armour'];
  for (const brand of brands) {
    if (lower.includes(brand)) tags.push(brand);
  }
  
  if (lower.includes('shoes') || lower.includes('кроссовки') || lower.includes('sneakers')) tags.push('кроссовки');
  if (lower.includes('boots') || lower.includes('ботинки')) tags.push('ботинки');
  if (lower.includes('sandal')) tags.push('сандалии');
  if (lower.includes('shirt')) tags.push('рубашки');
  if (lower.includes('dress')) tags.push('платья');
  if (lower.includes('jacket') || lower.includes('coat')) tags.push('куртки');
  if (lower.includes('toy')) tags.push('игрушки');
  if (lower.includes('car') || lower.includes('auto')) tags.push('авто');
  if (lower.includes('phone')) tags.push('телефоны');
  if (lower.includes('laptop')) tags.push('ноутбуки');
  if (lower.includes('jewelry')) tags.push('украшения');
  if (lower.includes('watch')) tags.push('часы');
  
  if (lower.includes('men') || lower.includes('мужск')) tags.push('мужские');
  if (lower.includes('women') || lower.includes('женск')) tags.push('женские');
  if (lower.includes('unisex')) tags.push('унисекс');
  if (lower.includes('kids') || lower.includes('children')) tags.push('детские');
  
  return [...new Set(tags)];
}

/** Parse CSV line respecting quoted fields */
function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ';' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}

function parseCSV(csvText) {
  const lines = csvText.split('\n').filter(l => l.trim());
  if (lines.length === 0) return [];
  
  const headers = parseCSVLine(lines[0]).map(h => h.trim());
  const rows = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    if (values.length < 3) continue;
    
    const row = {};
    headers.forEach((h, idx) => {
      row[h] = values[idx] || '';
    });
    rows.push(row);
  }
  
  return rows;
}

function convertProduct(row, index) {
  const params = parseParam(row.param);
  const discountStr = params.discount || '0%';
  const discount = parseInt(discountStr.replace('%', '')) || 0;
  const commission = params.commissionRate || '0%';
  const shopId = params.shopId || '';
  
  const priceUsd = parseFloat(row.price) || 0;
  const oldPriceUsd = parseFloat(row.oldprice) || priceUsd;
  
  const priceRub = Math.round(priceUsd * USD_TO_RUB);
  const originalPriceRub = Math.round(oldPriceUsd * USD_TO_RUB);
  
  let finalDiscount = discount;
  if (!row.oldprice || row.oldprice === row.price) {
    finalDiscount = 0;
  }
  
  const cat = CATEGORY_MAP[row.category] || 'home';
  const name = row.name || '';
  
  return {
    id: index + 1,
    itemId: row.id,
    title: name,
    category: cat,
    image: row.picture ? row.picture.split(',')[0].trim() : '',
    price: priceRub,
    originalPrice: originalPriceRub,
    discount: finalDiscount,
    rating: 4.5,
    orders: 0,
    specs: {
      'Тип': row.category || 'Товар',
      'Комиссия': commission,
      'Магазин': shopId ? `ID: ${shopId}` : 'AliExpress'
    },
    tags: extractTags(name, row.category),
    aliLink: 'https://s.click.aliexpress.com/deep_link.htm?aff_short_key=_c3s1yQkJ&dl_target_url=' + encodeURIComponent('https://aliexpress.ru/item/' + row.id + '.html?af=2529186&cv=47843')
  };
}

// ============================================
// MAIN
// ============================================
async function main() {
  try {
    console.log('=== SmartSkidka.ru Feed Updater ===\n');
    
    const csvData = await downloadFeed(FEED_URL);
    console.log(`[Feed] Downloaded: ${(csvData.length / 1024 / 1024).toFixed(1)} MB`);
    
    const rows = parseCSV(csvData);
    console.log(`[Feed] Products in feed: ${rows.length}`);
    
    const allProducts = [];
    for (let i = 0; i < rows.length; i++) {
      try {
        const product = convertProduct(rows[i], i);
        if (product.price > 0 && product.image && product.aliLink) {
          allProducts.push(product);
        }
      } catch (e) {
        // Skip bad rows
      }
    }
    console.log(`[Feed] Valid products: ${allProducts.length}`);
    
    const byCategory = {};
    for (const p of allProducts) {
      if (!byCategory[p.category]) byCategory[p.category] = [];
      if (byCategory[p.category].length < MAX_PER_CATEGORY) {
        byCategory[p.category].push(p);
      }
    }
    
    let globalId = 1;
    for (const cat in byCategory) {
      for (const p of byCategory[cat]) {
        p.id = globalId++;
      }
    }
    
    const allForHome = allProducts.slice(0, 2000);
    
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }
    
    const categories = ['shoes', 'clothing', 'electronics', 'home', 'auto', 'beauty', 'sports', 'jewelry', 'toys'];
    for (const cat of categories) {
      const items = byCategory[cat] || [];
      const filePath = path.join(OUTPUT_DIR, `${cat}.json`);
      fs.writeFileSync(filePath, JSON.stringify(items, null, 2));
      console.log(`[Out] ${cat}.json: ${items.length} items`);
    }
    
    fs.writeFileSync(path.join(OUTPUT_DIR, 'all.json'), JSON.stringify(allForHome, null, 2));
    console.log(`[Out] all.json: ${allForHome.length} items`);
    
    const index = {
      updated: new Date().toISOString(),
      total: allProducts.length,
      categories: categories.reduce((acc, cat) => {
        acc[cat] = (byCategory[cat] || []).length;
        return acc;
      }, {})
    };
    fs.writeFileSync(path.join(OUTPUT_DIR, 'index.json'), JSON.stringify(index, null, 2));
    
    const inlineProducts = allForHome.slice(0, 500);
    const productsJs = `const PRODUCTS_DB = ${JSON.stringify(inlineProducts, null, 2)};\n`;
    fs.writeFileSync(PRODUCTS_JS_PATH, productsJs);
    console.log(`[Out] products.js: ${inlineProducts.length} inline items`);
    
    console.log('\n=== Stats ===');
    console.log(`Total products: ${allProducts.length}`);
    for (const cat of categories) {
      console.log(`  ${cat}: ${(byCategory[cat] || []).length}`);
    }
    console.log('\nDone!');
    
  } catch (err) {
    console.error('[Error]', err.message);
    process.exit(1);
  }
}

main();
