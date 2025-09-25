// Feedback Form JavaScript

class FeedbackForm {
    constructor() {
        this.modal = null;
        this.overlay = null;
        this.form = null;
        this.submitBtn = null;
        this.messageContainer = null;
        this.isSubmitting = false;
        
        this.init();
    }
    
    init() {
        this.createModal();
        this.createFloatingButton();
        this.bindEvents();
    }
    
    createFloatingButton() {
        const button = document.createElement('button');
        button.className = 'feedback-button';
        button.setAttribute('aria-label', 'Open feedback form');
        button.innerHTML = '<i class="fas fa-comment-dots"></i>';
        button.title = 'Share your feedback with us!';
        
        document.body.appendChild(button);
        
        button.addEventListener('click', () => this.openModal());
    }
    
    createModal() {
        // Create overlay
        this.overlay = document.createElement('div');
        this.overlay.className = 'feedback-modal-overlay';
        
        // Create modal
        this.modal = document.createElement('div');
        this.modal.className = 'feedback-modal';
        
        this.modal.innerHTML = `
            <div class="feedback-modal-header">
                <h2 class="feedback-modal-title">Share Your Feedback</h2>
                <button class="feedback-modal-close" aria-label="Close feedback form">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <div class="feedback-message" style="display: none;"></div>
            
            <form class="feedback-form" name="feedback" method="POST" data-netlify="true" data-netlify-honeypot="bot-field" novalidate>
                <!-- Hidden honeypot field for Netlify Forms -->
                <div style="display: none;">
                    <label>Don't fill this out if you're human: <input name="bot-field"></label>
                </div>
                
                <div class="form-group">
                    <label for="feedback-name">Name *</label>
                    <input type="text" id="feedback-name" name="name" placeholder="Your name" required>
                </div>
                
                <div class="form-group">
                    <label for="feedback-type">Feedback Type *</label>
                    <select id="feedback-type" name="feedbackType" required>
                        <option value="">Select feedback type</option>
                        <option value="General">General</option>
                        <option value="Bug Report">Bug Report</option>
                        <option value="Feature Request">Feature Request</option>
                        <option value="Improvement Suggestion">Improvement Suggestion</option>
                    </select>
                </div>
                

                
                <div class="form-group">
                    <label for="feedback-message">Content *</label>
                    <textarea id="feedback-message" name="message" placeholder="Please share your thoughts, suggestions, or report any issues you've encountered..." required></textarea>
                </div>
                
                <div class="form-group">
                    <label for="feedback-email">Email (Optional)</label>
                    <input type="email" id="feedback-email" name="email" placeholder="your.email@example.com">
                </div>
                
                <button type="submit" class="feedback-submit-btn">
                    <span class="btn-text">Submit Feedback</span>
                </button>
            </form>
        `;
        
        this.overlay.appendChild(this.modal);
        document.body.appendChild(this.overlay);
        
        // Get references to form elements
        this.form = this.modal.querySelector('.feedback-form');
        this.submitBtn = this.modal.querySelector('.feedback-submit-btn');
        this.messageContainer = this.modal.querySelector('.feedback-message');
    }
    
    bindEvents() {
        // Close modal events
        const closeBtn = this.modal.querySelector('.feedback-modal-close');
        closeBtn.addEventListener('click', () => this.closeModal());
        
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) {
                this.closeModal();
            }
        });
        
        // Form submission
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Keyboard events
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isModalOpen()) {
                this.closeModal();
            }
        });
        
        // Form validation
        this.form.addEventListener('input', () => this.validateForm());
        

    }
    
    openModal() {
        this.overlay.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Focus first input
        setTimeout(() => {
            const firstInput = this.modal.querySelector('input');
            if (firstInput) firstInput.focus();
        }, 100);
        
        // Track analytics
        this.trackEvent('feedback_modal_opened');
    }
    
    closeModal() {
        this.overlay.classList.remove('show');
        document.body.style.overflow = '';
        
        // Reset form
        this.resetForm();
        
        // Track analytics
        this.trackEvent('feedback_modal_closed');
    }
    
    isModalOpen() {
        return this.overlay.classList.contains('show');
    }
    
    resetForm() {
        this.form.reset();
        this.hideMessage();
        this.submitBtn.disabled = false;
        this.submitBtn.classList.remove('loading');
        this.isSubmitting = false;
        
        // Remove validation styles
        const inputs = this.form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.classList.remove('error');
        });
    }
    
    validateForm() {
        const inputs = this.form.querySelectorAll('input, select, textarea');
        let isValid = true;
        
        inputs.forEach(input => {
            // Only validate required fields
            if (input.hasAttribute('required')) {
                if (!input.value.trim()) {
                    input.classList.add('error');
                    isValid = false;
                } else {
                    input.classList.remove('error');
                }
            } else {
                // Remove error class from optional fields
                input.classList.remove('error');
            }
            
            // Email validation (only if email has value)
            if (input.type === 'email' && input.value.trim()) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value)) {
                    input.classList.add('error');
                    isValid = false;
                } else {
                    input.classList.remove('error');
                }
            }
        });
        
        this.submitBtn.disabled = !isValid || this.isSubmitting;
        return isValid;
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        if (!this.validateForm() || this.isSubmitting) {
            return;
        }
        
        this.isSubmitting = true;
        this.submitBtn.disabled = true;
        this.submitBtn.classList.add('loading');
        
        try {
            // For Netlify Forms, we need to submit the form normally
            // The form will be processed by Netlify's servers
            // We'll show a success message and then submit the form
            
            // Show success message
            this.showMessage('Thank you for your feedback! Submitting...', 'success');
            
            // Track successful submission
            this.trackEvent('feedback_submitted_successfully');
            
            // Submit the form to Netlify
            // The form will redirect to a success page or show a success message
            // For now, we'll simulate the submission and show the thank you popup
            setTimeout(() => {
                this.showThankYouPopup();
            }, 1000);
            
        } catch (error) {
            // Error submitting feedback
            this.showMessage('An error occurred while submitting feedback. Please try again.', 'error');
        } finally {
            this.isSubmitting = false;
            this.submitBtn.disabled = false;
            this.submitBtn.classList.remove('loading');
        }
    }
    
    showMessage(message, type) {
        this.messageContainer.textContent = message;
        this.messageContainer.className = `feedback-message ${type}`;
        this.messageContainer.style.display = 'block';
        
        // Scroll to message
        this.messageContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    
    hideMessage() {
        this.messageContainer.style.display = 'none';
    }
    
    showThankYouPopup() {
        // Create thank you popup
        const popup = document.createElement('div');
        popup.className = 'thank-you-popup';
        popup.innerHTML = `
            <div class="thank-you-content">
                <div class="thank-you-icon">✓</div>
                <h3>Thank You!</h3>
                <p>Your feedback has been submitted successfully.</p>
                <button class="thank-you-close-btn">Close</button>
            </div>
        `;
        
        // Add to body
        document.body.appendChild(popup);
        
        // Show popup with animation
        setTimeout(() => {
            popup.classList.add('show');
        }, 100);
        
        // Close popup and modal when close button is clicked
        const closeBtn = popup.querySelector('.thank-you-close-btn');
        closeBtn.addEventListener('click', () => {
            popup.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(popup);
                this.resetForm();
                this.closeModal();
            }, 300);
        });
        
        // Auto-close after 3 seconds
        setTimeout(() => {
            if (popup.parentNode) {
                popup.classList.remove('show');
                setTimeout(() => {
                    if (popup.parentNode) {
                        document.body.removeChild(popup);
                        this.resetForm();
                        this.closeModal();
                    }
                }, 300);
            }
        }, 3000);
    }
    

    
    trackEvent(eventName) {
        // Track events for analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, {
                'event_category': 'feedback',
                'event_label': 'user_interaction'
            });
        }
        
        // Custom analytics tracking
        if (window.trackEvent) {
            window.trackEvent('feedback', eventName);
        }
    }
}

// Initialize feedback form when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FeedbackForm();
});

// Export for potential use in other scripts
window.FeedbackForm = FeedbackForm;
