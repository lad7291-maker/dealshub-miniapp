#!/usr/bin/env node
/**
 * SmartSkidka.ru — Admitad Feed Processor (Streaming, low memory)
 * v2.0: Extended CATEGORY_MAP, subcategory support, balanced category distribution
 */

const fs = require('fs');
const readline = require('readline');

const USD_TO_RUB = 92;
const MAX_PER_CATEGORY = 5000;
const INLINE_COUNT = 2000;
const INPUT_FILE = '/tmp/admitad_feed.csv';
const OUTPUT_DIR = 'products';

// Extended CATEGORY_MAP — covers all 186 categories from the feed
const CATEGORY_MAP = {
  // === SHOES ===
  Sneakers: 'shoes',
  "Women's Shoes": 'shoes',
  "Men's Shoes": 'shoes',
  Basketball: 'shoes',
  Football: 'shoes',
  Cycling: 'shoes',
  'Roller,Skateboard': 'shoes',
  "Children's Sports": 'shoes',
  'Basketball（New）': 'shoes',
  'Football（New）': 'shoes',

  // === CLOTHING ===
  'Cosplay Costumes': 'clothing',
  'Suits & Blazer': 'clothing',
  Parkas: 'clothing',
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
  "Men's Shirts": 'clothing',
  Shorts: 'clothing',
  'Muslim Fashion': 'clothing',
  Swimwears: 'clothing',
  "Men's Underwears": 'clothing',
  "Men's Sleep & Lounge": 'clothing',
  "Women's Sleep & Lounge": 'clothing',
  'Middle East Fashion': 'clothing',
  'Customized Dresses': 'clothing',
  'Customized Skirts': 'clothing',
  'Tailor-made Hoodies & Sweatshirts': 'clothing',
  'Functional Apparel': 'clothing',
  'World Apparel': 'clothing',
  'Oversleeve & Arm Warmer': 'clothing',
  "Women's Handbags": 'clothing',
  Luggage: 'clothing',
  Backpack: 'clothing',
  "Men's Bags": 'clothing',
  'Travel Bags': 'clothing',
  "Kids' Bags": 'clothing',
  'Chest Bags': 'clothing',
  'Waist Packs': 'clothing',
  'Winter Bags': 'clothing',
  'Organizer Bag': 'clothing',
  'Men Socks': 'clothing',
  'New Headwear': 'clothing',
  'Kids Accessories': 'clothing',
  'Fabric & Textile Raw Material': 'clothing',
  'Summer Bags': 'clothing',
  'new Scarf &Wrap': 'clothing',
  'Faux Leather': 'clothing',
  'Genuine Leather': 'clothing',
  'Mask（New）': 'clothing',
  "Men's Sets（new）": 'clothing',
  'Customized Blouses & Shirts': 'clothing',
  "Traditional Men's Clothing": 'clothing',

  // === ELECTRONICS ===
  'Laptop Parts & Accessories': 'electronics',
  'Computer Peripherals': 'electronics',
  'Computer Components': 'electronics',
  'Tablet Accessories & Parts': 'electronics',
  'Smart Electronics': 'electronics',
  'Office Electronics': 'electronics',
  'Servers & Industrial Computer': 'electronics',
  Networking: 'electronics',
  'Storage Device': 'electronics',
  'Mobile Phone Cases & Covers': 'electronics',
  Tablets: 'electronics',
  'Mobile Phone Protective Film': 'electronics',
  'Mobile Phone Photography Accessories': 'electronics',
  'Mobile Phone Decorations': 'electronics',
  'Holders & Stands': 'electronics',
  'Used&Refurbished Phones': 'electronics',
  'Walkie Talkie Accessories & Parts': 'electronics',
  'Sim Cards & Accessories': 'electronics',
  'Personal Care Appliances': 'electronics',
  'Electrical Equipment': 'electronics',
  'Electrical Equipment & Supplies': 'electronics',
  'Electronic Cigarettes': 'electronics',
  'Computer & Office Bundle': 'electronics',

  // === HOME ===
  'Household Merchandises': 'home',
  'Bathroom Fixture': 'home',
  'Kitchen Fixture': 'home',
  'Café Furniture': 'home',
  'Ornamental & Cleaning': 'home',
  'Senior Furniture': 'home',
  'Building Supplies': 'home',
  'Arts,Crafts & Sewing': 'home',
  'Commercial Lighting': 'home',
  'Professional Light': 'home',
  'Novelty Lighting（new）': 'home',
  'Access Building Automation': 'home',
  'Emergency Safety Supplies': 'home',
  Safety: 'home',
  'Security Alarm': 'home',
  'Smart Public Safety Systems': 'home',
  'Pens, Pencils & Writing Supplies': 'home',
  'Filing Products': 'home',
  'Stationery Sticker': 'home',
  'Cultural Derivatives(Office Supplies)': 'home',
  'Books & Cultural Merchandise': 'home',
  'Music, CDs & Vinyl Records': 'home',
  'Baby Care': 'home',
  Feeding: 'home',
  'Baby Sterilization & Appliances': 'home',
  Giveaways: 'home',
  'First Aid Kits': 'home',
  'Mailing & Shipping': 'home',
  'Travel Accessories': 'home',
  'Furniture Accessories': 'home',
  'Industrial and Commercial Cleaning Equipment': 'home',

  // === AUTO ===
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
  Boats: 'auto',
  Aircraft: 'auto',
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
  Chemicals: 'auto',

  // === BEAUTY ===
  'Nail Art & Tools': 'beauty',
  'Hair Care & Styling': 'beauty',
  'Hair Tools & Accessories': 'beauty',
  'Tattoo & Body Art': 'beauty',
  'Fragrances & Deodorants': 'beauty',
  Perfume: 'beauty',
  'Bath & Shower': 'beauty',
  'Rehabilitation Supplies': 'beauty',
  'Health Care': 'beauty',
  'Sex Products': 'beauty',
  'Dental Supplies': 'beauty',
  'Hair For Asian': 'beauty',

  // === SPORTS ===
  'Skiing & Snowboarding': 'sports',
  'Sport Bags': 'sports',
  'Activity & Gear': 'sports',
  'Sports Accessories': 'sports',
  'Racquet Sports': 'sports',
  Dance: 'sports',

  // === JEWELRY ===
  'Fine Jewelry': 'jewelry',
  'Jewelry Packaging & Display': 'jewelry',
  'Jewelry Tools & Equipments': 'jewelry',
  'Customized Watches': 'jewelry',

  // === TOYS ===
  'Action & Toy Figures': 'toys',
  'Building & Construction Toys': 'toys',
  'Remote Control Toys': 'toys',
  'Play Vehicles & Models': 'toys',
  'Dolls & Accessories': 'toys',
  Entertainment: 'toys',
  'Trendy Blind Box': 'toys',
  'Baby Strollers&Accessories': 'toys',
  'Stuffed Animals & Plush': 'toys',
  'Games and Puzzles': 'toys',
  'Novelty & Gag Toys': 'toys',
  'Electronic Toys': 'toys',
  'ACG Goods': 'toys',
};

// Subcategory display names (Russian)
const SUBCATEGORY_NAMES = {
  Sneakers: 'Кроссовки',
  "Women's Shoes": 'Женская обувь',
  "Men's Shoes": 'Мужская обувь',
  'Computer Components': 'Комплектующие',
  'Storage Device': 'Накопители',
  'Computer Peripherals': 'Периферия',
  Networking: 'Сетевое оборудование',
  'Laptop Parts & Accessories': 'Аксессуары для ноутбуков',
  'Tablet Accessories & Parts': 'Аксессуары для планшетов',
  Tablets: 'Планшеты',
  'Smart Electronics': 'Умная электроника',
  'Mobile Phone Cases & Covers': 'Чехлы для телефонов',
  'Electrical Equipment & Supplies': 'Электрооборудование',
  'Dental Supplies': 'Стоматология',
  'Nail Art & Tools': 'Маникюр',
  'Hair Care & Styling': 'Уход за волосами',
  'Bath & Shower': 'Ванна и душ',
  Perfume: 'Парфюм',
  'Health Care': 'Здоровье',
  'Engines & Engine Parts': 'Двигатели',
  'Exterior Parts': 'Кузовные детали',
  'Car Lights': 'Автосвет',
  'Car Maintenance Tools': 'Инструменты',
  'Motorcycle & ATV': 'Мотоциклы',
  'Tool Sets': 'Наборы инструментов',
  'Household Merchandises': 'Товары для дома',
  'Kitchen Fixture': 'Кухня',
  'Bathroom Fixture': 'Ванная',
  'Baby Care': 'Уход за малышом',
  'Building Supplies': 'Стройматериалы',
  'Shirts & Blouses': 'Рубашки',
  'Down Coats': 'Пуховики',
  "Women's Handbags": 'Сумки',
  "Men's Bags": 'Мужские сумки',
  Luggage: 'Чемоданы',
  Backpack: 'Рюкзаки',
  'Skiing & Snowboarding': 'Лыжи',
  'Sport Bags': 'Спортивные сумки',
  'Activity & Gear': 'Активный отдых',
  'Fine Jewelry': 'Ювелирка',
  'Customized Watches': 'Часы',
  'Action & Toy Figures': 'Фигурки',
  'Building & Construction Toys': 'Конструкторы',
  'Remote Control Toys': 'Р/У игрушки',
  'Games and Puzzles': 'Игры и пазлы',
  'Dolls & Accessories': 'Куклы',
  'Electronic Toys': 'Электронные игрушки',
};

function parseParamStr(paramStr) {
  const result = {};
  if (!paramStr) return result;
  const pairs = paramStr.split(';').filter(Boolean);
  for (const pair of pairs) {
    const parts = pair.split('|');
    if (parts.length >= 2) result[parts[0].trim()] = parts[1].trim();
  }
  return result;
}

function extractTags(name) {
  const tags = [];
  const lower = name.toLowerCase();
  const brands = [
    'nike',
    'adidas',
    'puma',
    'skechers',
    'new balance',
    'reebok',
    'asics',
    'under armour',
  ];
  for (const b of brands) if (lower.includes(b)) tags.push(b);
  if (lower.includes('shoes') || lower.includes('sneakers')) tags.push('кроссовки');
  if (lower.includes('boots')) tags.push('ботинки');
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
  if (lower.includes('men')) tags.push('мужские');
  if (lower.includes('women')) tags.push('женские');
  if (lower.includes('unisex')) tags.push('унисекс');
  if (lower.includes('kids') || lower.includes('children')) tags.push('детские');
  return [...new Set(tags)];
}

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

function calcRating(discount) {
  const base = 3.0;
  const bonus = Math.min((discount / 100) * 1.5, 1.5);
  return Math.round((base + bonus) * 10) / 10;
}

function makeAdmitadLink(itemId) {
  const targetUrl = encodeURIComponent(
    'https://aliexpress.ru/item/' + itemId + '.html?af=2529186&cv=47843'
  );
  return (
    'https://s.click.aliexpress.com/deep_link.htm?aff_short_key=_c3s1yQkJ&dl_target_url=' +
    targetUrl
  );
}

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const categories = [
  'shoes',
  'clothing',
  'electronics',
  'home',
  'auto',
  'beauty',
  'sports',
  'jewelry',
  'toys',
];

// Per-category buffers for balanced distribution
const catBuffers = {};
for (const cat of categories) {
  catBuffers[cat] = [];
}

let processed = 0;
let valid = 0;
let headers = null;
let lineNum = 0;

const fileStream = fs.createReadStream(INPUT_FILE);
const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

rl.on('line', (line) => {
  lineNum++;
  if (lineNum === 1) {
    headers = parseCSVLine(line).map((h) => h.trim());
    return;
  }

  const values = parseCSVLine(line);
  if (values.length < 3) return;

  const row = {};
  headers.forEach((h, idx) => {
    row[h] = values[idx] || '';
  });

  const params = parseParamStr(row.param);
  const discount = parseInt((params.discount || '0%').replace('%', '')) || 0;
  const commission = params.commissionRate || '0%';
  const shopId = params.shopId || '';

  const priceUsd = parseFloat(row.price) || 0;
  const oldPriceUsd = parseFloat(row.oldprice) || priceUsd;
  const priceRub = Math.round(priceUsd * USD_TO_RUB);
  const originalPriceRub = Math.round(oldPriceUsd * USD_TO_RUB);

  let finalDiscount = discount;
  if (!row.oldprice || row.oldprice === row.price) finalDiscount = 0;

  const rawCategory = row.category || '';
  const cat = CATEGORY_MAP[rawCategory] || 'home';
  const subcategory = SUBCATEGORY_NAMES[rawCategory] || rawCategory;

  const product = {
    id: 0,
    itemId: row.id,
    title: row.name || '',
    category: cat,
    subcategory: subcategory,
    image: row.picture ? row.picture.split(',')[0].trim() : '',
    price: priceRub,
    originalPrice: originalPriceRub,
    discount: finalDiscount,
    rating: calcRating(finalDiscount),
    orders: 0,
    specs: {
      Тип: rawCategory || 'Товар',
      Комиссия: commission,
      Магазин: shopId ? 'ID: ' + shopId : 'AliExpress',
    },
    tags: extractTags(row.name || ''),
    aliLink: makeAdmitadLink(row.id),
  };

  if (product.price > 0 && product.image && product.aliLink) {
    valid++;
    product.id = valid;
    if (catBuffers[cat].length < MAX_PER_CATEGORY) {
      catBuffers[cat].push(product);
    }
  }

  processed++;
});

rl.on('close', () => {
  console.log('Processed:', processed, 'Valid:', valid);

  // Sort each category by discount (descending) and write JSON
  const catCounts = {};
  for (const cat of categories) {
    catBuffers[cat].sort((a, b) => b.discount - a.discount);
    fs.writeFileSync(OUTPUT_DIR + '/' + cat + '.json', JSON.stringify(catBuffers[cat]));
    catCounts[cat] = catBuffers[cat].length;
    console.log(cat + '.json:', catCounts[cat]);
  }

  // Build all.json: take top N from each category for balanced distribution
  const perCatForAll = Math.floor(INLINE_COUNT / categories.length);
  const allProducts = [];
  for (const cat of categories) {
    const top = catBuffers[cat].slice(0, perCatForAll);
    allProducts.push(...top);
  }
  // If we have room, add more from categories with most items
  let idx = 0;
  while (allProducts.length < INLINE_COUNT) {
    const cat = categories[idx % categories.length];
    const alreadyHave = allProducts.filter((p) => p.category === cat).length;
    if (alreadyHave < catBuffers[cat].length) {
      allProducts.push(catBuffers[cat][alreadyHave]);
    }
    idx++;
    if (idx > INLINE_COUNT * 2) break; // safety
  }
  // Sort all by discount
  allProducts.sort((a, b) => b.discount - a.discount);
  fs.writeFileSync(OUTPUT_DIR + '/all.json', JSON.stringify(allProducts));
  console.log('all.json:', allProducts.length);

  // Build inline products.js
  fs.writeFileSync('js/products.js', 'const PRODUCTS_DB = ' + JSON.stringify(allProducts) + ';\n');
  console.log('products.js:', allProducts.length);

  // Build index.json with counts and subcategory breakdown
  const index = {
    updated: new Date().toISOString(),
    total: valid,
    categories: catCounts,
    subcategories: {},
  };
  for (const cat of categories) {
    const subcats = {};
    for (const p of catBuffers[cat]) {
      const sc = p.subcategory;
      subcats[sc] = (subcats[sc] || 0) + 1;
    }
    index.subcategories[cat] = subcats;
  }
  fs.writeFileSync(OUTPUT_DIR + '/index.json', JSON.stringify(index, null, 2));

  console.log('\n=== Distribution ===');
  for (const cat of categories) {
    console.log(`${cat}: ${catCounts[cat]} items`);
  }
});
