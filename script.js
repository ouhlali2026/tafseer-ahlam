// ============================================
// انتظار تحميل الصفحة بالكامل
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
    // 2. تغيير شفافية الشريط عند التمرير
    // ============================================
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.98)';
            navbar.style.backdropFilter = 'blur(12px)';
        } else {
            navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.95)';
            navbar.style.backdropFilter = 'blur(12px)';
        }
    });

    // ============================================
    // 3. وظيفة البحث (توجيه إلى نتائج البحث)
    // ============================================
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');

    function performSearch() {
        const query = searchInput.value.trim();
        if (query === '') {
            alert('📖 الرجاء إدخال كلمة للبحث عنها (مثال: نمل، بحر، أسد)');
            return;
        }
        // توجيه إلى صفحة نتائج البحث (يمكن إنشاؤها لاحقاً)
        window.location.href = `search-results.html?q=${encodeURIComponent(query)}`;
    }

    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') performSearch();
        });
    }

    // ============================================
    // 4. تمرير سلس للروابط الداخلية (Smooth Scroll)
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
    // 5. إحصائيات متحركة (Animated Stats)
    // ============================================
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateStats() {
        statNumbers.forEach(stat => {
            const text = stat.innerText;
            // استخراج الرقم من النص (مثل "+٩٧" -> 97)
            let target = parseInt(text.replace(/[^0-9]/g, ''));
            if (isNaN(target)) target = 0;
            
            let current = 0;
            const increment = Math.ceil(target / 50);
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                // إعادة الرقم مع علامة + إذا كانت موجودة
                if (text.includes('+')) {
                    stat.innerText = `+${current}`;
                } else {
                    stat.innerText = current;
                }
            }, 30);
        });
    }

    // تشغيل الإحصائيات بعد تحميل الصفحة
    if (statNumbers.length > 0) {
        setTimeout(animateStats, 500);
    }

    // ============================================
    // 6. إضافة تأثير ظهور تدريجي للبطاقات (Lazy Load Effect)
    // ============================================
    const cards = document.querySelectorAll('.card, .category-card, .interpreter-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px 50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease';
        observer.observe(card);
    });

    // ============================================
    // 7. تتبع الروابط الخارجية (اختياري)
    // ============================================
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        link.addEventListener('click', function(e) {
            // يمكن إضافة تحليلات هنا في المستقبل
            console.log('رابط خارجي تم النقر عليه: ' + this.href);
        });
    });

    // ============================================
    // 8. رسالة ترحيبية في الكونسول (للمطورين)
    // ============================================
    console.log('🌈 مرحباً بك في موقع تفسير الأحلام');
    console.log('📊 إجمالي التفسيرات: 97+');
    console.log('📂 عدد التصنيفات: 8');
    console.log('💡 يمكنك البحث عن حلمك باستخدام مربع البحث في الأعلى');
});