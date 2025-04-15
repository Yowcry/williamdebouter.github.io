// Header scroll effect
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  header.classList.toggle('nav-scrolled', window.scrollY > 50);
});

// Get logo element
const logoImg = document.getElementById('site-logo');
const userPref = localStorage.getItem('theme');

// Utility to update logo image
function updateLogo() {
  const isDark = document.body.classList.contains('dark-mode');
  logoImg.src = isDark ? './pngs/logo-white.png' : './pngs/logo-black.png';
}

// Apply stored theme on load
if (userPref === 'dark') {
  document.body.classList.add('dark-mode');
}
updateLogo();

// Toggle dark mode when logo is clicked
logoImg.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  updateLogo();
});