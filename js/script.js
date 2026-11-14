// PORTADA: traduccions i interaccions.
// Els atributs data-t de l’HTML indiquen quin text es tradueix.
// Mantén les mateixes claus a totes les llengües: CA, ES, GL, PT i EN.

// Edit the text for each language here.
const translations = {
  ca: {
    mandatoryWorksTitle:"Obres obligades",
    mandatoryWorksIntro:"Les bandes participants podran escollir una de les obres següents:",
    publisherLabel:"Editorial",
    listenWork:"Escoltar l’obra",
    menu:'Menú',
    contest:'El certamen',
    participation:'Participació',
    program:'Programa',
    results:'Resultats',
    history:'Història',
    news:'Actualitat',
    faq:'Preguntes freqüents', territory:'La Sénia i el territori',
    eyebrow:'LA SÉNIA · CATALUNYA',
    heroTitle:'La música ens mou.',
    heroSub:'Certamen Internacional de Bandes de Música Vila de la Sénia',
    discover:'Descobreix el certamen ↗',
    join:'Participa-hi ↗',
    introTitle:'Un escenari per a la música de banda.',
    introText:'La Sénia es converteix en un punt de trobada per a bandes, directors i públic. Descobreix la música, les persones i la història del Certamen.',
    knowMore:'Coneix la nostra història →',
    exploreEyebrow:'DESCOBREIX',
    exploreTitle:'Viu el Certamen',
    tileJoin:'Bases i inscripcions',
    tileProgram:'Actuacions i horaris',
    tileResults:'Premis i classificacions',
    tileHistory:'Edicions anteriors',
    participateTitle:'La teva banda.<br>El nostre escenari.',
    participateText:'Consulta les bases i prepara la participació de la teva banda en una pròxima edició.',
    contactJoin:'Demana informació ↗',
    programTitle:'Cada actuació, un moment únic.',
    programText:'El programa de la pròxima edició es publicarà aquí quan estigui disponible.',
    resultsTitle:'El talent deixa empremta.',
    resultsText:'Consulta els resultats oficials i els reconeixements de les edicions del Certamen.',
    historyTitle:'Una història que continua sonant.',
    historyText:'Un espai per descobrir les bandes participants i els moments de les edicions anteriors.',
    historyComingTitle:'La nostra història, edició a edició',
    historyComingText:'Estem treballant per recuperar i compartir la història del Certamen Internacional de Bandes de Música «Vila de la Sénia». Properament, aquest espai s’anirà ampliant amb informació, fotografies i records de les edicions anteriors, per posar en valor la trajectòria del Certamen i de totes les bandes que n’han format part.',
    resultsLatest:'Darrera edició',
    resultsAwarded:'Banda premiada',
    resultsAwardedPlural:'Bandes premiades',
    resultsConductor:'Direcció',
    resultsJury:'Jurat',
    resultsMore:'Totes les edicions, premis i gravacions →',
    newsCalendar:'Calendari de l’edició 2027',
    newsItem1Date:'Fins al 31 de desembre de 2026 (12.00 h)',
    newsItem1Text:'Inscripcions obertes per a les bandes que vulguin participar en el XIX Certamen.',
    newsItem1Link:'Inscriu la teva banda →',
    newsItem2Date:'Abans del 22 de gener de 2027',
    newsItem2Text:'Notificació a les bandes seleccionades provisionalment (fins a 6).',
    newsItem3Date:'Abans del 29 de gener de 2027',
    newsItem3Text:'Formalització de la inscripció: fiança i documentació de la banda.',
    newsItem4Date:'10 i 11 d’abril de 2027',
    newsItem4Text:'XIX Certamen a la Casa de la Cultura de la Sénia.',
    newsTitle:'Segueix el ritme del Certamen.',
    newsText:'Aquí trobaràs les novetats i els anuncis de les pròximes edicions.',
    footer:'Certamen Internacional de Bandes de Música Vila de la Sénia'
  },
  es: {
    mandatoryWorksTitle:"Obras obligadas",
    mandatoryWorksIntro:"Las bandas participantes podrán elegir una de las siguientes obras:",
    publisherLabel:"Editorial",
    listenWork:"Escuchar la obra",
    menu:'Menú',
    contest:'El certamen',
    participation:'Participación',
    program:'Programa',
    results:'Resultados',
    history:'Historia',
    news:'Actualidad',
    faq:'Preguntas frecuentes', territory:'La Sénia y el territorio',
    eyebrow:'LA SÉNIA · CATALUÑA',
    heroTitle:'La música nos mueve.',
    heroSub:'Certamen Internacional de Bandas de Música Vila de la Sénia',
    discover:'Descubre el certamen ↗',
    join:'Participa ↗',
    introTitle:'Un escenario para la música de banda.',
    introText:'La Sénia se convierte en un punto de encuentro para bandas, directores y público. Descubre la música, las personas y la historia del Certamen.',
    knowMore:'Conoce nuestra historia →',
    exploreEyebrow:'DESCUBRE',
    exploreTitle:'Vive el Certamen',
    tileJoin:'Bases e inscripciones',
    tileProgram:'Actuaciones y horarios',
    tileResults:'Premios y clasificaciones',
    tileHistory:'Ediciones anteriores',
    participateTitle:'Tu banda.<br>Nuestro escenario.',
    participateText:'Consulta las bases y prepara la participación de tu banda en una próxima edición.',
    contactJoin:'Solicita información ↗',
    programTitle:'Cada actuación, un momento único.',
    programText:'El programa de la próxima edición se publicará aquí cuando esté disponible.',
    resultsTitle:'El talento deja huella.',
    resultsText:'Consulta los resultados oficiales y los reconocimientos de las ediciones del Certamen.',
    historyTitle:'Una historia que sigue sonando.',
    historyText:'Un espacio para descubrir las bandas participantes y los momentos de ediciones anteriores.',
    historyComingTitle:'Nuestra historia, edición a edición',
    historyComingText:'Estamos trabajando para recuperar y compartir la historia del Certamen Internacional de Bandas de Música «Vila de la Sénia». Próximamente, este espacio se irá ampliando con información, fotografías y recuerdos de ediciones anteriores, para poner en valor la trayectoria del Certamen y de todas las bandas que han formado parte de él.',
    resultsLatest:'Última edición',
    resultsAwarded:'Banda premiada',
    resultsAwardedPlural:'Bandas premiadas',
    resultsConductor:'Dirección',
    resultsJury:'Jurado',
    resultsMore:'Todas las ediciones, premios y grabaciones →',
    newsCalendar:'Calendario de la edición 2027',
    newsItem1Date:'Hasta el 31 de diciembre de 2026 (12:00 h)',
    newsItem1Text:'Inscripciones abiertas para las bandas que quieran participar en el XIX Certamen.',
    newsItem1Link:'Inscribe a tu banda →',
    newsItem2Date:'Antes del 22 de enero de 2027',
    newsItem2Text:'Notificación a las bandas seleccionadas provisionalmente (hasta 6).',
    newsItem3Date:'Antes del 29 de enero de 2027',
    newsItem3Text:'Formalización de la inscripción: fianza y documentación de la banda.',
    newsItem4Date:'10 y 11 de abril de 2027',
    newsItem4Text:'XIX Certamen en la Casa de la Cultura de la Sénia.',
    newsTitle:'Sigue el ritmo del Certamen.',
    newsText:'Aquí encontrarás las novedades y los anuncios de las próximas ediciones.',
    footer:'Certamen Internacional de Bandas de Música Vila de la Sénia'
  },
  en: {
    mandatoryWorksTitle:"Compulsory works",
    mandatoryWorksIntro:"Participating bands may choose one of the following works:",
    publisherLabel:"Publisher",
    listenWork:"Listen to the work",
    menu:'Menu',
    contest:'The contest',
    participation:'Participation',
    program:'Program',
    results:'Results',
    history:'History',
    news:'News',
    faq:'Frequently asked questions', territory:'La Sénia & the region',
    eyebrow:'LA SÉNIA · CATALONIA',
    heroTitle:'Music moves us.',
    heroSub:'Vila de la Sénia International Wind Band Competition',
    discover:'Discover the contest ↗',
    join:'Take part ↗',
    introTitle:'A stage for wind band music.',
    introText:'La Sénia brings together bands, conductors and audiences. Discover the music, the people and the history of the contest.',
    knowMore:'Discover our history →',
    exploreEyebrow:'EXPLORE',
    exploreTitle:'Experience the contest',
    tileJoin:'Rules and registration',
    tileProgram:'Performances and times',
    tileResults:'Awards and rankings',
    tileHistory:'Previous editions',
    participateTitle:'Your band.<br>Our stage.',
    participateText:'Read the rules and prepare your band to take part in an upcoming edition.',
    contactJoin:'Request information ↗',
    programTitle:'Every performance, a unique moment.',
    programText:'The next edition’s program will be published here when available.',
    resultsTitle:'Talent leaves its mark.',
    resultsText:'Explore official results and awards from past editions of the contest.',
    historyTitle:'A history that keeps playing.',
    historyText:'Discover participating bands and memorable moments from previous editions.',
    historyComingTitle:'Our history, edition by edition',
    historyComingText:'We are working to preserve and share the history of the Vila de la Sénia International Wind Band Competition. This section will soon be expanded with information, photographs and memories from previous editions, celebrating the Competition’s history and all the bands that have taken part.',
    resultsLatest:'Latest edition',
    resultsAwarded:'Award-winning band',
    resultsAwardedPlural:'Award-winning bands',
    resultsConductor:'Conductor',
    resultsJury:'Jury',
    resultsMore:'All editions, prizes and recordings →',
    newsCalendar:'2027 edition timeline',
    newsItem1Date:'Until 31 December 2026 (12:00 noon)',
    newsItem1Text:'Registration is open for bands wishing to take part in the 19th Competition.',
    newsItem1Link:'Register your band →',
    newsItem2Date:'Before 22 January 2027',
    newsItem2Text:'Provisionally selected bands (up to 6) are notified.',
    newsItem3Date:'Before 29 January 2027',
    newsItem3Text:'Registration is completed: deposit and band documentation.',
    newsItem4Date:'10–11 April 2027',
    newsItem4Text:'19th Competition at the Casa de la Cultura, La Sénia.',
    newsTitle:'Stay in tune with the contest.',
    newsText:'Find news and announcements about upcoming editions here.',
    footer:'Vila de la Sénia International Wind Band Competition'
  }
  ,pt: {
    mandatoryWorksTitle:"Obras obrigatórias",
    mandatoryWorksIntro:"As bandas participantes poderão escolher uma das seguintes obras:",
    publisherLabel:"Editora",
    listenWork:"Ouvir a obra",
    menu:'Menu', contest:'O certame', participation:'Participação', program:'Programa',
    results:'Resultados', history:'História', news:'Notícias', faq:'Perguntas frequentes', territory:'La Sénia e o território',
    eyebrow:'LA SÉNIA · CATALUNHA', heroTitle:'A música move-nos.',
    heroSub:'Certame Internacional de Bandas de Música Vila de la Sénia',
    discover:'Descobre o certame ↗', join:'Participa ↗',
    introTitle:'Um palco para a música de banda.',
    introText:'La Sénia torna-se um ponto de encontro para bandas, maestros e público. Descobre a música, as pessoas e a história do Certame.',
    knowMore:'Conhece a nossa história →', exploreEyebrow:'DESCOBRE',
    exploreTitle:'Vive o Certame', tileJoin:'Regulamento e inscrições',
    tileProgram:'Atuações e horários', tileResults:'Prémios e classificações',
    tileHistory:'Edições anteriores', participateTitle:'A tua banda.<br>O nosso palco.',
    participateText:'Consulta o regulamento e prepara a participação da tua banda numa próxima edição.',
    contactJoin:'Pede informações ↗', programTitle:'Cada atuação, um momento único.',
    programText:'O programa da próxima edição será publicado aqui quando estiver disponível.',
    resultsTitle:'O talento deixa a sua marca.',
    resultsText:'Consulta os resultados oficiais e os prémios das edições do Certame.',
    historyTitle:'Uma história que continua a soar.',
    historyText:'Um espaço para descobrir as bandas participantes e os momentos das edições anteriores.',
    historyComingTitle:'A nossa história, edição após edição',
    historyComingText:'Estamos a trabalhar para recuperar e partilhar a história do Certame Internacional de Bandas de Música «Vila de la Sénia». Em breve, este espaço será ampliado com informações, fotografias e memórias das edições anteriores, valorizando o percurso do Certame e de todas as bandas que nele participaram.',
    resultsLatest:'Última edição',
    resultsAwarded:'Banda premiada',
    resultsAwardedPlural:'Bandas premiadas',
    resultsConductor:'Direção',
    resultsJury:'Júri',
    resultsMore:'Todas as edições, prémios e gravações →',
    newsCalendar:'Calendário da edição 2027',
    newsItem1Date:'Até 31 de dezembro de 2026 (12h00)',
    newsItem1Text:'Inscrições abertas para as bandas que pretendam participar no XIX Certame.',
    newsItem1Link:'Inscreva a sua banda →',
    newsItem2Date:'Antes de 22 de janeiro de 2027',
    newsItem2Text:'Notificação às bandas selecionadas provisoriamente (até 6).',
    newsItem3Date:'Antes de 29 de janeiro de 2027',
    newsItem3Text:'Formalização da inscrição: caução e documentação da banda.',
    newsItem4Date:'10 e 11 de abril de 2027',
    newsItem4Text:'XIX Certame na Casa da Cultura de la Sénia.',
    newsTitle:'Acompanha o ritmo do Certame.',
    newsText:'Aqui encontrarás as novidades e os anúncios das próximas edições.',
    footer:'Certame Internacional de Bandas de Música Vila de la Sénia'
  },
  gl: {
    mandatoryWorksTitle:"Obras obrigatorias",
    mandatoryWorksIntro:"As bandas participantes poderán escoller unha das seguintes obras:",
    publisherLabel:"Editorial",
    listenWork:"Escoitar a obra",
    menu:'Menú', contest:'O certame', participation:'Participación', program:'Programa',
    results:'Resultados', history:'Historia', news:'Actualidade', faq:'Preguntas frecuentes', territory:'La Sénia y el territorio',
    eyebrow:'LA SÉNIA · CATALUÑA', heroTitle:'A música móvenos.',
    heroSub:'Certame Internacional de Bandas de Música Vila de la Sénia',
    discover:'Descubre o certame ↗', join:'Participa ↗',
    introTitle:'Un escenario para a música de banda.',
    introText:'La Sénia convértese nun punto de encontro para bandas, directores e público. Descubre a música, as persoas e a historia do Certame.',
    knowMore:'Coñece a nosa historia →', exploreEyebrow:'DESCUBRE',
    exploreTitle:'Vive o Certame', tileJoin:'Bases e inscricións',
    tileProgram:'Actuacións e horarios', tileResults:'Premios e clasificacións',
    tileHistory:'Edicións anteriores', participateTitle:'A túa banda.<br>O noso escenario.',
    participateText:'Consulta as bases e prepara a participación da túa banda nunha próxima edición.',
    contactJoin:'Solicita información ↗', programTitle:'Cada actuación, un momento único.',
    programText:'O programa da próxima edición publicarase aquí cando estea dispoñible.',
    resultsTitle:'O talento deixa pegada.',
    resultsText:'Consulta os resultados oficiais e os recoñecementos das edicións do Certame.',
    historyTitle:'Unha historia que segue soando.',
    historyText:'Un espazo para descubrir as bandas participantes e os momentos das edicións anteriores.',
    historyComingTitle:'A nosa historia, edición a edición',
    historyComingText:'Estamos a traballar para recuperar e compartir a historia do Certame Internacional de Bandas de Música «Vila de la Sénia». Proximamente, este espazo irase ampliando con información, fotografías e lembranzas das edicións anteriores, para poñer en valor a traxectoria do Certame e de todas as bandas que formaron parte del.',
    resultsLatest:'Última edición',
    resultsAwarded:'Banda premiada',
    resultsAwardedPlural:'Bandas premiadas',
    resultsConductor:'Dirección',
    resultsJury:'Xurado',
    resultsMore:'Todas as edicións, premios e gravacións →',
    newsCalendar:'Calendario da edición 2027',
    newsItem1Date:'Ata o 31 de decembro de 2026 (12:00 h)',
    newsItem1Text:'Inscricións abertas para as bandas que queiran participar no XIX Certame.',
    newsItem1Link:'Inscribe a túa banda →',
    newsItem2Date:'Antes do 22 de xaneiro de 2027',
    newsItem2Text:'Notificación ás bandas seleccionadas provisionalmente (ata 6).',
    newsItem3Date:'Antes do 29 de xaneiro de 2027',
    newsItem3Text:'Formalización da inscrición: fianza e documentación da banda.',
    newsItem4Date:'10 e 11 de abril de 2027',
    newsItem4Text:'XIX Certame na Casa da Cultura de la Sénia.',
    newsTitle:'Segue o ritmo do Certame.',
    newsText:'Aquí atoparás as novidades e os anuncios das próximas edicións.',
    footer:'Certame Internacional de Bandas de Música Vila de la Sénia'
  }
};
function setLanguage(lang) {
    const dictionary = translations[lang];
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach((element) => {
        const key = element.dataset.i18n;
        const value = dictionary[key];
        if (value === undefined) return;

        // This heading intentionally contains a line break.
        if (key === 'participateTitle') {
            element.innerHTML = value;
        } else {
            element.textContent = value;
        }
    });

    document.querySelectorAll('[data-lang]').forEach((button) => {
        button.setAttribute('aria-pressed', String(button.dataset.lang === lang));
    });

    document.title = dictionary.footer;

    // Conservem l'idioma perquè les pàgines de formularis l'obrin en la mateixa llengua.
    try { localStorage.setItem('certamen-lang', lang); } catch (_) {}
}

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.nav');

document.querySelectorAll('[data-lang]').forEach((button) => {
    button.addEventListener('click', () => setLanguage(button.dataset.lang));
});

menuButton.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
});

navigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
        navigation.classList.remove('open');
        menuButton.setAttribute('aria-expanded', 'false');
    });
});


// Recuperem l'idioma seleccionat en una visita anterior o en una altra pàgina.
try {
    const savedLanguage = localStorage.getItem('certamen-lang');
    if (savedLanguage && translations[savedLanguage]) setLanguage(savedLanguage);
} catch (_) {}


// PORTADA · RESULTATS: mostra la darrera edició amb bandes premiades de data/historia.json.
// Quan s'afegeixi una edició nova amb el camp «premiades», la portada s'actualitza sola.
(function () {
    const card = document.getElementById('results-latest');
    if (!card) return;
    const currentLanguage = () => {
        try { const l = localStorage.getItem('certamen-lang'); return translations[l] ? l : 'ca'; } catch (_) { return 'ca'; }
    };
    let latest = null;

    function render() {
        if (!latest) return;
        const words = translations[currentLanguage()];
        const conductors = {};
        (latest.participants || []).forEach((group) => (group.bandes || []).forEach(([band, conductor]) => { conductors[band] = conductor; }));
        const bands = latest.premiades.flatMap((group) => group.bandes || []);
        card.querySelector('[data-results="edition"]').textContent = latest.romana + ' · ' + latest.any;
        card.querySelector('[data-results="awarded-label"]').textContent = bands.length > 1 ? words.resultsAwardedPlural : words.resultsAwarded;
        const list = card.querySelector('[data-results="bands"]');
        list.replaceChildren(...bands.map((item) => {
            const li = document.createElement('li');
            const name = document.createElement('strong');
            name.textContent = item.banda;
            li.append(name);
            if (item.premi) li.append(' · ' + item.premi);
            if (conductors[item.banda]) {
                const small = document.createElement('span');
                small.className = 'results-conductor';
                small.textContent = words.resultsConductor + ': ' + conductors[item.banda];
                li.append(small);
            }
            return li;
        }));
        const jury = latest.jurat || [];
        card.querySelector('[data-results="jury-row"]').hidden = !jury.length;
        card.querySelector('[data-results="jury"]').textContent = jury.join(', ');
        card.hidden = false;
    }

    fetch('data/historia.json')
        .then((response) => response.json())
        .then((editions) => {
            latest = editions
                .filter((e) => Array.isArray(e.premiades) && e.premiades.some((g) => (g.bandes || []).length))
                .sort((a, b) => b.any - a.any)[0] || null;
            render();
        })
        .catch(() => {});

    document.querySelectorAll('[data-lang]').forEach((button) => button.addEventListener('click', () => setTimeout(render, 0)));
})();

// PORTADA · ACTUALITAT: atenua les fites del calendari que ja han passat.
(function () {
    const now = Date.now();
    document.querySelectorAll('.news-item[data-until]').forEach((item) => {
        if (Date.parse(item.dataset.until) <= now) item.classList.add('is-past');
    });
})();
