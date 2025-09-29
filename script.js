/* === Scroll suave para âncoras internas existentes === */
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const h = a.getAttribute('href');
    if (h && h.startsWith('#') && document.querySelector(h)) {
      e.preventDefault();
      document.querySelector(h).scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* === Timeline: image map responsivo + highlight === */
(() => {
  'use strict';
  const box  = document.querySelector('.timeline-box');
  const img  = document.getElementById('timelineImg');
  const map  = document.getElementById('timeline-map');
  const hi   = document.getElementById('mapHighlight');
  if (!box || !img || !map || !hi) return; // página sem timeline

  const areas = Array.from(map.querySelectorAll('area'));

  function applyCoords(){
    // Usa dimensões renderizadas (responsivo)
    const w = img.clientWidth, h = img.clientHeight;
    if (!w || !h) return;

    areas.forEach(a=>{
      const p = (a.dataset.rectPercent || '').split(',').map(n=>parseFloat(n.trim()));
      if (p.length !== 4 || p.some(isNaN)) return;
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
    // posiciona relativo ao container .timeline-box
    const left = img.offsetLeft + x1;
    const top  = img.offsetTop  + y1;
    hi.style.left   = left + 'px';
    hi.style.top    = top  + 'px';
    hi.style.width  = (x2 - x1) + 'px';
    hi.style.height = (y2 - y1) + 'px';
    hi.classList.add('on');
  }
  function hideHighlight(){ hi.classList.remove('on'); }

  // Eventos (hover/teclado)
  areas.forEach(a=>{
    a.addEventListener('mouseenter', ()=>showHighlight(a));
    a.addEventListener('mouseleave', hideHighlight);
    a.addEventListener('focus',      ()=>showHighlight(a));
    a.addEventListener('blur',       hideHighlight);
    if (!a.hasAttribute('tabindex')) a.setAttribute('tabindex','0'); // acessível via teclado
  });

  // Recalcular em redimensionamentos e quando a imagem carregar
  const recalcular = () => { applyCoords(); hideHighlight(); };
  if (img.complete) recalcular();          // se veio do cache
  img.addEventListener('load', recalcular);
  window.addEventListener('resize', recalcular);
  new ResizeObserver(recalcular).observe(box);
})();
