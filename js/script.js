document.addEventListener("DOMContentLoaded", () => {
  const loadComponent = async (selector, file) => {
    const element = document.querySelector(selector);
    if (element) {
      const response = await fetch(file);
      const html = await response.text();
      element.innerHTML = html;

      if (selector === "#header") {
        const hamburger = element.querySelector(".hamburger i");
        const navLinks = element.querySelector(".nav-links");
        const overlay = document.querySelector(".menu-overlay");
        const navbar = element.querySelector(".navbar");

        // Toggle menú
        hamburger.addEventListener("click", () => {
          const isActive = navLinks.classList.toggle("active");
          overlay.classList.toggle("active", isActive);

          // Cambiar icono
          if (isActive) {
            hamburger.classList.remove("fa-bars");
            hamburger.classList.add("fa-times");
            document.body.style.overflow = "hidden"; // bloquear scroll
          } else {
            hamburger.classList.remove("fa-times");
            hamburger.classList.add("fa-bars");
            document.body.style.overflow = ""; // restaurar scroll
          }
        });

        // Cerrar menú al hacer clic en overlay
        overlay.addEventListener("click", () => {
          navLinks.classList.remove("active");
          overlay.classList.remove("active");
          hamburger.classList.remove("fa-times");
          hamburger.classList.add("fa-bars");
          document.body.style.overflow = "";
        });

        // Scroll effect en desktop
        window.addEventListener("scroll", () => {
          if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
          } else {
            navbar.classList.remove("scrolled");
          }
        });
      }
    }
  };

  loadComponent("#header", "components/header.html");
  loadComponent("#footer", "components/footer.html");

  // Slider logic
  let current = 0;
  const changeSlide = () => {
    const slides = document.querySelectorAll(".hero-slider .slide");
    if (slides.length > 0) {
      slides.forEach((slide, index) => {
        slide.classList.toggle("active", index === current);
      });
      current = (current + 1) % slides.length;
    }
  };

  setInterval(changeSlide, 3000);
});


// LIGHTBOX

const galleryItems = document.querySelectorAll('.gallery-item img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close');

galleryItems.forEach(img => {
  img.addEventListener('click', () => {
    lightbox.style.display = 'block';
    lightboxImg.src = img.src;
  });
});

closeBtn.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = 'none';
  }
});


// VIDEO LIGHTBOXconst playBtn = document.querySelector('.play-btn');
const videoModal = document.getElementById('video-modal');
const videoPlayer = document.getElementById('video-player');
const closeVideoBtn = document.querySelector('.close-video');

if (playBtn && videoModal && videoPlayer) {
  playBtn.addEventListener('click', () => {
    videoModal.style.display = 'block';
    document.body.style.overflow = "hidden"; // bloquear scroll detrás
    videoPlayer.play();
  });

  closeVideoBtn.addEventListener('click', () => {
    videoModal.style.display = 'none';
    document.body.style.overflow = ""; // restaurar scroll
    videoPlayer.pause();
    videoPlayer.currentTime = 0;
  });

  window.addEventListener('click', (e) => {
    if (e.target === videoModal) {
      videoModal.style.display = 'none';
      document.body.style.overflow = "";
      videoPlayer.pause();
      videoPlayer.currentTime = 0;
    }
  });
}
