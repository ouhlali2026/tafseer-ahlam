// ================================
// بيانات الأحلام (يمكن استبدالها بجلب من ملف JSON)
// ================================
const dreamsData = [
    {
        id: "snake",
        emoji: "🐍",
        title: "الثعبان",
        description: "يدل على عدو كائن أو خفي، ورؤيته في المنام قد تكون تحذيراً من شخص ماكر.",
        views: "1.5k",
        likes: 234,
        category: "animals"
    },
    {
        id: "lion",
        emoji: "🦁",
        title: "الأسد",
        description: "يدل على سلطان أو رجل قوي، وقد يكون إشارة إلى مواجهة شخص ذي نفوذ.",
        views: "1.2k",
        likes: 189,
        category: "animals"
    },
    {
        id: "death",
        emoji: "💀",
        title: "الموت",
        description: "يدل على طول العمر أو التوبة، وهو من الرؤيا التي تبشر بحياة طويلة.",
        views: "1.1k",
        likes: 156,
        category: "events"
    },
    {
        id: "marriage",
        emoji: "💍",
        title: "الزواج",
        description: "يدل على الفرج وتحقيق الأماني، وقد يكون بشرى بزواج قريب.",
        views: "1.4k",
        likes: 278,
        category: "events"
    },
    {
        id: "pregnancy",
        emoji: "👶",
        title: "الحمل",
        description: "يدل على الرزق والبركة، وقد يبشر بمولود جديد قادم.",
        views: "1.3k",
        likes: 245,
        category: "people"
    },
    {
        id: "flying",
        emoji: "🕊️",
        title: "الطيران",
        description: "يدل على السفر أو تحقيق الأماني، والشعور بالحرية والانطلاق.",
        views: "902",
        likes: 123,
        category: "events"
    }
];

// ================================
// عرض الأحلام في الصفحة الرئيسية
// ================================
function displayDreams() {
    const grid = document.getElementById('dreamsGrid');
    if (!grid) return;

    grid.innerHTML = ''; // تفريغ الشبكة

    dreamsData.forEach(dream => {
        const card = document.createElement('div');
        card.className = 'dream-card';
        card.setAttribute('data-category', dream.category);
        card.innerHTML = `
            <div class="dream-emoji">${dream.emoji}</div>
            <h3>${dream.title}</h3>
            <p>${dream.description}</p>
            <div class="dream-stats">
                <span>👁️ ${dream.views}</span>
                <span>❤️ ${dream.likes}</span>
            </div>
        `;
        card.addEventListener('click', () => {
            // التوجيه إلى صفحة التفسير الفردي (يمكن تطويرها لاحقاً)
            window.location.href = `dream.html?id=${dream.id}`;
        });
        grid.appendChild(card);
    });
}

// ================================
// وظيفة البحث
// ================================
function initSearch() {
    const searchInputs = document.querySelectorAll('.hero-search input, .nav-search input');
    const searchButtons = document.querySelectorAll('.hero-search button, .nav-search button');

    function performSearch() {
        // نأخذ قيمة البحث من أي حقل (نفترض أنها متطابقة تقريباً)
        let query = '';
        searchInputs.forEach(input => {
            if (input.value.trim() !== '') query = input.value.trim();
        });
        if (query) {
            alert(`جاري البحث عن: "${query}"\nسيتم تفعيل البحث الكامل قريباً.`);
            // يمكن توجيه المستخدم إلى صفحة نتائج البحث مثلاً: window.location.href = `search.html?q=${encodeURIComponent(query)}`;
        }
    }

    // إضافة مستمعي الأحداث للأزرار
    searchButtons.forEach(btn => {
        btn.addEventListener('click', performSearch);
    });

    // إضافة مستمعي الأحداث لحقول الإدخال (الضغط على Enter)
    searchInputs.forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    });
}

// ================================
// النشرة البريدية
// ================================
function initNewsletter() {
    const form = document.querySelector('.newsletter-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = form.querySelector('input[type="email"]');
        const email = emailInput.value.trim();

        if (email && isValidEmail(email)) {
            alert(`شكراً لك! تم الاشتراك في النشرة البريدية باستخدام البريد: ${email}`);
            emailInput.value = ''; // تفريغ الحقل
        } else {
            alert('الرجاء إدخال بريد إلكتروني صحيح.');
        }
    });
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ================================
// إحصائيات تفاعلية (اختياري)
// ================================
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(el => {
        const finalValue = el.innerText; // نحتفظ بالقيمة النهائية
        // يمكن إضافة تأثير زيادة تدريجية هنا
    });
}

// ================================
// التحميل عند فتح الصفحة
// ================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🌙 موقع تفسير الأحلام - تم التحميل');

    displayDreams();
    initSearch();
    initNewsletter();
    animateStats();

    // تفعيل الرابط النشط في القائمة (حسب الصفحة الحالية)
    highlightActiveNav();
});

function highlightActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// ================================
// تحميل ديناميكي للبيانات من ملف JSON (للنسخة المتقدمة)
// يمكن تفعيلها لاحقاً بدلاً من البيانات الثابتة أعلاه
// ================================
/*
async function loadDreamsFromJSON() {
    try {
        const response = await fetch('data/dreams.json');
        if (!response.ok) throw new Error('فشل تحميل البيانات');
        const data = await response.json();
        dreamsData = data.dreams; // تحديث المصفوفة
        displayDreams(); // إعادة العرض
    } catch (error) {
        console.error('خطأ في تحميل البيانات:', error);
    }
}
*/
