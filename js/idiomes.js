// SELECTOR D'IDIOMA COMÚ
// Manté el desplegable compacte i mostra el codi de l'idioma actiu.
(function () {

  // Traduccions del menú principal. Es gestionen aquí perquè aquest fitxer
  // és comú a totes les pàgines i així la navegació sempre canvia d'idioma.
  var navTranslations = {
    ca: { home:'Inici', contest:'El Certamen', participation:'Participació', program:'Programa', results:'Resultats', news:'Actualitat', territory:'La Sénia i el territori', faq:'FAQ', history:'Història', contact:'Contacte' },
    es: { home:'Inicio', contest:'El Certamen', participation:'Participación', program:'Programa', results:'Resultados', news:'Actualidad', territory:'La Sénia y el territorio', faq:'FAQ', history:'Historia', contact:'Contacto' },
    gl: { home:'Inicio', contest:'O Certame', participation:'Participación', program:'Programa', results:'Resultados', news:'Actualidade', history:'Historia', territory:'La Sénia e o territorio', faq:'FAQ', history:'Historia', contact:'Contacto' },
    pt: { home:'Início', contest:'O Certame', participation:'Participação', program:'Programa', results:'Resultados', news:'Atualidade', history:'História', territory:'La Sénia e o território', faq:'FAQ', history:'Historia', contact:'Contacto' },
    en: { home:'Home', contest:'The Competition', participation:'Participation', program:'Programme', results:'Results', news:'News', territory:'La Sénia and the surrounding area', faq:'FAQ', history:'History', contact:'Contact' }
  };


  // Xarxes socials: una sola configuració compartida per totes les pàgines.
  var socialLinks = [
    { name: 'Facebook', url: 'https://www.facebook.com/people/CERTAMEN-INTERNACIONAL-DE-BANDES-VILA-DE-LA-S%C3%89NIA/100039268369727/', icon: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>' },
    { name: 'Instagram', url: 'https://www.instagram.com/certamen_lasenia/', icon: '<rect x="2" y="2" width="20" height="20" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="18" cy="6" r="1.2"/>' },
    { name: 'YouTube', url: 'https://www.youtube.com/@CertamendeBandesdeMusica-xo1he', icon: '<rect x="2" y="5" width="20" height="14" rx="4" fill="none" stroke="currentColor" stroke-width="2"/><path d="m10 9 5 3-5 3z"/>' }
  ];
  var socialLabels = {ca:'Segueix-nos',es:'Síguenos',gl:'Síguenos',pt:'Segue-nos',en:'Follow us'};
  function socialMarkup() {
    return socialLinks.map(function (item) {
      return '<a class="social-link" href="' + item.url + '" target="_blank" rel="noopener noreferrer" aria-label="' + item.name + ' (obre una pestanya nova)" title="' + item.name + '"><svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true" focusable="false">' + item.icon + '</svg></a>';
    }).join('');
  }
  function installSocialLinks() {
    var header = document.querySelector('.header');
    if (header && !header.querySelector('.social-header')) {
      var wrap = document.createElement('div');
      wrap.className = 'social-links social-header';
      wrap.setAttribute('aria-label', 'Xarxes socials');
      wrap.innerHTML = socialMarkup();
      var langs = header.querySelector('.langs');
      if (langs) header.insertBefore(wrap, langs);
      else header.appendChild(wrap);
    }
    var footer = document.querySelector('footer');
    if (footer && !footer.querySelector('.social-footer')) {
      var section = document.createElement('div');
      section.className = 'social-footer';
      section.innerHTML = '<span class="social-footer-label"></span><div class="social-links">' + socialMarkup() + '</div>';
      footer.appendChild(section);
    }
    updateSocialLanguage(storedLanguage());
  }
  function updateSocialLanguage(lang) {
    document.querySelectorAll('.social-footer-label').forEach(function (el) {
      el.textContent = socialLabels[lang] || socialLabels.ca;
    });
  }

  function updateNavigation(lang) {
    var texts = navTranslations[lang] || navTranslations.ca;
    document.querySelectorAll('.nav [data-nav]').forEach(function (link) {
      var key = link.dataset.nav;
      if (texts[key]) link.textContent = texts[key];
    });
  }

  function updateLanguageLabel(lang) {
    document.querySelectorAll('.lang-current').forEach(function (el) {
      el.textContent = String(lang || 'ca').toUpperCase();
    });
    document.querySelectorAll('.lang-menu button[data-lang]').forEach(function (button) {
      button.setAttribute('aria-pressed', String(button.dataset.lang === lang));
    });
  }

  function storedLanguage() {
    try {
      return localStorage.getItem('certamen-lang') || localStorage.getItem('certamenLang') || 'ca';
    } catch (_) {
      return 'ca';
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    var initialLang = storedLanguage();
    updateLanguageLabel(initialLang);
    updateNavigation(initialLang);
    installSocialLinks();

    document.querySelectorAll('.lang-menu button[data-lang]').forEach(function (button) {
      button.addEventListener('click', function () {
        var lang = button.dataset.lang;
        updateLanguageLabel(lang);
        updateNavigation(lang);
        updateSocialLanguage(lang);
        try {
          // Conservem les dues claus perquè les pàgines existents utilitzen
          // temporalment noms diferents per recordar l'idioma.
          localStorage.setItem('certamen-lang', lang);
          localStorage.setItem('certamenLang', lang);
        } catch (_) {}
        var details = button.closest('.langs');
        if (details) details.removeAttribute('open');
      });
    });
  });
})();
