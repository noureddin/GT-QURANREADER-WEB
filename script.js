// script.js - GT-QURANREADER-WEB (معدّل بحسب طلبك)
// ========================================
// ملاحظات: تم الحفاظ على بنية الكود الأصلية (دوال/أسماء/فئات).
// قمت بإضافة: مصدر صور GitHub + دعم خطوط من مجلد fonts/ + مشغل سورة كاملة + اختيار الخط + عرض نصي افتراضي + تحريك المشغل لليسار
// ========================================

// ========================================
// بيانات السور المضمنة (كما في نسختك الأصلية)
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
// توليد بيانات الصفحات (604 صفحة) - كما في الأصل
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
// QuranDataManager - تحميل النص/الصوت/الصور مع بنية مصادر واضحة
// ========================================
class QuranDataManager {
    constructor() {
        // بنية المصادر: سهلة التعديل من هنا فقط
        this.sources = {
            // API النص: نترك alquran.cloud كخيار افتراضي، لكن أضفت santrikoding كمثال أيضاً.
            textAPIs: [
                'https://api.alquran.cloud/v1/quran/quran-uthmani',
                'https://api.santrikoding.com/quran/quran-uthmani' // مثال بديل
            ],
            // قالب رابط صور (raw.githubusercontent) — يستخدم ترقيم 3 خانات 001.png ... 604.png
            // (تعديل هنا لتغيير مصدر الصور إلى أي مستودع آخر)
            imageTemplate: 'https://raw.githubusercontent.com/GovarJabbar/Quran-PNG/master/{page}.png',
            // مصادر صوتية مرتبة بالأولوية — كل عنصر يمكن أن يكون قالباً يعتمد على {surah}
            audioTemplates: [
                // مثال: مشاري العفاسي (ملفات سور كاملة قد تتوفر في بعض المصادر)
                'https://cdn.islamic.network/quran/audio/128/ar.alafasy/{surah}.mp3',
                // عبد الباسط (إن توفّر بصيغة surah)
                'https://cdn.islamic.network/quran/audio/128/ar.abdulbasitmurattal/{surah}.mp3',
                // قالب احتياطي عام (قد يكون غير متوافق لاسم السورة - يستعمل رقم السورة ثلاثي)
                'https://example.com/quran-audio/{surah}.mp3'
            ],
            // اسماء الملفات داخل مجلد fonts (تستعمل عند حقن @font-face)
            fonts: [
                'ArbFONTS-Amiri Quran.ttf',
                'ArbFONTS-Amiri-Quran.ttf',
                'UthmanicHafs1 Ver13.otf',
                'amiri-quran-colored.ttf',
                'amiri-quran.ttf'
            ],
            // اسم مجلد الخطوط (يمكن تغييره بسهولة)
            fontsFolder: './fonts'
        };

        this.baseURL = 'https://api.alquran.cloud/v1'; // احتفاظ كمرجع قد يحتاجه البعض
        this.fallbackImageURL = 'https://everyayah.com/data/images_png/';
        this.cache = new Map();
        this.pagesData = generatePagesData();
        this.surahsData = EMBEDDED_SURAHS_DATA;
    }

    // مفتاح كاش بسيط
    async loadData(type, params = {}) {
        const cacheKey = `${type}-${JSON.stringify(params)}`;
        if (this.cache.has(cacheKey)) return this.cache.get(cacheKey);

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
                case 'text':
                    data = await this.loadTextData();
                    break;
                default:
                    throw new Error(`نوع غير معروف: ${type}`);
            }
            this.cache.set(cacheKey, data);
            return data;
        } catch (err) {
            console.error(`❌ فشل تحميل ${type}:`, err);
            return this.getEmbeddedData(type);
        }
    }

    // تحميل نص القرآن — يحاول عدة واجهات مرتبة في sources.textAPIs
    async loadTextData() {
        for (const api of this.sources.textAPIs) {
            try {
                const resp = await fetch(api);
                if (!resp.ok) throw new Error(`status ${resp.status}`);
                const json = await resp.json();
                // شكل alquran.cloud: json.data.surahs
                if (json && (json.data && json.data.surahs)) {
                    console.log(`📜 تم جلب النص من ${api}`);
                    return json.data.surahs;
                }
                // في حالة santrikoding أو غيره قد يعود بصيغة مختلفة — غالبًا نفس البنية
                if (json && json.surahs) {
                    console.log(`📜 تم جلب النص (بديل) من ${api}`);
                    return json.surahs;
                }
            } catch (err) {
                console.warn(`⚠️ تعذر جلب النص من ${api}:`, err.message || err);
                // نجرب المصدر التالي
            }
        }
        console.warn('❌ لم يتم جلب نص من أي API — سيتم استخدام البيانات المضمنة حين يلزم');
        return []; // fallback: المستدعي سيستخدم getEmbeddedData عند الحاجة
    }

    // تحميل بيانات الصوت لسورة كاملة: نحاول القوالب بالتتابع ونرجع أول مصدر صالح
    async loadAudioData(surahNumber) {
        const surahPadded = String(surahNumber).padStart(3, '0');
        const tried = [];
        for (const tpl of this.sources.audioTemplates) {
            const url = tpl.replace('{surah}', surahPadded);
            try {
                // نتحقق فقط من وجود الملف (HEAD) إن أمكن — بعض الخوادم لا تسمح بالـ HEAD
                const headResp = await fetch(url, { method: 'HEAD' });
                if (headResp.ok) {
                    return [{ link: url, name: `صوت - ${surahNumber}` }];
                } else {
                    // بعض الخوادم ترفض HEAD => نجرب GET ولكن بتحميل جزئي (نطلب نطاق أول بايت)
                    const rangeResp = await fetch(url, { method: 'GET', headers: { Range: 'bytes=0-1' } });
                    if (rangeResp.ok || rangeResp.status === 206) {
                        return [{ link: url, name: `صوت - ${surahNumber}` }];
                    }
                }
            } catch (err) {
                tried.push(url);
                // نتابع للمصدر التالي
            }
        }

        // لم ننجح: نرجع رابط افتراضي (عبد الباسط بترقيم ثلاثي كما في getFallbackAudioUrl)
        console.warn('⚠️ تحذير: لم يتم العثور على أي قالب صوتي صالح، تم إرجاع رابط افتراضي.');
        return [{
            link: this.getFallbackAudioUrl(surahNumber),
            name: 'مصدر احتياطي - عبد الباسط'
        }];
    }

    // رابط احتياطي بصيغة معروفة (رقم السورة ثلاثي)
    getFallbackAudioUrl(surahNumber) {
        const surahStr = String(surahNumber).padStart(3, '0');
        return `https://cdn.islamic.network/quran/audio/128/ar.abdulbasitmurattal/${surahStr}.mp3`;
    }

    // صور الصفحات: يستخدم قالب imageTemplate من المصادر، مع تحويل {page} إلى 3 خانات
    getPageImageUrl(page) {
        // نكوّن الاسم ذو 3 خانات: 001.png
        const pageStr = String(page).padStart(3, '0');
        // استبدال placeholder
        const tpl = this.sources.imageTemplate;
        if (tpl.includes('{page}')) {
            return tpl.replace('{page}', pageStr);
        }
        // إن لم يكن قالب واضح، نستخدم fallback
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
// دوال مساعدة عامة (لم تتغير بنية الأسماء)
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
        if (page >= juzPages[i]) return i + 1;
    }
    return 1;
}

function getJuzStartPage(juz) {
    const juzPages = [1, 22, 42, 62, 82, 102, 122, 142, 162, 182, 202, 222, 242, 262, 282, 302, 322, 342, 362, 382, 402, 422, 442, 462, 482, 502, 522, 542, 562, 582];
    return juzPages[juz - 1] || 1;
}

// ========================================
// الفئة الرئيسية - QuranReader (بقيت بنية الفئة كما كانت لكن أضفت دعم الخطوط وملف الصوت الكامل)
// ========================================
class QuranReader {
    constructor() {
        // حالة العرض
        this.currentPage = 1;
        this.totalPages = 604;
        this.zoomLevel = 100;
        this.isPlaying = false;
        this.currentAudioSurah = null;
        this.autoPlayNext = true;
        this.dataManager = new QuranDataManager();
        this.isOnline = navigator.onLine;
        this.pagesData = null;
        this.surahsData = null;
        this.quranText = null; // سيحتوي على مصفوفة السور من API النص
        // المطلب: العرض النصي هو الأساسي الآن
        this.viewMode = localStorage.getItem('gt_quran_view') || 'text'; // 'image' or 'text'

        // الخط المحدد (قيمة اسم ملف موجود في fontsFolder) — حفظ في localStorage
        this.selectedFont = localStorage.getItem('gt_quran_font') || this.dataManager.sources.fonts[2] || 'UthmanicHafs1 Ver13.otf';

        // عناصر DOM (سيتم تهيئتها)
        this.initializeElements();
        this.setupEventListeners();
        this.setupOnlineHandler();
        this.setDefaultTheme(); // الوضع الداكن افتراضي
        this.createViewToggleIfMissing(); // زر التبديل في شريط النص
        this.injectFontsDynamically(); // حقن @font-face للخطوط من مجلد fonts
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

        this.searchInput = document.getElementById('search-input');
        this.searchBtn = document.getElementById('search-btn');
        this.searchResults = document.getElementById('search-results');

        this.navSurah = document.getElementById('nav-surah');
        this.navJuz = document.getElementById('nav-juz');
        this.navSajda = document.getElementById('nav-sajda');

        this.surahModal = document.getElementById('surah-list');
        this.juzModal = document.getElementById('juz-list');
        this.surahSelector = document.getElementById('surah-selector');
        this.surahSelectionList = document.getElementById('surah-selection-list');

        // عنصر نص القرآن: إذا لم يكن في HTML، ننشئه ديناميكيًا داخل .quran-page
        this.textContainer = document.getElementById('quran-text');
        if (!this.textContainer) {
            const qPage = document.querySelector('.quran-page');
            this.textContainer = document.createElement('div');
            this.textContainer.id = 'quran-text';
            // التنسيق الافتراضي للنص
            this.textContainer.style.textAlign = 'right';
            this.textContainer.style.direction = 'rtl';
            this.textContainer.style.padding = '10px';
            this.textContainer.style.display = 'none';
            qPage.appendChild(this.textContainer);
        }

        // عنصر اختيار الخط - نقوم بإنشائه داخل إعدادات إن لم يوجد
        this.fontSelector = document.getElementById('font-selector');
        if (!this.fontSelector) {
            const settingsBar = document.querySelector('.settings-bar') || document.body;
            const sel = document.createElement('select');
            sel.id = 'font-selector';
            sel.title = 'اختيار خط عرض المصحف';
            // نضيف خيارات من dataManager.sources.fonts
            (this.dataManager ? this.dataManager.sources.fonts : []).forEach(f => {
                const opt = document.createElement('option');
                opt.value = f;
                opt.textContent = f.replace(/\.(ttf|otf)$/i, '');
                sel.appendChild(opt);
            });
            settingsBar.appendChild(sel);
            this.fontSelector = sel;
        }
    }

    // حقن @font-face ديناميكيًا لخطوط المجلد fonts
    injectFontsDynamically() {
        try {
            const fonts = this.dataManager.sources.fonts || [];
            const folder = this.dataManager.sources.fontsFolder || './fonts';
            let styleText = '';
            fonts.forEach(fontFile => {
                // نكوّن اسمًا يصلح كـ font-family (نأخذ اسم الملف بدون الامتداد)
                const family = fontFile.replace(/\.(ttf|otf)$/i, '');
                const url = `${folder}/${encodeURIComponent(fontFile)}`;
                styleText += `
                @font-face {
                    font-family: "${family}";
                    src: local("${family}"), url("${url}") format("${fontFile.toLowerCase().endsWith('.otf') ? 'opentype' : 'truetype'}");
                    font-display: swap;
                }
                `;
            });
            const styleEl = document.createElement('style');
            styleEl.id = 'dynamic-quran-fonts';
            styleEl.innerHTML = styleText;
            document.head.appendChild(styleEl);

            // نطبّق الخط المحدد إذا وجد
            const selFamily = this.selectedFont.replace(/\.(ttf|otf)$/i, '');
            this.applySelectedFontFamily(selFamily);
            if (this.fontSelector) this.fontSelector.value = this.selectedFont;
            // عند تغيير الاختيار، نطبقه ونخزنه
            this.fontSelector.addEventListener('change', (e) => {
                this.selectedFont = e.target.value;
                const familyName = this.selectedFont.replace(/\.(ttf|otf)$/i, '');
                this.applySelectedFontFamily(familyName);
                localStorage.setItem('gt_quran_font', this.selectedFont);
            });
        } catch (err) {
            console.warn('⚠️ تعذر حقن الخطوط ديناميكياً:', err);
        }
    }

    applySelectedFontFamily(family) {
        // نطبّق الخط على عنصر النص الكامل (وأماكن إضافية إن احتجنا)
        if (this.textContainer) {
            this.textContainer.style.fontFamily = `'${family}', serif`;
        }
        // يمكن إضافة عناصر أخرى إن أردت
    }

    // ينشئ زر تبديل العرض داخل شريط text-controls إذا لم يوجد
    createViewToggleIfMissing() {
        const textControls = document.querySelector('.text-controls');
        if (!textControls) return;

        let toggleBtn = document.getElementById('toggle-view');
        if (!toggleBtn) {
            toggleBtn = document.createElement('button');
            toggleBtn.id = 'toggle-view';
            toggleBtn.className = 'zoom-btn';
            toggleBtn.title = 'التبديل بين عرض المصحف / النص';
            toggleBtn.innerHTML = (this.viewMode === 'text') ? '<i class="fas fa-file-alt"></i>' : '<i class="fas fa-file-image"></i>';
            textControls.appendChild(toggleBtn);
        }

        this.updateToggleButtonUI(toggleBtn);
        toggleBtn.addEventListener('click', () => this.toggleView());
    }

    updateToggleButtonUI(btn) {
        if (!btn) return;
        if (this.viewMode === 'text') {
            btn.innerHTML = '<i class="fas fa-file-alt"></i>';
            btn.title = 'معاينة النص';
        } else {
            btn.innerHTML = '<i class="fas fa-file-image"></i>';
            btn.title = 'معاينة المصحف المصوّر';
        }
    }

    setupEventListeners() {
        // التنقل
        if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.previousPage());
        if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.nextPage());

        if (this.themeBtn) this.themeBtn.addEventListener('click', () => this.toggleTheme());

        if (this.audioBtn) this.audioBtn.addEventListener('click', () => this.toggleAudio());
        if (this.closeAudioBtn) this.closeAudioBtn.addEventListener('click', () => this.hideAudioPlayer());

        if (this.audioPlayer) {
            // عند تشغيل الملف (سورة كاملة) وبدء التشغيل -> تاكيد الحالة
            this.audioPlayer.addEventListener('ended', () => this.onAudioEnded());
            this.audioPlayer.addEventListener('play', () => this.onAudioPlay());
            this.audioPlayer.addEventListener('pause', () => this.onAudioPause());
        }

        if (this.zoomInBtn) this.zoomInBtn.addEventListener('click', () => this.zoomIn());
        if (this.zoomOutBtn) this.zoomOutBtn.addEventListener('click', () => this.zoomOut());
        if (this.resetZoomBtn) this.resetZoomBtn.addEventListener('click', () => this.resetZoom());

        if (this.scrollTopBtn) this.scrollTopBtn.addEventListener('click', () => this.scrollToTop());

        if (this.searchBtn) this.searchBtn.addEventListener('click', () => this.performSearch());
        if (this.searchInput) this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.performSearch();
        });

            if (this.navSurah) this.navSurah.addEventListener('click', () => this.showSurahList());
            if (this.navJuz) this.navJuz.addEventListener('click', () => this.showJuzList());
            if (this.navSajda) this.navSajda.addEventListener('click', () => this.showSajdaInfo());

            document.querySelectorAll('.close').forEach(closeBtn => {
                closeBtn.addEventListener('click', (e) => {
                    const modal = e.target.closest('.modal');
                    if (modal) modal.style.display = 'none';
                });
            });

            window.addEventListener('click', (e) => {
                if (e.target.classList && e.target.classList.contains('modal')) {
                    e.target.style.display = 'none';
                }
            });

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

                // إدارة وضعية المشغّل والانسيابية عند تغيير حجم الشاشة
                window.addEventListener('resize', () => this.adjustFloatingAudioLayout());
                // تعيين أولي
                this.adjustFloatingAudioLayout();

                window.addEventListener('scroll', () => this.toggleScrollTopButton());
    }

    setupOnlineHandler() {
        window.addEventListener('online', () => this.updateConnectionStatus(true));
        window.addEventListener('offline', () => this.updateConnectionStatus(false));
        this.updateConnectionStatus(navigator.onLine);
    }

    updateConnectionStatus(online) {
        this.isOnline = online;
        if (!this.connectionStatus || !this.connectionIcon) return;
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
        // الوضع الداكن افتراضي كما طلبت
        document.body.classList.add('dark-mode');
        const icon = this.themeBtn ? this.themeBtn.querySelector('i') : null;
        if (icon) icon.className = 'fas fa-sun';
        if (this.themeBtn) this.themeBtn.title = 'الوضع النهاري';
    }

    // ========================================
    // التحميل المبدئي للبيانات (صفحات + سور + نص)
    // ========================================
    async loadInitialData() {
        try {
            console.log('📄 بدء تحميل بيانات القرآن...');
            // pages و surahs سريعة (مضمنة)، نص قد يحتاج وقتًا
            const [pagesData, surahsData, quranText] = await Promise.all([
                this.dataManager.loadData('pages'),
                                                                         this.dataManager.loadData('surahs'),
                                                                         this.dataManager.loadData('text')
            ]);

            this.pagesData = pagesData;
            this.surahsData = surahsData;
            this.quranText = (quranText && quranText.length > 0) ? quranText : null;

            this.hideLoadingScreen();
            this.updatePage(); // يعرض الصفحة الحالية حسب viewMode
            console.log('✅ تم تحميل البيانات بنجاح');
        } catch (err) {
            console.error('❌ خطأ في تحميل البيانات:', err);
            // استخدام البيانات المضمنة كاحتياط
            this.pagesData = this.dataManager.pagesData;
            this.surahsData = this.dataManager.surahsData;
            this.quranText = null;
            this.hideLoadingScreen();
            this.updatePage();
        }
    }

    hideLoadingScreen() {
        setTimeout(() => {
            if (this.loadingScreen) this.loadingScreen.style.display = 'none';
            if (this.container) this.container.style.display = 'flex';
        }, 700);
    }

    // ========================================
    // تغيير الصفحة (تحديث العرض: نص أو صورة)
    // ========================================
    async updatePage() {
        try {
            // تحديث بيانات الصفحة
            this.pageNumber.textContent = `الصفحة: ${this.currentPage}`;
            this.updatePageInfo();
            this.updateAvailableSurahs();

            if (this.viewMode === 'text') {
                // عرض نصي - إن لم تكن البيانات موجودة نظهر رسالة أو نعود للصور
                if (this.quranText) {
                    this.displayTextPage(this.currentPage);
                } else {
                    // نص غير متوفر: نعرض إشعار ونعيد للعرض الصوري
                    this.showMessage('تعذر تحميل النص العثماني — سيتم عرض المصحف المصوّر', 'warning');
                    this.viewMode = 'image';
                    localStorage.setItem('gt_quran_view', this.viewMode);
                    this.displayImagePage(this.currentPage);
                    this.updateToggleButtonUI(document.getElementById('toggle-view'));
                }
            } else {
                // عرض صورة
                this.displayImagePage(this.currentPage);
            }

            this.preloadNextPages();
        } catch (err) {
            console.error('خطأ في updatePage:', err);
        }
    }

    updatePageInfo() {
        if (!this.pagesData) return;
        const pageInfo = this.pagesData.find(p => p.page === this.currentPage) || null;
        if (pageInfo) {
            let surahText = `السورة: ${pageInfo.start.name.ar}`;
            if (pageInfo.end && pageInfo.end.surah_number !== pageInfo.start.surah_number) {
                surahText += ` - ${pageInfo.end.name.ar}`;
            }
            if (this.surahInfo) this.surahInfo.textContent = surahText;
            if (this.juzInfo) this.juzInfo.textContent = `الجزء: ${pageInfo.start.juz}`;
        }
    }

    updateAvailableSurahs() {
        this.availableSurahsInPage = [];
        const surah = getSurahByPage(this.currentPage);
        if (surah) {
            this.availableSurahsInPage.push({
                number: surah.number,
                name: surah.name.ar,
                verses_count: surah.verses_count,
                revelation_place: surah.revelation_place.ar
            });
        }
    }

    // ========================================
    // عرض الصور
    // ========================================
    displayImagePage(pageNumber) {
        if (!this.quranImg) return;
        // تأكد من أن عنصر النص مخفي
        if (this.textContainer) this.textContainer.style.display = 'none';

        const imageUrl = this.dataManager.getPageImageUrl(pageNumber);
        this.quranImg.style.display = 'block';
        this.quranImg.src = imageUrl;
        this.quranImg.alt = `صفحة القرآن ${pageNumber}`;

        this.quranImg.onload = () => {
            console.log(`✅ تم تحميل صفحة الصورة ${pageNumber}`);
        };

        this.quranImg.onerror = () => {
            console.error(`❌ فشل تحميل صفحة الصورة ${pageNumber}`);
            this.showImageError();
        };
    }

    showImageError() {
        if (!this.quranImg) return;
        this.quranImg.src = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='700' height='900' viewBox='0 0 700 900'><rect width='100%' height='100%' fill='%231a1a2e'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='24' fill='%23e9ecef'>صفحة ${this.currentPage}</text></svg>`;
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

    // ========================================
    // عرض النص: يعرض السورة التي تحتوي الصفحة (الآن النص هو العرض الأساسي)
    // ========================================
    displayTextPage(pageNumber) {
        // إخفاء الصورة
        if (this.quranImg) this.quranImg.style.display = 'none';
        if (!this.textContainer) return;

        // العثور على السورة التي تبدأ في أو قبل الصفحة
        const surahMeta = getSurahByPage(pageNumber);
        if (!this.quranText) {
            this.textContainer.innerHTML = `<p>نص القرآن غير متاح حالياً.</p>`;
            this.textContainer.style.display = 'block';
            return;
        }

        // إظهار السورة الكاملة (لأن API يعيد سور مع آياتها)
        const surah = this.quranText.find(s => s.number === surahMeta.number);
        if (!surah) {
            this.textContainer.innerHTML = `<p>تعذر العثور على السورة في نص API.</p>`;
            this.textContainer.style.display = 'block';
            return;
        }

        // بناء HTML للآيات — نضع span لكل آية مع رقم الآية داخل السورة
        const versesHTML = surah.ayahs.map(a => {
            const ayahNum = a.numberInSurah || '';
            const ayahText = a.text || a.translation || '';
            return `<div class="ayah-block" data-ayah-global="${a.number}" style="margin:6px 0; font-size: 1.6rem; line-height:2.2;">
            <span class="ayah-text" style="font-family: '${this.selectedFont.replace(/\.(ttf|otf)$/i, '')}', serif;">${ayahText}</span>
            <span class="ayah-number" style="display:inline-block; margin-right:8px; color: rgba(46,134,171,0.9); font-weight:600;">(${ayahNum})</span>
            </div>`;
        }).join('\n');

        // رأس السورة
        const headerHTML = `<div style="text-align:center; margin-bottom:12px;">
        <h2 style="margin:0; color: #2e86ab; font-weight:700;">سورة ${surah.name}</h2>
        <div style="opacity:0.8; margin-top:6px;">آيات: ${surah.ayahs.length}</div>
        </div>`;

        this.textContainer.innerHTML = headerHTML + `<div class="verses-list">${versesHTML}</div>`;
        this.textContainer.style.display = 'block';
        // نمرّر إلى بداية السورة إذا احتجنا
        this.textContainer.scrollTop = 0;
    }

    // ========================================
    // التبديل بين العرضين
    // ========================================
    toggleView() {
        this.viewMode = (this.viewMode === 'text') ? 'image' : 'text';
        localStorage.setItem('gt_quran_view', this.viewMode);
        const toggleBtn = document.getElementById('toggle-view');
        this.updateToggleButtonUI(toggleBtn);
        this.updatePage();
    }

    // ========================================
    // صوت: تشغيل / إيقاف وواجهات مساعدة
    // ========================================
    async toggleAudio() {
        if (this.isPlaying) {
            this.stopAudio();
        } else {
            // تشغيل سورة للصفحة الحالية
            const surah = getSurahByPage(this.currentPage);
            if (surah) await this.playSurahAudio(surah.number);
        }
    }

    // تشغيل سورة كاملة (لن يتوقف عند التنقل بين الصفحات ما لم يطلب المستخدم الإيقاف)
    async playSurahAudio(surahNumber) {
        try {
            const audioData = await this.dataManager.loadData('audio', { surah: surahNumber });
            if (audioData && audioData.length > 0) {
                // اختيار أول مصدر صالح
                this.currentAudio = audioData[0].link;
                this.audioPlayer.src = this.currentAudio;
                this.showAudioPlayer();

                const surahMeta = this.surahsData.find(s => s.number === surahNumber);
                this.audioInfo.textContent = `سورة ${surahMeta ? surahMeta.name.ar : surahNumber}`;

                // لا نعطي خطأ عند التنقل: المشغل سيستمر
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
        } catch (err) {
            console.error('خطأ في تشغيل الصوت:', err);
            this.showMessage('تعذر تشغيل التلاوة. يرجى المحاولة لاحقاً.', 'error');
        }
    }

    stopAudio() {
        if (this.audioPlayer) {
            this.audioPlayer.pause();
            this.audioPlayer.currentTime = 0;
        }
        this.isPlaying = false;
        if (this.audioBtn) {
            this.audioBtn.classList.remove('playing');
            this.audioBtn.innerHTML = '<i class="fas fa-play"></i>';
            this.audioBtn.title = 'تشغيل التلاوة';
        }
    }

    showAudioPlayer() {
        if (this.audioFloating) {
            this.audioFloating.classList.add('show');
            // نمط: نضع المشغل على اليسار كما طلبت، والأزرار على اليمين
            this.audioFloating.style.position = 'fixed';
            this.audioFloating.style.left = '12px';
            this.audioFloating.style.bottom = '12px';
            this.audioFloating.style.transition = 'all 0.35s ease';
            this.audioFloating.style.zIndex = 9999;
            // إضافة تنسيق داخلي للأزرار (إذا كانت ضمن audioFloating)
            // لا نغيّر بنية HTML وإنما نتحكّم بالـ CSS فقط هنا لضمان أنها لا تحجب المحتوى
        }
    }

    hideAudioPlayer() {
        if (this.audioFloating) this.audioFloating.classList.remove('show');
        this.stopAudio();
    }

    onAudioPlay() {
        this.isPlaying = true;
        if (this.audioBtn) {
            this.audioBtn.classList.add('playing');
            this.audioBtn.innerHTML = '<i class="fas fa-stop"></i>';
            this.audioBtn.title = 'إيقاف التلاوة';
        }
    }

    onAudioPause() {
        if (this.audioBtn) {
            this.audioBtn.classList.remove('playing');
            this.audioBtn.innerHTML = '<i class="fas fa-play"></i>';
            this.audioBtn.title = 'تشغيل التلاوة';
        }
    }

    onAudioEnded() {
        // عند انتهاء السورة ننتقل للسورة التالية تلقائياً (إذا مفعل)
        if (this.autoPlayNext && this.currentAudioSurah) {
            this.playNextSurah();
        } else {
            this.stopAudio();
        }
    }

    async playNextSurah() {
        const nextSurahNumber = this.currentAudioSurah + 1;
        if (nextSurahNumber <= 114) {
            const nextSurah = this.surahsData.find(s => s.number === nextSurahNumber);
            if (nextSurah) {
                // نحدّث الصفحة لتبدأ من بداية السورة التالية
                this.currentPage = nextSurah.start_page;
                await this.updatePage();
                await this.playSurahAudio(nextSurahNumber);
            }
        } else {
            this.stopAudio();
            this.showMessage('تم الانتهاء من القرآن الكريم', 'success');
        }
    }

    // ========================================
    // أدوات النص (تكبير/تصغير)
    // ========================================
    zoomIn() {
        if (this.zoomLevel < 200) {
            this.zoomLevel += 10;
            this.applyZoom();
        }
    }

    zoomOut() {
        if (this.zoomLevel > 60) {
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
        if (this.zoomLevelDisplay) this.zoomLevelDisplay.textContent = `${this.zoomLevel}%`;
        localStorage.setItem('gt_quran_zoom', this.zoomLevel);
    }

    // ========================================
    // البحث: يدعم الآن البحث في أسماء السور، والنص إن كان متوفرًا
    // ========================================
    async performSearch() {
        const query = (this.searchInput && this.searchInput.value) ? this.searchInput.value.trim() : '';
        if (!query) {
            this.showMessage('الرجاء إدخال نص للبحث', 'warning');
            return;
        }

        try {
            const results = await this.searchInQuran(query);
            this.displaySearchResults(results);
        } catch (err) {
            console.error('خطأ في البحث:', err);
            this.showMessage('حدث خطأ أثناء البحث', 'error');
        }
    }

    async searchInQuran(query) {
        const results = [];
        const q = query.toLowerCase();

        // البحث في أسماء السور (دائمًا متاح)
        this.surahsData.forEach(surah => {
            if (surah.name.ar.includes(query) || surah.name.en.toLowerCase().includes(q)) {
                results.push({
                    type: 'surah',
                    surah: surah.number,
                    text: `سورة ${surah.name.ar}`,
                    page: surah.start_page
                });
            }
        });

        // إذا النص متوفر، نبحث داخل الآيات
        if (this.quranText) {
            this.quranText.forEach(surah => {
                surah.ayahs.forEach(ay => {
                    if (ay.text && ay.text.toLowerCase().includes(q)) {
                        const snippet = ay.text.length > 120 ? ay.text.slice(0, 120) + '...' : ay.text;
                        results.push({
                            type: 'ayah',
                            surah: surah.number,
                            ayah: ay.numberInSurah,
                            text: `سورة ${surah.name} - (${ay.numberInSurah}) ${snippet}`,
                                     page: this.findPageForAyahGlobalNumber(ay.number)
                        });
                    }
                });
            });
        }

        return results.slice(0, 40);
    }

    findPageForAyahGlobalNumber(globalNumber) {
        if (!this.quranText) return 1;
        for (const surah of this.quranText) {
            if (surah.ayahs.some(a => a.number === globalNumber)) {
                const meta = EMBEDDED_SURAHS_DATA.find(s => s.number === surah.number);
                return meta ? meta.start_page : 1;
            }
        }
        return 1;
    }

    displaySearchResults(results) {
        if (!this.searchResults) return;
        if (results.length === 0) {
            this.searchResults.innerHTML = '<div class="search-result-item">لم يتم العثور على نتائج</div>';
            this.searchResults.style.display = 'block';
            return;
        }

        this.searchResults.innerHTML = results.map(r => {
            if (r.type === 'surah') {
                return `<div class="search-result-item" data-page="${r.page}" data-type="surah">${r.text}</div>`;
            } else {
                return `<div class="search-result-item" data-page="${r.page}" data-type="ayah">${r.text}</div>`;
            }
        }).join('');

        this.searchResults.querySelectorAll('.search-result-item').forEach(item => {
            item.addEventListener('click', () => {
                const page = parseInt(item.dataset.page) || 1;
                this.goToPage(page);
                this.searchResults.style.display = 'none';
                if (this.searchInput) this.searchInput.value = '';
            });
        });

        this.searchResults.style.display = 'block';
    }

    // ========================================
    // قوائم السور و الأجزاء و آيات السجود
    // ========================================
    showSurahList() {
        if (!this.surahsData) return;
        const surahListHTML = this.surahsData.map(surah => `
        <div class="surah-item" data-page="${surah.start_page}">
        <div class="surah-number">${surah.number}</div>
        <div class="surah-name">${surah.name.ar}</div>
        <div class="surah-details">
        <span class="surah-verse-count">${surah.verses_count} آية</span>
        <span class="surah-revelation">${surah.revelation_place.ar}</span>
        </div>
        </div>
        `).join('');

        const listContent = this.surahModal ? this.surahModal.querySelector('#surah-list-content') : null;
        if (listContent) listContent.innerHTML = surahListHTML;
        if (this.surahModal) this.surahModal.style.display = 'flex';

        if (this.surahModal) {
            this.surahModal.querySelectorAll('.surah-item').forEach(item => {
                item.addEventListener('click', () => {
                    const page = parseInt(item.dataset.page);
                    this.goToPage(page);
                    this.surahModal.style.display = 'none';
                });
            });
        }
    }

    showJuzList() {
        const juzListHTML = Array.from({ length: 30 }, (_, i) => {
            const juzNumber = i + 1;
            const startPage = getJuzStartPage(juzNumber);
            return `
            <div class="juz-item" data-page="${startPage}">
            <div class="juz-number">الجزء ${juzNumber}</div>
            <div class="juz-page">الصفحة ${startPage}</div>
            </div>
            `;
        }).join('');

        const listContent = this.juzModal ? this.juzModal.querySelector('#juz-list-content') : null;
        if (listContent) listContent.innerHTML = juzListHTML;
        if (this.juzModal) this.juzModal.style.display = 'flex';

        if (this.juzModal) {
            this.juzModal.querySelectorAll('.juz-item').forEach(item => {
                item.addEventListener('click', () => {
                    const page = parseInt(item.dataset.page);
                    this.goToPage(page);
                    this.juzModal.style.display = 'none';
                });
            });
        }
    }

    showSajdaInfo() {
        const sajdaVerses = [
            { surah: 7, name: "الأعراف", verse: 206, page: 176 },
            { surah: 13, name: "الرعد", verse: 15, page: 253 },
            { surah: 16, name: "النحل", verse: 50, page: 274 },
            { surah: 17, name: "الإسراء", verse: 109, page: 291 },
            { surah: 19, name: "مريم", verse: 58, page: 310 },
            { surah: 22, name: "الحج", verse: 18, page: 333 },
            { surah: 22, name: "الحج", verse: 77, page: 341 },
            { surah: 25, name: "الفرقان", verse: 60, page: 365 },
            { surah: 27, name: "النمل", verse: 26, page: 379 },
            { surah: 32, name: "السجدة", verse: 15, page: 416 },
            { surah: 38, name: "ص", verse: 24, page: 456 },
            { surah: 41, name: "فصلت", verse: 38, page: 480 },
            { surah: 53, name: "النجم", verse: 62, page: 527 },
            { surah: 84, name: "الانشقاق", verse: 21, page: 589 },
            { surah: 96, name: "العلق", verse: 19, page: 597 }
        ];

        const sajdaHTML = sajdaVerses.map(verse => `
        <div class="sajda-item" data-page="${verse.page}">
        <div class="sajda-surah">سورة ${verse.name} - الآية ${verse.verse}</div>
        <div class="sajda-page">الصفحة ${verse.page}</div>
        </div>
        `).join('');

        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.style.display = 'flex';
        modal.innerHTML = `
        <div class="modal-content">
        <span class="close">&times;</span>
        <h3><i class="fas fa-praying-hands"></i> آيات السجود</h3>
        <div class="modal-list">
        ${sajdaHTML}
        </div>
        </div>
        `;

        document.body.appendChild(modal);

        modal.querySelector('.close').addEventListener('click', () => modal.remove());
        modal.querySelectorAll('.sajda-item').forEach(item => {
            item.addEventListener('click', () => {
                const page = parseInt(item.dataset.page);
                this.goToPage(page);
                modal.remove();
            });
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    }

    // ========================================
    // تنقّل الصفحات
    // ========================================
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

    // ========================================
    // عناصر واجهة مساعدة: رسالة، إشعار، زر للصعود
    // ========================================
    showMessage(message, type = 'info') {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 20px;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : type === 'warning' ? '#e67e22' : '#2e86ab'};
        color: white;
        border-radius: 10px;
        z-index: 10000;
        font-size: 15px;
        font-weight: 600;
        opacity: 0;
        transform: translateY(-10px);
        transition: all 0.3s ease;
        `;
        messageDiv.textContent = message;
        document.body.appendChild(messageDiv);

        setTimeout(() => {
            messageDiv.style.opacity = '1';
            messageDiv.style.transform = 'translateY(0)';
        }, 80);

        setTimeout(() => {
            messageDiv.style.opacity = '0';
            messageDiv.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                if (messageDiv.parentNode) messageDiv.parentNode.removeChild(messageDiv);
            }, 300);
        }, 3000);
    }

    toggleScrollTopButton() {
        if (!this.scrollTopBtn) return;
        if (window.pageYOffset > 300) {
            this.scrollTopBtn.classList.add('show');
        } else {
            this.scrollTopBtn.classList.remove('show');
        }
    }

    // ========================================
    // ضبط تخطيط المشغل العائم لليسار و تحريك الأزرار لليمين عند تغير الحجم
    // ========================================
    adjustFloatingAudioLayout() {
        if (!this.audioFloating) return;
        const width = window.innerWidth;
        if (width < 700) {
            // على الشاشات الصغيرة: نجعل المشغل في أسفل الوسط لتفادي حجب النص
            this.audioFloating.style.left = '50%';
            this.audioFloating.style.transform = 'translateX(-50%)';
            this.audioFloating.style.bottom = '8px';
        } else {
            // على الشاشات الأكبر: المشغل على اليسار، الأزرار على اليمين (نعتمد CSS داخل الواجهة)
            this.audioFloating.style.left = '12px';
            this.audioFloating.style.transform = 'none';
            this.audioFloating.style.bottom = '12px';
        }
    }
}

// ========================================
// تشغيل التطبيق
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    new QuranReader();
    console.log('✅ تم تشغيل GT-QURANREADER (نص/صورة) - نسخة الخطوط/صوت السورة كاملة مفعّلة');
});
