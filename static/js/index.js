// Index Page JavaScript - Enhanced with Modern Animations

document.addEventListener('DOMContentLoaded', function() {
    initializeIndexPage();
});

function initializeIndexPage() {
    // Initialize all animations and interactions
    initializeAnimations();
    initializeCounterAnimations();
    initializeParallaxEffects();
    initializeHoverEffects();
    initializeSmoothScrolling();
    initializeParticleEffects();
    initializeScrollAnimations();
    initializeTestimonialCarousel();
}

function initializeCounterAnimations() {
    // Enhanced counter animations for stats
    const statCards = document.querySelectorAll('.stat-card');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const numberElement = entry.target.querySelector('.stat-number');
                if (numberElement && !numberElement.classList.contains('animated')) {
                    animateCounter(entry.target);
                    numberElement.classList.add('animated');
                }
            }
        });
    }, { threshold: 0.5 });
    
    statCards.forEach(card => {
        counterObserver.observe(card);
    });
}

function animateCounter(statCard) {
    const numberElement = statCard.querySelector('.stat-number');
    const target = parseInt(numberElement.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(target * easeOutQuart);
        
        numberElement.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            numberElement.textContent = target;
        }
    }
    
    requestAnimationFrame(updateCounter);
}

function initializeAnimations() {
    // Use utility function if available, otherwise create observer
    const observer = window.GCNUtils?.createIntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }) || new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

function initializeScrollAnimations() {
    // AOS-like scroll animations
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animation = element.dataset.aos;
                const delay = parseInt(element.dataset.aosDelay) || 0;
                
                setTimeout(() => {
                    element.classList.add('aos-animate');
                }, delay);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });
    
    // Observe all elements with data-aos attributes
    document.querySelectorAll('[data-aos]').forEach(el => {
        scrollObserver.observe(el);
    });
}

function initializeParticleEffects() {
    // Enhanced particle animations
    const particles = document.querySelectorAll('.particle');
    
    particles.forEach((particle, index) => {
        // Add random movement to particles
        setInterval(() => {
            const randomX = (Math.random() - 0.5) * 20;
            const randomY = (Math.random() - 0.5) * 20;
            particle.style.transform = `translate(${randomX}px, ${randomY}px)`;
        }, 3000 + (index * 500));
    });
}

function initializeParallaxEffects() {
    // Enhanced parallax effect for floating shapes
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const shapes = document.querySelectorAll('.shape');
        
        shapes.forEach((shape, index) => {
            const speed = 0.2 + (index * 0.05); // Reduced speed for better performance
            const yPos = scrolled * speed;
            const xPos = Math.sin(scrolled * 0.001 + index) * 10;
            shape.style.transform = `translate(${xPos}px, ${yPos}px) rotate(${scrolled * 0.01}deg)`;
        });
        
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });
}

function initializeHoverEffects() {
    // Hover effects are now handled by CSS
    // This function can be removed or used for additional JS-only hover logic
    // CSS transitions handle the visual effects more efficiently
}

function initializeTestimonialCarousel() {
    // Enhanced testimonial carousel with pause on hover
    const carousel = document.querySelector('.testimonials-track');
    
    if (carousel) {
        carousel.addEventListener('mouseenter', () => {
            carousel.style.animationPlayState = 'paused';
        });
        
        carousel.addEventListener('mouseleave', () => {
            carousel.style.animationPlayState = 'running';
        });
        
        // Add touch support for mobile
        let isDown = false;
        let startX;
        let scrollLeft;
        
        carousel.addEventListener('mousedown', (e) => {
            isDown = true;
            carousel.style.animationPlayState = 'paused';
            startX = e.pageX - carousel.offsetLeft;
            scrollLeft = carousel.scrollLeft;
        });
        
        carousel.addEventListener('mouseleave', () => {
            isDown = false;
            carousel.style.animationPlayState = 'running';
        });
        
        carousel.addEventListener('mouseup', () => {
            isDown = false;
            carousel.style.animationPlayState = 'running';
        });
        
        carousel.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - carousel.offsetLeft;
            const walk = (x - startX) * 2;
            carousel.scrollLeft = scrollLeft - walk;
        });
    }
}

function initializeSmoothScrolling() {
    // Enhanced smooth scrolling with easing
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const targetPosition = target.offsetTop - 80; // Account for fixed header
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = 1000;
                let start = null;
                
                function animation(currentTime) {
                    if (start === null) start = currentTime;
                    const timeElapsed = currentTime - start;
                    const run = ease(timeElapsed, startPosition, distance, duration);
                    window.scrollTo(0, run);
                    if (timeElapsed < duration) requestAnimationFrame(animation);
                }
                
                function ease(t, b, c, d) {
                    t /= d / 2;
                    if (t < 1) return c / 2 * t * t + b;
                    t--;
                    return -c / 2 * (t * (t - 2) - 1) + b;
                }
                
                requestAnimationFrame(animation);
            }
        });
    });
}

// Performance optimizations - use utilities from utils.js
const optimizedScrollHandler = window.GCNUtils?.throttle(() => {
    // Any scroll-based functionality can be added here
}, 16) || (() => {}); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

// Add loading animation - CSS handles the visual states
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// CSS for loading states is now in loading-states.css
// No need to inject styles dynamically
