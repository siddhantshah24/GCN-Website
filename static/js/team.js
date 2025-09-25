// Team Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize team page functionality
    initializeTeamPage();
});

function initializeTeamPage() {
    // Add fade-in animations for team cards
    const teamCards = document.querySelectorAll('.team-card');
    
    // Intersection Observer for fade-in animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe all team cards
    teamCards.forEach(card => {
        observer.observe(card);
    });

    // Add hover effects for social links
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Export functions for potential use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeTeamPage
    };
}
