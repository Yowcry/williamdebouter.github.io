// Header scroll effect
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  header.classList.toggle('nav-scrolled', window.scrollY > 50);
  updateLogo(); // Re-evaluate logo on scroll
});

// Logo & theme logic
const logoImg = document.getElementById('site-logo');
const userPref = localStorage.getItem('theme');

// Update logo depending on dark mode and nav scroll
function updateLogo() {
  const isDark = document.body.classList.contains('dark-mode');
  const isScrolled = document.querySelector('header').classList.contains('nav-scrolled');

  // Use white logo if dark mode or scrolled on dark bg
  if (isDark && !isScrolled) {
    logoImg.src = './pngs/logo-white.png';
  } else {
    logoImg.src = './pngs/logo-black.png';
  }
}

// Load stored theme
if (userPref === 'dark') {
  document.body.classList.add('dark-mode');
}
updateLogo();

// Toggle dark mode by clicking the logo
logoImg.addEventListener('click', (e) => {
  e.preventDefault(); // prevent navigating if it's a link
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  updateLogo();
});

// Fade-in content
const page = document.getElementById('page-content');
if (page) page.classList.add('fade-in');

// Smooth transition on link click
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
