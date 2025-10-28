// service-worker.js
const CACHE_NAME = 'quran-reader-pwa-v3.2';
const STATIC_FILES = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    '/pwa.js',
    '/manifest.json',
    '/icons/icon-192.png',
    '/icons/icon-512.png'
];

// التثبيت
self.addEventListener('install', (event) => {
    console.log('🔄 Service Worker: جاري التثبيت...');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('✅ فتح الذاكرة المؤقتة:', CACHE_NAME);
                return cache.addAll(STATIC_FILES);
            })
            .then(() => {
                console.log('✅ جميع الملفات تم تخزينها');
                return self.skipWaiting();
            })
            .catch(error => {
                console.error('❌ خطأ في التثبيت:', error);
            })
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
        .then(() => {
            console.log('✅ Service Worker مفعل وجاهز');
            return self.clients.claim();
        })
    );
});

// اعتراض الطلبات
self.addEventListener('fetch', (event) => {
    const request = event.request;
    
    // استبعاد طلبات API الخارجية
    if (request.url.includes('api.alquran.cloud') ||
        request.url.includes('everyayah.com') ||
        request.url.includes('cdn.islamic.network')) {
        return; // دع الطلبات تمر مباشرة بدون تخزين
    }
    
    // للملفات المحلية فقط
    event.respondWith(
        caches.match(request)
            .then(response => {
                // إذا وجد في الكاش، أرجعها
                if (response) {
                    return response;
                }
                
                // إذا لم توجد، جلب من الشبكة
                return fetch(request)
                    .then(networkResponse => {
                        // لا تخزن ملفات خارجية
                        if (!request.url.startsWith('http')) {
                            return networkResponse;
                        }
                        
                        // تخزين الملفات المحلية فقط
                        const responseClone = networkResponse.clone();
                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(request, responseClone);
                            });
                        
                        return networkResponse;
                    })
                    .catch(() => {
                        // إذا فشل الاتصال، عرض صفحة بديلة للطلبات الرئيسية
                        if (request.destination === 'document') {
                            return caches.match('/index.html');
                        }
                        return new Response('لا يوجد اتصال بالإنترنت', {
                            status: 408,
                            headers: { 'Content-Type': 'text/plain' }
                        });
                    });
            })
    );
});

// استقبال الرسائل
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

console.log('✅ Service Worker تم تحميله بنجاح');
