const loader = document.getElementById("loader");
const hero = document.querySelector(".hero");

const menu = document.getElementById("menu");
const menuToggle = document.getElementById("menuToggle");
const menuClose = document.getElementById("menuClose");

const modal = document.getElementById("modal");
const openModal = document.getElementById("openModal");
const modalClose = document.getElementById("modalClose");

const floatingCta = document.getElementById("floatingCta");
const ctaClose = document.getElementById("ctaClose");


/* LOADER */

window.addEventListener("load", () => {

  setTimeout(() => {

    loader.classList.add("done");

    hero.classList.add("loaded");

  }, 1500);

});


/* MENU */

menuToggle.addEventListener("click", () => {

  menu.classList.add("open");

  document.body.classList.add("lock");

});


menuClose.addEventListener("click", () => {

  menu.classList.remove("open");

  document.body.classList.remove("lock");

});


document.querySelectorAll(".menu nav a").forEach(link => {

  link.addEventListener("click", () => {

    menu.classList.remove("open");

    document.body.classList.remove("lock");

  });

});


/* MODAL */

function closeModal() {

  modal.classList.remove("open");

  document.body.classList.remove("lock");

}


openModal.addEventListener("click", () => {

  modal.classList.add("open");

  document.body.classList.add("lock");

});


modalClose.addEventListener("click", closeModal);


modal.addEventListener("click", event => {

  if (event.target === modal) {
    closeModal();
  }

});


/* ESC */

document.addEventListener("keydown", event => {

  if (event.key === "Escape") {

    menu.classList.remove("open");

    closeModal();

    document.body.classList.remove("lock");

  }

});


/* REVEAL */

const revealElements = document.querySelectorAll(
  ".principle-grid, .project, .split-project, .materials-top, .material-image, .studio-content, .atmosphere-copy, .contact-main"
);

revealElements.forEach(element => {

  element.classList.add("reveal");

});


const revealObserver = new IntersectionObserver(
  entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.classList.add("visible");

        revealObserver.unobserve(entry.target);

      }

    });

  },
  {
    threshold: 0.12
  }
);


revealElements.forEach(element => {

  revealObserver.observe(element);

});


/* FLOATING CTA */

let ctaShown = false;

function showCTA() {

  if (ctaShown) return;

  if (sessionStorage.getItem("formaWebCtaClosed")) {
    return;
  }

  if (window.scrollY < window.innerHeight * 0.65) {
    return;
  }

  floatingCta.classList.add("show");

  ctaShown = true;

}


setTimeout(showCTA, 9000);


window.addEventListener(
  "scroll",
  () => {

    if (window.scrollY > window.innerHeight * 0.65) {
      showCTA();
    }

    /* IMAGE PARALLAX */

    const images = document.querySelectorAll(
      ".project-image img, .split-image img, .material-image img"
    );

    const viewportHeight = window.innerHeight;

    images.forEach(image => {

      const parent = image.parentElement;

      const rect = parent.getBoundingClientRect();

      if (
        rect.bottom > 0 &&
        rect.top < viewportHeight
      ) {

        const progress =
          (viewportHeight - rect.top) /
          (viewportHeight + rect.height);

        const movement =
          (progress - 0.5) * 22;

        image.style.transform =
          `scale(1.035) translateY(${movement}px)`;

      }

    });

  },
  {
    passive: true
  }
);


ctaClose.addEventListener("click", () => {

  floatingCta.classList.remove("show");

  sessionStorage.setItem(
    "formaWebCtaClosed",
    "true"
  );

});


/* SMOOTH NAVIGATION */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

  anchor.addEventListener("click", event => {

    const target =
      document.querySelector(
        anchor.getAttribute("href")
      );

    if (!target) return;

    event.preventDefault();

    target.scrollIntoView({
      behavior: "smooth"
    });

  });

});
