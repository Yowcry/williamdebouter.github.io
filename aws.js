// Header scroll effect
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  header.classList.toggle('nav-scrolled', window.scrollY > 50);
});

// Theme toggle logic
const toggle = document.getElementById('theme-toggle');
const logoImg = document.getElementById('site-logo');
const userPref = localStorage.getItem('theme');

// Utility to update the logo based on theme
function updateLogo() {
  const isDark = document.body.classList.contains('dark-mode');
  logoImg.src = isDark ? './pngs/logo-white.png' : './pngs/logo-black.png';
}

// Apply stored theme on load
if (userPref === 'dark') {
  document.body.classList.add('dark-mode');
}
updateLogo();

// Toggle theme on click
toggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  updateLogo();
});
