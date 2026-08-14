// Typewriter Effect Class
class TypewriterEffect {
    constructor(element, designations, typingSpeed = 80, deletingSpeed = 50, pauseDuration = 1500) {
        this.element = element;
        this.designations = designations;
        this.typingSpeed = typingSpeed;
        this.deletingSpeed = deletingSpeed;
        this.pauseDuration = pauseDuration;
        this.currentIndex = 0;
        this.currentText = '';
        this.isDeleting = false;
        this.start();
    }

    start() {
        this.type();
    }

    type() {
        const current = this.designations[this.currentIndex];
        
        if (this.isDeleting) {
            // Delete mode
            this.currentText = current.substring(0, this.currentText.length - 1);
            this.element.textContent = this.currentText;
            
            if (this.currentText === '') {
                this.isDeleting = false;
                this.currentIndex = (this.currentIndex + 1) % this.designations.length;
                setTimeout(() => this.type(), 500);
                return;
            }
            setTimeout(() => this.type(), this.deletingSpeed);
        } else {
            // Typing mode
            this.currentText = current.substring(0, this.currentText.length + 1);
            this.element.textContent = this.currentText;
            
            if (this.currentText === current) {
                setTimeout(() => {
                    this.isDeleting = true;
                    this.type();
                }, this.pauseDuration);
                return;
            }
            setTimeout(() => this.type(), this.typingSpeed);
        }
    }
}

// Initialize typewriter effect
document.addEventListener('DOMContentLoaded', () => {
    const typewriterElement = document.querySelector('.typewriter-text');
    if (typewriterElement) {
        const designations = [
            'WordPress Developer',
            'E-commerce Manager',
            'UX/UI Designer',
            'IT Support & Networking'
        ];
        new TypewriterEffect(typewriterElement, designations);
    }
});

// Project filter behavior
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.mini-project-card');

    if (filterButtons.length && projectCards.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const selectedFilter = button.dataset.filter;

                filterButtons.forEach(btn => btn.classList.toggle('active', btn === button));

                projectCards.forEach(card => {
                    const category = card.dataset.category;
                    const shouldShow = selectedFilter === 'all' || category === selectedFilter;
                    card.style.display = shouldShow ? 'flex' : 'none';
                });
            });
        });
    }
});

// Initialize Animate On Scroll
AOS.init({
    duration: 800,
    once: true,
    offset: 100,
    easing: 'ease-in-out-quart'
});

// Set dynamic year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Smooth scroll for nav links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        if (this.hash !== "") {
            e.preventDefault();
            const hash = this.hash;
            const target = document.querySelector(hash);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
        const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', String(!expanded));
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });
}

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        const formStatus = document.getElementById('formStatus');

        // Validation
        let isValid = true;
        let errors = [];

        if (!name) {
            errors.push('Name is required');
            isValid = false;
        }

        if (!email) {
            errors.push('Email is required');
            isValid = false;
        } else if (!isValidEmail(email)) {
            errors.push('Please enter a valid email');
            isValid = false;
        }

        if (!subject) {
            errors.push('Subject is required');
            isValid = false;
        }

        if (!message) {
            errors.push('Message is required');
            isValid = false;
        }

        // Show validation errors
        if (!isValid) {
            formStatus.textContent = errors.join(', ');
            formStatus.classList.add('error');
            formStatus.classList.remove('success');
            return;
        }

        // Since we don't have a backend, show this message
        formStatus.textContent = 'Thank you for your message! Please contact me directly at sabbir4396@gmail.com or +8801902449447.';
        formStatus.classList.add('success');
        formStatus.classList.remove('error');

        // Reset form
        this.reset();

        // Clear status message after 5 seconds
        setTimeout(() => {
            formStatus.textContent = '';
            formStatus.classList.remove('success', 'error');
        }, 5000);
    });
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Custom cursor follower
const isTouchDevice = window.matchMedia('(pointer: coarse)').matches || window.innerWidth <= 768;

if (!isTouchDevice) {
    const cursorFollower = document.createElement('div');
    cursorFollower.className = 'cursor-follower';
    document.body.appendChild(cursorFollower);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let followerX = mouseX;
    let followerY = mouseY;

    const interactiveSelector = 'a, button, .btn-primary, .btn-secondary, .nav-link, .social-icon, .filter-btn, .project-case-link, .mini-link, .projects-cta-link, .project-card, .mini-project-card, .company-link, .menu-toggle, .skill-chip';

    document.addEventListener('mousemove', (event) => {
        mouseX = event.clientX;
        mouseY = event.clientY;
        cursorFollower.classList.add('is-visible');
    });

    document.addEventListener('mouseleave', () => {
        cursorFollower.classList.remove('is-visible');
    });

    document.querySelectorAll(interactiveSelector).forEach(element => {
        element.addEventListener('mouseenter', () => cursorFollower.classList.add('is-hovering'));
        element.addEventListener('mouseleave', () => cursorFollower.classList.remove('is-hovering'));
    });

    function animateCursor() {
        followerX += (mouseX - followerX) * 0.12;
        followerY += (mouseY - followerY) * 0.12;
        cursorFollower.style.left = `${followerX}px`;
        cursorFollower.style.top = `${followerY}px`;
        requestAnimationFrame(animateCursor);
    }

    requestAnimationFrame(animateCursor);
}

// Scroll to top on page load
window.scrollTo(0, 0);

// Add scroll effect to header
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.boxShadow = 'none';
    }
});
