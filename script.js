
document.addEventListener('DOMContentLoaded',()=>{
document.querySelectorAll('[data-target]').forEach(el=>{
let t=+el.dataset.target,c=0;
let i=setInterval(()=>{c+=Math.ceil(t/50);if(c>=t){c=t;clearInterval(i)};el.textContent=c+'+'},40);
});
});
