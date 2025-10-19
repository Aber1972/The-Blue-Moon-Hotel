/* ===========================
   Blue Moon - scripts.js
   =========================== */

// ========== NAVBAR SCROLL SHADOW ==========
const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// ========== DARK MODE TOGGLE ==========
const body = document.body;
const darkToggle = document.createElement("button");
darkToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
darkToggle.className = "btn btn-gold position-fixed bottom-0 end-0 m-4 shadow";
darkToggle.style.zIndex = "2000";
document.body.appendChild(darkToggle);

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark-mode");
}

darkToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  if (body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
    darkToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
  } else {
    localStorage.setItem("theme", "light");
    darkToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
  }
});

// ========== GALLERY LIGHTBOX ==========
const galleryImages = document.querySelectorAll(".gallery-thumb");
const lightbox = document.createElement("div");
lightbox.id = "lightbox";
document.body.appendChild(lightbox);

lightbox.style.display = "none";
lightbox.style.position = "fixed";
lightbox.style.top = "0";
lightbox.style.left = "0";
lightbox.style.width = "100%";
lightbox.style.height = "100%";
lightbox.style.background = "rgba(0,0,0,0.85)";
lightbox.style.justifyContent = "center";
lightbox.style.alignItems = "center";
lightbox.style.zIndex = "3000";

const lightboxImg = document.createElement("img");
lightboxImg.style.maxWidth = "80%";
lightboxImg.style.maxHeight = "80%";
lightboxImg.style.borderRadius = "12px";
lightboxImg.style.boxShadow = "0 0 40px rgba(0,0,0,0.7)";
lightbox.appendChild(lightboxImg);

galleryImages.forEach((img) => {
  img.addEventListener("click", () => {
    lightboxImg.src = img.src;
    lightbox.style.display = "flex";
  });
});

lightbox.addEventListener("click", () => {
  lightbox.style.display = "none";
});

// ========== SCROLL ANIMATION ==========
const animatedElements = document.querySelectorAll(".animate-on-scroll");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animated");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

animatedElements.forEach((el) => observer.observe(el));

// ========== SEARCH BAR ==========
function handleHeaderSearch() {
  const input = document.getElementById("headerSearch").value.toLowerCase();
  const sections = document.querySelectorAll("section, header, footer");
  let found = false;

  sections.forEach((section) => {
    if (section.innerText.toLowerCase().includes(input)) {
      section.scrollIntoView({ behavior: "smooth", block: "center" });
      section.classList.add("highlight");
      setTimeout(() => section.classList.remove("highlight"), 2000);
      found = true;
    }
  });

  if (!found) alert("No results found for: " + input);
}

// ========== SCROLL TO TOP BUTTON ==========
const scrollBtn = document.createElement("button");
scrollBtn.className =
  "btn btn-outline-gold position-fixed bottom-0 start-0 m-4 shadow";
scrollBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
scrollBtn.style.display = "none";
scrollBtn.style.zIndex = "2000";
document.body.appendChild(scrollBtn);

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollBtn.style.display = "block";
  } else {
    scrollBtn.style.display = "none";
  }
});

scrollBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ========== BOOTSTRAP CAROUSEL CUSTOM CONTROL ==========
const carousels = document.querySelectorAll(".carousel");
carousels.forEach((c) => {
  c.addEventListener("mouseenter", () => {
    const bsCarousel = bootstrap.Carousel.getInstance(c);
    if (bsCarousel) bsCarousel.pause();
  });
  c.addEventListener("mouseleave", () => {
    const bsCarousel = bootstrap.Carousel.getInstance(c);
    if (bsCarousel) bsCarousel.cycle();
  });
});

// ========== DOM EFFECTS ==========
document.addEventListener("DOMContentLoaded", () => {
  console.log("Blue Moon website loaded ✅");
});

document.addEventListener("DOMContentLoaded", function () {
  const loginBtn = document.getElementById("loginBtn");
  const loginModal = document.getElementById("loginModal");
  const closeBtn = document.querySelector(".close-btn");

  // باز شدن پنجره لاگین
  loginBtn.addEventListener("click", function (e) {
    e.preventDefault();
    loginModal.style.display = "flex";
  });

  // بستن با دکمه ×
  closeBtn.addEventListener("click", function () {
    loginModal.style.display = "none";
  });

  // بستن با کلیک بیرون از فرم
  loginModal.addEventListener("click", function (e) {
    if (e.target === loginModal) loginModal.style.display = "none";
  });
});
const loginBtn = document.querySelector(".login-btn");
const toggler = document.querySelector(".navbar-toggler");

// بررسی وقتی روی همبرگری کلیک می‌شود
toggler.addEventListener("click", () => {
  loginBtn.classList.toggle("move-down");
});

//  بخشششش ریویرویشن
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("reservationForm");
  const modal = document.getElementById("bookingModal");

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // جلوگیری از ارسال واقعی فرم

    // نمایش پنجره
    modal.style.display = "flex";

    // بعد 5 ثانیه پنجره ناپدید بشه و به صفحه هوم بره
    setTimeout(() => {
      modal.style.animation = "fadeOut 0.3s ease forwards";
      setTimeout(() => {
        modal.style.display = "none";
        window.location.href = "index.html"; // هدایت به صفحه هوم
      }, 300); // همزمان با مدت fadeOut
    }, 5000);
  });
});

// ddddddddd

let clickCount = 0;
const logo = document.querySelector("img[alt='Blue Moon logo']");
const vipOverlay = document.getElementById("vipOverlay");

if (logo) {
  logo.addEventListener("click", () => {
    clickCount++;
    if (clickCount === 3) {
      activateVIP();
      clickCount = 0;
    }
    setTimeout(() => (clickCount = 0), 2000); // اگه فاصله زیاد شد ریست کن
  });
}

function activateVIP() {
  document.body.classList.add("vip-mode");
  vipOverlay.style.display = "flex";

  setTimeout(() => {
    vipOverlay.style.opacity = "0";
    setTimeout(() => {
      vipOverlay.style.display = "none";
      vipOverlay.style.opacity = "1";
    }, 1000);
  }, 5000);
}
// 💫 کرسر نئونی با دنباله طلایی
document.addEventListener("mousemove", (e) => {
  let cursor = document.querySelector(".neon-cursor");
  if (!cursor) {
    cursor = document.createElement("div");
    cursor.className = "neon-cursor";
    document.body.appendChild(cursor);
  }

  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";

  const trail = document.createElement("div");
  trail.className = "trail";
  trail.style.left = e.clientX + "px";
  trail.style.top = e.clientY + "px";
  document.body.appendChild(trail);

  setTimeout(() => trail.remove(), 800);
});
