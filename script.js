document.addEventListener("DOMContentLoaded", () => {

    /*
    ============================================
    LOADER
    ============================================
    */

    const loader = document.getElementById("loader");

    document.body.classList.add("loading");

    let loaderFinished = false;

    function finishLoader() {

        if (loaderFinished) return;

        loaderFinished = true;

        setTimeout(() => {

            loader.classList.add("is-hidden");
            document.body.classList.remove("loading");

        }, 350);
    }

    window.addEventListener("load", finishLoader);

    /*
    Fallback.
    Если какое-то изображение решит провести
    самостоятельную забастовку, сайт всё равно
    должен открыться.
    */

    setTimeout(finishLoader, 2600);


    /*
    ============================================
    CUSTOM CURSOR
    ============================================
    */

    const cursor = document.getElementById("cursor");

    if (cursor && window.matchMedia("(pointer: fine)").matches) {

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;

        let currentX = mouseX;
        let currentY = mouseY;

        window.addEventListener("mousemove", (event) => {

            mouseX = event.clientX;
            mouseY = event.clientY;

        });

        function updateCursor() {

            currentX += (mouseX - currentX) * 0.18;
            currentY += (mouseY - currentY) * 0.18;

            cursor.style.left = `${currentX}px`;
            cursor.style.top = `${currentY}px`;

            requestAnimationFrame(updateCursor);

        }

        updateCursor();


        const hoverTargets = document.querySelectorAll(
            "a, button, .project__visual, .materials__scene"
        );

        hoverTargets.forEach((element) => {

            element.addEventListener("mouseenter", () => {
                cursor.classList.add("is-hover");
            });

            element.addEventListener("mouseleave", () => {
                cursor.classList.remove("is-hover");
            });

        });

    }


    /*
    ============================================
    SMOOTH INTERNAL LINKS
    ============================================
    */

    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /*
    ============================================
    REVEAL ELEMENTS
    ============================================
    */

    const revealElements = document.querySelectorAll(
        ".project__info, .detail-text, .materials__header, .studio__content, .contact__content"
    );

    revealElements.forEach((element) => {
        element.classList.add("reveal");
    });

    const revealObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("is-visible");

                    revealObserver.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });


    /*
    ============================================
    PARALLAX
    ============================================
    */

    const parallaxImages = document.querySelectorAll(
        ".project__visual img, .detail-image img, .house-experience__image img, .materials__scene img"
    );

    function updateParallax() {

        const viewportHeight = window.innerHeight;

        parallaxImages.forEach((image) => {

            const rect = image.getBoundingClientRect();

            if (
                rect.bottom < 0 ||
                rect.top > viewportHeight
            ) {
                return;
            }

            const center = rect.top + rect.height / 2;
            const distance = center - viewportHeight / 2;

            const movement = distance * -0.025;

            image.style.transform =
                `translateY(${movement}px) scale(1.025)`;

        });

    }

    let parallaxTicking = false;

    window.addEventListener("scroll", () => {

        if (!parallaxTicking) {

            window.requestAnimationFrame(() => {

                updateParallax();

                parallaxTicking = false;

            });

            parallaxTicking = true;
        }

    }, { passive: true });


    /*
    ============================================
    MATERIAL MARKERS
    ============================================
    */

    const materialScene = document.querySelector(".materials__scene");

    if (materialScene) {

        const markers = materialScene.querySelectorAll(".material-marker");

        materialScene.addEventListener("mousemove", (event) => {

            const rect = materialScene.getBoundingClientRect();

            const x = (event.clientX - rect.left) / rect.width;
            const y = (event.clientY - rect.top) / rect.height;

            markers.forEach((marker, index) => {

                const strength = (index + 1) * 3;

                marker.style.transform =
                    `translate(${(x - .5) * strength}px, ${(y - .5) * strength}px)`;

            });

        });

        materialScene.addEventListener("mouseleave", () => {

            markers.forEach((marker) => {

                marker.style.transform = "translate(0, 0)";

            });

        });

    }


    /*
    ============================================
    POPUP
    ============================================
    */

    const popup = document.getElementById("projectPopup");
    const popupClose = document.getElementById("popupClose");

    const popupWasClosed =
        sessionStorage.getItem("formaPopupClosed") === "true";

    if (popup && !popupWasClosed) {

        setTimeout(() => {

            popup.classList.add("is-visible");

        }, 9000);

    }

    if (popupClose && popup) {

        popupClose.addEventListener("click", () => {

            popup.classList.remove("is-visible");

            sessionStorage.setItem(
                "formaPopupClosed",
                "true"
            );

        });

    }


    /*
    ============================================
    HIDE POPUP WHEN CONTACT IS VISIBLE
    ============================================
    */

    const contactSection = document.querySelector(".contact");

    if (contactSection && popup) {

        const contactObserver = new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        popup.classList.remove("is-visible");

                    }

                });

            },
            {
                threshold: 0.25
            }
        );

        contactObserver.observe(contactSection);

    }


    /*
    ============================================
    INITIAL PARALLAX
    ============================================
    */

    updateParallax();

});
