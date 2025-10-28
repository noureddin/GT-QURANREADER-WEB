// script.js - GT-QURANREADER (نص فقط) - نسخة محدثة شاملة
// - يعتمد نصياً على alquran.cloud (quran-uthmani) مع fallback إلى santrikoding
// - يدعم تبديل الخطوط المحفوظة محليًا
// - مشغل صوتي متسلسل لا يتوقف عند انتهاء السورة (حتى يوقفه المستخدم)
// - لا يقوم بتغيير التشغيل عند تبديل الصفحة إلا إذا طلب المستخدم تشغيل سورة جديدة
// - يراعي توافق المشغل مع شاشات الهواتف

// ========== إعدادات وبيانات مضمّنة ==========
const EMBEDDED_SURAHS_DATA = [ /* استخدم نفس مصفوفة السور المضمنة لديك */ ];
// (لتقليل طول الملف هنا افترضت أنك تحتفظ بالمصفوفة كاملة كما في النسخ السابقة)
// إذا رغبت سأركّبها هنا بالكامل — حالياً سنستخدم المضمنة في script السابق.

const TOTAL_PAGES = 604;

// مصادر الـ API
const API_QURAN_CLOUD_BASE = 'https://api.alquran.cloud/v1';
const API_SANTRI_BASE = 'https://quran-api.santrikoding.com/api';

// أسماء خطوط متوفرة في مجلد fonts/ بالمستودع (كما رفعتها)
const AVAILABLE_FONTS = [
  { id: 'amiri-quran', name: 'Amiri Quran', file: 'amiri-quran.ttf' },
  { id: 'amiri-quran-colored', name: 'Amiri Quran Colored', file: 'amiri-quran-colored.ttf' },
  { id: 'arb-amiri-quran', name: 'ArbFONTS Amiri Quran', file: 'ArbFONTS-Amiri-Quran.ttf' },
  { id: 'uthmanic-hafs', name: 'Uthmanic Hafs', file: 'UthmanicHafs1 Ver13.otf' }
];

// helper: تحميل خط ديناميكياً عبر @font-face
function injectFontFace(fontId, fontFile) {
  const fontName = `GTQ-${fontId}`;
  // تحقق إن كان مُدخلًا مسبقًا
  if (document.getElementById(`font-face-${fontId}`)) return fontName;
  const style = document.createElement('style');
  style.id = `font-face-${fontId}`;
  style.textContent = `
    @font-face {
      font-family: '${fontName}';
      src: url('fonts/${fontFile}') format('${fontFile.endsWith('.otf') ? 'opentype' : 'truetype'}');
      font-display: swap;
    }
  `;
  document.head.appendChild(style);
  return fontName;
}

// ========================================
// QuranDataManager - جلب نصوص/صوت/معلومات سُور
// ========================================
class QuranDataManager {
  constructor() {
    this.cache = new Map();
  }

  // يحاول جلب نص الـ quran-uthmani من alquran.cloud
  async fetchQuranUthmani() {
    const cacheKey = 'quran-uthmani';
    if (this.cache.has(cacheKey)) return this.cache.get(cacheKey);

    try {
      const resp = await fetch(`${API_QURAN_CLOUD_BASE}/quran/quran-uthmani`);
      if (!resp.ok) throw new Error('alquran.cloud returned non-ok');
      const j = await resp.json();
      if (j.code === 200 && j.data && j.data.surahs) {
        this.cache.set(cacheKey, j.data.surahs);
        console.log('📜 نص quran-uthmani محمّل من alquran.cloud');
        return j.data.surahs;
      } else {
        throw new Error('alquran.cloud unexpected format');
      }
    } catch (err) {
      console.warn('⚠️ تعذر جلب quran-uthmani من alquran.cloud:', err);
      this.cache.set(cacheKey, null);
      return null;
    }
  }

  // جلب بيانات سور (قائمة) من santrikoding (fallback)
  async fetchSurahListSantri() {
    const cacheKey = 'santri-surah-list';
    if (this.cache.has(cacheKey)) return this.cache.get(cacheKey);
    try {
      const resp = await fetch(`${API_SANTRI_BASE}/surah`);
      if (!resp.ok) throw new Error('santrikoding returned non-ok');
      const j = await resp.json();
      this.cache.set(cacheKey, j);
      console.log('📚 قائمة السور محمّلة من santrikoding');
      return j;
    } catch (err) {
      console.warn('⚠️ تعذر جلب قائمة السور من santrikoding:', err);
      this.cache.set(cacheKey, null);
      return null;
    }
  }

  // جلب بيانات سورة من alquran.cloud مع الآيات (تحتوي آيات.audio إن كانت متاحة)
  async fetchSurahAudioAyahsFromAlQuranCloud(surahNumber, reciter = 'ar.alafasy') {
    const cacheKey = `alafasy-surah-${surahNumber}-${reciter}`;
    if (this.cache.has(cacheKey)) return this.cache.get(cacheKey);

    try {
      const resp = await fetch(`${API_QURAN_CLOUD_BASE}/surah/${surahNumber}/${reciter}`);
      if (!resp.ok) throw new Error('alquran.cloud surah returned non-ok');
      const j = await resp.json();
      if (j.code === 200 && j.data && Array.isArray(j.data.ayahs)) {
        // كل آية تحتوي على audio و text و page إلخ
        this.cache.set(cacheKey, j.data.ayahs);
        return j.data.ayahs;
      }
      throw new Error('alquran.cloud surah unexpected format');
    } catch (err) {
      console.warn(`⚠️ تعذر جلب آيات السورة ${surahNumber} من alquran.cloud:`, err);
      this.cache.set(cacheKey, null);
      return null;
    }
  }

  // جلب بيانات السورة من santrikoding (نص + صوت للسورة كاملة + آيات منفصلة)
  async fetchSurahDetailSantri(surahNumber) {
    const cacheKey = `santri-surah-${surahNumber}`;
    if (this.cache.has(cacheKey)) return this.cache.get(cacheKey);
    try {
      const resp = await fetch(`${API_SANTRI_BASE}/surah/${surahNumber}`);
      if (!resp.ok) throw new Error('santrikoding surah returned non-ok');
      const j = await resp.json();
      this.cache.set(cacheKey, j);
      return j;
    } catch (err) {
      console.warn('⚠️ تعذر جلب تفاصيل السورة من santrikoding:', err);
      this.cache.set(cacheKey, null);
      return null;
    }
  }
}

// ========================================
// AudioManager - تشغيل متسلسل للآيات/السور
// - يحاول تشغيل آيات لكل سورة (per-ayah) إن توفّرت
// - وإلا يستخدم ملف السورة الكاملة (santrikoding audio) كبديل
// - لا يتوقف عند نهاية السورة تلقائياً إلا إذا انتهت من آخر سورة أو المستخدم أوقف التشغيل
// ========================================
class AudioManager {
  constructor(dataManager) {
    this.dm = dataManager;
    this.audioEl = document.getElementById('quran-audio');
    this.isPlaying = false;
    this.currentSurah = null; // رقم السورة
    this.currentAyahIndex = 0; // لمصفوفة الآيات (per-ayah)
    this.currentAyahsArray = null; // إذا كانت per-ayah متاحة
    this.usingPerAyah = false;
    this.stopRequested = false; // لإيقاف الانتقال التلقائي
    this.queueLock = false; // منع سباق التحميل
    this.reciter = 'ar.alafasy'; // الافتراضي
    // مستمع الأحداث
    if (this.audioEl) {
      this.audioEl.addEventListener('ended', () => this.onEnded());
      this.audioEl.addEventListener('play', () => { this.isPlaying = true; });
      this.audioEl.addEventListener('pause', () => { this.isPlaying = false; });
    }
  }

  async playSurah(surahNumber) {
    if (!surahNumber) return;
    // إذا يطلب المستخدم نفس السورة و هي تعمل بالفعل فلا نفعل شيئًا
    if (this.currentSurah === surahNumber && this.isPlaying) return;

    this.currentSurah = surahNumber;
    this.stopRequested = false;

    // جرب الحصول على آيات السورة مع مسارات صوتية لكل آية من alquran.cloud
    this.queueLock = true;
    this.currentAyahsArray = await this.dm.fetchSurahAudioAyahsFromAlQuranCloud(surahNumber, this.reciter);
    this.queueLock = false;

    if (this.currentAyahsArray && this.currentAyahsArray.length > 0 && this.currentAyahsArray[0].audio) {
      // نستخدم التشغيل per-ayah
      this.usingPerAyah = true;
      this.currentAyahIndex = 0;
      this._playCurrentAyah();
    } else {
      // fallback: حاول استخدام santrikoding audio للسورة كاملة
      this.usingPerAyah = false;
      const santri = await this.dm.fetchSurahDetailSantri(surahNumber);
      if (santri && santri.audio) {
        this._playUrl(santri.audio);
      } else {
        // محاولة استخدام رابط احتياطي يعتمد على رقم السورة (مجموعات مشهورة)
        const fallback = this._fallbackSurahAudioUrl(surahNumber);
        this._playUrl(fallback);
      }
    }
  }

  stop() {
    this.stopRequested = true;
    if (this.audioEl) {
      this.audioEl.pause();
      // لا نعيد currentTime إلى 0 لكي يستطيع المستخدم استئناف مكان ما إن رغب
    }
    this.isPlaying = false;
  }

  async _playCurrentAyah() {
    if (!this.currentAyahsArray) return;
    if (this.currentAyahIndex >= this.currentAyahsArray.length) {
      // انتهت السورة: انتقل للسورة التالية تلقائياً ما لم يطلب المستخدم التوقف
      if (this.stopRequested) return;
      const nextSurah = this.currentSurah + 1;
      if (nextSurah <= 114) {
        // شغّل السورة التالية (ستقوم بمحاولة per-ayah تلقائياً)
        await this.playSurah(nextSurah);
      } else {
        // إنتهى القرآن
        this.stop();
      }
      return;
    }

    const ay = this.currentAyahsArray[this.currentAyahIndex];
    const audioUrl = ay.audio || (ay.audioSecondary && ay.audioSecondary[0]) || null;
    if (!audioUrl) {
      // لو الآية بلا صوت ننتقل إلى التالية
      this.currentAyahIndex++;
      return this._playCurrentAyah();
    }

    this._playUrl(audioUrl);
  }

  _playUrl(url) {
    if (!this.audioEl) return;
    try {
      // لا نغيّر حالة stopRequested هنا
      this.audioEl.src = url;
      const playPromise = this.audioEl.play();
      if (playPromise && typeof playPromise.then === 'function') {
        playPromise.catch(err => {
          console.warn('تعذر تشغيل الصوت تلقائياً:', err);
        });
      }
    } catch (err) {
      console.error('خطأ أثناء playUrl:', err);
    }
  }

  // حدث انتهاء ملف صوتي (قد يكون آية أو سورة كاملة)
  async onEnded() {
    if (this.stopRequested) return;
    if (this.usingPerAyah && this.currentAyahsArray) {
      // انتقل للآية التالية ضمن نفس السورة
      this.currentAyahIndex++;
      await this._playCurrentAyah();
    } else {
      // استخدم fallback: انتقل لسورة التالية
      const nextSurah = (this.currentSurah || 0) + 1;
      if (nextSurah <= 114) {
        await this.playSurah(nextSurah);
      } else {
        this.stop();
      }
    }
  }

  _fallbackSurahAudioUrl(surahNumber) {
    const num = String(surahNumber).padStart(3, '0');
    return `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${num}.mp3`;
    // لو أردت يمكن تغيير المسار الافتراضي إلى قارئ آخر
  }
}

// ========================================
// QuranReader - مدير الواجهة (نص فقط)
// ========================================
class QuranReader {
  constructor() {
    this.dm = new QuranDataManager();
    this.audioManager = new AudioManager(this.dm);
    this.currentPage = 1;
    this.totalPages = TOTAL_PAGES;
    this.zoomLevel = 100;
    this.surahMeta = EMBEDDED_SURAHS_DATA; // يجب أن تكون معرّفة
    this.quranText = null; // array of surahs from quran-uthmani (if available)
    this.selectedFontId = localStorage.getItem('gt_quran_font') || AVAILABLE_FONTS[0].id;

    // DOM elements
    this.container = document.querySelector('.container');
    this.loadingScreen = document.getElementById('loading-screen');
    this.textContainer = document.getElementById('quran-text') || this._createTextContainer();
    this.pageNumber = document.getElementById('page-number');
    this.surahInfo = document.getElementById('surah-info');
    this.juzInfo = document.getElementById('juz-info');
    this.searchInput = document.getElementById('search-input');
    this.searchBtn = document.getElementById('search-btn');
    this.searchResults = document.getElementById('search-results');
    this.prevBtn = document.getElementById('prev-page-btn');
    this.nextBtn = document.getElementById('next-page-btn');
    this.zoomInBtn = document.getElementById('zoom-in');
    this.zoomOutBtn = document.getElementById('zoom-out');
    this.resetZoomBtn = document.getElementById('reset-zoom');
    this.audioToggleBtn = document.getElementById('audio-toggle');
    this.audioFloating = document.querySelector('.audio-player-floating');
    this.audioElement = document.getElementById('quran-audio');
    this.audioInfo = document.getElementById('audio-info');
    this.themeBtn = document.getElementById('toggle-theme');
    this.scrollTopBtn = document.getElementById('scroll-to-top');
    this.surahModal = document.getElementById('surah-list');
    this.juzModal = document.getElementById('juz-list');
    this.navSurah = document.getElementById('nav-surah');
    this.navJuz = document.getElementById('nav-juz');
    this.navSajda = document.getElementById('nav-sajda');

    // عنصر اختيار الخط - سننشئه داخل .text-controls
    this.ensureFontSelector();

    // event bindings
    this._bindUI();

    // responsive adjustments
    window.addEventListener('resize', () => this._adjustAudioFloatingPosition());
    this._adjustAudioFloatingPosition();

    // تحميل البيانات الأولية
    this._init();
  }

  _createTextContainer() {
    const qpage = document.querySelector('.quran-page') || document.body;
    const div = document.createElement('div');
    div.id = 'quran-text';
    div.style.display = 'block';
    div.style.padding = '12px';
    div.style.direction = 'rtl';
    div.style.textAlign = 'right';
    div.style.maxWidth = '900px';
    div.style.margin = '0 auto 40px';
    qpage.appendChild(div);
    return div;
  }

  async _init() {
    try {
      // show loading
      if (this.loadingScreen) this.loadingScreen.style.display = 'flex';
      // حاول جلب النص من alquran.cloud
      const qtext = await this.dm.fetchQuranUthmani();
      if (qtext && Array.isArray(qtext) && qtext.length > 0) {
        this.quranText = qtext.map(s => ({
          number: s.number,
          name: s.name || s.englishName || s.englishNameTranslation,
          ayahs: s.ayahs
        }));
        console.log('تم تحميل نص القرآن (عثماني) بنجاح');
      } else {
        // حاول santrikoding كبديل
        const sanriList = await this.dm.fetchSurahListSantri();
        if (sanriList && Array.isArray(sanriList) && sanriList.length > 0) {
          // حول استجابة santri إلى شكل مشابه quranText لكن بدون آيات مفصلة — سنجلب تفاصيل السورة عند الحاجة
          this.quranText = sanriList.map(s => ({
            number: s.nomor,
            name: s.nama,
            ayahs: null, // سيُملأ لاحقًا عن الطلب
            santriMeta: s
          }));
          console.log('تم تحميل قائمة السور من santrikoding كبديل للنص');
        } else {
          this.quranText = null;
          console.warn('لم يتوفر مصدر نصي للقرآن، ستظهر رسالة خطأ للمستخدم');
        }
      }

      // تحميل خط المستخدم الافتراضي
      this._applyFontById(this.selectedFontId);

      // hide loading
      if (this.loadingScreen) this.loadingScreen.style.display = 'none';
      if (this.container) this.container.style.display = 'flex';

      // عرض الصفحة الافتراضية
      this.updatePage();
    } catch (err) {
      console.error('خطأ في init:', err);
      if (this.loadingScreen) this.loadingScreen.style.display = 'none';
      if (this.container) this.container.style.display = 'flex';
    }
  }

  _bindUI() {
    if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.previousPage());
    if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.nextPage());
    if (this.zoomInBtn) this.zoomInBtn.addEventListener('click', () => this.zoomIn());
    if (this.zoomOutBtn) this.zoomOutBtn.addEventListener('click', () => this.zoomOut());
    if (this.resetZoomBtn) this.resetZoomBtn.addEventListener('click', () => this.resetZoom());
    if (this.searchBtn) this.searchBtn.addEventListener('click', () => this.performSearch());
    if (this.searchInput) this.searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.performSearch();
    });

    if (this.audioToggleBtn) {
      this.audioToggleBtn.addEventListener('click', async () => {
        if (this.audioManager.isPlaying) {
          this.audioManager.stop();
          this._updateAudioButtonUI(false);
          this._hideAudioFloating();
        } else {
          // تشغيل السورة الحالية
          const surah = this._getSurahMetaByPage(this.currentPage);
          if (surah) {
            await this.audioManager.playSurah(surah.number);
            this._updateAudioButtonUI(true);
            this._showAudioFloating(surah.number);
          } else {
            this.showMessage('تعذر تحديد السورة الحالية للتشغيل', 'warning');
          }
        }
      });
    }

    // audio element play/ pause => update UI
    if (this.audioElement) {
      this.audioElement.addEventListener('play', () => {
        this._updateAudioButtonUI(true);
        this._showAudioFloating(this.audioManager.currentSurah);
      });
      this.audioElement.addEventListener('pause', () => {
        this._updateAudioButtonUI(false);
      });
    }

    if (this.themeBtn) this.themeBtn.addEventListener('click', () => this.toggleTheme());

    if (this.scrollTopBtn) this.scrollTopBtn.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

    if (this.navSurah) this.navSurah.addEventListener('click', () => this.showSurahList());
    if (this.navJuz) this.navJuz.addEventListener('click', () => this.showJuzList());
    if (this.navSajda) this.navSajda.addEventListener('click', () => this.showSajdaInfo());

    // keyboard
    document.addEventListener('keydown', (e) => {
      if (e.target === this.searchInput) return;
      if (e.key === 'ArrowRight' || e.key === 'd') this.previousPage();
      if (e.key === 'ArrowLeft' || e.key === 'a') this.nextPage();
      if (e.key === ' ') {
        e.preventDefault();
        if (this.audioManager.isPlaying) { this.audioManager.stop(); this._updateAudioButtonUI(false); }
        else { const surah = this._getSurahMetaByPage(this.currentPage); if (surah) this.audioManager.playSurah(surah.number); }
      }
    });
  }

  _getSurahMetaByPage(page) {
    // البحث في EMBEDDED_SURAHS_DATA
    for (let i = EMBEDDED_SURAHS_DATA.length - 1; i >= 0; i--) {
      if (EMBEDDED_SURAHS_DATA[i].start_page <= page) return EMBEDDED_SURAHS_DATA[i];
    }
    return EMBEDDED_SURAHS_DATA[0];
  }

  async updatePage() {
    // تحديث أرقام وعرض النص للسورة التي تتوافق مع الصفحة
    if (this.pageNumber) this.pageNumber.textContent = `الصفحة: ${this.currentPage}`;
    const meta = this._getSurahMetaByPage(this.currentPage);
    if (meta) {
      if (this.surahInfo) this.surahInfo.textContent = `السورة: ${meta.name.ar || meta.name || meta.englishName || meta.number}`;
      if (this.juzInfo) this.juzInfo.textContent = `الجزء: ${this._calculateJuzFromPage(this.currentPage)}`;
    }

    // عرض النص: إذا كانت quranText محملة بالكامل من alquran.cloud، ابحث عن السورة بالرقم و أعرض آياتها
    if (this.quranText) {
      // إيجاد السورة
      const s = this.quranText.find(x => Number(x.number) === Number(meta.number));
      if (s && s.ayahs && s.ayahs.length > 0) {
        this._renderSurahFromQuranText(s);
      } else if (s && s.santriMeta) {
        // بيانات santri: سنجلب تفاصيل السورة (ayat) عند الطلب
        const detail = await this.dm.fetchSurahDetailSantri(s.santriMeta.nomor);
        if (detail && detail.ayat) {
          // تحويل تنسيق santri->مشابه للعناصر المتوقعة
          const ayahs = detail.ayat.map(a => ({
            number: a.nomor,
            text: a.ar,
            numberInSurah: a.nomor,
            // santri لا يعطي audio per ayah، لكنه يعطي surah audio في detail.audio
          }));
          this._renderSurahFromSantri(detail, ayahs);
        } else {
          this.textContainer.innerHTML = `<p>نص هذه السورة غير متاح حالياً.</p>`;
        }
      } else {
        this.textContainer.innerHTML = `<p>نص السورة غير متاح.</p>`;
      }
    } else {
      this.textContainer.innerHTML = `<p>مصدر نص القرآن غير متاح حالياً.</p>`;
    }
  }

  _renderSurahFromQuranText(surahObj) {
    // surahObj: { number, name, ayahs: [{text, numberInSurah, ...}, ...] }
    const header = `<div style="text-align:center; margin-bottom:10px;"><h2 style="margin:0; color:#2e86ab;">سورة ${surahObj.name}</h2><div style="opacity:0.8; margin-top:6px;">آيات: ${surahObj.ayahs.length}</div></div>`;
    const versesHTML = surahObj.ayahs.map(a => {
      const ayNum = a.numberInSurah || '';
      const ayText = a.text || '';
      return `<div class="ayah-block" data-ay-number="${ayNum}" style="margin:8px 0; font-size:1.6rem; line-height:2.2;">
                <span class="ayah-text" style="font-family: var(--quran-font, 'GTQ-default');">${ayText}</span>
                <span class="ayah-number" style="display:inline-block; margin-right:8px; color: rgba(46,134,171,0.9); font-weight:600;">(${ayNum})</span>
              </div>`;
    }).join('');
    this.textContainer.innerHTML = header + `<div class="verses-list">${versesHTML}</div>`;
    // ربط حدث: النقر على آية لتشغيل التلاوة من تلك الآية (إن أمكن)
    this.textContainer.querySelectorAll('.ayah-block').forEach(el => {
      el.addEventListener('click', async (e) => {
        // جرب تشغيل السورة بدءًا من هذه الآية
        const ayNum = Number(el.dataset.ayNumber);
        const surah = this._getSurahMetaByPage(this.currentPage);
        if (!surah) return;
        // فقط إذا كانت alquran.cloud توفر audio per-ayah، سنحدد index الصحيح
        const ayahs = await this.dm.fetchSurahAudioAyahsFromAlQuranCloud(surah.number);
        if (ayahs && ayahs.length > 0) {
          const idx = ayahs.findIndex(x => Number(x.numberInSurah) === ayNum);
          if (idx >= 0) {
            this.audioManager.currentSurah = surah.number;
            this.audioManager.currentAyahsArray = ayahs;
            this.audioManager.usingPerAyah = true;
            this.audioManager.currentAyahIndex = idx;
            this.audioManager.stopRequested = false;
            this.audioManager._playCurrentAyah();
            this._showAudioFloating(surah.number, `سورة ${surah.name.ar} - الآية ${ayNum}`);
          } else {
            // fallback: تشغيل السورة كاملة
            await this.audioManager.playSurah(surah.number);
            this._showAudioFloating(surah.number);
          }
        } else {
          // لا per-ayah => تشغيل السورة كاملة
          await this.audioManager.playSurah(surah.number);
          this._showAudioFloating(surah.number);
        }
      });
    });
    this.applyCurrentFontToText();
  }

  _renderSurahFromSantri(detail, ayahs) {
    // detail: santri detail response, ayahs: mapped array
    const header = `<div style="text-align:center; margin-bottom:10px;"><h2 style="margin:0; color:#2e86ab;">سورة ${detail.nama}</h2><div style="opacity:0.8; margin-top:6px;">آيات: ${detail.jumlah_ayat}</div></div>`;
    const versesHTML = ayahs.map(a => `<div class="ayah-block" data-ay-number="${a.numberInSurah}" style="margin:8px 0; font-size:1.6rem; line-height:2.2;">
                  <span class="ayah-text" style="font-family: var(--quran-font, 'GTQ-default');">${a.text}</span>
                  <span class="ayah-number" style="display:inline-block; margin-right:8px; color: rgba(46,134,171,0.9); font-weight:600;">(${a.numberInSurah})</span>
               </div>`).join('');
    this.textContainer.innerHTML = header + `<div class="verses-list">${versesHTML}</div>`;
    this.applyCurrentFontToText();
    // النقر لتشغيل السورة كاملة (santri يعطي ملف صوتي للسورة كاملة)
    this.textContainer.querySelectorAll('.ayah-block').forEach(el => {
      el.addEventListener('click', async () => {
        const surahMeta = this._getSurahMetaByPage(this.currentPage);
        if (!surahMeta) return;
        // تشغيل السورة كاملة من ملف santri
        const det = await this.dm.fetchSurahDetailSantri(surahMeta.number);
        if (det && det.audio) {
          this.audioManager.usingPerAyah = false;
          this.audioManager.currentSurah = surahMeta.number;
          this.audioManager._playUrl(det.audio);
          this._showAudioFloating(surahMeta.number);
        } else {
          this.showMessage('تعذر تشغيل تلاوة هذه السورة', 'error');
        }
      });
    });
  }

  // ========== واجهة اختيار الخط ==========
  ensureFontSelector() {
    const textControls = document.querySelector('.text-controls');
    if (!textControls) return;
    // إن كان موجودًا، لا نعيد إنشاؤه
    if (document.getElementById('font-selector')) return;

    const wrapper = document.createElement('div');
    wrapper.style.display = 'flex';
    wrapper.style.alignItems = 'center';
    wrapper.style.gap = '8px';

    const label = document.createElement('label');
    label.textContent = 'خط القرآن:';
    label.style.color = 'var(--accent-color)';
    label.style.fontWeight = '600';

    const select = document.createElement('select');
    select.id = 'font-selector';
    select.style.padding = '8px';
    select.style.borderRadius = '10px';
    AVAILABLE_FONTS.forEach(f => {
      const opt = document.createElement('option');
      opt.value = f.id;
      opt.textContent = f.name;
      if (f.id === this.selectedFontId) opt.selected = true;
      select.appendChild(opt);
    });

    select.addEventListener('change', (e) => {
      const id = e.target.value;
      this.selectedFontId = id;
      localStorage.setItem('gt_quran_font', id);
      this._applyFontById(id);
      this.applyCurrentFontToText();
      this.showMessage(`تم تغيير الخط إلى: ${select.options[select.selectedIndex].text}`, 'success');
    });

    wrapper.appendChild(label);
    wrapper.appendChild(select);
    textControls.appendChild(wrapper);
  }

  _applyFontById(fontId) {
    const font = AVAILABLE_FONTS.find(f => f.id === fontId);
    if (!font) return;
    const fontName = injectFontFace(font.id, font.file);
    // ضع اسم الخط في متغيّر CSS --quran-font
    document.documentElement.style.setProperty('--quran-font', `'${fontName}'`);
  }

  applyCurrentFontToText() {
    // إضافة كلاس أو ضبط font-family مباشرة على العنصر
    if (!this.textContainer) return;
    // يستخدم CSS var --quran-font في بناء الآيات
    // لضمان fallback نضبط style إضافي:
    this.textContainer.style.fontFamily = `var(--quran-font, 'GTQ-default'), 'Scheherazade New', 'Amiri', serif`;
    // حجم الخط المُناسب مع zoomLevel
    this.textContainer.style.fontSize = `${Math.max(14, (16 * this.zoomLevel) / 100)}px`;
    this.textContainer.style.lineHeight = '2';
  }

  _updateAudioButtonUI(isPlaying) {
    if (!this.audioToggleBtn) return;
    if (isPlaying) {
      this.audioToggleBtn.classList.add('playing');
      this.audioToggleBtn.innerHTML = '<i class="fas fa-stop"></i>';
      this.audioToggleBtn.title = 'إيقاف التلاوة';
    } else {
      this.audioToggleBtn.classList.remove('playing');
      this.audioToggleBtn.innerHTML = '<i class="fas fa-play"></i>';
      this.audioToggleBtn.title = 'تشغيل التلاوة';
    }
  }

  _showAudioFloating(surahNumber, infoText = null) {
    // ضبط نص المشغل
    const surahMeta = EMBEDDED_SURAHS_DATA.find(s => s.number === surahNumber) || {};
    const name = surahMeta ? (surahMeta.name && surahMeta.name.ar ? surahMeta.name.ar : surahMeta.name) : surahNumber;
    if (this.audioInfo) this.audioInfo.textContent = infoText || `سورة ${name}`;
    // عرض العنصر المتحرك
    if (this.audioFloating) this.audioFloating.classList.add('show');
    // اجعل العنصر لا يغطي أزرار التنقل على الشاشات الصغيرة
    this._adjustAudioFloatingPosition();
  }

  _hideAudioFloating() {
    if (this.audioFloating) this.audioFloating.classList.remove('show');
  }

  _adjustAudioFloatingPosition() {
    // نضمن أن المشغل لا يغطي أزرار التنقل العائمة
    if (!this.audioFloating) return;
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    if (vw <= 768) {
      // شاشة صغيرة: نرفع المشغل إلى أعلى قليلاً إلى أن تظهر الأزرار العائمة على الجانب الأيمن
      this.audioFloating.style.left = '10px';
      this.audioFloating.style.right = '10px';
      this.audioFloating.style.bottom = '100px'; // يترك مساحة للأزرار العائمة
      this.audioFloating.style.minWidth = 'auto';
    } else {
      // شاشة سطح مكتب: إبقاؤه على اليسار
      this.audioFloating.style.left = '30px';
      this.audioFloating.style.right = 'auto';
      this.audioFloating.style.bottom = '30px';
      this.audioFloating.style.minWidth = '300px';
    }
  }

  // تكبير/تصغير النص
  zoomIn() {
    if (this.zoomLevel < 200) { this.zoomLevel += 10; this.applyCurrentFontToText(); }
  }
  zoomOut() {
    if (this.zoomLevel > 60) { this.zoomLevel -= 10; this.applyCurrentFontToText(); }
  }
  resetZoom() { this.zoomLevel = 100; this.applyCurrentFontToText(); }

  // التنقّل
  previousPage() {
    if (this.currentPage > 1) { this.currentPage--; this.updatePage(); }
  }
  nextPage() {
    if (this.currentPage < this.totalPages) { this.currentPage++; this.updatePage(); }
  }
  goToPage(p) {
    const page = Number(p);
    if (page >=1 && page <= this.totalPages) { this.currentPage = page; this.updatePage(); }
  }

  // البحث (text search in loaded quranText)
  async performSearch() {
    const q = (this.searchInput && this.searchInput.value) ? this.searchInput.value.trim() : '';
    if (!q) { this.showMessage('الرجاء إدخال نص للبحث', 'warning'); return; }
    const results = [];
    if (!this.quranText) { this.showMessage('مصدر النص غير متوفر للبحث', 'warning'); return; }
    const lowerQ = q.toLowerCase();
    // البحث داخل الآيات إن كانت متاحة
    for (const s of this.quranText) {
      if (!s.ayahs) continue;
      for (const ay of s.ayahs) {
        if (ay.text && ay.text.toLowerCase().includes(lowerQ)) {
          const snippet = ay.text.length > 120 ? ay.text.slice(0,120) + '...' : ay.text;
          const meta = EMBEDDED_SURAHS_DATA.find(x => x.number === s.number) || {};
          results.push({
            type: 'ayah',
            surah: s.number,
            ayah: ay.numberInSurah,
            text: `سورة ${meta.name && meta.name.ar ? meta.name.ar : meta.number} - (${ay.numberInSurah}) ${snippet}`,
            page: meta.start_page || 1
          });
          if (results.length >= 40) break;
        }
      }
      if (results.length >= 40) break;
    }

    // إظهار النتائج
    if (!this.searchResults) return;
    if (results.length === 0) {
      this.searchResults.innerHTML = `<div class="search-result-item">لم يتم العثور على نتائج</div>`;
      this.searchResults.style.display = 'block';
      return;
    }
    this.searchResults.innerHTML = results.map(r => `<div class="search-result-item" data-page="${r.page}">${r.text}</div>`).join('');
    this.searchResults.querySelectorAll('.search-result-item').forEach(item => {
      item.addEventListener('click', () => {
        const p = parseInt(item.dataset.page) || 1;
        this.goToPage(p);
        this.searchResults.style.display = 'none';
      });
    });
    this.searchResults.style.display = 'block';
  }

  // قوائم السور/الأجزاء/سجود - إعادة استخدام ما لديك أو بناء سريع
  showSurahList() {
    const listContent = this.surahModal ? this.surahModal.querySelector('#surah-list-content') : null;
    if (!listContent) return;
    const html = EMBEDDED_SURAHS_DATA.map(s => `<div class="surah-item" data-page="${s.start_page}"><div class="surah-number">${s.number}</div><div class="surah-name">${s.name.ar}</div></div>`).join('');
    listContent.innerHTML = html;
    if (this.surahModal) this.surahModal.style.display = 'flex';
    this.surahModal.querySelectorAll('.surah-item').forEach(it => {
      it.addEventListener('click', () => {
        const p = parseInt(it.dataset.page);
        this.goToPage(p);
        this.surahModal.style.display = 'none';
      });
    });
  }

  showJuzList() {
    const listContent = this.juzModal ? this.juzModal.querySelector('#juz-list-content') : null;
    if (!listContent) return;
    const html = Array.from({length:30}, (_,i) => {
      const j = i+1;
      const start = this._calculateJuzFromPage( (j===1) ? 1 : (1 + (j-1)*20) ); // تقريب
      return `<div class="juz-item" data-page="${getJuzStartPage(j)}"><div class="juz-number">الجزء ${j}</div><div class="juz-page">الصفحة ${getJuzStartPage(j)}</div></div>`;
    }).join('');
    listContent.innerHTML = html;
    if (this.juzModal) this.juzModal.style.display = 'flex';
    this.juzModal.querySelectorAll('.juz-item').forEach(it => {
      it.addEventListener('click', () => {
        const p = parseInt(it.dataset.page);
        this.goToPage(p);
        this.juzModal.style.display = 'none';
      });
    });
  }

  showSajdaInfo() {
    // إعادة استخدام الموجود مسبقًا — يمكن نسخه من نسخة سابقة
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
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'flex';
    modal.innerHTML = `<div class="modal-content"><span class="close">&times;</span><h3><i class="fas fa-praying-hands"></i> آيات السجود</h3><div class="modal-list">${sajdaVerses.map(v=>`<div class="sajda-item" data-page="${v.page}"><div class="sajda-surah">سورة ${v.name} - الآية ${v.verse}</div><div class="sajda-page">الصفحة ${v.page}</div></div>`).join('')}</div></div>`;
    document.body.appendChild(modal);
    modal.querySelector('.close').addEventListener('click', ()=> modal.remove());
    modal.querySelectorAll('.sajda-item').forEach(it=> it.addEventListener('click', () => { this.goToPage(parseInt(it.dataset.page)); modal.remove(); }));
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove();});
  }

  showMessage(message, type='info') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.style.cssText = `position:fixed; top:20px; right:20px; padding:12px 18px; background:${type==='success'?'#27ae60':type==='error'?'#e74c3c':type==='warning'?'#e67e22':'#2e86ab'}; color:white; z-index:10000; border-radius:10px;`;
    messageDiv.textContent = message;
    document.body.appendChild(messageDiv);
    setTimeout(()=> { messageDiv.style.opacity = '0'; setTimeout(()=>messageDiv.remove(),300); }, 3000);
  }

  _calculateJuzFromPage(page) {
    const juzPages = [1,22,42,62,82,102,122,142,162,182,202,222,242,262,282,302,322,342,362,382,402,422,442,462,482,502,522,542,562,582];
    for (let i = juzPages.length -1; i>=0; i--) {
      if (page >= juzPages[i]) return i+1;
    }
    return 1;
  }
}

// ========================================
// تهيئة وتشغيل التطبيق عند تحميل DOM
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  // تحققات: تأكد أن EMBEDDED_SURAHS_DATA مُعرّفة بالكامل (من نسخة script السابقة)
  if (typeof EMBEDDED_SURAHS_DATA === 'undefined' || !Array.isArray(EMBEDDED_SURAHS_DATA)) {
    console.error('البيانات المضمنة للسور غير موجودة! يرجى تضمين EMBEDDED_SURAHS_DATA كما في النسخة السابقة.');
    // عرض رسالة للمستخدم
    const el = document.getElementById('quran-text') || document.body;
    if (el) el.innerHTML = '<p style="color:#e74c3c; padding:20px;">خطأ: بيانات السور المضمنة مفقودة. الرجاء تضمين EMBEDDED_SURAHS_DATA.</p>';
    return;
  }

  // إدخال خطوط احتياطية CSS لخط افتراضي إن لم يحمّل أي من الخطوط المرفوعة
  const defaultStyle = document.createElement('style');
  defaultStyle.textContent = `
    :root { --quran-font: 'GTQ-default'; }
    @font-face {
      font-family: 'GTQ-default';
      src: local('Scheherazade'), local('Amiri');
      font-display: swap;
    }
    .ayah-text {
      font-size: 1.6rem;
    }
  `;
  document.head.appendChild(defaultStyle);

  // أنشئ القارئ
  const app = new QuranReader();
  console.log('✅ GT-QURANREADER (نص + صوت متسلسل + خطوط قابلة للتبديل) جاهز.');
});
