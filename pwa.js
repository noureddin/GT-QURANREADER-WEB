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
            
           
