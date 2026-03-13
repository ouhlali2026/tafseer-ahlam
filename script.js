// انتظار تحميل الصفحة بالكامل
document.addEventListener('DOMContentLoaded', function() {
    
    // ========== الإحصائيات المتحركة ==========
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateStats() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const current = parseInt(stat.innerText);
            const increment = target / 50; // نزيد ببطء
            
            if (current < target) {
                let newValue = Math.ceil(current + increment);
                if (newValue > target) newValue = target;
                stat.innerText = newValue;
                setTimeout(animateStats, 30); // كرر كل 30 مللي ثانية
            } else {
                stat.innerText = target;
            }
        });
    }
    
    // نشغل الأنيميشن فقط عندما تظهر الإحصائيات في الشاشة
    const statsSection = document.querySelector('.stats-container');
    if (statsSection) {
        // بدأ الأنيميشن بعد ثانية من تحميل الصفحة
        setTimeout(animateStats, 1000);
    }
    
    // ========== وظيفة البحث ==========
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', function() {
            performSearch();
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    function performSearch() {
        const query = searchInput.value.trim();
        if (query === '') {
            alert('الرجاء إدخال كلمة للبحث عنها');
            return;
        }
        
        // هنا سنوجه المستخدم إلى صفحة نتائج البحث
        // لكن حالياً سنوجهه إلى صفحة التصنيفات
        // يمكنك تعديل هذا الرابط حسب ما تريد
        window.location.href = `search-results.html?q=${encodeURIComponent(query)}`;
    }
    
    // ========== تأثيرات إضافية ==========
    
    // تغيير لون خلفية الشريط عند التمرير
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.backgroundColor = '#0f2b4f';
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';
        } else {
            navbar.style.backgroundColor = '#1e3c72';
            navbar.style.boxShadow = '0 4px 10px rgba(0,0,0,0.1)';
        }
    });
    
    // رسالة ترحيبية في الكونسول (للمطورين)
    console.log('مرحباً بك في موقع تفسير الأحلام');
    console.log('الموقع قيد التطوير، إذا واجهت أي مشكلة، تواصل معنا');
});
