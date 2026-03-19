// انتظار تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // قائمة التنقل للجوال
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
    
    // تغيير لون الشريط عند التمرير
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = '#0f2b4f';
            navbar.style.boxShadow = '0 4px 15px rgba(0,0,0,0.3)';
        } else {
            navbar.style.backgroundColor = '#1e3c72';
            navbar.style.boxShadow = '0 4px 10px rgba(0,0,0,0.1)';
        }
    });
    
    // الإحصائيات المتحركة
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateStats() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const current = parseInt(stat.innerText);
            if (current < target) {
                let newValue = Math.ceil(current + target / 50);
                if (newValue > target) newValue = target;
                stat.innerText = newValue;
            }
        });
    }
    
    // بدء الأنيميشن بعد ثانية
    if (statNumbers.length > 0) {
        setTimeout(() => {
            const interval = setInterval(() => {
                let allDone = true;
                statNumbers.forEach(stat => {
                    if (parseInt(stat.innerText) < parseInt(stat.getAttribute('data-target'))) {
                        allDone = false;
                    }
                });
                if (allDone) {
                    clearInterval(interval);
                } else {
                    animateStats();
                }
            }, 40);
        }, 500);
    }
    
    // وظيفة البحث
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    
    function performSearch() {
        const query = searchInput.value.trim();
        if (query === '') {
            alert('الرجاء إدخال كلمة للبحث عنها');
            return;
        }
        // توجيه إلى صفحة نتائج البحث (افتراضية)
        window.location.href = `search-results.html?q=${encodeURIComponent(query)}`;
    }
    
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') performSearch();
        });
    }
});
