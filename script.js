// بيانات الصفحات المدمجة الكاملة (604 صفحة)
const EMBEDDED_PAGES_DATA = generatePagesData();

// بيانات السور المدمجة الكاملة (114 سورة)
const EMBEDDED_SURAHS_DATA = generateSurahsData();

// توليد بيانات الصفحات
function generatePagesData() {
    const pages = [];
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

    for (let page = 1; page <= 604; page++) {
        let surahNumber = 1;
        for (let startPage in surahPages) {
            if (page >= startPage) {
                surahNumber = surahPages[startPage];
            }
        }

        pages.push({
            page: page,
            start: {
                surah_number: surahNumber,
                name: { ar: getSurahName(surahNumber) },
                juz: Math.ceil(page / 20)
            },
            end: {
                surah_number: surahNumber,
                name: { ar: getSurahName(surahNumber) }
            }
        });
    }
    return pages;
}

// توليد بيانات السور
function generateSurahsData() {
    const surahs = [];
    const surahInfo = {
        1: { name: "الفاتحة", verses: 7, revelation: "مكية" },
        2: { name: "البقرة", verses: 286, revelation: "مدنية" },
        3: { name: "آل عمران", verses: 200, revelation: "مدنية" },
        4: { name: "النساء", verses: 176, revelation: "مدنية" },
        5: { name: "المائدة", verses: 120, revelation: "مدنية" },
        6: { name: "الأنعام", verses: 165, revelation: "مكية" },
        7: { name: "الأعراف", verses: 206, revelation: "مكية" },
        8: { name: "الأنفال", verses: 75, revelation: "مدنية" },
        9: { name: "التوبة", verses: 129, revelation: "مدنية" },
        10: { name: "يونس", verses: 109, revelation: "مكية" },
        11: { name: "هود", verses: 123, revelation: "مكية" },
        12: { name: "يوسف", verses: 111, revelation: "مكية" },
        13: { name: "الرعد", verses: 43, revelation: "مدنية" },
        14: { name: "إبراهيم", verses: 52, revelation: "مكية" },
        15: { name: "الحجر", verses: 99, revelation: "مكية" },
        16: { name: "النحل", verses: 128, revelation: "مكية" },
        17: { name: "الإسراء", verses: 111, revelation: "مكية" },
        18: { name: "الكهف", verses: 110, revelation: "مكية" },
        19: { name: "مريم", verses: 98, revelation: "مكية" },
        20: { name: "طه", verses: 135, revelation: "مكية" },
        21: { name: "الأنبياء", verses: 112, revelation: "مكية" },
        22: { name: "الحج", verses: 78, revelation: "مدنية" },
        23: { name: "المؤمنون", verses: 118, revelation: "مكية" },
        24: { name: "النور", verses: 64, revelation: "مدنية" },
        25: { name: "الفرقان", verses: 77, revelation: "مكية" },
        26: { name: "الشعراء", verses: 227, revelation: "مكية" },
        27: { name: "النمل", verses: 93, revelation: "مكية" },
        28: { name: "القصص", verses: 88, revelation: "مكية" },
        29: { name: "العنكبوت", verses: 69, revelation: "مكية" },
        30: { name: "الروم", verses: 60, revelation: "مكية" },
        31: { name: "لقمان", verses: 34, revelation: "مكية" },
        32: { name: "السجدة", verses: 30, revelation: "مكية" },
        33: { name: "الأحزاب", verses: 73, revelation: "مدنية" },
        34: { name: "سبأ", verses: 54, revelation: "مكية" },
        35: { name: "فاطر", verses: 45, revelation: "مكية" },
        36: { name: "يس", verses: 83, revelation: "مكية" },
        37: { name: "الصافات", verses: 182, revelation: "مكية" },
        38: { name: "ص", verses: 88, revelation: "مكية" },
        39: { name: "الزمر", verses: 75, revelation: "مكية" },
        40: { name: "غافر", verses: 85, revelation: "مكية" },
        41: { name: "فصلت", verses: 54, revelation: "مكية" },
        42: { name: "الشورى", verses: 53, revelation: "مكية" },
        43: { name: "الزخرف", verses: 89, revelation: "مكية" },
        44: { name: "الدخان", verses: 59, revelation: "مكية" },
        45: { name: "الجاثية", verses: 37, revelation: "مكية" },
        46: { name: "الأحقاف", verses: 35, revelation: "مكية" },
        47: { name: "محمد", verses: 38, revelation: "مدنية" },
        48: { name: "الفتح", verses: 29, revelation: "مدنية" },
        49: { name: "الحجرات", verses: 18, revelation: "مدنية" },
        50: { name: "ق", verses: 45, revelation: "مكية" },
        51: { name: "الذاريات", verses: 60, revelation: "مكية" },
        52: { name: "الطور", verses: 49, revelation: "مكية" },
        53: { name: "النجم", verses: 62, revelation: "مكية" },
        54: { name: "القمر", verses: 55, revelation: "مكية" },
        55: { name: "الرحمن", verses: 78, revelation: "مدنية" },
        56: { name: "الواقعة", verses: 96, revelation: "مكية" },
        57: { name: "الحديد", verses: 29, revelation: "مدنية" },
        58: { name: "المجادلة", verses: 22, revelation: "مدنية" },
        59: { name: "الحشر", verses: 24, revelation: "مدنية" },
        60: { name: "الممتحنة", verses: 13, revelation: "مدنية" },
        61: { name: "الصف", verses: 14, revelation: "مدنية" },
        62: { name: "الجمعة", verses: 11, revelation: "مدنية" },
        63: { name: "المنافقون", verses: 11, revelation: "مدنية" },
        64: { name: "التغابن", verses: 18, revelation: "مدنية" },
        65: { name: "الطلاق", verses: 12, revelation: "مدنية" },
        66: { name: "التحريم", verses: 12, revelation: "مدنية" },
        67: { name: "الملك", verses: 30, revelation: "مكية" },
        68: { name: "القلم", verses: 52, revelation: "مكية" },
        69: { name: "الحاقة", verses: 52, revelation: "مكية" },
        70: { name: "المعارج", verses: 44, revelation: "مكية" },
        71: { name: "نوح", verses: 28, revelation: "مكية" },
        72: { name: "الجن", verses: 28, revelation: "مكية" },
        73: { name: "المزمل", verses: 20, revelation: "مكية" },
        74: { name: "المدثر", verses: 56, revelation: "مكية" },
        75: { name: "القيامة", verses: 40, revelation: "مكية" },
        76: { name: "الإنسان", verses: 31, revelation: "مدنية" },
        77: { name: "المرسلات", verses: 50, revelation: "مكية" },
        78: { name: "النبأ", verses: 40, revelation: "مكية" },
        79: { name: "النازعات", verses: 46, revelation: "مكية" },
        80: { name: "عبس", verses: 42, revelation: "مكية" },
        81: { name: "التكوير", verses: 29, revelation: "مكية" },
        82: { name: "الانفطار", verses: 19, revelation: "مكية" },
        83: { name: "المطففين", verses: 36, revelation: "مكية" },
        84: { name: "الانشقاق", verses: 25, revelation: "مكية" },
        85: { name: "البروج", verses: 22, revelation: "مكية" },
        86: { name: "الطارق", verses: 17, revelation: "مكية" },
        87: { name: "الأعلى", verses: 19, revelation: "مكية" },
        88: { name: "الغاشية", verses: 26, revelation: "مكية" },
        89: { name: "الفجر", verses: 30, revelation: "مكية" },
        90: { name: "البلد", verses: 20, revelation: "مكية" },
        91: { name: "الشمس", verses: 15, revelation: "مكية" },
        92: { name: "الليل", verses: 21, revelation: "مكية" },
        93: { name: "الضحى", verses: 11, revelation: "مكية" },
        94: { name: "الشرح", verses: 8, revelation: "مكية" },
        95: { name: "التين", verses: 8, revelation: "مكية" },
        96: { name: "العلق", verses: 19, revelation: "مكية" },
        97: { name: "القدر", verses: 5, revelation: "مكية" },
        98: { name: "البينة", verses: 8, revelation: "مدنية" },
        99: { name: "الزلزلة", verses: 8, revelation: "مدنية" },
        100: { name: "العاديات", verses: 11, revelation: "مكية" },
        101: { name: "القارعة", verses: 11, revelation: "مكية" },
        102: { name: "التكاثر", verses: 8, revelation: "مكية" },
        103: { name: "العصر", verses: 3, revelation: "مكية" },
        104: { name: "الهمزة", verses: 9, revelation: "مكية" },
        105: { name: "الفيل", verses: 5, revelation: "مكية" },
        106: { name: "قريش", verses: 4, revelation: "مكية" },
        107: { name: "الماعون", verses: 7, revelation: "مكية" },
        108: { name: "الكوثر", verses: 3, revelation: "مكية" },
        109: { name: "الكافرون", verses: 6, revelation: "مكية" },
        110: { name: "النصر", verses: 3, revelation: "مدنية" },
        111: { name: "المسد", verses: 5, revelation: "مكية" },
        112: { name: "الإخلاص", verses: 4, revelation: "مكية" },
        113: { name: "الفلق", verses: 5, revelation: "مكية" },
        114: { name: "الناس", verses: 6, revelation: "مكية" }
    };

    for (let i = 1; i <= 114; i++) {
        const info = surahInfo[i];
        surahs.push({
            number: i,
            name: {
                ar: info.name,
                en: `Surah ${i}`,
                transliteration: `Surah ${i}`
            },
            verses_count: info.verses,
            revelation_place: { ar: info.revelation },
            verses: generateVersesForSurah(i, info.verses)
        });
    }
    return surahs;
}

// توليد الآيات لكل سورة
function generateVersesForSurah(surahNumber, versesCount) {
    const verses = [];
    const startPage = calculateSurahStartPage(surahNumber);
    
    for (let i = 1; i <= versesCount; i++) {
        verses.push({
            number: i,
            text: { ar: `آية ${i} من سورة ${getSurahName(surahNumber)}` },
            page: startPage + Math.floor((i - 1) / 5), // توزيع تقريبي
            sajda: false
        });
    }
    return verses;
}

// دالة مساعدة للحصول على اسم السورة
function getSurahName(surahNumber) {
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

// دالة مساعدة لحساب صفحة بداية السورة
function calculateSurahStartPage(surahNumber) {
    const surahStartPages = {
        1: 1, 2: 2, 3: 50, 4: 77, 5: 106, 6: 128, 7: 151, 8: 177,
        9: 187, 10: 208, 11: 221, 12: 235, 13: 249, 14: 255, 15: 262,
        16: 267, 17: 282, 18: 293, 19: 305, 20: 312, 21: 322, 22: 332,
        23: 342, 24: 350, 25: 359, 26: 367, 27: 377, 28: 385, 29: 396,
        30: 404, 31: 411, 32: 415, 33: 418, 34: 428, 35: 434, 36: 440,
        37: 446, 38: 453, 39: 458, 40: 467, 41: 477, 42: 483, 43: 489,
        44: 496, 45: 499, 46: 502, 47: 507, 48: 511, 49: 515, 50: 518,
        51: 520, 52: 523, 53: 526, 54: 528, 55: 531, 56: 534, 57: 537,
        58: 542, 59: 545, 60: 549, 61: 551, 62: 553, 63: 554, 64: 556,
        65: 558, 66: 560, 67: 562, 68: 564, 69: 566, 70: 568, 71: 570,
        72: 572, 73: 574, 74: 575, 75: 577, 76: 578, 77: 580, 78: 582,
        79: 583, 80: 585, 81: 586, 82: 587, 83: 587, 84: 589, 85: 590,
        86: 591, 87: 591, 88: 592, 89: 593, 90: 594, 91: 595, 92: 595,
        93: 596, 94: 596, 95: 597, 96: 597, 97: 598, 98: 598, 99: 599,
        100: 599, 101: 600, 102: 600, 103: 601, 104: 601, 105: 602,
        106: 602, 107: 603, 108: 603, 109: 603, 110: 604, 111: 604,
        112: 604, 113: 604, 114: 604
    };
    return surahStartPages[surahNumber] || 1;
}

class QuranDataManager {
    constructor() {
        this.dataSources = {
            pages: [
                'https://api.alquran.cloud/v1/meta',
                'https://quran-api.id/surahs'
            ],
            surahs: [
                'https://api.alquran.cloud/v1/surah',
                'https://quran-api.id/surahs'
            ],
            images: 'https://cdn.alquran.cloud/media/image/{page}',
            audio: 'https://api.alquran.cloud/v1/surah/{surah}/ar.alafasy'
        };
        this.cache = new Map();
    }

    async loadData(type, params = {}) {
        const cacheKey = `${type}-${JSON.stringify(params)}`;
        
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }

        try {
            if (Array.isArray(this.dataSources[type])) {
                for (let url of this.dataSources[type]) {
                    try {
                        const data = await this.fetchUrl(url, params);
                        this.cache.set(cacheKey, data);
                        console.log(`✅ تم تحميل ${type} من: ${url}`);
                        return data;
                    } catch (error) {
                        console.warn(`❌ فشل الرابط: ${url}`);
                        continue;
                    }
                }
                return this.getEmbeddedData(type);
            } else {
                let url = this.dataSources[type];
                url = url.replace('{page}', params.page || '')
                         .replace('{surah}', params.surah || '');
                
                console.log(`📥 جاري تحميل: ${url}`);
                const data = await this.fetchUrl(url, params);
                this.cache.set(cacheKey, data);
                return data;
            }
        } catch (error) {
            console.error(`❌ جميع محاولات تحميل ${type} فشلت، استخدام البيانات المدمجة`);
            return this.getEmbeddedData(type);
        }
    }

    async fetchUrl(url, params = {}) {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`فشل التحميل: ${response.status} - ${url}`);
        }
        
        if (url.includes('audio')) {
            const audioData = await response.json();
            if (audioData && audioData.data && audioData.data.ayahs) {
                return audioData.data.ayahs;
            } else {
                throw new Error('لا توجد بيانات صوتية');
            }
        }
        
        return await response.json();
    }

    getPageImageUrl(page) {
        // استخدام مصادر متعددة للصور
        const sources = [
            `https://everyayah.com/data/images_png/${page}.png`,
            `https://cdn.alquran.cloud/media/image/${page}`,
            `https://quran.com/page%20${page}.png`
        ];
        return sources[0];
    }

    async getSurahAudio(surahNumber) {
        try {
            const audioData = await this.loadData('audio', { surah: surahNumber });
            if (audioData && audioData.length > 0) {
                return audioData.map(ayah => ({
                    link: ayah.audio,
                    name: 'مشاري العفاسي'
                }));
            }
        } catch (error) {
            console.error('❌ فشل تحميل الصوت، استخدام رابط مباشر');
        }
        
        // رابط صوتي مباشر كبديل
        return [{
            link: `https://cdn.islamic.network/quran/audio/128/ar.abdulbasitmurattal/${surahNumber.toString().padStart(3, '0')}.mp3`,
            name: 'عبد الباسط عبد الصمد'
        }];
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
            
            // استخدام البيانات المدمجة مباشرة للسرعة
            this.pagesData = EMBEDDED_PAGES_DATA;
            this.surahsData = EMBEDDED_SURAHS_DATA;

            this.hideLoadingScreen();
            this.updatePage();

            console.log('✅ تم تحميل البيانات المدمجة بنجاح');

            // محاولة تحميل بيانات إضافية في الخلفية
            this.loadAdditionalDataInBackground();

        } catch (error) {
            console.error('❌ خطأ في تحميل البيانات:', error);
            this.hideLoadingScreen();
            this.updatePage();
        }
    }

    async loadAdditionalDataInBackground() {
        try {
            const [fullPagesData, fullSurahsData] = await Promise.all([
                this.dataManager.loadData('pages'),
                this.dataManager.loadData('surahs')
            ]);

            if (fullPagesData && fullPagesData.length > 3) {
                this.pagesData = fullPagesData;
                console.log('✅ تم تحميل بيانات الصفحات الكاملة');
            }

            if (fullSurahsData && fullSurahsData.length > 5) {
                this.surahsData = fullSurahsData;
                console.log('✅ تم تحميل بيانات السور الكاملة');
            }

            this.updatePageInfo();
        } catch (error) {
            console.log('ℹ️  استخدام البيانات المدمجة (البيانات الكاملة غير متوفرة)');
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
        this.quranImg.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="700" height="900" viewBox="0 0 700 900"><rect width="100%" height="100%" fill="%231a1a2e"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="24" fill="%23e9ecef">صفحة ' + this.currentPage + '</text></svg>';
    }

    preloadNextPages() {
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

            if (pageInfo.end && pageInfo.end.surah_number !== pageInfo.start.surah_number) {
                surahText += ` - ${pageInfo.end.name.ar}`;
            }

            this.surahInfo.textContent = surahText;
            this.juzInfo.textContent = `الجزء: ${pageInfo.start.juz || this.calculateJuz(this.currentPage)}`;
        } else {
            this.surahInfo.textContent = `السورة: ${this.getSurahName(this.getCurrentSurah())}`;
            this.juzInfo.textContent = `الجزء: ${this.calculateJuz(this.currentPage)}`;
        }
    }

    updateAvailableSurahs() {
        if (!this.pagesData || !this.surahsData) return;

        this.availableSurahsInPage = [];
        const surahsInPage = new Set();

        this.surahsData.forEach(surah => {
            surah.verses.forEach(verse => {
                if (verse.page === this.currentPage) {
                    surahsInPage.add(surah.number);
                }
            });
        });

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
            if (this.availableSurahsInPage.length === 1) {
                await this.playSurahAudio(this.availableSurahsInPage[0].number);
            } else if (this.availableSurahsInPage.length > 1) {
                this.showSurahSelection();
            } else {
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
        if (this.autoPlayNext && this.currentAudioSurah) {
            this.playNextSurah();
        } else {
            this.stopAudio();
        }
    }

    async playNextSurah() {
        const currentSurahNumber = this.currentAudioSurah;
        const nextSurahNumber = currentSurahNumber + 1;

        if (nextSurahNumber <= 114) {
            const nextSurah = this.surahsData.find(s => s.number === nextSurahNumber);
            if (nextSurah && nextSurah.verses.length > 0) {
                const firstVersePage = nextSurah.verses[0].page;

                this.currentPage = firstVersePage;
                this.updatePage();

                await this.playSurahAudio(nextSurahNumber);
            }
        } else {
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
            <div class="search-result-item" data-page="${result.page}">
            <div class="result-surah">${result.text}</div>
            <div class="result-verse">الصفحة: ${result.page}</div>
            </div>
            `).join('');

            this.searchResults.querySelectorAll('.search-result-item').forEach(item => {
                item.addEventListener('click', () => {
                    const page = parseInt(item.dataset.page);
                    this.goToPage(page);
                    this.searchResults.style.display = 'none';
                });
            });
        }

        this.searchResults.style.display = 'block';
    }

    showSurahList() {
        if (!this.surahsData) return;

        const surahListContent = this.surahsData.map(surah => `
        <div class="surah-item" data-surah="${surah.number}">
        <div class="surah-name">${surah.number}. ${surah.name.ar} (${surah.name.en})</div>
        <div class="surah-details">آيات: ${surah.verses_count} | ${surah.revelation_place.ar}</div>
        </div>
        `).join('');

        document.getElementById('surah-list-content').innerHTML = surahListContent;
        this.surahModal.style.display = 'flex';

        document.querySelectorAll('#surah-list-content .surah-item').forEach(item => {
            item.addEventListener('click', () => {
                const surahNum = parseInt(item.dataset.surah);
                this.goToSurah(surahNum);
                this.surahModal.style.display = 'none';
            });
        });
    }

    showJuzList() {
        const juzListContent = Array.from({length: 30}, (_, i) => {
            const juzNum = i + 1;
            const startPage = (juzNum - 1) * 20 + 1;
            return `
            <div class="juz-item" data-juz="${juzNum}">
            <div class="surah-name">الجزء ${juzNum}</div>
            <div class="surah-details">الصفحات: ${startPage} - ${startPage + 19}</div>
            </div>
            `;
        }).join('');

        document.getElementById('juz-list-content').innerHTML = juzListContent;
        this.juzModal.style.display = 'flex';

        document.querySelectorAll('#juz-list-content .juz-item').forEach(item => {
            item.addEventListener('click', () => {
                const juzNum = parseInt(item.dataset.juz);
                const startPage = (juzNum - 1) * 20 + 1;
                this.goToPage(startPage);
                this.juzModal.style.display = 'none';
            });
        });
    }

    async showSajdaVerses() {
        try {
            const sajdaVerses = [];
            this.surahsData.forEach(surah => {
                surah.verses.forEach(verse => {
                    if (verse.sajda) {
                        sajdaVerses.push({
                            surah: surah.number,
                            verse: verse.number,
                            text: verse.text.ar,
                            page: verse.page
                        });
                    }
                });
            });

            const resultsHTML = sajdaVerses.map(verse => `
            <div class="search-result-item" data-page="${verse.page}">
            <div class="result-surah">سورة ${this.getSurahName(verse.surah)} - الآية ${verse.verse}</div>
            <div class="result-verse">${verse.text.substring(0, 70)}...</div>
            <div class="surah-details">الصفحة: ${verse.page}</div>
            </div>
            `).join('');

            this.searchResults.innerHTML = resultsHTML;
            this.searchResults.style.display = 'block';

            this.searchResults.querySelectorAll('.search-result-item').forEach(item => {
                item.addEventListener('click', () => {
                    const page = parseInt(item.dataset.page);
                    this.goToPage(page);
                    this.searchResults.style.display = 'none';
                });
            });

        } catch (error) {
            console.error('خطأ في عرض آيات السجود:', error);
        }
    }

    goToSurah(surahNumber) {
        if (!this.surahsData) return;

        const surah = this.surahsData.find(s => s.number === surahNumber);
        if (surah && surah.verses.length > 0) {
            const firstVersePage = surah.verses[0].page;
            this.goToPage(firstVersePage);
        }
    }

    getSurahName(surahNumber) {
        const surah = this.surahsData.find(s => s.number === surahNumber);
        return surah ? surah.name.ar : `سورة ${surahNumber}`;
    }

    calculateJuz(page) {
        const juz = Math.ceil(page / 20);
        return juz > 30 ? 30 : juz;
    }

    showMessage(message, type = 'info') {
        const colors = {
            info: '#2e86ab',
            success: '#27ae60',
            warning: '#e67e22',
            error: '#e74c3c'
        };

        const messageDiv = document.createElement('div');
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: ${colors[type]};
            color: white;
            padding: 15px 25px;
            border-radius: var(--border-radius);
            box-shadow: var(--shadow-dark);
            z-index: 1003;
            font-weight: 500;
        `;
        messageDiv.textContent = message;

        document.body.appendChild(messageDiv);

        setTimeout(() => {
            messageDiv.remove();
        }, 3000);
    }
}

// تهيئة التطبيق عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    new QuranReader();
});
