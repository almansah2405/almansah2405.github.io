document.addEventListener("DOMContentLoaded", function () {
  /*=============== PRELOADER ===============*/
  const preloader = document.querySelector(".preloader");
  window.addEventListener("load", () => {
    preloader.classList.add("loaded");
  });

  /*=============== STICKY HEADER & ACTIVE NAV LINK ===============*/
  const nav = document.getElementById("navbar");
  const navLinks = document.querySelectorAll(".nav-links a");
  const sections = document.querySelectorAll("section[id]");

  function scrollHeader() {
    if (window.scrollY >= 50) {
      nav.classList.add("sticky");
    } else {
      nav.classList.remove("sticky");
    }
  }

  function highlightNav() {
    let scrollY = window.pageYOffset;
    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 150;
      const sectionId = current.getAttribute("id");
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document.querySelectorAll(".nav-links a").forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", () => {
    scrollHeader();
    highlightNav();
  });

  /*=============== MOBILE NAV MENU (REVISED) ===============*/
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.querySelector(".nav-links");

  if (navToggle) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("show-menu");
      // Optional: Change icon from bars to X
      const icon = navToggle.querySelector("i");
      if (icon.classList.contains("fa-bars")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-times");
      } else {
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }
    });
  }

  // Close menu when a link is clicked
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("show-menu");
      // Reset icon back to bars
      const icon = navToggle.querySelector("i");
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    });
  });

  /*=============== ABOUT TABS & PROGRESS BARS ===============*/
  function animateProgressBars(container) {
    const skillItems = container.querySelectorAll(".skill-item, .language-item");
    skillItems.forEach((item) => {
      const percent = item.dataset.percent;
      const progressBarFill = item.querySelector(".progress-fill");
      if (progressBarFill) {
        progressBarFill.style.width = percent;
      }
    });
  }

  const tabs = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((item) => item.classList.remove("active"));
      tabContents.forEach((content) => {
        content.classList.remove("active");
        content.querySelectorAll(".progress-fill").forEach((fill) => (fill.style.width = "0%"));
      });
      tab.classList.add("active");
      const targetContent = document.getElementById(tab.dataset.tab + "-tab");
      if (targetContent) {
        targetContent.classList.add("active");
        animateProgressBars(targetContent);
      }
    });
  });

  /*=============== REVEAL ON SCROLL ===============*/
  const revealElements = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          if (entry.target.id === "about") {
            const initialActiveTab = entry.target.querySelector(".tab-content.active");
            if (initialActiveTab) {
              animateProgressBars(initialActiveTab);
            }
          }
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  revealElements.forEach((el) => {
    revealObserver.observe(el);
  });

  /*=============== OTHER SCRIPTS (PORTFOLIO, FOOTER, ETC) ===============*/
  // (Your existing correct JS for these sections goes here)
  const modal = document.getElementById("portfolioModal");
  // ... and so on
});
