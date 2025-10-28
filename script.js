// script.js - GT-QURANREADER-WEB v4.1 (مصححة)

// ========================================
// بيانات السور (مضمنة)
// ========================================
const EMBEDDED_SURAHS_DATA = [ /* بيانات السور كما في نسختك */ ];

// ========================================
// توليد بيانات الصفحات
// ========================================
function generatePagesData() {
    const pages = [];
    for (let page = 1; page <= 604; page++) {
        const surah = getSurahByPage(page);
        const juz = calculateJuzFromPage(page);

        // تحديد السورة النهائية في الصفحة
        let nextSurah = EMBEDDED_SURAHS_DATA.find(s => s.start_page > page);
        let endSurahNumber = nextSurah ? nextSurah.number - 1 : surah.number;
        let endSurah = EMBEDDED_SURAHS_DATA.find(s => s.number === endSurahNumber) || surah;

        pages.push({
            page: page,
            start: { surah_number: surah.number, name: { ar: surah.name.ar }, juz: juz },
            end: { surah_number: endSurah.number, name: { ar: endSurah.name.ar } }
        });
    }
    return pages;
}

// ========================================
// مدير البيانات
// ========================================
class QuranDataManager {
    constructor() {
        this.baseURL = 'https://api.alquran.cloud/v1';
        this.fallbackImageURL = 'https://everyayah.com/data/images_png/';
        this.cache = new Map();
        this.pagesData = generatePagesData();
        this.surahsData = EMBEDDED_SURAHS_DATA;
    }

    async loadData(type, params = {}) {
        const cacheKey = `${type}-${JSON.stringify(params)}`;
        if (this.cache.has(cacheKey)) return this.cache.get(cacheKey);

        try {
            let data;
            switch(type) {
                case 'pages': data = this.pagesData; break;
                case 'surahs': data = this.surahsData; break;
                case 'audio': data = await this.loadAudioData(params.surah); break;
                default: throw new Error(`نوع غير معروف: ${type}`);
            }
            this.cache.set(cacheKey, data);
            return data;
        } catch (error) {
            console.error(`❌ فشل تحميل ${type}:`, error);
            return this.getEmbeddedData(type);
        }
    }

    async loadAudioData(surahNumber) {
        try {
            const response = await fetch(`${this.baseURL}/surah/${surahNumber}/ar.alafasy`);
            const data = await response.json();
            if (data.code === 200 && data.data?.ayahs?.length > 0) {
                return [{ link: data.data.ayahs[0].audio || this.getFallbackAudioUrl(surahNumber), name: 'مشاري العفاسي' }];
            }
        } catch (error) {
            console.warn(`⚠️ فشل تحميل الصوت لسورة ${surahNumber}:`, error);
        }
        return [{ link: this.getFallbackAudioUrl(surahNumber), name: 'عبد الباسط عبد الصمد' }];
    }

    getPageImageUrl(page) {
        const pageStr = page.toString().padStart(3, '0');
        return `${this.fallbackImageURL}${pageStr}.png`;
    }

    getFallbackAudioUrl(surahNumber) {
        const surahStr = surahNumber.toString().padStart(3, '0');
        return `https://cdn.islamic.network/quran/audio/128/ar.abdulbasitmurattal/${surahStr}.mp3`;
    }

    getEmbeddedData(type) {
        if (type === 'pages') return this.pagesData;
        if (type === 'surahs') return this.surahsData;
        return [];
    }
}

// ========================================
// دوال مساعدة
// ========================================
function getSurahByPage(page) {
    for (let i = EMBEDDED_SURAHS_DATA.length - 1; i >= 0; i--) {
        if (EMBEDDED_SURAHS_DATA[i].start_page <= page) return EMBEDDED_SURAHS_DATA[i];
    }
    return EMBEDDED_SURAHS_DATA[0];
}

function calculateJuzFromPage(page) {
    const juzPages = [1,22,42,62,82,102,122,142,162,182,202,222,242,262,282,302,322,342,362,382,402,422,442,462,482,502,522,542,562,582];
    for (let i = juzPages.length - 1; i >= 0; i--) if (page >= juzPages[i]) return i + 1;
    return 1;
}

// ========================================
// فئة QuranReader
// ========================================
class QuranReader {
    constructor() {
        this.currentPage = 1;
        this.totalPages = 604;
        this.zoomLevel = 100;
        this.currentAudio = null;
        this.dataManager = new QuranDataManager();
        this.isOnline = navigator.onLine;

        this.initializeElements();
        this.setupEventListeners();
        this.setupOnlineHandler();
        this.setDefaultTheme();
        this.loadPage(this.currentPage);
    }

    initializeElements() {
        this.quranImg = document.getElementById('quran-img');
        this.pageNumber = document.getElementById('page-number');
        this.surahInfo = document.getElementById('surah-info');
        this.juzInfo = document.getElementById('juz-info');
        this.audioPlayer = document.getElementById('quran-audio');
        this.connectionStatus = document.getElementById('connection-status');
        this.connectionIcon = document.getElementById('connection-icon');
        this.zoomInBtn = document.getElementById('zoom-in');
        this.zoomOutBtn = document.getElementById('zoom-out');
        this.resetZoomBtn = document.getElementById('reset-zoom');
        this.zoomLevelDisplay = document.getElementById('zoom-level');
        this.prevBtn = document.getElementById('prev-page-btn');
        this.nextBtn = document.getElementById('next-page-btn');
        this.themeBtn = document.getElementById('toggle-theme');
        this.audioBtn = document.getElementById('audio-toggle');
    }

    setupOnlineHandler() {
        window.addEventListener('online', () => this.updateConnectionStatus(true));
        window.addEventListener('offline', () => this.updateConnectionStatus(false));
        this.updateConnectionStatus(navigator.onLine);
    }

    updateConnectionStatus(online) {
        this.isOnline = online;
        if (online) {
            this.connectionStatus.textContent = 'متصل بالإنترنت';
            this.connectionIcon.className = 'fas fa-wifi';
        } else {
            this.connectionStatus.textContent = 'غير متصل بالإنترنت';
            this.connectionIcon.className = 'fas fa-wifi-slash';
        }
    }

    setDefaultTheme() {
        document.body.classList.add('dark-mode');
        this.themeBtn.querySelector('i').className = 'fas fa-sun';
    }

    setupEventListeners() {
        this.prevBtn.addEventListener('click', () => this.changePage(-1));
        this.nextBtn.addEventListener('click', () => this.changePage(1));
        this.zoomInBtn.addEventListener('click', () => this.zoomIn());
        this.zoomOutBtn.addEventListener('click', () => this.zoomOut());
        this.resetZoomBtn.addEventListener('click', () => this.resetZoom());
        this.audioBtn.addEventListener('click', () => this.toggleAudio());
        this.themeBtn.addEventListener('click', () => this.toggleTheme());
    }

    async loadPage(page) {
        const pages = await this.dataManager.loadData('pages');
        const pageData = pages[page - 1];
        if (!pageData) return;
        this.currentPage = page;

        this.quranImg.src = this.dataManager.getPageImageUrl(page);
        this.pageNumber.textContent = page;
        this.surahInfo.textContent = pageData.start.name.ar;
        this.juzInfo.textContent = `الجزء ${pageData.start.juz}`;
    }

    changePage(offset) {
        let newPage = this.currentPage + offset;
        if (newPage < 1) newPage = 1;
        if (newPage > this.totalPages) newPage = this.totalPages;
        this.loadPage(newPage);
    }

    zoomIn() { this.setZoom(this.zoomLevel + 10); }
    zoomOut() { this.setZoom(this.zoomLevel - 10); }
    resetZoom() { this.setZoom(100); }
    setZoom(level) {
        this.zoomLevel = Math.min(Math.max(level, 50), 200);
        this.quranImg.style.width = `${this.zoomLevel}%`;
        this.zoomLevelDisplay.textContent = `${this.zoomLevel}%`;
    }

    toggleTheme() {
        document.body.classList.toggle('dark-mode');
        const icon = this.themeBtn.querySelector('i');
        icon.classList.toggle('fa-sun');
        icon.classList.toggle('fa-moon');
    }

    async toggleAudio() {
        if (this.audioPlayer.paused) {
            const audioData = await this.dataManager.loadData('audio', { surah: getSurahByPage(this.currentPage).number });
            this.audioPlayer.src = audioData[0].link;
            this.audioPlayer.play();
        } else {
            this.audioPlayer.pause();
        }
    }
}

// ========================================
// تهيئة القارئ
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    window.quranReader = new QuranReader();
});
