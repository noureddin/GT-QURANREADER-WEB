// service-worker.js - الإصدار النهائي
const CACHE_NAME = 'quran-reader-v4.0';
const STATIC_FILES = [
    '/GT-QURANREADER-WEB/',
    '/GT-QURANREADER-WEB/index.html',
    '/GT-QURANREADER-WEB/style.css',  // ← غير من styles.css إلى style.css
    '/GT-QURANREADER-WEB/script.js',
    '/GT-QURANREADER-WEB/pwa.js',
    '/GT-QURANREADER-WEB/manifest.json',
    '/GT-QURANREADER-WEB/service-worker.js',
    '/GT-QURANREADER-WEB/icons/icon-128x128.png',
    '/GT-QURANREADER-WEB/icons/icon-512x512.png'
];

// التثبيت
self.addEventListener('install', (event) => {
    console.log('🔄 Service Worker: جاري التثبيت...');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('✅ فتح الذاكرة المؤقتة');
                return cache.addAll(STATIC_FILES);
            })
            .then(() => self.skipWaiting())
    );
});

// التفعيل
self.addEventListener('activate', (event) => {
    console.log('🔄 Service Worker: جاري التفعيل...');
    
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('🗑️ حذف الكاش القديم:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
        .then(() => self.clients.claim())
    );
});

// اعتراض الطلبات
self.addEventListener('fetch', (event) => {
    // للملفات المحلية فقط
    if (event.request.url.includes('/GT-QURANREADER-WEB/')) {
        event.respondWith(
            caches.match(event.request)
                .then(response => response || fetch(event.request))
        );
    }
});
