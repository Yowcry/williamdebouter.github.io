document.addEventListener('DOMContentLoaded', () => {
  const sectionIds = ['home', 'about', 'skills'];

  const fileToPretty = {
    'index.html': 'home',
    'staff.html': 'staff',
    'hotels.html': 'hotel',
  };

  const { pathname, hash } = window.location;

  function scrollToId(id, smooth = true) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' });
  }

  function pathToSection(path) {
    const seg = path.replace(/\/+$/, '').split('/').filter(Boolean).pop() || 'home';
    return sectionIds.includes(seg) ? seg : null;
  }

  const initialSection = pathToSection(pathname);
  if (initialSection) {
    scrollToId(initialSection, false);
  } else if (hash && sectionIds.includes(hash.slice(1))) {

    const id = hash.slice(1);
    scrollToId(id, false);

    history.replaceState({}, '', '/' + id);
  } else {
    const lastSlash = pathname.lastIndexOf('/') + 1;
    const file = pathname.slice(lastSlash);
    const pretty = fileToPretty[file];
    if (pretty) {
      history.replaceState({}, '', '/' + pretty + (hash || ''));
      if (hash) scrollToId(hash.slice(1), false);
    }
  }

  document.addEventListener('click', (e) => {
    const a = e.target.closest('a.nav__link');
    if (!a) return;

    const href = a.getAttribute('href') || '';


    if (href.startsWith('/')) {
      const sec = pathToSection(href);
      if (sec) {
        e.preventDefault();                 
        history.pushState({}, '', '/' + sec);
        scrollToId(sec);
        return;
      }
    }

    if (href.startsWith('#')) {
      const id = href.slice(1);
      if (sectionIds.includes(id)) {
        e.preventDefault();
        history.pushState({}, '', '/' + id);
        scrollToId(id);
        return;
      }
    }

    if (/\.html(?:#.*)?$/i.test(href)) {
      e.preventDefault();
      const url = new URL(href, window.location.href);
      const pFile = url.pathname.split('/').pop();
      const mapped = fileToPretty[pFile] || pFile.replace(/\.html$/i, '');
      history.pushState({}, '', '/' + mapped + (url.hash || ''));
      if (document.getElementById(mapped)) scrollToId(mapped);
    }
  });

  window.addEventListener('popstate', () => {
    const sec = pathToSection(location.pathname);
    if (sec) scrollToId(sec, false);
  });
});
