document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Sticky Navbar ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- 2. Mobile Menu ---
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-links a');

    mobileBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        const icon = mobileMenu.classList.contains('active') ? 'fa-xmark' : 'fa-bars';
        mobileBtn.innerHTML = `<i class="fa-solid ${icon}"></i>`;
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            mobileBtn.innerHTML = `<i class="fa-solid fa-bars"></i>`;
        });
    });

    // --- 3. Intersection Observer (Fade Up Animations) ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add fade-up class to sections
    const animateElements = document.querySelectorAll('section, .product-card, .offer-card, .class-card');
    animateElements.forEach(el => {
        el.classList.add('fade-up');
        observer.observe(el);
    });

    // --- 4. Modals & Enquiry Logic ---
    const enquiryModal = document.getElementById('enquiry-modal');
    const customCakeModal = document.getElementById('custom-cake-modal');
    const closeModals = document.querySelectorAll('.close-modal');

    // Open Enquiry Modal
    document.querySelectorAll('.enquire-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productName = e.target.getAttribute('data-product');
            document.getElementById('enq-product-name').value = productName;
            enquiryModal.classList.add('active');
        });
    });

    // Open Custom Cake Modal
    document.querySelectorAll('.open-custom-form').forEach(btn => {
        btn.addEventListener('click', () => {
            customCakeModal.classList.add('active');
            // If it was an occasion tag, set the select value
            if (btn.classList.contains('tag')) {
                const occasion = btn.textContent;
                const select = document.getElementById('cc-occasion');
                for(let i = 0; i < select.options.length; i++) {
                    if(select.options[i].text === occasion) {
                        select.selectedIndex = i;
                        break;
                    }
                }
            }
        });
    });

    // Close Modals
    closeModals.forEach(btn => {
        btn.addEventListener('click', () => {
            enquiryModal.classList.remove('active');
            customCakeModal.classList.remove('active');
        });
    });

    // Close modal on outside click
    window.addEventListener('click', (e) => {
        if (e.target === enquiryModal) enquiryModal.classList.remove('active');
        if (e.target === customCakeModal) customCakeModal.classList.remove('active');
    });

    // Quantity Type Toggle (Pieces vs Weight)
    const qtyTypeSelect = document.getElementById('enq-qty-type');
    const piecesWrapper = document.getElementById('enq-pieces-wrapper');
    const weightWrapper = document.getElementById('enq-weight-wrapper');

    if (qtyTypeSelect) {
        qtyTypeSelect.addEventListener('change', (e) => {
            if (e.target.value === 'pieces') {
                piecesWrapper.classList.remove('hidden');
                weightWrapper.classList.add('hidden');
            } else {
                piecesWrapper.classList.add('hidden');
                weightWrapper.classList.remove('hidden');
            }
        });
    }

    // Custom Cake Form Submit Simulation
    const customForm = document.getElementById('custom-cake-form');
    if (customForm) {
        customForm.addEventListener('submit', (e) => {
            e.preventDefault();
            customForm.style.display = 'none';
            document.getElementById('cc-success-msg').classList.remove('hidden');
            setTimeout(() => {
                customCakeModal.classList.remove('active');
                setTimeout(() => {
                    customForm.style.display = 'block';
                    document.getElementById('cc-success-msg').classList.add('hidden');
                    customForm.reset();
                }, 500);
            }, 3000);
        });
    }

    // Enquiry Form Submit Simulation
    const enquiryForm = document.getElementById('product-enquiry-form');
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you! Your enquiry has been received.');
            enquiryModal.classList.remove('active');
            enquiryForm.reset();
        });
    }

    // --- 5. Cart Logic ---
    const cartBtn = document.querySelector('.cart-btn');
    const cartDrawer = document.getElementById('cart-drawer');
    const closeCart = document.querySelector('.close-cart');
    const cartOverlay = document.querySelector('.cart-overlay');
    const cartCount = document.querySelector('.cart-count');
    const cartContainer = document.getElementById('cart-items-container');
    const cartTotalDisplay = document.getElementById('cart-total-price');
    
    let cart = [];

    if(cartBtn) cartBtn.addEventListener('click', () => toggleCart(true));
    if(closeCart) closeCart.addEventListener('click', () => toggleCart(false));
    if(cartOverlay) cartOverlay.addEventListener('click', () => toggleCart(false));

    function toggleCart(show) {
        if (show) {
            cartDrawer.classList.add('active');
            cartOverlay.classList.add('active');
        } else {
            cartDrawer.classList.remove('active');
            cartOverlay.classList.remove('active');
        }
    }

    document.querySelectorAll('.add-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const product = e.target.getAttribute('data-product');
            const price = parseFloat(e.target.getAttribute('data-price'));
            addToCart(product, price);
            toggleCart(true);
        });
    });

    function addToCart(name, price) {
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.qty += 1;
        } else {
            cart.push({ name, price, qty: 1 });
        }
        updateCartUI();
    }

    window.updateQty = function(index, change) {
        cart[index].qty += change;
        if (cart[index].qty <= 0) {
            cart.splice(index, 1);
        }
        updateCartUI();
    }

    window.removeItem = function(index) {
        cart.splice(index, 1);
        updateCartUI();
    }

    function updateCartUI() {
        cartContainer.innerHTML = '';
        let total = 0;
        let count = 0;

        if (cart.length === 0) {
            cartContainer.innerHTML = '<p class="empty-cart-msg">Your cart is empty.</p>';
        } else {
            cart.forEach((item, index) => {
                total += item.price * item.qty;
                count += item.qty;
                
                const itemEl = document.createElement('div');
                itemEl.className = 'cart-item';
                itemEl.innerHTML = `
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <span class=\"cart-item-price\">?${item.price} x ${item.qty}</span>
                    </div>
                    <div class="cart-item-actions">
                        <button type="button" class="qty-btn" onclick="updateQty(${index}, -1)">-</button>
                        <span>${item.qty}</span>
                        <button type="button" class="qty-btn" onclick="updateQty(${index}, 1)">+</button>
                        <button type="button" class="remove-item" onclick="removeItem(${index})"><i class="fa-solid fa-trash"></i></button>
                    </div>
                `;
                cartContainer.appendChild(itemEl);
            });
        }

        cartCount.textContent = count;
        cartTotalDisplay.textContent = `?${total.toFixed(2)}`;
    }

    
    // Cart Enquiry Submit
    const submitCartBtn = document.getElementById('submit-cart-enquiry');
    const cartMsg = document.getElementById('cart-msg');
    
    if (submitCartBtn) {
        submitCartBtn.addEventListener('click', async () => {
            if (cart.length === 0) {
                cartMsg.style.display = 'block';
                cartMsg.style.color = 'red';
                cartMsg.textContent = 'Your cart is empty.';
                return;
            }
            
            submitCartBtn.disabled = true;
            submitCartBtn.textContent = 'SENDING...';
            
            try {
                const response = await fetch('http://localhost:5000/api/enquiry', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ items: cart, total: cartTotalDisplay.textContent })
                });
                
                if (response.ok) {
                    cartMsg.style.display = 'block';
                    cartMsg.style.color = 'green';
                    cartMsg.textContent = 'Your enquiry has been sent successfully!';
                    cart = [];
                    updateCartUI();
                } else {
                    throw new Error('Server returned ' + response.status);
                }
            } catch (err) {
                cartMsg.style.display = 'block';
                cartMsg.style.color = 'red';
                cartMsg.textContent = 'Failed to send enquiry. Please try again.';
                console.error(err);
            } finally {
                submitCartBtn.disabled = false;
                submitCartBtn.textContent = 'CONTINUE / SEND ENQUIRY';
            }
        });
    }

    // --- 6. Testimonial Carousel ---
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.getElementById('prev-testi');
    const nextBtn = document.getElementById('next-testi');
    let currentSlide = 0;
    let autoSlideInterval;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    if(slides && slides.length > 0) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoSlide();
        });
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoSlide();
        });

        function startAutoSlide() {
            autoSlideInterval = setInterval(nextSlide, 5000);
        }

        function resetAutoSlide() {
            clearInterval(autoSlideInterval);
            startAutoSlide();
        }

        startAutoSlide();
    }

    // --- 7. Gallery Filters & Lightbox ---
    const filterBtns = (document.querySelectorAll('.filter-btn') || []);
    const galleryItems = (document.querySelectorAll('.gallery-item') || []);
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightbox = document.querySelector('.close-lightbox');

    // Filtering
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => item.style.opacity = '1', 50);
                } else {
                    item.style.opacity = '0';
                    setTimeout(() => item.style.display = 'none', 300);
                }
            });
        });
    });

        // Lightbox
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            if (!lightboxImg || !lightbox) return;
            const imgSrc = item.querySelector('img').src;
            lightboxImg.src = imgSrc;
            lightbox.classList.add('active');
        });
    });

    if (closeLightbox) {
        closeLightbox.addEventListener('click', () => {
            lightbox.classList.remove('active');
        });
    }

    if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target !== lightboxImg) {
            lightbox.classList.remove('active');
        }
    });
}

    if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target !== lightboxImg) {
            lightbox.classList.remove('active');
        }
    });
}

});



// Custom Bakes logic
const cbForm = document.getElementById('new-custom-bake-form');
if (cbForm) {
    const fields = ['type', 'size', 'flavor', 'design', 'message', 'date', 'additional'];
    fields.forEach(f => {
        const el = document.getElementById('cb-' + f);
        if (el) {
            el.addEventListener('input', (e) => {
                document.getElementById('prev-' + f).textContent = e.target.value || '-';
            });
        }
    });

    const submitCbBtn = document.getElementById('submit-custom-enquiry');
    const cbSuccessMsg = document.getElementById('cb-success-msg');

    submitCbBtn.addEventListener('click', async () => {
        // Simple validation
        let valid = true;
        ['type', 'size', 'flavor', 'design', 'date'].forEach(f => {
            const el = document.getElementById('cb-' + f);
            if (!el.value) { valid = false; el.style.borderColor = 'red'; }
            else { el.style.borderColor = '#ccc'; }
        });
        
        if (!valid) return;
        
        submitCbBtn.disabled = true;
        submitCbBtn.textContent = 'Sending...';

        try {
            await fetch('http://localhost:5000/api/enquiry', { method: 'POST', body: JSON.stringify({ type: 'custom-bake' }) });
            cbSuccessMsg.style.display = 'block';
        } catch (e) {
            console.error(e);
        } finally {
            submitCbBtn.disabled = false;
            submitCbBtn.textContent = 'Send Custom Enquiry';
        }
    });
}

// Baking Classes Logic
const reserveSeatBtns = document.querySelectorAll('.reserve-seat-btn');
const bookingModal = document.getElementById('class-booking-modal');
const bkClassName = document.getElementById('bk-class-name');

reserveSeatBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        if(bkClassName) {
            bkClassName.value = btn.getAttribute('data-class');
        }
        if(bookingModal) {
            bookingModal.classList.add('active');
        }
    });
});

const submitBookingBtn = document.getElementById('submit-booking-btn');
const bkSuccessMsg = document.getElementById('bk-success-msg');
if (submitBookingBtn) {
    submitBookingBtn.addEventListener('click', async () => {
        submitBookingBtn.disabled = true;
        submitBookingBtn.textContent = 'Confirming...';
        try {
            await fetch('http://localhost:5000/api/book-class', { method: 'POST' });
            bkSuccessMsg.style.display = 'block';
        } catch (e) {
            console.error(e);
        } finally {
            submitBookingBtn.disabled = false;
            submitBookingBtn.textContent = 'Confirm Booking';
        }
    });
}

const viewDetailsBtns = document.querySelectorAll('.view-details-btn');
const detailsModal = document.getElementById('class-details-modal');
const detailsContent = document.getElementById('cd-dynamic-content');
const classData = {
    beginner: {
        title: "Beginner's Cake Baking Class",
        desc: "Learn the fundamentals of cake baking, layering, frosting and decorating in a friendly hands-on session.",
        learn: ["Baking moist sponges", "Making stable buttercream", "Crumb coating"],
        duration: "3 Hours",
        level: "Beginner",
        price: "₹1,499",
        seats: 5
    },
    advanced: {
        title: "Advanced Fondant Masterclass",
        desc: "Take your skills to the next level. Master sharp edges, fondant draping, and intricate sugar floral work.",
        learn: ["Sharp edges with ganache", "Fondant draping", "Sugar flowers"],
        duration: "5 Hours",
        level: "Advanced",
        price: "₹2,999",
        seats: 3
    }
};

viewDetailsBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-class');
        const data = classData[id];
        if (data && detailsContent && detailsModal) {
            detailsContent.innerHTML = 
                <h3> + data.title + </h3>
                <p> + data.desc + </p>
                <h5>What you will learn:</h5>
                <ul> + data.learn.map(l => '<li>' + l + '</li>').join('') + </ul>
                <p><strong>Duration:</strong>  + data.duration + </p>
                <p><strong>Level:</strong>  + data.level + </p>
                <p><strong>Price:</strong>  + data.price + </p>
                <p><strong>Seats Available:</strong>  + data.seats + </p>
                <button type="button" class="btn btn-primary reserve-seat-btn mt-3" data-class=" + data.title + ">Reserve Your Seat</button>
            ;
            // attach event to dynamically created button
            detailsContent.querySelector('.reserve-seat-btn').addEventListener('click', (e) => {
                detailsModal.classList.remove('active');
                if(bkClassName) {
                    bkClassName.value = e.target.getAttribute('data-class');
                }
                if(bookingModal) {
                    bookingModal.classList.add('active');
                }
            });
            detailsModal.classList.add('active');
        }
    });
});
// New Custom Bake Builder Logic
document.addEventListener('DOMContentLoaded', () => {
    const summaryMap = {
        'cbb-type': 'sum-type',
        'cbb-size': 'sum-size',
        'cbb-flavor': 'sum-flavor',
        'cbb-design': 'sum-design'
    };
    
    // Handle selectable grids
    Object.keys(summaryMap).forEach(gridId => {
        const grid = document.getElementById(gridId);
        if (grid) {
            const cards = grid.querySelectorAll('.cb-card');
            cards.forEach(card => {
                card.addEventListener('click', () => {
                    cards.forEach(c => c.classList.remove('active'));
                    card.classList.add('active');
                    document.getElementById(summaryMap[gridId]).textContent = card.getAttribute('data-val');
                });
            });
        }
    });

    // Handle text inputs
    const msgInput = document.getElementById('cbb-message');
    if(msgInput) {
        msgInput.addEventListener('input', e => document.getElementById('sum-message').textContent = e.target.value || '-');
    }
    const dateInput = document.getElementById('cbb-date');
    if(dateInput) {
        dateInput.addEventListener('change', e => document.getElementById('sum-date').textContent = e.target.value || '-');
    }
    const addInput = document.getElementById('cbb-additional');
    if(addInput) {
        addInput.addEventListener('input', e => document.getElementById('sum-additional').textContent = e.target.value || '-');
    }
    
    // Image Upload preview
    const imgInput = document.getElementById('cbb-image');
    if(imgInput) {
        imgInput.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const previewContainer = document.getElementById('cbb-image-preview');
                    const previewImg = document.getElementById('cbb-preview-img');
                    previewImg.src = e.target.result;
                    previewContainer.style.display = 'block';
                }
                reader.readAsDataURL(this.files[0]);
            }
        });
    }

    // Submit Custom Enquiry
    const submitCbBtn = document.getElementById('submit-custom-builder');
    const cbSuccessMsg = document.getElementById('cbb-success-msg');
    if (submitCbBtn) {
        submitCbBtn.addEventListener('click', async () => {
            submitCbBtn.disabled = true;
            submitCbBtn.textContent = 'Sending...';

            try {
                await fetch('http://localhost:5000/api/enquiry', { method: 'POST', body: JSON.stringify({ type: 'custom-bake-builder' }) });
                cbSuccessMsg.style.display = 'block';
            } catch (e) {
                console.error(e);
            } finally {
                submitCbBtn.disabled = false;
                submitCbBtn.textContent = 'Send Custom Enquiry';
            }
        });
    }
});
