var cacheName='petstore-v1';
var cacheFiles=[
'index.html',
'subject.js',
'stylesheet.css','petstore.webmanifest',
'Images/Chemistry.png'
 ,'Images/image copy 3.png', 'Images/image copy 4.png', 'Images/image copy 5.png', 
 'Images/image copy 6.png',
  'Images/image copy 7.png',
   'Images/image copy 8.png',
    'Images/image copy 9.png', 
    'Images/image copy 10.png'
    , 'Images/image copy.png'
     ,'Images/image.png'
];

self.addEventListener('install',(e)=> {
    console.log('[Service Worker] Install');
    e.waitUntill(
        caches.open(cacheName).then((caches)=>{
            console.log('[Service Worker] Caching all the files');
            return caches.addAll(cacheFiles);
        })
    );
});

self.addEventListener('fetch', function(e) {
    e.respondWith(
        caches.match(e.request).then(function(r) {
            return r || fetch(e.request).then(function(response) {
                return caches.open(cacheName).then(function(cache) {
                    cache.put(e.request, response.clone());
                    return response;
                });
            });
        })
    );
});
