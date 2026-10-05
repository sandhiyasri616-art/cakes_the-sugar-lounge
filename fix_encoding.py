# -*- coding: utf-8 -*-
import os
import re

html_files = [f for f in os.listdir('.') if f.endswith('.html')]
js_files = [f for f in os.listdir('.') if f.endswith('.js')]

def fix_file(filepath):
    with open(filepath, 'rb') as f:
        content_bytes = f.read()
    
    try:
        content = content_bytes.decode('utf-8')
    except UnicodeDecodeError:
        content = content_bytes.decode('latin-1')

    # Fix the mojibake
    content = content.replace('â‚¹', '₹')
    content = content.replace('Ã¢', '₹')
    content = content.replace('â', '₹')
    
    # Clean up weird repeated symbols or wrong combos before a price
    content = re.sub(r'₹[^0-9<]*(\d+)', r'₹\1', content)
    content = re.sub(r'₹+', r'₹', content)
    
    if filepath.endswith('.html'):
        if '<meta charset="UTF-8">' not in content and '<meta charset="utf-8">' not in content:
            content = content.replace('<head>', '<head>\n    <meta charset="UTF-8">')

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

for f in html_files + js_files:
    fix_file(f)

print("Files fixed.")
