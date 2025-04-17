// Header scroll effect
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  header.classList.toggle('nav-scrolled', window.scrollY > 50);
});

// Page fade-in on load
const page = document.getElementById('page-content');
if (page) page.classList.add('fade-in');

// Smooth page transition on internal link clicks
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
