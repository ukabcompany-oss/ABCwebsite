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
