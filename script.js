// script.js - النسخة المصححة والكاملة
// GT-QURANREADER-WEB v5.0

// ========================================
// بيانات السور الكاملة (114 سورة)
// ========================================
const EMBEDDED_SURAHS_DATA = [
    { number: 1, name: { ar: "الفاتحة", en: "Al-Fatiha" }, verses_count: 7, revelation_place: { ar: "مكية" }, start_page: 1 },
    { number: 2, name: { ar: "البقرة", en: "Al-Baqarah" }, verses_count: 286, revelation_place: { ar: "مدنية" }, start_page: 2 },
    { number: 3, name: { ar: "آل عمران", en: "Aal-E-Imran" }, verses_count: 200, revelation_place: { ar: "مدنية" }, start_page: 50 },
    { number: 4, name: { ar: "النساء", en: "An-Nisa" }, verses_count: 176, revelation_place: { ar: "مدنية" }, start_page: 77 },
    { number: 5, name: { ar: "المائدة", en: "Al-Maidah" }, verses_count: 120, revelation_place: { ar: "مدنية" }, start_page: 106 },
    { number: 6, name: { ar: "الأنعام", en: "Al-Anaam" }, verses_count: 165, revelation_place: { ar: "مكية" }, start_page: 128 },
    { number: 7, name: { ar: "الأعراف", en: "Al-Araf" }, verses_count: 206, revelation_place: { ar: "مكية" }, start_page: 151 },
    { number: 8, name: { ar: "الأنفال", en: "Al-Anfal" }, verses_count: 75, revelation_place: { ar: "مدنية" }, start_page: 177 },
    { number: 9, name: { ar: "التوبة", en: "At-Tawbah" }, verses_count: 129, revelation_place: { ar: "مدنية" }, start_page: 187 },
    { number: 10, name: { ar: "يونس", en: "Yunus" }, verses_count: 109, revelation_place: { ar: "مكية" }, start_page: 208 },
    { number: 11, name: { ar: "هود", en: "Hud" }, verses_count: 123, revelation_place: { ar: "مكية" }, start_page: 221 },
    { number: 12, name: { ar: "يوسف", en: "Yusuf" }, verses_count: 111, revelation_place: { ar: "مكية" }, start_page: 235 },
    { number: 13, name: { ar: "الرعد", en: "Ar-Rad" }, verses_count: 43, revelation_place: { ar: "مدنية" }, start_page: 249 },
    { number: 14, name: { ar: "إبراهيم", en: "Ibrahim" }, verses_count: 52, revelation_place: { ar: "مكية" }, start_page: 255 },
    { number: 15, name: { ar: "الحجر", en: "Al-Hijr" }, verses_count: 99, revelation_place: { ar: "مكية" }, start_page: 262 },
    { number: 16, name: { ar: "النحل", en: "An-Nahl" }, verses_count: 128, revelation_place: { ar: "مكية" }, start_page: 267 },
    { number: 17, name: { ar: "الإسراء", en: "Al-Isra" }, verses_count: 111, revelation_place: { ar: "مكية" }, start_page: 282 },
    { number: 18, name: { ar: "الكهف", en: "Al-Kahf" }, verses_count: 110, revelation_place: { ar: "مكية" }, start_page: 293 },
    { number: 19, name: { ar: "مريم", en: "Maryam" }, verses_count: 98, revelation_place: { ar: "مكية" }, start_page: 305 },
    { number: 20, name: { ar: "طه", en: "Taha" }, verses_count: 135, revelation_place: { ar: "مكية" }, start_page: 312 },
    { number: 21, name: { ar: "الأنبياء", en: "Al-Anbiya" }, verses_count: 112, revelation_place: { ar: "مكية" }, start_page: 322 },
    { number: 22, name: { ar: "الحج", en: "Al-Hajj" }, verses_count: 78, revelation_place: { ar: "مدنية" }, start_page: 332 },
    { number: 23, name: { ar: "المؤمنون", en: "Al-Muminun" }, verses_count: 118, revelation_place: { ar: "مكية" }, start_page: 342 },
    { number: 24, name: { ar: "النور", en: "An-Nur" }, verses_count: 64, revelation_place: { ar: "مدنية" }, start_page: 350 },
    { number: 25, name: { ar: "الفرقان", en: "Al-Furqan" }, verses_count: 77, revelation_place: { ar: "مكية" }, start_page: 359 },
    { number: 26, name: { ar: "الشعراء", en: "Ash-Shuara" }, verses_count: 227, revelation_place: { ar: "مكية" }, start_page: 367 },
    { number: 27, name: { ar: "النمل", en: "An-Naml" }, verses_count: 93, revelation_place: { ar: "مكية" }, start_page: 377 },
    { number: 28, name: { ar: "القصص", en: "Al-Qasas" }, verses_count: 88, revelation_place: { ar: "مكية" }, start_page: 385 },
    { number: 29, name: { ar: "العنكبوت", en: "Al-Ankabut" }, verses_count: 69, revelation_place: { ar: "مكية" }, start_page: 396 },
    { number: 30, name: { ar: "الروم", en: "Ar-Rum" }, verses_count: 60, revelation_place: { ar: "مكية" }, start_page: 404 },
    { number: 31, name: { ar: "لقمان", en: "Luqman" }, verses_count: 34, revelation_place: { ar: "مكية" }, start_page: 411 },
    { number: 32, name: { ar: "السجدة", en: "As-Sajdah" }, verses_count: 30, revelation_place: { ar: "مكية" }, start_page: 415 },
    { number: 33, name: { ar: "الأحزاب", en: "Al-Ahzab" }, verses_count: 73, revelation_place: { ar: "مدنية" }, start_page: 418 },
    { number: 34, name: { ar: "سبأ", en: "Saba" }, verses_count: 54, revelation_place: { ar: "مكية" }, start_page: 428 },
    { number: 35, name: { ar: "فاطر", en: "Fatir" }, verses_count: 45, revelation_place: { ar: "مكية" }, start_page: 434 },
    { number: 36, name: { ar: "يس", en: "Ya-Sin" }, verses_count: 83, revelation_place: { ar: "مكية" }, start_page: 440 },
    { number: 37, name: { ar: "الصافات", en: "As-Saffat" }, verses_count: 182, revelation_place: { ar: "مكية" }, start_page: 446 },
    { number: 38, name: { ar: "ص", en: "Sad" }, verses_count: 88, revelation_place: { ar: "مكية" }, start_page: 453 },
    { number: 39, name: { ar: "الزمر", en: "Az-Zumar" }, verses_count: 75, revelation_place: { ar: "مكية" }, start_page: 458 },
    { number: 40, name: { ar: "غافر", en: "Ghafir" }, verses_count: 85, revelation_place: { ar: "مكية" }, start_page: 467 },
    { number: 41, name: { ar: "فصلت", en: "Fussilat" }, verses_count: 54, revelation_place: { ar: "مكية" }, start_page: 477 },
    { number: 42, name: { ar: "الشورى", en: "Ash-Shura" }, verses_count: 53, revelation_place: { ar: "مكية" }, start_page: 483 },
    { number: 43, name: { ar: "الزخرف", en: "Az-Zukhruf" }, verses_count: 89, revelation_place: { ar: "مكية" }, start_page: 489 },
    { number: 44, name: { ar: "الدخان", en: "Ad-Dukhan" }, verses_count: 59, revelation_place: { ar: "مكية" }, start_page: 496 },
    { number: 45, name: { ar: "الجاثية", en: "Al-Jathiyah" }, verses_count: 37, revelation_place: { ar: "مكية" }, start_page: 499 },
    { number: 46, name: { ar: "الأحقاف", en: "Al-Ahqaf" }, verses_count: 35, revelation_place: { ar: "مكية" }, start_page: 502 },
    { number: 47, name: { ar: "محمد", en: "Muhammad" }, verses_count: 38, revelation_place: { ar: "مدنية" }, start_page: 507 },
    { number: 48, name: { ar: "الفتح", en: "Al-Fath" }, verses_count: 29, revelation_place: { ar: "مدنية" }, start_page: 511 },
    { number: 49, name: { ar: "الحجرات", en: "Al-Hujurat" }, verses_count: 18, revelation_place: { ar: "مدنية" }, start_page: 515 },
    { number: 50, name: { ar: "ق", en: "Qaf" }, verses_count: 45, revelation_place: { ar: "مكية" }, start_page: 518 },
    { number: 51, name: { ar: "الذاريات", en: "Adh-Dhariyat" }, verses_count: 60, revelation_place: { ar: "مكية" }, start_page: 520 },
    { number: 52, name: { ar: "الطور", en: "At-Tur" }, verses_count: 49, revelation_place: { ar: "مكية" }, start_page: 523 },
    { number: 53, name: { ar: "النجم", en: "An-Najm" }, verses_count: 62, revelation_place: { ar: "مكية" }, start_page: 526 },
    { number: 54, name: { ar: "القمر", en: "Al-Qamar" }, verses_count: 55, revelation_place: { ar: "مكية" }, start_page: 528 },
    { number: 55, name: { ar: "الرحمن", en: "Ar-Rahman" }, verses_count: 78, revelation_place: { ar: "مدنية" }, start_page: 531 },
    { number: 56, name: { ar: "الواقعة", en: "Al-Waqiah" }, verses_count: 96, revelation_place: { ar: "مكية" }, start_page: 534 },
    { number: 57, name: { ar: "الحديد", en: "Al-Hadid" }, verses_count: 29, revelation_place: { ar: "مدنية" }, start_page: 537 },
    { number: 58, name: { ar: "المجادلة", en: "Al-Mujadila" }, verses_count: 22, revelation_place: { ar: "مدنية" }, start_page: 542 },
    { number: 59, name: { ar: "الحشر", en: "Al-Hashr" }, verses_count: 24, revelation_place: { ar: "مدنية" }, start_page: 545 },
    { number: 60, name: { ar: "الممتحنة", en: "Al-Mumtahanah" }, verses_count: 13, revelation_place: { ar: "مدنية" }, start_page: 549 },
    { number: 61, name: { ar: "الصف", en: "As-Saff" }, verses_count: 14, revelation_place: { ar: "مدنية" }, start_page: 551 },
    { number: 62, name: { ar: "الجمعة", en: "Al-Jumuah" }, verses_count: 11, revelation_place: { ar: "مدنية" }, start_page: 553 },
    { number: 63, name: { ar: "المنافقون", en: "Al-Munafiqun" }, verses_count: 11, revelation_place: { ar: "مدنية" }, start_page: 554 },
    { number: 64, name: { ar: "التغابن", en: "At-Taghabun" }, verses_count: 18, revelation_place: { ar: "مدنية" }, start_page: 556 },
    { number: 65, name: { ar: "الطلاق", en: "At-Talaq" }, verses_count: 12, revelation_place: { ar: "مدنية" }, start_page: 558 },
    { number: 66, name: { ar: "التحريم", en: "At-Tahrim" }, verses_count: 12, revelation_place: { ar: "مدنية" }, start_page: 560 },
    { number: 67, name: { ar: "الملك", en: "Al-Mulk" }, verses_count: 30, revelation_place: { ar: "مكية" }, start_page: 562 },
    { number: 68, name: { ar: "القلم", en: "Al-Qalam" }, verses_count: 52, revelation_place: { ar: "مكية" }, start_page: 564 },
    { number: 69, name: { ar: "الحاقة", en: "Al-Haqqah" }, verses_count: 52, revelation_place: { ar: "مكية" }, start_page: 566 },
    { number: 70, name: { ar: "المعارج", en: "Al-Maarij" }, verses_count: 44, revelation_place: { ar: "مكية" }, start_page: 568 },
    { number: 71, name: { ar: "نوح", en: "Nuh" }, verses_count: 28, revelation_place: { ar: "مكية" }, start_page: 570 },
    { number: 72, name: { ar: "الجن", en: "Al-Jinn" }, verses_count: 28, revelation_place: { ar: "مكية" }, start_page: 572 },
    { number: 73, name: { ar: "المزمل", en: "Al-Muzzammil" }, verses_count: 20, revelation_place: { ar: "مكية" }, start_page: 574 },
    { number: 74, name: { ar: "المدثر", en: "Al-Muddathir" }, verses_count: 56, revelation_place: { ar: "مكية" }, start_page: 575 },
    { number: 75, name: { ar: "القيامة", en: "Al-Qiyamah" }, verses_count: 40, revelation_place: { ar: "مكية" }, start_page: 577 },
    { number: 76, name: { ar: "الإنسان", en: "Al-Insan" }, verses_count: 31, revelation_place: { ar: "مدنية" }, start_page: 578 },
    { number: 77, name: { ar: "المرسلات", en: "Al-Mursalat" }, verses_count: 50, revelation_place: { ar: "مكية" }, start_page: 580 },
    { number: 78, name: { ar: "النبأ", en: "An-Naba" }, verses_count: 40, revelation_place: { ar: "مكية" }, start_page: 582 },
    { number: 79, name: { ar: "النازعات", en: "An-Naziat" }, verses_count: 46, revelation_place: { ar: "مكية" }, start_page: 583 },
    { number: 80, name: { ar: "عبس", en: "Abasa" }, verses_count: 42, revelation_place: { ar: "مكية" }, start_page: 585 },
    { number: 81, name: { ar: "التكوير", en: "At-Takwir" }, verses_count: 29, revelation_place: { ar: "مكية" }, start_page: 586 },
    { number: 82, name: { ar: "الانفطار", en: "Al-Infitar" }, verses_count: 19, revelation_place: { ar: "مكية" }, start_page: 587 },
    { number: 83, name: { ar: "المطففين", en: "Al-Mutaffifin" }, verses_count: 36, revelation_place: { ar: "مكية" }, start_page: 587 },
    { number: 84, name: { ar: "الانشقاق", en: "Al-Inshiqaq" }, verses_count: 25, revelation_place: { ar: "مكية" }, start_page: 589 },
    { number: 85, name: { ar: "البروج", en: "Al-Buruj" }, verses_count: 22, revelation_place: { ar: "مكية" }, start_page: 590 },
    { number: 86, name: { ar: "الطارق", en: "At-Tariq" }, verses_count: 17, revelation_place: { ar: "مكية" }, start_page: 591 },
    { number: 87, name: { ar: "الأعلى", en: "Al-Ala" }, verses_count: 19, revelation_place: { ar: "مكية" }, start_page: 591 },
    { number: 88, name: { ar: "الغاشية", en: "Al-Ghashiyah" }, verses_count: 26, revelation_place: { ar: "مكية" }, start_page: 592 },
    { number: 89, name: { ar: "الفجر", en: "Al-Fajr" }, verses_count: 30, revelation_place: { ar: "مكية" }, start_page: 593 },
    { number: 90, name: { ar: "البلد", en: "Al-Balad" }, verses_count: 20, revelation_place: { ar: "مكية" }, start_page: 594 },
    { number: 91, name: { ar: "الشمس", en: "Ash-Shams" }, verses_count: 15, revelation_place: { ar: "مكية" }, start_page: 595 },
    { number: 92, name: { ar: "الليل", en: "Al-Layl" }, verses_count: 21, revelation_place: { ar: "مكية" }, start_page: 595 },
    { number: 93, name: { ar: "الضحى", en: "Ad-Dhuha" }, verses_count: 11, revelation_place: { ar: "مكية" }, start_page: 596 },
    { number: 94, name: { ar: "الشرح", en: "Ash-Sharh" }, verses_count: 8, revelation_place: { ar: "مكية" }, start_page: 596 },
    { number: 95, name: { ar: "التين", en: "At-Tin" }, verses_count: 8, revelation_place: { ar: "مكية" }, start_page: 597 },
    { number: 96, name: { ar: "العلق", en: "Al-Alaq" }, verses_count: 19, revelation_place: { ar: "مكية" }, start_page: 597 },
    { number: 97, name: { ar: "القدر", en: "Al-Qadr" }, verses_count: 5, revelation_place: { ar: "مكية" }, start_page: 598 },
    { number: 98, name: { ar: "البينة", en: "Al-Bayyinah" }, verses_count: 8, revelation_place: { ar: "مدنية" }, start_page: 598 },
    { number: 99, name: { ar: "الزلزلة", en: "Az-Zalzalah" }, verses_count: 8, revelation_place: { ar: "مدنية" }, start_page: 599 },
    { number: 100, name: { ar: "العاديات", en: "Al-Adiyat" }, verses_count: 11, revelation_place: { ar: "مكية" }, start_page: 599 },
    { number: 101, name: { ar: "القارعة", en: "Al-Qariah" }, verses_count: 11, revelation_place: { ar: "مكية" }, start_page: 600 },
    { number: 102, name: { ar: "التكاثر", en: "At-Takathur" }, verses_count: 8, revelation_place: { ar: "مكية" }, start_page: 600 },
    { number: 103, name: { ar: "العصر", en: "Al-Asr" }, verses_count: 3, revelation_place: { ar: "مكية" }, start_page: 601 },
    { number: 104, name: { ar: "الهمزة", en: "Al-Humazah" }, verses_count: 9, revelation_place: { ar: "مكية" }, start_page: 601 },
    { number: 105, name: { ar: "الفيل", en: "Al-Fil" }, verses_count: 5, revelation_place: { ar: "مكية" }, start_page: 602 },
    { number: 106, name: { ar: "قريش", en: "Quraysh" }, verses_count: 4, revelation_place: { ar: "مكية" }, start_page: 602 },
    { number: 107, name: { ar: "الماعون", en: "Al-Maun" }, verses_count: 7, revelation_place: { ar: "مكية" }, start_page: 603 },
    { number: 108, name: { ar: "الكوثر", en: "Al-Kawthar" }, verses_count: 3, revelation_place: { ar: "مكية" }, start_page: 603 },
    { number: 109, name: { ar: "الكافرون", en: "Al-Kafirun" }, verses_count: 6, revelation_place: { ar: "مكية" }, start_page: 603 },
    { number: 110, name: { ar: "النصر", en: "An-Nasr" }, verses_count: 3, revelation_place: { ar: "مدنية" }, start_page: 604 },
    { number: 111, name: { ar: "المسد", en: "Al-Masad" }, verses_count: 5, revelation_place: { ar: "مكية" }, start_page: 604 },
    { number: 112, name: { ar: "الإخلاص", en: "Al-Ikhlas" }, verses_count: 4, revelation_place: { ar: "مكية" }, start_page: 604 },
    { number: 113, name: { ar: "الفلق", en: "Al-Falaq" }, verses_count: 5, revelation_place: { ar: "مكية" }, start_page: 604 },
    { number: 114, name: { ar: "الناس", en: "An-Nas" }, verses_count: 6, revelation_place: { ar: "مكية" }, start_page: 604 }
];

// ========================================
// توليد بيانات الصفحات (604 صفحة)
// ========================================
function generatePagesData() {
    const pages = [];
    
    for (let page = 1; page <= 604; page++) {
        const surah = getSurahByPage(page);
        const juz = calculateJuzFromPage(page);
        
        pages.push({
            page: page,
            start: {
                surah_number: surah.number,
                name: { ar: surah.name.ar },
                juz: juz
            },
            end: {
                surah_number: surah.number,
                name: { ar: surah.name.ar }
            }
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
        this.quranApiURL = 'https://quran-api.santrikoding.com/api';
        this.imageBaseURL = 'https://raw.githubusercontent.com/semarketir/quran-text/master/images/';
        this.fallbackImageURL = 'https://everyayah.com/data/images_png/';
        this.cache = new Map();
        this.pagesData = generatePagesData();
        this.surahsData = EMBEDDED_SURAHS_DATA;
    }

    async loadData(type, params = {}) {
        const cacheKey = `${type}-${JSON.stringify(params)}`;
        
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }

        try {
            let data;
            switch(type) {
                case 'pages':
                    data = this.pagesData;
                    break;
                case 'surahs':
                    data = this.surahsData;
                    break;
                case 'audio':
                    data = await this.loadAudioData(params.surah);
                    break;
                case 'quran_text':
                    data = await this.loadQuranText(params.surah);
                    break;
                default:
                    throw new Error(`نوع غير معروف: ${type}`);
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
            // محاولة تحميل من API الجديد
            const response = await fetch(`${this.quranApiURL}/surah/${surahNumber}`);
            const data = await response.json();
            
            if (data.status && data.audio) {
                return [{
                    link: data.audio,
                    name: 'مشاري العفاسي'
                }];
            }
        } catch (error) {
            console.log('📻 استخدام رابط صوتي بديل');
        }

        // محاولة API القديم
        try {
            const response = await fetch(`${this.baseURL}/surah/${surahNumber}/ar.alafasy`);
            const data = await response.json();
            
            if (data.code === 200 && data.data.ayahs && data.data.ayahs.length > 0) {
                return [{
                    link: data.data.ayahs[0].audio || this.getFallbackAudioUrl(surahNumber),
                    name: 'مشاري العفاسي'
                }];
            }
        } catch (error) {
            console.log('📻 استخدام رابط صوتي مباشر');
        }
        
        // رابط بديل مباشر
        return [{
            link: this.getFallbackAudioUrl(surahNumber),
            name: 'عبد الباسط عبد الصمد'
        }];
    }

    async loadQuranText(surahNumber) {
        try {
            const response = await fetch(`${this.quranApiURL}/surah/${surahNumber}`);
            const data = await response.json();
            
            if (data.status && data.ayat) {
                return data.ayat;
            }
        } catch (error) {
            console.error('❌ فشل تحميل النص القرآني:', error);
        }
        return [];
    }

    getPageImageUrl(page) {
        const pageStr = page.toString().padStart(3, '0');
        return `${this.imageBaseURL}${pageStr}.png`;
    }

    getFallbackAudioUrl(surahNumber) {
        const surahStr = surahNumber.toString().padStart(3, '0');
        return `https://cdn.islamic.network/quran/audio/128/ar.abdulbasitmurattal/${surahStr}.mp3`;
    }

    getEmbeddedData(type) {
        switch(type) {
            case 'pages':
                return this.pagesData;
            case 'surahs':
                return this.surahsData;
            default:
                return [];
        }
    }
}

// ========================================
// دوال مساعدة
// ========================================
function getSurahByPage(page) {
    for (let i = EMBEDDED_SURAHS_DATA.length - 1; i >= 0; i--) {
        if (EMBEDDED_SURAHS_DATA[i].start_page <= page) {
            return EMBEDDED_SURAHS_DATA[i];
        }
    }
    return EMBEDDED_SURAHS_DATA[0];
}

function calculateJuzFromPage(page) {
    const juzPages = [1, 22, 42, 62, 82, 102, 122, 142, 162, 182, 202, 222, 242, 262, 282, 302, 322, 342, 362, 382, 402, 422, 442, 462, 482, 502, 522, 542, 562, 582];
    
    for (let i = juzPages.length - 1; i >= 0; i--) {
        if (page >= juzPages[i]) {
            return i + 1;
        }
    }
    return 1;
}

function getJuzStartPage(juz) {
    const juzPages = [1, 22, 42, 62, 82, 102, 122, 142, 162, 182, 202, 222, 242, 262, 282, 302, 322, 342, 362, 382, 402, 422, 442, 462, 482, 502, 522, 542, 562, 582];
    return juzPages[juz - 1] || 1;
}

// ========================================
// الفئة الرئيسية - QuranReader
// ========================================
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
        this.displayMode = 'image'; // 'image' or 'text'
        this.currentFont = 'UthmanicHafs1'; // الخط الافتراضي
        this.dataManager = new QuranDataManager();
        this.isOnline = navigator.onLine;

        this.initializeElements();
        this.setupEventListeners();
        this.setupScrollHandler();
        this.setupOnlineHandler();
        this.setDefaultTheme();
        this.loadInitialData();
        this.loadFonts();
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

        // إنشاء عناصر التحكم الإضافية
        this.createAdditionalControls();
    }

    createAdditionalControls() {
        // إنشاء زر تبديل وضع العرض
        this.displayToggleBtn = document.createElement('button');
        this.displayToggleBtn.className = 'floating-btn';
        this.displayToggleBtn.id = 'display-toggle';
        this.displayToggleBtn.title = 'تبديل إلى النص';
        this.displayToggleBtn.innerHTML = '<i class="fas fa-font"></i>';
        
        // إنشاء قائمة اختيار الخط
        this.fontSelector = document.createElement('select');
        this.fontSelector.id = 'font-selector';
        this.fontSelector.className = 'font-selector';
        this.fontSelector.innerHTML = `
            <option value="UthmanicHafs1">خط عثماني</option>
            <option value="AmiriQuran">خط أميري</option>
            <option value="AmiriQuranColored">خط أميري ملون</option>
        `;

        // إضافة العناصر إلى واجهة المستخدم
        const controlsContainer = document.querySelector('.floating-controls');
        controlsContainer.appendChild(this.displayToggleBtn);
        
        const fontContainer = document.createElement('div');
        fontContainer.className = 'font-control';
        fontContainer.innerHTML = '<label for="font-selector">اختر الخط:</label>';
        fontContainer.appendChild(this.fontSelector);
        
        const settingsPanel = document.querySelector('.settings-panel');
        settingsPanel.appendChild(fontContainer);
    }

    setupEventListeners() {
        // التنقل بين الصفحات
        this.prevBtn.addEventListener('click', () => this.previousPage());
        this.nextBtn.addEventListener('click', () => this.nextPage());

        // إدخال رقم الصفحة
        this.pageNumber.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.goToPage(parseInt(this.pageNumber.value));
        });

        // التحكم في الصوت
        this.audioBtn.addEventListener('click', () => this.toggleAudio());
        this.closeAudioBtn.addEventListener('click', () => this.closeAudioPlayer());
        this.audioPlayer.addEventListener('ended', () => this.handleAudioEnded());

        // التحكم في التكبير
        this.zoomInBtn.addEventListener('click', () => this.zoomIn());
        this.zoomOutBtn.addEventListener('click', () => this.zoomOut());
        this.resetZoomBtn.addEventListener('click', () => this.resetZoom());

        // البحث
        this.searchBtn.addEventListener('click', () => this.performSearch());
        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.performSearch();
        });

        // التنقل السريع
        this.navSurah.addEventListener('click', () => this.showSurahList());
        this.navJuz.addEventListener('click', () => this.showJuzList());
        this.navSajda.addEventListener('click', () => this.showSajdaList());

        // التمرير للأعلى
        this.scrollTopBtn.addEventListener('click', () => this.scrollToTop());

        // تبديل السمة
        this.themeBtn.addEventListener('click', () => this.toggleTheme());

        // اختيار السورة
        this.surahSelector.addEventListener('click', () => this.toggleSurahSelection());

        // أحداث جديدة
        this.displayToggleBtn.addEventListener('click', () => this.toggleDisplayMode());
        this.fontSelector.addEventListener('change', (e) => this.changeFont(e.target.value));

        // إغلاق النوافذ المنبثقة بالنقر خارجها
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.surah-selection') && !e.target.closest('#surah-selector')) {
                this.surahSelectionList.style.display = 'none';
            }
        });

        // إغلاق النتائج بالنقر خارجها
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-container')) {
                this.searchResults.style.display = 'none';
            }
        });

        // اختصارات لوحة المفاتيح
        document.addEventListener('keydown', (e) => {
            if (e.target.tagName === 'INPUT') return;
            
            switch(e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    this.previousPage();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    this.nextPage();
                    break;
                case ' ':
                    e.preventDefault();
                    this.toggleAudio();
                    break;
                case 'Escape':
                    this.closeAudioPlayer();
                    break;
            }
        });
    }

    setupScrollHandler() {
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            // إظهار/إخفاء زر التمرير للأعلى
            this.scrollTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
            
            // إخفاء عناصر التحكم أثناء التمرير
            clearTimeout(scrollTimeout);
            document.querySelector('.floating-controls').classList.add('scrolling');
            
            scrollTimeout = setTimeout(() => {
                document.querySelector('.floating-controls').classList.remove('scrolling');
            }, 1500);
        });
    }

    setupOnlineHandler() {
        window.addEventListener('online', () => {
            this.isOnline = true;
            this.updateConnectionStatus();
        });

        window.addEventListener('offline', () => {
            this.isOnline = false;
            this.updateConnectionStatus();
        });

        this.updateConnectionStatus();
    }

    updateConnectionStatus() {
        if (this.isOnline) {
            this.connectionStatus.textContent = 'متصل';
            this.connectionIcon.className = 'fas fa-wifi';
            this.connectionStatus.className = 'connection-status online';
        } else {
            this.connectionStatus.textContent = 'غير متصل';
            this.connectionIcon.className = 'fas fa-wifi-slash';
            this.connectionStatus.className = 'connection-status offline';
        }
    }

    setDefaultTheme() {
        const savedTheme = localStorage.getItem('quran-theme') || 'light';
        document.body.className = savedTheme + '-theme';
        this.themeBtn.innerHTML = savedTheme === 'light' ? 
            '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    }

    async loadInitialData() {
        try {
            this.showLoading();
            
            // تحميل بيانات السور
            const surahs = await this.dataManager.loadData('surahs');
            this.populateSurahSelection(surahs);
            
            // تحميل الصفحة الأولى
            await this.loadPage(this.currentPage);
            
            this.hideLoading();
        } catch (error) {
            console.error('❌ فشل تحميل البيانات الأولية:', error);
            this.hideLoading();
        }
    }

    async loadPage(page) {
        if (page < 1 || page > this.totalPages) return;
        
        this.showLoading();
        this.currentPage = page;
        
        try {
            // تحديث واجهة المستخدم
            this.pageNumber.value = page;
            this.updatePageInfo();
            
            // تحميل المحتوى بناءً على وضع العرض
            if (this.displayMode === 'image') {
                await this.loadPageImage(page);
            } else {
                await this.loadPageText(page);
            }
            
            // تحديث السور المتاحة في الصفحة
            this.updateAvailableSurahs();
            
            this.hideLoading();
        } catch (error) {
            console.error(`❌ فشل تحميل الصفحة ${page}:`, error);
            this.hideLoading();
        }
    }

    async loadPageImage(page) {
        const imageUrl = this.dataManager.getPageImageUrl(page);
        
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                this.quranImg.src = imageUrl;
                this.quranImg.style.display = 'block';
                document.getElementById('quran-text').style.display = 'none';
                resolve();
            };
            img.onerror = () => {
                console.log('🖼️ استخدام رابط الصورة البديل');
                this.quranImg.src = `${this.dataManager.fallbackImageURL}${page.toString().padStart(4, '0')}.png`;
                this.quranImg.style.display = 'block';
                document.getElementById('quran-text').style.display = 'none';
                resolve();
            };
            img.src = imageUrl;
        });
    }

    async loadPageText(page) {
        const surah = getSurahByPage(page);
        const textElement = document.getElementById('quran-text');
        
        try {
            const verses = await this.dataManager.loadData('quran_text', { surah: surah.number });
            
            if (verses.length > 0) {
                textElement.innerHTML = this.formatVersesForDisplay(verses);
                textElement.style.display = 'block';
                this.quranImg.style.display = 'none';
                
                // تطبيق الخط المختار
                this.applySelectedFont();
            } else {
                // العودة إلى وضع الصورة إذا لم يتوفر النص
                this.displayMode = 'image';
                this.displayToggleBtn.title = 'تبديل إلى النص';
                this.displayToggleBtn.innerHTML = '<i class="fas fa-font"></i>';
                await this.loadPageImage(page);
            }
        } catch (error) {
            console.error('❌ فشل تحميل النص:', error);
            // العودة إلى وضع الصورة
            this.displayMode = 'image';
            await this.loadPageImage(page);
        }
    }

    formatVersesForDisplay(verses) {
        return verses.map(verse => `
            <div class="verse" data-verse="${verse.nomor}">
                <span class="verse-number">${verse.nomor}</span>
                <span class="verse-text">${verse.ar}</span>
                <div class="verse-translation">${verse.idn}</div>
            </div>
        `).join('');
    }

    applySelectedFont() {
        const textElement = document.getElementById('quran-text');
        textElement.className = `quran-text ${this.currentFont}`;
    }

    updatePageInfo() {
        const currentSurah = getSurahByPage(this.currentPage);
        const juz = calculateJuzFromPage(this.currentPage);
        
        this.surahInfo.textContent = `سورة ${currentSurah.name.ar}`;
        this.juzInfo.textContent = `الجزء ${juz}`;
    }

    updateAvailableSurahs() {
        const currentSurah = getSurahByPage(this.currentPage);
        this.availableSurahsInPage = [currentSurah];
        
        // تحديث زر اختيار السورة
        this.surahSelector.innerHTML = `
            <i class="fas fa-book"></i>
            ${currentSurah.name.ar}
            <i class="fas fa-chevron-down"></i>
        `;
    }

    populateSurahSelection(surahs) {
        this.surahSelectionList.innerHTML = surahs.map(surah => `
            <div class="surah-item" data-surah="${surah.number}">
                <span class="surah-number">${surah.number}</span>
                <span class="surah-name">${surah.name.ar}</span>
                <span class="surah-english">${surah.name.en}</span>
                <span class="surah-verse-count">${surah.verses_count} آية</span>
            </div>
        `).join('');

        // إضافة مستمعي الأحداث لعناصر السور
        this.surahSelectionList.querySelectorAll('.surah-item').forEach(item => {
            item.addEventListener('click', () => {
                const surahNumber = parseInt(item.dataset.surah);
                this.goToSurah(surahNumber);
                this.surahSelectionList.style.display = 'none';
            });
        });
    }

    async goToSurah(surahNumber) {
        const surah = this.surahsData.find(s => s.number === surahNumber);
        if (surah) {
            await this.loadPage(surah.start_page);
        }
    }

    async goToPage(page) {
        if (page >= 1 && page <= this.totalPages) {
            await this.loadPage(page);
            this.scrollToTop();
        }
    }

    previousPage() {
        if (this.currentPage > 1) {
            this.goToPage(this.currentPage - 1);
        }
    }

    nextPage() {
        if (this.currentPage < this.totalPages) {
            this.goToPage(this.currentPage + 1);
        }
    }

    async toggleAudio() {
        if (this.isPlaying) {
            this.stopAudio();
        } else {
            await this.playCurrentSurahAudio();
        }
    }

    async playCurrentSurahAudio() {
        const currentSurah = getSurahByPage(this.currentPage);
        
        if (this.currentAudioSurah !== currentSurah.number) {
            this.currentAudioSurah = currentSurah.number;
            
            try {
                const audioData = await this.dataManager.loadData('audio', { surah: currentSurah.number });
                
                if (audioData.length > 0) {
                    this.audioPlayer.src = audioData[0].link;
                    this.audioInfo.textContent = `سورة ${currentSurah.name.ar} - ${audioData[0].name}`;
                }
            } catch (error) {
                console.error('❌ فشل تحميل الصوت:', error);
                return;
            }
        }

        this.audioPlayer.play().then(() => {
            this.isPlaying = true;
            this.audioBtn.innerHTML = '<i class="fas fa-pause"></i>';
            this.audioFloating.style.display = 'block';
        }).catch(error => {
            console.error('❌ فشل تشغيل الصوت:', error);
        });
    }

    stopAudio() {
        this.audioPlayer.pause();
        this.isPlaying = false;
        this.audioBtn.innerHTML = '<i class="fas fa-play"></i>';
    }

    handleAudioEnded() {
        this.isPlaying = false;
        this.audioBtn.innerHTML = '<i class="fas fa-play"></i>';
        
        if (this.autoPlayNext) {
            const currentSurah = getSurahByPage(this.currentPage);
            const nextSurahNumber = currentSurah.number + 1;
            
            if (nextSurahNumber <= 114) {
                this.goToSurah(nextSurahNumber);
                setTimeout(() => this.playCurrentSurahAudio(), 1000);
            }
        }
    }

    closeAudioPlayer() {
        this.stopAudio();
        this.audioFloating.style.display = 'none';
    }

    zoomIn() {
        if (this.zoomLevel < 200) {
            this.zoomLevel += 10;
            this.applyZoom();
        }
    }

    zoomOut() {
        if (this.zoomLevel > 50) {
            this.zoomLevel -= 10;
            this.applyZoom();
        }
    }

    resetZoom() {
        this.zoomLevel = 100;
        this.applyZoom();
    }

    applyZoom() {
        if (this.displayMode === 'image') {
            this.quranImg.style.width = `${this.zoomLevel}%`;
        } else {
            const textElement = document.getElementById('quran-text');
            textElement.style.fontSize = `${this.zoomLevel / 100}em`;
        }
        
        this.zoomLevelDisplay.textContent = `${this.zoomLevel}%`;
    }

    toggleDisplayMode() {
        this.displayMode = this.displayMode === 'image' ? 'text' : 'image';
        
        if (this.displayMode === 'text') {
            this.displayToggleBtn.title = 'تبديل إلى الصورة';
            this.displayToggleBtn.innerHTML = '<i class="fas fa-image"></i>';
            this.loadPageText(this.currentPage);
        } else {
            this.displayToggleBtn.title = 'تبديل إلى النص';
            this.displayToggleBtn.innerHTML = '<i class="fas fa-font"></i>';
            this.loadPageImage(this.currentPage);
        }
    }

    changeFont(fontName) {
        this.currentFont = fontName;
        
        if (this.displayMode === 'text') {
            this.applySelectedFont();
        }
        
        // حفظ الاختيار
        localStorage.setItem('quran-font', fontName);
    }

    loadFonts() {
        // تحميل الخطوط المختارة
        const savedFont = localStorage.getItem('quran-font') || 'UthmanicHafs1';
        this.fontSelector.value = savedFont;
        this.currentFont = savedFont;
    }

    toggleSurahSelection() {
        const isVisible = this.surahSelectionList.style.display === 'block';
        this.surahSelectionList.style.display = isVisible ? 'none' : 'block';
    }

    async performSearch() {
        const query = this.searchInput.value.trim();
        if (!query) return;

        this.showLoading();
        
        try {
            // البحث في البيانات المحلية أولاً
            const results = await this.searchInLocalData(query);
            this.displaySearchResults(results);
        } catch (error) {
            console.error('❌ فشل البحث:', error);
            this.searchResults.innerHTML = '<div class="search-result-item">فشل في البحث</div>';
            this.searchResults.style.display = 'block';
        }
        
        this.hideLoading();
    }

    async searchInLocalData(query) {
        // هذا مثال مبسط للبحث
        // في التطبيق الحقيقي، ستحتاج إلى بيانات نصية كاملة للقرآن
        const results = [];
        
        // البحث في أسماء السور
        this.surahsData.forEach(surah => {
            if (surah.name.ar.includes(query) || surah.name.en.toLowerCase().includes(query.toLowerCase())) {
                results.push({
                    type: 'surah',
                    surah: surah.number,
                    text: `سورة ${surah.name.ar}`,
                    page: surah.start_page
                });
            }
        });
        
        return results;
    }

    displaySearchResults(results) {
        if (results.length === 0) {
            this.searchResults.innerHTML = '<div class="search-result-item">لا توجد نتائج</div>';
        } else {
            this.searchResults.innerHTML = results.map(result => `
                <div class="search-result-item" data-page="${result.page}">
                    <div class="result-text">${result.text}</div>
                    <div class="result-type">${result.type === 'surah' ? 'سورة' : 'آية'}</div>
                </div>
            `).join('');
            
            // إضافة مستمعي الأحداث للنتائج
            this.searchResults.querySelectorAll('.search-result-item').forEach(item => {
                item.addEventListener('click', () => {
                    const page = parseInt(item.dataset.page);
                    this.goToPage(page);
                    this.searchResults.style.display = 'none';
                    this.searchInput.value = '';
                });
            });
        }
        
        this.searchResults.style.display = 'block';
    }

    showSurahList() {
        // تنفيذ عرض قائمة السور
        console.log('عرض قائمة السور');
    }

    showJuzList() {
        // تنفيذ عرض قائمة الأجزاء
        console.log('عرض قائمة الأجزاء');
    }

    showSajdaList() {
        // تنفيذ عرض مواضع السجود
        console.log('عرض مواضع السجود');
    }

    scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    toggleTheme() {
        const isDark = document.body.classList.contains('dark-theme');
        
        if (isDark) {
            document.body.className = 'light-theme';
            this.themeBtn.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('quran-theme', 'light');
        } else {
            document.body.className = 'dark-theme';
            this.themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('quran-theme', 'dark');
        }
    }

    showLoading() {
        this.loadingScreen.style.display = 'flex';
    }

    hideLoading() {
        this.loadingScreen.style.display = 'none';
    }
}

// ========================================
// تهيئة التطبيق عند تحميل الصفحة
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    // تهيئة قارئ القرآن
    window.quranReader = new QuranReader();

    // تسجيل Service Worker لتطبيق PWA
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('✅ Service Worker مسجل بنجاح:', registration);
            })
            .catch(error => {
                console.log('❌ فشل تسجيل Service Worker:', error);
            });
    }

    // إعداد زر تثبيت PWA
    let deferredPrompt;
    const installBtn = document.getElementById('pwa-install');

    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        installBtn.style.display = 'block';
        
        installBtn.addEventListener('click', () => {
            installBtn.style.display = 'none';
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
                deferredPrompt = null;
            });
        });
    });
});

// ========================================
// CSS إضافي للخطوط والتحسينات
// ========================================
const additionalCSS = `
/* تنسيقات الخطوط القرآنية */
@font-face {
    font-family: 'UthmanicHafs1';
    src: url('fonts/UthmanicHafs1 Ver13.otf') format('opentype');
    font-display: swap;
}

@font-face {
    font-family: 'AmiriQuran';
    src: url('fonts/ArbFONTS-Amiri-Quran.ttf') format('truetype');
    font-display: swap;
}

@font-face {
    font-family: 'AmiriQuranColored';
    src: url('fonts/amiri-quran-colored.ttf') format('truetype');
    font-display: swap;
}

/* تنسيقات النص القرآني */
.quran-text {
    font-family: 'UthmanicHafs1', 'Traditional Arabic', serif;
    line-height: 2.5;
    text-align: right;
    direction: rtl;
    padding: 20px;
    max-width: 100%;
    margin: 0 auto;
}

.quran-text.UthmanicHafs1 {
    font-family: 'UthmanicHafs1', serif;
}

.quran-text.AmiriQuran {
    font-family: 'AmiriQuran', serif;
}

.quran-text.AmiriQuranColored {
    font-family: 'AmiriQuranColored', serif;
}

/* تنسيق الآيات */
.verse {
    margin-bottom: 25px;
    padding: 15px;
    border-radius: 10px;
    background: var(--verse-bg, #f8f9fa);
    transition: all 0.3s ease;
}

.verse:hover {
    background: var(--verse-hover-bg, #e9ecef);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.verse-number {
    display: inline-block;
    background: var(--primary-color, #2c5e8e);
    color: white;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    text-align: center;
    line-height: 30px;
    margin-left: 10px;
    font-size: 14px;
}

.verse-text {
    font-size: 1.4em;
    margin-bottom: 10px;
    display: block;
}

.verse-translation {
    font-size: 1em;
    color: var(--text-secondary, #666);
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid var(--border-color, #ddd);
    font-family: system-ui, -apple-system, sans-serif;
}

/* عناصر التحكم في الخط */
.font-control {
    margin: 15px 0;
    text-align: right;
}

.font-control label {
    display: block;
    margin-bottom: 5px;
    color: var(--text-color);
    font-weight: 500;
}

.font-selector {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    background: var(--bg-color);
    color: var(--text-color);
    font-size: 14px;
}

/* زر تبديل العرض */
#display-toggle {
    background: var(--primary-color);
    color: white;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    font-size: 18px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

#display-toggle:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 16px rgba(0,0,0,0.2);
}

/* تحسينات للشاشات الصغيرة */
@media (max-width: 768px) {
    .quran-text {
        font-size: 1.2em;
        line-height: 2.2;
        padding: 15px;
    }
    
    .verse {
        margin-bottom: 20px;
        padding: 12px;
    }
    
    .verse-text {
        font-size: 1.3em;
    }
    
    .verse-number {
        width: 25px;
        height: 25px;
        line-height: 25px;
        font-size: 12px;
    }
    
    #display-toggle {
        width: 45px;
        height: 45px;
        font-size: 16px;
    }
}

@media (max-width: 480px) {
    .quran-text {
        font-size: 1.1em;
        line-height: 2;
        padding: 10px;
    }
    
    .verse {
        margin-bottom: 15px;
        padding: 10px;
    }
    
    .verse-text {
        font-size: 1.2em;
    }
}

/* تحسينات للوضع الداكن */
.dark-theme .verse {
    background: var(--verse-bg, #2d3748);
}

.dark-theme .verse:hover {
    background: var(--verse-hover-bg, #4a5568);
}

.dark-theme .verse-translation {
    color: var(--text-secondary, #a0aec0);
    border-top-color: var(--border-color, #4a5568);
}
`;

// إضافة CSS الإضافي إلى الصفحة
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalCSS;
document.head.appendChild(styleSheet);
