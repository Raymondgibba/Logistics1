// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Reveal animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Counter animation
const counters = document.querySelectorAll('.stat-number');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = +counter.getAttribute('data-target');
            const increment = target / 100;
            let count = 0;
            const timer = setInterval(() => {
                count += increment;
                if (count >= target) {
                    counter.innerText = target;
                    clearInterval(timer);
                } else {
                    counter.innerText = Math.floor(count);
                }
            }, 30);
            counterObserver.unobserve(counter);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

// FAQ accordion
const faqQuestions = document.querySelectorAll('.faq-question');
faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const isOpen = answer.classList.contains('show');

        // Close all answers
        document.querySelectorAll('.faq-answer').forEach(ans => ans.classList.remove('show'));
        document.querySelectorAll('.faq-question').forEach(q => q.classList.remove('active'));

        if (!isOpen) {
            answer.classList.add('show');
            question.classList.add('active');
        }
    });
});

// Quote calculator
const quoteForm = document.getElementById('quote-form');
const quoteResult = document.getElementById('quote-result');
const quotePrice = document.getElementById('quote-price');
const emailQuote = document.getElementById('email-quote');
const whatsappQuote = document.getElementById('whatsapp-quote');

quoteForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const itemType = document.getElementById('item-type').value;
    const shippingMethod = document.getElementById('shipping-method').value;
    const originCountry = document.getElementById('origin-country').value;
    const destinationCountry = document.getElementById('destination-country').value;
    const quantity = +document.getElementById('quantity').value;
    const unit = document.getElementById('unit').value;

    // Convert to kg
    let kg = quantity;
    if (unit === 'ton') kg = quantity * 1000;
    else if (unit === 'carton') kg = quantity * 20;
    else if (unit === 'unit') kg = quantity * 0.5;
    else if (unit === '20ft') kg = 1800; // Contact for quote
    else if (unit === '40ft') kg = 2800; // Contact for quote

    // Base rates
    let rate = 3; // default
    let minCharge = 250;
    if (shippingMethod === 'sea') {
        rate = 2;
        minCharge = 200;
    } else if (shippingMethod === 'air') {
        rate = 8;
        minCharge = 500;
    } else if (shippingMethod === 'land') {
        rate = 1.5;
        minCharge = 150;
    }

    if (unit === '20ft' || unit === '40ft') {
        if (shippingMethod === 'sea') {
            const flat = unit === '20ft' ? 1800 : 2800;
            quotePrice.innerText = `Contact for quote`;
        } else {
            quotePrice.innerText = `Contact for quote`;
        }
    } else {
        const cost = Math.max(kg * rate, minCharge);
        const min = Math.round(cost / 10) * 10;
        const max = Math.round((cost * 1.35) / 10) * 10;
        quotePrice.innerText = `$${min} — $${max} USD`;
    }

    quoteResult.classList.add('show');

    // Pre-fill links
    const quoteText = `Quote Request: ${itemType} from ${originCountry} to ${destinationCountry}, ${quantity} ${unit}, ${shippingMethod}. Estimated: ${quotePrice.innerText}`;
    emailQuote.href = `mailto:raymond@gibbalogistics.com?subject=Quote Request&body=${encodeURIComponent(quoteText)}`;
    whatsappQuote.href = `https://wa.me/2201234567?text=${encodeURIComponent(quoteText)}`;
});

// Timeline tabs
const tabs = document.querySelectorAll('.tab');
const timelinePhases = document.querySelectorAll('.timeline-phases');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const tabName = tab.getAttribute('data-tab');

        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        timelinePhases.forEach(phase => {
            phase.classList.remove('active');
            if (phase.getAttribute('data-tab') === tabName) {
                phase.classList.add('active');
            }
        });
    });
});

// Contact form
const contactForm = document.getElementById('contact-form');
const contactSuccess = document.querySelector('.contact-success');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    contactForm.style.display = 'none';
    contactSuccess.style.display = 'block';
});

// Scroll to top
const scrollTopBtn = document.querySelector('.scroll-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Cookie banner
const cookieBanner = document.getElementById('cookie-banner');
const cookieAccept = document.querySelector('.cookie-accept');

if (localStorage.getItem('cookiesAccepted')) {
    cookieBanner.style.display = 'none';
}

cookieAccept.addEventListener('click', () => {
    localStorage.setItem('cookiesAccepted', 'true');
    cookieBanner.style.display = 'none';
});