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
/* Cinta: misma velocidad en cualquier pantalla (~121 px/s, como el prototipo) */
(function(){
  var V=121;
  function ajustar(){var v=window.innerWidth<=640?V*1.6:V;document.querySelectorAll('.pista').forEach(function(p){var d=p.scrollWidth/2; if(d>0) p.style.animationDuration=(d/v).toFixed(2)+'s';});}
  ajustar(); window.addEventListener('resize',ajustar); if(document.fonts&&document.fonts.ready) document.fonts.ready.then(ajustar);
})();
/* Diagnóstico temporal: nuriaperez.me/?cinta */
(function(){
  if(location.search.indexOf('cinta')<0) return;
  var box=document.createElement('div');
  box.style.cssText='position:fixed;left:8px;bottom:8px;z-index:9999;background:#000;color:#0f0;font:12px/1.4 monospace;padding:8px;border-radius:6px;max-width:90vw';
  document.body.appendChild(box);
  var p=document.querySelector('.pista'); var last=null,lx=null,frames=0,t0=performance.now(),speed=0;
  function tick(t){frames++; var m=new DOMMatrixReadOnly(getComputedStyle(p).transform); if(last!==null){var dt=(t-last)/1000; if(dt>0){var v=Math.abs(m.m41-lx)/dt; if(v<5000) speed=speed*0.9+v*0.1;}} last=t; lx=m.m41;
    if(t-t0>500){var c=getComputedStyle(p); box.textContent='ancho '+innerWidth+'px · dpr '+devicePixelRatio+' · pista '+p.scrollWidth+'px · dur '+c.animationDuration+' · anim '+c.animationName+' · '+Math.round(frames*1000/(t-t0))+' fps · '+Math.round(speed)+' px/s · reducedMotion '+matchMedia('(prefers-reduced-motion: reduce)').matches; frames=0;t0=t;}
    requestAnimationFrame(tick);}
  requestAnimationFrame(tick);
})();
