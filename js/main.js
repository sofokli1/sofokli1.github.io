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
    
    // Load legal content directly from embedded JavaScript
    function loadLegalContent(type, appName) {
        // Always use the embedded content since HTML files have been removed
        return generateFallbackContent(type, appName);
    }
    
    // Generate legal content for privacy policy and terms of service
    function generateFallbackContent(type, appName) {
        const appDisplayName = appName === 'interval-timer' ? 'Interval Timer ▸ HIIT & Tabata' : 'Smoothly';
        
        if (type === 'privacy') {
            if (appName === 'smoothly') {
                return `
                    <p class="effective-date">Last updated: September 15, 2025</p>
                    <h2>Introduction</h2>
                    <p>Welcome to Smoothly, an iOS app that generates personalized smoothie recipes using AI and computer vision. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application.</p>
                    <p>By using Smoothly, you agree to the collection and use of information in accordance with this policy. If you do not agree with our practices, please do not use our app.</p>

                    <h2>Information We Collect</h2>
                    <h3>Camera and Image Data</h3>
                    <ul>
                        <li><strong>Purpose:</strong> We use your device's camera to identify fruits and vegetables for smoothie recipe generation</li>
                        <li><strong>Processing:</strong> Images are processed locally on your device using Apple's Vision framework and Core ML models</li>
                        <li><strong>Storage:</strong> Camera images are not stored, cached, or transmitted to our servers or any third parties</li>
                        <li><strong>Permission:</strong> Camera access is optional - you can generate recipes without using the camera by manually selecting ingredients</li>
                        <li><strong>Control:</strong> You can revoke camera permissions at any time in iOS Settings > Privacy & Security > Camera > Smoothly</li>
                    </ul>

                    <h3>Recipe and Usage Data</h3>
                    <ul>
                        <li><strong>Recipe Information:</strong> Ingredients selected, generated recipes, recipe preferences, and nutritional information</li>
                        <li><strong>Usage Tracking:</strong> Weekly recipe generation count (stored locally for free tier limits)</li>
                        <li><strong>App Settings:</strong> Theme preferences, subscription status, and user preferences</li>
                        <li><strong>Storage:</strong> All data is stored locally on your device using SwiftData - no cloud backup, sync, or server storage</li>
                    </ul>

                    <h3>Analytics Data</h3>
                    <ul>
                        <li><strong>Status:</strong> All analytics collection is completely disabled via Firebase configuration</li>
                        <li><strong>No Tracking:</strong> We do not collect any usage statistics, behavioral data, performance metrics, or user identifiers</li>
                        <li><strong>Privacy First:</strong> Your app usage remains completely private - all analytics events are only logged locally for debugging</li>
                        <li><strong>Technical Implementation:</strong> <code>FIREBASE_ANALYTICS_COLLECTION_DEACTIVATED</code> is set to <code>true</code> in app configuration</li>
                    </ul>

                    <h3>Subscription Data</h3>
                    <ul>
                        <li><strong>Provider:</strong> RevenueCat handles all subscription processing and payment transactions</li>
                        <li><strong>Data Collected:</strong> Subscription status, purchase history, entitlements, and anonymous customer identifiers</li>
                        <li><strong>Purpose:</strong> Managing premium features, enforcing usage limits for free users, and processing subscription renewals</li>
                        <li><strong>Third-Party Processing:</strong> RevenueCat processes subscription data according to their privacy policy</li>
                    </ul>

                    <h3>Technical Data</h3>
                    <ul>
                        <li><strong>Remote Configuration:</strong> App feature flags and settings (weekly limits, ML confidence thresholds) fetched from Firebase Remote Config</li>
                        <li><strong>No Personal Data:</strong> Remote Config requests contain no personal information or device identifiers</li>
                        <li><strong>Error Logs:</strong> Local error logs for debugging only - not transmitted to servers</li>
                        <li><strong>No Device Tracking:</strong> We do not collect device identifiers, UDID, advertising IDs, or technical specifications</li>
                        <li><strong>Machine Learning:</strong> CoreML models run entirely on-device with no data transmission</li>
                    </ul>

                    <h2>How We Use Your Information</h2>
                    <h3>Core App Functionality (Local Only)</h3>
                    <ul>
                        <li>Process camera images locally using Vision framework and CoreML models (images never leave your device)</li>
                        <li>Generate personalized smoothie recipes using OpenAI's GPT-4o-mini model (only selected ingredients and dietary preferences sent)</li>
                        <li>Store your recipe history, preferences, and usage data locally using SwiftData</li>
                        <li>Manage subscription status and premium features through RevenueCat</li>
                        <li>Enforce weekly usage limits for free users (3 recipes per week, configurable via Remote Config)</li>
                    </ul>

                    <h3>Service Improvement</h3>
                    <ul>
                        <li>No analytics or tracking - we've removed all data collection</li>
                        <li>Remote configuration updates for app settings (no personal data)</li>
                        <li>Recipe generation improvements based on OpenAI's general improvements</li>
                    </ul>

                    <h3>Communication</h3>
                    <ul>
                        <li>Send important updates about the app (if subscribed to notifications)</li>
                        <li>Respond to support requests</li>
                    </ul>

                    <h2>Third-Party Services</h2>
                    <h3>OpenAI</h3>
                    <ul>
                        <li><strong>Purpose:</strong> Generate smoothie recipes based on selected ingredients using GPT-4o-mini model</li>
                        <li><strong>Data Shared:</strong> Only ingredient names and basic dietary preferences (no personal information)</li>
                        <li><strong>Privacy:</strong> No camera images, device identifiers, or personal data are shared with OpenAI</li>
                        <li><strong>API Usage:</strong> Requests are made directly to OpenAI's API with obfuscated API keys for security</li>
                        <li><strong>Policy:</strong> <a href="https://openai.com/privacy/" target="_blank">OpenAI Privacy Policy</a></li>
                    </ul>

                    <h3>Firebase (Google) - Limited Use</h3>
                    <ul>
                        <li><strong>Services:</strong> Remote Config only (Analytics, Firestore, and Authentication have been removed)</li>
                        <li><strong>Data:</strong> No personal data transmitted - app only fetches configuration values (weekly limits, ML thresholds)</li>
                        <li><strong>Purpose:</strong> Dynamic app configuration and feature flags</li>
                        <li><strong>Privacy:</strong> All analytics collection is disabled via <code>FIREBASE_ANALYTICS_COLLECTION_DEACTIVATED</code></li>
                        <li><strong>Policy:</strong> <a href="https://policies.google.com/privacy" target="_blank">Google Privacy Policy</a></li>
                    </ul>

                    <h3>RevenueCat</h3>
                    <ul>
                        <li><strong>Purpose:</strong> Subscription management, payment processing, and premium feature access</li>
                        <li><strong>Data:</strong> Purchase history, subscription status, anonymous customer identifiers, and App Store receipt data</li>
                        <li><strong>Integration:</strong> Manages weekly recipe limits for free users and unlimited access for premium subscribers</li>
                        <li><strong>Policy:</strong> <a href="https://www.revenuecat.com/privacy/" target="_blank">RevenueCat Privacy Policy</a></li>
                    </ul>

                    <h2>Data Storage and Security</h2>
                    <h3>Local Storage</h3>
                    <ul>
                        <li>All user data is stored locally using SwiftData (Apple's secure local database framework)</li>
                        <li>Recipes, preferences, and usage tracking are stored securely on your device with iOS data protection</li>
                        <li>Data is sandboxed and not accessible to other apps</li>
                        <li>All local data is automatically deleted when you uninstall the app</li>
                    </ul>

                    <h3>No Cloud Storage</h3>
                    <ul>
                        <li>The app does not use any cloud storage services</li>
                        <li>No data is backed up to iCloud, Firebase, or any remote servers</li>
                        <li>Your recipe history and preferences remain entirely on your device</li>
                    </ul>

                    <h3>Security Measures</h3>
                    <ul>
                        <li>All network communications use HTTPS encryption with certificate pinning</li>
                        <li>API keys are obfuscated and securely stored using multiple layers of protection</li>
                        <li>Camera processing uses Apple's Vision framework with on-device CoreML models only</li>
                        <li>No sensitive data is logged, cached, or transmitted unnecessarily</li>
                        <li>Timeout protections prevent hanging network requests</li>
                        <li>Input validation ensures only safe ingredients are processed</li>
                    </ul>

                    <h2>Your Privacy Rights</h2>
                    <h3>GDPR Rights (EU Users)</h3>
                    <ul>
                        <li><strong>Access:</strong> Request a copy of your personal data</li>
                        <li><strong>Rectification:</strong> Correct inaccurate personal data</li>
                        <li><strong>Erasure:</strong> Request deletion of your personal data</li>
                        <li><strong>Portability:</strong> Receive your data in a portable format</li>
                        <li><strong>Objection:</strong> Object to processing of your personal data</li>
                        <li><strong>Consent Withdrawal:</strong> Withdraw consent for analytics at any time</li>
                    </ul>

                    <h3>California Privacy Rights (CCPA)</h3>
                    <ul>
                        <li><strong>Right to Know:</strong> What personal information we collect and how it's used</li>
                        <li><strong>Right to Delete:</strong> Request deletion of your personal information</li>
                        <li><strong>Right to Non-Discrimination:</strong> Equal service regardless of privacy choices</li>
                    </ul>

                    <h3>How to Exercise Your Rights</h3>
                    <ul>
                        <li><strong>Local Data:</strong> All data is stored locally - simply delete the app to remove all personal information</li>
                        <li><strong>Email:</strong> Contact us at privacy-smoothly@juxhinbakalli.com for any privacy-related requests</li>
                        <li><strong>Subscription Data:</strong> Contact RevenueCat support for subscription-related data requests</li>
                        <li><strong>No Account Required:</strong> The app doesn't use accounts, so no account deletion process is needed</li>
                    </ul>

                    <h2>Children's Privacy</h2>
                    <p>Smoothly is not intended for children under 13. We do not knowingly collect personal information from children under 13. If we discover that a child under 13 has provided us with personal information, we will delete it immediately.</p>

                    <h2>Data Retention</h2>
                    <h3>Local Data</h3>
                    <ul>
                        <li>Recipe history, preferences, and usage data are stored locally until you delete the app</li>
                        <li>No data is retained on external servers - all information is device-only</li>
                        <li>SwiftData automatically manages local storage and cleanup</li>
                    </ul>

                    <h3>Data Deletion</h3>
                    <ul>
                        <li>Since all data is stored locally, simply deleting the app removes all your personal information</li>
                        <li>For subscription data managed by RevenueCat, contact privacy-smoothly@juxhinbakalli.com</li>
                        <li>Third-party services (OpenAI, RevenueCat) retain data according to their respective policies</li>
                    </ul>

                    <h2>International Data Transfers</h2>
                    <p>Since most data processing occurs locally on your device, international data transfers are minimal:</p>
                    <ul>
                        <li>OpenAI API requests (ingredient lists only) are processed in the United States</li>
                        <li>Firebase Remote Config requests (no personal data) may be processed globally by Google</li>
                        <li>RevenueCat subscription data is processed according to their global infrastructure</li>
                        <li>All camera images and recipe data remain on your device only</li>
                    </ul>

                    <h2>Changes to This Privacy Policy</h2>
                    <p>We may update this Privacy Policy from time to time. Changes will be posted in the app and on our website. Continued use of the app after changes constitutes acceptance of the new policy.</p>
                    <ul>
                        <li><strong>Notification:</strong> In-app notification for material changes</li>
                        <li><strong>Effective Date:</strong> Changes take effect immediately upon posting</li>
                        <li><strong>Version History:</strong> Previous versions available upon request</li>
                    </ul>

                    <h2>Contact Information</h2>
                    <h3>Data Controller</h3>
                    <p>Smoothly App<br>
                    Email: privacy-smoothly@juxhinbakalli.com<br>
                    Support: support-smoothly@juxhinbakalli.com</p>

                    <h3>Data Protection Officer (EU)</h3>
                    <p>For GDPR-related inquiries:<br>
                    Email: dpo-smoothly@juxhinbakalli.com</p>

                    <h3>Mailing Address</h3>
                    <p>Zamknieta 10 lok.1.5, 30-554 Krakow, Poland</p>

                    <h2>Compliance Certifications</h2>
                    <ul>
                        <li><strong>Apple App Store:</strong> Compliant with iOS privacy requirements</li>
                        <li><strong>GDPR:</strong> General Data Protection Regulation compliant</li>
                        <li><strong>CCPA:</strong> California Consumer Privacy Act compliant</li>
                    </ul>

                    <hr style="margin: 3rem 0; border: none; border-top: 1px solid var(--gray-lighter);">
                    <p class="text-center">This privacy policy is designed to be transparent and user-friendly while ensuring full legal compliance. If you have any questions about how your data is handled, please don't hesitate to contact us.</p>
                `;
            } else {
                return `
                    <p class="effective-date">Last updated: October 10, 2023</p>
                    
                    <h2>Privacy Policy for IntervalTimer</h2>
                    <p>Juxhin Bakalli Technologies ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains what information we collect, how we use it, and your rights in relation to it for our application, IntervalTimer ("App").</p>
                    
                    <h2>1. Information We Collect</h2>
                    <p>To provide and improve our service, we collect two types of information, each handled differently:</p>
                    
                    <h3>a) Health & Workout Data (HealthKit Integration)</h3>
                    <p>With your explicit permission, the App integrates with Apple's HealthKit to save your completed workouts. This may include:</p>
                    <ul>
                        <li>Workout duration</li>
                        <li>Active energy burned</li>
                        <li>Heart rate data recorded during the workout</li>
                    </ul>
                    <p>This data is written directly to the Apple Health app on your device and is managed by you. We do not have access to this information, and it is never transmitted to our servers or shared with any third party. Your HealthKit data is protected by Apple's privacy and security measures.</p>
                    
                    <h3>b) Analytics & Usage Data</h3>
                    <p>If you provide consent, we collect anonymized data about how you interact with the App. This helps us understand user behavior, fix bugs, and improve features. This data is non-personal and cannot be used to identify you. It includes:</p>
                    <ul>
                        <li>A pseudonymous, random identifier for your device</li>
                        <li>Device type (e.g., iPhone 15), OS version, and country</li>
                        <li>In-app events, such as starting a workout, changing a setting, or creating a new timer</li>
                    </ul>
                    
                    <h2>2. How We Use Your Information</h2>
                    <ul>
                        <li><strong>Health & Workout Data</strong> is used exclusively to provide the core feature of saving your workouts to the Apple Health app, at your direction.</li>
                        <li><strong>Analytics & Usage Data</strong> is used solely for internal purposes to improve the App's functionality, user experience, and to identify and resolve technical issues.</li>
                    </ul>
                    
                    <h2>3. Data Sharing with Third Parties</h2>
                    <p>We do not sell, rent, or trade your data. We use one third-party service for analytics, provided you have given consent:</p>
                    <p><strong>Firebase Analytics:</strong> A service from Google that helps us analyze app usage. The anonymized data described in section 1(b) is shared with Firebase for this purpose. You can learn more about Google's privacy practices here: <a href="https://policies.google.com/privacy" target="_blank">https://policies.google.com/privacy</a></p>
                    
                    <h2>4. Lawful Basis for Processing (GDPR)</h2>
                    <p>For users in the European Economic Area (EEA), our lawful basis for processing Analytics & Usage Data is your explicit consent. You provide this consent through the pop-up screen when you first launch the App. You can withdraw this consent at any time.</p>
                    <p>The processing of Health & Workout Data is based on your explicit consent provided through the HealthKit permission prompt.</p>
                    
                    <h2>5. Your Privacy Rights & Choices</h2>
                    <p>You have control over your data.</p>
                    <ul>
                        <li><strong>Analytics Consent:</strong> You can grant or withdraw your consent for analytics collection at any time in the App's Settings screen.</li>
                        <li><strong>HealthKit Access:</strong> You can manage the App's permission to read and write HealthKit data at any time in the Apple Health app (Health > Sharing > Apps > IntervalTimer).</li>
                        <li><strong>GDPR Rights:</strong> If you are an EEA resident, you have the right to access, rectify, or erase your data, and to object to or restrict its processing. As we do not store personal data on our servers, these rights primarily apply to the data managed by you within the App and HealthKit. For any inquiries, please contact us.</li>
                    </ul>
                    
                    <h2>6. Data Security</h2>
                    <p>We implement reasonable technical and organizational measures to protect the information we collect. However, no method of electronic storage or transmission is 100% secure.</p>
                    
                    <h2>7. Children's Privacy</h2>
                    <p>The App is not intended for children under the age of 13, and we do not knowingly collect data from them. If you believe your child has provided us with information, please contact us so we can address the situation.</p>
                    
                    <h2>8. Changes to This Privacy Policy</h2>
                    <p>We may update this policy from time to time. Any changes will be posted on this page with an updated date.</p>
                    
                    <h2>Contact Us</h2>
                    <p>If you have any questions or concerns about this Privacy Policy, please contact us at contact@getintervaltimer.com</p>
                    
                    <p>By using the App, you acknowledge that you have read and understood this Privacy Policy.</p>
                    
                    <hr style="margin: 3rem 0; border: none; border-top: 1px solid var(--gray-lighter);">
                    <p class="text-center">© 2023 Juxhin Bakalli Technologies. All rights reserved.<br>Last updated: October 10, 2023</p>
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
                    <p class="effective-date">Last updated: October 10, 2023</p>
                    
                    <h2>Terms of Use</h2>
                    
                    <h2>1. Acceptance of Terms</h2>
                    <p>By downloading, installing, or using the Interval Timer app ("the App"), you agree to be bound by these Terms of Use. If you do not agree to these terms, do not use the App.</p>
                    
                    <h2>2. Description of Service</h2>
                    <p>Interval Timer is a multi-platform application designed to help users create and manage custom interval timers for workouts, training sessions, and other timed activities. The App is available on iOS, watchOS, and tvOS platforms.</p>
                    
                    <h2>3. User Responsibilities</h2>
                    <p>You agree to:</p>
                    <ul>
                        <li>Use the App only for lawful purposes and in accordance with these Terms</li>
                        <li>Not use the App in any way that could damage, disable, or impair the App</li>
                        <li>Provide accurate information when required</li>
                        <li>Be responsible for maintaining the confidentiality of your device and any associated accounts</li>
                    </ul>
                    
                    <h2>4. Health and Fitness Disclaimer</h2>
                    <p>The App is intended for general fitness and timing purposes only. You acknowledge that:</p>
                    <ul>
                        <li>The App is not a substitute for professional medical advice, diagnosis, or treatment</li>
                        <li>You should consult with a healthcare professional before beginning any exercise program</li>
                        <li>You use the App at your own risk and assume full responsibility for any injuries that may occur</li>
                        <li>We are not responsible for any health problems that may result from training programs or activities you undertake based on the App</li>
                    </ul>
                    
                    <h2>5. HealthKit Integration</h2>
                    <p>If you choose to enable HealthKit integration:</p>
                    <ul>
                        <li>The App may read and write workout data to Apple Health</li>
                        <li>This data remains on your device and under your control</li>
                        <li>You can revoke HealthKit permissions at any time through your device settings</li>
                    </ul>
                    
                    <h2>6. Privacy and Data Collection</h2>
                    <p>Your privacy is important to us. Our data practices include:</p>
                    <ul>
                        <li>Analytics data collection (with your consent, in compliance with GDPR where applicable)</li>
                        <li>No personal information is collected without your explicit consent</li>
                        <li>All data collection practices are outlined in our Privacy Policy</li>
                        <li>You may opt-out of analytics at any time through the App settings</li>
                    </ul>
                    
                    <h2>7. Intellectual Property</h2>
                    <p>The App and its original content, features, and functionality are owned by the developer and are protected by international copyright, trademark, and other intellectual property laws.</p>
                    
                    <h2>8. User-Generated Content</h2>
                    <p>If you create custom timers or workouts:</p>
                    <ul>
                        <li>You retain ownership of your created content</li>
                        <li>The content is stored locally on your device</li>
                        <li>We do not have access to or claim ownership of your custom timers</li>
                    </ul>
                    
                    <h2>9. Prohibited Uses</h2>
                    <p>You may not:</p>
                    <ul>
                        <li>Modify, reverse engineer, or attempt to extract the source code of the App</li>
                        <li>Use the App for any commercial purposes without permission</li>
                        <li>Transmit any viruses, malware, or malicious code through the App</li>
                        <li>Violate any applicable laws or regulations while using the App</li>
                    </ul>
                    
                    <h2>10. Disclaimers and Limitations of Liability</h2>
                    <p>THE APP IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.</p>
                    <p>To the fullest extent permitted by law:</p>
                    <ul>
                        <li>We are not liable for any indirect, incidental, special, or consequential damages</li>
                        <li>Our total liability shall not exceed the amount you paid for the App</li>
                        <li>We do not guarantee uninterrupted or error-free operation of the App</li>
                    </ul>
                    
                    <h2>11. Indemnification</h2>
                    <p>You agree to indemnify and hold harmless the developer from any claims, damages, losses, or expenses arising from your use of the App or violation of these Terms.</p>
                    
                    <h2>12. Updates and Modifications</h2>
                    <p>We reserve the right to:</p>
                    <ul>
                        <li>Update or modify these Terms at any time</li>
                        <li>Modify or discontinue the App with or without notice</li>
                        <li>Significant changes will be notified through the App or other appropriate means</li>
                    </ul>
                    
                    <h2>13. Termination</h2>
                    <p>We may terminate or suspend your access to the App immediately, without prior notice, for any breach of these Terms.</p>
                    
                    <h2>14. Governing Law</h2>
                    <p>These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which the developer resides, without regard to its conflict of law provisions.</p>
                    
                    <h2>15. Severability</h2>
                    <p>If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary so that these Terms will otherwise remain in full force and effect.</p>
                    
                    <h2>16. Contact Information</h2>
                    <p>For questions about these Terms of Use, please contact us through the App Store support page or the feedback option within the App.</p>
                    
                    <h2>17. Entire Agreement</h2>
                    <p>These Terms constitute the entire agreement between you and the developer regarding the use of the App and supersede all prior agreements and understandings.</p>
                    
                    <p>By using the Interval Timer app, you acknowledge that you have read, understood, and agree to be bound by these Terms of Use.</p>
                    
                    <hr style="margin: 3rem 0; border: none; border-top: 1px solid var(--gray-lighter);">
                    <p class="text-center">© 2023 Juxhin Bakalli Technologies. All rights reserved.<br>Last updated: October 10, 2023</p>
                `;
            }
        }
    }
    
    // Open modal with content
    function openLegalModal(type, appName) {
        createLegalModal();
        
        const modalTitle = document.getElementById('modalTitle');
        const modalContent = document.getElementById('modalContent');
        
        // Reset scroll position to top
        modalContent.scrollTop = 0;
        
        // Set title
        modalTitle.textContent = type === 'privacy' ? 'Privacy Policy' : 'Terms of Service';
        
        // Show modal
        legalModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Load and display content directly (no loading spinner needed)
        const content = loadLegalContent(type, appName);
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