// Mobile Navigation Toggle
const mobileToggle = document.querySelector('.mobile-toggle');
const nav = document.querySelector('nav');

mobileToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    mobileToggle.querySelector('i').classList.toggle('fa-bars');
    mobileToggle.querySelector('i').classList.toggle('fa-times');
});

// Scroll Animation
const animateElements = document.querySelectorAll('.feature-card, .resource-card, .subject-card');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate__animated', 'animate__fadeInUp');
        }
    });
}, {
    threshold: 0.1
});

animateElements.forEach(el => {
    observer.observe(el);
});

// Close mobile nav when clicking on a link
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        mobileToggle.querySelector('i').classList.add('fa-bars');
        mobileToggle.querySelector('i').classList.remove('fa-times');
    });
});

// Simple counter animation for stats
const statNumbers = document.querySelectorAll('.stat-number');
const statsSection = document.querySelector('.stats-container');

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            statNumbers.forEach(stat => {
                const target = +stat.getAttribute('data-target');
                const count = +stat.innerText.replace('+', '');
                let startTime = null;
                
                const animation = (currentTime) => {
                    if (startTime === null) startTime = currentTime;
                    const timeElapsed = currentTime - startTime;
                    const progress = Math.min(timeElapsed / 2000, 1);
                    
                    stat.innerText = Math.floor(progress * target) + '+';
                    
                    if (progress < 1) {
                        requestAnimationFrame(animation);
                    } else {
                        stat.innerText = target + '+';
                    }
                };
                
                requestAnimationFrame(animation);
            });
            
            // Stop observing after animation
            statsObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5
});

// Add data-target attributes to stat numbers
document.querySelectorAll('.stat-number').forEach((stat, index) => {
    const values = [500, 1000, 10000, 95];
    stat.setAttribute('data-target', values[index]);
    stat.innerText = '0' + (index === 3 ? '' : '+');
});

// Observe stats section
if (statsSection) {
    statsObserver.observe(statsSection);
}