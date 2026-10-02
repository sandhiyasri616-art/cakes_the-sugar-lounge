import re

# Update index.html
with open('index.html', 'r', encoding='utf-8', errors='ignore') as f:
    content = f.read()

content = re.sub(r'From [^\d\w]{1,4}(\d+)', r'From ?\1', content)
content = re.sub(r'id=\"cart-total-price\">[^\d\w]{1,4}0</span>', r'id=\"cart-total-price\">?0</span>', content)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

# Update script.js
with open('script.js', 'r', encoding='utf-8', errors='ignore') as f:
    content = f.read()

content = re.sub(r'<span class=\"cart-item-price\">[^\$]*\$\{item.price\}', r'<span class=\"cart-item-price\">?${item.price}', content)
content = re.sub(r'textContent = `[^$]*\$\{total\.toFixed', r'textContent = `?${total.toFixed', content)

with open('script.js', 'w', encoding='utf-8') as f:
    f.write(content)
