const HOSTNAME_WHITELIST = [
    self.location.hostname,
    'fonts.gstatic.com',
    'fonts.googleapis.com',
    'cdn.jsdelivr.net'
  ];
  
  // The Util Function to hack URLs of intercepted requests
  const getFixedUrl = (req) => {
    var now = Date.now();
    var url = new URL(req.url);
  
    // 1. fixed http URL
    // Just keep syncing with location.protocol
    // fetch(httpURL) belongs to active mixed content.
    // And fetch(httpRequest) is not supported yet.
    url.protocol = self.location.protocol;
  
    // 2. add query for caching-busting.
    // Github Pages served with Cache-Control: max-age=600
    // max-age on mutable content is error-prone, with SW life of bugs can even extend.
    // Until cache mode of Fetch API landed, we have to workaround cache-busting with query string.
    // Cache-Control-Bug: https://bugs.chromium.org/p/chromium/issues/detail?id=453190
    if (url.hostname === self.location.hostname) {
      url.search += (url.search ? '&' : '?') + 'cache-bust=' + now;
    }
    return url.href;
  };
  
  self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('pwa-cache').then((cache) => {
        return cache.addAll([
          'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js',
          'https://cdn.jsdelivr.net/gh/lit/dist@3.0.0/all/lit-all.min.js.map',
        ]);
      })
    );
  });
  
  self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
  });
  
  self.addEventListener('fetch', (event) => {
    if (HOSTNAME_WHITELIST.indexOf(new URL(event.request.url).hostname) > -1) {
      const cached = caches.match(event.request);
      const fixedUrl = getFixedUrl(event.request);
      const fetched = fetch(fixedUrl, { cache: 'no-store' });
      const fetchedCopy = fetched.then((resp) => resp.clone());
  
      event.respondWith(
        Promise.race([fetched.catch((_) => cached), cached])
          .then((resp) => resp || fetched)
          .catch((_) => {
            /* eat any errors */
          })
      );
  
      event.waitUntil(
        Promise.all([fetchedCopy, caches.open('pwa-cache')])
          .then(([response, cache]) => {
            if (response.ok) {
              cache.put(event.request, response.clone());
            }
          })
          .catch((_) => {
            /* eat any errors */
          })
      );
    }
  });
  