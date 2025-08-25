document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offset = 80;
                const targetPosition = targetElement.offsetTop - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add navbar background on scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        });
    }

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe app cards
    const appCards = document.querySelectorAll('.app-card');
    appCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Observe feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Observe screenshots
    const screenshots = document.querySelectorAll('.screenshot');
    screenshots.forEach((screenshot, index) => {
        screenshot.style.opacity = '0';
        screenshot.style.transform = 'translateY(20px)';
        screenshot.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(screenshot);
    });

    // Mobile menu functionality
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileNavMenu = document.getElementById('mobileNavMenu');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    
    function toggleMobileMenu() {
        if (!mobileNavMenu) return;
        
        const isActive = mobileNavMenu.classList.contains('active');
        
        if (isActive) {
            // Close menu
            mobileNavMenu.classList.remove('active');
            if (mobileMenuOverlay) mobileMenuOverlay.classList.remove('active');
            if (mobileMenuToggle) mobileMenuToggle.classList.remove('active');
            document.body.style.overflow = '';
        } else {
            // Open menu
            mobileNavMenu.classList.add('active');
            if (mobileMenuOverlay) mobileMenuOverlay.classList.add('active');
            if (mobileMenuToggle) mobileMenuToggle.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            toggleMobileMenu();
        });
    }
    
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', toggleMobileMenu);
    }
    
    // Close mobile menu when clicking on a link
    const mobileMenuLinks = document.querySelectorAll('.mobile-nav-menu a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggleMobileMenu();
        });
    });
    
    // Close mobile menu on window resize if screen gets larger
    window.addEventListener('resize', () => {
        if (window.innerWidth > 668) {
            if (mobileNavMenu) mobileNavMenu.classList.remove('active');
            if (mobileMenuOverlay) mobileMenuOverlay.classList.remove('active');
            if (mobileMenuToggle) mobileMenuToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Parallax effect for hero sections
    const heroSections = document.querySelectorAll('.hero, .app-hero');
    if (heroSections.length > 0) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            heroSections.forEach(hero => {
                const rate = scrolled * -0.5;
                if (hero.getBoundingClientRect().bottom > 0) {
                    hero.style.transform = `translateY(${rate}px)`;
                }
            });
        });
    }

    // Image lazy loading enhancement
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.loading = 'lazy';
    });

    // Add hover effect to buttons
    const buttons = document.querySelectorAll('.cta-button, .btn-primary, .btn-secondary, .download-button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add ripple effect to buttons (optional enhancement)
    function createRipple(event) {
        const button = event.currentTarget;
        const ripple = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        ripple.style.width = ripple.style.height = `${diameter}px`;
        ripple.style.left = `${event.clientX - button.offsetLeft - radius}px`;
        ripple.style.top = `${event.clientY - button.offsetTop - radius}px`;
        ripple.classList.add('ripple');

        const existingRipple = button.querySelector('.ripple');
        if (existingRipple) {
            existingRipple.remove();
        }

        button.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    }

    // Add ripple CSS dynamically
    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 600ms linear;
            background-color: rgba(255, 255, 255, 0.3);
            pointer-events: none;
        }
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        button, .cta-button, .btn-primary, .btn-secondary, .download-button {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);

    // Apply ripple effect to buttons
    buttons.forEach(button => {
        button.addEventListener('click', createRipple);
    });

    // Performance optimization: Debounce scroll events
    let scrollTimeout;
    function handleScroll() {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(function() {
            // Scroll-related actions are already handled above
        });
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initialize video elements with fallback to slideshow
    const videos = document.querySelectorAll('.app-video');
    const appSlideshow = document.getElementById('appSlideshow');
    
    videos.forEach(video => {
        if (video.tagName === 'VIDEO') {
            video.setAttribute('playsinline', '');
            video.setAttribute('muted', '');
            video.setAttribute('loop', '');
            
            // Handle video load success
            video.addEventListener('loadeddata', () => {
                video.style.display = 'block';
                if (appSlideshow) {
                    appSlideshow.style.display = 'none';
                }
            });
            
            // Handle video load errors
            video.addEventListener('error', (e) => {
                video.style.display = 'none';
                if (appSlideshow) {
                    appSlideshow.style.display = 'block';
                }
            });
            
            // Try to play video after a short delay
            setTimeout(() => {
                video.play().catch(e => {
                    video.style.display = 'none';
                    if (appSlideshow) {
                        appSlideshow.style.display = 'block';
                    }
                });
            }, 100);
        }
    });

    // Slideshow functionality for iPhone mockup
    const slideshow = document.getElementById('appSlideshow');
    if (slideshow) {
        const slides = slideshow.querySelectorAll('.slide');
        const indicators = slideshow.querySelectorAll('.indicator');
        let currentSlide = 0;
        let slideInterval;

        function updateSlide() {
            // Update slides
            slides.forEach((slide, index) => {
                slide.classList.toggle('active', index === currentSlide);
            });
            // Update indicators
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentSlide);
            });
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            updateSlide();
        }

        function goToSlide(index) {
            currentSlide = index;
            updateSlide();
        }

        function startSlideshow() {
            slideInterval = setInterval(nextSlide, 2500); // Change every 2.5 seconds
        }

        function stopSlideshow() {
            clearInterval(slideInterval);
        }

        // Start the slideshow
        startSlideshow();

        // Pause on hover and resume when not hovering
        slideshow.addEventListener('mouseenter', stopSlideshow);
        slideshow.addEventListener('mouseleave', startSlideshow);

        // Add click functionality for manual control
        slideshow.addEventListener('click', (e) => {
            // If clicking on an indicator, go to that slide
            if (e.target.classList.contains('indicator')) {
                const indicatorIndex = Array.from(indicators).indexOf(e.target);
                goToSlide(indicatorIndex);
                stopSlideshow();
                setTimeout(startSlideshow, 3000); // Resume after 3 seconds
            } else {
                // Otherwise, go to next slide
                nextSlide();
                stopSlideshow();
                setTimeout(startSlideshow, 3000); // Resume after 3 seconds
            }
        });
    }
});