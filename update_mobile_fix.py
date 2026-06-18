import re
import glob

# New mobile fix style block
new_style = '''    <!-- Mobile Fixes -->
    <style>
        @media (max-width: 768px) {
            /* Modal */
            .modal-overlay {
                padding: 0 !important;
                align-items: flex-end !important;
            }
            .modal-container {
                max-width: 100% !important;
                width: 100% !important;
                height: 100% !important;
                max-height: 100vh !important;
                border-radius: 0 !important;
                border: none !important;
            }
            .modal-content {
                grid-template-columns: 1fr !important;
                height: 100%;
            }
            .modal-image-section {
                min-height: 45vh;
                max-height: 50vh;
            }
            .modal-image-section img {
                max-height: 50vh;
                width: 100%;
                object-fit: cover;
            }
            .modal-details {
                padding: 16px;
                gap: 12px;
                overflow-y: auto;
            }
            .modal-title {
                font-size: 18px;
            }
            .modal-current-price {
                font-size: 28px;
            }
            /* Hide AI search counter on mobile */
            .ai-search-info {
                display: none !important;
            }
            /* Fix ruble symbol */
            .hero-stat-value {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
            }
            /* Smaller hero stats */
            .hero-stats {
                gap: 16px !important;
            }
            .hero-stat-value {
                font-size: 20px !important;
            }
            .hero-stat-label {
                font-size: 10px !important;
            }
            /* Hide sticky CTA on homepage mobile */
            .sticky-cta {
                display: none !important;
            }
            body {
                padding-bottom: 0 !important;
            }
            /* Category tabs scroll */
            .category-tabs {
                gap: 6px !important;
            }
            .category-tab {
                padding: 6px 12px !important;
                font-size: 12px !important;
            }
            /* Filter section */
            .filter-section {
                padding: 10px !important;
            }
            .filter-group {
                gap: 6px !important;
            }
            .filter-btn {
                padding: 5px 10px !important;
                font-size: 12px !important;
            }
            .sort-select {
                font-size: 12px !important;
                padding: 5px 8px !important;
            }
        }
    </style>'''

# Pattern to match old mobile fix blocks
old_patterns = [
    r'<!-- Mobile Modal Fix -->\s*<style>.*?</style>',
    r'<!-- Mobile Fixes -->\s*<style>.*?</style>',
]

files = glob.glob('*.html')
for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if file has modal (category pages have it)
    if 'modal-overlay' not in content:
        continue
        
    updated = False
    for pattern in old_patterns:
        if re.search(pattern, content, re.DOTALL):
            content = re.sub(pattern, new_style, content, flags=re.DOTALL)
            updated = True
            break
    
    if updated:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Updated: {filepath}')
    else:
        print(f'No mobile fix found: {filepath}')
