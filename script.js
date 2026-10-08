document.addEventListener("DOMContentLoaded", function () {

    console.log("The Sugar Lounge JavaScript loaded successfully.");

    // =========================================================
    // 1. MOBILE MENU
    // =========================================================

    const mobileBtn = document.getElementById("mobile-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    const mobileLinks = document.querySelectorAll(".mobile-link");

    if (mobileBtn && mobileMenu) {

        mobileBtn.addEventListener("click", function () {

            mobileMenu.classList.toggle("active");

            const icon = mobileMenu.classList.contains("active")
                ? "fa-xmark"
                : "fa-bars";

            mobileBtn.innerHTML =
                `<i class="fa-solid ${icon}"></i>`;

        });
    }

    mobileLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            if (mobileMenu) {
                mobileMenu.classList.remove("active");
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

    const navbar = document.getElementById("navbar");

    if (navbar) {

        window.addEventListener("scroll", function () {

            if (window.scrollY > 50) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }

        });

    }


    // =========================================================
    // 3. SCROLL ANIMATION
    // =========================================================

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.1,
                rootMargin: "0px 0px -50px 0px"
            }
        );

        const animateElements =
            document.querySelectorAll(
                "section, .product-card, .offer-card, .class-card"
            );

        animateElements.forEach(function (element) {

            element.classList.add("fade-up");

            observer.observe(element);

        });

    }


    // =========================================================
    // 4. MODALS
    // =========================================================

    const enquiryModal =
        document.getElementById("enquiry-modal");

    const customCakeModal =
        document.getElementById("custom-cake-modal");

    const closeModals =
        document.querySelectorAll(".close-modal");


    // ---------------------------------------------------------
    // PRODUCT ENQUIRY MODAL
    // ---------------------------------------------------------

    document.querySelectorAll(".enquire-btn").forEach(function (button) {

        button.addEventListener("click", function () {

            const productName =
                button.getAttribute("data-product");

            const productInput =
                document.getElementById("enq-product-name");

            if (productInput) {
                productInput.value = productName || "";
            }

            if (enquiryModal) {
                enquiryModal.classList.add("active");
            }

        });

    });


    // ---------------------------------------------------------
    // CUSTOM CAKE MODAL
    // ---------------------------------------------------------

    document.querySelectorAll(".open-custom-form")
        .forEach(function (button) {

            button.addEventListener("click", function () {

                if (customCakeModal) {
                    customCakeModal.classList.add("active");
                }

                if (button.classList.contains("tag")) {

                    const occasion =
                        button.textContent.trim();

                    const select =
                        document.getElementById("cc-occasion");

                    if (select) {

                        for (let i = 0;
                            i < select.options.length;
                            i++) {

                            if (
                                select.options[i].text.trim() ===
                                occasion
                            ) {

                                select.selectedIndex = i;
                                break;

                            }

                        }

                    }

                }

            });

        });


    // ---------------------------------------------------------
    // CLOSE MODALS
    // ---------------------------------------------------------

    closeModals.forEach(function (button) {

        button.addEventListener("click", function () {

            if (enquiryModal) {
                enquiryModal.classList.remove("active");
            }

            if (customCakeModal) {
                customCakeModal.classList.remove("active");
            }

        });

    });


    // ---------------------------------------------------------
    // CLICK OUTSIDE MODAL
    // ---------------------------------------------------------

    window.addEventListener("click", function (event) {

        if (
            enquiryModal &&
            event.target === enquiryModal
        ) {
            enquiryModal.classList.remove("active");
        }

        if (
            customCakeModal &&
            event.target === customCakeModal
        ) {
            customCakeModal.classList.remove("active");
        }

    });


    // =========================================================
    // 5. PRODUCT ENQUIRY QUANTITY
    // =========================================================

    const qtyTypeSelect =
        document.getElementById("enq-qty-type");

    const piecesWrapper =
        document.getElementById("enq-pieces-wrapper");

    const weightWrapper =
        document.getElementById("enq-weight-wrapper");

    if (qtyTypeSelect) {

        qtyTypeSelect.addEventListener("change", function () {

            if (this.value === "pieces") {

                if (piecesWrapper) {
                    piecesWrapper.classList.remove("hidden");
                }

                if (weightWrapper) {
                    weightWrapper.classList.add("hidden");
                }

            } else {

                if (piecesWrapper) {
                    piecesWrapper.classList.add("hidden");
                }

                if (weightWrapper) {
                    weightWrapper.classList.remove("hidden");
                }

            }

        });

    }


    // =========================================================
    // 6. CUSTOM CAKE FORM
    // =========================================================

    const customForm =
        document.getElementById("custom-cake-form");

    if (customForm) {

        customForm.addEventListener("submit", function (event) {

            event.preventDefault();

            customForm.style.display = "none";

            const successMessage =
                document.getElementById("cc-success-msg");

            if (successMessage) {
                successMessage.classList.remove("hidden");
            }

            setTimeout(function () {

                if (customCakeModal) {
                    customCakeModal.classList.remove("active");
                }

                setTimeout(function () {

                    customForm.style.display = "block";

                    if (successMessage) {
                        successMessage.classList.add("hidden");
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
        document.getElementById("product-enquiry-form");

    if (enquiryForm) {

        enquiryForm.addEventListener("submit", function (event) {

            event.preventDefault();

            alert(
                "Thank you! Your enquiry has been received."
            );

            if (enquiryModal) {
                enquiryModal.classList.remove("active");
            }

            enquiryForm.reset();

        });

    }


    // =========================================================
    // 8. CART SYSTEM
    // =========================================================

    const cartBtn =
        document.querySelector(".cart-btn");

    const cartDrawer =
        document.getElementById("cart-drawer");

    const closeCart =
        document.querySelector(".close-cart");

    const cartOverlay =
        document.querySelector(".cart-overlay");

    const cartCount =
        document.querySelector(".cart-count");

    const cartContainer =
        document.getElementById("cart-items-container");

    const cartTotalDisplay =
        document.getElementById("cart-total-price");


    // ---------------------------------------------------------
    // LOAD CART
    // ---------------------------------------------------------

    let cart = [];

    try {

        const savedCart =
            localStorage.getItem("sugarLoungeCart");

        if (savedCart) {

            const parsedCart =
                JSON.parse(savedCart);

            if (Array.isArray(parsedCart)) {
                cart = parsedCart;
            }

        }

    } catch (error) {

        console.error(
            "Unable to load cart:",
            error
        );

        cart = [];

    }


    // ---------------------------------------------------------
    // SAVE CART
    // ---------------------------------------------------------

    function saveCart() {

        try {

            localStorage.setItem(
                "sugarLoungeCart",
                JSON.stringify(cart)
            );

        } catch (error) {

            console.error(
                "Unable to save cart:",
                error
            );

        }

    }


    // ---------------------------------------------------------
    // OPEN / CLOSE CART
    // ---------------------------------------------------------

    function toggleCart(show) {

        if (cartDrawer) {

            if (show) {
                cartDrawer.classList.add("active");
            } else {
                cartDrawer.classList.remove("active");
            }

        }

        if (cartOverlay) {

            if (show) {
                cartOverlay.classList.add("active");
            } else {
                cartOverlay.classList.remove("active");
            }

        }

    }


    // Cart button

    if (cartBtn) {

        cartBtn.addEventListener("click", function (event) {

            event.preventDefault();

            updateCartUI();

            toggleCart(true);

        });

    }


    // Close button

    if (closeCart) {

        closeCart.addEventListener("click", function () {

            toggleCart(false);

        });

    }


    // Overlay

    if (cartOverlay) {

        cartOverlay.addEventListener("click", function () {

            toggleCart(false);

        });

    }


    // =========================================================
    // 9. ADD TO CART
    // =========================================================
    // IMPORTANT:
    // THERE IS ONLY ONE ADD-TO-CART EVENT LISTENER.
    // =========================================================

    document.addEventListener("click", function (event) {

        const button =
            event.target.closest(".add-cart-btn");

        if (!button) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();


        const product =
            button.getAttribute("data-product");

        const priceText =
            button.getAttribute("data-price");

        const price =
            parseFloat(priceText);


        // Check product

        if (!product) {

            console.error(
                "Add to Cart Error: data-product is missing."
            );

            alert(
                "Product information is missing."
            );

            return;

        }


        // Check price

        if (isNaN(price)) {

            console.error(
                "Add to Cart Error: Invalid data-price:",
                priceText
            );

            alert(
                "Product price is invalid."
            );

            return;

        }


        // Add product

        addToCart(product, price);


        // Open cart

        toggleCart(true);


        console.log(
            "Added to cart:",
            product,
            price
        );

    });


    // =========================================================
    // 10. ADD ITEM TO CART
    // =========================================================

    function addToCart(name, price) {

        const existingItem =
            cart.find(function (item) {

                return item.name === name;

            });


        if (existingItem) {

            existingItem.qty =
                Number(existingItem.qty) + 1;

        } else {

            cart.push({

                name: name,

                price: Number(price),

                qty: 1

            });

        }


        saveCart();

        updateCartUI();

    }


    // =========================================================
    // 11. UPDATE QUANTITY
    // =========================================================

    window.updateQty = function (index, change) {

        if (!cart[index]) {
            return;
        }


        cart[index].qty =
            Number(cart[index].qty) + Number(change);


        if (cart[index].qty <= 0) {

            cart.splice(index, 1);

        }


        saveCart();

        updateCartUI();

    };


    // =========================================================
    // 12. REMOVE ITEM
    // =========================================================

    window.removeItem = function (index) {

        if (!cart[index]) {
            return;
        }


        cart.splice(index, 1);

        saveCart();

        updateCartUI();

    };


    // =========================================================
    // 13. ESCAPE HTML
    // =========================================================

    function escapeHtml(text) {

        const div =
            document.createElement("div");

        div.textContent =
            String(text);

        return div.innerHTML;

    }


    // =========================================================
    // 14. UPDATE CART UI
    // =========================================================

    function updateCartUI() {

        if (!cartContainer) {
            return;
        }


        cartContainer.innerHTML = "";


        let total = 0;
        let count = 0;


        // Empty cart

        if (cart.length === 0) {

            cartContainer.innerHTML =
                `
                <p class="empty-cart-msg">
                    Your cart is empty.
                </p>
                `;

        } else {

            cart.forEach(function (item, index) {

                const itemPrice =
                    Number(item.price) || 0;

                const itemQty =
                    Number(item.qty) || 1;


                total +=
                    itemPrice * itemQty;

                count +=
                    itemQty;


                const itemElement =
                    document.createElement("div");

                itemElement.className =
                    "cart-item";


                itemElement.innerHTML =
                    `
                    <div class="cart-item-info">

                        <h4>
                            ${escapeHtml(item.name)}
                        </h4>

                        <span class="cart-item-price">
                            ₹${itemPrice.toFixed(2)}
                            × ${itemQty}
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
                            ${itemQty}
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


                cartContainer.appendChild(
                    itemElement
                );

            });

        }


        // Cart count

        if (cartCount) {

            cartCount.textContent =
                count;

        }


        // Cart total

        if (cartTotalDisplay) {

            cartTotalDisplay.textContent =
                `₹${total.toFixed(2)}`;

        }


        // If your cart button itself displays ₹0

        if (
            cartBtn &&
            !cartCount
        ) {

            cartBtn.innerHTML =
                `
                <i class="fa-solid fa-cart-shopping"></i>
                ₹${total.toFixed(0)}
                `;

        }

    }


    // Initial cart

    updateCartUI();


    // =========================================================
    // 15. CART SEND ENQUIRY
    // =========================================================

    const submitCartBtn =
        document.getElementById(
            "submit-cart-enquiry"
        );

    const cartMsg =
        document.getElementById(
            "cart-msg"
        );


    if (submitCartBtn) {

        submitCartBtn.addEventListener(
            "click",
            async function () {

                // Empty cart

                if (cart.length === 0) {

                    if (cartMsg) {

                        cartMsg.style.display =
                            "block";

                        cartMsg.style.color =
                            "red";

                        cartMsg.textContent =
                            "Your cart is empty.";

                    }

                    return;

                }


                submitCartBtn.disabled =
                    true;

                submitCartBtn.textContent =
                    "SENDING...";


                const total =
                    cart.reduce(
                        function (sum, item) {

                            return sum +
                                (
                                    Number(item.price) *
                                    Number(item.qty)
                                );

                        },
                        0
                    );


                try {

                    /*
                     * IMPORTANT:
                     *
                     * This URL works only when your backend
                     * is running on your computer.
                     *
                     * GitHub Pages cannot access localhost.
                     */

                    const response =
                        await fetch(
                            "http://localhost:5000/api/enquiry",
                            {
                                method: "POST",

                                headers: {
                                    "Content-Type":
                                        "application/json"
                                },

                                body: JSON.stringify({

                                    items: cart,

                                    total: total

                                })

                            }
                        );


                    if (!response.ok) {

                        throw new Error(
                            "Server returned " +
                            response.status
                        );

                    }


                    if (cartMsg) {

                        cartMsg.style.display =
                            "block";

                        cartMsg.style.color =
                            "green";

                        cartMsg.textContent =
                            "Your enquiry has been sent successfully!";

                    }


                    cart = [];

                    saveCart();

                    updateCartUI();


                } catch (error) {

                    console.error(
                        "Cart enquiry error:",
                        error
                    );


                    if (cartMsg) {

                        cartMsg.style.display =
                            "block";

                        cartMsg.style.color =
                            "red";

                        cartMsg.textContent =
                            "Cart is working, but the enquiry server is not connected.";

                    }

                } finally {

                    submitCartBtn.disabled =
                        false;

                    submitCartBtn.textContent =
                        "CONTINUE / SEND ENQUIRY";

                }

            }
        );

    }


    // =========================================================
    // 16. TESTIMONIAL SLIDER
    // =========================================================

    const slides =
        document.querySelectorAll(
            ".testimonial-slide"
        );

    const prevBtn =
        document.getElementById(
            "prev-testi"
        );

    const nextBtn =
        document.getElementById(
            "next-testi"
        );

    let currentSlide = 0;

    let autoSlideInterval = null;


    function showSlide(index) {

        slides.forEach(function (slide) {

            slide.classList.remove("active");

        });


        if (slides[index]) {

            slides[index].classList.add("active");

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

        if (slides.length <= 1) {
            return;
        }

        autoSlideInterval =
            setInterval(
                nextSlide,
                5000
            );

    }


    function resetAutoSlide() {

        if (autoSlideInterval) {

            clearInterval(
                autoSlideInterval
            );

        }

        startAutoSlide();

    }


    if (slides.length > 0) {

        showSlide(0);


        if (nextBtn) {

            nextBtn.addEventListener(
                "click",
                function () {

                    nextSlide();

                    resetAutoSlide();

                }
            );

        }


        if (prevBtn) {

            prevBtn.addEventListener(
                "click",
                function () {

                    prevSlide();

                    resetAutoSlide();

                }
            );

        }


        startAutoSlide();

    }


    // =========================================================
    // 17. GALLERY FILTER
    // =========================================================

    const filterBtns =
        document.querySelectorAll(
            ".filter-btn"
        );

    const galleryItems =
        document.querySelectorAll(
            ".gallery-item"
        );


    filterBtns.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                filterBtns.forEach(
                    function (btn) {

                        btn.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                const filter =
                    button.getAttribute(
                        "data-filter"
                    );


                galleryItems.forEach(
                    function (item) {

                        const category =
                            item.getAttribute(
                                "data-category"
                            );


                        if (
                            filter === "all" ||
                            category === filter
                        ) {

                            item.style.display =
                                "block";

                            setTimeout(
                                function () {

                                    item.style.opacity =
                                        "1";

                                },
                                50
                            );

                        } else {

                            item.style.opacity =
                                "0";

                            setTimeout(
                                function () {

                                    item.style.display =
                                        "none";

                                },
                                300
                            );

                        }

                    }
                );

            }
        );

    });


    // =========================================================
    // 18. GALLERY LIGHTBOX
    // =========================================================

    const lightbox =
        document.getElementById(
            "lightbox"
        );

    const lightboxImg =
        document.getElementById(
            "lightbox-img"
        );

    const closeLightbox =
        document.querySelector(
            ".close-lightbox"
        );


    galleryItems.forEach(function (item) {

        item.addEventListener(
            "click",
            function () {

                const image =
                    item.querySelector("img");


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
                    "active"
                );

            }
        );

    });


    if (closeLightbox) {

        closeLightbox.addEventListener(
            "click",
            function () {

                if (lightbox) {

                    lightbox.classList.remove(
                        "active"
                    );

                }

            }
        );

    }


    if (lightbox) {

        lightbox.addEventListener(
            "click",
            function (event) {

                if (
                    event.target !==
                    lightboxImg
                ) {

                    lightbox.classList.remove(
                        "active"
                    );

                }

            }
        );

    }


    // =========================================================
    // 19. OLD CUSTOM BAKE FORM
    // =========================================================

    const cbForm =
        document.getElementById(
            "new-custom-bake-form"
        );


    if (cbForm) {

        const fields = [
            "type",
            "size",
            "flavor",
            "design",
            "message",
            "date",
            "additional"
        ];


        fields.forEach(function (field) {

            const element =
                document.getElementById(
                    "cb-" + field
                );

            const preview =
                document.getElementById(
                    "prev-" + field
                );


            if (
                element &&
                preview
            ) {

                element.addEventListener(
                    "input",
                    function () {

                        preview.textContent =
                            element.value || "-";

                    }
                );

            }

        });


        const submitCbBtn =
            document.getElementById(
                "submit-custom-enquiry"
            );

        const cbSuccessMsg =
            document.getElementById(
                "cb-success-msg"
            );


        if (submitCbBtn) {

            submitCbBtn.addEventListener(
                "click",
                function () {

                    let valid = true;


                    [
                        "type",
                        "size",
                        "flavor",
                        "design",
                        "date"
                    ].forEach(
                        function (field) {

                            const element =
                                document.getElementById(
                                    "cb-" + field
                                );


                            if (
                                element &&
                                !element.value
                            ) {

                                valid = false;

                                element.style.borderColor =
                                    "red";

                            } else if (element) {

                                element.style.borderColor =
                                    "";

                            }

                        }
                    );


                    if (!valid) {

                        alert(
                            "Please fill all required fields."
                        );

                        return;

                    }


                    if (cbSuccessMsg) {

                        cbSuccessMsg.style.display =
                            "block";

                        cbSuccessMsg.textContent =
                            "Thank you! Your custom bake request has been received.";

                    }

                }
            );

        }

    }


    // =========================================================
    // 20. BAKING CLASS RESERVE BUTTON
    // =========================================================

    const reserveSeatBtns =
        document.querySelectorAll(
            ".reserve-seat-btn"
        );

    const bookingModal =
        document.getElementById(
            "class-booking-modal"
        );

    const bkClassName =
        document.getElementById(
            "bk-class-name"
        );


    reserveSeatBtns.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const className =
                    button.getAttribute(
                        "data-class"
                    );


                if (bkClassName) {

                    bkClassName.value =
                        className || "";

                }


                if (bookingModal) {

                    bookingModal.classList.add(
                        "active"
                    );

                }

            }
        );

    });


    // =========================================================
    // 21. BOOKING SUBMIT
    // =========================================================

    const submitBookingBtn =
        document.getElementById(
            "submit-booking-btn"
        );

    const bkSuccessMsg =
        document.getElementById(
            "bk-success-msg"
        );


    if (submitBookingBtn) {

        submitBookingBtn.addEventListener(
            "click",
            function () {

                const className =
                    bkClassName
                        ? bkClassName.value
                        : "";


                if (!className) {

                    alert(
                        "Please select a baking class."
                    );

                    return;

                }


                /*
                 * For GitHub/deployed version:
                 * show success message locally.
                 *
                 * Your actual backend can be connected later.
                 */

                if (bkSuccessMsg) {

                    bkSuccessMsg.style.display =
                        "block";

                    bkSuccessMsg.style.color =
                        "green";

                    bkSuccessMsg.textContent =
                        "Your seat request has been received!";

                }


                setTimeout(function () {

                    if (bookingModal) {

                        bookingModal.classList.remove(
                            "active"
                        );

                    }

                }, 2000);

            }
        );

    }


    // =========================================================
    // 22. CLASS DETAILS
    // =========================================================

    const viewDetailsBtns =
        document.querySelectorAll(
            ".view-details-btn"
        );

    const detailsModal =
        document.getElementById(
            "class-details-modal"
        );

    const detailsContent =
        document.getElementById(
            "cd-dynamic-content"
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
                "Take your skills to the next level. Master sharp edges, fondant draping and intricate sugar floral work.",

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


    viewDetailsBtns.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const id =
                    button.getAttribute(
                        "data-class"
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


                detailsContent.innerHTML =
                    `
                    <h3>
                        ${escapeHtml(data.title)}
                    </h3>

                    <p>
                        ${escapeHtml(data.desc)}
                    </p>

                    <h5>
                        What you will learn:
                    </h5>

                    <ul>
                        ${
                            data.learn
                                .map(function (item) {

                                    return `
                                        <li>
                                            ${escapeHtml(item)}
                                        </li>
                                    `;

                                })
                                .join("")
                        }
                    </ul>

                    <p>
                        <strong>Duration:</strong>
                        ${escapeHtml(data.duration)}
                    </p>

                    <p>
                        <strong>Level:</strong>
                        ${escapeHtml(data.level)}
                    </p>

                    <p>
                        <strong>Price:</strong>
                        ${escapeHtml(data.price)}
                    </p>

                    <p>
                        <strong>Seats Available:</strong>
                        ${data.seats}
                    </p>

                    <button
                        type="button"
                        class="btn btn-primary reserve-seat-btn dynamic-reserve-btn"
                        data-class="${escapeHtml(data.title)}">

                        Reserve Your Seat

                    </button>
                    `;


                const dynamicReserveBtn =
                    detailsContent.querySelector(
                        ".dynamic-reserve-btn"
                    );


                if (dynamicReserveBtn) {

                    dynamicReserveBtn.addEventListener(
                        "click",
                        function () {

                            detailsModal.classList.remove(
                                "active"
                            );


                            if (bkClassName) {

                                bkClassName.value =
                                    data.title;

                            }


                            if (bookingModal) {

                                bookingModal.classList.add(
                                    "active"
                                );

                            }

                        }
                    );

                }


                detailsModal.classList.add(
                    "active"
                );

            }
        );

    });


    // =========================================================
    // 23. NEW CUSTOM BAKE BUILDER
    // =========================================================

    const summaryMap = {

        "cbb-type":
            "sum-type",

        "cbb-size":
            "sum-size",

        "cbb-flavor":
            "sum-flavor",

        "cbb-design":
            "sum-design"

    };


    Object.keys(summaryMap).forEach(
        function (gridId) {

            const grid =
                document.getElementById(
                    gridId
                );


            if (!grid) {
                return;
            }


            const cards =
                grid.querySelectorAll(
                    ".cb-card"
                );


            cards.forEach(function (card) {

                card.addEventListener(
                    "click",
                    function () {

                        cards.forEach(
                            function (c) {

                                c.classList.remove(
                                    "active"
                                );

                            }
                        );


                        card.classList.add(
                            "active"
                        );


                        const summary =
                            document.getElementById(
                                summaryMap[gridId]
                            );


                        if (summary) {

                            summary.textContent =
                                card.getAttribute(
                                    "data-val"
                                ) || "-";

                        }

                    }
                );

            });

        }
    );


    // =========================================================
    // 24. CUSTOM BUILDER MESSAGE
    // =========================================================

    const msgInput =
        document.getElementById(
            "cbb-message"
        );

    if (msgInput) {

        msgInput.addEventListener(
            "input",
            function (event) {

                const summary =
                    document.getElementById(
                        "sum-message"
                    );

                if (summary) {

                    summary.textContent =
                        event.target.value || "-";

                }

            }
        );

    }


    // =========================================================
    // 25. CUSTOM BUILDER DATE
    // =========================================================

    const dateInput =
        document.getElementById(
            "cbb-date"
        );

    if (dateInput) {

        dateInput.addEventListener(
            "change",
            function (event) {

                const summary =
                    document.getElementById(
                        "sum-date"
                    );

                if (summary) {

                    summary.textContent =
                        event.target.value || "-";

                }

            }
        );

    }


    // =========================================================
    // 26. CUSTOM BUILDER ADDITIONAL NOTES
    // =========================================================

    const additionalInput =
        document.getElementById(
            "cbb-additional"
        );

    if (additionalInput) {

        additionalInput.addEventListener(
            "input",
            function (event) {

                const summary =
                    document.getElementById(
                        "sum-additional"
                    );

                if (summary) {

                    summary.textContent =
                        event.target.value || "-";

                }

            }
        );

    }


    // =========================================================
    // 27. CUSTOM BUILDER IMAGE PREVIEW
    // =========================================================

    const imageInput =
        document.getElementById(
            "cbb-image"
        );


    if (imageInput) {

        imageInput.addEventListener(
            "change",
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
                                    "cbb-image-preview"
                                );

                            const previewImg =
                                document.getElementById(
                                    "cbb-preview-img"
                                );


                            if (previewImg) {

                                previewImg.src =
                                    event.target.result;

                            }


                            if (previewContainer) {

                                previewContainer.style.display =
                                    "block";

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
    // 28. CUSTOM BUILDER SUBMIT
    // =========================================================

    const submitBuilderBtn =
        document.getElementById(
            "submit-custom-builder"
        );

    const builderSuccessMsg =
        document.getElementById(
            "cbb-success-msg"
        );


    if (submitBuilderBtn) {

        submitBuilderBtn.addEventListener(
            "click",
            function () {

                const type =
                    document.querySelector(
                        "#cbb-type .cb-card.active"
                    );

                const size =
                    document.querySelector(
                        "#cbb-size .cb-card.active"
                    );

                const flavor =
                    document.querySelector(
                        "#cbb-flavor .cb-card.active"
                    );

                const design =
                    document.querySelector(
                        "#cbb-design .cb-card.active"
                    );


                if (
                    !type ||
                    !size ||
                    !flavor ||
                    !design
                ) {

                    alert(
                        "Please select all required cake options."
                    );

                    return;

                }


                if (builderSuccessMsg) {

                    builderSuccessMsg.style.display =
                        "block";

                    builderSuccessMsg.style.color =
                        "green";

                    builderSuccessMsg.textContent =
                        "Your custom cake request has been received!";

                }

            }
        );

    }


    // =========================================================
    // 29. ESC KEY
    // =========================================================

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                if (cartDrawer) {
                    cartDrawer.classList.remove("active");
                }

                if (cartOverlay) {
                    cartOverlay.classList.remove("active");
                }

                if (lightbox) {
                    lightbox.classList.remove("active");
                }

                if (enquiryModal) {
                    enquiryModal.classList.remove("active");
                }

                if (customCakeModal) {
                    customCakeModal.classList.remove("active");
                }

                if (bookingModal) {
                    bookingModal.classList.remove("active");
                }

                if (detailsModal) {
                    detailsModal.classList.remove("active");
                }

            }

        }
    );


    // =========================================================
    // 30. FINAL CHECK
    // =========================================================

    console.log(
        "The Sugar Lounge: All JavaScript features initialized."
    );

    console.log(
        "Cart items:",
        cart
    );

});
