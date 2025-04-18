// Handle scroll effect to toggle nav-scrolled class
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 50) {
    header.classList.add('nav-scrolled');
  } else {
    header.classList.remove('nav-scrolled');
  }
});

// Apply nav-scrolled state immediately on page load
window.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 50) {
    header.classList.add('nav-scrolled');
  } else {
    header.classList.remove('nav-scrolled');
  }
});

// Fade-in effect for content
const page = document.getElementById('page-content');
if (page) page.classList.add('fade-in');

// Smooth transition on link clicks
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