/**
 * Utility Functions
 * Shared utility functions across the application
 */

/**
 * Debounce function - delays execution until after wait time
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function - limits execution frequency
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => {
                inThrottle = false;
            }, limit);
        }
    };
}

/**
 * Check if device is touch-enabled
 * @returns {boolean} True if touch device
 */
function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

/**
 * Check if device is desktop (screen width >= 768px)
 * @returns {boolean} True if desktop
 */
function isDesktop() {
    return window.innerWidth >= 768;
}

/**
 * Smooth scroll to element
 * @param {HTMLElement|string} target - Target element or selector
 * @param {number} offset - Offset from top (default: 80 for navbar)
 */
function smoothScrollTo(target, offset = 80) {
    const element = typeof target === 'string' 
        ? document.querySelector(target) 
        : target;
    
    if (element) {
        const targetPosition = element.offsetTop - offset;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

/**
 * Create intersection observer with callback
 * @param {Function} callback - Callback function
 * @param {Object} options - Observer options
 * @returns {IntersectionObserver}
 */
function createIntersectionObserver(callback, options = {}) {
    const defaultOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    return new IntersectionObserver(callback, { ...defaultOptions, ...options });
}

/**
 * Log error with context (production-safe)
 * @param {Error|string} error - Error object or message
 * @param {string} context - Context where error occurred
 */
function logError(error, context = '') {
    if (process.env.NODE_ENV !== 'production') {
        console.error(`[${context}]`, error);
    }
    // In production, you might want to send to error tracking service
}

// Export utilities for use in other scripts
window.GCNUtils = {
    debounce,
    throttle,
    isTouchDevice,
    isDesktop,
    smoothScrollTo,
    createIntersectionObserver,
    logError
};

