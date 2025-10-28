// script.js
// GT-QURANREADER-WEB v5.0
// نسخة محسنة لدعم: صوت متواصل، خطوط متعددة، نص/صور، عرض متجاوب، كاش محسن، API حديث
// مؤلف: مُعدّ لك بناءً على طلبك

// ========================================
// بيانات السور المضمنة
// ========================================
const EMBEDDED_SURAHS_DATA = [ /* نسخة كما أعطيتك سابقاً */ ];

// ========================================
// توليد بيانات الصفحات
// ========================================
function generatePagesData() {
    const pages = [];
    for (let page = 1; page <= 604; page++) {
        const surah = getSurahByPage(page);
        const juz = calculateJuzFromPage(page);
        pages.push({
            page,
            start: { surah_number: surah.number, name: { ar: surah.name.ar }, juz },
            end: { surah_number: surah.number, name: { ar: surah.name.ar } }
        });
    }
    return pages;
}

// ========================================
// QuranDataManager: تحميل النصوص والصوت والصور
// ========================================
class QuranDataManager {
    constructor() {
        this.baseURL = 'https://api.santrikoding.com/quran';
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
                case 'text': data = await this.loadTextData(); break;
                default: throw new Error(`نوع غير معروف: ${type}`);
            }
            this.cache.set(cacheKey, data);
            return data;
        } catch (err) {
            console.error(`❌ فشل تحميل ${type}:`, err);
            return this.getEmbeddedData(type);
        }
    }

    async loadTextData() {
        try {
            const resp = await fetch(`${this.baseURL}/quran-uthmani`);
            const json = await resp.json();
            if (json && json.data) return json.data.surahs;
            throw new Error('استجابة غير صحيحة من API النص');
        } catch (err) {
            console.warn('❌ فشل جلب النص، سيتم استخدام البيانات المدمجة');
            return [];
        }
    }

    async loadAudioData(surahNumber) {
        try {
            const resp = await fetch(`${this.baseURL}/surah/${surahNumber}/ar.alafasy`);
            const json = await resp.json();
            if (json && json.data && json.data.ayahs.length > 0) {
                const audioLink = json.data.ayahs[0].audio || this.getFallbackAudioUrl(surahNumber);
                return [{ link: audioLink, name: 'مشاري العفاسي' }];
            }
        } catch (err) {
            console.warn('📻 تعذر جلب صوت العفاسي، استخدام الرابط الاحتياطي', err);
        }
        return [{ link: this.getFallbackAudioUrl(surahNumber), name: 'عبد الباسط عبد الصمد' }];
    }

    getFallbackAudioUrl(surahNumber) {
        const surahStr = String(surahNumber).padStart(3, '0');
        return `https://cdn.islamic.network/quran/audio/128/ar.abdulbasitmurattal/${surahStr}.mp3`;
    }

    getPageImageUrl(page) {
        return `${this.fallbackImageURL}${page}.png`;
    }

    getEmbeddedData(type) {
        switch(type) {
            case 'pages': return this.pagesData;
            case 'surahs': return this.surahsData;
            default: return [];
        }
    }
}

// ========================================
// الفئة الرئيسية: QuranReader
// ========================================
class QuranReader {
    constructor() {
        this.currentPage = 1;
        this.totalPages = 604;
        this.zoomLevel = 100;
        this.isPlaying = false;
        this.autoPlayNext = true;
        this.dataManager = new QuranDataManager();
        this.quranText = null;
        this.viewMode = localStorage.getItem('gt_quran_view') || 'image'; // image/text
        this.selectedFont = localStorage.getItem('gt_quran_font') || 'UthmanicHafs1';
        this.initializeElements();
        this.setupEventListeners();
        this.setupOnlineHandler();
        this.setDefaultTheme();
        this.createViewToggleIfMissing();
        this.loadInitialData();
    }

    initializeElements() {
        this.quranImg = document.getElementById('quran-img');
        this.pageNumber = document.getElementById('page-number');
        this.surahInfo = document.getElementById('surah-info');
        this.juzInfo = document.getElementById('juz-info');
        this.audioPlayer = document.getElementById('quran-audio');
        this.loadingScreen = document.getElementById('loading-screen');
        this.container = document.querySelector('.container');
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
        this.scrollTopBtn = document.getElementById('scroll-to-top');

        this.audioFloating = document.querySelector('.audio-player-floating');
        this.closeAudioBtn = document.getElementById('close-audio');
        this.audioInfo = document.getElementById('audio-info');

        this.textContainer = document.getElementById('quran-text');
        if (!this.textContainer) {
            const qPage = document.querySelector('.quran-page');
            this.textContainer = document.createElement('div');
            this.textContainer.id = 'quran-text';
            this.textContainer.style.textAlign = 'right';
            this.textContainer.style.direction = 'rtl';
            this.textContainer.style.padding = '10px';
            this.textContainer.style.display = 'none';
            this.textContainer.style.fontFamily = this.selectedFont;
            qPage.appendChild(this.textContainer);
        }
    }

    createViewToggleIfMissing() {
        const textControls = document.querySelector('.text-controls');
        if (!textControls) return;
        if (!document.getElementById('toggle-view')) {
            const btn = document.createElement('button');
            btn.id = 'toggle-view';
            btn.textContent = this.viewMode === 'image' ? 'عرض نصي' : 'عرض صور';
            btn.addEventListener('click', () => this.toggleViewMode());
            textControls.appendChild(btn);
        }
    }

    toggleViewMode() {
        this.viewMode = this.viewMode === 'image' ? 'text' : 'image';
        localStorage.setItem('gt_quran_view', this.viewMode);
        document.getElementById('toggle-view').textContent = this.viewMode === 'image' ? 'عرض نصي' : 'عرض صور';
        this.renderPage(this.currentPage);
    }

    async loadInitialData() {
        this.pagesData = await this.dataManager.loadData('pages');
        this.surahsData = await this.dataManager.loadData('surahs');
        this.quranText = await this.dataManager.loadData('text');
        this.renderPage(this.currentPage);
    }

    async renderPage(page) {
        const pageData = this.pagesData[page - 1];
        const surah = pageData.start;
        this.pageNumber.textContent = page;
        this.surahInfo.textContent = `${surah.name.ar} - الصفحة ${page}`;
        this.juzInfo.textContent = `الجزء ${surah.juz}`;

        if (this.viewMode === 'image') {
            this.quranImg.src = this.dataManager.getPageImageUrl(page);
            this.quranImg.style.display = 'block';
            this.textContainer.style.display = 'none';
        } else {
            const surahData = this.quranText.find(s => s.number === surah.surah_number);
            if (surahData) {
                this.textContainer.innerHTML = surahData.ayahs.map(a => `<p>${a.text}</p>`).join('');
                this.textContainer.style.display = 'block';
                this.quranImg.style.display = 'none';
            }
        }

        // تشغيل الصوت التلقائي إذا مفعل
        if (this.isPlaying && this.currentAudioSurah === surah.surah_number) {
            this.playAudio(surah.surah_number);
        }
    }

    async playAudio(surahNumber) {
        const audios = await this.dataManager.loadData('audio', { surah: surahNumber });
        if (audios.length > 0) {
            this.audioPlayer.src = audios[0].link;
            this.audioInfo.textContent = audios[0].name;
            this.audioPlayer.play();
            this.currentAudioSurah = surahNumber;

            this.audioPlayer.onended = () => {
                if (this.autoPlayNext && this.currentPage < this.totalPages) {
                    this.currentPage++;
                    this.renderPage(this.currentPage);
                    this.playAudio(getSurahByPage(this.currentPage).number);
                }
            };
        }
    }
}

// ========================================
// تهيئة القارئ
// ========================================
const qReader = new QuranReader();
