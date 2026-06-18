const fs = require('fs');
const path = require('path');

const iksCode = `            <p> 2026 SmartSkidka.ru</p>
            <p style="margin-top: 8px;"><a href="https://webmaster.yandex.ru/siteinfo/?site=https://smart-skidka.ru" target="_blank" rel="noopener"><img width="88" height="31" alt="ИКС сайта" border="0" style="border-radius: 8px;" src="https://yandex.ru/cycounter?https://smart-skidka.ru&theme=light&lang=ru"/></a></p>`;

const oldCode = `            <p> 2026 SmartSkidka.ru</p>`;

// Список файлов для обновления (исключаем служебные)
const filesToUpdate = [
  'about.html', 'auto.html', 'beauty.html', 'clothing.html',
  'contact.html', 'electronics.html', 'home.html', 'jewelry.html',
  'privacy.html', 'shoes.html', 'sports.html', 'terms.html', 'toys.html',
  'blog/dostavka-s-aliexpress-v-rossiyu-2026.html',
  'blog/elektronika-iz-kitaya-stoit-li-pokupat.html',
  'blog/kak-ekonomit-na-aliexpress.html',
  'blog/luchshie-krossovki-aliexpress-2026.html',
  'blog/samye-populyarnye-tovary-aliexpress.html'
];

let updated = 0;
let skipped = 0;

for (const file of filesToUpdate) {
  const filePath = path.join(__dirname, '..', file);
  
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️ Не найден: ${file}`);
    skipped++;
    continue;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Проверим, есть ли уже ИКС
  if (content.includes('yandex.ru/cycounter')) {
    console.log(`⏭️ Пропущен (уже есть): ${file}`);
    skipped++;
    continue;
  }
  
  // Заменяем старый код на новый
  if (content.includes(oldCode)) {
    content = content.replace(oldCode, iksCode);
    fs.writeFileSync(filePath, content);
    console.log(`✅ Обновлён: ${file}`);
    updated++;
  } else {
    console.log(`⚠️ Не найдена строка для замены: ${file}`);
    skipped++;
  }
}

console.log(`\n📊 Итого: обновлено ${updated}, пропущено ${skipped}`);
