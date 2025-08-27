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

    // Parallax effect disabled for better user experience
    // const heroSections = document.querySelectorAll('.hero');
    // if (heroSections.length > 0) {
    //     window.addEventListener('scroll', function() {
    //         const scrolled = window.pageYOffset;
    //         heroSections.forEach(hero => {
    //             const rate = scrolled * -0.5;
    //             if (hero.getBoundingClientRect().bottom > 0) {
    //                 hero.style.transform = `translateY(${rate}px)`;
    //             }
    //         });
    //     });
    // }

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

    // Legal Modal functionality
    let privacyContent = '';
    let termsContent = '';
    let legalModal = null;
    
    // Create modal HTML structure
    function createLegalModal() {
        if (document.getElementById('legalModal')) return;
        
        const modalHTML = `
            <div class="legal-modal" id="legalModal">
                <div class="legal-modal-content">
                    <div class="legal-modal-header">
                        <h2 id="modalTitle">Legal Document</h2>
                        <button class="legal-modal-close" id="modalCloseBtn">×</button>
                    </div>
                    <div class="legal-modal-body" id="modalContent">
                        Loading...
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        legalModal = document.getElementById('legalModal');
        
        // Event listeners for modal
        const closeBtn = document.getElementById('modalCloseBtn');
        closeBtn.addEventListener('click', closeLegalModal);
        
        legalModal.addEventListener('click', (e) => {
            if (e.target === legalModal) {
                closeLegalModal();
            }
        });
        
        // ESC key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && legalModal.classList.contains('active')) {
                closeLegalModal();
            }
        });
    }
    
    // Load legal content from external files
    async function loadLegalContent(type, appName) {
        // Determine the correct path based on current location
        const currentPath = window.location.pathname;
        const isInAppsFolder = currentPath.includes('/apps/');
        const basePath = isInAppsFolder ? '../' : './';
        
        const filename = type === 'privacy' ? 
            `${basePath}privacy/${appName}-privacy.html` : 
            `${basePath}terms/${appName}-terms.html`;
        
        try {
            const response = await fetch(filename);
            if (!response.ok) throw new Error('Failed to load content');
            
            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            // Extract the legal content
            const legalContentDiv = doc.querySelector('.legal-content');
            if (legalContentDiv) {
                return legalContentDiv.innerHTML;
            } else {
                throw new Error('Legal content not found');
            }
        } catch (error) {
            console.error('Error loading legal content:', error);
            return generateFallbackContent(type, appName);
        }
    }
    
    // Generate fallback content when files can't be loaded
    function generateFallbackContent(type, appName) {
        const appDisplayName = appName === 'interval-timer' ? 'Interval Timer ▸ HIIT & Tabata' : 'Smoothly';
        
        if (type === 'privacy') {
            if (appName === 'smoothly') {
                return `
                    <p class="effective-date">Last updated: August 25, 2025</p>
                    <h2>Introduction</h2>
                    <p>Welcome to Smoothly, an iOS app that generates personalized smoothie recipes using AI and computer vision. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application.</p>
                    <p>By using Smoothly, you agree to the collection and use of information in accordance with this policy. If you do not agree with our practices, please do not use our app.</p>
                    
                    <h2>Information We Collect</h2>
                    <h3>Camera and Image Data</h3>
                    <ul>
                        <li><strong>Purpose:</strong> We use your device's camera to identify fruits and vegetables for smoothie recipe generation</li>
                        <li><strong>Processing:</strong> Images are processed locally on your device using Apple's Vision framework</li>
                        <li><strong>Storage:</strong> Camera images are not stored or transmitted to our servers</li>
                        <li><strong>Permission:</strong> We require camera access, which you can revoke in iOS Settings</li>
                    </ul>
                    
                    <h3>Recipe and Usage Data</h3>
                    <ul>
                        <li><strong>Recipe Information:</strong> Ingredients selected, generated recipes, and recipe preferences</li>
                        <li><strong>Usage Patterns:</strong> Number of recipes generated per week (for subscription limit enforcement)</li>
                        <li><strong>Storage:</strong> Data is stored locally on your device and optionally synced to Firebase Cloud if you choose cloud backup</li>
                    </ul>
                    
                    <h3>Analytics Data (Optional)</h3>
                    <ul>
                        <li><strong>GDPR Compliant:</strong> Analytics collection requires your explicit consent</li>
                        <li><strong>Data Collected:</strong> App usage statistics, subscription events, general app performance metrics</li>
                        <li><strong>Provider:</strong> Google Firebase Analytics</li>
                        <li><strong>Opt-out:</strong> You can disable analytics in the app's GDPR consent settings</li>
                    </ul>
                    
                    <h3>Third-Party Services</h3>
                    <ul>
                        <li><strong>OpenAI:</strong> Generate smoothie recipes (ingredients and preferences only, no personal data)</li>
                        <li><strong>Firebase:</strong> Analytics and optional cloud backup</li>
                        <li><strong>RevenueCat:</strong> Subscription management</li>
                    </ul>
                    
                    <h2>How We Use Your Information</h2>
                    <ul>
                        <li>Process camera images locally to identify ingredients</li>
                        <li>Generate personalized smoothie recipes using AI</li>
                        <li>Store your recipe history and preferences</li>
                        <li>Manage subscription status and usage limits</li>
                        <li>Analyze usage patterns to improve app features (with consent)</li>
                    </ul>
                    
                    <h2>Your Privacy Rights</h2>
                    <h3>GDPR Rights (EU Users)</h3>
                    <ul>
                        <li><strong>Access:</strong> Request a copy of your personal data</li>
                        <li><strong>Rectification:</strong> Correct inaccurate personal data</li>
                        <li><strong>Erasure:</strong> Request deletion of your personal data</li>
                        <li><strong>Consent Withdrawal:</strong> Withdraw consent for analytics at any time</li>
                    </ul>
                    
                    <h2>Contact Information</h2>
                    <p>Smoothly App<br>
                    Email: privacy-smoothly@juxhinbakalli.com<br>
                    Support: support-smoothly@juxhinbakalli.com</p>
                    
                    <h2>Children's Privacy</h2>
                    <p>Smoothly is not intended for children under 13. We do not knowingly collect personal information from children under 13.</p>
                    
                    <hr style="margin: 3rem 0; border: none; border-top: 1px solid var(--gray-lighter);">
                    <p class="text-center">© 2023 Juxhin Bakalli Technologies. All rights reserved.<br>Last updated: August 25, 2025</p>
                `;
            } else {
                return `
                    <p class="effective-date">Effective Date: January 1, 2024</p>
                    <h2>Introduction</h2>
                    <p>Juxhin Bakalli Technologies ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how ${appDisplayName} ("the App") collects, uses, and safeguards your information.</p>
                    <h2>Information We Collect</h2>
                    <p>We designed ${appDisplayName} with your privacy in mind. The App operates with minimal data collection:</p>
                    <ul>
                        <li><strong>Usage Data:</strong> We may collect anonymous usage statistics to improve app performance and user experience. This data cannot be used to identify you personally.</li>
                        <li><strong>App Data:</strong> Your settings and preferences are stored locally on your device and are not transmitted to our servers.</li>
                        <li><strong>Crash Reports:</strong> If the app crashes, anonymous crash reports may be sent to help us fix bugs and improve stability.</li>
                    </ul>
                    <h2>Information We Do NOT Collect</h2>
                    <p>We respect your privacy and do not collect:</p>
                    <ul>
                        <li>Personal identification information (name, email, phone number)</li>
                        <li>Location data</li>
                        <li>Data from other apps</li>
                        <li>Contact information</li>
                        <li>Photos or media files</li>
                    </ul>
                    <h2>Contact Us</h2>
                    <p>If you have any questions or concerns about this Privacy Policy, please contact us through the App Store or at our support channels.</p>
                    <hr style="margin: 3rem 0; border: none; border-top: 1px solid var(--gray-lighter);">
                    <p class="text-center">© 2023 Juxhin Bakalli Technologies. All rights reserved.<br>Last updated: January 1, 2024</p>
                `;
            }
        } else {
            if (appName === 'smoothly') {
                return `
                    <p class="effective-date">Last updated: August 25, 2025</p>
                    
                    <h2>Agreement to Terms</h2>
                    <p>By downloading, installing, or using the Smoothly mobile application ("App"), you agree to be bound by these Terms of Use ("Terms"). If you do not agree to these Terms, do not use the App.</p>
                    <p>These Terms constitute a legally binding agreement between you ("User" or "you") and Smoothly ("we," "us," or "our") regarding your use of the App.</p>

                    <h2>Description of Service</h2>
                    <p>Smoothly is an iOS mobile application that:</p>
                    <ul>
                        <li>Uses camera-based computer vision to identify fruits and vegetables</li>
                        <li>Generates personalized smoothie recipes using artificial intelligence</li>
                        <li>Provides recipe storage and management features</li>
                        <li>Offers premium features through subscription plans</li>
                    </ul>

                    <h2>User Account and Subscription</h2>
                    <h3>Free Service</h3>
                    <ul>
                        <li>Limited to 3 smoothie recipes per week</li>
                        <li>Access to basic recipe generation features</li>
                        <li>Local recipe storage</li>
                    </ul>
                    <h3>Premium Subscription</h3>
                    <ul>
                        <li>Unlimited recipe generation</li>
                        <li>Enhanced features and customization options</li>
                        <li>Cloud recipe backup and sync</li>
                        <li>Processed through RevenueCat and Apple's App Store</li>
                    </ul>

                    <h2>AI-Generated Content and Disclaimers</h2>
                    <h3>Health and Safety Disclaimers</h3>
                    <ul>
                        <li><strong>Not Medical Advice</strong>: Smoothly does not provide medical or nutritional advice</li>
                        <li><strong>Allergies</strong>: Always check ingredients for allergens and consult healthcare providers</li>
                        <li><strong>Dietary Restrictions</strong>: Verify recipe compatibility with your dietary needs</li>
                        <li><strong>Individual Results</strong>: Health benefits may vary by individual</li>
                    </ul>

                    <h2>Third-Party Services</h2>
                    <ul>
                        <li><strong>OpenAI</strong>: Recipe generation powered by artificial intelligence</li>
                        <li><strong>RevenueCat</strong>: Subscription management</li>
                        <li><strong>Firebase</strong>: Analytics and cloud storage (optional)</li>
                    </ul>

                    <h2>Disclaimers and Limitation of Liability</h2>
                    <p>THE APP IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.</p>
                    <p>TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL SMOOTHLY BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES.</p>

                    <h2>Contact Information</h2>
                    <p>Customer Support: support-smoothly@juxhinbakalli.com<br>
                    Legal Notices: legal-smoothly@juxhinbakalli.com</p>

                    <h2>Age Requirements</h2>
                    <p>You must be at least 13 years old to use the App. Users under 18 must have parental consent.</p>

                    <hr style="margin: 3rem 0; border: none; border-top: 1px solid var(--gray-lighter);">
                    <p class="text-center">© 2023 Juxhin Bakalli Technologies. All rights reserved.<br>Last updated: August 25, 2025</p>
                `;
            } else {
                return `
                    <p class="effective-date">Effective Date: January 1, 2024</p>
                    <h2>1. Acceptance of Terms</h2>
                    <p>By downloading, installing, or using ${appDisplayName} ("the App"), you agree to be bound by these Terms of Use ("Terms"). If you do not agree to these Terms, please do not use the App.</p>
                    <h2>2. License to Use</h2>
                    <p>We grant you a personal, non-exclusive, non-transferable, revocable license to use the App on your iOS devices in accordance with these Terms. This license is for personal, non-commercial use only.</p>
                    <h2>3. User Responsibilities</h2>
                    <p>You agree to:</p>
                    <ul>
                        <li>Use the App only for lawful purposes and in accordance with these Terms</li>
                        <li>Not reverse engineer, decompile, or disassemble the App</li>
                        <li>Not copy, modify, or create derivative works based on the App</li>
                        <li>Not sell, rent, lease, or sublicense the App</li>
                    </ul>
                    <h2>7. Disclaimers and Limitations of Liability</h2>
                    <p>The App is provided on an "as is" and "as available" basis without warranties of any kind, either express or implied.</p>
                    <h2>Contact Information</h2>
                    <p>For questions about these Terms or the App, please contact us through the App Store or our support channels.</p>
                    <hr style="margin: 3rem 0; border: none; border-top: 1px solid var(--gray-lighter);">
                    <p class="text-center">© 2023 Juxhin Bakalli Technologies. All rights reserved.<br>Last updated: January 1, 2024</p>
                `;
            }
        }
    }
    
    // Open modal with content
    async function openLegalModal(type, appName) {
        createLegalModal();
        
        const modalTitle = document.getElementById('modalTitle');
        const modalContent = document.getElementById('modalContent');
        
        // Reset scroll position to top
        modalContent.scrollTop = 0;
        
        // Set title and show loading
        modalTitle.textContent = type === 'privacy' ? 'Privacy Policy' : 'Terms of Service';
        modalContent.innerHTML = '<div style="text-align: center; padding: 2rem;"><div style="display: inline-block; width: 20px; height: 20px; border: 2px solid #007AFF; border-radius: 50%; border-top: 2px solid transparent; animation: spin 1s linear infinite;"></div><p style="margin-top: 1rem;">Loading...</p></div>';
        
        // Show modal
        legalModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Load and display content
        const content = await loadLegalContent(type, appName);
        modalContent.innerHTML = content;
        
        // Reset scroll position to top after content is loaded
        modalContent.scrollTop = 0;
        
        // Update URL without page reload
        const newUrl = `${window.location.pathname}#${type}`;
        history.pushState({type, appName}, '', newUrl);
    }
    
    // Close modal
    function closeLegalModal() {
        if (!legalModal) return;
        
        legalModal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Update URL to remove hash
        const url = new URL(window.location);
        url.hash = '';
        history.pushState({}, '', url);
    }
    
    // Handle privacy and terms links
    function setupLegalLinks() {
        // Determine current app name from page
        const currentApp = determineCurrentApp();
        
        // Handle privacy links
        const privacyLinks = document.querySelectorAll('a[href*="privacy"]');
        privacyLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                openLegalModal('privacy', currentApp);
            });
        });
        
        // Handle terms links  
        const termsLinks = document.querySelectorAll('a[href*="terms"]');
        termsLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                openLegalModal('terms', currentApp);
            });
        });
    }
    
    // Determine current app from URL or page content
    function determineCurrentApp() {
        const path = window.location.pathname;
        if (path.includes('interval-timer')) return 'interval-timer';
        if (path.includes('smoothly')) return 'smoothly';
        
        // Default fallback
        return 'interval-timer';
    }
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', (e) => {
        if (e.state && (e.state.type === 'privacy' || e.state.type === 'terms')) {
            openLegalModal(e.state.type, e.state.appName);
        } else {
            closeLegalModal();
        }
    });
    
    // Check URL on page load for direct links
    function checkUrlForLegalModal() {
        const hash = window.location.hash.substring(1);
        if (hash === 'privacy' || hash === 'terms') {
            const currentApp = determineCurrentApp();
            openLegalModal(hash, currentApp);
        }
    }
    
    // Initialize legal modal functionality
    setupLegalLinks();
    checkUrlForLegalModal();
    
    // Add spinner CSS
    const spinnerStyle = document.createElement('style');
    spinnerStyle.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(spinnerStyle);
});