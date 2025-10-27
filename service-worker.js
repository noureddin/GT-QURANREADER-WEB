// Service Worker مبسط لـ GT-QURANREADER
const CACHE_NAME = 'quran-reader-pwa-v1';
const STATIC_FILES = [
    '/',
    '/index.html',
    '/style.css',
    '/script.js',
    '/pwa.js',
    '/manifest.json'
];

// التثبيت
self.addEventListener('install', (event) => {
    console.log('🔄 Service Worker: Installing...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(STATIC_FILES))
            .then(() => self.skipWaiting())
    );
});

// التف
