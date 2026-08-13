/* =========================================
   FORMA
   Main interaction system
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    document.body.classList.add("is-loading");


    /* =========================================
       LOADER
    ========================================= */

    const loader = document.getElementById("loader");

    let loaderFinished = false;

    function finishLoader() {

        if (loaderFinished || !loader) {
            return;
        }

        loaderFinished = true;

        loader.classList.add("is-hidden");
        document.body.classList.remove("is-loading");

        window.setTimeout(() => {
            if (loader && loader.parentNode) {
                loader.remove();
            }
        }, 900);
    }

    /*
     * Loader намеренно не зависит от window.load.
     * Изображения сайта могут грузиться сколько угодно,
     * но экран загрузки заканчивается самостоятельно.
     */

    window.setTimeout(finishLoader, 2300);


    /* =========================================
       CUSTOM CURSOR
    ========================================= */

    const cursor = document.getElementById("cursor");

    if (cursor && window.matchMedia("(pointer: fine)").matches) {

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;

        let currentX = mouseX;
        let currentY = mouseY;

        window.addEventListener("mousemove", (event) => {

            mouseX = event.clientX;
            mouseY = event.clientY;

        }, { passive: true });


        function renderCursor() {

            currentX += (mouseX - currentX) * 0.18;
            currentY += (mouseY - currentY) * 0.18;

            cursor.style.left = `${currentX}px`;
            cursor.style.top = `${currentY}px`;

            requestAnimationFrame(renderCursor);
        }

        renderCursor();


        const interactiveElements = document.querySelectorAll(
            "a, button, .material-point"
        );

        interactiveElements.forEach((element) => {

            element.addEventListener("mouseenter", () => {
                cursor.classList.add("is-hover");
            });

            element.addEventListener("mouseleave", () => {
                cursor.classList.remove("is-hover");
            });

        });
    }


    /* =========================================
       INTERNAL LINKS
    ========================================= */

    const internalLinks = document.querySelectorAll(
        'a[href^="#"]'
    );

    internalLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            const headerOffset = 70;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerOffset;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =========================================
       PARALLAX
    ========================================= */

    const parallaxImages = document.querySelectorAll(
        ".parallax-image"
    );

    let ticking = false;

    function updateParallax() {

        const viewportHeight = window.innerHeight;

        parallaxImages.forEach((image) => {

            const rect = image.getBoundingClientRect();

            if (
                rect.bottom < -100 ||
                rect.top > viewportHeight + 100
            ) {
                return;
            }

            const center =
                rect.top + rect.height / 2;

            const distance =
                (center - viewportHeight / 2) /
                viewportHeight;

            const offset =
                distance * -28;

            image.style.transform =
                `translate3d(0, ${offset}px, 0)`;

        });

        ticking = false;
    }

    function requestParallax() {

        if (!ticking) {

            requestAnimationFrame(updateParallax);

            ticking = true;
        }
    }

    if (
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {

        window.addEventListener(
            "scroll",
            requestParallax,
            { passive: true }
        );

        window.addEventListener(
            "resize",
            requestParallax,
            { passive: true }
        );

        requestParallax();
    }


    /* =========================================
       REVEAL SYSTEM
    ========================================= */

    const revealElements = document.querySelectorAll(
        ".manifesto__main, " +
        ".projects-intro__content, " +
        ".project__statement, " +
        ".project__details, " +
        ".house-grid__text, " +
        ".house-interior__caption, " +
        ".house-yard__caption, " +
        ".residence__intro, " +
        ".materials__heading, " +
        ".studio__content, " +
        ".contact__main"
    );

    revealElements.forEach((element) => {
        element.classList.add("reveal");
    });


    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add("is-visible");

                observer.unobserve(entry.target);

            });

        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -5% 0px"
        }
    );


    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });


    /* =========================================
       TRANSITIONS
    ========================================= */

    const transitionSections =
        document.querySelectorAll(".transition");

    const transitionObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add("is-visible");

                    observer.unobserve(entry.target);

                });

            },
            {
                threshold: 0.25
            }
        );


    transitionSections.forEach((section) => {
        transitionObserver.observe(section);
    });


    /* =========================================
       MATERIAL INTERACTION
    ========================================= */

    const materialPoints =
        document.querySelectorAll(".material-point");

    materialPoints.forEach((point) => {

        const button =
            point.querySelector("button");

        if (!button) {
            return;
        }

        button.addEventListener("click", (event) => {

            event.stopPropagation();

            const alreadyActive =
                point.classList.contains("is-active");

            materialPoints.forEach((otherPoint) => {
                otherPoint.classList.remove("is-active");
            });

            if (!alreadyActive) {
                point.classList.add("is-active");
            }

        });

    });


    document.addEventListener("click", () => {

        materialPoints.forEach((point) => {
            point.classList.remove("is-active");
        });

    });


    /* =========================================
       POPUP
    ========================================= */

    const popup =
        document.getElementById("projectPopup");

    const popupClose =
        document.getElementById("popupClose");

    const popupStorageKey =
        "forma_project_popup_closed";


    function showPopup() {

        if (!popup) {
            return;
        }

        if (
            sessionStorage.getItem(popupStorageKey) === "true"
        ) {
            return;
        }

        popup.classList.add("is-visible");
    }


    function hidePopup() {

        if (!popup) {
            return;
        }

        popup.classList.remove("is-visible");

        sessionStorage.setItem(
            popupStorageKey,
            "true"
        );
    }


    if (popupClose) {

        popupClose.addEventListener(
            "click",
            hidePopup
        );

    }


    window.setTimeout(() => {

        if (
            sessionStorage.getItem(
                popupStorageKey
            ) !== "true"
        ) {
            showPopup();
        }

    }, 9000);


    /* =========================================
       HIDE POPUP NEAR CONTACT
    ========================================= */

    const contact =
        document.getElementById("contact");

    if (contact && popup) {

        const popupObserver =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach((entry) => {

                        if (entry.isIntersecting) {
                            popup.classList.remove(
                                "is-visible"
                            );
                        }

                    });

                },
                {
                    threshold: 0.2
                }
            );

        popupObserver.observe(contact);
    }


    /* =========================================
       IMAGE LOAD SAFETY
    ========================================= */

    const images =
        document.querySelectorAll("img");

    images.forEach((image) => {

        image.addEventListener(
            "error",
            () => {

                image.classList.add(
                    "image-load-error"
                );

            },
            { once: true }
        );

    });


    /* =========================================
       RESIZE STATE
    ========================================= */

    let resizeTimer;

    window.addEventListener(
        "resize",
        () => {

            clearTimeout(resizeTimer);

            resizeTimer = setTimeout(() => {

                requestParallax();

            }, 150);

        },
        { passive: true }
    );

});
