// Cargar reseñas desde JSON y renderizar carrusel
fetch('reviews.json')
  .then(response => response.json())
  .then(data => {
    const carousel = document.querySelector('.reviews-carousel');
    carousel.innerHTML = '';

    data.forEach(review => {
      const card = document.createElement('div');
      card.classList.add('card-review');

      card.innerHTML = `
        <img src="${review.avatar}" alt="${review.nombre}" class="avatar-review">
        <h4 class="review-name">${review.nombre}</h4>
        <p class="text-review">"${review.texto}"</p>
        <div class="shared-photos">
          ${review.fotos.map(foto => `<img src="${foto}" alt="Foto compartida" class="shared-img">`).join('')}
        </div>
      `;

      carousel.appendChild(card);
    });

    // Seleccionar imágenes de reseñas después de insertarlas
    const galleryItems = document.querySelectorAll('.shared-img');
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
  })
  .catch(error => console.error('Error cargando reseñas:', error));

// Carrusel con botones
// Botones carrusel
const carousel = document.querySelector('.reviews-carousel');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');

prevBtn.addEventListener('click', () => {
  carousel.scrollBy({ left: -300, behavior: 'smooth' });
});

nextBtn.addEventListener('click', () => {
  carousel.scrollBy({ left: 300, behavior: 'smooth' });
});

// Autoplay cada 5 segundos
setInterval(() => {
  carousel.scrollBy({ left: 300, behavior: 'smooth' });

  // Si llega al final, vuelve al inicio
  if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth) {
    carousel.scrollTo({ left: 0, behavior: 'smooth' });
  }
}, 9000);

