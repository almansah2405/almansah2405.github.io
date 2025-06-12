// Modify your script.js to use defer
document.addEventListener("DOMContentLoaded", function () {
  // Initial critical functionality
  const preloader = document.querySelector(".preloader");
  if (preloader) {
    preloader.classList.add("fade-out");
    setTimeout(() => {
      preloader.style.display = "none";
    }, 500);
  }
});

// Load non-critical JS after page load
window.addEventListener("load", function () {
  // Mobile navigation
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.querySelector(".nav-links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      this.classList.toggle("active");
      navLinks.classList.toggle("active");
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", function () {
        navToggle.classList.remove("active");
        navLinks.classList.remove("active");
      });
    });
  }

  // Sticky Navigation on Scroll
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const navbarHeight = navbar.offsetHeight;
        const targetPosition = targetElement.offsetTop - navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Active Navigation Link on Scroll
  const sections = document.querySelectorAll("section");
  window.addEventListener("scroll", function () {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      const navbarHeight = navbar.offsetHeight;

      if (window.scrollY >= sectionTop - navbarHeight - 50) {
        current = section.getAttribute("id");
      }
    });

    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  // Back to Top Button
  const backToTop = document.getElementById("backToTop");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      backToTop.classList.add("active");
    } else {
      backToTop.classList.remove("active");
    }
  });

  // Tab System in About Section
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const tabId = this.getAttribute("data-tab");

      tabBtns.forEach((btn) => btn.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));

      this.classList.add("active");
      document.getElementById(`${tabId}-tab`).classList.add("active");
    });
  });

  // Animate Progress Bars when they come into view
  const progressBars = document.querySelectorAll(".progress-bar");

  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return rect.top <= (window.innerHeight || document.documentElement.clientHeight) && rect.bottom >= 0;
  }

  function animateProgressBars() {
    progressBars.forEach((bar) => {
      const percent = bar.getAttribute("data-percent");
      if (isElementInViewport(bar) && !bar.classList.contains("animated")) {
        bar.style.width = percent;
        bar.classList.add("animated");
      }
    });
  }

  window.addEventListener("scroll", animateProgressBars);
  animateProgressBars();

  // Current Year in Footer
  document.getElementById("year").textContent = new Date().getFullYear();

  // Form Submission
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const subject = document.getElementById("subject").value;
      const message = document.getElementById("message").value;

      alert(`Thank you, ${name}! Your message has been received. I'll get back to you soon.`);
      contactForm.reset();
    });
  }

  // Newsletter Form Submission
  const newsletterForm = document.querySelector(".newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = this.querySelector("input").value;
      alert(`Thank you for subscribing with ${email}!`);
      this.reset();
    });
  }

  // Animate elements on scroll
  const animateOnScroll = function () {
    const elements = document.querySelectorAll(".hero-content, .about-content, .skills-grid, .portfolio-grid, .timeline-item, .contact-container");

    elements.forEach((element) => {
      if (isElementInViewport(element)) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });
  };

  document.querySelectorAll(".hero-content, .about-content, .skills-grid, .portfolio-grid, .timeline-item, .contact-container").forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  });

  window.addEventListener("scroll", animateOnScroll);
  animateOnScroll();
});
