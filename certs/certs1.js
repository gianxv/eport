document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    const items = document.querySelectorAll('.carousel-item');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const totalItems = items.length;
    let currentIndex = 0;

    // Initial setup
    function setupCarousel() {
        const radius = 600; // Adjusted for 6 images
        const theta = 2 * Math.PI / totalItems;
        
        items.forEach((item, index) => {
            // Position items in a circle on the 3D plane
            const angle = theta * index;
            const z = radius * Math.cos(angle);
            const x = radius * Math.sin(angle);
            
            item.style.transform = `translateX(${x}px) translateZ(${z}px) rotateY(${angle}rad)`;
            item.style.opacity = index === 0 ? '1' : '0.3';
        });
        
        // Rotate the carousel to show the first item
        updateCarousel();
    }

    function updateCarousel() {
        const theta = 2 * Math.PI / totalItems;
        const angle = theta * currentIndex * -1;
        carousel.style.transform = `rotateY(${angle}rad)`;
        
        // Update opacity for focus effect
        items.forEach((item, index) => {
            const distance = Math.min(
                Math.abs(index - currentIndex),
                Math.abs(index - currentIndex - totalItems),
                Math.abs(index - currentIndex + totalItems)
            );
            
            if (distance === 0) {
                item.style.opacity = '1';
                item.style.transform = `${item.style.transform.split('scale')[0]} scale(1.1)`;
            } else {

                const opacity = Math.max(0.2, 1 - (distance * 0.25));
                item.style.opacity = opacity.toString();
                item.style.transform = item.style.transform.split('scale')[0];
            }
        });
    }

    // Event listeners
    prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        updateCarousel();
    });

    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
    });

    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + totalItems) % totalItems;
            updateCarousel();
        } else if (e.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % totalItems;
            updateCarousel();
        }
    });

    // Add touch support
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    document.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            // Swipe left
            currentIndex = (currentIndex + 1) % totalItems;
            updateCarousel();
        } else if (touchEndX > touchStartX + 50) {
            // Swipe right
            currentIndex = (currentIndex - 1 + totalItems) % totalItems;
            updateCarousel();
        }
    }

    // Auto-rotate
    let autoRotate = setInterval(() => {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
    }, 5000);

    // Pause auto-rotation when interacting
    carousel.addEventListener('mouseenter', () => clearInterval(autoRotate));
    carousel.addEventListener('mouseleave', () => {
        autoRotate = setInterval(() => {
            currentIndex = (currentIndex + 1) % totalItems;
            updateCarousel();
        }, 5000);
    });

    // Initialize the carousel
    setupCarousel();
});