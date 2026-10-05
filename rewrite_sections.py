# -*- coding: utf-8 -*-
import re

with open("index.html", "r", encoding="utf-8") as f:
    html = f.read()

classes_new = """
<!-- Baking Classes Section -->
<section id="classes" class="baking-classes-section section-padding bg-light">
    <div class="container">
        <div class="text-center mb-5">
            <h2>Learn the Art of Baking</h2>
            <p>Hands-on baking experiences where you learn, create and take home something delicious.</p>
        </div>
        
        <!-- Featured Class -->
        <div class="featured-class-layout mb-5">
            <div class="fc-image">
                <img src="beginner-class.jpg" alt="Beginner's Cake Baking Class">
            </div>
            <div class="fc-content">
                <h3>Beginner's Cake Baking Class</h3>
                <p>Learn the basics of baking, layering, frosting and decorating your own beautiful cake.</p>
                <div class="fc-info-boxes">
                    <div class="fc-box">
                        <strong>Duration</strong>
                        <span>3 Hours</span>
                    </div>
                    <div class="fc-box">
                        <strong>Level</strong>
                        <span>Beginner</span>
                    </div>
                    <div class="fc-box">
                        <strong>Seats</strong>
                        <span>Limited</span>
                    </div>
                    <div class="fc-box">
                        <strong>Price</strong>
                        <span>?1,499</span>
                    </div>
                </div>
                <div class="fc-actions mt-4">
                    <button type="button" class="btn btn-outline view-class-details-btn" data-class="beginner">View Class Details</button>
                    <button type="button" class="btn btn-primary reserve-seat-btn" data-class="Beginner's Cake Baking Class">Reserve Your Seat</button>
                </div>
            </div>
        </div>

        <!-- Other Classes Grid -->
        <div class="other-classes-grid">
            <!-- Card 1 -->
            <div class="new-class-card">
                <img src="https://images.unsplash.com/photo-1557925923-33b251d59000?w=500&auto=format&fit=crop" alt="Cupcake Decorating Workshop" class="ncc-img">
                <div class="ncc-content">
                    <h4>Cupcake Decorating Workshop</h4>
                    <p>Learn to pipe beautiful swirls and create stunning cupcake designs.</p>
                    <div class="ncc-details">
                        <span><i class="fa-solid fa-clock"></i> 2 Hours</span>
                        <span class="price">?999</span>
                    </div>
                    <div class="ncc-actions">
                        <button type="button" class="btn btn-outline view-class-details-btn" data-class="cupcake">View Details</button>
                        <button type="button" class="btn btn-primary reserve-seat-btn" data-class="Cupcake Decorating Workshop">Reserve Your Seat</button>
                    </div>
                </div>
            </div>
            <!-- Card 2 -->
            <div class="new-class-card">
                <img src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&auto=format&fit=crop" alt="Chocolate Cake Masterclass" class="ncc-img">
                <div class="ncc-content">
                    <h4>Chocolate Cake Masterclass</h4>
                    <p>Master the art of rich chocolate sponges and perfect ganache drips.</p>
                    <div class="ncc-details">
                        <span><i class="fa-solid fa-clock"></i> 4 Hours</span>
                        <span class="price">?1,999</span>
                    </div>
                    <div class="ncc-actions">
                        <button type="button" class="btn btn-outline view-class-details-btn" data-class="chocolate">View Details</button>
                        <button type="button" class="btn btn-primary reserve-seat-btn" data-class="Chocolate Cake Masterclass">Reserve Your Seat</button>
                    </div>
                </div>
            </div>
            <!-- Card 3 -->
            <div class="new-class-card">
                <img src="advanced-class.jpg" alt="Advanced Cake Decoration" class="ncc-img">
                <div class="ncc-content">
                    <h4>Advanced Cake Decoration</h4>
                    <p>Take your skills to the next level with fondant, sharp edges, and sugar flowers.</p>
                    <div class="ncc-details">
                        <span><i class="fa-solid fa-clock"></i> 5 Hours</span>
                        <span class="price">?2,999</span>
                    </div>
                    <div class="ncc-actions">
                        <button type="button" class="btn btn-outline view-class-details-btn" data-class="advanced">View Details</button>
                        <button type="button" class="btn btn-primary reserve-seat-btn" data-class="Advanced Cake Decoration">Reserve Your Seat</button>
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
                <label>Phone Number</label>
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
                <label>Additional Notes</label>
                <textarea id="bk-notes" rows="2"></textarea>
            </div>
            <button type="button" id="submit-booking-btn" class="btn btn-primary w-100">Confirm Booking</button>
            <p id="bk-success-msg" style="display:none; color:green; margin-top:10px;">Your seat has been reserved successfully! We'll contact you shortly.</p>
        </form>
    </div>
</div>
"""

custom_bakes_new = """
<!-- Custom Bakes Section -->
<section id="custom-cakes" class="custom-bakes-section section-padding">
    <div class="container">
        <div class="text-center mb-5">
            <h2>Your Dream Cake, Made Just for You</h2>
            <p>From simple celebrations to unforgettable moments, tell us your idea and we'll create a bake that's uniquely yours.</p>
        </div>
        
        <!-- Introduction Area -->
        <div class="cb-intro-layout mb-5">
            <div class="cb-intro-img">
                <img src="https://images.unsplash.com/photo-1535254973040-607b474cb50d?q=80&w=1000&auto=format&fit=crop" alt="Premium Custom Cake">
            </div>
            <div class="cb-intro-text">
                <h3>Let's Create Something Special</h3>
                <p>Have a specific theme, flavor or design in mind? Share your requirements with us and we'll turn your idea into a beautiful custom bake.</p>
                <button type="button" class="btn btn-primary mt-3" onclick="document.getElementById('custom-bake-builder').scrollIntoView({behavior: 'smooth'})">Start Your Custom Order</button>
            </div>
        </div>
        
        <!-- Custom Bake Builder -->
        <div id="custom-bake-builder" class="cb-builder-layout">
            <div class="cb-builder-steps">
                
                <div class="cb-step">
                    <h4>Step 1 &mdash; Choose Your Bake</h4>
                    <div class="cb-selectable-grid" id="cbb-type">
                        <div class="cb-card" data-val="Celebration Cake">?? Celebration Cake</div>
                        <div class="cb-card" data-val="Cupcakes">?? Cupcakes</div>
                        <div class="cb-card" data-val="Dessert Box">?? Dessert Box</div>
                        <div class="cb-card" data-val="Birthday Cake">?? Birthday Cake</div>
                        <div class="cb-card" data-val="Wedding Cake">?? Wedding Cake</div>
                        <div class="cb-card" data-val="Theme Cake">?? Theme Cake</div>
                    </div>
                </div>

                <div class="cb-step">
                    <h4>Step 2 &mdash; Choose Size</h4>
                    <div class="cb-selectable-grid" id="cbb-size">
                        <div class="cb-card" data-val="500 g">500 g</div>
                        <div class="cb-card" data-val="1 kg">1 kg</div>
                        <div class="cb-card" data-val="1.5 kg">1.5 kg</div>
                        <div class="cb-card" data-val="2 kg">2 kg</div>
                        <div class="cb-card" data-val="3 kg">3 kg</div>
                        <div class="cb-card" data-val="Custom Size">Custom Size</div>
                    </div>
                </div>

                <div class="cb-step">
                    <h4>Step 3 &mdash; Choose Flavor</h4>
                    <div class="cb-selectable-grid" id="cbb-flavor">
                        <div class="cb-card" data-val="Vanilla">Vanilla</div>
                        <div class="cb-card" data-val="Chocolate">Chocolate</div>
                        <div class="cb-card" data-val="Red Velvet">Red Velvet</div>
                        <div class="cb-card" data-val="Butterscotch">Butterscotch</div>
                        <div class="cb-card" data-val="Black Forest">Black Forest</div>
                        <div class="cb-card" data-val="Pineapple">Pineapple</div>
                        <div class="cb-card" data-val="Custom Flavor">Custom Flavor</div>
                    </div>
                </div>

                <div class="cb-step">
                    <h4>Step 4 &mdash; Choose Your Design</h4>
                    <div class="cb-selectable-grid" id="cbb-design">
                        <div class="cb-card" data-val="Minimal">Minimal</div>
                        <div class="cb-card" data-val="Floral">Floral</div>
                        <div class="cb-card" data-val="Elegant">Elegant</div>
                        <div class="cb-card" data-val="Cartoon">Cartoon</div>
                        <div class="cb-card" data-val="Photo Cake">Photo Cake</div>
                        <div class="cb-card" data-val="Theme Cake">Theme Cake</div>
                        <div class="cb-card" data-val="Vintage">Vintage</div>
                        <div class="cb-card" data-val="Custom Design">Custom Design</div>
                    </div>
                </div>

                <div class="cb-step">
                    <h4>Step 5 &mdash; Personalize It</h4>
                    <div class="form-group">
                        <label>Cake Message</label>
                        <input type="text" id="cbb-message" placeholder="Enter your message">
                    </div>
                    <div class="form-row">
                        <div class="form-group half">
                            <label>Preferred Date</label>
                            <input type="date" id="cbb-date">
                        </div>
                        <div class="form-group half">
                            <label>Number of People</label>
                            <input type="number" id="cbb-people" placeholder="Number of people">
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Additional Requirements</label>
                        <textarea id="cbb-additional" rows="3" placeholder="Tell us about your design, theme, colors or special requirements..."></textarea>
                    </div>
                    
                    <div class="form-group mt-3">
                        <label>Upload Your Inspiration (Optional)</label>
                        <input type="file" id="cbb-image" accept="image/*">
                        <div id="cbb-image-preview" style="margin-top:10px; display:none;">
                            <img src="" id="cbb-preview-img" style="max-width:150px; border-radius:8px;">
                        </div>
                    </div>
                </div>

            </div>

            <div class="cb-builder-summary">
                <div class="cb-summary-card">
                    <h4>Your Custom Bake</h4>
                    <p><strong>Bake Type:</strong> <span id="sum-type">-</span></p>
                    <p><strong>Size:</strong> <span id="sum-size">-</span></p>
                    <p><strong>Flavor:</strong> <span id="sum-flavor">-</span></p>
                    <p><strong>Design:</strong> <span id="sum-design">-</span></p>
                    <p><strong>Message:</strong> <span id="sum-message">-</span></p>
                    <p><strong>Date:</strong> <span id="sum-date">-</span></p>
                    <p><strong>Additional:</strong> <span id="sum-additional">-</span></p>
                    
                    <button type="button" id="submit-custom-builder" class="btn btn-primary w-100 mt-4">Send Custom Enquiry</button>
                    <p id="cbb-success-msg" style="display:none; color:green; margin-top:10px;">Thank you! Your custom bake enquiry has been received. We'll contact you shortly to discuss your cake.</p>
                </div>
            </div>
        </div>
    </div>
</section>
"""

html = re.sub(r'<!-- Baking Classes Section -->.*?</section>[\s\n]*<!-- Class Details Modal -->.*?</div>[\s\n]*</div>[\s\n]*<!-- Class Booking Modal -->.*?</div>[\s\n]*</div>', classes_new, html, flags=re.DOTALL)
html = re.sub(r'<!-- Custom Bakes Section -->.*?</section>', custom_bakes_new, html, flags=re.DOTALL)

with open("index.html", "w", encoding="utf-8") as f:
    f.write(html)
print("HTML replaced")
