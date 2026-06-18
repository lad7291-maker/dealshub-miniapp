import json

# Load updated products
with open('/var/www/dealshub-miniapp/products/all.json', 'r', encoding='utf-8') as f:
    products = json.load(f)

# Generate products.js
js_content = 'const PRODUCTS_DB = ' + json.dumps(products, ensure_ascii=False, indent=2) + ';\n'

with open('/var/www/dealshub-miniapp/products.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

print(f"Updated products.js with {len(products)} items")
