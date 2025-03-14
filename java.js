// Initialize WOW.js for scroll animations
document.addEventListener('DOMContentLoaded', function() {
    new WOW().init();
    
    // Initialize Swiper
    const swiper = new Swiper('.swiper', {
        // Optional parameters
        loop: true,
        effect: 'fade',
        autoplay: {
            delay: 5000,
        },
        
        // If we need pagination
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        
        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
});