# -*- coding: utf-8 -*-
import re

with open("index.html", "r", encoding="utf-8") as f:
    html = f.read()

custom_bakes_new = """
<section id="custom-cakes" class="custom-bakes-section section-padding">
    <div class="container">
        <div class="text-center mb-5">
            <h2>Custom Bakes Made Just for You</h2>
            <p>Tell us your idea, and we'll turn it into a beautiful bake made specially for your celebration.</p>
        </div>
        <div class="custom-bakes-layout">
            <div class="custom-bakes-image">
                <img src="https://images.unsplash.com/photo-1535254973040-607b474cb50d?q=80&w=1000&auto=format&fit=crop" alt="Premium Custom Cake">
            </div>
            <div class="custom-bakes-form-container">
                <h3>Create Your Custom Bake</h3>
                <form id="new-custom-bake-form" class="custom-bake-form">
                    <div class="form-row">
                        <div class="form-group half">
                            <label>Bake Type</label>
                            <select id="cb-type" required>
                                <option value="">Select Bake Type</option>
                                <option>Birthday Cake</option>
                                <option>Wedding Cake</option>
                                <option>Anniversary Cake</option>
                                <option>Celebration Cake</option>
                                <option>Cupcakes</option>
                                <option>Dessert Box</option>
                            </select>
                        </div>
                        <div class="form-group half">
                            <label>Size</label>
                            <select id="cb-size" required>
                                <option value="">Select Size</option>
                                <option>500 g</option>
                                <option>1 kg</option>
                                <option>1.5 kg</option>
                                <option>2 kg</option>
                                <option>Custom Size</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group half">
                            <label>Flavor</label>
                            <select id="cb-flavor" required>
                                <option value="">Select Flavor</option>
                                <option>Vanilla</option>
                                <option>Chocolate</option>
                                <option>Red Velvet</option>
                                <option>Butterscotch</option>
                                <option>Black Forest</option>
                                <option>Custom Flavor</option>
                            </select>
                        </div>
                        <div class="form-group half">
                            <label>Design Style</label>
                            <select id="cb-design" required>
                                <option value="">Select Design</option>
                                <option>Minimal</option>
                                <option>Floral</option>
                                <option>Elegant</option>
                                <option>Cartoon</option>
                                <option>Photo Cake</option>
                                <option>Theme Cake</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Message on Cake</label>
                        <input type="text" id="cb-message" placeholder="e.g. Happy Birthday!">
                    </div>
                    <div class="form-group">
                        <label>Preferred Date</label>
                        <input type="date" id="cb-date" required>
                    </div>
                    <div class="form-group">
                        <label>Additional Requirements</label>
                        <textarea id="cb-additional" rows="3" placeholder="Describe your custom requirements..."></textarea>
                    </div>
                    
                    <div class="cb-preview-summary">
                        <h4>Your Selection</h4>
                        <p><strong>Bake Type:</strong> <span id="prev-type">-</span></p>
                        <p><strong>Size:</strong> <span id="prev-size">-</span></p>
                        <p><strong>Flavor:</strong> <span id="prev-flavor">-</span></p>
                        <p><strong>Design:</strong> <span id="prev-design">-</span></p>
                        <p><strong>Cake Message:</strong> <span id="prev-message">-</span></p>
                        <p><strong>Date:</strong> <span id="prev-date">-</span></p>
                        <p><strong>Additional:</strong> <span id="prev-additional">-</span></p>
                    </div>

                    <button type="button" id="submit-custom-enquiry" class="btn btn-primary w-100 mt-3">Send Custom Enquiry</button>
                    <p id="cb-success-msg" style="display:none; color:green; margin-top:10px;">Your custom enquiry has been sent successfully!</p>
                </form>
            </div>
        </div>
    </div>
</section>
"""

classes_new = """
<section id="classes" class="baking-classes-section section-padding bg-light">
    <div class="container">
        <div class="text-center mb-5">
            <h2>Learn. Bake. Create.</h2>
            <p>Hands-on baking classes designed to help you create beautiful and delicious bakes with confidence.</p>
        </div>
        
        <div class="baking-classes-grid">
            <div class="new-class-card">
                <img src="beginner-class.jpg" alt="Beginner's Cake Baking Class" class="ncc-img">
                <div class="ncc-content">
                    <h3>Beginner's Cake Baking Class</h3>
                    <p>Learn the fundamentals of cake baking, layering, frosting and decorating in a friendly hands-on session.</p>
                    <div class="ncc-details">
                        <span><i class="fa-solid fa-clock"></i> 3 Hours</span>
                        <span><i class="fa-solid fa-layer-group"></i> Beginner</span>
                        <span class="price">?1,499</span>
                    </div>
                    <div class="ncc-actions">
                        <button type="button" class="btn btn-outline view-details-btn" data-class="beginner">View Details</button>
                        <button type="button" class="btn btn-primary reserve-seat-btn" data-class="Beginner's Cake Baking Class">Reserve Your Seat</button>
                    </div>
                </div>
            </div>
            
            <div class="new-class-card">
                <img src="advanced-class.jpg" alt="Advanced Fondant Masterclass" class="ncc-img">
                <div class="ncc-content">
                    <h3>Advanced Fondant Masterclass</h3>
                    <p>Take your skills to the next level. Master sharp edges, fondant draping, and intricate sugar floral work.</p>
                    <div class="ncc-details">
                        <span><i class="fa-solid fa-clock"></i> 5 Hours</span>
                        <span><i class="fa-solid fa-layer-group"></i> Advanced</span>
                        <span class="price">?2,999</span>
                    </div>
                    <div class="ncc-actions">
                        <button type="button" class="btn btn-outline view-details-btn" data-class="advanced">View Details</button>
                        <button type="button" class="btn btn-primary reserve-seat-btn" data-class="Advanced Fondant Masterclass">Reserve Your Seat</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Class Details Modal -->
<div id="class-details-modal" class="modal">
    <div class="modal-content class-details-content">
        <button type="button" class="close-modal">&times;</button>
        <div id="cd-dynamic-content"></div>
    </div>
</div>

<!-- Class Booking Modal -->
<div id="class-booking-modal" class="modal">
    <div class="modal-content">
        <button type="button" class="close-modal">&times;</button>
        <h3>Reserve Your Seat</h3>
        <form id="new-class-booking-form">
            <div class="form-group">
                <label>Class Name</label>
                <input type="text" id="bk-class-name" readonly>
            </div>
            <div class="form-group">
                <label>Name</label>
                <input type="text" id="bk-name" required>
            </div>
            <div class="form-group">
                <label>Email</label>
                <input type="email" id="bk-email" required>
            </div>
            <div class="form-group">
                <label>Phone</label>
                <input type="tel" id="bk-phone" required>
            </div>
            <div class="form-group">
                <label>Preferred Date</label>
                <input type="date" id="bk-date" required>
            </div>
            <div class="form-group">
                <label>Number of Seats</label>
                <input type="number" id="bk-seats" min="1" value="1" required>
            </div>
            <div class="form-group">
                <label>Notes</label>
                <textarea id="bk-notes" rows="2"></textarea>
            </div>
            <button type="button" id="submit-booking-btn" class="btn btn-primary w-100">Confirm Booking</button>
            <p id="bk-success-msg" style="display:none; color:green; margin-top:10px;">Your booking has been confirmed successfully!</p>
        </form>
    </div>
</div>
"""

html = re.sub(r'<section[^>]*custom-cakes.*?</section>', custom_bakes_new, html, flags=re.DOTALL | re.IGNORECASE)

if "You Imagine It" in html:
    html = re.sub(r'<section[^>]*>[\s\n]*<div class="container[^>]*>[\s\n]*<div class="cc-image".*?We Bake It.*?</section>', custom_bakes_new, html, flags=re.DOTALL)

if "upcoming-classes" in html:
    html = re.sub(r'<section class="upcoming-classes.*?</section>', classes_new, html, flags=re.DOTALL)

with open("index.html", "w", encoding="utf-8") as f:
    f.write(html)
print("HTML Sections Replaced")
