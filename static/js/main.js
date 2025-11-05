// Main JavaScript - Non-navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Touch device detection for other features
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isTouchDevice) {
        document.documentElement.classList.add('touch-device');
    }

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements with animation classes
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Counter animation for stats
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalNumber = parseInt(target.textContent);
                const suffix = target.textContent.replace(/\d/g, '');
                let currentNumber = 0;
                const increment = finalNumber / 50;
                
                const timer = setInterval(() => {
                    currentNumber += increment;
                    if (currentNumber >= finalNumber) {
                        currentNumber = finalNumber;
                        clearInterval(timer);
                    }
                    target.textContent = Math.floor(currentNumber) + suffix;
                }, 30);
                
                statsObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        });
    }

    // Form validation and submission
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            if (isValid) {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Thank you! Your message has been sent successfully.';
                form.appendChild(successMessage);
                form.reset();
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }
        });
    });

    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });

    // Back to top button
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopButton.className = 'back-to-top';
    backToTopButton.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTopButton);

    // Function to toggle button visibility
    function toggleBackToTopButton() {
        if (window.pageYOffset > 300) {
            // Use requestAnimationFrame to ensure smooth animation
            requestAnimationFrame(() => {
                backToTopButton.classList.add('visible');
            });
        } else {
            requestAnimationFrame(() => {
                backToTopButton.classList.remove('visible');
            });
        }
    }

    // Use throttled scroll handler for performance
    const scrollHandler = window.GCNUtils?.throttle(toggleBackToTopButton, 100) || toggleBackToTopButton;

    // Check initial scroll position on page load with a small delay to ensure DOM is ready
    setTimeout(() => {
        toggleBackToTopButton();
    }, 100);

    window.addEventListener('scroll', scrollHandler);

    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Testimonials carousel (if exists)
    const testimonialContainer = document.querySelector('.testimonials-container');
    if (testimonialContainer) {
        let currentSlide = 0;
        const testimonials = testimonialContainer.querySelectorAll('.testimonial');
        const totalSlides = testimonials.length;

        function showSlide(index) {
            testimonials.forEach((testimonial, i) => {
                testimonial.style.display = i === index ? 'block' : 'none';
            });
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            showSlide(currentSlide);
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            showSlide(currentSlide);
        }

        // Auto-advance slides
        setInterval(nextSlide, 5000);

        // Add navigation buttons if needed
        const prevButton = document.createElement('button');
        const nextButton = document.createElement('button');
        
        prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
        nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
        
        prevButton.addEventListener('click', prevSlide);
        nextButton.addEventListener('click', nextSlide);
        
        testimonialContainer.appendChild(prevButton);
        testimonialContainer.appendChild(nextButton);
    }

    // Add loading animation - CSS is now in loading-states.css
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
});

// Utility functions are now in utils.js
// This file uses window.GCNUtils if available, otherwise falls back to local implementations 