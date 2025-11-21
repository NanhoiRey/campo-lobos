// Cargar empresas desde JSON y renderizar cards
fetch('empresas.json')
  .then(response => response.json())
  .then(data => {
    const grid = document.querySelector('.grid-empresas');
    grid.innerHTML = '';

    data.forEach(empresa => {
      const card = document.createElement('a');
      card.href = empresa.instagram;
      card.target = "_blank";
      card.classList.add('empresa-card');

      card.innerHTML = `
        <div class="logo-empresa">
          <img src="${empresa.logo}" alt="Logo ${empresa.nombre}">
        </div>
        <div class="empresa-info">
          <h3 class="empresa-nombre">${empresa.nombre}</h3>
          <p class="empresa-servicio">${empresa.servicio}</p>
        </div>
      `;

      grid.appendChild(card);
    });
  })
  .catch(error => console.error('Error cargando empresas:', error));
