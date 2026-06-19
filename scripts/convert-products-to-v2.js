/**
 * Convert products from legacy JSON format to v2 React app format
 * Generates:
 *   - v2/public/products.json
 *   - v2/public/categories.json
 *   - v2/src/data/products.ts (static data only)
 * Usage: node scripts/convert-products-to-v2.js
 */

const fs = require('fs');
const path = require('path');

const PRODUCTS_DIR = path.join(__dirname, '..', 'products');
const V2_DIR = path.join(__dirname, '..', 'v2');
const PUBLIC_DIR = path.join(V2_DIR, 'public');
const DATA_FILE = path.join(V2_DIR, 'src', 'data', 'products.ts');

const CATEGORY_MAP = {
  electronics: 'electronics',
  clothing: 'clothing',
  shoes: 'shoes',
  home: 'home',
  auto: 'auto',
  beauty: 'beauty',
  sports: 'sport',
  jewelry: 'beauty', // fallback: jewelry → beauty
};

const CATEGORY_NAMES = {
  electronics: 'Электроника',
  clothing: 'Одежда',
  shoes: 'Обувь',
  home: 'Дом',
  auto: 'Авто',
  beauty: 'Красота',
  sport: 'Спорт',
};

const CATEGORY_ICONS = {
  electronics: 'Monitor',
  clothing: 'Shirt',
  shoes: 'Footprints',
  home: 'Home',
  auto: 'Car',
  beauty: 'Sparkles',
  sport: 'Dumbbell',
};

function generateViewers(orders) {
  const base = Math.max(orders, 1);
  return Math.floor(base * (0.1 + Math.random() * 0.4)) + Math.floor(Math.random() * 10) + 5;
}

function generateTimer() {
  const hours = Math.floor(Math.random() * 48) + 1;
  return `еще ${hours} часов`;
}

function generateTags(product) {
  const tags = [];
  const cat = product.category;
  if (cat === 'electronics') tags.push('гаджеты');
  if (cat === 'clothing') tags.push('одежда');
  if (cat === 'shoes') tags.push('обувь');
  if (cat === 'home') tags.push('для дома');
  if (cat === 'auto') tags.push('для авто');
  if (cat === 'beauty' || cat === 'jewelry') tags.push('красота');
  if (cat === 'sports') tags.push('спорт');

  const price = product.price || 0;
  if (price <= 1000) tags.push('до 1000 ₽');
  else if (price <= 5000) tags.push('до 5000 ₽');
  else if (price <= 10000) tags.push('до 10000 ₽');
  else tags.push('премиум');

  if (Array.isArray(product.tags) && product.tags.length > 0) {
    product.tags.slice(0, 2).forEach((t) => tags.push(String(t)));
  }

  return [...new Set(tags)].slice(0, 4);
}

function generateBadges(product) {
  const badges = [];
  if (product.discount >= 80) badges.push('flash');
  if (product.rating >= 4.7 && product.orders > 100) badges.push('topRated');
  if (product.orders > 500) badges.push('bestseller');
  if (product.discount >= 50 && product.discount < 80) badges.push('bestPrice');
  return badges;
}

function specsToFeatures(specs) {
  if (!specs || typeof specs !== 'object') return [];
  return Object.entries(specs)
    .filter(([key]) => key !== 'Комиссия')
    .map(([key, value]) => `${key}: ${value}`)
    .slice(0, 5);
}

function extractShopName(aliLink) {
  if (!aliLink) return 'AliExpress';
  try {
    const url = new URL(aliLink);
    if (url.hostname.includes('ali.click')) {
      const ulp = url.searchParams.get('ulp');
      if (ulp) {
        const decoded = decodeURIComponent(ulp);
        const shopMatch = decoded.match(/store\/(\d+)/);
        if (shopMatch) return `Store ${shopMatch[1]}`;
      }
    }
  } catch {
    // ignore
  }
  return 'AliExpress';
}

function makeSubtitle(title) {
  if (!title) return '';
  return title.length > 90 ? title.slice(0, 87) + '...' : title;
}

function convertProduct(product) {
  const category = CATEGORY_MAP[product.category] || product.category;
  return {
    id: product.id,
    title: product.title || 'Товар',
    subtitle: makeSubtitle(product.title),
    category,
    price: product.price || 0,
    oldPrice: product.originalPrice || product.price || 0,
    discount: product.discount || 0,
    rating: product.rating || 0,
    orders: product.orders || 0,
    viewers: generateViewers(product.orders || 0),
    timer: generateTimer(),
    image: product.image || '',
    tags: generateTags(product),
    badges: generateBadges(product),
    features: specsToFeatures(product.specs),
    affiliateLink: product.aliLink || `https://aliexpress.ru/item/${product.itemId || product.id}.html`,
    shipping: 'Бесплатная доставка',
    shopName: extractShopName(product.aliLink),
  };
}

function generateCategory(cat, count) {
  const id = cat === 'sports' ? 'sport' : cat;
  return {
    id,
    name: CATEGORY_NAMES[id] || cat,
    slug: id,
    count,
    icon: CATEGORY_ICONS[id] || 'Tag',
    seoTitle: `Скидки AliExpress на ${CATEGORY_NAMES[id] || cat} — лучшие предложения`,
    seoDescription: `Лучшие скидки на ${CATEGORY_NAMES[id] || cat} с AliExpress. Реальные скидки, проверенные отзывы.`,
    seoText: `Категория ${CATEGORY_NAMES[id] || cat} с лучшими скидками AliExpress.`,
    faq: [],
  };
}

function readExistingStaticData() {
  const existing = {};
  if (fs.existsSync(DATA_FILE)) {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    const extract = (name) => {
      const match = raw.match(new RegExp(`export const ${name}[:\s]*=\s*([\s\S]*?)(?=\nexport const |\n\/* =====|$)`));
      return match ? match[1].trim() : null;
    };
    const names = ['promoCodes', 'blogPosts', 'collections', 'mainFAQ', 'promoFAQ'];
    names.forEach((name) => {
      const val = extract(name);
      if (val) existing[name] = val;
    });
  }
  return existing;
}

function main() {
  console.log('🚀 Converting legacy products to v2 format...');

  const allPath = path.join(PRODUCTS_DIR, 'all.json');
  const indexPath = path.join(PRODUCTS_DIR, 'index.json');

  if (!fs.existsSync(allPath)) {
    console.error('❌ products/all.json not found');
    process.exit(1);
  }

  fs.mkdirSync(PUBLIC_DIR, { recursive: true });

  const rawProducts = JSON.parse(fs.readFileSync(allPath, 'utf-8'));
  const products = rawProducts.map(convertProduct);

  console.log(`✅ Converted ${products.length} products`);

  // Category counts
  const index = JSON.parse(fs.readFileSync(indexPath, 'utf-8'));
  const counts = index.counts || {};
  const categoryCounts = {
    electronics: counts.electronics || 0,
    clothing: counts.clothing || 0,
    shoes: counts.shoes || 0,
    home: counts.home || 0,
    auto: counts.auto || 0,
    beauty: (counts.beauty || 0) + (counts.jewelry || 0),
    sport: counts.sports || 0,
  };

  const categories = [
    {
      id: 'all',
      name: 'Все',
      slug: 'all',
      count: products.length,
      icon: 'LayoutGrid',
      seoTitle: '',
      seoDescription: '',
      seoText: '',
      faq: [],
    },
    ...Object.entries(categoryCounts).map(([cat, count]) => generateCategory(cat, count)),
  ];

  // Write JSON files
  fs.writeFileSync(path.join(PUBLIC_DIR, 'products.json'), JSON.stringify(products, null, 2), 'utf-8');
  fs.writeFileSync(path.join(PUBLIC_DIR, 'categories.json'), JSON.stringify(categories, null, 2), 'utf-8');
  console.log(`✅ Written public/products.json (${products.length} items)`);
  console.log(`✅ Written public/categories.json (${categories.length} categories)`);

  // Write static TypeScript data file
  const existing = readExistingStaticData();
  const extraTypes = [];
  if (existing.promoCodes && existing.promoCodes !== '[]') extraTypes.push('PromoCode');
  if (existing.blogPosts && existing.blogPosts !== '[]') extraTypes.push('BlogPost');
  if (existing.collections && existing.collections !== '[]') extraTypes.push('Collection');
  if ((existing.mainFAQ && existing.mainFAQ !== '[]') || (existing.promoFAQ && existing.promoFAQ !== '[]')) extraTypes.push('FAQItem');

  const typeImports = ['Stats', ...extraTypes].join(', ');
  const typeImportLine = typeImports ? `import type { ${typeImports} } from '@/types'` : '';

  const renderArray = (name, fallback) => {
    if (existing[name]) return `export const ${name}: any = ${existing[name]};`;
    return `export const ${name}: any = ${fallback};`;
  };

  const output = `${typeImportLine}

export const stats: Stats = {
  productCount: ${products.length},
  categoryCount: ${categories.length - 1},
  yearLaunched: 2024,
  dailyDeals: 50,
}

${renderArray('promoCodes', '[]')}

${renderArray('blogPosts', '[]')}

${renderArray('collections', '[]')}

${renderArray('mainFAQ', '[]')}

${renderArray('promoFAQ', '[]')}

export const howItWorksSteps = [
  {
    icon: 'Search',
    title: 'Собираем товары',
    description: 'Ежедневно сканируем AliExpress и отбираем товары с реальными скидками от 30% до 90% через партнёрскую программу Admitad.',
  },
  {
    icon: 'Filter',
    title: 'Проверяем качество',
    description: 'Фильтруем по рейтингу продавца (4.5+), количеству продаж (100+), отзывам с фото и реальной истории цен за 90 дней.',
  },
  {
    icon: 'BadgeCheck',
    title: 'Публикуем лучшее',
    description: 'Добавляем только проверенные товары с подробным описанием, характеристиками и актуальными ценами в рублях.',
  },
  {
    icon: 'ShoppingCart',
    title: 'Вы покупаете выгодно',
    description: 'Переходите на AliExpress по нашим ссылкам, получаете ту же цену + применяете промокоды. Мы получаем комиссию и развиваем сервис.',
  },
  {
    icon: 'RefreshCw',
    title: 'Обновляем ежедневно',
    description: 'Каталог обновляется каждый день: удаляем товары с истекшими скидками, добавляем новые выгодные предложения.',
  },
]

export async function loadProducts(): Promise<Product[]> {
  const res = await fetch('/products.json')
  if (!res.ok) throw new Error('Failed to load products')
  return res.json()
}

export async function loadCategories(): Promise<Category[]> {
  const res = await fetch('/categories.json')
  if (!res.ok) throw new Error('Failed to load categories')
  return res.json()
}
`;

  fs.writeFileSync(DATA_FILE, output, 'utf-8');
  console.log(`✅ Written ${DATA_FILE}`);
  console.log(`📊 Categories: ${categories.length}`);
  console.log(`📦 Products: ${products.length}`);
}

main();
