'use strict';
document.querySelectorAll('[data-width]').forEach(button=>button.addEventListener('click',()=>{document.querySelector('iframe').style.width=button.dataset.width+'px';document.querySelectorAll('[data-width]').forEach(other=>other.setAttribute('aria-pressed',String(other===button)));}));
