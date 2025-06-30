// Suave scroll e menu ativo
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    // Scroll suave, mas não para links externos
    const href = this.getAttribute('href');
    if (href && href.startsWith('#') && document.querySelector(href)) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// (opcional) Adicione aqui futuras interatividades, validação de formulário, etc.