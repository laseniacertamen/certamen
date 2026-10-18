// Informació de l'edició 2027 compartida per la portada i participació.
// La data de tancament és el 31/12/2026 a les 12:00, hora local.
const edition2027Texts = {
  "ca": [
    "XIX CERTAMEN · 2027",
    "10 i 11 d’abril de 2027 · Casa de la Cultura de la Sénia",
    "Inscripcions: del 19 d’octubre al 31 de desembre de 2026 (12.00 h)",
    "Descarrega les bases del Certamen ↓"
  ],
  "es": [
    "XIX CERTAMEN · 2027",
    "10 y 11 de abril de 2027 · Casa de la Cultura de la Sénia",
    "Inscripciones: del 19 de octubre al 31 de diciembre de 2026 (12:00 h)",
    "Descargar las bases del Certamen ↓"
  ],
  "gl": [
    "XIX CERTAME · 2027",
    "10 e 11 de abril de 2027 · Casa da Cultura de la Sénia",
    "Inscricións: do 19 de outubro ao 31 de decembro de 2026 (12:00 h)",
    "Descargar as bases do Certame ↓"
  ],
  "pt": [
    "XIX CERTAME · 2027",
    "10 e 11 de abril de 2027 · Casa da Cultura de la Sénia",
    "Inscrições: de 19 de outubro a 31 de dezembro de 2026 (12h00)",
    "Descarregar o regulamento do Certame ↓"
  ],
  "en": [
    "19TH COMPETITION · 2027",
    "10–11 April 2027 · Casa de la Cultura, La Sénia",
    "Registration: 19 October – 31 December 2026 (12:00 noon)",
    "Download the Competition Rules ↓"
  ]
};
function updateEdition2027(lang) {
  const labels = edition2027Texts[lang] || edition2027Texts.ca;
  document.querySelectorAll('[data-edition-2027]').forEach(element => {
    const index = Number(element.dataset.edition2027);
    if (labels[index]) element.textContent = labels[index];
  });
}
function edition2027Language() {
  try { return localStorage.getItem('certamen-lang') || localStorage.getItem('certamenLang') || 'ca'; }
  catch (_) { return 'ca'; }
}
document.addEventListener('DOMContentLoaded', () => {
  updateEdition2027(edition2027Language());
  document.querySelectorAll('.lang-menu button[data-lang]').forEach(button => {
    button.addEventListener('click', () => updateEdition2027(button.dataset.lang));
  });
});

// Els enllaços de les bases apunten al PDF de la llengua activa.
function updateRulesPDF(lang) {
  const valid = ['ca', 'es', 'gl', 'pt', 'en'];
  const selected = valid.includes(lang) ? lang : 'ca';
  document.querySelectorAll('a.edition-2027-download, a[data-faq="basesDownload"]').forEach(link => {
    link.href = 'doc/Bases-XIX-Certamen-2027-' + selected + '.pdf';
    link.setAttribute('download', 'Bases-XIX-Certamen-2027-' + selected + '.pdf');
  });
}
document.addEventListener('DOMContentLoaded', () => {
  updateRulesPDF(edition2027Language());
  document.querySelectorAll('.lang-menu button[data-lang]').forEach(button => {
    button.addEventListener('click', () => updateRulesPDF(button.dataset.lang));
  });
});
