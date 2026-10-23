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
  if(!window.matchMedia('(hover: none)').matches||!('IntersectionObserver' in window)) return;
  var io=new IntersectionObserver(function(es){es.forEach(function(e){e.target.classList.toggle('vista',e.isIntersecting)})},{threshold:0.7});
  ps.forEach(function(p){io.observe(p.parentElement)});
})();
