"""Local dev server for the ePortfolio: the stdlib static server, plus no-cache headers.

python's http.server sends Last-Modified but no Cache-Control, so browsers keep serving
stale CSS and JS after an edit. This tells them to fetch every file fresh.

    python .claude/serve.py [port]
"""

import sys
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


class NoCacheHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 5173
    root = Path(__file__).resolve().parent.parent
    handler = partial(NoCacheHandler, directory=str(root))
    with ThreadingHTTPServer(("127.0.0.1", port), handler) as httpd:
        print(f"Serving {root} at http://localhost:{port} (no-cache)")
        httpd.serve_forever()
