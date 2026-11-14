/* COMÚ A TOTES LES PÀGINES
 *
 * Aquest fitxer es carrega el primer, dins del <head> de cada pàgina, i s'encarrega de:
 *   1. L'idioma: una sola preferència desada (clau «certamen-lang») i un sol avís de canvi.
 *   2. La capçalera (logo, menú principal, xarxes socials i selector d'idioma).
 *   3. El peu de pàgina.
 *   4. El botó «Menú» del mòbil.
 *
 * ── Com s'utilitza des de les pàgines ──────────────────────────────────────────
 *   <script>Certamen.header('contest')</script>   on ha d'anar la capçalera; l'argument
 *                                                  és la clau del menú de la pàgina actual
 *                                                  (vegeu NAV) o res si no n'hi ha cap.
 *   <script>Certamen.footer()</script>            on ha d'anar el peu.
 *
 * ── Com s'utilitza des dels scripts de cada pàgina ─────────────────────────────
 *   Certamen.onLang(function (lang) { ... })      es crida un cop quan la pàgina està
 *                                                  llesta i cada vegada que es canvia
 *                                                  d'idioma. No cal llegir localStorage
 *                                                  ni escoltar els botons d'idioma.
 *   Certamen.lang()                               idioma actual ('ca', 'es', 'gl', 'pt', 'en').
 *
 * Per afegir o treure un enllaç del menú, modifica NAV i els textos de TEXTS.
 */
(function () {
  'use strict';

  var LANGS = ['ca', 'es', 'gl', 'pt', 'en'];
  var LANG_NAMES = { ca: 'Català', es: 'Castellano', gl: 'Galego', pt: 'Português', en: 'English' };
  var STORAGE_KEY = 'certamen-lang';
  var OLD_STORAGE_KEY = 'certamenLang'; // nom antic que feien servir algunes pàgines

  // Menú principal: [clau, enllaç]. Els textos són a TEXTS[idioma].nav.
  var NAV = [
    ['home', 'index.html'],
    ['contest', 'el-certamen.html'],
    ['participation', 'inscripcions.html'],
    ['program', 'programa.html'],
    ['results', 'index.html#resultats'],
    ['news', 'index.html#noticies'],
    ['history', 'historia.html'],
    ['territory', 'territori.html'],
    ['faq', 'faq.html'],
    ['contact', 'contacte.html']
  ];

  var TEXTS = {
    ca: {
      nav: { home: 'Inici', contest: 'El Certamen', participation: 'Participació', program: 'Programa', results: 'Resultats', news: 'Actualitat', history: 'Història', territory: 'La Sénia i el territori', faq: 'FAQ', contact: 'Contacte' },
      menu: 'Menú', navLabel: 'Navegació principal', langLabel: 'Idioma', socialLabel: 'Xarxes socials', newTab: 'obre una pestanya nova',
      follow: 'Segueix-nos', footerName: 'Certamen Internacional de Bandes de Música Vila de la Sénia',
      footerLinks: 'Enllaços del peu', privacy: 'Política de privacitat', cookies: 'Política de cookies'
    },
    es: {
      nav: { home: 'Inicio', contest: 'El Certamen', participation: 'Participación', program: 'Programa', results: 'Resultados', news: 'Actualidad', history: 'Historia', territory: 'La Sénia y el territorio', faq: 'FAQ', contact: 'Contacto' },
      menu: 'Menú', navLabel: 'Navegación principal', langLabel: 'Idioma', socialLabel: 'Redes sociales', newTab: 'abre una pestaña nueva',
      follow: 'Síguenos', footerName: 'Certamen Internacional de Bandas de Música Vila de la Sénia',
      footerLinks: 'Enlaces del pie', privacy: 'Política de privacidad', cookies: 'Política de cookies'
    },
    gl: {
      nav: { home: 'Inicio', contest: 'O Certame', participation: 'Participación', program: 'Programa', results: 'Resultados', news: 'Actualidade', history: 'Historia', territory: 'La Sénia e o territorio', faq: 'FAQ', contact: 'Contacto' },
      menu: 'Menú', navLabel: 'Navegación principal', langLabel: 'Idioma', socialLabel: 'Redes sociais', newTab: 'abre unha lapela nova',
      follow: 'Síguenos', footerName: 'Certame Internacional de Bandas de Música Vila de la Sénia',
      footerLinks: 'Ligazóns do pé', privacy: 'Política de privacidade', cookies: 'Política de cookies'
    },
    pt: {
      nav: { home: 'Início', contest: 'O Certame', participation: 'Participação', program: 'Programa', results: 'Resultados', news: 'Atualidade', history: 'História', territory: 'La Sénia e o território', faq: 'FAQ', contact: 'Contacto' },
      menu: 'Menu', navLabel: 'Navegação principal', langLabel: 'Idioma', socialLabel: 'Redes sociais', newTab: 'abre um novo separador',
      follow: 'Segue-nos', footerName: 'Certame Internacional de Bandas de Música Vila de la Sénia',
      footerLinks: 'Ligações do rodapé', privacy: 'Política de privacidade', cookies: 'Política de cookies'
    },
    en: {
      nav: { home: 'Home', contest: 'The Competition', participation: 'Participation', program: 'Programme', results: 'Results', news: 'News', history: 'History', territory: 'La Sénia and the surrounding area', faq: 'FAQ', contact: 'Contact' },
      menu: 'Menu', navLabel: 'Main navigation', langLabel: 'Language', socialLabel: 'Social media', newTab: 'opens in a new tab',
      follow: 'Follow us', footerName: 'International Wind Band Competition Vila de la Sénia',
      footerLinks: 'Footer links', privacy: 'Privacy policy', cookies: 'Cookie policy'
    }
  };

  // Xarxes socials: es mostren a la capçalera i al peu.
  var SOCIAL = [
    { name: 'Facebook', url: 'https://www.facebook.com/people/CERTAMEN-INTERNACIONAL-DE-BANDES-VILA-DE-LA-S%C3%89NIA/100039268369727/', icon: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>' },
    { name: 'Instagram', url: 'https://www.instagram.com/certamen_lasenia/', icon: '<rect x="2" y="2" width="20" height="20" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="18" cy="6" r="1.2"/>' },
    { name: 'YouTube', url: 'https://www.youtube.com/@CertamendeBandesdeMusica-xo1he', icon: '<rect x="2" y="5" width="20" height="14" rx="4" fill="none" stroke="currentColor" stroke-width="2"/><path d="m10 9 5 3-5 3z"/>' }
  ];

  // ── Idioma ──────────────────────────────────────────────────────────────────
  function storedLanguage() {
    try {
      var lang = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(OLD_STORAGE_KEY);
      return LANGS.indexOf(lang) >= 0 ? lang : 'ca';
    } catch (_) {
      return 'ca';
    }
  }

  var current = storedLanguage();
  var listeners = [];
  var ready = false;

  function lang() { return current; }

  function onLang(fn) {
    listeners.push(fn);
    if (ready) run(fn);
  }

  function run(fn) {
    try { fn(current); } catch (error) { console.error(error); }
  }

  function setLang(lang) {
    if (LANGS.indexOf(lang) < 0) return;
    current = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
      localStorage.removeItem(OLD_STORAGE_KEY);
    } catch (_) {}
    applyCommon();
    listeners.forEach(run);
  }

  // ── Capçalera i peu ─────────────────────────────────────────────────────────
  function socialMarkup(t) {
    return SOCIAL.map(function (item) {
      return '<a class="social-link" href="' + item.url + '" target="_blank" rel="noopener noreferrer" data-social="' + item.name + '" aria-label="' + item.name + ' (' + t.newTab + ')" title="' + item.name + '">' +
        '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true" focusable="false">' + item.icon + '</svg></a>';
    }).join('');
  }

  function insertHere(html) {
    var script = document.currentScript;
    if (script) script.insertAdjacentHTML('beforebegin', html);
    else document.body.insertAdjacentHTML('afterbegin', html);
  }

  function header(page) {
    var t = TEXTS[current];
    var nav = NAV.map(function (item) {
      return '<a data-nav="' + item[0] + '"' + (item[0] === page ? ' aria-current="page"' : '') + ' href="' + item[1] + '">' + t.nav[item[0]] + '</a>';
    }).join('');
    var langs = LANGS.map(function (l) {
      return '<button aria-pressed="' + (l === current) + '" data-lang="' + l + '" type="button">' + LANG_NAMES[l] + '</button>';
    }).join('');
    insertHere(
      '<header class="header">' +
        '<a data-nav="home" aria-label="Certamen Vila de la Sénia" class="brand" href="index.html"><img alt="" class="brand-logo" height="56" src="assets/logo-certamen-blanc.svg" width="56"/><span><strong>CERTAMEN</strong><small>VILA DE LA SÉNIA</small></span></a>' +
        '<button aria-controls="nav" aria-expanded="false" class="menu-toggle" type="button" data-common="menu">' + t.menu + '</button>' +
        '<nav aria-label="' + t.navLabel + '" class="nav" id="nav">' + nav + '</nav>' +
        '<div class="social-links social-header" aria-label="' + t.socialLabel + '">' + socialMarkup(t) + '</div>' +
        '<details aria-label="' + t.langLabel + '" class="langs"><summary><span class="lang-current">' + current.toUpperCase() + '</span><span aria-hidden="true" class="lang-arrow">▾</span></summary>' +
        '<div class="lang-menu">' + langs + '</div></details>' +
      '</header>'
    );
  }

  function footer() {
    var t = TEXTS[current];
    insertHere(
      '<footer>' +
        '<div class="footer-brand"><img alt="" class="brand-logo" height="56" src="assets/logo-certamen-blanc.svg" width="56"/><div><strong>CERTAMEN</strong><small>VILA DE LA SÉNIA</small></div></div>' +
        '<p data-common="footerName">' + t.footerName + '</p>' +
        '<nav class="footer-links" aria-label="' + t.footerLinks + '">' +
          '<a href="contacte.html" data-common="contact">' + t.nav.contact + '</a>' +
          '<a href="politica-privacitat.html" data-common="privacy">' + t.privacy + '</a>' +
          '<a href="politica-cookies.html" data-common="cookies">' + t.cookies + '</a>' +
        '</nav>' +
        '<div class="social-footer"><span class="social-footer-label">' + t.follow + '</span><div class="social-links">' + socialMarkup(t) + '</div></div>' +
      '</footer>'
    );
  }

  // Actualitza els textos de la capçalera i del peu a l'idioma actual.
  function applyCommon() {
    var t = TEXTS[current];
    document.documentElement.lang = current;
    document.querySelectorAll('.nav [data-nav]').forEach(function (link) {
      if (t.nav[link.dataset.nav]) link.textContent = t.nav[link.dataset.nav];
    });
    document.querySelectorAll('.lang-current').forEach(function (el) { el.textContent = current.toUpperCase(); });
    document.querySelectorAll('.lang-menu button[data-lang]').forEach(function (button) {
      button.setAttribute('aria-pressed', String(button.dataset.lang === current));
    });
    var simple = { menu: t.menu, footerName: t.footerName, contact: t.nav.contact, privacy: t.privacy, cookies: t.cookies };
    document.querySelectorAll('[data-common]').forEach(function (el) {
      if (simple[el.dataset.common]) el.textContent = simple[el.dataset.common];
    });
    document.querySelectorAll('.nav').forEach(function (el) { el.setAttribute('aria-label', t.navLabel); });
    document.querySelectorAll('.langs').forEach(function (el) { el.setAttribute('aria-label', t.langLabel); });
    document.querySelectorAll('.footer-links').forEach(function (el) { el.setAttribute('aria-label', t.footerLinks); });
    document.querySelectorAll('.social-header').forEach(function (el) { el.setAttribute('aria-label', t.socialLabel); });
    document.querySelectorAll('.social-footer-label').forEach(function (el) { el.textContent = t.follow; });
    document.querySelectorAll('[data-social]').forEach(function (el) {
      el.setAttribute('aria-label', el.dataset.social + ' (' + t.newTab + ')');
    });
  }

  // ── Interaccions (delegades: funcionen encara que la capçalera es generi després) ──
  document.addEventListener('click', function (event) {
    var langButton = event.target.closest('.lang-menu button[data-lang]');
    if (langButton) {
      setLang(langButton.dataset.lang);
      var details = langButton.closest('.langs');
      if (details) details.removeAttribute('open');
      return;
    }
    var toggle = event.target.closest('.menu-toggle');
    if (toggle) {
      var nav = document.getElementById(toggle.getAttribute('aria-controls')) || document.querySelector('.nav');
      if (nav) {
        var open = nav.classList.toggle('open');
        toggle.setAttribute('aria-expanded', String(open));
      }
      return;
    }
    var navLink = event.target.closest('.nav a');
    if (navLink) {
      var openNav = navLink.closest('.nav');
      openNav.classList.remove('open');
      document.querySelectorAll('.menu-toggle').forEach(function (b) { b.setAttribute('aria-expanded', 'false'); });
    }
  });

  document.addEventListener('DOMContentLoaded', function () {
    ready = true;
    applyCommon();
    listeners.forEach(run);
  });

  window.Certamen = { langs: LANGS.slice(), lang: lang, setLang: setLang, onLang: onLang, header: header, footer: footer };
})();
