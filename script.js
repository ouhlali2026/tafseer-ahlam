// انتظار تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {

    // ============================================
    // 1. قائمة التنقل للجوال
    // ============================================
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => navLinks.classList.remove('active'));
        });
    }

    // ============================================
    // 2. تغيير لون الشريط عند التمرير
    // ============================================
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = '#0f2b4f';
            navbar.style.boxShadow = '0 4px 15px rgba(0,0,0,0.3)';
        } else {
            navbar.style.backgroundColor = 'rgba(30, 60, 114, 0.95)';
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
        }
    });

    // ============================================
    // 3. البحث
    // ============================================
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');

    function performSearch() {
        const query = searchInput.value.trim();
        if (query === '') {
            alert('الرجاء إدخال كلمة للبحث عنها');
            return;
        }
        window.location.href = `search-results.html?q=${encodeURIComponent(query)}`;
    }

    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') performSearch();
        });
    }

    // ============================================
    // 4. تمرير سلس للروابط الداخلية
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});