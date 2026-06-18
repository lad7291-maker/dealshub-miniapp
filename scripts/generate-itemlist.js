const fs = require('fs');
const path = require('path');

// Категории и соответствующие файлы
const categories = {
  'shoes': { file: 'shoes.json', name: 'Обувь' },
  'clothing': { file: 'clothing.json', name: 'Одежда' },
  'electronics': { file: 'electronics.json', name: 'Электроника' }
};

function generateItemList(category, products) {
  const items = products.slice(0, 10).map((product, index) => ({
    '@type': 'ListItem',
    'position': index + 1,
    'item': {
      '@type': 'Product',
      'name': product.title,
      'url': `https://smart-skidka.ru/item/${product.itemId}.html`,
      'image': product.image,
      'offers': {
        '@type': 'Offer',
        'price': product.price,
        'priceCurrency': 'RUB',
        'availability': 'https://schema.org/InStock'
      }
    }
  }));

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'name': `${categories[category].name} — скидки на AliExpress`,
    'itemListElement': items
  };
}

function updateHtmlFile(category, itemListJson) {
  const htmlPath = path.join(__dirname, '..', `${category}.html`);
  let html = fs.readFileSync(htmlPath, 'utf8');

  // Найдем позицию после </title> и вставим ItemList
  const titleEnd = html.indexOf('</title>');
  if (titleEnd === -1) return;

  const insertPos = titleEnd + '</title>'.length;
  const scriptTag = `\n    <script type="application/ld+json">\n${JSON.stringify(itemListJson, null, 2)}\n    </script>`;

  html = html.slice(0, insertPos) + scriptTag + html.slice(insertPos);
  fs.writeFileSync(htmlPath, html);
  console.log(`Обновлен ${category}.html`);
}

// Генерируем для каждой категории
for (const [category, config] of Object.entries(categories)) {
  const productsPath = path.join(__dirname, '..', 'products', config.file);
  if (!fs.existsSync(productsPath)) {
    console.log(`Файл не найден: ${productsPath}`);
    continue;
  }

  const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
  const itemList = generateItemList(category, products);
  updateHtmlFile(category, itemList);
}

console.log('Готово!');
