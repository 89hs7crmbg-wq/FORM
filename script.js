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


/* =========================================
   LOADER
========================================= */

function finishLoader() {
  if (!loader) return;

  loader.classList.add("done");

  if (hero) {
    hero.classList.add("loaded");
  }
}

/*
  Не ждём полной загрузки всех изображений.
  GitHub Pages иногда любит напоминать,
  что интернет всё ещё существует.
*/

setTimeout(finishLoader, 1800);

window.addEventListener("load", () => {
  setTimeout(finishLoader, 300);
});


/* =========================================
   MENU
========================================= */

if (menuToggle && menu) {

  menuToggle.addEventListener("click", () => {
    menu.classList.add("open");
    document.body.classList.add("lock");
  });

}


if (menuClose && menu) {

  menuClose.addEventListener("click", () => {
    menu.classList.remove("open");
    document.body.classList.remove("lock");
  });

}


document.querySelectorAll(".menu nav a").forEach(link => {

  link.addEventListener("click", () => {

    menu.classList.remove("open");
    document.body.classList.remove("lock");

  });

});


/* =========================================
   MODAL
========================================= */

function closeModal() {

  if (!modal) return;

  modal.classList.remove("open");
  document.body.classList.remove("lock");

}


if (openModal && modal) {

  openModal.addEventListener("click", () => {

    modal.classList.add("open");
    document.body.classList.add("lock");

  });

}


if (modalClose) {
  modalClose.addEventListener("click", closeModal);
}


if (modal) {

  modal.addEventListener("click", event => {

    if (event.target === modal) {
      closeModal();
    }

  });

}


/* =========================================
   ESC
========================================= */

document.addEventListener("keydown", event => {

  if (event.key !== "Escape") return;

  if (menu) {
    menu.classList.remove("open");
  }

  closeModal();

  document.body.classList.remove("lock");

});


/* =========================================
   REVEAL ANIMATIONS
========================================= */

const revealElements = document.querySelectorAll(
  ".principle-grid, .project, .split-project, .materials-top, .material-image, .studio-content, .atmosphere-copy, .contact-main"
);


revealElements.forEach(element => {

  element.classList.add("reveal");

});


if ("IntersectionObserver" in window) {

  const revealObserver = new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        entry.target.classList.add("visible");

        revealObserver.unobserve(entry.target);

      });

    },
    {
      threshold: 0.08
    }
  );


  revealElements.forEach(element => {

    revealObserver.observe(element);

  });

} else {

  revealElements.forEach(element => {

    element.classList.add("visible");

  });

}


/* =========================================
   FLOATING CTA
========================================= */

let ctaShown = false;


function showCTA() {

  if (!floatingCta || ctaShown) return;

  try {

    if (sessionStorage.getItem("formaWebCtaClosed")) {
      return;
    }

  } catch (error) {
    // Если браузер запретил sessionStorage,
    // просто продолжаем работу сайта.
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


    /* =====================================
       IMAGE PARALLAX
    ===================================== */

    const images = document.querySelectorAll(
      ".project-image img, .split-image img, .material-image img"
    );


    const viewportHeight = window.innerHeight;


    images.forEach(image => {

      const parent = image.parentElement;

      if (!parent) return;


      const rect = parent.getBoundingClientRect();


      if (
        rect.bottom <= 0 ||
        rect.top >= viewportHeight
      ) {
        return;
      }


      const progress =
        (viewportHeight - rect.top) /
        (viewportHeight + rect.height);


      const movement =
        (progress - 0.5) * 18;


      image.style.transform =
        `scale(1.035) translateY(${movement}px)`;

    });

  },
  {
    passive: true
  }
);


/* =========================================
   CLOSE FLOATING CTA
========================================= */

if (ctaClose && floatingCta) {

  ctaClose.addEventListener("click", () => {

    floatingCta.classList.remove("show");

    try {

      sessionStorage.setItem(
        "formaWebCtaClosed",
        "true"
      );

    } catch (error) {
      // Ничего страшного.
    }

  });

}


/* =========================================
   SMOOTH NAVIGATION
========================================= */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

  anchor.addEventListener("click", event => {

    const href = anchor.getAttribute("href");

    if (!href || href === "#") return;


    const target =
      document.querySelector(href);


    if (!target) return;


    event.preventDefault();


    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  });

});
