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
  })
  .catch(error => console.error('Error cargando reseñas:', error));
