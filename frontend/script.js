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
    }

    bindEvents() {
        const form = document.getElementById('generateForm');
        const deployBtn = document.getElementById('deployBtn');

        form.addEventListener('submit', (e) => this.handleGenerate(e));
        deployBtn.addEventListener('click', () => this.handleDeploy());

        // Add input animations and interactions
        this.setupInputInteractions();
    }

    setupInputInteractions() {
        const inputs = document.querySelectorAll('.form-input, .form-textarea, .form-select');
        
        inputs.forEach(input => {
            input.addEventListener('focus', (e) => this.animateInputFocus(e.target));
            input.addEventListener('blur', (e) => this.animateInputBlur(e.target));
            
            // Add floating label effect
            input.addEventListener('input', (e) => this.handleInputChange(e.target));
        });

        // Add hover effects to buttons
        const buttons = document.querySelectorAll('.nav-btn, .generate-button, .action-button');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', (e) => this.animateButtonHover(e.target, true));
            button.addEventListener('mouseleave', (e) => this.animateButtonHover(e.target, false));
        });
    }

    setupCharacterCounter() {
        const textarea = document.getElementById('businessDescription');
        const counter = document.getElementById('charCount');
        
        textarea.addEventListener('input', () => {
            const count = textarea.value.length;
            counter.textContent = count;
            
            // Change color based on character count
            if (count > 800) {
                counter.style.color = '#ef4444';
            } else if (count > 600) {
                counter.style.color = '#f59e0b';
            } else {
                counter.style.color = '#71717a';
            }
        });
    }

    initAnimations() {
        // Animate elements on page load
        this.animatePageLoad();
        
        // Setup scroll animations
        this.setupScrollAnimations();
        
        // Animate floating orbs
        this.animateFloatingOrbs();
    }

    animatePageLoad() {
        // Animate navigation
        anime({
            targets: '.nav-content',
            translateY: [-50, 0],
            opacity: [0, 1],
            duration: 800,
            easing: 'easeOutExpo'
        });

        // Animate hero content
        anime({
            targets: '.hero-badge',
            scale: [0.8, 1],
            opacity: [0, 1],
            duration: 600,
            delay: 200,
            easing: 'easeOutBack'
        });

        anime({
            targets: '.hero-title',
            translateY: [50, 0],
            opacity: [0, 1],
            duration: 800,
            delay: 400,
            easing: 'easeOutExpo'
        });

        anime({
            targets: '.hero-subtitle',
            translateY: [30, 0],
            opacity: [0, 1],
            duration: 600,
            delay: 600,
            easing: 'easeOutExpo'
        });

        anime({
            targets: '.stat-item',
            scale: [0.8, 1],
            opacity: [0, 1],
            duration: 500,
            delay: anime.stagger(100, {start: 800}),
            easing: 'easeOutBack'
        });
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateOnScroll(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements
        document.querySelectorAll('.generator-card, .feature-card, .section-header').forEach(el => {
            observer.observe(el);
        });
    }

    animateOnScroll(element) {
        if (element.classList.contains('generator-card')) {
            anime({
                targets: element,
                translateY: [50, 0],
                opacity: [0, 1],
                duration: 800,
                easing: 'easeOutExpo'
            });

            // Animate form elements
            anime({
                targets: element.querySelectorAll('.input-group'),
                translateY: [30, 0],
                opacity: [0, 1],
                duration: 600,
                delay: anime.stagger(100),
                easing: 'easeOutExpo'
            });
        }

        if (element.classList.contains('feature-card')) {
            anime({
                targets: element,
                translateY: [50, 0],
                scale: [0.9, 1],
                opacity: [0, 1],
                duration: 600,
                easing: 'easeOutBack'
            });
        }

        if (element.classList.contains('section-header')) {
            anime({
                targets: element.querySelector('.section-title'),
                translateY: [30, 0],
                opacity: [0, 1],
                duration: 600,
                easing: 'easeOutExpo'
            });

            anime({
                targets: element.querySelector('.section-subtitle'),
                translateY: [20, 0],
                opacity: [0, 1],
                duration: 500,
                delay: 200,
                easing: 'easeOutExpo'
            });
        }
    }

    animateFloatingOrbs() {
        const orbs = document.querySelectorAll('.gradient-orb');
        
        orbs.forEach((orb, index) => {
            anime({
                targets: orb,
                translateY: [
                    {value: -30, duration: 3000},
                    {value: 30, duration: 3000},
                    {value: 0, duration: 3000}
                ],
                translateX: [
                    {value: 20, duration: 4000},
                    {value: -20, duration: 4000},
                    {value: 0, duration: 2000}
                ],
                scale: [
                    {value: 1.1, duration: 2000},
                    {value: 0.9, duration: 2000},
                    {value: 1, duration: 2000}
                ],
                loop: true,
                delay: index * 1000,
                easing: 'easeInOutSine'
            });
        });
    }

    animateInputFocus(input) {
        anime({
            targets: input,
            scale: [1, 1.02],
            duration: 200,
            easing: 'easeOutQuad'
        });
    }

    animateInputBlur(input) {
        anime({
            targets: input,
            scale: [1.02, 1],
            duration: 200,
            easing: 'easeOutQuad'
        });
    }

    animateButtonHover(button, isHover) {
        if (isHover) {
            anime({
                targets: button,
                scale: [1, 1.05],
                duration: 200,
                easing: 'easeOutQuad'
            });
        } else {
            anime({
                targets: button,
                scale: [1.05, 1],
                duration: 200,
                easing: 'easeOutQuad'
            });
        }
    }

    handleInputChange(input) {
        // Add visual feedback for filled inputs
        if (input.value.trim()) {
            input.classList.add('filled');
        } else {
            input.classList.remove('filled');
        }
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
            // Simulate deployment process
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
            await new Promise(resolve => setTimeout(resolve, 500));
            // You could update a progress indicator here
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
                duration: 200,
                complete: () => {
                    content.classList.add('hidden');
                    loadingEl.classList.remove('hidden');
                    anime({
                        targets: loadingEl,
                        opacity: [0, 1],
                        duration: 200
                    });
                }
            });

            btn.disabled = true;
        } else {
            anime({
                targets: loadingEl,
                opacity: [1, 0],
                duration: 200,
                complete: () => {
                    loadingEl.classList.add('hidden');
                    content.classList.remove('hidden');
                    anime({
                        targets: content,
                        opacity: [0, 1],
                        duration: 200
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
                <div class="loading-spinner"></div>
                <span>Deploying...</span>
            `;
            btn.disabled = true;

            anime({
                targets: btn,
                scale: [1, 0.98, 1],
                duration: 1000,
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
            
            // Animate progress
            this.animateProgress();
            
            // Animate loading particles
            this.animateLoadingParticles();
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
            duration: 3000,
            easing: 'easeInOutQuad',
            update: function(anim) {
                const percent = Math.round(anim.progress);
                progressPercent.textContent = `${percent}%`;
            }
        });
    }

    animateLoadingParticles() {
        const particles = document.querySelectorAll('.particle');
        
        particles.forEach((particle, index) => {
            anime({
                targets: particle,
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
                duration: 2000,
                delay: index * 400,
                loop: true,
                easing: 'easeInOutSine'
            });
        });
    }

    async showResults(files, projectName) {
        this.showLoadingModal(false);
        
        const modal = document.getElementById('resultsModal');
        const filesList = document.getElementById('filesList');
        
        // Clear previous results
        filesList.innerHTML = '';
        
        // Populate files list
        Object.keys(files).forEach((filename, index) => {
            const fileItem = this.createFileItem(filename, files[filename], index);
            filesList.appendChild(fileItem);
        });

        // Show preview if index.html exists
        if (files['index.html']) {
            this.showPreview(files['index.html']);
        }

        // Show modal with animation
        modal.classList.add('show');
        
        // Animate file items
        anime({
            targets: '.file-item',
            translateX: [50, 0],
            opacity: [0, 1],
            duration: 500,
            delay: anime.stagger(100),
            easing: 'easeOutExpo'
        });
    }

    createFileItem(filename, content, index) {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.style.opacity = '0';
        
        fileItem.innerHTML = `
            <div class="file-info">
                <div class="file-icon">
                    <i class="fas fa-file-code"></i>
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

    showPreview(htmlContent) {
        const previewFrame = document.getElementById('previewFrame');
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        previewFrame.src = url;

        // Animate preview frame
        anime({
            targets: previewFrame,
            opacity: [0, 1],
            duration: 500,
            easing: 'easeOutQuad'
        });
    }

    showDeploymentSuccess(deploymentUrl) {
        const deploymentResult = document.getElementById('deploymentResult');
        const deploymentLink = document.getElementById('deploymentLink');
        
        deploymentLink.href = deploymentUrl;
        deploymentLink.textContent = deploymentUrl;
        deploymentResult.classList.remove('hidden');
        
        // Animate deployment success
        anime({
            targets: deploymentResult,
            translateY: [-20, 0],
            opacity: [0, 1],
            duration: 500,
            easing: 'easeOutBack'
        });
        
        this.showNotification('Website deployed successfully! 🚀', 'success');
        this.createConfetti();
    }

    createConfetti() {
        const colors = ['#6366f1', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6'];
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

        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: absolute;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                left: ${Math.random() * 100}%;
                top: -10px;
                border-radius: 50%;
            `;
            confettiContainer.appendChild(confetti);

            anime({
                targets: confetti,
                translateY: window.innerHeight + 100,
                translateX: (Math.random() - 0.5) * 200,
                rotate: Math.random() * 360,
                duration: Math.random() * 2000 + 1000,
                easing: 'easeInQuad',
                complete: () => confetti.remove()
            });
        }

        setTimeout(() => confettiContainer.remove(), 3000);
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
                                padding: 20px; 
                                background: #0a0a0f; 
                                color: #fff;
                                margin: 0;
                            }
                            .header {
                                background: linear-gradient(135deg, #667eea, #764ba2);
                                padding: 20px;
                                border-radius: 12px;
                                margin-bottom: 20px;
                            }
                            .header h2 {
                                margin: 0;
                                font-size: 24px;
                            }
                            pre { 
                                background: #1a1a2e !important; 
                                padding: 20px; 
                                border-radius: 12px; 
                                overflow: auto;
                                border: 1px solid rgba(255, 255, 255, 0.1);
                            }
                            code {
                                font-family: 'Fira Code', 'Consolas', monospace;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="header">
                            <h2><i class="fas fa-file-code"></i> ${filename}</h2>
                        </div>
                        <pre><code class="language-${this.getLanguageFromFilename(filename)}">${this.escapeHtml(content)}</code></pre>
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
            top: 20px;
            right: 20px;
            z-index: 10000;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            font-weight: 500;
            max-width: 400px;
            backdrop-filter: blur(10px);
            border: 1px solid;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            ${type === 'error' 
                ? 'background: rgba(239, 68, 68, 0.9); color: white; border-color: #ef4444;' 
                : 'background: rgba(16, 185, 129, 0.9); color: white; border-color: #10b981;'
            }
        `;
        
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <i class="fas fa-${type === 'error' ? 'exclamation-circle' : 'check-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Global functions for modal interactions
function closeResults() {
    document.getElementById('resultsModal').classList.remove('show');
}

function downloadFiles() {
    if (window.app && window.app.generatedFiles) {
        // Create a simple download simulation
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
        
        window.app.showNotification('Files downloaded successfully!', 'success');
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new DeploylyApp();
});

// Add mouse parallax effect
document.addEventListener('mousemove', (e) => {
    const orbs = document.querySelectorAll('.gradient-orb');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 0.3;
        const x = (mouseX - 0.5) * speed * 50;
        const y = (mouseY - 0.5) * speed * 50;
        
        orb.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Add scroll-based animations for grid pattern
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const gridPattern = document.querySelector('.grid-pattern');
    
    if (gridPattern) {
        const speed = scrolled * 0.1;
        gridPattern.style.transform = `translate(${speed}px, ${speed}px)`;
    }
});