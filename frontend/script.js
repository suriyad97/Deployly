class DeploylyApp {
    constructor() {
        this.apiBaseUrl = 'http://localhost:8000/api';
        this.generatedFiles = {};
        this.init();
    }

    init() {
        this.bindEvents();
        this.initAnimations();
        this.setupCharacterCounter();
        this.setupCounterAnimations();
        this.setupParallaxEffects();
        this.initCustomSelect();
    }

    bindEvents() {
        const form = document.getElementById('generateForm');
        const deployBtn = document.getElementById('deployBtn');

        form.addEventListener('submit', (e) => this.handleGenerate(e));
        deployBtn.addEventListener('click', () => this.handleDeploy());

        // Enhanced input interactions
        this.setupInputInteractions();
        
        // Setup scroll effects
        this.setupScrollEffects();
        
        // Setup mouse effects
        this.setupMouseEffects();
    }

    initCustomSelect() {
        const selectTrigger = document.getElementById('selectTrigger');
        const selectDropdown = document.getElementById('selectDropdown');
        const selectOptions = document.querySelectorAll('.select-option');
        const hiddenSelect = document.getElementById('theme');

        // Toggle dropdown
        selectTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = selectDropdown.classList.contains('show');
            
            if (isOpen) {
                this.closeCustomSelect();
            } else {
                this.openCustomSelect();
            }
        });

        // Handle option selection
        selectOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                e.stopPropagation();
                this.selectOption(option);
            });
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!selectTrigger.contains(e.target) && !selectDropdown.contains(e.target)) {
                this.closeCustomSelect();
            }
        });

        // Close dropdown on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeCustomSelect();
            }
        });
    }

    openCustomSelect() {
        const selectTrigger = document.getElementById('selectTrigger');
        const selectDropdown = document.getElementById('selectDropdown');
        
        selectTrigger.classList.add('active');
        selectDropdown.classList.add('show');
        
        // Animate options
        const options = selectDropdown.querySelectorAll('.select-option');
        anime({
            targets: options,
            translateX: [-20, 0],
            opacity: [0, 1],
            duration: 300,
            delay: anime.stagger(50),
            easing: 'easeOutQuad'
        });
    }

    closeCustomSelect() {
        const selectTrigger = document.getElementById('selectTrigger');
        const selectDropdown = document.getElementById('selectDropdown');
        
        selectTrigger.classList.remove('active');
        selectDropdown.classList.remove('show');
    }

    selectOption(option) {
        const selectTrigger = document.getElementById('selectTrigger');
        const selectText = selectTrigger.querySelector('.select-text');
        const selectIcon = selectTrigger.querySelector('.select-icon i');
        const hiddenSelect = document.getElementById('theme');
        
        // Remove selected class from all options
        document.querySelectorAll('.select-option').forEach(opt => {
            opt.classList.remove('selected');
        });
        
        // Add selected class to clicked option
        option.classList.add('selected');
        
        // Update trigger display
        const optionText = option.querySelector('.option-text').textContent;
        const optionIcon = option.querySelector('.option-icon i').className;
        const optionValue = option.dataset.value;
        
        selectText.textContent = optionText;
        selectIcon.className = optionIcon;
        hiddenSelect.value = optionValue;
        
        // Animate selection
        anime({
            targets: selectTrigger,
            scale: [1, 1.02, 1],
            duration: 300,
            easing: 'easeOutElastic(1, .6)'
        });
        
        // Close dropdown
        this.closeCustomSelect();
        
        // Trigger change event
        hiddenSelect.dispatchEvent(new Event('change'));
    }

    setupInputInteractions() {
        const inputs = document.querySelectorAll('.form-input, .form-textarea');
        
        inputs.forEach(input => {
            input.addEventListener('focus', (e) => this.animateInputFocus(e.target));
            input.addEventListener('blur', (e) => this.animateInputBlur(e.target));
            input.addEventListener('input', (e) => this.handleInputChange(e.target));
        });

        // Enhanced button interactions
        const buttons = document.querySelectorAll('.nav-btn, .generate-button, .action-button, .footer-link');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', (e) => this.animateButtonHover(e.target, true));
            button.addEventListener('mouseleave', (e) => this.animateButtonHover(e.target, false));
            button.addEventListener('click', (e) => this.createRippleEffect(e));
        });

        // Feature card interactions
        const featureCards = document.querySelectorAll('.feature-card');
        featureCards.forEach(card => {
            card.addEventListener('mouseenter', (e) => this.animateFeatureCardHover(e.target, true));
            card.addEventListener('mouseleave', (e) => this.animateFeatureCardHover(e.target, false));
        });
    }

    setupCharacterCounter() {
        const textarea = document.getElementById('businessDescription');
        const counter = document.getElementById('charCount');
        
        textarea.addEventListener('input', () => {
            const count = textarea.value.length;
            counter.textContent = count;
            
            // Animate counter color changes
            anime({
                targets: counter,
                color: count > 800 ? '#ef4444' : count > 600 ? '#f59e0b' : '#71717a',
                scale: [1.2, 1],
                duration: 200,
                easing: 'easeOutQuad'
            });
        });
    }

    setupCounterAnimations() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(number => observer.observe(number));
    }

    animateCounter(element) {
        const target = parseInt(element.dataset.target);
        const isDecimal = element.dataset.target.includes('.');
        
        anime({
            targets: { value: 0 },
            value: target,
            duration: 2000,
            easing: 'easeOutExpo',
            update: function(anim) {
                const value = isDecimal ? anim.animatables[0].target.value.toFixed(1) : Math.round(anim.animatables[0].target.value);
                element.textContent = value;
            }
        });
    }

    setupParallaxEffects() {
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            // Parallax for floating shapes
            const shapes = document.querySelectorAll('.shape, .neural-node');
            shapes.forEach((shape, index) => {
                const speed = (index + 1) * 0.2;
                const x = (mouseX - 0.5) * speed * 30;
                const y = (mouseY - 0.5) * speed * 30;
                
                anime({
                    targets: shape,
                    translateX: x,
                    translateY: y,
                    duration: 1000,
                    easing: 'easeOutQuad'
                });
            });

            // Parallax for orbs
            const orbs = document.querySelectorAll('.gradient-orb');
            orbs.forEach((orb, index) => {
                const speed = (index + 1) * 0.1;
                const x = (mouseX - 0.5) * speed * 50;
                const y = (mouseY - 0.5) * speed * 50;
                
                anime({
                    targets: orb,
                    translateX: x,
                    translateY: y,
                    duration: 1500,
                    easing: 'easeOutQuad'
                });
            });
        });
    }

    setupScrollEffects() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            // Parallax background elements
            const backgroundElements = document.querySelectorAll('.neural-network, .floating-shapes');
            backgroundElements.forEach(element => {
                anime({
                    targets: element,
                    translateY: rate,
                    duration: 0,
                    easing: 'linear'
                });
            });

            // Update navigation background
            const nav = document.querySelector('.nav-container');
            if (scrolled > 100) {
                nav.style.background = 'rgba(10, 10, 15, 0.95)';
                nav.style.backdropFilter = 'blur(30px)';
            } else {
                nav.style.background = 'rgba(10, 10, 15, 0.8)';
                nav.style.backdropFilter = 'blur(20px)';
            }
        });
    }

    setupMouseEffects() {
        // Magnetic effect for buttons
        const magneticElements = document.querySelectorAll('.generate-button, .action-button');
        
        magneticElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                anime({
                    targets: element,
                    translateX: x * 0.1,
                    translateY: y * 0.1,
                    duration: 200,
                    easing: 'easeOutQuad'
                });
            });

            element.addEventListener('mouseleave', () => {
                anime({
                    targets: element,
                    translateX: 0,
                    translateY: 0,
                    duration: 300,
                    easing: 'easeOutElastic(1, .6)'
                });
            });
        });
    }

    initAnimations() {
        this.animatePageLoad();
        this.setupScrollAnimations();
        this.animateFloatingElements();
        this.setupTextAnimations();
    }

    animatePageLoad() {
        // Enhanced navigation animation
        anime.timeline()
            .add({
                targets: '.nav-content',
                translateY: [-100, 0],
                opacity: [0, 1],
                duration: 1000,
                easing: 'easeOutExpo'
            })
            .add({
                targets: '.nav-btn',
                scale: [0.8, 1],
                opacity: [0, 1],
                duration: 600,
                delay: anime.stagger(100),
                easing: 'easeOutBack'
            }, '-=500');

        // Enhanced hero animations
        const heroTimeline = anime.timeline();
        
        heroTimeline
            .add({
                targets: '.hero-badge',
                scale: [0, 1],
                opacity: [0, 1],
                duration: 800,
                easing: 'easeOutBack'
            })
            .add({
                targets: '.word',
                translateY: [100, 0],
                opacity: [0, 1],
                duration: 800,
                delay: anime.stagger(100),
                easing: 'easeOutExpo'
            }, '-=400')
            .add({
                targets: '.subtitle-word',
                translateY: [50, 0],
                opacity: [0, 1],
                duration: 600,
                delay: anime.stagger(50),
                easing: 'easeOutExpo'
            }, '-=200')
            .add({
                targets: '.stat-item',
                scale: [0.8, 1],
                opacity: [0, 1],
                duration: 600,
                delay: anime.stagger(150),
                easing: 'easeOutBack'
            }, '-=300');
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateOnScroll(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements with enhanced animations
        document.querySelectorAll('.generator-card, .feature-card, .section-header').forEach(el => {
            observer.observe(el);
        });
    }

    animateOnScroll(element) {
        if (element.classList.contains('generator-card')) {
            anime.timeline()
                .add({
                    targets: element,
                    translateY: [100, 0],
                    opacity: [0, 1],
                    duration: 1000,
                    easing: 'easeOutExpo'
                })
                .add({
                    targets: element.querySelectorAll('.input-group'),
                    translateY: [50, 0],
                    opacity: [0, 1],
                    duration: 600,
                    delay: anime.stagger(150),
                    easing: 'easeOutExpo'
                }, '-=500')
                .add({
                    targets: element.querySelector('.generate-button'),
                    scale: [0.8, 1],
                    opacity: [0, 1],
                    duration: 600,
                    easing: 'easeOutBack'
                }, '-=200');
        }

        if (element.classList.contains('feature-card')) {
            anime({
                targets: element,
                translateY: [80, 0],
                scale: [0.9, 1],
                opacity: [0, 1],
                duration: 800,
                easing: 'easeOutBack'
            });

            // Animate feature icon
            anime({
                targets: element.querySelector('.feature-icon'),
                scale: [0, 1],
                rotate: [180, 0],
                duration: 1000,
                delay: 200,
                easing: 'easeOutElastic(1, .8)'
            });
        }

        if (element.classList.contains('section-header')) {
            anime.timeline()
                .add({
                    targets: element.querySelector('.section-title'),
                    translateY: [50, 0],
                    opacity: [0, 1],
                    duration: 800,
                    easing: 'easeOutExpo'
                })
                .add({
                    targets: element.querySelector('.section-subtitle'),
                    translateY: [30, 0],
                    opacity: [0, 1],
                    duration: 600,
                    easing: 'easeOutExpo'
                }, '-=400');
        }
    }

    animateFloatingElements() {
        // Enhanced floating animations for neural nodes
        const neuralNodes = document.querySelectorAll('.neural-node');
        neuralNodes.forEach((node, index) => {
            anime({
                targets: node,
                translateY: [
                    { value: -20, duration: 2000 },
                    { value: 20, duration: 2000 },
                    { value: 0, duration: 2000 }
                ],
                translateX: [
                    { value: 15, duration: 3000 },
                    { value: -15, duration: 3000 },
                    { value: 0, duration: 2000 }
                ],
                scale: [
                    { value: 1.2, duration: 1500 },
                    { value: 0.8, duration: 1500 },
                    { value: 1, duration: 1500 }
                ],
                loop: true,
                delay: index * 500,
                easing: 'easeInOutSine'
            });
        });

        // Enhanced orb animations
        const orbs = document.querySelectorAll('.gradient-orb');
        orbs.forEach((orb, index) => {
            anime({
                targets: orb,
                translateY: [
                    { value: -50, duration: 4000 },
                    { value: 50, duration: 4000 },
                    { value: 0, duration: 4000 }
                ],
                translateX: [
                    { value: 30, duration: 5000 },
                    { value: -30, duration: 5000 },
                    { value: 0, duration: 3000 }
                ],
                scale: [
                    { value: 1.1, duration: 3000 },
                    { value: 0.9, duration: 3000 },
                    { value: 1, duration: 3000 }
                ],
                rotate: [
                    { value: 180, duration: 8000 },
                    { value: 360, duration: 8000 }
                ],
                loop: true,
                delay: index * 2000,
                easing: 'easeInOutSine'
            });
        });
    }

    setupTextAnimations() {
        // Animate letters in brand text
        const brandLetters = document.querySelectorAll('.brand-text .letter');
        brandLetters.forEach((letter, index) => {
            letter.addEventListener('mouseenter', () => {
                anime({
                    targets: letter,
                    scale: [1, 1.3, 1],
                    rotate: [0, 360, 0],
                    duration: 600,
                    easing: 'easeOutElastic(1, .6)'
                });
            });
        });

        // Animate title words on hover
        const titleWords = document.querySelectorAll('.hero-title .word');
        titleWords.forEach(word => {
            word.addEventListener('mouseenter', () => {
                anime({
                    targets: word,
                    scale: [1, 1.1, 1],
                    duration: 400,
                    easing: 'easeOutElastic(1, .8)'
                });
            });
        });
    }

    animateInputFocus(input) {
        anime({
            targets: input,
            scale: [1, 1.02],
            duration: 300,
            easing: 'easeOutQuad'
        });

        // Animate label
        const label = input.closest('.input-group').querySelector('.input-label');
        anime({
            targets: label,
            color: '#6366f1',
            duration: 300,
            easing: 'easeOutQuad'
        });
    }

    animateInputBlur(input) {
        anime({
            targets: input,
            scale: [1.02, 1],
            duration: 300,
            easing: 'easeOutQuad'
        });

        // Reset label color
        const label = input.closest('.input-group').querySelector('.input-label');
        anime({
            targets: label,
            color: '#ffffff',
            duration: 300,
            easing: 'easeOutQuad'
        });
    }

    animateButtonHover(button, isHover) {
        if (isHover) {
            anime({
                targets: button,
                scale: [1, 1.05],
                duration: 300,
                easing: 'easeOutQuad'
            });
        } else {
            anime({
                targets: button,
                scale: [1.05, 1],
                duration: 300,
                easing: 'easeOutQuad'
            });
        }
    }

    animateFeatureCardHover(card, isHover) {
        if (isHover) {
            anime({
                targets: card,
                translateY: [0, -15],
                duration: 400,
                easing: 'easeOutQuad'
            });

            // Animate icon
            const icon = card.querySelector('.feature-icon');
            anime({
                targets: icon,
                scale: [1, 1.1],
                rotate: [0, 5],
                duration: 400,
                easing: 'easeOutQuad'
            });
        } else {
            anime({
                targets: card,
                translateY: [-15, 0],
                duration: 400,
                easing: 'easeOutQuad'
            });

            const icon = card.querySelector('.feature-icon');
            anime({
                targets: icon,
                scale: [1.1, 1],
                rotate: [5, 0],
                duration: 400,
                easing: 'easeOutQuad'
            });
        }
    }

    createRippleEffect(e) {
        const button = e.currentTarget;
        const ripple = button.querySelector('.btn-ripple, .button-ripple, .link-ripple');
        
        if (ripple) {
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            anime({
                targets: ripple,
                scale: [0, 1],
                opacity: [1, 0],
                duration: 600,
                easing: 'easeOutQuad'
            });
        }
    }

    handleInputChange(input) {
        if (input.value.trim()) {
            input.classList.add('filled');
        } else {
            input.classList.remove('filled');
        }

        // Add typing animation effect
        anime({
            targets: input,
            borderColor: ['#6366f1', '#4f46e5', '#6366f1'],
            duration: 200,
            easing: 'easeInOutQuad'
        });
    }

    async handleGenerate(e) {
        e.preventDefault();
        
        const description = document.getElementById('businessDescription').value;
        const projectName = document.getElementById('projectName').value;
        const theme = document.getElementById('theme').value;
        
        if (!description.trim()) {
            this.showNotification('Please provide a business description', 'error');
            return;
        }

        if (!projectName.trim()) {
            this.showNotification('Please provide a project name', 'error');
            return;
        }

        this.showLoadingModal(true);
        this.animateGenerateButton(true);

        try {
            const response = await fetch(`${this.apiBaseUrl}/generate-files`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    businessDescription: description,
                    projectName: projectName,
                    theme: theme
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            if (data.success && data.files) {
                this.generatedFiles = data.files;
                await this.showResults(data.files, projectName);
            } else {
                throw new Error('Failed to generate files');
            }

        } catch (error) {
            console.error('Generation error:', error);
            this.showNotification('Failed to generate website. Please try again.', 'error');
        } finally {
            this.showLoadingModal(false);
            this.animateGenerateButton(false);
        }
    }

    async handleDeploy() {
        const projectName = document.getElementById('projectName').value;
        
        if (!this.generatedFiles || Object.keys(this.generatedFiles).length === 0) {
            this.showNotification('No files to deploy. Please generate a website first.', 'error');
            return;
        }

        this.animateDeployButton(true);

        try {
            await this.simulateDeployment();
            
            const mockUrl = `https://${projectName}-${Math.random().toString(36).substr(2, 8)}.vercel.app`;
            this.showDeploymentSuccess(mockUrl);

        } catch (error) {
            console.error('Deployment error:', error);
            this.showNotification('Failed to deploy website. Please try again.', 'error');
        } finally {
            this.animateDeployButton(false);
        }
    }

    async simulateDeployment() {
        const steps = [
            'Preparing files...',
            'Building project...',
            'Optimizing assets...',
            'Deploying to CDN...',
            'Configuring domain...',
            'Finalizing deployment...'
        ];

        for (let i = 0; i < steps.length; i++) {
            await new Promise(resolve => setTimeout(resolve, 800));
        }
    }

    animateGenerateButton(loading) {
        const btn = document.getElementById('generateBtn');
        const content = btn.querySelector('.button-content');
        const loadingEl = btn.querySelector('.button-loading');

        if (loading) {
            anime({
                targets: content,
                opacity: [1, 0],
                scale: [1, 0.8],
                duration: 300,
                easing: 'easeOutQuad',
                complete: () => {
                    content.classList.add('hidden');
                    loadingEl.classList.remove('hidden');
                    anime({
                        targets: loadingEl,
                        opacity: [0, 1],
                        scale: [0.8, 1],
                        duration: 300,
                        easing: 'easeOutQuad'
                    });
                }
            });

            btn.disabled = true;
        } else {
            anime({
                targets: loadingEl,
                opacity: [1, 0],
                scale: [1, 0.8],
                duration: 300,
                easing: 'easeOutQuad',
                complete: () => {
                    loadingEl.classList.add('hidden');
                    content.classList.remove('hidden');
                    anime({
                        targets: content,
                        opacity: [0, 1],
                        scale: [0.8, 1],
                        duration: 300,
                        easing: 'easeOutQuad'
                    });
                }
            });

            btn.disabled = false;
        }
    }

    animateDeployButton(loading) {
        const btn = document.getElementById('deployBtn');
        const originalHTML = btn.innerHTML;

        if (loading) {
            btn.innerHTML = `
                <div class="loading-spinner">
                    <div class="spinner-ring"></div>
                    <div class="spinner-dot"></div>
                </div>
                <span>Deploying...</span>
            `;
            btn.disabled = true;

            anime({
                targets: btn,
                scale: [1, 0.98, 1],
                duration: 1500,
                loop: true,
                easing: 'easeInOutSine'
            });
        } else {
            btn.innerHTML = originalHTML;
            btn.disabled = false;
            anime.remove(btn);
        }
    }

    showLoadingModal(show) {
        const modal = document.getElementById('loadingModal');
        
        if (show) {
            modal.classList.add('show');
            this.animateProgress();
            this.animateLoadingElements();
        } else {
            modal.classList.remove('show');
        }
    }

    animateProgress() {
        const progressFill = document.querySelector('.progress-fill');
        const progressPercent = document.getElementById('progressPercent');
        
        anime({
            targets: progressFill,
            width: ['0%', '100%'],
            duration: 4000,
            easing: 'easeInOutQuad',
            update: function(anim) {
                const percent = Math.round(anim.progress);
                progressPercent.textContent = `${percent}%`;
            }
        });
    }

    animateLoadingElements() {
        // Animate loading orb
        const orb = document.querySelector('.loading-orb .orb-core');
        anime({
            targets: orb,
            scale: [1, 1.2, 1],
            duration: 2000,
            loop: true,
            easing: 'easeInOutSine'
        });

        // Animate particles
        const particles = document.querySelectorAll('.loading-particles .particle');
        particles.forEach((particle, index) => {
            anime({
                targets: particle,
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
                duration: 2000,
                delay: index * 300,
                loop: true,
                easing: 'easeInOutSine'
            });
        });

        // Animate title letters
        const letters = document.querySelectorAll('.loading-title .title-letter');
        letters.forEach((letter, index) => {
            anime({
                targets: letter,
                translateY: [20, 0],
                opacity: [0, 1],
                duration: 500,
                delay: index * 100,
                easing: 'easeOutExpo'
            });
        });
    }

    async showResults(files, projectName) {
        this.showLoadingModal(false);
        
        const modal = document.getElementById('resultsModal');
        const filesList = document.getElementById('filesList');
        
        filesList.innerHTML = '';
        
        // Enhanced file list animation
        Object.keys(files).forEach((filename, index) => {
            const fileItem = this.createFileItem(filename, files[filename], index);
            filesList.appendChild(fileItem);
        });

        if (files['index.html']) {
            this.showPreview(files['index.html']);
        }

        modal.classList.add('show');
        
        // Enhanced file items animation
        anime({
            targets: '.file-item',
            translateX: [100, 0],
            opacity: [0, 1],
            duration: 600,
            delay: anime.stagger(100),
            easing: 'easeOutExpo'
        });

        // Animate modal content
        anime({
            targets: '.results-content > *',
            translateY: [50, 0],
            opacity: [0, 1],
            duration: 800,
            delay: anime.stagger(200),
            easing: 'easeOutExpo'
        });
    }

    createFileItem(filename, content, index) {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.style.opacity = '0';
        
        const fileExtension = filename.split('.').pop();
        const iconClass = this.getFileIcon(fileExtension);
        
        fileItem.innerHTML = `
            <div class="file-info">
                <div class="file-icon">
                    <i class="${iconClass}"></i>
                </div>
                <div>
                    <div class="file-name">${filename}</div>
                    <div class="file-size">${this.formatFileSize(content.length)} characters</div>
                </div>
            </div>
            <button class="view-button" onclick="app.viewFile('${filename}')">
                <i class="fas fa-eye"></i>
            </button>
        `;
        
        return fileItem;
    }

    getFileIcon(extension) {
        const iconMap = {
            'html': 'fab fa-html5',
            'css': 'fab fa-css3-alt',
            'js': 'fab fa-js-square',
            'py': 'fab fa-python',
            'json': 'fas fa-code',
            'sql': 'fas fa-database'
        };
        return iconMap[extension] || 'fas fa-file-code';
    }

    showPreview(htmlContent) {
        const previewFrame = document.getElementById('previewFrame');
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        previewFrame.src = url;

        anime({
            targets: previewFrame,
            opacity: [0, 1],
            duration: 800,
            easing: 'easeOutQuad'
        });
    }

    showDeploymentSuccess(deploymentUrl) {
        const deploymentResult = document.getElementById('deploymentResult');
        const deploymentLink = document.getElementById('deploymentLink');
        
        deploymentLink.href = deploymentUrl;
        deploymentLink.textContent = deploymentUrl;
        deploymentResult.classList.remove('hidden');
        
        anime({
            targets: deploymentResult,
            translateY: [-30, 0],
            opacity: [0, 1],
            scale: [0.8, 1],
            duration: 800,
            easing: 'easeOutBack'
        });
        
        this.showNotification('Website deployed successfully! 🚀', 'success');
        this.createConfetti();
    }

    createConfetti() {
        const colors = ['#6366f1', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6', '#ec4899'];
        const confettiContainer = document.createElement('div');
        confettiContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9999;
        `;
        document.body.appendChild(confettiContainer);

        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            const size = Math.random() * 8 + 4;
            confetti.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                left: ${Math.random() * 100}%;
                top: -20px;
                border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
                transform: rotate(${Math.random() * 360}deg);
            `;
            confettiContainer.appendChild(confetti);

            anime({
                targets: confetti,
                translateY: window.innerHeight + 100,
                translateX: (Math.random() - 0.5) * 300,
                rotate: Math.random() * 720,
                scale: [1, 0],
                duration: Math.random() * 2000 + 2000,
                easing: 'easeInQuad',
                complete: () => confetti.remove()
            });
        }

        setTimeout(() => confettiContainer.remove(), 4000);
    }

    viewFile(filename) {
        if (this.generatedFiles[filename]) {
            const content = this.generatedFiles[filename];
            const newWindow = window.open('', '_blank');
            newWindow.document.write(`
                <html>
                    <head>
                        <title>${filename}</title>
                        <link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css" rel="stylesheet">
                        <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-core.min.js"></script>
                        <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/autoloader/prism-autoloader.min.js"></script>
                        <style>
                            body { 
                                font-family: 'Inter', sans-serif; 
                                padding: 0; 
                                background: #0a0a0f; 
                                color: #fff;
                                margin: 0;
                                line-height: 1.6;
                            }
                            .header {
                                background: linear-gradient(135deg, #667eea, #764ba2);
                                padding: 2rem;
                                margin-bottom: 0;
                                box-shadow: 0 4px 20px rgba(0,0,0,0.3);
                            }
                            .header h2 {
                                margin: 0;
                                font-size: 1.75rem;
                                font-weight: 800;
                                display: flex;
                                align-items: center;
                                gap: 1rem;
                            }
                            .file-info {
                                background: rgba(255,255,255,0.1);
                                padding: 1rem 2rem;
                                font-size: 0.875rem;
                                border-bottom: 1px solid rgba(255,255,255,0.1);
                            }
                            .code-container {
                                padding: 2rem;
                            }
                            pre { 
                                background: #1a1a2e !important; 
                                padding: 2rem; 
                                border-radius: 12px; 
                                overflow: auto;
                                border: 1px solid rgba(255, 255, 255, 0.1);
                                margin: 0;
                                box-shadow: 0 8px 32px rgba(0,0,0,0.3);
                            }
                            code {
                                font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
                                font-size: 0.875rem;
                                line-height: 1.6;
                            }
                            .line-numbers {
                                color: rgba(255,255,255,0.3);
                                user-select: none;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="header">
                            <h2>
                                <i class="${this.getFileIcon(filename.split('.').pop())}"></i>
                                ${filename}
                            </h2>
                        </div>
                        <div class="file-info">
                            <strong>File size:</strong> ${this.formatFileSize(content.length)} characters | 
                            <strong>Type:</strong> ${filename.split('.').pop().toUpperCase()} | 
                            <strong>Lines:</strong> ${content.split('\n').length}
                        </div>
                        <div class="code-container">
                            <pre><code class="language-${this.getLanguageFromFilename(filename)}">${this.escapeHtml(content)}</code></pre>
                        </div>
                    </body>
                </html>
            `);
        }
    }

    getLanguageFromFilename(filename) {
        const ext = filename.split('.').pop().toLowerCase();
        const langMap = {
            'html': 'html',
            'css': 'css',
            'js': 'javascript',
            'py': 'python',
            'json': 'json',
            'sql': 'sql'
        };
        return langMap[ext] || 'markup';
    }

    formatFileSize(bytes) {
        return bytes.toLocaleString();
    }

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 2rem;
            right: 2rem;
            z-index: 10000;
            padding: 1.25rem 2rem;
            border-radius: 16px;
            font-weight: 600;
            max-width: 400px;
            backdrop-filter: blur(20px);
            border: 2px solid;
            transform: translateX(120%);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
            ${type === 'error' 
                ? 'background: rgba(239, 68, 68, 0.95); color: white; border-color: #ef4444;' 
                : 'background: rgba(16, 185, 129, 0.95); color: white; border-color: #10b981;'
            }
        `;
        
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.75rem;">
                <i class="fas fa-${type === 'error' ? 'exclamation-circle' : 'check-circle'}" style="font-size: 1.25rem;"></i>
                <span style="font-size: 1rem;">${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove with animation
        setTimeout(() => {
            notification.style.transform = 'translateX(120%)';
            setTimeout(() => notification.remove(), 400);
        }, 5000);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Global functions for modal interactions
function closeResults() {
    const modal = document.getElementById('resultsModal');
    
    // Animate out
    anime({
        targets: modal.querySelector('.modal-content'),
        scale: [1, 0.9],
        opacity: [1, 0],
        duration: 300,
        easing: 'easeOutQuad',
        complete: () => {
            modal.classList.remove('show');
        }
    });
}

function downloadFiles() {
    if (window.app && window.app.generatedFiles) {
        const files = window.app.generatedFiles;
        const blob = new Blob([JSON.stringify(files, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'generated-website-files.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        window.app.showNotification('Files downloaded successfully! 📁', 'success');
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new DeploylyApp();
    
    // Add some initial sparkle effects
    setTimeout(() => {
        const sparkles = document.querySelectorAll('.sparkle, .icon-particle, .badge-particle');
        sparkles.forEach((sparkle, index) => {
            anime({
                targets: sparkle,
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
                duration: 2000,
                delay: index * 200,
                loop: true,
                easing: 'easeInOutSine'
            });
        });
    }, 1000);
});

// Enhanced mouse parallax effect
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    // Parallax for background elements
    const backgroundElements = document.querySelectorAll('.neural-node, .shape, .particle');
    backgroundElements.forEach((element, index) => {
        const speed = (index % 3 + 1) * 0.1;
        const x = (mouseX - 0.5) * speed * 30;
        const y = (mouseY - 0.5) * speed * 30;
        
        element.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Enhanced scroll-based animations
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.3;
    
    // Parallax for floating elements
    const floatingElements = document.querySelectorAll('.floating-shapes, .aurora-lights');
    floatingElements.forEach(element => {
        element.style.transform = `translateY(${rate}px)`;
    });
    
    // Update scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        const opacity = Math.max(0, 1 - scrolled / 300);
        scrollIndicator.style.opacity = opacity;
    }
});