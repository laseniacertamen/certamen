/* CERCADOR DE LA HISTÒRIA
   Busca bandes, directors, obres, autors i membres del jurat dins de data/historia.json,
   i permet filtrar per anys. Només es mostra a la llista d'edicions (no a la fitxa d'una edició).
   Els textos de les cinc llengües són a l'objecte T. */
(() => {
  const T = {
    ca: { label: 'Cerca a la història', ph: 'Banda, director, obra, autor o any…', type: 'Tipus', all: 'Tot', band: 'Bandes', director: 'Directors', work: 'Obres', author: 'Autors', jury: 'Jurat', from: 'Des de', to: 'Fins a', clear: 'Esborra', results: n => n === 1 ? '1 resultat' : n + ' resultats', editions: n => n === 1 ? '1 edició' : n + ' edicions', none: 'No hem trobat cap coincidència. Prova amb una altra paraula o amplia els anys.', one: { band: 'Banda', director: 'Director/a', work: 'Obra', author: 'Autor/a', jury: 'Jurat' }, dir: 'Dir.', by: 'Interpretada per', of: 'de', play: 'Obra', concert: 'Concert', jurymember: 'Membre del jurat', prize: ['1r premi', '2n premi', '1r premi ex aequo'], editionWord: 'edició' },
    es: { label: 'Busca en la historia', ph: 'Banda, director, obra, autor o año…', type: 'Tipo', all: 'Todo', band: 'Bandas', director: 'Directores', work: 'Obras', author: 'Autores', jury: 'Jurado', from: 'Desde', to: 'Hasta', clear: 'Borrar', results: n => n === 1 ? '1 resultado' : n + ' resultados', editions: n => n === 1 ? '1 edición' : n + ' ediciones', none: 'No hemos encontrado ninguna coincidencia. Prueba con otra palabra o amplía los años.', one: { band: 'Banda', director: 'Director/a', work: 'Obra', author: 'Autor/a', jury: 'Jurado' }, dir: 'Dir.', by: 'Interpretada por', of: 'de', play: 'Obra', concert: 'Concierto', jurymember: 'Miembro del jurado', prize: ['1.er premio', '2.º premio', '1.er premio ex aequo'], editionWord: 'edición' },
    gl: { label: 'Busca na historia', ph: 'Banda, director, obra, autor ou ano…', type: 'Tipo', all: 'Todo', band: 'Bandas', director: 'Directores', work: 'Obras', author: 'Autores', jury: 'Xurado', from: 'Desde', to: 'Ata', clear: 'Borrar', results: n => n === 1 ? '1 resultado' : n + ' resultados', editions: n => n === 1 ? '1 edición' : n + ' edicións', none: 'Non atopamos ningunha coincidencia. Proba con outra palabra ou amplía os anos.', one: { band: 'Banda', director: 'Director/a', work: 'Obra', author: 'Autor/a', jury: 'Xurado' }, dir: 'Dir.', by: 'Interpretada por', of: 'de', play: 'Obra', concert: 'Concerto', jurymember: 'Membro do xurado', prize: ['1.º premio', '2.º premio', '1.º premio ex aequo'], editionWord: 'edición' },
    pt: { label: 'Pesquisar na história', ph: 'Banda, maestro, obra, autor ou ano…', type: 'Tipo', all: 'Tudo', band: 'Bandas', director: 'Maestros', work: 'Obras', author: 'Autores', jury: 'Júri', from: 'De', to: 'Até', clear: 'Limpar', results: n => n === 1 ? '1 resultado' : n + ' resultados', editions: n => n === 1 ? '1 edição' : n + ' edições', none: 'Não encontrámos nenhuma correspondência. Experimente outra palavra ou alargue os anos.', one: { band: 'Banda', director: 'Maestro/a', work: 'Obra', author: 'Autor/a', jury: 'Júri' }, dir: 'Dir.', by: 'Interpretada por', of: 'de', play: 'Obra', concert: 'Concerto', jurymember: 'Membro do júri', prize: ['1.º prémio', '2.º prémio', '1.º prémio ex aequo'], editionWord: 'edição' },
    en: { label: 'Search the history', ph: 'Band, conductor, work, composer or year…', type: 'Type', all: 'All', band: 'Bands', director: 'Conductors', work: 'Works', author: 'Composers', jury: 'Jury', from: 'From', to: 'To', clear: 'Clear', results: n => n === 1 ? '1 result' : n + ' results', editions: n => n === 1 ? '1 edition' : n + ' editions', none: 'No matches found. Try another word or widen the years.', one: { band: 'Band', director: 'Conductor', work: 'Work', author: 'Composer', jury: 'Jury' }, dir: 'Cond.', by: 'Performed by', of: 'by', play: 'Work', concert: 'Concert', jurymember: 'Jury member', prize: ['1st prize', '2nd prize', 'Joint 1st prize'], editionWord: 'edition' }
  };
  const TYPES = ['band', 'director', 'work', 'author', 'jury'];

  const view = document.getElementById('history-view');
  if (!view) return;

  const lang = () => Certamen.lang();
  const t = () => T[lang()] || T.ca;
  // Normalitza per cercar sense accents, majúscules ni apòstrofs (l’Alcora = l'Alcora = lalcora).
  const norm = s => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[’'`´‘«»"“”]/g, '').replace(/\s+/g, ' ').trim();
  const el = (tag, cls, text) => { const n = document.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; };

  let editions = [];
  let index = []; // { type, name, sub, key, occ: Map(numero -> { any, notes:Set }) }

  function buildIndex(data) {
    const map = new Map();
    const add = (type, name, sub, e, note) => {
      if (!name) return;
      const key = type + '|' + norm(name) + '|' + norm(sub);
      let item = map.get(key);
      if (!item) { item = { type, name, sub: sub || '', key, search: norm(name + ' ' + (sub || '')), occ: new Map() }; map.set(key, item); }
      let o = item.occ.get(e.numero);
      if (!o) { o = { numero: e.numero, any: e.any, notes: new Set() }; item.occ.set(e.numero, o); }
      if (note) o.notes.add(JSON.stringify(note));
    };
    const directorsOf = c => c.directors || (c.director ? [c.director] : []);
    data.forEach(e => {
      (e.participants || []).forEach(g => (g.bandes || []).forEach(([banda, director]) => {
        add('band', banda, '', e, g.seccio ? ['sec', g.seccio] : null);
        if (director) { add('band', banda, '', e, ['dir', director]); add('director', director, '', e, ['band', banda]); }
      }));
      (e.premiades || []).forEach(g => (g.bandes || []).forEach(b => {
        const p = b.exaequo ? 2 : b.premi === 2 ? 1 : b.premi === 1 ? 0 : null;
        add('band', b.banda, '', e, p != null ? ['prize', p] : null);
      }));
      const concerts = (e.concerts || []).concat(e.concert && !(e.concerts || []).some(c => c.banda === e.concert.banda) ? [e.concert] : []);
      concerts.forEach(c => {
        add('band', c.banda, '', e, ['concert']);
        directorsOf(c).forEach(d => { add('band', c.banda, '', e, ['dir', d]); add('director', d, '', e, ['band', c.banda]); });
      });
      (e.concert_gravacions || []).forEach(r => add('band', r.banda, '', e, ['concert']));
      const work = (obra, autor, banda) => {
        if (!obra) return;
        add('work', obra, autor, e, banda ? ['by', banda] : null);
        if (autor) add('author', autor, '', e, ['work', obra]);
        if (banda) add('band', banda, '', e, ['play', obra]);
      };
      (e.gravacions || []).forEach(r => work(r.obra, r.compositor, r.banda));
      (e.programa || []).forEach(p => (p.obres || []).forEach(([obra, autor]) => work(obra, autor, p.banda)));
      (e.jurat || []).forEach(n => add('jury', n, '', e, ['jury']));
    });
    index = [...map.values()];
  }

  // ---------- Interfície ----------
  const panel = el('form', 'history-search');
  panel.setAttribute('role', 'search');
  panel.addEventListener('submit', ev => ev.preventDefault());
  const qLabel = el('label', 'history-search-main');
  const qText = el('span', 'history-search-label');
  const q = el('input'); q.type = 'search'; q.name = 'q'; q.autocomplete = 'off';
  qLabel.append(qText, q);
  const typeLabel = el('label'); const typeText = el('span', 'history-search-label'); const type = el('select'); type.name = 'tipus'; typeLabel.append(typeText, type);
  const fromLabel = el('label'); const fromText = el('span', 'history-search-label'); const from = el('select'); from.name = 'des'; fromLabel.append(fromText, from);
  const toLabel = el('label'); const toText = el('span', 'history-search-label'); const to = el('select'); to.name = 'fins'; toLabel.append(toText, to);
  const clear = el('button', 'history-search-clear'); clear.type = 'button';
  const filters = el('div', 'history-search-filters'); filters.append(typeLabel, fromLabel, toLabel, clear);
  panel.append(qLabel, filters);
  const status = el('p', 'history-search-status'); status.setAttribute('aria-live', 'polite');
  const results = el('div', 'history-results');
  view.before(panel, status, results);

  function years() { return editions.map(e => e.any); }
  function fillSelects() {
    const tx = t();
    qText.textContent = tx.label; q.placeholder = tx.ph;
    typeText.textContent = tx.type; fromText.textContent = tx.from; toText.textContent = tx.to; clear.textContent = tx.clear;
    const tv = type.value || 'all';
    type.replaceChildren(...['all', ...TYPES].map(k => { const o = el('option', null, tx[k]); o.value = k; return o; }));
    type.value = tv;
    const ys = years();
    [[from, ys[0]], [to, ys[ys.length - 1]]].forEach(([s, def]) => {
      const v = s.value || String(def);
      s.replaceChildren(...ys.map(y => { const o = el('option', null, String(y)); o.value = String(y); return o; }));
      s.value = ys.includes(Number(v)) ? v : String(def);
    });
  }

  function onEditionPage() {
    const id = Number(new URLSearchParams(location.search).get('edicio'));
    return !!id && editions.some(e => e.numero === id);
  }

  function saveState(active) {
    const p = new URLSearchParams(location.search);
    const ys = years();
    const set = (k, v, def) => { if (active && v && v !== def) p.set(k, v); else p.delete(k); };
    set('q', q.value.trim(), '');
    set('tipus', type.value, 'all');
    set('des', from.value, String(ys[0]));
    set('fins', to.value, String(ys[ys.length - 1]));
    const s = p.toString();
    history.replaceState(null, '', location.pathname + (s ? '?' + s : '') + location.hash);
  }

  function noteText(n, tx) {
    const [k, v] = n;
    if (k === 'sec') return v;
    if (k === 'prize') return tx.prize[v];
    if (k === 'dir') return tx.dir + ' ' + v;
    if (k === 'band') return v;
    if (k === 'by') return tx.by + ' ' + v;
    if (k === 'play') return tx.play + ': ' + v;
    if (k === 'work') return v;
    if (k === 'concert') return tx.concert;
    if (k === 'jury') return tx.jurymember;
    return '';
  }
  const NOTE_ORDER = ['concert', 'sec', 'prize', 'dir', 'band', 'by', 'play', 'work', 'jury'];

  function render() {
    if (!editions.length) return;
    if (onEditionPage()) { panel.hidden = status.hidden = results.hidden = true; return; }
    panel.hidden = status.hidden = false;
    const tx = t();
    let lo = Number(from.value), hi = Number(to.value);
    if (lo > hi) [lo, hi] = [hi, lo];
    const ys = years();
    const yearsActive = lo !== ys[0] || hi !== ys[ys.length - 1];
    let text = norm(q.value);
    // Un any escrit al quadre de text (p. ex. «2010») funciona com a filtre d'any.
    const yearInText = text.match(/(?:^|\s)((?:19|20)\d{2})(?=\s|$)/);
    let only = null;
    if (yearInText) { only = Number(yearInText[1]); text = text.replace(yearInText[1], '').trim(); }
    const typeVal = type.value;
    const inRange = y => y >= lo && y <= hi && (only == null || y === only);
    const active = !!(text || only != null || yearsActive || typeVal !== 'all');
    saveState(active);

    if (!active) { results.hidden = true; view.hidden = false; status.textContent = ''; return; }
    view.hidden = true; results.hidden = false;
    results.replaceChildren();

    // Només anys (o tipus sense text): mostra les edicions corresponents.
    if (!text && typeVal === 'all') {
      const eds = editions.filter(e => inRange(e.any)).slice().reverse();
      status.textContent = tx.editions(eds.length);
      if (!eds.length) { results.append(el('p', 'history-muted', tx.none)); return; }
      const grid = el('div', 'history-grid');
      eds.forEach(e => {
        const a = el('a', 'history-card'); a.href = 'historia.html?edicio=' + e.numero;
        a.append(el('strong', null, String(e.any)), el('span', null, e.romana + ' ' + (tx.editionWord.charAt(0).toUpperCase() + tx.editionWord.slice(1))));
        grid.append(a);
      });
      results.append(grid);
      return;
    }

    const tokens = text ? text.split(' ') : [];
    const found = index
      .filter(it => typeVal === 'all' || it.type === typeVal)
      .filter(it => tokens.every(tok => it.search.includes(tok)))
      .map(it => ({ it, occ: [...it.occ.values()].filter(o => inRange(o.any)).sort((a, b) => a.any - b.any) }))
      .filter(r => r.occ.length);
    const coll = new Intl.Collator(lang(), { sensitivity: 'base' });
    const startsWith = r => tokens.length && norm(r.it.name).startsWith(tokens[0]) ? 0 : 1;
    found.sort((a, b) => TYPES.indexOf(a.it.type) - TYPES.indexOf(b.it.type) || startsWith(a) - startsWith(b) || coll.compare(a.it.name, b.it.name));

    status.textContent = tx.results(found.length);
    if (!found.length) { results.append(el('p', 'history-muted', tx.none)); return; }

    found.forEach(({ it, occ }) => {
      const card = el('article', 'history-result');
      const head = el('div', 'history-result-head');
      head.append(el('strong', null, it.name), el('span', 'history-tag history-tag-' + it.type, tx.one[it.type]));
      card.append(head);
      if (it.sub) card.append(el('p', 'history-result-sub', tx.of + ' ' + it.sub));
      const ul = el('ul', 'history-result-years');
      occ.forEach(o => {
        const li = el('li');
        const a = el('a', null, String(o.any)); a.href = 'historia.html?edicio=' + o.numero;
        li.append(a);
        const notes = [...o.notes].map(s => JSON.parse(s))
          .sort((x, y) => NOTE_ORDER.indexOf(x[0]) - NOTE_ORDER.indexOf(y[0]))
          .map(n => noteText(n, tx)).filter(Boolean);
        if (notes.length) li.append(el('span', null, notes.join(' · ')));
        ul.append(li);
      });
      card.append(ul);
      results.append(card);
    });
  }

  let timer;
  q.addEventListener('input', () => { clearTimeout(timer); timer = setTimeout(render, 150); });
  [type, from, to].forEach(s => s.addEventListener('change', render));
  clear.addEventListener('click', () => {
    q.value = ''; type.value = 'all';
    const ys = years(); from.value = String(ys[0]); to.value = String(ys[ys.length - 1]);
    render(); q.focus();
  });
  Certamen.onLang(() => { if (editions.length) { fillSelects(); render(); } });

  fetch('data/historia.json').then(r => { if (!r.ok) throw Error('fetch'); return r.json(); }).then(data => {
    editions = data.slice().sort((a, b) => a.any - b.any);
    buildIndex(editions);
    const p = new URLSearchParams(location.search);
    fillSelects();
    q.value = p.get('q') || '';
    if (TYPES.includes(p.get('tipus'))) type.value = p.get('tipus');
    if (p.get('des') && years().includes(Number(p.get('des')))) from.value = p.get('des');
    if (p.get('fins') && years().includes(Number(p.get('fins')))) to.value = p.get('fins');
    render();
  }).catch(() => { panel.hidden = true; });
})();
