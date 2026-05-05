document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('nav');
    const menuBtn = document.querySelector('.menu-btn');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Hero Slider Logic
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let slideInterval;

    function goToSlide(index) {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        currentSlide = index;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        let next = (currentSlide + 1) % slides.length;
        goToSlide(next);
    }

    if (slides.length > 0) {
        slideInterval = setInterval(nextSlide, 5000); // 5 seconds per slide

        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                clearInterval(slideInterval);
                goToSlide(parseInt(e.target.getAttribute('data-index')));
                slideInterval = setInterval(nextSlide, 5000);
            });
        });
    }

    // Falling leaves on scroll
    let lastLeafSpawn = 0;
    window.addEventListener('scroll', () => {
        const now = Date.now();
        // Spawn a leaf max once every 150ms when scrolling
        if (now - lastLeafSpawn > 150) {
            lastLeafSpawn = now;
            
            // 70% chance to spawn a leaf on scroll tick
            if (Math.random() > 0.3) {
                const leaf = document.createElement('i');
                leaf.className = 'fas fa-leaf falling-leaf';
                
                // Random horizontal position
                leaf.style.left = Math.random() * 100 + 'vw';
                
                // Random animation duration
                const fallDuration = 4 + Math.random() * 3;
                const swayDuration = 2 + Math.random() * 2;
                leaf.style.animation = `fallDown ${fallDuration}s linear forwards, sway ${swayDuration}s ease-in-out infinite alternate`;
                
                // Random size
                const size = 14 + Math.random() * 16;
                leaf.style.fontSize = `${size}px`;
                
                // Random color variations (golden, dark green, lime)
                const colors = ['#f4b41a', '#2e7d32', '#1b5e20', '#cddc39'];
                leaf.style.color = colors[Math.floor(Math.random() * colors.length)];
                
                document.body.appendChild(leaf);
                
                // Clean up leaf after it finishes falling
                setTimeout(() => {
                    leaf.remove();
                }, fallDuration * 1000);
            }
        }
    });

    // Advanced Intersection Observer for Scroll Reveals
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                entry.target.classList.add('active'); // fallback for generic reveals
                
                // If it's a feature grid, animate children with stagger
                if (entry.target.classList.contains('features-grid')) {
                    const cards = entry.target.querySelectorAll('.feature-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('revealed');
                        }, index * 200); // 200ms stagger delay
                    });
                }
            }
        });
    }, revealOptions);

    // Elements to observe
    const elementsToReveal = [
        document.querySelector('.features-grid'),
        document.querySelector('.info-content'),
        document.querySelector('.info-image'),
        document.querySelector('.cta-section'),
        document.querySelector('.section-header')
    ];

    elementsToReveal.forEach(el => {
        if (el) {
            el.classList.add('reveal'); // add base class for transition
            revealObserver.observe(el);
        }
    });

    // Mobile menu placeholder logic
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            alert('Mobile menu navigation coming soon!');
        });
    }

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
