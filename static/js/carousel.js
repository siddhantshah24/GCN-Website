/**
 * Career Page Carousel Handler
 * Handles company logo carousel interactions and career page links
 */

class CareerCarousel {
    constructor() {
        this.partnerLogos = document.querySelectorAll('.partner-logo[data-career-url]');
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.partnerLogos.forEach(logo => {
            // Use event delegation instead of inline onclick
            logo.addEventListener('click', (event) => {
                this.handleCareerPageClick(event, logo);
            });
        });
    }

    handleCareerPageClick(event, element) {
        event.preventDefault();
        const careerUrl = element.getAttribute('data-career-url');
        
        if (careerUrl && careerUrl !== '#') {
            // Open career page in new tab with security attributes
            window.open(careerUrl, '_blank', 'noopener,noreferrer');
        } else {
            // Optional: Show a message or placeholder behavior
            console.info('Career page URL not yet configured for this company');
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.partners-carousel-container')) {
        new CareerCarousel();
    }
});

// Export for potential use in other scripts
window.CareerCarousel = CareerCarousel;

