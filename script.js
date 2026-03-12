// ==================== تحميل البيانات وعرضها ====================

let dreamsData = []; // مصفوفة لتخزين جميع التفسيرات

document.addEventListener('DOMContentLoaded', () => {
    loadDreams();
});

/**
 * تحميل التفسيرات من ملف JSON
 */
function loadDreams() {
    const dreamList = document.getElementById('dreamList');
    if (!dreamList) return; // إذا لم نكن في الصفحة الرئيسية

    fetch('data/dreams.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('فشل تحميل البيانات');
            }
            return response.json();
        })
        .then(data => {
            dreamsData = data.dreams;
            displayDreams(dreamsData);
            updateStats(dreamsData);
            updatePopularDreams(dreamsData);
        })
        .catch(error => {
            console.error('خطأ:', error);
            dreamList.innerHTML = '<div class="error">عذراً، حدث خطأ في تحميل التفسيرات. حاول لاحقاً.</div>';
        });
}

/**
 * عرض التفسيرات في الصفحة الرئيسية
 * @param {Array} dreams - مصفوفة التفسيرات
 */
function displayDreams(dreams) {
    const dreamList = document.getElementById('dreamList');
    if (!dreamList) return;

    if (!dreams || dreams.length === 0) {
        dreamList.innerHTML = '<div class="error">لا توجد تفسيرات متاحة الآن.</div>';
        return;
    }

    let html = '';
    dreams.forEach(dream => {
        html += `
            <div class="dream-card">
                <h3>${dream.title}</h3>
                <div class="meta">
                    <span>📅 ${dream.date_added}</span>
                    <span>👁️ ${dream.popularity} مشاهدة</span>
                    <span>📚 ${dream.interpreter}</span>
                </div>
                <p class="summary">${dream.summary}</p>
                <a href="dream.html?id=${dream.id}" class="read-more">اقرأ التفسير كاملاً</a>
            </div>
        `;
    });

    dreamList.innerHTML = html;
}

/**
 * تحديث الإحصائيات في الشريط الجانبي
 * @param {Array} dreams - مصفوفة التفسيرات
 */
function updateStats(dreams) {
    const totalDreams = document.getElementById('totalDreams');
    if (totalDreams) {
        totalDreams.textContent = dreams.length;
    }
}

/**
 * تحديث قائمة أشهر 5 أحلام
 * @param {Array} dreams - مصفوفة التفسيرات
 */
function updatePopularDreams(dreams) {
    const popularList = document.getElementById('popularDreams');
    if (!popularList) return;

    // ترتيب حسب الشهرة (تنازلي) وأخذ أول 5
    const sorted = [...dreams].sort((a, b) => b.popularity - a.popularity).slice(0, 5);

    let html = '';
    sorted.forEach(dream => {
        html += `<li><a href="dream.html?id=${dream.id}">${dream.title}</a></li>`;
    });

    popularList.innerHTML = html;
}

// ==================== وظيفة البحث ====================

/**
 * تنفيذ البحث عند النقر على زر البحث
 */
function searchDream() {
    const query = document.getElementById('searchInput').value.trim();
    if (query) {
        // يمكن التوجيه إلى صفحة نتائج البحث (سننشئها لاحقاً)
        window.location.href = `search.html?q=${encodeURIComponent(query)}`;
    }
}

/**
 * الاستماع إلى مفتاح Enter في حقل البحث
 */
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchDream();
            }
        });
    }
});

// ==================== دوال مساعدة للصفحات الأخرى (سيتم استدعاؤها عند الحاجة) ====================

/**
 * الحصول على معامل من الرابط (مثلاً ?id=snake)
 * @param {string} param - اسم المعامل
 * @returns {string|null} - قيمة المعامل
 */
function getUrlParameter(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

/**
 * تحميل تفسير معين لعرضه في صفحة dream.html
 */
function loadSingleDream() {
    const dreamId = getUrlParameter('id');
    if (!dreamId) {
        showError('لم يتم تحديد الحلم');
        return;
    }

    fetch('data/dreams.json')
        .then(response => response.json())
        .then(data => {
            const dream = data.dreams.find(d => d.id === dreamId);
            if (!dream) {
                showError('لم نجد هذا التفسير');
                return;
            }
            displaySingleDream(dream);
        })
        .catch(error => {
            console.error('خطأ:', error);
            showError('حدث خطأ في تحميل التفسير');
        });
}

/**
 * عرض تفسير فردي في صفحة dream.html
 * @param {Object} dream - التفسير المطلوب
 */
function displaySingleDream(dream) {
    document.title = dream.title + ' | تفسير الأحلام';
    const container = document.querySelector('.dream-detail');
    if (!container) return;

    container.innerHTML = `
        <h1>${dream.title}</h1>
        <div class="meta">
            <span>📚 ${dream.interpreter}</span>
            <span>📅 ${dream.date_added}</span>
            <span>👁️ ${dream.popularity} مشاهدة</span>
        </div>
        <div class="content">
            ${dream.content}
        </div>
        <div class="keywords">
            <strong>كلمات مفتاحية:</strong> ${dream.keywords.join('، ')}
        </div>
    `;
}

/**
 * عرض رسالة خطأ
 * @param {string} message - نص الخطأ
 */
function showError(message) {
    const container = document.querySelector('.dream-detail') || document.querySelector('.content');
    if (container) {
        container.innerHTML = `<div class="error">${message}</div>`;
    }
}

// تصدير الدوال للاستخدام في الصفحات الأخرى (اختياري)
window.searchDream = searchDream;
window.loadSingleDream = loadSingleDream;
window.getUrlParameter = getUrlParameter;
