// Resources Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize resources page functionality
    initializeResourcesPage();
});

function initializeResourcesPage() {
    // Smooth scroll animations
    initializeAnimations();
    
    // Resource click tracking
    initializeResourceTracking();
}

function initializeAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
}

function initializeResourceTracking() {
    // Add click tracking for resource links
    document.querySelectorAll('.resource-link').forEach(link => {
        link.addEventListener('click', function(e) {
            const resourceName = this.textContent.trim();
            
            // Track the click with the backend
            trackResourceClick(resourceName);
        });
    });
}

function trackResourceClick(resourceName) {
    // Send tracking data to backend
    fetch('/api/track-resource-click', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            resource_name: resourceName,
            timestamp: new Date().toISOString(),
            user_agent: navigator.userAgent
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Resource click tracked successfully
        } else {
            // Failed to track resource click
        }
    })
    .catch(error => {
        // Error tracking resource click
    });
}

// Export functions for potential use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeResourcesPage,
        trackResourceClick
    };
}
