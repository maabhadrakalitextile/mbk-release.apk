document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Fetch Download Link ---
    async function fetchDownloadUrl() {
        try {
            const response = await fetch(CONFIG.versionJson);
            if (!response.ok) throw new Error('Network response was not ok');
            
            const data = await response.json();
            
            // Update Download URL - prefer JSON apk url if exists, otherwise fallback to CONFIG
            const downloadUrl = data.apk || CONFIG.apkUrl;
            document.getElementById('hero-download-btn').href = downloadUrl;
            document.getElementById('section-download-btn').href = downloadUrl;

        } catch (error) {
            console.error('Error fetching version data:', error);
            // Fallback to CONFIG if JSON fails
            document.getElementById('hero-download-btn').href = CONFIG.apkUrl;
            document.getElementById('section-download-btn').href = CONFIG.apkUrl;
        }
    }
    
    fetchDownloadUrl();

    // --- 2. Carousel Logic ---
    const track = document.querySelector('.carousel-track');
    if (track) {
        const slides = Array.from(track.children);
        const nextButton = document.querySelector('.carousel-btn.next');
        const prevButton = document.querySelector('.carousel-btn.prev');
        let currentSlide = 0;

        function updateCarousel() {
            track.style.transform = `translateX(-${currentSlide * 100}%)`;
        }

        if (nextButton && prevButton) {
            nextButton.addEventListener('click', () => {
                currentSlide = (currentSlide < slides.length - 1) ? currentSlide + 1 : 0;
                updateCarousel();
            });

            prevButton.addEventListener('click', () => {
                currentSlide = (currentSlide > 0) ? currentSlide - 1 : slides.length - 1;
                updateCarousel();
            });
        }

        // Auto-play carousel
        setInterval(() => {
            currentSlide = (currentSlide < slides.length - 1) ? currentSlide + 1 : 0;
            updateCarousel();
        }, 4000);
    }
});
