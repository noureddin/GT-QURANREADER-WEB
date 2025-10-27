// PWA Service Worker Registration and Install Prompt
class PWAHelper {
    constructor() {
        this.deferredPrompt = null;
        this.installPrompt = document.getElementById('install-prompt');
        this.installBtn = document.getElementById('install-btn');
        this.cancelInstall = document.getElementById('cancel-install');
        this.pwaInstallBtn = document.getElementById('pwa-install');
        
        this.init();
    }

    init() {
        this.registerServiceWorker();
        this.setupInstallPrompt();
        this.setupAppInstalled();
        this.checkStandaloneMode();
    }

    // تسجيل Service Worker
    async registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            try {
                const registration = await navigator.serviceWorker.register('/service-worker.js', {
                    scope: '/'
                });
                console.log('✅ Service Worker registered successfully:', registration);
                
                // تحديث Service Worker عند وجود إصدار جديد
                registration.addEventListener('updatefound', () => {
                    const newWorker = registration.installing;
                    console.log('🔄 New Service Worker found...');
                    
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            console.log('🔄 New content is available; please refresh.');
                            this.showUpdateNotification();
                        }
                    });
                });
            } catch (error) {
                console.error('❌ Service Worker registration failed:', error);
            }
        }
    }

    // إعداد موجه التثبيت
    setupInstallPrompt() {
        // منع المواجه التلقائية في بعض المتصفحات
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            this.deferredPrompt = e;
            
            // إظهار زر التثبيت في الواجهة
            this.showInstallButton();
            
            // إظهار موجه التثبيت بعد تأخير
            setTimeout(() => {
                this.showInstallPrompt();
            }, 3000);
        });

        // معالجة زر التثبيت
        this.installBtn.addEventListener('click', () => {
            this.installApp();
        });

        // إلغاء التثبيت
        this.cancelInstall.addEventListener('click', () => {
            this.hideInstallPrompt();
        });

        // زر التثبيت في الواجهة العائمة
        if (this.pwaInstallBtn) {
            this.pwaInstallBtn.addEventListener('click', () => {
                this.showInstallPrompt();
            });
        }
    }

    // إظهار زر التثبيت في الواجهة العائمة
    showInstallButton() {
        if (this.pwaInstallBtn) {
            this.pwaInstallBtn.style.display = 'flex';
        }
    }

    // إظهار موجه التثبيت
    showInstallPrompt() {
        if (this.deferredPrompt && !this.isAppInstalled()) {
            this.installPrompt.style.display = 'block';
        }
    }

    // إخفاء موجه التثبيت
    hideInstallPrompt() {
        this.installPrompt.style.display = 'none';
    }

    // تثبيت التطبيق
    async installApp() {
        if (this.deferredPrompt) {
            this.deferredPrompt.prompt();
            const { outcome } = await this.deferredPrompt.userChoice;
            
            if (outcome === 'accepted') {
                console.log('✅ User accepted the install prompt');
                this.hideInstallPrompt();
                if (this.pwaInstallBtn) {
                    this.pwaInstallBtn.style.display = 'none';
                }
            } else {
                console.log('❌ User dismissed the install prompt');
            }
            
            this.deferredPrompt = null;
        }
    }

    // التحقق إذا كان التطبيق مثبتاً
    isAppInstalled() {
        return window.matchMedia('(display-mode: standalone)').matches ||
               window.navigator.standalone ||
               document.referrer.includes('android-app://');
    }

    // إعداد حدث التثبيت
    setupAppInstalled() {
        window.addEventListener('appinstalled', () => {
            console.log('🎉 PWA was installed successfully');
            this.deferredPrompt = null;
            this.hideInstallPrompt();
            if (this.pwaInstallBtn) {
                this.pwaInstallBtn.style.display = 'none';
            }
            
            // إظهار رسالة نجاح التثبيت
            this.showInstallSuccessMessage();
        });
    }

    // التحقق من وضع standalone
    checkStandaloneMode() {
        if (this.isAppInstalled()) {
            console.log('📱 App is running in standalone mode');
            document.body.classList.add('standalone-mode');
            
            // إخفاء زر التثبيت إذا كان التطبيق مثبتاً
            if (this.pwaInstallBtn) {
                this.pwaInstallBtn.style.display = 'none';
            }
        }
    }

    // إظهار رسالة نجاح التثبيت
    showInstallSuccessMessage() {
        const message = document.createElement('div');
        message.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--success-color);
            color: white;
            padding: 15px 25px;
            border-radius: var(--border-radius);
            box-shadow: var(--shadow-dark);
            z-index: 1003;
            font-weight: 500;
        `;
        message.innerHTML = '<i class="fas fa-check"></i> تم تثبيت التطبيق بنجاح!';
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.remove();
        }, 3000);
    }

    // إظهار إشعار التحديث
    showUpdateNotification() {
        const updateDiv = document.createElement('div');
        updateDiv.style.cssText = `
            position: fixed;
            bottom: 100px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--warning-color);
            color: white;
            padding: 15px 25px;
            border-radius: var(--border-radius);
            box-shadow: var(--shadow-dark);
            z-index: 1002;
            text-align: center;
            max-width: 300px;
        `;
        updateDiv.innerHTML = `
            <p><i class="fas fa-sync-alt"></i> يتوفر تحديث جديد</p>
            <button onclick="location.reload()" style="
                padding: 8px 16px;
                background: white;
                color: var(--warning-color);
                border: none;
                border-radius: var(--border-radius);
                cursor: pointer;
                margin-top: 10px;
                font-weight: bold;
            ">تحديث الآن</button>
        `;
        
        document.body.appendChild(updateDiv);
        
        // إزالة الإشعار بعد 10 ثواني
        setTimeout(() => {
            if (updateDiv.parentNode) {
                updateDiv.remove();
            }
        }, 10000);
    }

    // التحقق من دعم PWA
    static supportsPWA() {
        return 'serviceWorker' in navigator && 'BeforeInstallPromptEvent' in window;
    }

    // الحصول على حجم التخزين المستخدم
    async getStorageUsage() {
        if ('storage' in navigator && 'estimate' in navigator.storage) {
            const estimation = await navigator.storage.estimate();
            return {
                used: estimation.usage,
                quota: estimation.quota,
                percentage: (estimation.usage / estimation.quota * 100).toFixed(2)
            };
        }
        return null;
    }
}

// تهيئة PWA عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    if (PWAHelper.supportsPWA()) {
        new PWAHelper();
        console.log('🚀 PWA features enabled');
    } else {
        console.log('❌ PWA not supported in this browser');
    }
});
