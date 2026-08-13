/* =========================================================
   FORMA
   INTERACTIONS
   ========================================================= */


/* =========================================================
   MODAL
   ========================================================= */

const modal = document.getElementById("projectModal");

const openButtons = document.querySelectorAll("[data-open-modal]");
const closeButtons = document.querySelectorAll("[data-close-modal]");


function openModal() {
    if (!modal) return;

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";
}


function closeModal() {
    if (!modal) return;

    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";
}


openButtons.forEach((button) => {
    button.addEventListener("click", openModal);
});


closeButtons.forEach((button) => {
    button.addEventListener("click", closeModal);
});


/* Закрытие по Escape */

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeModal();
    }
});


/* =========================================================
   SCROLL REVEAL
   ========================================================= */

const revealElements = document.querySelectorAll(
    ".section-label, " +
    ".intro-content, " +
    ".project, " +
    ".section-heading, " +
    ".philosophy-content, " +
    ".materials-image, " +
    ".studio-layout, " +
    ".contacts-content"
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

            entry.target.classList.add("visible");

            observer.unobserve(entry.target);

        });

    },
    {
        threshold: 0.12
    }
);


revealElements.forEach((element) => {
    revealObserver.observe(element);
});


/* =========================================================
   HEADER VISIBILITY
   ========================================================= */

const header = document.querySelector(".header");

let lastScrollPosition = window.scrollY;


window.addEventListener(
    "scroll",
    () => {

        const currentScrollPosition = window.scrollY;

        if (!header) return;


        if (currentScrollPosition > lastScrollPosition && currentScrollPosition > 150) {

            header.style.transform = "translateY(-100%)";

        } else {

            header.style.transform = "translateY(0)";

        }


        lastScrollPosition = currentScrollPosition;

    },
    {
        passive: true
    }
);


/* =========================================================
   SMOOTH ANCHOR SCROLL
   ========================================================= */

const navigationLinks = document.querySelectorAll(
    'a[href^="#"]'
);


navigationLinks.forEach((link) => {

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

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


/* =========================================================
   IMAGE LOAD EFFECT
   ========================================================= */

const images = document.querySelectorAll("img");


images.forEach((image) => {

    if (image.complete) {
        image.classList.add("loaded");
        return;
    }


    image.addEventListener("load", () => {
        image.classList.add("loaded");
    });

});


/* =========================================================
   PROJECT IMAGE PARALLAX
   ========================================================= */

const projectImages = document.querySelectorAll(
    ".project-image img"
);


function updateParallax() {

    const viewportHeight = window.innerHeight;


    projectImages.forEach((image) => {

        const rect = image.getBoundingClientRect();

        if (
            rect.bottom < 0 ||
            rect.top > viewportHeight
        ) {
            return;
        }


        const center =
            rect.top + rect.height / 2;

        const distance =
            center - viewportHeight / 2;

        const movement =
            distance * -0.015;


        image.style.transform =
            `translateY(${movement}px) scale(1.02)`;

    });

}


window.addEventListener(
    "scroll",
    updateParallax,
    {
        passive: true
    }
);


/* =========================================================
   MODAL BUTTON LINK
   ========================================================= */

const modalVkButton = document.querySelector(
    ".modal-button"
);


if (modalVkButton) {

    modalVkButton.addEventListener(
        "click",
        () => {
            closeModal();
        }
    );

}


/* =========================================================
   PREVENT MODAL WINDOW CLICK FROM CLOSING
   ========================================================= */

const modalWindow = document.querySelector(
    ".modal-window"
);


if (modalWindow) {

    modalWindow.addEventListener(
        "click",
        (event) => {
            event.stopPropagation();
        }
    );

}


/* =========================================================
   INITIAL STATE
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        document.body.classList.add("page-loaded");

        updateParallax();

    }
);
