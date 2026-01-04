// ==========================================
// GLOBAL VARIABLES
// ==========================================
let mouseX = 0;
let mouseY = 0;
let lastMouseX = 0;
let lastMouseY = 0;

// ==========================================
// WAND CURSOR TRAIL EFFECT
// ==========================================
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Create trail particle every few pixels moved
    const distance = Math.sqrt(
        Math.pow(mouseX - lastMouseX, 2) + Math.pow(mouseY - lastMouseY, 2)
    );
    
    if (distance > 10) {
        createWandTrail(mouseX, mouseY);
        lastMouseX = mouseX;
        lastMouseY = mouseY;
    }
});

function createWandTrail(x, y) {
    const trail = document.createElement('div');
    trail.className = 'wand-trail';
    trail.style.left = x + 'px';
    trail.style.top = y + 'px';
    document.body.appendChild(trail);
    
    // Remove after animation
    setTimeout(() => trail.remove(), 800);
}

// ==========================================
// SCENE 1: ENTER HOGWARTS
// ==========================================
function enterHogwarts() {
    const letterScene = document.getElementById('scene-letter');
    const nav = document.getElementById('nav');
    
    letterScene.classList.add('hidden');
    
    // Show navigation after letter disappears
    setTimeout(() => {
        nav.classList.add('visible');
    }, 1000);
}

// Make function globally accessible
window.enterHogwarts = enterHogwarts;

// ==========================================
// SCENE 2: HOGWARTS PARALLAX & PARTICLES
// ==========================================
function initHogwartsScene() {
    // Create stars
    const starsContainer = document.getElementById('stars');
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 60 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        starsContainer.appendChild(star);
    }
    
    // Create floating particles
    const particlesContainer = document.getElementById('particles');
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.bottom = '0';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.animationDuration = (8 + Math.random() * 4) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Parallax scroll effect for Hogwarts scene
function updateParallax() {
    const scrolled = window.pageYOffset;
    const hogwartsScene = document.getElementById('scene-hogwarts');
    
    if (hogwartsScene) {
        const skyLayer = hogwartsScene.querySelector('.sky-layer');
        const castleLayer = hogwartsScene.querySelector('.castle-layer');
        const fogLayer = hogwartsScene.querySelector('.fog-layer');
        
        if (skyLayer) skyLayer.style.transform = `translateY(${scrolled * 0.1}px)`;
        if (castleLayer) castleLayer.style.transform = `translateY(${scrolled * 0.3}px)`;
        if (fogLayer) fogLayer.style.transform = `translateY(${scrolled * 0.5}px) translateX(${-scrolled * 0.1}px)`;
    }
}

// ==========================================
// SCENE 3: PATRONUS REVEAL
// ==========================================
function initPatronusScene() {
    // Create patronus particles
    const patronusContainer = document.getElementById('patronus-particles');
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'p-particle';
        
        // Random spiral positions
        const angle = Math.random() * Math.PI * 2;
        const radius = 100 + Math.random() * 200;
        const tx = Math.cos(angle) * radius;
        const ty = Math.sin(angle) * radius;
        
        particle.style.setProperty('--tx', tx + 'px');
        particle.style.setProperty('--ty', ty + 'px');
        particle.style.left = '50%';
        particle.style.top = '50%';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.animationDuration = (3 + Math.random() * 2) + 's';
        
        patronusContainer.appendChild(particle);
    }
}

function updatePatronusScene() {
    const scrolled = window.pageYOffset;
    const patronusScene = document.getElementById('scene-patronus');
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    // Activate patronus when scrolled past 70% of page
    const activationPoint = documentHeight * 0.5;
    
    if (scrolled > activationPoint) {
        patronusScene.classList.add('active');
    } else {
        patronusScene.classList.remove('active');
    }
}

// ==========================================
// TYPEWRITER EFFECT
// ==========================================
function initTypewriter() {
    const typewriterElement = document.getElementById('typewriter');
    if (!typewriterElement) return;
    
    const texts = [
        'Python Wizardry ✨',
        'Django Architect 🏗️',
        'VLSI Designer ⚡',
        'MySQL Master 🗄️'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let currentText = '';
    
    function type() {
        const fullText = texts[textIndex];
        
        if (isDeleting) {
            currentText = fullText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            currentText = fullText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        typewriterElement.innerHTML = currentText + '<span class="cursor">|</span>';
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === fullText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    // Start typewriter after a short delay
    setTimeout(type, 2000);
}

// ==========================================
// SCROLL ANIMATIONS FOR SECTIONS
// ==========================================
function initScrollAnimations() {
    const sections = document.querySelectorAll('.glass-section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// ==========================================
// FORM SUBMISSION
// ==========================================
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Create magical effect
        const btn = form.querySelector('button');
        btn.innerHTML = '✨ Message Sent! ✨';
        btn.style.background = 'var(--magic-gold)';
        btn.style.color = 'var(--bg-dark)';
        
        // Reset after 3 seconds
        setTimeout(() => {
            form.reset();
            btn.innerHTML = 'Cast Message ✨';
            btn.style.background = 'transparent';
            btn.style.color = 'var(--magic-gold)';
        }, 3000);
        
        console.log('Form submitted:', { name, email, message });
    });
}

// ==========================================
// SMOOTH SCROLL FOR NAVIGATION
// ==========================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ==========================================
// SCROLL EVENT HANDLER
// ==========================================
let ticking = false;

function onScroll() {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateParallax();
            updatePatronusScene();
            ticking = false;
        });
        ticking = true;
    }
}

// ==========================================
// INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🪄 Initializing Wizarding Portfolio...');
    
    // Initialize all scenes
    initHogwartsScene();
    initPatronusScene();
    
    // Initialize interactions
    initTypewriter();
    initScrollAnimations();
    initContactForm();
    initSmoothScroll();
    
    // Add scroll listener
    window.addEventListener('scroll', onScroll, { passive: true });
    
    console.log('✨ Portfolio ready! Mischief Managed.');
});

// ==========================================
// RESIZE HANDLER (OPTIONAL)
// ==========================================
window.addEventListener('resize', () => {
    // Recalculate parallax positions on resize
    updateParallax();
    updatePatronusScene();
});


         
