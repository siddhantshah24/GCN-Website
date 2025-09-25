// Navigation System - Desktop and Mobile
class Navigation {
    constructor() {
        this.navToggle = document.getElementById('nav-toggle');
        this.navMenu = document.getElementById('nav-menu');
        this.body = document.body;
        this.dropdownItems = [];
        this.isDesktop = window.innerWidth >= 768;
        this.isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        
        this.init();
    }

    init() {
        this.setupDeviceDetection();
        this.setupNavigation();
        this.setupEventListeners();
        this.setupResponsiveBehavior();
    }

    setupDeviceDetection() {
        // Add device-specific classes
        if (this.isTouchDevice) {
            document.documentElement.classList.add('touch-device');
        }
        if (this.isDesktop) {
            document.documentElement.classList.add('desktop-device');
        }
    }

    setupNavigation() {
        if (!this.navMenu || !this.navToggle) return;

        // Get all dropdown items
        this.dropdownItems = this.navMenu.querySelectorAll('.nav-item.dropdown');
        
        // Setup dropdown functionality based on device type
        // Use desktop navigation for screens >= 768px regardless of touch capability
        if (this.isDesktop) {
            this.setupDesktopNavigation();
        } else {
            this.setupMobileNavigation();
        }
    }

    setupDesktopNavigation() {
        // Desktop: Hover-based dropdown with click navigation
        this.dropdownItems.forEach(item => {
            const navLink = item.querySelector('.nav-link');
            const dropdownMenu = item.querySelector('.dropdown-menu');
            
            if (!navLink || !dropdownMenu) return;

            // Handle hover events for dropdown
            item.addEventListener('mouseenter', () => {
                this.showDropdown(item, dropdownMenu);
            });

            item.addEventListener('mouseleave', () => {
                this.hideDropdown(item, dropdownMenu);
            });

            // Handle click on main nav link (navigate to main page)
            navLink.addEventListener('click', (e) => {
                // Allow default navigation to main page
                // No preventDefault here
            });

            // Handle clicks on dropdown items
            const dropdownLinks = dropdownMenu.querySelectorAll('a');
            dropdownLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    // Allow navigation to dropdown page
                    // No preventDefault here
                });
            });
        });

        // Handle regular nav links (non-dropdown)
        const regularNavLinks = this.navMenu.querySelectorAll('.nav-item:not(.dropdown) .nav-link');
        regularNavLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Allow default navigation
                // No preventDefault here
            });
        });
    }

    setupMobileNavigation() {
        // Mobile: Click-based dropdown with touch support
        this.dropdownItems.forEach(item => {
            const navLink = item.querySelector('.nav-link');
            const dropdownMenu = item.querySelector('.dropdown-menu');
            
            if (!navLink || !dropdownMenu) return;

            const handleDropdownToggle = (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                // Close all other dropdowns first
                this.closeAllDropdowns();
                
                // Toggle current dropdown
                const wasActive = item.classList.contains('active');
                item.classList.toggle('active');
                
                if (item.classList.contains('active')) {
                    this.showMobileDropdown(dropdownMenu);
                } else {
                    this.hideMobileDropdown(dropdownMenu);
                }
            };

            // Add multiple event listeners for better mobile support
            navLink.addEventListener('click', handleDropdownToggle, { passive: false });
            navLink.addEventListener('touchstart', handleDropdownToggle, { passive: false });
        });

        // Handle dropdown submenu links - allow navigation
        const dropdownLinks = this.navMenu.querySelectorAll('.dropdown-menu a');
        
        dropdownLinks.forEach(link => {
            const handleSubmenuClick = (e) => {
                // Allow navigation to happen
                // Close mobile menu after a short delay to allow navigation
                setTimeout(() => {
                    this.closeMobileMenu();
                }, 100);
            };
            
            link.addEventListener('click', handleSubmenuClick, { passive: true });
            link.addEventListener('touchstart', handleSubmenuClick, { passive: true });
        });

        // Handle regular nav links (non-dropdown) - allow navigation
        const regularNavLinks = this.navMenu.querySelectorAll('.nav-item:not(.dropdown) .nav-link');
        
        regularNavLinks.forEach(link => {
            const handleRegularClick = (e) => {
                // Allow navigation to happen
                // Close mobile menu after a short delay to allow navigation
                setTimeout(() => {
                    this.closeMobileMenu();
                }, 100);
            };
            
            link.addEventListener('click', handleRegularClick, { passive: true });
            link.addEventListener('touchstart', handleRegularClick, { passive: true });
        });
    }

    setupEventListeners() {
        // Mobile menu toggle
        if (this.navToggle) {
            this.navToggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleMobileMenu();
            });
        }

        // Close menu when clicking outside
        document.addEventListener('click', (event) => {
            if (!this.navToggle?.contains(event.target) && !this.navMenu?.contains(event.target)) {
                this.closeMobileMenu();
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                this.closeMobileMenu();
            }
        });

        // Prevent body scroll when mobile menu is open
        if (this.navMenu) {
            this.navMenu.addEventListener('touchmove', (e) => {
                if (this.navMenu.classList.contains('active')) {
                    e.preventDefault();
                }
            }, { passive: false });
        }
    }

    setupResponsiveBehavior() {
        // Handle window resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                const wasDesktop = this.isDesktop;
                this.isDesktop = window.innerWidth >= 768;
                
                // Reinitialize navigation if device type changed
                if (wasDesktop !== this.isDesktop) {
                    this.setupNavigation();
                }
            }, 250);
        });
    }

    // Desktop dropdown methods
    showDropdown(item, dropdownMenu) {
        dropdownMenu.style.opacity = '1';
        dropdownMenu.style.visibility = 'visible';
        dropdownMenu.style.transform = 'translateY(0)';
        item.classList.add('hover');
    }

    hideDropdown(item, dropdownMenu) {
        dropdownMenu.style.opacity = '0';
        dropdownMenu.style.visibility = 'hidden';
        dropdownMenu.style.transform = 'translateY(-10px)';
        item.classList.remove('hover');
    }

    // Mobile dropdown methods
    showMobileDropdown(dropdownMenu) {
        dropdownMenu.style.maxHeight = '0';
        
        requestAnimationFrame(() => {
            dropdownMenu.style.maxHeight = dropdownMenu.scrollHeight + 'px';
            dropdownMenu.style.opacity = '1';
            dropdownMenu.style.visibility = 'visible';
        });
    }

    hideMobileDropdown(dropdownMenu) {
        dropdownMenu.style.maxHeight = '0';
        dropdownMenu.style.opacity = '0';
        dropdownMenu.style.visibility = 'hidden';
    }

    closeAllDropdowns() {
        this.dropdownItems.forEach(item => {
            item.classList.remove('active');
            const dropdown = item.querySelector('.dropdown-menu');
            if (dropdown) {
                dropdown.style.maxHeight = '0';
                dropdown.style.opacity = '0';
                dropdown.style.visibility = 'hidden';
            }
        });
    }

    // Mobile menu methods
    toggleMobileMenu() {
        this.navMenu.classList.toggle('active');
        this.body.classList.toggle('nav-open');
        
        // Reset all dropdowns when menu is toggled
        if (this.navMenu.classList.contains('active')) {
            this.closeAllDropdowns();
        }
        
        // Animate hamburger menu
        this.animateHamburger();
    }

    closeMobileMenu() {
        this.navMenu.classList.remove('active');
        this.body.classList.remove('nav-open');
        this.closeAllDropdowns();
        this.animateHamburger();
    }

    animateHamburger() {
        const bars = this.navToggle?.querySelectorAll('.bar');
        if (!bars) return;

        bars.forEach((bar, index) => {
            if (this.navMenu.classList.contains('active')) {
                if (index === 0) bar.style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                if (index === 1) bar.style.opacity = '0';
                if (index === 2) bar.style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            }
        });
    }
}

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Navigation();
});

// Export for potential use in other scripts
window.Navigation = Navigation;
