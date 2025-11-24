// Cargar reseñas desde JSON y renderizar carrusel
fetch('reviews.json')
  .then(response => response.json())
  .then(data => {
    const carousel = document.querySelector('.reviews-carousel');
    carousel.innerHTML = '';

    const maxLength = 150; // número de caracteres visibles por defecto

    data.forEach(review => {
      const card = document.createElement('div');
      card.classList.add('card-review');

      const fullText = review.texto.trim();
      let shortText = fullText;
      let needsToggle = false;

      if (fullText.length > maxLength) {
        shortText = fullText.substring(0, maxLength) + '...';
        needsToggle = true;
      }

      card.innerHTML = `
        <img src="${review.avatar}" alt="${review.nombre}" class="avatar-review">
        <h4 class="review-name">${review.nombre}</h4>
        <p class="text-review">${shortText}</p>
        ${needsToggle ? '<button class="toggle-review">Leer más</button>' : ''}
        <div class="shared-photos">
          ${review.fotos.map(foto => `<img src="${foto}" alt="Foto compartida" class="shared-img">`).join('')}
        </div>
        
      `;

      // Añadir lógica de toggle si es necesario
      if (needsToggle) {
        const btn = card.querySelector('.toggle-review');
        const textEl = card.querySelector('.text-review');

        btn.addEventListener('click', () => {
          if (card.classList.contains('expanded')) {
            textEl.textContent = shortText;
            btn.textContent = 'Leer más';
            card.classList.remove('expanded');
          } else {
            textEl.textContent = fullText;
            btn.textContent = 'Leer menos';
            card.classList.add('expanded');
          }
        });
      }

      carousel.appendChild(card);
    });

    // Lightbox para fotos compartidas
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
const carousel = document.querySelector('.reviews-carousel');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');

prevBtn.addEventListener('click', () => {
  carousel.scrollBy({ left: -300, behavior: 'smooth' });
});

nextBtn.addEventListener('click', () => {
  carousel.scrollBy({ left: 300, behavior: 'smooth' });
});

// Autoplay cada 9 segundos
setInterval(() => {
  carousel.scrollBy({ left: 300, behavior: 'smooth' });

  if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth) {
    carousel.scrollTo({ left: 0, behavior: 'smooth' });
  }
}, 11000);
