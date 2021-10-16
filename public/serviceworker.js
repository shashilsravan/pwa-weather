// defining our cache
const CACHE_NAME = 'version-0.1'
// passing urls to cache for our webpage in an array
const urlsToCache = ['index.html', 'offline.html']

// 1. installing service worker
const self = this // here this refers to that service worker
self.addEventListener('install', (e) => {
    // waiting untill cache is created
    e.waitUntil(
        // opening caches, open method returns a promise
        // so we can use .then and .catch
        caches.open(CACHE_NAME)
        .then((cache) => {
            return cache.addAll(urlsToCache)
        })
        .catch(err => console.log(err))
    )
})

// 2. Listening to requests
self.addEventListener('fetch', (e) => {
    // responsing to the fetch requests
    e.respondWith(
        // catches.match() also returns a promise 
        caches.match(e.request)
        .then(res => {
            // if it matches we fetch that event request
            return fetch(e.request)
            .catch(() => {
                // if there is any error fetching the requested cache
                // which is index.html in our case
                // then we will return to match with offline.html
                return caches.match('offline.html')
            })
        })
    )
})

// 3. Activating service workers 
// here we often going to have many versions of cache, so we dont want
// all of the previous caches being stored
self.addEventListener('activate', (e) => {
    // so we discard previous caches and push current cache

    const cacheWhitelist = [];
    cacheWhitelist.push(CACHE_NAME);

    e.waitUntil(
        caches.keys().then((cacheNames) => {
            // deleting caches which are not in the cacheWhitelist array
            Promise.all(cacheNames.map((cacheName) => {
                    if(!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                }
            ))
        })    
    )
})