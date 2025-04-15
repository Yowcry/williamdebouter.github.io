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

// Page fade-in on load
const page = document.getElementById('page-content');
if (page) page.classList.add('fade-in');

// Intercept internal link clicks for smooth page transitions
document.querySelectorAll('a[href]').forEach(link => {
  const isInternal = link.hostname === window.location.hostname;
  const isAnchor = link.hash && link.pathname === window.location.pathname;

  if (isInternal && !isAnchor) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      page.classList.remove('fade-in');
      page.classList.add('fade-out');
      setTimeout(() => {
        window.location.href = this.href;
      }, 300);
    });
  }
});