document.documentElement.classList.add('js');
(function(){
  var els=document.querySelectorAll('.reveal');
  if(!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('in')});return;}
  var io=new IntersectionObserver(function(entries){entries.forEach(function(en){if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target);}})},{rootMargin:'0px 0px -8% 0px',threshold:0.05});
  els.forEach(function(e,i){ if(e.getBoundingClientRect().top<window.innerHeight) e.classList.add('in'); else io.observe(e);});
})();
/* Crítica: las estrellas se pintan de amarillo al pasar el ratón (en móvil, al aparecer en pantalla) */
(function(){
  var ps=[].filter.call(document.querySelectorAll('p'),function(p){return p.textContent.trim()==='★★★★★'});
  ps.forEach(function(p){
    p.classList.add('stars'); p.setAttribute('aria-label','5 de 5 estrellas');
    p.innerHTML=Array(6).join('<span aria-hidden="true">★</span>');
    p.parentElement.classList.add('critica');
  });
  if(!window.matchMedia('(hover: none)').matches) return;
  /* En móvil: la tarjeta más cercana al centro de la pantalla crece y pinta sus estrellas */
  var cards=ps.map(function(p){return p.parentElement}), pend=false;
  function marcar(){pend=false; var c=innerHeight/2, best=null, bd=1e9;
    cards.forEach(function(k){var r=k.getBoundingClientRect(); if(r.bottom<0||r.top>innerHeight) return; var d=Math.abs((r.top+r.bottom)/2-c); if(d<bd){bd=d;best=k;}});
    cards.forEach(function(k){k.classList.toggle('activa',k===best && bd<innerHeight*0.35)});}
  window.addEventListener('scroll',function(){if(!pend){pend=true;requestAnimationFrame(marcar)}},{passive:true}); marcar();
})();
/* Cinta: misma velocidad en cualquier pantalla (~121 px/s, como el prototipo) */
(function(){
  var V=121;
  function ajustar(){var v=V;document.querySelectorAll('.pista').forEach(function(p){var d=p.scrollWidth/2; if(d>0) p.style.animationDuration=(d/v).toFixed(2)+'s';});}
  ajustar(); window.addEventListener('resize',ajustar); if(document.fonts&&document.fonts.ready) document.fonts.ready.then(ajustar);
})();
/* Móvil: la tarjeta en foco se levanta como en el hover de escritorio */
(function(){
  if(!window.matchMedia('(hover: none)').matches) return;
  var vert=[].slice.call(document.querySelectorAll('#casos .row>.card, .p-reclutador .card.row'));
  var pend=false;
  function v(){pend=false; var c=innerHeight/2,best=null,bd=1e9;
    vert.forEach(function(k){var r=k.getBoundingClientRect(); if(r.bottom<0||r.top>innerHeight) return; var d=Math.abs((r.top+r.bottom)/2-c); if(d<bd){bd=d;best=k;}});
    vert.forEach(function(k){k.classList.toggle('foco',k===best&&bd<innerHeight*0.4)});}
  if(vert.length){window.addEventListener('scroll',function(){if(!pend){pend=true;requestAnimationFrame(v)}},{passive:true}); v();}
  [].forEach.call(document.querySelectorAll('#extras .row, #sobre-mi .row'),function(row){
    var items=[].slice.call(row.children), pp=false;
    function h(){pp=false; var L=row.getBoundingClientRect().left,best=null,bd=1e9;
      items.forEach(function(k){var d=Math.abs(k.getBoundingClientRect().left-L); if(d<bd){bd=d;best=k;}});
      items.forEach(function(k){k.classList.toggle('foco',k===best)});}
    row.addEventListener('scroll',function(){if(!pp){pp=true;requestAnimationFrame(h)}},{passive:true}); h();
  });
})();
