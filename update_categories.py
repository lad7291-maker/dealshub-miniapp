import json

# Load all products
with open('/var/www/dealshub-miniapp/products/all.json', 'r', encoding='utf-8') as f:
    products = json.load(f)

# Group by category
categories = {}
for p in products:
    cat = p.get('category', 'unknown')
    if cat not in categories:
        categories[cat] = []
    categories[cat].append(p)

# Save category files
for cat, items in categories.items():
    filename = f'/var/www/dealshub-miniapp/products/{cat}.json'
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(items, f, ensure_ascii=False, indent=2)
    print(f"Saved {cat}.json: {len(items)} items")

# Save index.json (first 24 of each category)
index = []
for cat in sorted(categories.keys()):
    index.extend(categories[cat][:24])

with open('/var/www/dealshub-miniapp/products/index.json', 'w', encoding='utf-8') as f:
    json.dump(index, f, ensure_ascii=False, indent=2)
print(f"Saved index.json: {len(index)} items")

print("\nDone!")
