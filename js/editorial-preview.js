"use strict";
const toggle=document.querySelector('.ep-menu-toggle');
const menu=document.querySelector('#ep-nav');
if(toggle&&menu){
 const closeMenu=()=>{toggle.setAttribute('aria-expanded','false');menu.classList.remove('ep-open');};
 toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));menu.classList.toggle('ep-open',open);});
 document.addEventListener('keydown',event=>{if(event.key==='Escape'&&toggle.getAttribute('aria-expanded')==='true'){closeMenu();toggle.focus();}});
 menu.addEventListener('click',event=>{if(event.target.closest('a'))closeMenu();});
 document.addEventListener('click',event=>{if(!event.target.closest('.ep-header'))closeMenu();});
 document.querySelectorAll('#ep-nav a').forEach(a=>{if(a.pathname.replace(/\.html$/,'').replace(/\/$/,'')===location.pathname.replace(/\.html$/,'').replace(/\/$/,''))a.setAttribute('aria-current','page');});
}
function enlargeImage(img) {
  const overlay = document.getElementById("overlay");
  const enlargedContainer = document.getElementById("enlargedContainer");
  const enlargedImg = document.getElementById("enlargedImg");

  enlargedImg.src = img.src;

  enlargedImg.setAttribute("data-enlarged",img.getAttribute("data-index"))
  enlargedImg.setAttribute("data-grid",img.closest(".image_grid").id)
  overlay.style.display = "block";
  enlargedContainer.classList.add("active");
  document.body.style.overflow = "hidden"; // Disable scrolling
  
}

function closeEnlargedImage() {
  const overlay = document.getElementById("overlay");
  const enlargedContainer = document.getElementById("enlargedContainer");

  overlay.style.display = "none";
  enlargedContainer.classList.remove("active");
  document.body.style.overflow = "auto"; // Enable scrolling
}

// A local, accessible crossfade. No vendor scripts or new cookies.
(()=>{
 const hero=document.querySelector('.ep-hero');
 if(!hero)return;
 const slides=Array.from(hero.querySelectorAll('.ep-hero-slide'));
 const controls=hero.querySelector('.ep-hero-controls');
 if(slides.length<2||!controls)return;
 const previous=controls.querySelector('[data-hero-previous]');
 const next=controls.querySelector('[data-hero-next]');
 const pause=controls.querySelector('[data-hero-pause]');
 const status=controls.querySelector('[data-hero-status]');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let current=0,paused=reduced.matches,hovered=false,timer=null;
 const sync=()=>{
  clearInterval(timer);timer=null;
  pause.textContent=paused?'Play slideshow':'Pause slideshow';
  if(!paused&&!hovered&&!hero.contains(document.activeElement)&&!document.hidden){
   timer=setInterval(()=>show(current+1,false),6500);
  }
 };
 const show=(index,manual)=>{
  current=(index+slides.length)%slides.length;
  slides.forEach((slide,i)=>{slide.classList.toggle('is-current',i===current);slide.setAttribute('aria-hidden',String(i!==current));});
  status.setAttribute('aria-live',manual?'polite':'off');
  status.textContent=`${current+1} / ${slides.length}`;
 };
 previous.addEventListener('click',()=>{paused=true;show(current-1,true);sync();});
 next.addEventListener('click',()=>{paused=true;show(current+1,true);sync();});
 pause.addEventListener('click',()=>{paused=!paused;sync();});
 hero.addEventListener('mouseenter',()=>{hovered=true;sync();});
 hero.addEventListener('mouseleave',()=>{hovered=false;sync();});
 hero.addEventListener('focusin',sync);
 hero.addEventListener('focusout',()=>setTimeout(sync,0));
 document.addEventListener('visibilitychange',sync);
 reduced.addEventListener('change',()=>{if(reduced.matches)paused=true;sync();});
 controls.hidden=false;sync();
})();
