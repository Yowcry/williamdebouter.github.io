// pretty-nav.js
document.addEventListener('DOMContentLoaded', () => {
  const sectionIds = ['home', 'about', 'skills'];

  // Map .html files -> pretty slugs (optional if you still have those files/links)
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

  // 1) Initial load behavior
  // If we’re on /home, /about, /skills: scroll to that section
  const initialSection = pathToSection(pathname);
  if (initialSection) {
    scrollToId(initialSection, false);
  } else if (hash && sectionIds.includes(hash.slice(1))) {
    // If there's a #hash, scroll there (and optionally clean it up)
    const id = hash.slice(1);
    scrollToId(id, false);
    // Optional: remove the hash from the bar without reloading
    history.replaceState({}, '', '/' + id);
  } else {
    // If on a .html file, rewrite to pretty (optional)
    const lastSlash = pathname.lastIndexOf('/') + 1;
    const file = pathname.slice(lastSlash);
    const pretty = fileToPretty[file];
    if (pretty) {
      history.replaceState({}, '', '/' + pretty + (hash || ''));
      if (hash) scrollToId(hash.slice(1), false);
    }
  }

  // 2) Intercept nav clicks for:
  //    - clean paths: /home, /about, /skills
  //    - hash links: #home, #about, #skills
  //    - .html links (optional)
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a.nav__link');
    if (!a) return;

    const href = a.getAttribute('href') || '';

    // Case A: clean path (/home, /about, /skills)
    if (href.startsWith('/')) {
      const sec = pathToSection(href);
      if (sec) {
        e.preventDefault();                 // stop real navigation (prevents 404)
        history.pushState({}, '', '/' + sec);
        scrollToId(sec);
        return;
      }
    }

    // Case B: hash links (#home, etc.)
    if (href.startsWith('#')) {
      const id = href.slice(1);
      if (sectionIds.includes(id)) {
        e.preventDefault();
        history.pushState({}, '', '/' + id);
        scrollToId(id);
        return;
      }
    }

    // Case C: .html links -> map to pretty (optional)
    if (/\.html(?:#.*)?$/i.test(href)) {
      e.preventDefault();
      const url = new URL(href, window.location.href);
      const pFile = url.pathname.split('/').pop();
      const mapped = fileToPretty[pFile] || pFile.replace(/\.html$/i, '');
      history.pushState({}, '', '/' + mapped + (url.hash || ''));
      if (document.getElementById(mapped)) scrollToId(mapped);
    }
  });

  // 3) Back/forward support
  window.addEventListener('popstate', () => {
    const sec = pathToSection(location.pathname);
    if (sec) scrollToId(sec, false);
  });
});
