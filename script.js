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

    cartBtn.addEventListener('click', () => toggleCart(true));
    closeCart.addEventListener('click', () => toggleCart(false));
    cartOverlay.addEventListener('click', () => toggleCart(false));

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
                        <span class="cart-item-price">₹${item.price} x ${item.qty}</span>
                    </div>
                    <div class="cart-item-actions">
                        <button class="qty-btn" onclick="updateQty(${index}, -1)">-</button>
                        <span>${item.qty}</span>
                        <button class="qty-btn" onclick="updateQty(${index}, 1)">+</button>
                        <button class="remove-item" onclick="removeItem(${index})"><i class="fa-solid fa-trash"></i></button>
                    </div>
                `;
                cartContainer.appendChild(itemEl);
            });
        }

        cartCount.textContent = count;
        cartTotalDisplay.textContent = `₹${total.toFixed(2)}`;
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

    if(slides.length > 0) {
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
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
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
            const imgSrc = item.querySelector('img').src;
            lightboxImg.src = imgSrc;
            lightbox.classList.add('active');
        });
    });

    closeLightbox.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });

    lightbox.addEventListener('click', (e) => {
        if(e.target === lightbox) {
            lightbox.classList.remove('active');
        }
    });

});
