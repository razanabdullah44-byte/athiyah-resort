// 1. ظهور العناصر بنعومة عند التمرير
const revealItems = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, idx) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('active');
            }, idx * 65);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

revealItems.forEach(item => observer.observe(item));

// 2. مساعدة تلقائية إذا كانت الصور داخل مجلد images امتدادها JPG أو png بدل jpg
document.querySelectorAll('img').forEach(img => {
    const originalSrc = img.getAttribute('src');
    if (!originalSrc || !originalSrc.startsWith('images/')) return;

    const extensions = ['.jpg', '.JPG', '.jpeg', '.JPEG', '.png', '.PNG'];
    const baseName = originalSrc.replace(/\.(jpg|jpeg|png)$/i, '');
    let currentIndex = 0;

    img.addEventListener('error', function handleImgError() {
        currentIndex++;
        if (currentIndex < extensions.length) {
            img.src = baseName + extensions[currentIndex];
        } else {
            img.removeEventListener('error', handleImgError);
        }
    });
});

// 3. إرسال الحجز إلى واتساب المنتجع
document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('guestName').value;
    const date = document.getElementById('eventDate').value;
    const type = document.getElementById('eventType').value;
    const count = document.getElementById('guestCount').value;
    const notes = document.getElementById('notes').value;

    const phone = "966510099090";

    let text = `السلام عليكم إدارة منتجع عذيّة للمناسبات ✨\n`;
    text += `أرغب في حجز موعد بالمعلومات التالية:\n\n`;
    text += `• الاسم: ${name}\n`;
    text += `• التاريخ: ${date}\n`;
    text += `• نوع المناسبة: ${type}\n`;
    text += `• عدد الضيوف: ${count}\n`;
    if (notes.trim() !== "") {
        text += `• ملاحظات: ${notes}\n`;
    }

    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
});

// 4. إضافة رأي جديد
document.getElementById('reviewForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('reviewerName').value;
    const rating = document.getElementById('reviewRating').value;
    const comment = document.getElementById('reviewComment').value;

    const card = document.createElement('div');
    card.className = 'review-card fade-up';
    card.innerHTML = `
        <div class="stars">${rating}</div>
        <p>"${comment}"</p>
        <span class="author">${name}</span>
    `;

    document.getElementById('reviewsList').prepend(card);
    this.reset();
});