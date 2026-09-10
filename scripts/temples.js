// ============================================================
//  temples.js – Footer dates + responsive hamburger navigation
// ============================================================

// ---------- Footer: current year & last modified ----------
const yearSpan = document.querySelector('#currentyear');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

const lastModified = document.querySelector('#lastModified');
if (lastModified) {
  lastModified.textContent = `Last Modified: ${document.lastModified}`;
}

// ---------- Responsive hamburger menu ----------
const menuButton = document.querySelector('#menuButton');
const primaryNav = document.querySelector('#primaryNav');

if (menuButton && primaryNav) {
  menuButton.addEventListener('click', () => {
    // Toggle the nav's visibility
    const isOpen = primaryNav.classList.toggle('open');

    // Swap the icon: ☰ when closed, ✕ when open
    menuButton.textContent = isOpen ? '✕' : '☰';

    // Update ARIA state for screen readers
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });
}