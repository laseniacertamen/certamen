# Web del Certamen Internacional de Bandes de Música Vila de la Sénia

Web estàtica publicada amb GitHub Pages a **https://certamen.cat** (fitxer `CNAME`). No cal instal·lar res ni compilar: cada canvi que arriba a la branca `master` es publica automàticament en un o dos minuts.

Idiomes: CA · ES · GL · PT · EN. Totes les llengües comparteixen la mateixa URL i el text es canvia amb JavaScript; l'idioma triat es desa al navegador (`localStorage`).

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

- `css/estils.css`: estils generals. `css/historia.css` i `css/cookies.css`: estils específics.
- `js/idiomes.js`: selector d'idioma, textos del menú principal i enllaços a xarxes socials.
- `js/cookies.js`: avís de cookies. Google Analytics només es carrega si l'usuari ho accepta.

## Canvis habituals

**Textos.** Els elements traduïbles porten un atribut (`data-i18n`, `data-t`, `data-faq`…) amb una clau. El text de cada idioma és al fitxer JS de la pàgina (taula de dalt). Quan afegeixis una clau, afegeix-la a **les cinc llengües**: si en falta una, en canviar d'idioma es queda el text anterior.

**Menú principal.** És copiat a cada fitxer HTML: si hi afegeixes o treus un enllaç, fes-ho a totes les pàgines. Els textos del menú són a `js/idiomes.js`.

**Resultats de la portada.** Es generen sols a partir de `data/historia.json`: la portada mostra la darrera edició que tingui el camp `premiades` omplert (bandes, direcció i jurat).

**Calendari d'Actualitat (portada).** És a `index.html` (busca `ACTUALITAT`) i les traduccions a `js/script.js` (`newsItem…`). Cada fita té un `data-until`; quan la data passa, es mostra atenuada.

**Història.** Les dades de cada edició són a `data/historia.json`. `data/playlists-pendents.json` és material de treball per relacionar les llistes de YouTube amb les edicions.

**Edició 2027 i bases.** Dates i textos a `js/edicio-2027.js`. Els PDF de les bases són a `doc/` (un per idioma); els enllaços baixen automàticament el de l'idioma actiu.

**Logotips i imatges.** A `assets/`. El logo de la web és `logo-certamen-blanc.svg`; la icona de la pestanya, `favicon.svg` (amb `favicon.png` i `favicon_32.png` com a alternatives). La imatge que es mostra en compartir la web a les xarxes és `og-certamen-2027.jpg` (1200×630): cal renovar-la per a cada edició. Els patrocinadors són a `el-certamen.html` (busca `PATROCINADORS`).

**Pàgines noves.** Afegeix-les també a `sitemap.xml`, amb `canonical`, `description` i `og:url` propis.

## Formularis

Els formularis de contacte i d'inscripció envien les dades a dos scripts de Google Apps Script, configurats a `CONFIG` dins `js/formularis.js`:

- `contacteEndpoint` i `inscripcionsEndpoint`: URL de cada script.
- `inscripcionsObertes`: posa-ho a `false` per tancar les inscripcions. A més, el formulari només es mostra dins del termini definit a `dinsTermini` (ara, del 19/10/2026 al 31/12/2026 a les 12.00 h).

## Provar en local

Des de la carpeta del repositori:

```bash
python3 -m http.server 8000
```

i obre http://localhost:8000. Cal un servidor (no obrir l'HTML directament) perquè algunes pàgines carreguen `data/historia.json`. Per provar-ho al mòbil, afegeix `--bind 0.0.0.0` i obre `http://IP_DEL_PORTATIL:8000` des del mòbil connectat a la mateixa xarxa.
