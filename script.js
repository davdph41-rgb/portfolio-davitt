const hamburgerBtn = document.getElementById("hamburgerBtn");
const navMenu = document.getElementById("navMenu");
const header = document.getElementById("header");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section[id]");
const revealElements = document.querySelectorAll(
  ".reveal-up, .reveal-left, .reveal-right, .reveal-zoom"
);
const scrollProgress = document.getElementById("scrollProgress");
const preloader = document.getElementById("preloader");
const cursorGlow = document.querySelector(".cursor-glow");

/* ================= PRELOADER ================= */
window.addEventListener("load", () => {
  setTimeout(() => {
    preloader.classList.add("hide");
  }, 700);
});

/* ================= HAMBURGER MENU ================= */
if (hamburgerBtn && navMenu) {
  hamburgerBtn.addEventListener("click", () => {
    hamburgerBtn.classList.toggle("active");
    navMenu.classList.toggle("show");
  });

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      hamburgerBtn.classList.remove("active");
      navMenu.classList.remove("show");
    });
  });

  document.addEventListener("click", (e) => {
    const clickInsideMenu = navMenu.contains(e.target);
    const clickOnButton = hamburgerBtn.contains(e.target);

    if (!clickInsideMenu && !clickOnButton) {
      navMenu.classList.remove("show");
      hamburgerBtn.classList.remove("active");
    }
  });
}

/* ================= HEADER + ACTIVE NAV + PROGRESS ================= */
function handleScrollEffects() {
  // header shadow
  if (window.scrollY > 20) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  // active nav
  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 140;
    const sectionHeight = section.offsetHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });

  // scroll progress
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  scrollProgress.style.width = `${progress}%`;
}

window.addEventListener("scroll", handleScrollEffects);
window.addEventListener("load", handleScrollEffects);

/* ================= REVEAL ================= */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("reveal", "show");
    }
  });
}, {
  threshold: 0.15
});

revealElements.forEach(el => observer.observe(el));

/* ================= CURSOR GLOW ================= */
if (cursorGlow && window.innerWidth > 768) {
  window.addEventListener("mousemove", (e) => {
    cursorGlow.style.left = `${e.clientX}px`;
    cursorGlow.style.top = `${e.clientY}px`;
  });
}

/* ================= TILT EFFECT ================= */
const tiltCards = document.querySelectorAll(".tilt-card, .portfolio-card");

tiltCards.forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

/* ================= MAGNETIC BUTTON EFFECT ================= */
const magneticButtons = document.querySelectorAll(".magnetic");

magneticButtons.forEach(btn => {
  btn.addEventListener("mousemove", (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    btn.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
  });

  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "";
  });
});