// Initialize Animate On Scroll
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Typing Animation
var typed = new Typed('#typed-text', {
    strings: ['Junior UX/UI Designer', 'IT Support Executive', 'Network Support Assistant'],
    typeSpeed: 60,
    backSpeed: 40,
    loop: true,
    backDelay: 1500
});

// Smooth scroll for nav links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        if(this.hash !== "") {
            e.preventDefault();
            const hash = this.hash;
            document.querySelector(hash).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});