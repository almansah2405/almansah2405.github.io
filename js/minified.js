// Preloader
window.addEventListener("load", () => {
  document.querySelector(".preloader").style.opacity = "0";
  setTimeout(() => {
    document.querySelector(".preloader").style.display = "none";
  }, 500);
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute("href"));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});

// Sticky nav
window.addEventListener("scroll", () => {
  document.querySelector("nav").style.padding = window.scrollY > 50 ? "10px 0" : "20px 0";
});

// Tab system
document.addEventListener("click", (e) => {
  if (e.target.matches(".tab-btn")) {
    document.querySelectorAll(".tab-btn").forEach((btn) => btn.classList.remove("active"));
    e.target.classList.add("active");
  }
});

// Lazy load images
const lazyLoad = () => {
  const lazyImages = [...document.querySelectorAll('img[loading="lazy"]')];
  if ("IntersectionObserver" in window) {
    let observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          let img = entry.target;
          img.src = img.dataset.src || img.src;
          observer.unobserve(img);
        }
      });
    });
    lazyImages.forEach((img) => observer.observe(img));
  }
};
document.addEventListener("DOMContentLoaded", lazyLoad);
