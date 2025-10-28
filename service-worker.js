// Service Worker مبسط لـ GT-QURANREADER
const CACHE_NAME = 'quran-reader-pwa-v3.1';
const STATIC_FILES = [
    '/',
    '/index.html',
    '/styles.css',  // تم التصحيح من style.css إلى styles.css
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
                console.log('✅ فتح الذاكرة المؤقتة');
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
    const url = new URL(request.url);

    // استبعاد طلبات API والبيانات الديناميكية من التخزين المؤقت
    if (url.origin.includes('api.alquran.cloud') ||
        url.origin.includes('everyayah.com') ||
        url.origin.includes('cdn.islamic.network') ||
        url.origin.includes('quran-data')) {
        // استراتيجية Network First للبيانات الديناميكية
        event.respondWith(networkFirst(request));
        return;
    }

    // استراتيجية Cache First للملفات المحلية
    event.respondWith(cacheFirst(request));
});

// استراتيجية Cache First للملفات الثابتة
async function cacheFirst(request) {
    try {
        // محاولة جلب الملف من الكاش أولاً
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }

        // إذا لم يوجد في الكاش، جلب من الشبكة
        const networkResponse = await fetch(request);
        
        // تخزين في الكاش إذا كان الطلب ناجحاً
        if (networkResponse.status === 200) {
            const cache = await caches.open(CACHE_NAME);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        console.error('❌ خطأ في cacheFirst:', error);
        
        // عرض صفحة بديلة في حالة الخطأ
        if (request.destination === 'document') {
            return caches.match('/index.html');
        }
        
        return new Response('خطأ في الاتصال', {
            status: 408,
            headers: { 'Content-Type': 'text/plain' }
        });
    }
}

// استراتيجية Network First للبيانات الديناميكية
async function networkFirst(request) {
    try {
        // محاولة الجلب من الشبكة أولاً
        const networkResponse = await fetch(request);
        
        // تخزين في الكاش إذا كان الطلب ناجحاً
        if (networkResponse.status === 200) {
            const cache = await caches.open(CACHE_NAME);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        console.log('🌐 فشل الاتصال، جاري البحث في الكاش...');
        
        // إذا فشل الاتصال، البحث في الكاش
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        
        // إذا لم يوجد في الكاش، عرض رسالة خطأ
        return new Response(JSON.stringify({
            error: 'لا يوجد اتصال بالإنترنت',
            offline: true
        }), {
            status: 408,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

// استقبال الرسائل من التطبيق
self.addEventListener('message', (event) => {
    console.log('📨 Service Worker: استقبال رسالة', event.data);
    
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'GET_VERSION') {
        event.ports[0].postMessage({
            version: '3.1',
            cache: CACHE_NAME
        });
    }
});

// معالجة التحديثات في الخلفية
self.addEventListener('sync', (event) => {
    console.log('🔄 Service Worker: مزامنة في الخلفية', event.tag);
    
    if (event.tag === 'background-sync') {
        event.waitUntil(doBackgroundSync());
    }
});

async function doBackgroundSync() {
    try {
        // مزامنة البيانات في الخلفية
        console.log('🔄 جاري المزامنة في الخلفية...');
        // يمكن إضافة منطق المزامنة هنا
    } catch (error) {
        console.error('❌ خطأ في المزامنة:', error);
    }
}

// معالجة الإشعارات
self.addEventListener('push', (event) => {
    console.log('🔔 Service Worker: استقبال إشعار');
    
    if (!event.data) return;
    
    const data = event.data.json();
    const options = {
        body: data.body || 'تحديث جديد للتطبيق',
        icon: '/icons/icon-192.png',
        badge: '/icons/icon-192.png',
        vibrate: [100, 50, 100],
        data: {
            url: data.url || '/'
        }
    };
    
    event.waitUntil(
        self.registration.showNotification(data.title || 'GT Quran Reader', options)
    );
});

// النقر على الإشعارات
self.addEventListener('notificationclick', (event) => {
    console.log('👆 النقر على الإشعار');
    
    event.notification.close();
    
    event.waitUntil(
        clients.matchAll({ type: 'window' }).then(clientList => {
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

console.log('✅ Service Worker تم تحميله بنجاح');
