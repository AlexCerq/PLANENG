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

<script>
/* Image map responsivo + highlight de hover */
(function () {
  const img = document.getElementById('timelineImg');
  const areas = Array.from(document.querySelectorAll('#timeline-map area'));
  const hi   = document.getElementById('mapHighlight');

  function naturalSize(el){
    if (el.naturalWidth && el.naturalHeight) return [el.naturalWidth, el.naturalHeight];
    // fallback (caso muito raro)
    const i = new Image(); i.src = el.src;
    return [i.width||2000, i.height||1414];
  }

  function applyCoords(){
    const [natW, natH] = naturalSize(img);
    const rect = img.getBoundingClientRect();
    const w = rect.width, h = rect.height;

    areas.forEach(a=>{
      const p = (a.dataset.rectPercent||'').split(',').map(n=>parseFloat(n.trim()));
      if (p.length!==4 || p.some(isNaN)) return;
      const [px,py,pw,ph] = p;
      const x1 = Math.round((px/100)*w);
      const y1 = Math.round((py/100)*h);
      const x2 = Math.round(((px+pw)/100)*w);
      const y2 = Math.round(((py+ph)/100)*h);
      a.coords = [x1,y1,x2,y2].join(',');
    });
  }

  function showHighlight(a){
    if (!a.coords) return;
    const [x1,y1,x2,y2] = a.coords.split(',').map(n=>parseInt(n,10));
    const imgRect = img.getBoundingClientRect();
    // posiciona relativo ao .timeline-box
    const parent = img.parentElement.getBoundingClientRect();
    hi.style.left   = (x1 + imgRect.left - parent.left) + 'px';
    hi.style.top    = (y1 + imgRect.top  - parent.top ) + 'px';
    hi.style.width  = (x2 - x1) + 'px';
    hi.style.height = (y2 - y1) + 'px';
    hi.classList.add('on');
  }
  function hideHighlight(){ hi.classList.remove('on'); }

  // eventos
  areas.forEach(a=>{
    a.addEventListener('mouseenter', ()=>showHighlight(a));
    a.addEventListener('mouseleave', hideHighlight);
    a.addEventListener('focus',      ()=>showHighlight(a));
    a.addEventListener('blur',       hideHighlight);
  });

  // recalcula quando necessário
  function recalcular(){
    applyCoords();
    hideHighlight();
  }
  window.addEventListener('load', recalcular);
  window.addEventListener('resize', recalcular);
  new ResizeObserver(recalcular).observe(document.body);
})();
</script>


// (opcional) Adicione aqui futuras interatividades, validação de formulário, etc.
