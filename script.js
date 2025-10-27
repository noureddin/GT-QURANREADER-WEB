class QuranDataManager {
    constructor() {
        this.dataSources = {
            pages: 'https://cdn.jsdelivr.net/gh/SalehGNUTUX/Quran-Data@main/pagesQuran.json',
            surahs: 'https://cdn.jsdelivr.net/gh/SalehGNUTUX/Quran-Data@main/mainDataQuran.json',
            images: 'https://cdn.jsdelivr.net/gh/SalehGNUTUX/Quran-Data@main/quran_image/{page}.png',
            audio: 'https://cdn.jsdelivr.net/gh/SalehGNUTUX/Quran-Data@main/json/audio/audio_surah_{surah}.json'
        };
        this.cache = new Map();
        this.fallbackAudioBase = 'https://cdn.islamic.network/quran/audio/128/ar.abdulbasitmurattal';
    }

    async loadData(type, params = {}) {
        const cacheKey = `${type}-${JSON.stringify(params)}`;
        
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }

        try {
            let url = this.dataSources[type];
            
            // استبدال المعلمات في الرابط
            url = url.replace('{page}', params.page)
                    .replace('{surah}', params.surah);

            console.log(`📥 جاري تحميل: ${url}`);
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`فشل تحميل ${type}: ${response.status}`);
            }

            const data = type === 'images' ? response.url : await response.json();
            this.cache.set(cacheKey, data);
            
            return data;
        } catch (error) {
            console.error(`❌ خطأ في تحميل ${type}:`, error);
            
            // رابط احتياطي للصوت
            if (type === 'audio' && params.surah) {
                const fallbackAudio = [{
                    link: `${this.fallbackAudioBase}/${params.surah.toString().padStart(3, '0')}.mp3`
                }];
                this.cache.set(cacheKey, fallbackAudio);
                return fallbackAudio;
            }
            
            throw error;
        }
    }

    getPageImageUrl(page) {
        return this.dataSources.images.replace('{page}', page);
    }

    // تنظيف الذاكرة المؤقتة
    clearCache() {
        this.cache.clear();
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
            // تحميل بيانات الصفحات والسور معاً
            const [pagesData, surahsData] = await Promise.all([
                this.dataManager.loadData('pages'),
                this.dataManager.loadData('surahs')
            ]);

            this.pagesData = pagesData;
            this.surahsData = surahsData;

            this.hideLoadingScreen();
            this.updatePageInfo();
            this.preloadNextPages();
            
            console.log('✅ تم تحميل بيانات القرآن بنجاح');
        } catch (error) {
            console.error('❌ خطأ في تحميل البيانات:', error);
            this.showErrorMessage();
        }
    }

    hideLoadingScreen() {
        this.loadingScreen.style.display = 'none';
        this.container.style.display = 'flex';
    }

    async updatePage() {
        try {
            // تحديث صورة الصفحة مباشرة من CDN
            const imageUrl = this.dataManager.getPageImageUrl(this.currentPage);
            this.quranImg.src = imageUrl;
            this.quranImg.alt = `صفحة القرآن ${this.currentPage}`;
            
            // إضافة تحميل مؤقت للصورة
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
        this.quranImg.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="700" height="900" viewBox="0 0 700 900"><rect width="100%" height="100%" fill="%231a1a2e"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="24" fill="%23e9ecef">تعذر تحميل الصفحة</text></svg>';
    }

    preloadNextPages() {
        // تحميل مسبق للصفحات التالية لتحسين التجربة
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
        }
    }

    updateAvailableSurahs() {
        if (!this.pagesData || !this.surahsData) return;

        const pageInfo = this.pagesData.find(page => page.page === this.currentPage);
        if (!pageInfo) return;

        this.availableSurahsInPage = [];

        // البحث عن جميع السور التي تظهر في هذه الصفحة
        const surahsInPage = new Set();

        // إضافة السورة الأولى
        if (pageInfo.start && pageInfo.start.surah_number) {
            surahsInPage.add(pageInfo.start.surah_number);
        }

        // إضافة السورة الأخيرة إذا كانت مختلفة
        if (pageInfo.end && pageInfo.end.surah_number && pageInfo.end.surah_number !== pageInfo.start.surah_number) {
            surahsInPage.add(pageInfo.end.surah_number);
        }

        // البحث عن السور الإضافية في الصفحة
        this.surahsData.forEach(surah => {
            surah.verses.forEach(verse => {
                if (verse.page === this.currentPage) {
                    surahsInPage.add(surah.number);
                }
            });
        });

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
        if (!this.pagesData) return null;
        const pageInfo = this.pagesData.find(page => page.page === this.currentPage);
        return pageInfo ? pageInfo.start.surah_number : null;
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
            const audioData = await this.dataManager.loadData('audio', { surah: surahNumber });
            
            if (audioData && audioData.length > 0) {
                this.currentAudio = audioData[0].link;
                this.audioPlayer.src = this.currentAudio;
                this.showAudioPlayer();
                
                const surah = this.surahsData.find(s => s.number === surahNumber);
                this.audioInfo.textContent = `سورة ${surah.name.ar} - الصفحة ${this.currentPage}`;

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

    showErrorMessage() {
        const errorHTML = `
            <div style="text-align: center; padding: 20px; background: #322; border: 1px solid #fcc; border-radius: 10px; margin: 20px;">
                <h3 style="color: #f66;">⚠️ تعذر تحميل بيانات القرآن</h3>
                <p>يرجى التحقق من اتصال الإنترنت والمحاولة مرة أخرى.</p>
                <button onclick="location.reload()" style="padding: 10px 20px; background: #2e86ab; color: white; border: none; border-radius: 5px; cursor: pointer; margin: 10px;">
                    إعادة المحاولة
                </button>
            </div>
        `;
        this.container.insertAdjacentHTML('afterbegin', errorHTML);
    }
}

// تهيئة التطبيق عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    new QuranReader();
});
