document.documentElement.classList.add('js');
(function(){
  var els=document.querySelectorAll('.reveal');
  if(!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('in')});return;}
  var io=new IntersectionObserver(function(entries){entries.forEach(function(en){if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target);}})},{rootMargin:'0px 0px -8% 0px',threshold:0.05});
  els.forEach(function(e,i){ if(e.getBoundingClientRect().top<window.innerHeight) e.classList.add('in'); else io.observe(e);});
})();
