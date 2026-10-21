/* CONFIGURACIÓ: canvia aquests valors quan tingueu el servei de formularis. */
const CONFIG = {
  // Exemple de servei: URL real de l'endpoint de recepció del formulari de contacte.
  contacteEndpoint: 'https://script.google.com/macros/s/AKfycbySoz6lhYhnOJfHNR3miRkXsvDOZ8t5WkDd75phHBjUSGqiTxVLXnVYZNC2h8m25rCMSg/exec',
  // Endpoint DIFERENT per a les inscripcions, per separar els dos correus.
  inscripcionsEndpoint: 'https://script.google.com/macros/s/AKfycbwRR6TlWnKwWgncqdFpug3Fn3zqcqBd0lHEGl51mATkmcbquuPF7qM39-rso0WAoaGwRA/exec',
  // Activa-ho només dins el termini oficial i després de configurar l'endpoint.
  inscripcionsObertes: true
};

let idiomaActual = 'ca';
function canviaIdioma(idioma) {
  idiomaActual = formTranslations[idioma] ? idioma : 'ca';
  document.documentElement.lang = idiomaActual;
  const textos = formTranslations[idiomaActual];
  document.querySelectorAll('[data-f]').forEach(element => {
    const clau = element.dataset.f;
    if (textos[clau]) element.textContent = textos[clau];
  });
  const privacitatInscripcio = document.querySelector('#registration-form [data-f="privacyConsent"]');
  if (privacitatInscripcio && textos.registrationPrivacyConsent) privacitatInscripcio.textContent = textos.registrationPrivacyConsent;
  document.querySelectorAll('[data-lang]').forEach(boto =>
    boto.setAttribute('aria-pressed', String(boto.dataset.lang === idiomaActual)));
  try { localStorage.setItem('certamen-lang', idiomaActual); } catch (_) {}
}

// El formulari d'inscripció està ocult fora de termini. L'endpoint és obligatori.
const inscripcio = document.querySelector('#registration-form');
// Control de termini en hora de la Sénia (Europe/Madrid). També requereix endpoint configurat.
const ara = Date.now();
const dinsTermini = ara >= Date.parse('2026-10-19T00:00:00+02:00') && ara < Date.parse('2026-12-31T12:00:00+01:00');

// Mode de proves: permet veure el formulari en local.
// Cal mantenir-lo a false en producció.
const MODE_PROVES = false;
const esLocal = ['localhost', '127.0.0.1'].includes(window.location.hostname);
const mostrarFormulari = (MODE_PROVES && esLocal) || (dinsTermini && CONFIG.inscripcionsObertes && CONFIG.inscripcionsEndpoint);

if (inscripcio && mostrarFormulari) {
  inscripcio.hidden = false;
  document.querySelector('#registration-closed').hidden = true;
}


/**
 * Verifica una inscripció a Google Apps Script mitjançant JSONP.
 * Retorna true si el registre existeix i false si no existeix.
 * Rebutja la promesa si no es pot comprovar.
 */
function verificarInscripcio(endpoint, identificador) {
  return new Promise((resolve, reject) => {
    const nomCallback = 'certamenCallback_' + crypto.randomUUID().replace(/-/g, '');
    const script = document.createElement('script');
    let acabat = false;

    const timeout = setTimeout(() => finalitzar(new Error('Temps de verificació exhaurit')), 10000);

    function finalitzar(error, resultat) {
      if (acabat) return;
      acabat = true;
      clearTimeout(timeout);
      script.remove();
      delete window[nomCallback];

      if (error) reject(error);
      else resolve(resultat);
    }

    window[nomCallback] = dades => finalitzar(null, dades.registered === true);
    script.onerror = () => finalitzar(new Error('Error de connexió'));

    const url = new URL(endpoint);
    url.searchParams.set('requestId', identificador);
    url.searchParams.set('callback', nomCallback);
    script.src = url.toString();

    document.head.appendChild(script);
  });
}

const missatgesInscripcio = {
  ca: {
    correcte: 'Sol·licitud registrada correctament. Rebreu un correu de confirmació.',
    pendent: 'Encara no hem pogut confirmar el registre. Comproveu el correu abans de tornar a enviar la sol·licitud.',
    senseVerificacio: 'No s’ha pogut verificar la recepció. Comproveu el correu o contacteu amb l’organització abans de repetir l’enviament.'
  },
  es: {
    correcte: 'Solicitud registrada correctamente. Recibirán un correo de confirmación.',
    pendent: 'Todavía no hemos podido confirmar el registro. Comprueben su correo antes de volver a enviar la solicitud.',
    senseVerificacio: 'No se ha podido verificar la recepción. Comprueben su correo o contacten con la organización antes de repetir el envío.'
  },
  gl: {
    correcte: 'Solicitude rexistrada correctamente. Recibirán un correo de confirmación.',
    pendent: 'Aínda non puidemos confirmar o rexistro. Comproben o correo antes de volver enviar a solicitude.',
    senseVerificacio: 'Non foi posible verificar a recepción. Comproben o correo ou contacten coa organización antes de repetir o envío.'
  },
  pt: {
    correcte: 'Pedido registado com sucesso. Receberão um e-mail de confirmação.',
    pendent: 'Ainda não foi possível confirmar o registo. Verifiquem o e-mail antes de enviar novamente.',
    senseVerificacio: 'Não foi possível verificar a receção. Verifiquem o e-mail ou contactem a organização antes de repetir o envio.'
  },
  en: {
    correcte: 'Application successfully registered. You will receive a confirmation email.',
    pendent: 'We have not yet confirmed registration. Please check your email before submitting again.',
    senseVerificacio: 'We could not verify receipt. Please check your email or contact the organisers before submitting again.'
  }
};

// Enviament asíncron a un servei de formularis que accepti POST de FormData.
// Sense endpoint no es fa cap enviament ni es mostra un missatge d'èxit fals.
async function enviaFormulari(formulari, endpoint) {
  const estat = formulari.querySelector('.form-status');
  if (!endpoint) {
    estat.textContent = formTranslations[idiomaActual].setupText;
    return;
  }
  const boto = formulari.querySelector('button[type="submit"]');
  boto.disabled = true;
  estat.textContent = '';
  try {
    // Preparem les dades. El formulari de contacte utilitza noms de camps
    // llegibles a l'HTML, però Google Apps Script espera nom/assumpte/missatge.
    let dades = new FormData(formulari);

    let identificador = null;

    if (formulari.id === 'registration-form') {
      identificador = crypto.randomUUID();
      dades.append('requestId', identificador);
      dades.append('lang', idiomaActual);
    }

    if (formulari.id === 'registration-form') {
      dades.append('lang', idiomaActual);
    }

    if (formulari.id === 'contact-form') {
      const website = dades.get('website') || '';
      const nom = dades.get('name') || '';
      const banda = dades.get('band') || '';
      const missatge = dades.get('message') || '';

      dades = new FormData();
      dades.append('website', website);
      dades.append('form_timestamp', String(iniciContacte));
      dades.append('nom', nom);
      dades.append('email', formulari.elements.email.value);
      dades.append('assumpte', banda ? 'Consulta web - ' + banda : 'Consulta web');
      dades.append('missatge', banda ? 'Banda o entitat: ' + banda + '\n\n' + missatge : missatge);
    }

    // Apps Script respon des d'un domini de Google diferent. Amb no-cors podem
    // enviar el formulari des de localhost i, més endavant, des de GitHub Pages
    // sense que el navegador bloquegi l'enviament per CORS.
    await fetch(endpoint, {
      method: 'POST',
      body: dades,
      mode: 'no-cors'
    });

    if (identificador) {
      // Verifiquem que la sol·licitud consti a Google Sheets.
      let registrat = false;
      let verificacioDisponible = true;

      try {
        for (let intent = 0; intent < 5; intent++) {
          await new Promise(resolve => setTimeout(resolve, 1500));

          registrat = await verificarInscripcio(endpoint, identificador);
          if (registrat) break;
        }
      } catch (error) {
        verificacioDisponible = false;
        console.warn('No s’ha pogut verificar la inscripció:', error);
      }

      if (registrat) {
        estat.textContent = missatgesInscripcio[idiomaActual].correcte;
        formulari.reset();
      } else {
        estat.textContent = verificacioDisponible
          ? missatgesInscripcio[idiomaActual].pendent
          : missatgesInscripcio[idiomaActual].senseVerificacio;
      }

    } else {
      // Conservem el comportament actual del formulari de contacte.
      estat.textContent = formTranslations[idiomaActual].confirmation;
      formulari.reset();
    }
}
catch (error) {
    estat.textContent = formTranslations[idiomaActual].sendError;
    console.error('Error en enviar el formulari:', error);
  } finally { boto.disabled = false; }
}

const contacte = document.querySelector('#contact-form');
// Moment en què es mostra el formulari (no el moment de l'enviament).
let iniciContacte = Date.now();
window.addEventListener('pageshow', () => { iniciContacte = Date.now(); });
if (contacte) contacte.addEventListener('submit', event => {
  event.preventDefault();
  if (contacte.reportValidity()) enviaFormulari(contacte, CONFIG.contacteEndpoint);
});
if (inscripcio) inscripcio.addEventListener('submit', event => {
  event.preventDefault();
  if (inscripcio.reportValidity()) enviaFormulari(inscripcio, CONFIG.inscripcionsEndpoint);
});

document.querySelectorAll('[data-lang]').forEach(boto =>
  boto.addEventListener('click', () => canviaIdioma(boto.dataset.lang)));
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#nav');
menu.addEventListener('click', () => {
  const obert = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(obert));
});
try { canviaIdioma(localStorage.getItem('certamen-lang') || 'ca'); }
catch (_) { canviaIdioma('ca'); }
