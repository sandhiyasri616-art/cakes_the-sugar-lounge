# -*- coding: utf-8 -*-
import re

with open("index.html", "r", encoding="utf-8") as f:
    html = f.read()

# Fix the what-we-offer section
new_offer = """
    <section class="what-we-offer section-padding">
        <div class="container">
            <div class="section-header text-center">
                <h2>Made to Celebrate. Made to Learn.</h2>
                <p>Discover our core offerings crafted with passion and perfection.</p>
            </div>
            <div class="offer-cards" style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
                <div class="offer-card" style="display: flex; flex-direction: column; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 5px 15px rgba(0,0,0,0.05); border: 1px solid #eaeaea;">
                    <img src="https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?q=80&w=1000&auto=format&fit=crop" alt="Custom Bakes" style="width: 100%; height: 250px; object-fit: cover;">
                    <div class="offer-card-content" style="padding: 30px; display: flex; flex-direction: column; flex-grow: 1;">
                        <h3 style="margin-bottom: 15px;">Custom Bakes</h3>
                        <p style="margin-bottom: 25px; flex-grow: 1;">Cakes and sweet treats created around your occasion, preferred flavour, theme and requirements.</p>
                        <button type="button" class="btn btn-primary" onclick="document.getElementById('custom-bake-builder').scrollIntoView({behavior: 'smooth'})" style="width: 100%;">Create Your Custom Bake</button>
                    </div>
                </div>
                <div class="offer-card" style="display: flex; flex-direction: column; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 5px 15px rgba(0,0,0,0.05); border: 1px solid #eaeaea;">
                    <img src="beginner-class.jpg" alt="Baking Classes" style="width: 100%; height: 250px; object-fit: cover;">
                    <div class="offer-card-content" style="padding: 30px; display: flex; flex-direction: column; flex-grow: 1;">
                        <h3 style="margin-bottom: 15px;">Baking Classes</h3>
                        <p style="margin-bottom: 25px; flex-grow: 1;">Practical, hands-on baking sessions for people who want to learn baking and improve their skills.</p>
                        <button type="button" class="btn btn-primary reserve-seat-btn" data-class="Baking Classes" style="width: 100%;">Reserve Your Seat</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
"""

# Replace the what-we-offer section
html = re.sub(r'<section class="what-we-offer section-padding">.*?</section>', new_offer, html, flags=re.DOTALL)

# The user said: "Remove the old duplicate Baking Classes HTML structure. Make sure only ONE Baking Classes card is rendered."
# This means we should remove the massive `<section id="classes" class="baking-classes-section section-padding bg-light">` block.
html = re.sub(r'<!-- Baking Classes Section -->.*?<!-- Class Details Modal -->', '<!-- Class Details Modal -->', html, flags=re.DOTALL)

with open("index.html", "w", encoding="utf-8") as f:
    f.write(html)
print("Fixed.")
