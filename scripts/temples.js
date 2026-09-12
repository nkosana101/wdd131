
const yearSpan = document.querySelector('#currentyear');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

const lastModified = document.querySelector('#lastModified');
if (lastModified) {
  lastModified.textContent = `Last Modified: ${document.lastModified}`;
}

const menuButton = document.querySelector('#menuButton');
const primaryNav = document.querySelector('#primaryNav');

if (menuButton && primaryNav) {
  menuButton.addEventListener('click', () => {
    
    const isOpen = primaryNav.classList.toggle('open');

    
    menuButton.textContent = isOpen ? '✕' : '☰';


    menuButton.setAttribute('aria-expanded', String(isOpen));
  });
}