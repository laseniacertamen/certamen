#!/usr/bin/env python3
"""Genera la web publicada (carpeta _site/) amb una versió de cada pàgina per idioma.

    certamen.cat/            català (pàgines originals del repositori)
    certamen.cat/es/         castellà
    certamen.cat/gl/         gallec
    certamen.cat/pt/         portuguès
    certamen.cat/en/         anglès

Com funciona: obre cada pàgina del repositori en un navegador sense finestra (Chromium,
via Playwright), hi aplica l'idioma amb els mateixos scripts de la web i desa l'HTML
resultant, de manera que el text de cada idioma ja és dins de l'HTML i els cercadors el
poden indexar. També hi afegeix canonical, hreflang i un sitemap.xml amb tots els idiomes.

El fa servir el workflow de GitHub Actions (.github/workflows/pages.yml) a cada canvi a
master. Per generar-la en local:

    python3 -m pip install --user playwright && python3 -m playwright install chromium
    python3 tools/build.py          (cal Python 3.9 o posterior)
    cd _site && python3 -m http.server 8000
"""
import functools
import http.server
import shutil
import sys
import threading
from pathlib import Path
from xml.sax.saxutils import escape

from playwright.sync_api import sync_playwright

SITE_URL = 'https://certamen.cat/'
LANGS = ['ca', 'es', 'gl', 'pt', 'en']
DEFAULT_LANG = 'ca'
SRC = Path(__file__).resolve().parent.parent
OUT = SRC / '_site'
# Fitxers i carpetes del repositori que no es publiquen.
SKIP = {'.git', '.github', '.gitignore', 'tools', '_site', 'README.md'}


def page_url(lang, page):
    path = '' if page == 'index.html' else page
    return SITE_URL + ('' if lang == DEFAULT_LANG else lang + '/') + path


# S'executa dins del navegador, quan la pàgina ja està traduïda, abans de desar-la.
FINALIZE_JS = r"""
({lang, root, canonical, alternates, xdefault, caCanonical}) => {
  // Elements que els scripts tornen a crear en obrir la pàgina publicada.
  document.querySelectorAll('.cc-banner, .cc-overlay, .cc-footer-link, script[src*="googletagmanager"]').forEach(e => e.remove());
  document.querySelectorAll('script:not([src])').forEach(s => {
    if (/Certamen\.(header|footer)\(/.test(s.textContent)) s.remove();
  });
  // Comentaris antics sobre hreflang.
  const walker = document.createTreeWalker(document.head, NodeFilter.SHOW_COMMENT);
  const comments = []; while (walker.nextNode()) comments.push(walker.currentNode);
  comments.filter(c => c.data.includes('hreflang')).forEach(c => c.remove());

  const html = document.documentElement;
  html.lang = lang;
  html.setAttribute('data-generated', '');
  if (root) html.setAttribute('data-root', root); else html.removeAttribute('data-root');

  // Rutes relatives a recursos (assets/, css/, js/, doc/…): des de /es/ cal pujar un nivell.
  // Els enllaços a pàgines .html es mantenen dins de la carpeta del mateix idioma.
  if (root) {
    const external = /^(?:[a-z][a-z0-9+.-]*:|\/\/|\/|#)/i;
    document.querySelectorAll('[src], [href], [srcset]').forEach(el => {
      for (const attr of ['src', 'href']) {
        const v = el.getAttribute(attr);
        if (!v || external.test(v)) continue;
        const path = v.split(/[?#]/)[0];
        if (el.tagName === 'A' && /\.html$/i.test(path)) continue;
        el.setAttribute(attr, root + v);
      }
      if (el.hasAttribute('srcset')) {
        el.setAttribute('srcset', el.getAttribute('srcset').split(',').map(part => {
          const p = part.trim(); return external.test(p) ? p : root + p;
        }).join(', '));
      }
    });
  }

  // SEO: URL canònica, URL de xarxes socials i versions en altres idiomes.
  const setLink = (rel, href) => {
    let l = document.head.querySelector(`link[rel="${rel}"]:not([hreflang])`);
    if (!l) { l = document.createElement('link'); l.rel = rel; document.head.append(l); }
    l.href = href;
  };
  setLink('canonical', canonical);
  const ogUrl = document.head.querySelector('meta[property="og:url"]');
  if (ogUrl) ogUrl.setAttribute('content', canonical);
  const lm = document.head.querySelector('meta[name="language"]');
  if (lm) lm.setAttribute('content', lang);
  document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach(l => l.remove());
  const after = document.head.querySelector('link[rel="canonical"]');
  const links = Object.entries(alternates).map(([hl, href]) => [hl, href]).concat([['x-default', xdefault]]);
  links.reverse().forEach(([hl, href]) => {
    const l = document.createElement('link'); l.rel = 'alternate'; l.hreflang = hl; l.href = href;
    after.after(l);
  });
  document.head.querySelectorAll('script[type="application/ld+json"]').forEach(s => {
    s.textContent = s.textContent.split('"url": "' + caCanonical + '"').join('"url": "' + canonical + '"');
  });
}
"""


def serve(directory):
    class Quiet(http.server.SimpleHTTPRequestHandler):
        def log_message(self, *args):
            pass
    handler = functools.partial(Quiet, directory=str(directory))
    httpd = http.server.ThreadingHTTPServer(('127.0.0.1', 0), handler)
    threading.Thread(target=httpd.serve_forever, daemon=True).start()
    return httpd


def main():
    if OUT.exists():
        shutil.rmtree(OUT)
    OUT.mkdir()
    for item in SRC.iterdir():
        if item.name in SKIP:
            continue
        dest = OUT / item.name
        (shutil.copytree if item.is_dir() else shutil.copy2)(item, dest)

    pages = sorted(p.name for p in SRC.glob('*.html'))
    httpd = serve(SRC)
    base = f'http://127.0.0.1:{httpd.server_address[1]}/'
    errors = []

    with sync_playwright() as p:
        browser = p.chromium.launch(**({'executable_path': sys.argv[1]} if len(sys.argv) > 1 else {}))
        for lang in LANGS:
            context = browser.new_context()
            context.add_init_script(
                "window.CERTAMEN_BUILD_LANG = %r;"
                "try { localStorage.setItem('certamen-analytics-consent-v1', JSON.stringify({analytics:false})); } catch (e) {}" % lang)
            # Cap petició a fora del servidor local (Analytics, YouTube, mapes…).
            context.route('**/*', lambda route: route.continue_() if route.request.url.startswith(base) else route.abort())
            root = '' if lang == DEFAULT_LANG else '../'
            for page_name in pages:
                page = context.new_page()
                page.on('pageerror', lambda e, n=page_name, l=lang: errors.append(f'{l}/{n}: {e}'))
                page.goto(base + page_name, wait_until='networkidle')
                page.wait_for_timeout(200)
                page.evaluate(FINALIZE_JS, {
                    'lang': lang, 'root': root,
                    'canonical': page_url(lang, page_name),
                    'alternates': {l: page_url(l, page_name) for l in LANGS},
                    'xdefault': page_url(DEFAULT_LANG, page_name),
                    'caCanonical': page_url(DEFAULT_LANG, page_name),
                })
                target = OUT / ('' if lang == DEFAULT_LANG else lang) / page_name
                target.parent.mkdir(parents=True, exist_ok=True)
                target.write_text(page.content(), encoding='utf-8')
                page.close()
            context.close()
            print(f'{lang}: {len(pages)} pàgines')
        browser.close()
    httpd.shutdown()

    # Sitemap amb totes les versions de cada pàgina.
    lines = ['<?xml version="1.0" encoding="UTF-8"?>',
             '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">']
    for page_name in pages:
        for lang in LANGS:
            lines.append('  <url>')
            lines.append(f'    <loc>{escape(page_url(lang, page_name))}</loc>')
            for alt in LANGS:
                lines.append(f'    <xhtml:link rel="alternate" hreflang="{alt}" href="{escape(page_url(alt, page_name))}"/>')
            lines.append(f'    <xhtml:link rel="alternate" hreflang="x-default" href="{escape(page_url(DEFAULT_LANG, page_name))}"/>')
            lines.append('  </url>')
    lines.append('</urlset>')
    (OUT / 'sitemap.xml').write_text('\n'.join(lines) + '\n', encoding='utf-8')

    if errors:
        print('Errors de JavaScript durant la generació:', *errors, sep='\n  ')
        sys.exit(1)
    print(f'Fet: {len(pages) * len(LANGS)} pàgines a {OUT}')


if __name__ == '__main__':
    main()
