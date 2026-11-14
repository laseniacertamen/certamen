# Web del Certamen Internacional de Bandes de Música Vila de la Sénia

Web estàtica publicada amb GitHub Pages a **https://certamen.cat**. Cada canvi que arriba a la branca `master` es publica automàticament en uns minuts (pestanya **Actions** del repositori).

## Idiomes i publicació

Idiomes: CA · ES · GL · PT · EN. Cada idioma té les seves adreces, perquè els cercadors els indexin tots:

| Idioma | Adreça |
|---|---|
| Català | `certamen.cat/`, `certamen.cat/faq.html`… |
| Castellà | `certamen.cat/es/`, `certamen.cat/es/faq.html`… |
| Gallec, portuguès, anglès | `/gl/`, `/pt/`, `/en/` |

**Només s'editen les pàgines del repositori** (en català, amb les traduccions als fitxers JS). Les versions dels altres idiomes no són al repositori: les genera `tools/build.py` a cada publicació. El workflow `.github/workflows/pages.yml` obre cada pàgina en un navegador sense finestra, hi aplica cada idioma amb els mateixos scripts de la web i desa l'HTML ja traduït a `/es/`, `/gl/`… També hi afegeix les etiquetes `canonical` i `hreflang` i genera el `sitemap.xml` amb tots els idiomes.

Si una publicació falla (per exemple, per un error de JavaScript en alguna pàgina), surt marcada en vermell a la pestanya **Actions** i la web continua com estava.

En les pàgines publicades, el selector d'idioma porta a la mateixa pàgina en l'altre idioma i desa la preferència al navegador (`localStorage`, clau `certamen-lang`). Qui té una preferència desada i entra des de fora a una pàgina en català va directament a la del seu idioma.

## Pàgines

| Fitxer | Contingut | Traduccions i interaccions |
|---|---|---|
| `index.html` | Portada: edició 2027, participació, resultats, història, actualitat | `js/script.js`, `js/edicio-2027.js` |
| `el-certamen.html` | Història, organització i patrocinadors | `js/el-certamen.js` |
| `inscripcions.html` | Informació i formulari d'inscripció | `js/formularis.js`, `js/formularis-traduccions.js`, `js/edicio-2027.js` |
| `programa.html` | Programa i obres obligades | `js/script.js`, `js/edicio-2027.js` |
| `historia.html` | Totes les edicions, premis, jurats i enregistraments, amb cercador | `js/historia.js`, `js/historia-cercador.js`, `data/historia.json` |
| `territori.html` | La Sénia i el territori | `js/territori.js` |
| `faq.html` | Preguntes freqüents | `js/faq.js` |
| `contacte.html` | Formulari de contacte | `js/formularis.js`, `js/formularis-traduccions.js` |
| `politica-privacitat.html`, `politica-cookies.html` | Textos legals | inline |
| `cert/index.html` | Redirecció de l'adreça antiga `/cert/` cap a la portada (`noindex`) | — |

Fitxers comuns a totes les pàgines:

- `js/comu.js`: es carrega el primer a totes les pàgines. Genera la **capçalera** (logo, menú, xarxes socials i selector d'idioma) i el **peu**, fa funcionar el botó «Menú» del mòbil i gestiona l'**idioma** de tota la web.
- `css/estils.css`: estils generals. `css/historia.css` i `css/cookies.css`: estils específics.
- `js/cookies.js`: avís de cookies. Google Analytics només es carrega si l'usuari ho accepta.

## Canvis habituals

**Textos.** Els elements traduïbles porten un atribut (`data-i18n`, `data-t`, `data-faq`…) amb una clau. El text de cada idioma és al fitxer JS de la pàgina (taula de dalt). Quan afegeixis una clau, afegeix-la a **les cinc llengües**: si en falta una, en canviar d'idioma es queda el text anterior.

**Títol i descripció de cada pàgina.** Són al `<head>` de cada HTML, a l'objecte `seo` (un títol i una descripció per idioma). Les etiquetes `<title>` i `meta description` del mateix `<head>` han de coincidir amb la versió catalana.

**Menú principal i peu.** Es generen des de `js/comu.js` (llista `NAV` i textos `TEXTS`): un canvi allà s'aplica a totes les pàgines. Cada HTML només hi té `<script>Certamen.header('clau')</script>`, on la clau marca la pàgina actual al menú, i `<script>Certamen.footer()</script>`.

**Scripts nous que depenguin de l'idioma.** No llegeixis `localStorage` ni escoltis els botons d'idioma: fes servir `Certamen.onLang(function (lang) { … })`, que s'executa quan la pàgina està llesta i a cada canvi d'idioma, i `Certamen.lang()` per saber l'idioma actual.

**Resultats de la portada.** Es generen sols a partir de `data/historia.json`: la portada mostra la darrera edició que tingui el camp `premiades` omplert (bandes, direcció i jurat).

**Calendari d'Actualitat (portada).** És a `index.html` (busca `ACTUALITAT`) i les traduccions a `js/script.js` (`newsItem…`). Cada fita té un `data-until`; quan la data passa, es mostra atenuada.

**Història.** Les dades de cada edició són a `data/historia.json`. `data/playlists-pendents.json` és material de treball per relacionar les llistes de YouTube amb les edicions.

**Edició 2027 i bases.** Dates i textos a `js/edicio-2027.js`. Els PDF de les bases són a `doc/` (un per idioma); els enllaços baixen automàticament el de l'idioma actiu.

**Logotips i imatges.** A `assets/`. El logo de la web és `logo-certamen-blanc.svg`; la icona de la pestanya, `favicon.svg` (amb `favicon.png` i `favicon_32.png` com a alternatives). La imatge que es mostra en compartir la web a les xarxes és `og-certamen-2027.jpg` (1200×630): cal renovar-la per a cada edició. Els patrocinadors són a `el-certamen.html` (busca `PATROCINADORS`).

**Pàgines noves.** Copia l'estructura d'una pàgina existent (amb `js/comu.js` al `<head>`, `Certamen.header(...)` i `Certamen.footer()`), amb `canonical`, `description`, `og:url` i objecte `seo` propis, i afegeix-la a `NAV` si ha de sortir al menú. Les versions en els altres idiomes i el `sitemap.xml` es generen soles.

**Rutes a recursos des dels scripts.** Les pàgines dels altres idiomes són a una subcarpeta (`/es/`…). Si un script carrega un fitxer o crea un enllaç a `assets/`, `data/` o `doc/`, fes servir `Certamen.url('data/…')`, que hi afegeix el `../` quan cal.

## Formularis

Els formularis de contacte i d'inscripció envien les dades a dos scripts de Google Apps Script, configurats a `CONFIG` dins `js/formularis.js`:

- `contacteEndpoint` i `inscripcionsEndpoint`: URL de cada script.
- `inscripcionsObertes`: posa-ho a `false` per tancar les inscripcions. A més, el formulari només es mostra dins del termini definit a `dinsTermini` (ara, del 19/10/2026 al 31/12/2026 a les 12.00 h).

## Provar en local

Des de la carpeta del repositori:

```bash
python3 -m http.server 8000
```

i obre http://localhost:8000. Aquí el selector d'idioma canvia el text de la mateixa pàgina (no hi ha carpetes `/es/`…), cosa suficient per revisar textos i traduccions.

Per veure exactament el que es publicarà, amb les carpetes de cada idioma:

```bash
pip install playwright && python3 -m playwright install chromium   # només el primer cop
python3 tools/build.py
python3 -m http.server 8000 -d _site
```

La carpeta `_site/` és temporal i no es puja al repositori.

En tots dos casos cal un servidor (no obrir l'HTML directament) perquè algunes pàgines carreguen `data/historia.json`. Per provar-ho al mòbil, afegeix `--bind 0.0.0.0` i obre `http://IP_DEL_PORTATIL:8000` des del mòbil connectat a la mateixa xarxa.
