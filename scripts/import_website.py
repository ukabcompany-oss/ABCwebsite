"""One-time recovery of the published Cloudflare deployment; no credentials needed."""
import concurrent.futures
import hashlib
import json
from pathlib import Path
from urllib.parse import quote
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[1]
MARKER = ROOT / '.website-import-complete'
SOURCE = 'https://abakersconfession.co.uk/'

def main():
    if MARKER.exists():
        print('Import already complete; preserving subsequent edits.')
        return
    inventory = json.loads((ROOT / 'scripts/import-inventory.json').read_text())
    def download(path):
        target = ROOT / path
        if not target.resolve().is_relative_to(ROOT):
            raise ValueError('Path escapes repository')
        error = None
        for _ in range(3):
            try:
                with urlopen(Request(SOURCE + quote(path), headers={'User-Agent': 'ABCWebsite-Import/1.0'}), timeout=60) as response:
                    data = response.read()
                expected = inventory['sha256'].get(path)
                if expected and hashlib.sha256(data).hexdigest() != expected:
                    raise ValueError('Published asset hash mismatch: ' + path)
                target.parent.mkdir(parents=True, exist_ok=True)
                target.write_bytes(data)
                return
            except Exception as exc:
                error = exc
        raise RuntimeError('Could not recover ' + path) from error
    with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool:
        list(pool.map(download, inventory['paths']))
    (ROOT / 'robots.txt').write_text(
        "# A Baker's Confession\nUser-agent: *\nAllow: /\n\n"
        'Sitemap: https://abakersconfession.co.uk/sitemap.xml\n'
    )
    pages = ['', 'about', 'package', 'menu', 'gallery', 'testimonial', 'contact', 'privacy-policy', 'terms-and-condition']
    entries = '\n'.join('  <url><loc>https://abakersconfession.co.uk/' + page + '</loc></url>' for page in pages)
    (ROOT / 'sitemap.xml').write_text(
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + entries + '\n</urlset>\n'
    )
    MARKER.write_text('Recovered 214 files from Cloudflare deployment 3b9191f1 on 2026-11-12.\n')
    print('Recovered all', len(inventory['paths']), 'files and updated crawl discovery.')

if __name__ == '__main__':
    main()
