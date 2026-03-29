// ============================================
// انتظار تحميل الصفحة
// ============================================
document.addEventListener('DOMContentLoaded', function() {

    // ============================================
    // 1. قائمة التنقل للجوال (Menu Toggle)
    // ============================================
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });

        // إغلاق القائمة عند النقر على أي رابط
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
            });
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
            navbar.style.backgroundColor = '#1e3c72';
            navbar.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
        }
    });

    // ============================================
    // 3. البحث (توجيه إلى صفحة نتائج البحث المحلية)
    // ============================================
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');

    function performSearch() {
        const query = searchInput.value.trim();
        if (query === '') {
            alert('الرجاء إدخال كلمة للبحث عنها');
            return;
        }
        // توجيه إلى صفحة نتائج البحث (يمكن إنشاؤها لاحقاً)
        // نستخدم encodeURIComponent لتجنب مشاكل الأحرف الخاصة
        window.location.href = `search-results.html?q=${encodeURIComponent(query)}`;
    }

    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') performSearch();
        });
    }

    // ============================================
    // 4. تمرير سلس للروابط الداخلية (لأقسام الصفحة)
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ============================================
    // 5. إحصائيات متحركة (اختياري - يمكن تفعيلها إن أردت)
    // لكن الأرقام ثابتة الآن في index.html، نحتفظ بالكود للاستخدام المستقبلي
    // ============================================
    // (تم تعطيلها لأن الأرقام في الصفحة ثابتة حالياً)
});
