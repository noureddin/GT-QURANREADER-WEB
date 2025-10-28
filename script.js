// بيانات الصفحات المدمجة
const EMBEDDED_PAGES_DATA = [
    {
        "page": 1,
        "start": {
            "surah_number": 1,
            "name": {"ar": "الفاتحة"},
            "juz": 1
        },
        "end": {
            "surah_number": 1,
            "name": {"ar": "الفاتحة"}
        }
    },
    {
        "page": 2,
        "start": {
            "surah_number": 2,
            "name": {"ar": "البقرة"},
            "juz": 1
        },
        "end": {
            "surah_number": 2,
            "name": {"ar": "البقرة"}
        }
    },
    {
        "page": 604,
        "start": {
            "surah_number": 114,
            "name": {"ar": "الناس"},
            "juz": 30
        },
        "end": {
            "surah_number": 114,
            "name": {"ar": "الناس"}
        }
    }
];

// بيانات السور المدمجة
const EMBEDDED_SURAHS_DATA = [
    {
        "number": 1,
        "name": {
            "ar": "الفاتحة",
            "en": "Al-Fatiha",
            "transliteration": "Al-Fatihah"
        },
        "verses_count": 7,
        "revelation_place": {"ar": "مكية"},
        "verses": [
            {
                "number": 1,
                "text": {"ar": "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ"},
                "page": 1,
                "sajda": false
            },
            {
                "number": 2,
                "text": {"ar": "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ"},
                "page": 1,
                "sajda": false
            },
            {
                "number": 3,
                "text": {"ar": "الرَّحْمَٰنِ الرَّحِيمِ"},
                "page": 1,
                "sajda": false
            },
            {
                "number": 4,
                "text": {"ar": "مَالِكِ يَوْمِ الدِّينِ"},
                "page": 1,
                "sajda": false
            },
            {
                "number": 5,
                "text": {"ar": "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ"},
                "page": 1,
                "sajda": false
            },
            {
                "number": 6,
                "text": {"ar": "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ"},
                "page": 1,
                "sajda": false
            },
            {
                "number": 7,
                "text": {"ar": "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ"},
                "page": 1,
                "sajda": false
            }
        ]
    },
    {
        "number": 2,
        "name": {
            "ar": "البقرة",
            "en": "Al-Baqarah",
            "transliteration": "Al-Baqarah"
        },
        "verses_count": 286,
        "revelation_place": {"ar": "مدنية"},
        "verses": [
            {
                "number": 1,
                "text": {"ar": "الم"},
                "page": 2,
                "sajda": false
            },
            {
                "number": 2,
                "text": {"ar": "ذَٰلِكَ الْكِتَابُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِّلْمُتَّقِينَ"},
                "page": 2,
                "sajda": false
            }
        ]
    },
    {
        "number": 112,
        "name": {
            "ar": "الإخلاص",
            "en": "Al-Ikhlas",
            "transliteration": "Al-Ikhlas"
        },
        "verses_count": 4,
        "revelation_place": {"ar": "مكية"},
        "verses": [
            {
                "number": 1,
                "text": {"ar": "قُلْ هُوَ اللَّهُ أَحَدٌ"},
                "page": 604,
                "sajda": false
            },
            {
                "number": 2,
                "text": {"ar": "اللَّهُ الصَّمَدُ"},
                "page": 604,
                "sajda": false
            },
            {
                "number": 3,
                "text": {"ar": "لَمْ يَلِدْ وَلَمْ يُولَدْ"},
                "page": 604,
                "sajda": false
            },
            {
                "number": 4,
                "text": {"ar": "وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ"},
                "page": 604,
                "sajda": false
            }
        ]
    },
    {
        "number": 113,
        "name": {
            "ar": "الفلق",
            "en": "Al-Falaq",
            "transliteration": "Al-Falaq"
        },
        "verses_count": 5,
        "revelation_place": {"ar": "مكية"},
        "verses": [
            {
                "number": 1,
                "text": {"ar": "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ"},
                "page": 604,
                "sajda": false
            },
            {
                "number": 2,
                "text": {"ar": "مِن شَرِّ مَا خَلَقَ"},
                "page": 604,
                "sajda": false
            },
            {
                "number": 3,
                "text": {"ar": "وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ"},
                "page": 604,
                "sajda": false
            },
            {
                "number": 4,
                "text": {"ar": "وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ"},
                "page": 604,
                "sajda": false
            },
            {
                "number": 5,
                "text": {"ar": "وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ"},
                "page": 604,
                "sajda": false
            }
        ]
    },
    {
        "number": 114,
        "name": {
            "ar": "الناس",
            "en": "An-Nas",
            "transliteration": "An-Nas"
        },
        "verses_count": 6,
        "revelation_place": {"ar": "مكية"},
        "verses": [
            {
                "number": 1,
                "text": {"ar": "قُلْ أَعُوذُ بِرَبِّ النَّاسِ"},
                "page": 604,
                "sajda": false
            },
            {
                "number": 2,
                "text": {"ar": "مَلِكِ النَّاسِ"},
                "page": 604,
                "sajda": false
            },
            {
                "number": 3,
                "text": {"ar": "إِلَٰهِ النَّاسِ"},
                "page": 604,
                "sajda": false
            },
            {
                "number": 4,
                "text": {"ar": "مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ"},
                "page": 604,
                "sajda": false
            },
            {
                "number": 5,
                "text": {"ar": "الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ"},
                "page": 604,
                "sajda": false
            },
            {
                "number": 6,
                "text": {"ar": "مِنَ الْجِنَّةِ وَالنَّاسِ"},
                "page": 604,
                "sajda": false
            }
        ]
    }
];

class QuranDataManager {
    constructor() {
        this.baseURL = 'https://api.alquran.cloud/v1';
        this.cache = new Map();
    }

    async loadData(type, params = {}) {
        const cacheKey = `${type}-${JSON.stringify(params)}`;
        
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }

        try {
            switch(type) {
                case 'pages':
                    return await this.loadPagesData();
                case 'surahs':
                    return await this.loadSurahsData();
                case 'quran_text':
                    return await this.loadQuranText();
                case 'audio':
                    return await this.loadAudioData(params.surah);
                default:
                    throw new Error(`نوع غير معروف: ${type}`);
            }
        } catch (error) {
            console.error(`❌ فشل تحميل ${type}:`, error);
            return this.getEmbeddedData(type);
        }
    }

    async loadPagesData() {
        // استخدام API لتحميل بيانات الصفحات
        try {
            const response = await fetch(`${this.baseURL}/meta`);
            const data = await response.json();
            
            if (data.code === 200) {
                return this.formatPagesData(data.data);
            }
        } catch (error) {
            console.log('🔄 استخدام بيانات الصفحات المدمجة');
        }
        
        return this.generatePagesData();
    }

    async loadSurahsData() {
        try {
            const response = await fetch(`${this.baseURL}/surah`);
            const data = await response.json();
            
            if (data.code === 200) {
                return data.data;
            }
        } catch (error) {
            console.log('🔄 استخدام بيانات السور المدمجة');
        }
        
        return EMBEDDED_SURAHS_DATA;
    }

    async loadQuranText() {
        try {
            // تحميل القرآن كامل بنص عثماني
            const response = await fetch(`${this.baseURL}/quran/quran-uthmani`);
            const data = await response.json();
            
            if (data.code === 200) {
                return data.data;
            }
        } catch (error) {
            console.log('❌ فشل تحميل نص القرآن');
        }
        return null;
    }

    async loadAudioData(surahNumber) {
        try {
            // تحميل معلومات السورة الصوتية
            const response = await fetch(`${this.baseURL}/surah/${surahNumber}/ar.alafasy`);
            const data = await response.json();
            
            if (data.code === 200) {
                return this.formatAudioData(data.data);
            }
        } catch (error) {
            console.log('🔄 استخدام رابط صوتي مباشر');
        }
        
        // رابط بديل مباشر
        return [{
            link: `https://cdn.islamic.network/quran/audio/128/ar.abdulbasitmurattal/${surahNumber.toString().padStart(3, '0')}.mp3`,
            name: 'عبد الباسط عبد الصمد'
        }];
    }

    formatPagesData(metaData) {
        // توليد بيانات الصفحات من البيانات الوصفية
        const pages = [];
        for (let page = 1; page <= 604; page++) {
            pages.push({
                page: page,
                start: {
                    surah_number: this.calculateSurahFromPage(page),
                    name: { ar: this.getSurahName(this.calculateSurahFromPage(page)) },
                    juz: Math.ceil(page / 20)
                },
                end: {
                    surah_number: this.calculateSurahFromPage(page),
                    name: { ar: this.getSurahName(this.calculateSurahFromPage(page)) }
                }
            });
        }
        return pages;
    }

    formatAudioData(surahData) {
        if (surahData.ayahs && surahData.ayahs.length > 0) {
            return surahData.ayahs.map(ayah => ({
                link: ayah.audio,
                name: 'مشاري العفاسي'
            }));
        }
        return [];
    }

    getPageImageUrl(page) {
        // استخدام مصادر متعددة للصور
        return `https://everyayah.com/data/images_png/${page}.png`;
    }

    getSurahAudioUrl(surahNumber) {
        // رابط صوتي مباشر من المصدر
        return `https://api.alquran.cloud/v1/surah/${surahNumber}/ar.alafasy`;
    }

    // الدوال المساعدة
    calculateSurahFromPage(page) {
        const surahPages = {
            1: 1, 2: 2, 50: 3, 77: 4, 106: 5, 128: 6, 151: 7, 177: 8,
            187: 9, 208: 10, 221: 11, 235: 12, 249: 13, 255: 14, 262: 15,
            267: 16, 282: 17, 293: 18, 305: 19, 312: 20, 322: 21, 332: 22,
            342: 23, 350: 24, 359: 25, 367: 26, 377: 27, 385: 28, 396: 29,
            404: 30, 411: 31, 415: 32, 418: 33, 428: 34, 434: 35, 440: 36,
            446: 37, 453: 38, 458: 39, 467: 40, 477: 41, 483: 42, 489: 43,
            496: 44, 499: 45, 502: 46, 507: 47, 511: 48, 515: 49, 518: 50,
            520: 51, 523: 52, 526: 53, 528: 54, 531: 55, 534: 56, 537: 57,
            542: 58, 545: 59, 549: 60, 551: 61, 553: 62, 554: 63, 556: 64,
            558: 65, 560: 66, 562: 67, 564: 68, 566: 69, 568: 70, 570: 71,
            572: 72, 574: 73, 575: 74, 577: 75, 578: 76, 580: 77, 582: 78,
            583: 79, 585: 80, 586: 81, 587: 82, 587: 83, 589: 84, 590: 85,
            591: 86, 591: 87, 592: 88, 593: 89, 594: 90, 595: 91, 595: 92,
            596: 93, 596: 94, 597: 95, 597: 96, 598: 97, 598: 98, 599: 99,
            599: 100, 600: 101, 600: 102, 601: 103, 601: 104, 602: 105,
            602: 106, 603: 107, 603: 108, 603: 109, 604: 110, 604: 111,
            604: 112, 604: 113, 604: 114
        };
        
        for (let startPage in surahPages) {
            if (page >= startPage) {
                return surahPages[startPage];
            }
        }
        return 1;
    }

    getSurahName(surahNumber) {
        const surahNames = {
            1: "الفاتحة", 2: "البقرة", 3: "آل عمران", 4: "النساء", 5: "المائدة",
            6: "الأنعام", 7: "الأعراف", 8: "الأنفال", 9: "التوبة", 10: "يونس",
            11: "هود", 12: "يوسف", 13: "الرعد", 14: "إبراهيم", 15: "الحجر",
            16: "النحل", 17: "الإسراء", 18: "الكهف", 19: "مريم", 20: "طه",
            21: "الأنبياء", 22: "الحج", 23: "المؤمنون", 24: "النور", 25: "الفرقان",
            26: "الشعراء", 27: "النمل", 28: "القصص", 29: "العنكبوت", 30: "الروم",
            31: "لقمان", 32: "السجدة", 33: "الأحزاب", 34: "سبأ", 35: "فاطر",
            36: "يس", 37: "الصافات", 38: "ص", 39: "الزمر", 40: "غافر",
            41: "فصلت", 42: "الشورى", 43: "الزخرف", 44: "الدخان", 45: "الجاثية",
            46: "الأحقاف", 47: "محمد", 48: "الفتح", 49: "الحجرات", 50: "ق",
            51: "الذاريات", 52: "الطور", 53: "النجم", 54: "القمر", 55: "الرحمن",
            56: "الواقعة", 57: "الحديد", 58: "المجادلة", 59: "الحشر", 60: "الممتحنة",
            61: "الصف", 62: "الجمعة", 63: "المنافقون", 64: "التغابن", 65: "الطلاق",
            66: "التحريم", 67: "الملك", 68: "القلم", 69: "الحاقة", 70: "المعارج",
            71: "نوح", 72: "الجن", 73: "المزمل", 74: "المدثر", 75: "القيامة",
            76: "الإنسان", 77: "المرسلات", 78: "النبأ", 79: "النازعات", 80: "عبس",
            81: "التكوير", 82: "الانفطار", 83: "المطففين", 84: "الانشقاق", 85: "البروج",
            86: "الطارق", 87: "الأعلى", 88: "الغاشية", 89: "الفجر", 90: "البلد",
            91: "الشمس", 92: "الليل", 93: "الضحى", 94: "الشرح", 95: "التين",
            96: "العلق", 97: "القدر", 98: "البينة", 99: "الزلزلة", 100: "العاديات",
            101: "القارعة", 102: "التكاثر", 103: "العصر", 104: "الهمزة", 105: "الفيل",
            106: "قريش", 107: "الماعون", 108: "الكوثر", 109: "الكافرون", 110: "النصر",
            111: "المسد", 112: "الإخلاص", 113: "الفلق", 114: "الناس"
        };
        return surahNames[surahNumber] || `سورة ${surahNumber}`;
    }

    generatePagesData() {
        const pages = [];
        for (let page = 1; page <= 604; page++) {
            pages.push({
                page: page,
                start: {
                    surah_number: this.calculateSurahFromPage(page),
                    name: { ar: this.getSurahName(this.calculateSurahFromPage(page)) },
                    juz: Math.ceil(page / 20)
                },
                end: {
                    surah_number: this.calculateSurahFromPage(page),
                    name: { ar: this.getSurahName(this.calculateSurahFromPage(page)) }
                }
            });
        }
        return pages;
    }

    getEmbeddedData(type) {
        switch(type) {
            case 'pages':
                return this.generatePagesData();
            case 'surahs':
                return EMBEDDED_SURAHS_DATA;
            default:
                throw new Error(`لا توجد بيانات مدمجة لـ ${type}`);
        }
    }
}

    getEmbeddedData(type) {
        switch(type) {
            case 'pages':
                return EMBEDDED_PAGES_DATA;
            case 'surahs':
                return EMBEDDED_SURAHS_DATA;
            default:
                throw new Error(`لا توجد بيانات مدمجة لـ ${type}`);
        }
    }
}

class QuranReader {
    constructor() {
        this.currentPage = 1;
        this.totalPages = 604;
        this.currentAudio = null;
        this.isPlaying = false;
        this.zoomLevel = 100;
        this.currentAudioSurah = null;
        this.availableSurahsInPage = [];
        this.autoPlayNext = true;
        this.dataManager = new QuranDataManager();
        this.isOnline = true;

        this.initializeElements();
        this.setupEventListeners();
        this.setupScrollHandler();
        this.setupOnlineHandler();
        this.setDefaultTheme();
        this.loadInitialData();
    }

    initializeElements() {
        // العناصر الأساسية
        this.quranImg = document.getElementById('quran-img');
        this.pageNumber = document.getElementById('page-number');
        this.surahInfo = document.getElementById('surah-info');
        this.juzInfo = document.getElementById('juz-info');
        this.audioPlayer = document.getElementById('quran-audio');
        this.loadingScreen = document.getElementById('loading-screen');
        this.container = document.querySelector('.container');
        this.connectionStatus = document.getElementById('connection-status');
        this.connectionIcon = document.getElementById('connection-icon');

        // العناصر الجديدة لاختيار السورة
        this.surahSelector = document.getElementById('surah-selector');
        this.surahSelectionList = document.getElementById('surah-selection-list');

        // عناصر التحكم في النص
        this.zoomInBtn = document.getElementById('zoom-in');
        this.zoomOutBtn = document.getElementById('zoom-out');
        this.resetZoomBtn = document.getElementById('reset-zoom');
        this.zoomLevelDisplay = document.getElementById('zoom-level');

        // الأزرار العائمة
        this.prevBtn = document.getElementById('prev-page-btn');
        this.nextBtn = document.getElementById('next-page-btn');
        this.themeBtn = document.getElementById('toggle-theme');
        this.audioBtn = document.getElementById('audio-toggle');
        this.scrollTopBtn = document.getElementById('scroll-to-top');
        this.pwaInstallBtn = document.getElementById('pwa-install');

        // مشغل الصوت العائم
        this.audioFloating = document.querySelector('.audio-player-floating');
        this.closeAudioBtn = document.getElementById('close-audio');
        this.audioInfo = document.getElementById('audio-info');

        // البحث
        this.searchInput = document.getElementById('search-input');
        this.searchBtn = document.getElementById('search-btn');
        this.searchResults = document.getElementById('search-results');

        // التنقل السريع
        this.navSurah = document.getElementById('nav-surah');
        this.navJuz = document.getElementById('nav-juz');
        this.navSajda = document.getElementById('nav-sajda');

        // النوافذ المنبثقة
        this.surahModal = document.getElementById('surah-list');
        this.juzModal = document.getElementById('juz-list');
    }

    setupOnlineHandler() {
        window.addEventListener('online', () => {
            this.updateConnectionStatus(true);
        });

        window.addEventListener('offline', () => {
            this.updateConnectionStatus(false);
        });

        // التحقق الأولي
        this.updateConnectionStatus(navigator.onLine);
    }

    updateConnectionStatus(online) {
        this.isOnline = online;

        if (online) {
            this.connectionStatus.textContent = 'متصل بالإنترنت';
            this.connectionIcon.className = 'fas fa-wifi';
            this.connectionStatus.parentElement.classList.remove('offline');
        } else {
            this.connectionStatus.textContent = 'غير متصل بالإنترنت';
            this.connectionIcon.className = 'fas fa-wifi-slash';
            this.connectionStatus.parentElement.classList.add('offline');
        }
    }

    setDefaultTheme() {
        // تفعيل الوضع الليلي افتراضيًا
        document.body.classList.add('dark-mode');
        const icon = this.themeBtn.querySelector('i');
        icon.className = 'fas fa-sun';
        this.themeBtn.title = 'الوضع النهاري';
    }

    setupEventListeners() {
        // التنقل بين الصفحات
        this.prevBtn.addEventListener('click', () => this.previousPage());
        this.nextBtn.addEventListener('click', () => this.nextPage());

        // تبديل الوضع
        this.themeBtn.addEventListener('click', () => this.toggleTheme());

        // التحكم الصوتي
        this.audioBtn.addEventListener('click', () => this.toggleAudio());
        this.closeAudioBtn.addEventListener('click', () => this.hideAudioPlayer());
        this.audioPlayer.addEventListener('ended', () => this.onAudioEnded());
        this.audioPlayer.addEventListener('play', () => this.onAudioPlay());
        this.audioPlayer.addEventListener('pause', () => this.onAudioPause());

        // التحكم في التكبير
        this.zoomInBtn.addEventListener('click', () => this.zoomIn());
        this.zoomOutBtn.addEventListener('click', () => this.zoomOut());
        this.resetZoomBtn.addEventListener('click', () => this.resetZoom());

        // الصعود للأعلى
        this.scrollTopBtn.addEventListener('click', () => this.scrollToTop());

        // البحث
        this.searchBtn.addEventListener('click', () => this.performSearch());
        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.performSearch();
        });

        // التنقل السريع
        this.navSurah.addEventListener('click', () => this.showSurahList());
        this.navJuz.addEventListener('click', () => this.showJuzList());
        this.navSajda.addEventListener('click', () => this.showSajdaVerses());

        // إغلاق النوافذ
        document.querySelectorAll('.close').forEach(closeBtn => {
            closeBtn.addEventListener('click', (e) => {
                e.target.closest('.modal').style.display = 'none';
            });
        });

        // إغلاق النوافذ بالنقر خارجها
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                e.target.style.display = 'none';
            }
        });

        // اختصار لوحة المفاتيح
        document.addEventListener('keydown', (e) => {
            if (e.target === this.searchInput) return;

            if (e.key === 'ArrowRight' || e.key === 'd') this.previousPage();
            if (e.key === 'ArrowLeft' || e.key === 'a') this.nextPage();
            if (e.key === ' ') {
                e.preventDefault();
                this.toggleAudio();
            }
            if (e.key === 'Escape') this.hideAudioPlayer();
        });
    }

    setupScrollHandler() {
        window.addEventListener('scroll', () => {
            this.toggleScrollTopButton();
        });
    }

    toggleScrollTopButton() {
        if (window.pageYOffset > 300) {
            this.scrollTopBtn.classList.add('show');
        } else {
            this.scrollTopBtn.classList.remove('show');
        }
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    zoomIn() {
        if (this.zoomLevel < 150) {
            this.zoomLevel += 10;
            this.applyZoom();
        }
    }

    zoomOut() {
        if (this.zoomLevel > 70) {
            this.zoomLevel -= 10;
            this.applyZoom();
        }
    }

    resetZoom() {
        this.zoomLevel = 100;
        this.applyZoom();
    }

    applyZoom() {
        document.body.style.fontSize = `${this.zoomLevel}%`;
        this.zoomLevelDisplay.textContent = `${this.zoomLevel}%`;
    }

    async loadInitialData() {
        try {
            console.log('🔄 بدء تحميل بيانات القرآن...');
            
            // اختبار تحميل البيانات من المصادر الجديدة
            console.log('🧪 اختبار تحميل البيانات...');
            
            const [pagesData, surahsData] = await Promise.all([
                this.dataManager.loadData('pages'),
                this.dataManager.loadData('surahs')
            ]);

            this.pagesData = pagesData;
            this.surahsData = surahsData;

            this.hideLoadingScreen();
            this.updatePage();
            
            console.log('✅ تم تحميل البيانات بنجاح');
            console.log('📊 إحصائيات:', {
                pages: this.pagesData.length,
                surahs: this.surahsData.length
            });

        } catch (error) {
            console.error('❌ خطأ في تحميل البيانات:', error);
            // استخدام البيانات المدمجة كحل أخير
            this.pagesData = EMBEDDED_PAGES_DATA;
            this.surahsData = EMBEDDED_SURAHS_DATA;
            this.hideLoadingScreen();
            this.updatePage();
            this.showMessage('تم تحميل البيانات الأساسية (البيانات الكاملة غير متوفرة)', 'info');
        }
    }

    hideLoadingScreen() {
        setTimeout(() => {
            this.loadingScreen.style.display = 'none';
            this.container.style.display = 'flex';
        }, 1000);
    }

    async updatePage() {
        try {
            // تحديث صورة الصفحة
            const imageUrl = this.dataManager.getPageImageUrl(this.currentPage);
            this.quranImg.src = imageUrl;
            this.quranImg.alt = `صفحة القرآن ${this.currentPage}`;

            this.quranImg.onload = () => {
                console.log(`✅ تم تحميل صفحة ${this.currentPage}`);
            };

            this.quranImg.onerror = () => {
                console.error(`❌ فشل تحميل صفحة ${this.currentPage}`);
                this.showImageError();
            };

            this.pageNumber.textContent = `الصفحة: ${this.currentPage}`;
            this.updatePageInfo();
            this.updateAvailableSurahs();
            this.preloadNextPages();

        } catch (error) {
            console.error('خطأ في تحديث الصفحة:', error);
        }
    }

    showImageError() {
        // صورة بديلة عند فشل التحميل
        this.quranImg.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="700" height="900" viewBox="0 0 700 900"><rect width="100%" height="100%" fill="%231a1a2e"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="24" fill="%23e9ecef">صفحة ' + this.currentPage + '</text></svg>';
    }

    preloadNextPages() {
        // تحميل مسبق للصفحات التالية
        const nextPages = [this.currentPage + 1, this.currentPage + 2];
        nextPages.forEach(page => {
            if (page <= this.totalPages) {
                const img = new Image();
                img.src = this.dataManager.getPageImageUrl(page);
            }
        });
    }

    updatePageInfo() {
        if (!this.pagesData) return;

        const pageInfo = this.pagesData.find(page => page.page === this.currentPage);
        if (pageInfo) {
            let surahText = `السورة: ${pageInfo.start.name.ar}`;

            // إذا كانت الصفحة تحتوي على أكثر من سورة
            if (pageInfo.end && pageInfo.end.surah_number !== pageInfo.start.surah_number) {
                surahText += ` - ${pageInfo.end.name.ar}`;
            }

            this.surahInfo.textContent = surahText;
            this.juzInfo.textContent = `الجزء: ${pageInfo.start.juz || this.calculateJuz(this.currentPage)}`;
        } else {
            // معلومات افتراضية إذا لم توجد بيانات
            this.surahInfo.textContent = `السورة: ${this.getSurahName(this.getCurrentSurah())}`;
            this.juzInfo.textContent = `الجزء: ${this.calculateJuz(this.currentPage)}`;
        }
    }

    updateAvailableSurahs() {
        if (!this.pagesData || !this.surahsData) return;

        this.availableSurahsInPage = [];

        // البحث عن جميع السور التي تظهر في هذه الصفحة
        const surahsInPage = new Set();

        // البحث في بيانات السور عن أي سورة تحتوي على آيات في هذه الصفحة
        this.surahsData.forEach(surah => {
            surah.verses.forEach(verse => {
                if (verse.page === this.currentPage) {
                    surahsInPage.add(surah.number);
                }
            });
        });

        // إذا لم نجد سوراً، نستخدم السور من بيانات الصفحات
        if (surahsInPage.size === 0) {
            const pageInfo = this.pagesData.find(page => page.page === this.currentPage);
            if (pageInfo) {
                if (pageInfo.start && pageInfo.start.surah_number) {
                    surahsInPage.add(pageInfo.start.surah_number);
                }
                if (pageInfo.end && pageInfo.end.surah_number && pageInfo.end.surah_number !== pageInfo.start.surah_number) {
                    surahsInPage.add(pageInfo.end.surah_number);
                }
            }
        }

        // تحويل إلى مصفوفة وترتيبها حسب رقم السورة
        this.availableSurahsInPage = Array.from(surahsInPage)
            .sort((a, b) => a - b)
            .map(surahNum => {
                const surah = this.surahsData.find(s => s.number === surahNum);
                return {
                    number: surahNum,
                    name: surah ? surah.name.ar : `سورة ${surahNum}`,
                    verses_count: surah ? surah.verses_count : 0,
                    revelation_place: surah ? surah.revelation_place.ar : 'مكية',
                    verses_in_page: this.getVersesInPage(surahNum, this.currentPage)
                };
            });

        console.log(`📖 الصفحة ${this.currentPage} تحتوي على السور:`, this.availableSurahsInPage.map(s => s.number));
    }

    getVersesInPage(surahNumber, pageNumber) {
        if (!this.surahsData) return [];

        const surah = this.surahsData.find(s => s.number === surahNumber);
        if (!surah) return [];

        return surah.verses.filter(verse => verse.page === pageNumber)
            .map(verse => verse.number);
    }

    getCurrentSurah() {
        if (!this.pagesData) return 1;
        const pageInfo = this.pagesData.find(page => page.page === this.currentPage);
        return pageInfo ? pageInfo.start.surah_number : 1;
    }

    previousPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.updatePage();
        }
    }

    nextPage() {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
            this.updatePage();
        }
    }

    goToPage(pageNum) {
        if (pageNum >= 1 && pageNum <= this.totalPages) {
            this.currentPage = pageNum;
            this.updatePage();
        }
    }

    toggleTheme() {
        document.body.classList.toggle('dark-mode');
        document.body.classList.toggle('light-mode');

        const icon = this.themeBtn.querySelector('i');
        if (document.body.classList.contains('dark-mode')) {
            icon.className = 'fas fa-sun';
            this.themeBtn.title = 'الوضع النهاري';
        } else {
            icon.className = 'fas fa-moon';
            this.themeBtn.title = 'الوضع الليلي';
        }
    }

    async toggleAudio() {
        if (this.isPlaying) {
            this.stopAudio();
        } else {
            // إذا كانت الصفحة تحتوي على سورة واحدة فقط
            if (this.availableSurahsInPage.length === 1) {
                await this.playSurahAudio(this.availableSurahsInPage[0].number);
            }
            // إذا كانت الصفحة تحتوي على أكثر من سورة
            else if (this.availableSurahsInPage.length > 1) {
                this.showSurahSelection();
            }
            // إذا لم توجد سور معروفة
            else {
                await this.playCurrentPageAudio();
            }
        }
    }

    showSurahSelection() {
        if (this.availableSurahsInPage.length === 0) return;

        const selectionHTML = this.availableSurahsInPage.map(surah => {
            const versesInfo = surah.verses_in_page && surah.verses_in_page.length > 0
                ? ` | الآيات: ${surah.verses_in_page[0]} - ${surah.verses_in_page[surah.verses_in_page.length - 1]}`
                : '';

            return `
            <div class="surah-audio-item" data-surah="${surah.number}">
                <div class="surah-audio-info">
                    <div class="surah-audio-name">${surah.number}. ${surah.name}</div>
                    <div class="surah-audio-details">${surah.revelation_place} | آيات: ${surah.verses_count}${versesInfo}</div>
                </div>
                <div class="play-audio-icon">
                    <i class="fas fa-play"></i>
                </div>
            </div>
            `;
        }).join('');

        this.surahSelectionList.innerHTML = selectionHTML;
        this.surahSelector.style.display = 'flex';

        // إضافة مستمعي الأحداث لعناصر الاختيار
        this.surahSelectionList.querySelectorAll('.surah-audio-item').forEach(item => {
            item.addEventListener('click', async () => {
                const surahNum = parseInt(item.dataset.surah);
                this.surahSelector.style.display = 'none';
                await this.playSurahAudio(surahNum);
            });
        });
    }

    async playSurahAudio(surahNumber) {
        try {
            const audioData = await this.dataManager.getSurahAudio(surahNumber);
            
            if (audioData && audioData.length > 0) {
                this.currentAudio = audioData[0].link;
                this.audioPlayer.src = this.currentAudio;
                this.showAudioPlayer();
                
                const surah = this.surahsData.find(s => s.number === surahNumber);
                this.audioInfo.textContent = `سورة ${surah.name.ar} - الصفحة ${this.currentPage}`;

                // إضافة معالجة الأخطاء للصوت
                this.audioPlayer.onerror = () => {
                    console.error('❌ فشل تشغيل الصوت');
                    this.showMessage('تعذر تشغيل التلاوة', 'error');
                    this.stopAudio();
                };

                await this.audioPlayer.play();
                this.currentAudioSurah = surahNumber;
            } else {
                this.showMessage('تعذر العثور على التلاوة لهذه السورة', 'warning');
            }
        } catch (error) {
            console.error('خطأ في تشغيل الصوت:', error);
            this.showMessage('تعذر تشغيل التلاوة. يرجى المحاولة لاحقاً.', 'error');
        }
    }

    async playCurrentPageAudio() {
        try {
            const pageInfo = this.pagesData.find(page => page.page === this.currentPage);
            if (!pageInfo) return;

            const surahNumber = pageInfo.start.surah_number;
            if (surahNumber) {
                await this.playSurahAudio(surahNumber);
            }
        } catch (error) {
            console.error('خطأ في تشغيل الصوت:', error);
        }
    }

    showAudioPlayer() {
        this.audioFloating.classList.add('show');
    }

    hideAudioPlayer() {
        this.audioFloating.classList.remove('show');
        this.stopAudio();
    }

    onAudioPlay() {
        this.isPlaying = true;
        this.audioBtn.classList.add('playing');
        this.audioBtn.innerHTML = '<i class="fas fa-stop"></i>';
        this.audioBtn.title = 'إيقاف التلاوة';
    }

    onAudioPause() {
        this.audioBtn.classList.remove('playing');
        this.audioBtn.innerHTML = '<i class="fas fa-play"></i>';
        this.audioBtn.title = 'تشغيل التلاوة';
    }

    onAudioEnded() {
        // عندما تنتهي السورة، تشغيل السورة التالية تلقائياً
        if (this.autoPlayNext && this.currentAudioSurah) {
            this.playNextSurah();
        } else {
            this.stopAudio();
        }
    }

    async playNextSurah() {
        const currentSurahNumber = this.currentAudioSurah;

        // البحث عن السورة التالية
        const nextSurahNumber = currentSurahNumber + 1;

        if (nextSurahNumber <= 114) {
            // البحث عن الصفحة الأولى للسورة التالية
            const nextSurah = this.surahsData.find(s => s.number === nextSurahNumber);
            if (nextSurah && nextSurah.verses.length > 0) {
                const firstVersePage = nextSurah.verses[0].page;

                // الانتقال إلى صفحة السورة التالية
                this.currentPage = firstVersePage;
                this.updatePage();

                // تشغيل السورة التالية
                await this.playSurahAudio(nextSurahNumber);
            }
        } else {
            // إذا كانت هذه آخر سورة، نوقف التشغيل
            this.stopAudio();
            this.showMessage('تم الانتهاء من القرآن الكريم', 'success');
        }
    }

    stopAudio() {
        this.audioPlayer.pause();
        this.audioPlayer.currentTime = 0;
        this.isPlaying = false;
        this.audioBtn.classList.remove('playing');
        this.audioBtn.innerHTML = '<i class="fas fa-play"></i>';
        this.audioBtn.title = 'تشغيل التلاوة';
    }

    async performSearch() {
        const query = this.searchInput.value.trim();
        if (!query) {
            this.showMessage('الرجاء إدخال نص للبحث', 'warning');
            return;
        }

        try {
            const results = await this.searchInQuran(query);
            this.displaySearchResults(results);
        } catch (error) {
            console.error('خطأ في البحث:', error);
            this.showMessage('حدث خطأ أثناء البحث', 'error');
        }
    }

    async searchInQuran(query) {
        const results = [];
        const lowerQuery = query.toLowerCase();

        this.surahsData.forEach(surah => {
            // البحث في أسماء السور
            if (surah.name.ar.includes(query) ||
                surah.name.en.toLowerCase().includes(lowerQuery) ||
                surah.name.transliteration.toLowerCase().includes(lowerQuery)) {
                results.push({
                    type: 'surah',
                    surah: surah.number,
                    text: `سورة ${surah.name.ar}`,
                    page: surah.verses[0]?.page || 1
                });
            }

            // البحث في الآيات
            surah.verses.forEach(verse => {
                if (verse.text.ar.includes(query)) {
                    results.push({
                        type: 'verse',
                        surah: surah.number,
                        verse: verse.number,
                        text: `سورة ${surah.name.ar} - الآية ${verse.number}: ${verse.text.ar.substring(0, 50)}...`,
                        page: verse.page
                    });
                }
            });
        });

        return results.slice(0, 20);
    }

    displaySearchResults(results) {
        if (results.length === 0) {
            this.searchResults.innerHTML = '<div class="search-result-item">لم يتم العثور على نتائج</div>';
        } else {
            this.searchResults.innerHTML = results.map(result => `
                <div class="search-result-item" data-type="${result.type}" data-surah="${result.surah}" data-verse="${result.verse || ''}" data-page="${result.page}">
                    ${result.text}
                </div>
            `).join('');
        }

        // إضافة مستمعي الأحداث للنتائج
        this.searchResults.querySelectorAll('.search-result-item').forEach(item => {
            item.addEventListener('click', () => {
                const page = parseInt(item.dataset.page);
                this.goToPage(page);
                this.searchResults.style.display = 'none';
                this.searchInput.value = '';
            });
        });

        this.searchResults.style.display = 'block';
    }

    showSurahList() {
        if (!this.surahsData) return;

        const surahListHTML = this.surahsData.map(surah => `
            <div class="surah-item" data-surah="${surah.number}" data-page="${surah.verses[0]?.page || 1}">
                <div class="surah-number">${surah.number}</div>
                <div class="surah-name">${surah.name.ar}</div>
                <div class="surah-details">
                    <span class="surah-verse-count">${surah.verses_count} آية</span>
                    <span class="surah-revelation">${surah.revelation_place.ar}</span>
                </div>
            </div>
        `).join('');

        this.surahModal.querySelector('.modal-body').innerHTML = surahListHTML;
        this.surahModal.style.display = 'block';

        // إضافة مستمعي الأحداث
        this.surahModal.querySelectorAll('.surah-item').forEach(item => {
            item.addEventListener('click', () => {
                const page = parseInt(item.dataset.page);
                this.goToPage(page);
                this.surahModal.style.display = 'none';
            });
        });
    }

    showJuzList() {
        const juzListHTML = Array.from({ length: 30 }, (_, i) => {
            const juzNumber = i + 1;
            const startPage = this.calculateJuzStartPage(juzNumber);
            return `
                <div class="juz-item" data-juz="${juzNumber}" data-page="${startPage}">
                    <div class="juz-number">الجزء ${juzNumber}</div>
                    <div class="juz-page">الصفحة ${startPage}</div>
                </div>
            `;
        }).join('');

        this.juzModal.querySelector('.modal-body').innerHTML = juzListHTML;
        this.juzModal.style.display = 'block';

        // إضافة مستمعي الأحداث
        this.juzModal.querySelectorAll('.juz-item').forEach(item => {
            item.addEventListener('click', () => {
                const page = parseInt(item.dataset.page);
                this.goToPage(page);
                this.juzModal.style.display = 'none';
            });
        });
    }

    showSajdaVerses() {
        const sajdaVerses = [];
        this.surahsData.forEach(surah => {
            surah.verses.forEach(verse => {
                if (verse.sajda) {
                    sajdaVerses.push({
                        surah: surah.number,
                        surahName: surah.name.ar,
                        verse: verse.number,
                        text: verse.text.ar,
                        page: verse.page
                    });
                }
            });
        });

        if (sajdaVerses.length === 0) {
            this.showMessage('لا توجد آيات سجدة في هذه البيانات', 'info');
            return;
        }

        const sajdaHTML = sajdaVerses.map(verse => `
            <div class="sajda-item" data-surah="${verse.surah}" data-verse="${verse.verse}" data-page="${verse.page}">
                <div class="sajda-surah">سورة ${verse.surahName} - الآية ${verse.verse}</div>
                <div class="sajda-text">${verse.text}</div>
                <div class="sajda-page">الصفحة ${verse.page}</div>
            </div>
        `).join('');

        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.style.display = 'block';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>آيات السجود</h3>
                    <span class="close">&times;</span>
                </div>
                <div class="modal-body">
                    ${sajdaHTML}
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // إضافة مستمعي الأحداث
        modal.querySelector('.close').addEventListener('click', () => {
            modal.remove();
        });

        modal.querySelectorAll('.sajda-item').forEach(item => {
            item.addEventListener('click', () => {
                const page = parseInt(item.dataset.page);
                this.goToPage(page);
                modal.remove();
            });
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    calculateJuz(page) {
        // حساب تقريبي للجزء بناءً على رقم الصفحة
        if (page <= 22) return 1;
        if (page <= 42) return 2;
        if (page <= 62) return 3;
        if (page <= 82) return 4;
        if (page <= 102) return 5;
        if (page <= 122) return 6;
        if (page <= 142) return 7;
        if (page <= 162) return 8;
        if (page <= 182) return 9;
        if (page <= 202) return 10;
        if (page <= 222) return 11;
        if (page <= 242) return 12;
        if (page <= 262) return 13;
        if (page <= 282) return 14;
        if (page <= 302) return 15;
        if (page <= 322) return 16;
        if (page <= 342) return 17;
        if (page <= 362) return 18;
        if (page <= 382) return 19;
        if (page <= 402) return 20;
        if (page <= 422) return 21;
        if (page <= 442) return 22;
        if (page <= 462) return 23;
        if (page <= 482) return 24;
        if (page <= 502) return 25;
        if (page <= 522) return 26;
        if (page <= 542) return 27;
        if (page <= 562) return 28;
        if (page <= 582) return 29;
        return 30;
    }

    calculateJuzStartPage(juz) {
        const juzPages = {
            1: 1, 2: 22, 3: 42, 4: 62, 5: 82, 6: 102, 7: 122, 8: 142, 9: 162, 10: 182,
            11: 202, 12: 222, 13: 242, 14: 262, 15: 282, 16: 302, 17: 322, 18: 342,
            19: 362, 20: 382, 21: 402, 22: 422, 23: 442, 24: 462, 25: 482, 26: 502,
            27: 522, 28: 542, 29: 562, 30: 582
        };
        return juzPages[juz] || 1;
    }

    getSurahName(surahNumber) {
        const surah = this.surahsData.find(s => s.number === surahNumber);
        return surah ? surah.name.ar : `سورة ${surahNumber}`;
    }

    showMessage(message, type = 'info') {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.textContent = message;

        document.body.appendChild(messageDiv);

        setTimeout(() => {
            messageDiv.classList.add('show');
        }, 100);

        setTimeout(() => {
            messageDiv.classList.remove('show');
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.parentNode.removeChild(messageDiv);
                }
            }, 300);
        }, 3000);
    }
}

// دالة لاختبار جميع المصادر
function testDataSources() {
    console.log('🧪 اختبار جميع مصادر البيانات...');
    
    const testUrls = [
        'https://cdn.jsdelivr.net/gh/rn0x/Quran-Data@version-2.0/pagesQuran.json',
        'https://cdn.jsdelivr.net/gh/rn0x/Quran-Data@version-2.0/mainDataQuran.json',
        'https://cdn.jsdelivr.net/gh/rn0x/Quran-Data@version-2.0/data/quran_image/1.png',
        'https://cdn.jsdelivr.net/gh/rn0x/Quran-Data@version-2.0/data/json/audio/audio_surah_1.json'
    ];
    
    testUrls.forEach(url => {
        fetch(url)
            .then(response => {
                console.log(`✅ ${url}: ${response.status}`);
            })
            .catch(error => {
                console.error(`❌ ${url}: ${error.message}`);
            });
    });
}

// تشغيل التطبيق
document.addEventListener('DOMContentLoaded', () => {
    // testDataSources(); // فك التعليق لاختبار المصادر
    new QuranReader();
});
