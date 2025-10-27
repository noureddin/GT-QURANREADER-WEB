// Service Worker for GT-QURANREADER PWA
const CACHE_NAME = 'quran-reader-pwa-v3.0';
const STATIC_CACHE = 'static-v3';
const DYNAMIC_CACHE = 'dynamic-v3';

// الملفات التي سيتم تخزينها في cache
const STATIC_FILES = [
    '/',
    '/index.html',
    '/style.css',
    '/script.js',
    '/pwa.js',
    '/manifest.json',
    '/icons/icon-192.png',
    '/icons/icon-512.png'
];

// الموارد الخارجية التي نريد cacheها
const EXTERNAL_RESOURCES = [
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
    'https://cdn.jsdelivr.net/gh/SalehGNUTUX/Quran-Data@main/pagesQuran.json',
    'https://cdn.jsdelivr.net/gh/SalehGNUTUX/Quran-Data@main/mainDataQuran.json'
];

// تثبيت Service Worker
self.addEventListener('install', (event) => {
    console.log('🔄 Service Worker: Installing...');
    
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then(cache => {
                console.log('✅ Service Worker: Caching static files');
                return cache.addAll(STATIC_FILES);
            })
            .then(() => {
                console.log('✅ Service Worker: Installed successfully');
                return self.skipWaiting();
            })
            .catch(error => {
                console.error('❌ Service Worker: Installation failed', error);
            })
    );
});

// تفعيل Service Worker
self.addEventListener('activate', (event) => {
    console.log('🔄 Service Worker: Activating...');
    
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== STATIC_CACHE && cache !== DYNAMIC_CACHE) {
                        console.log('🧹 Service Worker: Removing old cache', cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
        .then(() => {
            console.log('✅ Service Worker: Activated successfully');
            return self.clients.claim();
        })
    );
});

// اعتراض الطلبات
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);
    
    // استراتيجية Cache First للصور والصوت
    if (url.pathname.includes('/quran_image/') || url.pathname.includes('/audio/')) {
        event.respondWith(
            caches.match(event.request)
                .then(cachedResponse => {
                    // إرجاع البيانات من cache إذا كانت موجودة
                    if (cachedResponse) {
                        return cachedResponse;
                    }
                    
                    // إذا لم تكن في cache، جلب من الشبكة وتخزين في cache
                    return fetch(event.request)
                        .then(networkResponse => {
                            if (!networkResponse || networkResponse.status !== 200) {
                                return networkResponse;
                            }
                            
                            const responseToCache = networkResponse.clone();
                            caches.open(DYNAMIC_CACHE)
                                .then(cache => {
                                    cache.put(event.request, responseToCache);
                                });
                            
                            return networkResponse;
                        })
                        .catch(() => {
                            // إذا فشل التحميل، إرجاع صورة بديلة للصفحات
                            if (url.pathname.includes('/quran_image/')) {
                                return new Response(
                                    '<svg xmlns="http://www.w3.org/2000/svg" width="700" height="900" viewBox="0 0 700 900"><rect width="100%" height="100%" fill="#1a1a2e"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="24" fill="#e9ecef">تعذر تحميل الصفحة</text></svg>',
                                    {
                                        headers: { 'Content-Type': 'image/svg+xml' }
                                    }
                                );
                            }
                        });
                })
        );
    }
    // استراتيجية Network First للبيانات الديناميكية
    else if (url.pathname.includes('.json')) {
        event.respondWith(
            fetch(event.request)
                .then(networkResponse => {
                    if (networkResponse.ok) {
                        const responseToCache = networkResponse.clone();
                        caches.open(DYNAMIC_CACHE)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });
                    }
                    return networkResponse;
                })
                .catch(() => {
                    return caches.match(event.request);
                })
        );
    }
    // استراتيجية Cache First للملفات الثابتة
    else {
        event.respondWith(
            caches.match(event.request)
                .then(cachedResponse => {
                    return cachedResponse || fetch(event.request);
                })
        );
    }
});

// معالجة رسائل الـ sync
self.addEventListener('sync', (event) => {
    if (event.tag === 'background-sync') {
        console.log('🔄 Background sync triggered');
        event.waitUntil(doBackgroundSync());
    }
});

// مزامنة الخلفية
async function doBackgroundSync() {
    try {
        // تحديث البيانات المهمة في الخلفية
        const cache = await caches.open(DYNAMIC_CACHE);
        const urlsToUpdate = [
            'https://cdn.jsdelivr.net/gh/SalehGNUTUX/Quran-Data@main/pagesQuran.json',
            'https://cdn.jsdelivr.net/gh/SalehGNUTUX/Quran-Data@main/mainDataQuran.json'
        ];
        
        for (const url of urlsToUpdate) {
            try {
                const response = await fetch(url);
                if (response.ok) {
                    await cache.put(url, response);
                    console.log(`✅ Updated cache for: ${url}`);
                }
            } catch (error) {
                console.warn(`⚠️ Failed to update: ${url}`, error);
            }
        }
    } catch (error) {
        console.error('❌ Background sync failed', error);
    }
}

// معالجة دفع الإشعارات
self.addEventListener('push', (event) => {
    if (!event.data) return;
    
    const data = event.data.json();
    const options = {
        body: data.body || 'تحديث جديد متاح',
        icon: '/icons/icon-192.png',
        badge: '/icons/icon-192.png',
        vibrate: [100, 50, 100],
        data: {
            url: data.url || '/'
        }
    };
    
    event.waitUntil(
        self.registration.showNotification(data.title || 'GT-QURANREADER', options)
    );
});

// النقر على الإشعارات
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    
    event.waitUntil(
        clients.matchAll({ type: 'window' })
            .then(clientList => {
                for (const client of clientList) {
                    if (client.url === event.notification.data.url && 'focus' in client) {
                        return client.focus();
                    }
                }
                if (clients.openWindow) {
                    return clients.openWindow(event.notification.data.url);
                }
            })
    );
});
