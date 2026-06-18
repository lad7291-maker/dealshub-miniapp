#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
SmartSkidka Product Categorization Script
Redistributes products from broad Admitad categories into specific ones
based on product title keywords.
"""

import json
import sys

def classify_product(p):
    title = p['title'].lower()
    tags = [t.lower() for t in p.get('tags', [])]
    text = title + ' ' + ' '.join(tags)
    
    # === СПЕЦИАЛЬНЫЕ СЛУЧАИ ===
    if ('куртка' in text or 'фартук' in text or 'жилет' in text or 'комбинезон' in text) and ('свинцов' in text or 'радиолог' in text or 'рентген' in text):
        return 'beauty'
    
    # === 1. СТОМАТОЛОГИЯ / МЕДИЦИНА → beauty ===
    dental_words = [
        'стоматолог', 'зуб', 'дентал', 'ортодонт', 'пломб', 'коронка зуб', 'имплант зуб', 'брекет', 'калибр стоматолог', 'десен', 'челюст', 'позиционер', 'экстрактор', 'бор стоматолог', 'боры стоматолог', 'бор дентал', 'боры дентал', 'фреза стоматолог', 'наконечник стоматолог', 'микромотор стоматолог', 'светильник стоматолог', 'лампа стоматолог', 'фотополимер', 'рентгеновский', 'фартук свинцов', 'жилет свинцов', 'комбинезон свинцов', 'защитный фартук', 'защитный жилет', 'защитный комбинезон', 'оссеоденсификац', 'трепанное кольцо', 'типодонт', 'череп анатомич', 'вибратор стоматолог', 'лампа для отбеливания зуб', 'костный молоток', 'пинцет стоматолог', 'зеркало стоматолог', 'шпатель стоматолог', 'шприц стоматолог', 'эндодонт', 'эндоинструмент', 'канал корневой', 'root canal', 'эндофайл', 'эндодонтический', 'эндодонтические файлы', 'эндодонтический инструмент', 'эндодонтический набор', 'остеоденсификац', 'имплантационный', 'имплантолог', 'скалер', 'ультразвуковой скалер', 'наконечник woodpecker', 'наконечник dte', 'цемент без эвгенола', 'цемент временный', 'коронка временная', 'мостовидный', 'гингивальный', 'gingifast', 'zhermack', 'ivoclar', 'centric tray', 'латеральный доступ', 'синус-лифтинг', 'эндо ', 'эндодонтия', 'ротовые материалы', 'монокристаллические сапфир', 'easyinsmile', 'tandtechnisch', 'tandheelkundige', 'dentsply', 'shofu', 'kerr optidisc', 'optidisc', 'oral', 'оральная', 'оральный', 'пескоструйная машина', 'пескоструй', 'ультразвуковой очиститель', 'ультразвуковой скалер', 'блок управления strong', 'strong model', 'strong-210', 'strong 210', 'микромотор marathon', 'marathon machine', 'марафон машин', 'микрохирургическ', 'офтальмолог', 'машинка для сверления ногтей', 'сверление ногтей', 'боры elijah', 'бор elijah', 'монитор пациент', 'мониторов пациент', 'марафон',
        'dental', 'dentist', 'orthodontic', 'implant dental', 'crown dental', 'filling dental', 'bracket', 'calibrator dental', 'gingiv', 'jaw', 'positioner', 'extractor', 'bur dental', 'drill dental', 'handpiece', 'micromotor dental', 'light dental', 'lamp dental', 'photopolymer', 'x-ray apron', 'lead apron', 'lead vest', 'osseo', 'trephine', 'typodont', 'anatomical skull', 'dental vibrator', 'tooth whitening lamp', 'bone mallet', 'dental tweezer', 'dental mirror', 'dental syringe', 'endodontic', 'endodontics', 'root canal', 'osteodensification', 'implantology', 'scaler', 'ultrasonic scaler', 'woodpecker', 'eugenol', 'temporary cement', 'gingival', 'sinus lift', 'endo file', 'endo instrument', 'oral light', 'sandblaster dental', 'ultrasonic cleaner dental', 'nail drill marathon'
    ]
    if any(w in text for w in dental_words):
        return 'beauty'
    
    # === 2. ОБУВЬ (shoes) ===
    shoe_words = [
        'кроссовки', 'кроссовок', 'ботинки', 'ботинок', 'сандалии', 'сандалий', 'туфли', 'туфель', 'бутсы', 'кеды', 'мокасины', 'шлепанцы', 'сапоги', 'сапог', 'тапочки', 'тапочек', 'босоножки', 'лодочки', 'слипоны', 'эспадрильи', 'лоферы', 'дерби', 'броги', 'челси', 'вьетнамки', 'шлепки', 'аквашузы', 'аква', 'балетки', 'чешки', 'валенки', 'шиповки', 'беговые кроссовки', 'спортивная обувь', 'спортивной обуви', 'повседневная обувь', 'повседневной обуви', 'женская обувь', 'мужская обувь', 'обувь для', 'обувь nike', 'обувь adidas', 'обувь puma', 'обувь skechers', 'обувь under armour', 'обувь underarmour', 'походная обувь', 'водонепроницаемая обувь', 'ортопедические стельки', 'стельки ортопед', 'стельки', 'стелькам', 'стелька',
        'sneaker', 'shoe', 'boot', 'sandal', 'slipper', 'loafer', 'cleat', 'footwear', 'flip-flop', 'aqua shoe', 'ballet flat', 'moccasin', 'spike shoe', 'running shoe', 'casual shoe', 'sport shoe', 'athletic shoe', 'hiking shoe', 'waterproof shoe', 'orthopedic insole', 'insole'
    ]
    if any(w in text for w in shoe_words):
        return 'shoes'
    
    # === 3. ОДЕЖДА (clothing) ===
    clothing_words = [
        'рубашка', 'рубашки', 'футболка', 'футболки', 'штаны', 'джинсы', 'куртка', 'куртки', 'платье', 'платья', 'юбка', 'юбки', 'кофта', 'кофты', 'свитер', 'свитера', 'пиджак', 'пиджаки', 'костюм', 'костюмы', 'носки', 'нижнее белье', 'купальник', 'купальники', 'пуховик', 'пуховики', 'парка', 'парки', 'hoodie', 'shirt', 'dress', 'jacket', 'coat', 'jeans', 't-shirt', 'underwear', 'swimwear', 'брюки', 'леггинсы', 'леггинсов', 'сарафан', 'сарафаны', 'плащ', 'плащи', 'жилет', 'жилеты', 'комбинезон', 'комбинезоны', 'шорты', 'толстовка', 'толстовки', 'водолазка', 'водолазки', 'блузка', 'блузки', 'жакет', 'жакеты', 'пальто', 'пончо', 'кардиган', 'кардиганы'
    ]
    if any(w in text for w in clothing_words):
        return 'clothing'
    
    # === 4. СПОРТ (sports) ===
    sports_words = [
        'роликовые коньки', 'ролики', 'коньки ледов', 'коньков', 'скейтборд', 'скейт', 'велосипед', 'тренажер', 'гантел', 'штанга', 'мяч', 'ракетка', 'лыжи', 'сноуборд', 'самокат', 'roller skate', 'ice skate', 'skateboard', 'bicycle', 'ski', 'snowboard', 'scooter', 'тренировк', 'беговая дорожка', 'эспандер', 'обруч', 'велотренажер', 'экипировка', 'спортивный инвентарь', 'спортивная форма', 'fin box', 'fin plug'
    ]
    if any(w in text for w in sports_words):
        return 'sports'
    
    # === 5. ЭЛЕКТРОНИКА (electronics) ===
    electronics_words = [
        'телефон', 'наушники', 'зарядка', 'камера', 'планшет', 'ноутбук', 'тв', 'монитор', 'мониторов', 'мышь', 'клавиатура', 'колонка', 'блютуз', 'wifi', 'роутер', 'флешка', 'кабель', 'адаптер', 'чехол', 'стекло', 'phone', 'headphone', 'charger', 'camera', 'laptop', 'tablet', 'speaker', 'bluetooth', 'cable', 'case', 'screen protector', 'usb', 'hdmi', 'ssd', 'hdd', 'memory', 'ram', 'cpu', 'gpu', 'motherboard', 'power supply', 'видеокарта', 'плата', 'модуль', 'dac', 'источник питания', 'сервер', 'rtx', 'светодиодный экран', 'led display', 'преобразователь', 'inverter', 'солнечная панель', 'солнечных панелей', 'солнечные панели', 'solar panel', 'генератор', 'батарея', 'аккумулятор', 'зарядное', 'телевизор', 'smart tv', 'навигатор', 'приставка', 'солнечный контроллер', 'mppt', 'gsm реле', 'реле', 'инвертор', 'блок питания', 'контроллер заряда', 'солнечный маршрутизатор', 'wi-fi', 'wi fi', 'светодиодный дисплей', 'сенсорный экран', 'шаговый двигатель', 'stepper motor', 'драйвер шагового', 'драйвер двигателя', 'актуатор', 'actuator', 'лабораторный источник питания', 'лабораторный блок питания', 'источник питания постоянного тока', 'регулируемый источник', 'цифровой источник питания', 'abb', 'автоматический выключатель', 'circuit breaker', 'плата импульсного источника', 'линейный привод'
    ]
    if any(w in text for w in electronics_words):
        return 'electronics'
    
    # === 6. АВТО (auto) ===
    auto_words = [
        'автомобил', 'машин', 'шина', 'диск', 'фара', 'двигатель автомобил', 'тормоз', 'масло моторн', 'фильтр масл', 'аккумулятор автомобил', 'car part', 'auto part', 'tire', 'wheel', 'brake pad', 'oil filter', 'spark plug', 'alternator', 'radiator', 'transmission', 'chassis', 'suspension', 'глушитель', 'стеклоочиститель', 'дворник', 'бампер', 'капот', 'дверь автомобил', 'генератор автомобил', 'стартер автомобил', 'двигатель лодочн', 'двигатель подвесн', 'двигатель наклона', 'стартер 2 квт', 'стартер 3 квт', 'комплект стартера', 'двигатель для инвалидных колясок', 'бесщеточный двигатель', 'brushless motor'
    ]
    if any(w in text for w in auto_words):
        return 'auto'
    
    # === 7. КРАСОТА (beauty) ===
    beauty_words = [
        'косметик', 'помада', 'крем для лица', 'крем для рук', 'крем для тела', 'шампун', 'парфюм', 'духи', 'массаж', 'макияж', 'уход за кожей', 'кисть макияж', 'тени', 'лак для ногтей', 'тушь', 'пудра', 'бальзам', 'гель для душа', 'лосьон', 'сыворотка', 'скраб', 'маска для лица', 'эпилятор', 'триммер', 'бритва', 'маникюр', 'педикюр', 'лампа для ногтей', 'лампа для дизайна ногтей', 'дрель для ногтей', 'сверло для ногтей', 'сверл для ногтей', 'сверления ногтей', 'фреза для ногтей', 'машинка для маникюра', 'аппарат для маникюра', 'аппарат для педикюра', 'пылесос для маникюра', 'пылеочиститель маникюр', 'пылеочиститель', 'стерилизация инструмент', 'лоток для стерилизац', 'лоток стерилизац',
        'cosmetic', 'perfume', 'makeup', 'cream', 'shampoo', 'lipstick', 'mask face', 'serum', 'lotion', 'manicure', 'pedicure', 'nail polish', 'nail dryer', 'uv lamp nail', 'hair dryer', 'straightener', 'curling', 'nail drill', 'nail lamp', 'nail dust collector', 'nail machine'
    ]
    if ('перчатки' in text or 'перчаток' in text) and ('медицин' in text or 'хирургическ' in text or 'смотровые' in text):
        return 'beauty'
    if any(w in text for w in beauty_words):
        return 'beauty'
    
    # === 8. ДОМ (home) ===
    home_words = [
        'мебель', 'лампа настольн', 'лампа напольн', 'люстра', 'кухон', 'постель', 'ковер', 'штора', 'ванная', 'хранен', 'органайзер', 'посуда', 'furniture', 'lamp desk', 'lamp floor', 'chandelier', 'kitchen', 'bedding', 'curtain', 'storage', 'organizer', 'decor', 'pillow', 'blanket', 'плед', 'одеяло', 'подушка', 'полотенце', 'скатерть', 'салфетка', 'ваза', 'зеркало', 'часы настенные', 'зонт для патио', 'патио', 'шкаф', 'корпус', 'стеллаж', 'аксессуары для стульев', 'ведро для льда', 'холодильник', 'гравировальный станок'
    ]
    if any(w in text for w in home_words):
        return 'home'
    
    # === 9. УКРАШЕНИЯ (jewelry) ===
    jewelry_words = [
        'кольцо', 'серьги', 'браслет', 'цепочка', 'подвеска', 'часы наручные', 'украшени', 'ювелир', 'бижутерия', 'ring', 'earring', 'bracelet', 'necklace', 'watch', 'jewelry', 'pendant', 'brooch', 'кулон', 'запонки', 'диадема', 'тиара'
    ]
    if any(w in text for w in jewelry_words):
        return 'jewelry'
    
    # === 10. ИГРУШКИ (toys) ===
    toys_words = [
        'игрушк', 'конструктор', 'кукла', 'машинка игрушечн', 'мягкая игрушк', 'пазл', 'игра настольн', 'toy', 'doll', 'lego', 'puzzle', 'plush toy', 'action figure', 'board game', 'робот игрушк'
    ]
    if any(w in text for w in toys_words):
        return 'toys'
    
    return 'home'


def main():
    with open('products/all.json') as f:
        data = json.load(f)
    
    for p in data:
        p['category'] = classify_product(p)
    
    # Save all.json
    with open('products/all.json', 'w') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    
    # Generate category files
    from collections import Counter
    categories = Counter(p['category'] for p in data)
    
    for cat, items in categories.items():
        cat_products = [p for p in data if p['category'] == cat]
        with open(f'products/{cat}.json', 'w') as f:
            json.dump(cat_products, f, ensure_ascii=False, indent=2)
    
    with open('products/index.json', 'w') as f:
        json.dump(dict(categories), f, ensure_ascii=False, indent=2)
    
    print('Categories:', dict(categories))
    print('Total:', sum(categories.values()))


if __name__ == '__main__':
    main()
