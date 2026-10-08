document.addEventListener('DOMContentLoaded', () => {

    // =========================================================
    // 1. MOBILE MENU
    // =========================================================

    const mobileBtn = document.getElementById('mobile-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileBtn && mobileMenu) {

        mobileBtn.addEventListener('click', () => {

            mobileMenu.classList.toggle('active');

            const icon = mobileMenu.classList.contains('active')
                ? 'fa-xmark'
                : 'fa-bars';

            mobileBtn.innerHTML = `<i class="fa-solid ${icon}"></i>`;
        });
    }

    mobileLinks.forEach(link => {

        link.addEventListener('click', () => {

            if (mobileMenu) {
                mobileMenu.classList.remove('active');
            }

            if (mobileBtn) {
                mobileBtn.innerHTML =
                    `<i class="fa-solid fa-bars"></i>`;
            }
        });

    });


    // =========================================================
    // 2. STICKY NAVBAR
    // =========================================================

    const navbar = document.getElementById('navbar');

    if (navbar) {

        window.addEventListener('scroll', () => {

            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

        });

    }


    // =========================================================
    // 3. INTERSECTION OBSERVER / ANIMATIONS
    // =========================================================

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add('visible');

                observer.unobserve(entry.target);

            }

        });

    }, observerOptions);


    const animateElements = document.querySelectorAll(
        'section, .product-card, .offer-card, .class-card'
    );

    animateElements.forEach(element => {

        element.classList.add('fade-up');

        observer.observe(element);

    });


    // =========================================================
    // 4. MODALS
    // =========================================================

    const enquiryModal =
        document.getElementById('enquiry-modal');

    const customCakeModal =
        document.getElementById('custom-cake-modal');

    const closeModals =
        document.querySelectorAll('.close-modal');


    // Product enquiry modal

    document.querySelectorAll('.enquire-btn').forEach(button => {

        button.addEventListener('click', (event) => {

            const productName =
                event.currentTarget.getAttribute('data-product');

            const productInput =
                document.getElementById('enq-product-name');

            if (productInput) {
                productInput.value = productName || '';
            }

            if (enquiryModal) {
                enquiryModal.classList.add('active');
            }

        });

    });


    // Custom cake modal

    document.querySelectorAll('.open-custom-form').forEach(button => {

        button.addEventListener('click', () => {

            if (customCakeModal) {
                customCakeModal.classList.add('active');
            }

            if (button.classList.contains('tag')) {

                const occasion =
                    button.textContent.trim();

                const select =
                    document.getElementById('cc-occasion');

                if (select) {

                    for (let i = 0; i < select.options.length; i++) {

                        if (
                            select.options[i].text.trim() === occasion
                        ) {

                            select.selectedIndex = i;
                            break;

                        }

                    }

                }

            }

        });

    });


    // Close modals

    closeModals.forEach(button => {

        button.addEventListener('click', () => {

            if (enquiryModal) {
                enquiryModal.classList.remove('active');
            }

            if (customCakeModal) {
                customCakeModal.classList.remove('active');
            }

        });

    });


    // Close modal when clicking outside

    window.addEventListener('click', (event) => {

        if (
            enquiryModal &&
            event.target === enquiryModal
        ) {
            enquiryModal.classList.remove('active');
        }

        if (
            customCakeModal &&
            event.target === customCakeModal
        ) {
            customCakeModal.classList.remove('active');
        }

    });


    // =========================================================
    // 5. PRODUCT ENQUIRY QUANTITY
    // =========================================================

    const qtyTypeSelect =
        document.getElementById('enq-qty-type');

    const piecesWrapper =
        document.getElementById('enq-pieces-wrapper');

    const weightWrapper =
        document.getElementById('enq-weight-wrapper');


    if (qtyTypeSelect) {

        qtyTypeSelect.addEventListener('change', (event) => {

            if (event.target.value === 'pieces') {

                if (piecesWrapper) {
                    piecesWrapper.classList.remove('hidden');
                }

                if (weightWrapper) {
                    weightWrapper.classList.add('hidden');
                }

            } else {

                if (piecesWrapper) {
                    piecesWrapper.classList.add('hidden');
                }

                if (weightWrapper) {
                    weightWrapper.classList.remove('hidden');
                }

            }

        });

    }


    // =========================================================
    // 6. CUSTOM CAKE FORM
    // =========================================================

    const customForm =
        document.getElementById('custom-cake-form');

    if (customForm) {

        customForm.addEventListener('submit', (event) => {

            event.preventDefault();

            customForm.style.display = 'none';

            const successMessage =
                document.getElementById('cc-success-msg');

            if (successMessage) {
                successMessage.classList.remove('hidden');
            }

            setTimeout(() => {

                if (customCakeModal) {
                    customCakeModal.classList.remove('active');
                }

                setTimeout(() => {

                    customForm.style.display = 'block';

                    if (successMessage) {
                        successMessage.classList.add('hidden');
                    }

                    customForm.reset();

                }, 500);

            }, 3000);

        });

    }


    // =========================================================
    // 7. PRODUCT ENQUIRY FORM
    // =========================================================

    const enquiryForm =
        document.getElementById('product-enquiry-form');

    if (enquiryForm) {

        enquiryForm.addEventListener('submit', (event) => {

            event.preventDefault();

            alert(
                'Thank you! Your enquiry has been received.'
            );

            if (enquiryModal) {
                enquiryModal.classList.remove('active');
            }

            enquiryForm.reset();

        });

    }


    // =========================================================
    // 8. CART
    // =========================================================

    const cartBtn =
        document.querySelector('.cart-btn');

    const cartDrawer =
        document.getElementById('cart-drawer');

    const closeCart =
        document.querySelector('.close-cart');

    const cartOverlay =
        document.querySelector('.cart-overlay');

    const cartCount =
        document.querySelector('.cart-count');

    const cartContainer =
        document.getElementById('cart-items-container');

    const cartTotalDisplay =
        document.getElementById('cart-total-price');


    // Load cart from localStorage

    let cart = [];

    try {

        cart =
            JSON.parse(
                localStorage.getItem('sugarLoungeCart')
            ) || [];

    } catch (error) {

        console.error(
            'Error loading cart:',
            error
        );

        cart = [];

    }


    // =========================================================
    // OPEN / CLOSE CART
    // =========================================================

    function toggleCart(show) {

        if (!cartDrawer || !cartOverlay) {
            return;
        }

        if (show) {

            cartDrawer.classList.add('active');
            cartOverlay.classList.add('active');

        } else {

            cartDrawer.classList.remove('active');
            cartOverlay.classList.remove('active');

        }

    }


    if (cartBtn) {

        cartBtn.addEventListener('click', () => {

            toggleCart(true);

        });

    }


    if (closeCart) {

        closeCart.addEventListener('click', () => {

            toggleCart(false);

        });

    }


    if (cartOverlay) {

        cartOverlay.addEventListener('click', () => {

            toggleCart(false);

        });

    }


    // =========================================================
    // ADD TO CART
    // IMPORTANT:
    // ONLY ONE EVENT LISTENER
    // =========================================================

    document.addEventListener('click', (event) => {

        const button =
            event.target.closest('.add-cart-btn');

        if (!button) {
            return;
        }

        event.preventDefault();

        const product =
            button.getAttribute('data-product');

        const price =
            parseFloat(
                button.getAttribute('data-price')
            );


        // Validate product

        if (!product) {

            console.error(
                'Add to Cart Error: data-product is missing.'
            );

            return;

        }


        // Validate price

        if (isNaN(price)) {

            console.error(
                'Add to Cart Error: data-price is missing or invalid.'
            );

            return;

        }


        addToCart(product, price);

        toggleCart(true);

    });


    // =========================================================
    // ADD ITEM
    // =========================================================

    function addToCart(name, price) {

        const existingItem =
            cart.find(item => item.name === name);


        if (existingItem) {

            existingItem.qty += 1;

        } else {

            cart.push({

                name: name,

                price: price,

                qty: 1

            });

        }


        saveCart();

        updateCartUI();

    }


    // =========================================================
    // SAVE CART
    // =========================================================

    function saveCart() {

        localStorage.setItem(
            'sugarLoungeCart',
            JSON.stringify(cart)
        );

    }


    // =========================================================
    // UPDATE QUANTITY
    // =========================================================

    window.updateQty = function(index, change) {

        if (!cart[index]) {
            return;
        }


        cart[index].qty += change;


        if (cart[index].qty <= 0) {

            cart.splice(index, 1);

        }


        saveCart();

        updateCartUI();

    };


    // =========================================================
    // REMOVE ITEM
    // =========================================================

    window.removeItem = function(index) {

        if (!cart[index]) {
            return;
        }


        cart.splice(index, 1);

        saveCart();

        updateCartUI();

    };


    // =========================================================
    // UPDATE CART UI
    // =========================================================

    function updateCartUI() {

        if (!cartContainer) {
            return;
        }


        cartContainer.innerHTML = '';


        let total = 0;

        let count = 0;


        // Empty cart

        if (cart.length === 0) {

            cartContainer.innerHTML =
                `<p class="empty-cart-msg">
                    Your cart is empty.
                </p>`;

        } else {


            // Display products

            cart.forEach((item, index) => {

                total +=
                    Number(item.price) *
                    Number(item.qty);

                count +=
                    Number(item.qty);


                const itemElement =
                    document.createElement('div');

                itemElement.className =
                    'cart-item';


                itemElement.innerHTML = `

                    <div class="cart-item-info">

                        <h4>${escapeHtml(item.name)}</h4>

                        <span class="cart-item-price">
                            ₹${Number(item.price).toFixed(2)}
                            × ${item.qty}
                        </span>

                    </div>


                    <div class="cart-item-actions">

                        <button
                            type="button"
                            class="qty-btn"
                            onclick="updateQty(${index}, -1)">
                            -
                        </button>


                        <span>
                            ${item.qty}
                        </span>


                        <button
                            type="button"
                            class="qty-btn"
                            onclick="updateQty(${index}, 1)">
                            +
                        </button>


                        <button
                            type="button"
                            class="remove-item"
                            onclick="removeItem(${index})">

                            <i class="fa-solid fa-trash"></i>

                        </button>

                    </div>

                `;


                cartContainer.appendChild(itemElement);

            });

        }


        // Cart count

        if (cartCount) {

            cartCount.textContent = count;

        }


        // Cart total

        if (cartTotalDisplay) {

            cartTotalDisplay.textContent =
                `₹${total.toFixed(2)}`;

        }

    }


    // =========================================================
    // HTML ESCAPE
    // =========================================================

    function escapeHtml(text) {

        const div =
            document.createElement('div');

        div.textContent = text;

        return div.innerHTML;

    }


    // =========================================================
    // INITIAL CART LOAD
    // =========================================================

    updateCartUI();


    // =========================================================
    // 9. CART SEND ENQUIRY
    // =========================================================

    const submitCartBtn =
        document.getElementById('submit-cart-enquiry');

    const cartMsg =
        document.getElementById('cart-msg');


    if (submitCartBtn) {

        submitCartBtn.addEventListener(
            'click',
            async () => {


                // Empty cart

                if (cart.length === 0) {

                    if (cartMsg) {

                        cartMsg.style.display = 'block';

                        cartMsg.style.color = 'red';

                        cartMsg.textContent =
                            'Your cart is empty.';

                    }

                    return;

                }


                submitCartBtn.disabled = true;

                submitCartBtn.textContent =
                    'SENDING...';


                try {


                    // IMPORTANT:
                    // Correct URL - no markdown syntax

                    const response =
                        await fetch(
                            'http://localhost:5000/api/enquiry',
                            {
                                method: 'POST',

                                headers: {
                                    'Content-Type':
                                        'application/json'
                                },

                                body: JSON.stringify({

                                    items: cart,

                                    total:
                                        cart.reduce(
                                            (sum, item) =>
                                                sum +
                                                item.price *
                                                item.qty,
                                            0
                                        )

                                })

                            }
                        );


                    if (!response.ok) {

                        throw new Error(
                            'Server returned ' +
                            response.status
                        );

                    }


                    if (cartMsg) {

                        cartMsg.style.display = 'block';

                        cartMsg.style.color = 'green';

                        cartMsg.textContent =
                            'Your enquiry has been sent successfully!';

                    }


                    // Clear cart

                    cart = [];

                    saveCart();

                    updateCartUI();


                } catch (error) {

                    console.error(
                        'Cart enquiry error:',
                        error
                    );


                    if (cartMsg) {

                        cartMsg.style.display = 'block';

                        cartMsg.style.color = 'red';

                        cartMsg.textContent =
                            'Failed to send enquiry. Please make sure the backend server is running.';

                    }

                } finally {

                    submitCartBtn.disabled = false;

                    submitCartBtn.textContent =
                        'CONTINUE / SEND ENQUIRY';

                }

            }
        );

    }


    // =========================================================
    // 10. TESTIMONIAL CAROUSEL
    // =========================================================

    const slides =
        document.querySelectorAll(
            '.testimonial-slide'
        );

    const prevBtn =
        document.getElementById('prev-testi');

    const nextBtn =
        document.getElementById('next-testi');

    let currentSlide = 0;

    let autoSlideInterval;


    function showSlide(index) {

        slides.forEach(slide => {

            slide.classList.remove('active');

        });


        if (slides[index]) {

            slides[index].classList.add('active');

        }

    }


    function nextSlide() {

        if (slides.length === 0) {
            return;
        }

        currentSlide =
            (currentSlide + 1) %
            slides.length;

        showSlide(currentSlide);

    }


    function prevSlide() {

        if (slides.length === 0) {
            return;
        }

        currentSlide =
            (currentSlide - 1 + slides.length) %
            slides.length;

        showSlide(currentSlide);

    }


    function startAutoSlide() {

        autoSlideInterval =
            setInterval(
                nextSlide,
                5000
            );

    }


    function resetAutoSlide() {

        clearInterval(
            autoSlideInterval
        );

        startAutoSlide();

    }


    if (slides.length > 0) {

        showSlide(0);


        if (nextBtn) {

            nextBtn.addEventListener(
                'click',
                () => {

                    nextSlide();

                    resetAutoSlide();

                }
            );

        }


        if (prevBtn) {

            prevBtn.addEventListener(
                'click',
                () => {

                    prevSlide();

                    resetAutoSlide();

                }
            );

        }


        startAutoSlide();

    }


    // =========================================================
    // 11. GALLERY FILTER
    // =========================================================

    const filterBtns =
        document.querySelectorAll(
            '.filter-btn'
        );

    const galleryItems =
        document.querySelectorAll(
            '.gallery-item'
        );


    filterBtns.forEach(button => {

        button.addEventListener(
            'click',
            () => {


                filterBtns.forEach(btn => {

                    btn.classList.remove(
                        'active'
                    );

                });


                button.classList.add(
                    'active'
                );


                const filter =
                    button.getAttribute(
                        'data-filter'
                    );


                galleryItems.forEach(item => {

                    const category =
                        item.getAttribute(
                            'data-category'
                        );


                    if (
                        filter === 'all' ||
                        category === filter
                    ) {

                        item.style.display =
                            'block';

                        setTimeout(() => {

                            item.style.opacity =
                                '1';

                        }, 50);

                    } else {

                        item.style.opacity =
                            '0';

                        setTimeout(() => {

                            item.style.display =
                                'none';

                        }, 300);

                    }

                });

            }
        );

    });


    // =========================================================
    // 12. GALLERY LIGHTBOX
    // =========================================================

    const lightbox =
        document.getElementById(
            'lightbox'
        );

    const lightboxImg =
        document.getElementById(
            'lightbox-img'
        );

    const closeLightbox =
        document.querySelector(
            '.close-lightbox'
        );


    galleryItems.forEach(item => {

        item.addEventListener(
            'click',
            () => {

                const image =
                    item.querySelector('img');


                if (
                    !image ||
                    !lightbox ||
                    !lightboxImg
                ) {
                    return;
                }


                lightboxImg.src =
                    image.src;


                lightbox.classList.add(
                    'active'
                );

            }
        );

    });


    if (closeLightbox) {

        closeLightbox.addEventListener(
            'click',
            () => {

                if (lightbox) {

                    lightbox.classList.remove(
                        'active'
                    );

                }

            }
        );

    }


    if (lightbox) {

        lightbox.addEventListener(
            'click',
            (event) => {

                if (
                    event.target !==
                    lightboxImg
                ) {

                    lightbox.classList.remove(
                        'active'
                    );

                }

            }
        );

    }


    // =========================================================
    // 13. CUSTOM BAKES OLD FORM
    // =========================================================

    const cbForm =
        document.getElementById(
            'new-custom-bake-form'
        );


    if (cbForm) {

        const fields = [
            'type',
            'size',
            'flavor',
            'design',
            'message',
            'date',
            'additional'
        ];


        fields.forEach(field => {

            const element =
                document.getElementById(
                    'cb-' + field
                );

            const preview =
                document.getElementById(
                    'prev-' + field
                );


            if (element && preview) {

                element.addEventListener(
                    'input',
                    () => {

                        preview.textContent =
                            element.value || '-';

                    }
                );

            }

        });


        const submitCbBtn =
            document.getElementById(
                'submit-custom-enquiry'
            );

        const cbSuccessMsg =
            document.getElementById(
                'cb-success-msg'
            );


        if (submitCbBtn) {

            submitCbBtn.addEventListener(
                'click',
                async () => {


                    let valid = true;


                    [
                        'type',
                        'size',
                        'flavor',
                        'design',
                        'date'
                    ].forEach(field => {

                        const element =
                            document.getElementById(
                                'cb-' + field
                            );


                        if (
                            element &&
                            !element.value
                        ) {

                            valid = false;

                            element.style.borderColor =
                                'red';

                        } else if (element) {

                            element.style.borderColor =
                                '';

                        }

                    });


                    if (!valid) {

                        alert(
                            'Please fill all required fields.'
                        );

                        return;

                    }


                    submitCbBtn.disabled =
                        true;

                    submitCbBtn.textContent =
                        'Sending...';


                    try {

                        const response =
                            await fetch(
                                'http://localhost:5000/api/enquiry',
                                {
                                    method: 'POST',

                                    headers: {
                                        'Content-Type':
                                            'application/json'
                                    },

                                    body: JSON.stringify({
                                        type:
                                            'custom-bake'
                                    })

                                }
                            );


                        if (!response.ok) {

                            throw new Error(
                                'Server error'
                            );

                        }


                        if (cbSuccessMsg) {

                            cbSuccessMsg.style.display =
                                'block';

                        }


                    } catch (error) {

                        console.error(
                            error
                        );

                        alert(
                            'Unable to send enquiry. Please try again.'
                        );

                    } finally {

                        submitCbBtn.disabled =
                            false;

                        submitCbBtn.textContent =
                            'Send Custom Enquiry';

                    }

                }
            );

        }

    }


    // =========================================================
    // 14. BAKING CLASSES
    // =========================================================

    const reserveSeatBtns =
        document.querySelectorAll(
            '.reserve-seat-btn'
        );

    const bookingModal =
        document.getElementById(
            'class-booking-modal'
        );

    const bkClassName =
        document.getElementById(
            'bk-class-name'
        );


    reserveSeatBtns.forEach(button => {

        button.addEventListener(
            'click',
            () => {

                const className =
                    button.getAttribute(
                        'data-class'
                    );


                if (bkClassName) {

                    bkClassName.value =
                        className || '';

                }


                if (bookingModal) {

                    bookingModal.classList.add(
                        'active'
                    );

                }

            }
        );

    });


    // =========================================================
    // 15. BOOKING SUBMIT
    // =========================================================

    const submitBookingBtn =
        document.getElementById(
            'submit-booking-btn'
        );

    const bkSuccessMsg =
        document.getElementById(
            'bk-success-msg'
        );


    if (submitBookingBtn) {

        submitBookingBtn.addEventListener(
            'click',
            async () => {


                submitBookingBtn.disabled =
                    true;

                submitBookingBtn.textContent =
                    'Confirming...';


                try {

                    const response =
                        await fetch(
                            'http://localhost:5000/api/book-class',
                            {
                                method: 'POST',

                                headers: {
                                    'Content-Type':
                                        'application/json'
                                },

                                body: JSON.stringify({

                                    className:
                                        bkClassName
                                            ? bkClassName.value
                                            : ''

                                })

                            }
                        );


                    if (!response.ok) {

                        throw new Error(
                            'Booking failed'
                        );

                    }


                    if (bkSuccessMsg) {

                        bkSuccessMsg.style.display =
                            'block';

                    }


                } catch (error) {

                    console.error(
                        error
                    );

                    alert(
                        'Unable to complete booking. Please make sure the backend is running.'
                    );

                } finally {

                    submitBookingBtn.disabled =
                        false;

                    submitBookingBtn.textContent =
                        'Confirm Booking';

                }

            }
        );

    }


    // =========================================================
    // 16. CLASS DETAILS
    // =========================================================

    const viewDetailsBtns =
        document.querySelectorAll(
            '.view-details-btn'
        );

    const detailsModal =
        document.getElementById(
            'class-details-modal'
        );

    const detailsContent =
        document.getElementById(
            'cd-dynamic-content'
        );


    const classData = {

        beginner: {

            title:
                "Beginner's Cake Baking Class",

            desc:
                "Learn the fundamentals of cake baking, layering, frosting and decorating in a friendly hands-on session.",

            learn: [
                "Baking moist sponges",
                "Making stable buttercream",
                "Crumb coating"
            ],

            duration:
                "3 Hours",

            level:
                "Beginner",

            price:
                "₹1,499",

            seats:
                5

        },


        advanced: {

            title:
                "Advanced Fondant Masterclass",

            desc:
                "Take your skills to the next level. Master sharp edges, fondant draping, and intricate sugar floral work.",

            learn: [
                "Sharp edges with ganache",
                "Fondant draping",
                "Sugar flowers"
            ],

            duration:
                "5 Hours",

            level:
                "Advanced",

            price:
                "₹2,999",

            seats:
                3

        }

    };


    viewDetailsBtns.forEach(button => {

        button.addEventListener(
            'click',
            () => {


                const id =
                    button.getAttribute(
                        'data-class'
                    );


                const data =
                    classData[id];


                if (
                    !data ||
                    !detailsContent ||
                    !detailsModal
                ) {
                    return;
                }


                detailsContent.innerHTML = `

                    <h3>
                        ${data.title}
                    </h3>

                    <p>
                        ${data.desc}
                    </p>

                    <h5>
                        What you will learn:
                    </h5>

                    <ul>
                        ${data.learn
                            .map(
                                item =>
                                    `<li>${item}</li>`
                            )
                            .join('')}
                    </ul>

                    <p>
                        <strong>
                            Duration:
                        </strong>
                        ${data.duration}
                    </p>

                    <p>
                        <strong>
                            Level:
                        </strong>
                        ${data.level}
                    </p>

                    <p>
                        <strong>
                            Price:
                        </strong>
                        ${data.price}
                    </p>

                    <p>
                        <strong>
                            Seats Available:
                        </strong>
                        ${data.seats}
                    </p>

                    <button
                        type="button"
                        class="btn btn-primary reserve-seat-btn mt-3"
                        data-class="${data.title}">
                        Reserve Your Seat
                    </button>

                `;


                // Dynamic reserve button

                const dynamicReserveBtn =
                    detailsContent.querySelector(
                        '.reserve-seat-btn'
                    );


                if (dynamicReserveBtn) {

                    dynamicReserveBtn.addEventListener(
                        'click',
                        () => {

                            detailsModal.classList.remove(
                                'active'
                            );


                            if (bkClassName) {

                                bkClassName.value =
                                    data.title;

                            }


                            if (bookingModal) {

                                bookingModal.classList.add(
                                    'active'
                                );

                            }

                        }
                    );

                }


                detailsModal.classList.add(
                    'active'
                );

            }
        );

    });


    // =========================================================
    // 17. NEW CUSTOM BAKE BUILDER
    // =========================================================

    const summaryMap = {

        'cbb-type':
            'sum-type',

        'cbb-size':
            'sum-size',

        'cbb-flavor':
            'sum-flavor',

        'cbb-design':
            'sum-design'

    };


    Object.keys(summaryMap).forEach(gridId => {

        const grid =
            document.getElementById(
                gridId
            );


        if (!grid) {
            return;
        }


        const cards =
            grid.querySelectorAll(
                '.cb-card'
            );


        cards.forEach(card => {

            card.addEventListener(
                'click',
                () => {


                    cards.forEach(c => {

                        c.classList.remove(
                            'active'
                        );

                    });


                    card.classList.add(
                        'active'
                    );


                    const summary =
                        document.getElementById(
                            summaryMap[gridId]
                        );


                    if (summary) {

                        summary.textContent =
                            card.getAttribute(
                                'data-val'
                            ) || '-';

                    }

                }
            );

        });

    });


    // =========================================================
    // CUSTOM BUILDER TEXT INPUTS
    // =========================================================

    const msgInput =
        document.getElementById(
            'cbb-message'
        );

    if (msgInput) {

        msgInput.addEventListener(
            'input',
            event => {

                const summary =
                    document.getElementById(
                        'sum-message'
                    );

                if (summary) {

                    summary.textContent =
                        event.target.value || '-';

                }

            }
        );

    }


    const dateInput =
        document.getElementById(
            'cbb-date'
        );

    if (dateInput) {

        dateInput.addEventListener(
            'change',
            event => {

                const summary =
                    document.getElementById(
                        'sum-date'
                    );

                if (summary) {

                    summary.textContent =
                        event.target.value || '-';

                }

            }
        );

    }


    const additionalInput =
        document.getElementById(
            'cbb-additional'
        );

    if (additionalInput) {

        additionalInput.addEventListener(
            'input',
            event => {

                const summary =
                    document.getElementById(
                        'sum-additional'
                    );

                if (summary) {

                    summary.textContent =
                        event.target.value || '-';

                }

            }
        );

    }


    // =========================================================
    // 18. CUSTOM BUILDER IMAGE PREVIEW
    // =========================================================

    const imageInput =
        document.getElementById(
            'cbb-image'
        );


    if (imageInput) {

        imageInput.addEventListener(
            'change',
            function () {


                if (
                    this.files &&
                    this.files[0]
                ) {


                    const reader =
                        new FileReader();


                    reader.onload =
                        function (event) {


                            const previewContainer =
                                document.getElementById(
                                    'cbb-image-preview'
                                );


                            const previewImg =
                                document.getElementById(
                                    'cbb-preview-img'
                                );


                            if (previewImg) {

                                previewImg.src =
                                    event.target.result;

                            }


                            if (previewContainer) {

                                previewContainer.style.display =
                                    'block';

                            }

                        };


                    reader.readAsDataURL(
                        this.files[0]
                    );

                }

            }
        );

    }


    // =========================================================
    // 19. CUSTOM BUILDER SUBMIT
    // =========================================================

    const submitBuilderBtn =
        document.getElementById(
            'submit-custom-builder'
        );

    const builderSuccessMsg =
        document.getElementById(
            'cbb-success-msg'
        );


    if (submitBuilderBtn) {

        submitBuilderBtn.addEventListener(
            'click',
            async () => {


                submitBuilderBtn.disabled =
                    true;

                submitBuilderBtn.textContent =
                    'Sending...';


                try {


                    const response =
                        await fetch(
                            'http://localhost:5000/api/enquiry',
                            {
                                method: 'POST',

                                headers: {
                                    'Content-Type':
                                        'application/json'
                                },

                                body: JSON.stringify({

                                    type:
                                        'custom-bake-builder',

                                    cakeType:
                                        document.querySelector(
                                            '#cbb-type .cb-card.active'
                                        )?.getAttribute(
                                            'data-val'
                                        ) || '',

                                    size:
                                        document.querySelector(
                                            '#cbb-size .cb-card.active'
                                        )?.getAttribute(
                                            'data-val'
                                        ) || '',

                                    flavor:
                                        document.querySelector(
                                            '#cbb-flavor .cb-card.active'
                                        )?.getAttribute(
                                            'data-val'
                                        ) || '',

                                    design:
                                        document.querySelector(
                                            '#cbb-design .cb-card.active'
                                        )?.getAttribute(
                                            'data-val'
                                        ) || '',

                                    message:
                                        msgInput
                                            ? msgInput.value
                                            : '',

                                    date:
                                        dateInput
                                            ? dateInput.value
                                            : '',

                                    additional:
                                        additionalInput
                                            ? additionalInput.value
                                            : ''

                                })

                            }
                        );


                    if (!response.ok) {

                        throw new Error(
                            'Server returned ' +
                            response.status
                        );

                    }


                    if (builderSuccessMsg) {

                        builderSuccessMsg.style.display =
                            'block';

                    }


                } catch (error) {

                    console.error(
                        'Custom builder error:',
                        error
                    );

                    alert(
                        'Unable to send enquiry. Please make sure the backend server is running.'
                    );

                } finally {

                    submitBuilderBtn.disabled =
                        false;

                    submitBuilderBtn.textContent =
                        'Send Custom Enquiry';

                }

            }
        );

    }

});