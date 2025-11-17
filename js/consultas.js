const itemsFaq = document.querySelectorAll('.accordion-item-faq');

  itemsFaq.forEach(item => {
    const header = item.querySelector('.accordion-header-faq');
    const content = item.querySelector('.accordion-content-faq');
    const icon = item.querySelector('.icon-faq');

    header.addEventListener('click', () => {
      const isOpen = content.classList.contains('open-faq');

      // Cerrar todos
      itemsFaq.forEach(i => {
        i.querySelector('.accordion-content-faq').classList.remove('open-faq');
        i.querySelector('.icon-faq').classList.replace('fa-minus','fa-plus');
      });

      // Si no estaba abierto, abrirlo
      if (!isOpen) {
        content.classList.add('open-faq');
        icon.classList.replace('fa-plus','fa-minus');
      }
    });
  });