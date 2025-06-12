class DeploylyApp {
    constructor() {
        this.apiBaseUrl = 'http://localhost:8000/api';
        this.generatedFiles = {};
        this.animations = {};
        this.init();
    }

    init() {
        this.bindEvents();
        this.initAnimations();
        this.setupIntersectionObserver();
    }

    bindEvents() {
        const form = document.getElementById('generateForm');
        const deployBtn = document.getElementById('deployBtn');

        form.addEventListener('submit', (e) => this.handleGenerate(e));
        deployBtn.addEventListener('click', () => this.handleDeploy());

        // Add input animations
        const inputs = document.querySelectorAll('.modern-input');
        inputs.forEach(input => {
            input.addEventListener('focus', (e) => this.animateInputFocus(e.target));
            input.addEventListener('blur', (e) => this.animateInputBlur(e.target));
        });
    }

    initAnimations() {
        // Animate navigation on load
        anime({
            targets: '.nav-brand',
            translateX: [-50, 0],
            opacity: [0, 1],
            duration: 800,
            easing: 'easeOutExpo'
        });

        anime({
            targets: '.nav-btn',
            translateX: [50, 0],
            opacity: [0, 1],
            duration: 800,
            delay: anime.stagger(100),
            easing: 'easeOutExpo'
        });

        // Animate hero elements
        anime({
            targets: '.hero-title',
            translateY: [50, 0],
            opacity: [0, 1],
            duration: 1000,
            easing: 'easeOutExpo'
        });

        anime({
            targets: '.hero-subtitle',
            translateY: [30, 0],
            opacity: [0, 1],
            duration: 800,
            delay: 200,
            easing: 'easeOutExpo'
        });

        anime({
            targets: '.feature-badge',
            scale: [0.8, 1],
            opacity: [0, 1],
            duration: 600,
            delay: anime.stagger(100, {start: 400}),
            easing: 'easeOutBack'
        });

        // Animate floating shapes
        this.animateFloatingShapes();
    }

    animateFloatingShapes() {
        const shapes = document.querySelectorAll('.shape');
        
        shapes.forEach((shape, index) => {
            anime({
                targets: shape,
                translateY: [
                    {value: -20, duration: 2000},
                    {value: 20, duration: 2000},
                    {value: 0, duration: 2000}
                ],
                translateX: [
                    {value: 10, duration: 3000},
                    {value: -10, duration: 3000},
                    {value: 0, duration: 2000}
                ],
                rotate: [
                    {value: 180, duration: 4000},
                    {value: 360, duration: 4000}
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

    setupIntersectionObserver() {
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
        document.querySelectorAll('.generator-card, .feature-card').forEach(el => {
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

            // Animate form groups
            anime({
                targets: element.querySelectorAll('.form-group'),
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
                duration: 800,
                easing: 'easeOutBack'
            });
        }
    }

    animateInputFocus(input) {
        anime({
            targets: input,
            scale: [1, 1.02],
            duration: 200,
            easing: 'easeOutQuad'
        });

        // Add glow effect
        input.style.boxShadow = '0 0 0 4px rgba(139, 92, 246, 0.1), 0 10px 25px -5px rgba(139, 92, 246, 0.3)';
    }

    animateInputBlur(input) {
        anime({
            targets: input,
            scale: [1.02, 1],
            duration: 200,
            easing: 'easeOutQuad'
        });

        // Remove glow effect
        input.style.boxShadow = '';
    }

    async handleGenerate(e) {
        e.preventDefault();
        
        const description = document.getElementById('businessDescription').value;
        const projectName = document.getElementById('projectName').value;
        
        if (!description.trim()) {
            this.showError('Please provide a business description');
            return;
        }

        this.showLoading(true);
        this.animateGenerateButton(true);

        try {
            const response = await fetch(`${this.apiBaseUrl}/generate-files`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    businessDescription: description
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
            this.showError('Failed to generate website. Please try again.');
        } finally {
            this.showLoading(false);
            this.animateGenerateButton(false);
        }
    }

    async handleDeploy() {
        const projectName = document.getElementById('projectName').value;
        
        if (!this.generatedFiles || Object.keys(this.generatedFiles).length === 0) {
            this.showError('No files to deploy. Please generate a website first.');
            return;
        }

        this.animateDeployButton(true);

        try {
            // Simulate deployment for now
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            const mockUrl = `https://${projectName}-${Math.random().toString(36).substr(2, 8)}.vercel.app`;
            this.showDeploymentSuccess(mockUrl);

        } catch (error) {
            console.error('Deployment error:', error);
            this.showError('Failed to deploy website. Please try again.');
        } finally {
            this.animateDeployButton(false);
        }
    }

    animateGenerateButton(loading) {
        const btn = document.getElementById('generateBtn');
        const btnText = btn.querySelector('.btn-text');
        const btnLoading = btn.querySelector('.btn-loading');

        if (loading) {
            anime({
                targets: btnText,
                opacity: [1, 0],
                duration: 200,
                complete: () => {
                    btnText.classList.add('hidden');
                    btnLoading.classList.remove('hidden');
                    anime({
                        targets: btnLoading,
                        opacity: [0, 1],
                        duration: 200
                    });
                }
            });

            // Animate button background
            anime({
                targets: btn,
                background: ['linear-gradient(135deg, #8b5cf6, #3b82f6)', 'linear-gradient(135deg, #6366f1, #8b5cf6)'],
                duration: 1000,
                loop: true,
                direction: 'alternate',
                easing: 'easeInOutSine'
            });
        } else {
            anime({
                targets: btnLoading,
                opacity: [1, 0],
                duration: 200,
                complete: () => {
                    btnLoading.classList.add('hidden');
                    btnText.classList.remove('hidden');
                    anime({
                        targets: btnText,
                        opacity: [0, 1],
                        duration: 200
                    });
                }
            });
        }
    }

    animateDeployButton(loading) {
        const btn = document.getElementById('deployBtn');
        const originalText = btn.innerHTML;

        if (loading) {
            btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-3"></i>Deploying...';
            btn.disabled = true;

            anime({
                targets: btn,
                scale: [1, 0.98, 1],
                duration: 1000,
                loop: true,
                easing: 'easeInOutSine'
            });
        } else {
            btn.innerHTML = originalText;
            btn.disabled = false;
            anime.remove(btn);
        }
    }

    showLoading(show) {
        const modal = document.getElementById('loadingModal');
        
        if (show) {
            modal.classList.add('show');
            
            // Animate modal entrance
            anime({
                targets: '.loading-card',
                scale: [0.8, 1],
                opacity: [0, 1],
                duration: 500,
                easing: 'easeOutBack'
            });

            // Animate progress bar
            anime({
                targets: '.progress-fill',
                width: ['0%', '100%'],
                duration: 3000,
                easing: 'easeInOutQuad'
            });
        } else {
            anime({
                targets: '.loading-card',
                scale: [1, 0.8],
                opacity: [1, 0],
                duration: 300,
                easing: 'easeInBack',
                complete: () => {
                    modal.classList.remove('show');
                }
            });
        }
    }

    async showResults(files, projectName) {
        const resultsSection = document.getElementById('resultsSection');
        const filesList = document.getElementById('filesList');
        
        // Clear previous results
        filesList.innerHTML = '';
        
        // Populate files list with animation
        Object.keys(files).forEach((filename, index) => {
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item flex items-center justify-between p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 transition-all duration-300';
            fileItem.innerHTML = `
                <div class="flex items-center">
                    <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                        <i class="fas fa-file-code text-white text-sm"></i>
                    </div>
                    <div>
                        <span class="font-semibold text-gray-800">${filename}</span>
                        <p class="text-sm text-gray-500">${this.getFileSize(files[filename])} characters</p>
                    </div>
                </div>
                <button class="view-btn bg-purple-100 hover:bg-purple-200 text-purple-700 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105" onclick="app.viewFile('${filename}')">
                    <i class="fas fa-eye mr-2"></i>View
                </button>
            `;
            
            // Add with animation delay
            setTimeout(() => {
                filesList.appendChild(fileItem);
                anime({
                    targets: fileItem,
                    translateX: [50, 0],
                    opacity: [0, 1],
                    duration: 500,
                    easing: 'easeOutExpo'
                });
            }, index * 100);
        });

        // Show preview if index.html exists
        if (files['index.html']) {
            this.showPreview(files['index.html']);
        }

        // Animate results section
        resultsSection.classList.add('show');
        
        anime({
            targets: '.preview-card, .action-card, .files-card',
            translateY: [50, 0],
            opacity: [0, 1],
            duration: 800,
            delay: anime.stagger(200),
            easing: 'easeOutExpo'
        });

        // Smooth scroll to results
        resultsSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
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
        const deploymentUrlDiv = document.getElementById('deploymentUrl');
        const deploymentLink = document.getElementById('deploymentLink');
        
        deploymentLink.href = deploymentUrl;
        deploymentLink.textContent = deploymentUrl;
        deploymentUrlDiv.classList.remove('hidden');
        
        // Animate deployment success
        anime({
            targets: deploymentUrlDiv,
            translateY: [-20, 0],
            opacity: [0, 1],
            duration: 500,
            easing: 'easeOutBack'
        });
        
        this.showSuccess('Website deployed successfully!');
        
        // Confetti effect
        this.createConfetti();
    }

    createConfetti() {
        const colors = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'];
        const confettiContainer = document.createElement('div');
        confettiContainer.style.position = 'fixed';
        confettiContainer.style.top = '0';
        confettiContainer.style.left = '0';
        confettiContainer.style.width = '100%';
        confettiContainer.style.height = '100%';
        confettiContainer.style.pointerEvents = 'none';
        confettiContainer.style.zIndex = '9999';
        document.body.appendChild(confettiContainer);

        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'absolute';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.borderRadius = '50%';
            confettiContainer.appendChild(confetti);

            anime({
                targets: confetti,
                translateY: window.innerHeight + 100,
                translateX: (Math.random() - 0.5) * 200,
                rotate: Math.random() * 360,
                duration: Math.random() * 2000 + 1000,
                easing: 'easeInQuad',
                complete: () => {
                    confetti.remove();
                }
            });
        }

        // Remove container after animation
        setTimeout(() => {
            confettiContainer.remove();
        }, 3000);
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
                                background: #1a1a1a; 
                                color: #fff;
                                margin: 0;
                            }
                            .header {
                                background: linear-gradient(135deg, #8b5cf6, #3b82f6);
                                padding: 20px;
                                border-radius: 12px;
                                margin-bottom: 20px;
                            }
                            .header h2 {
                                margin: 0;
                                font-size: 24px;
                            }
                            pre { 
                                background: #2d2d2d !important; 
                                padding: 20px; 
                                border-radius: 12px; 
                                overflow: auto;
                                border: 1px solid #404040;
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

    getFileSize(content) {
        return content.length.toLocaleString();
    }

    showError(message) {
        this.showNotification(message, 'error');
    }

    showSuccess(message) {
        this.showNotification(message, 'success');
    }

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-50 p-4 rounded-2xl shadow-2xl backdrop-blur-sm border max-w-sm ${
            type === 'error' 
                ? 'bg-red-500/90 border-red-400 text-white' 
                : 'bg-green-500/90 border-green-400 text-white'
        }`;
        
        notification.innerHTML = `
            <div class="flex items-center">
                <i class="fas fa-${type === 'error' ? 'exclamation-circle' : 'check-circle'} mr-3"></i>
                <span class="font-medium">${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        anime({
            targets: notification,
            translateX: [300, 0],
            opacity: [0, 1],
            duration: 500,
            easing: 'easeOutBack'
        });
        
        // Auto remove
        setTimeout(() => {
            anime({
                targets: notification,
                translateX: [0, 300],
                opacity: [1, 0],
                duration: 300,
                easing: 'easeInBack',
                complete: () => {
                    notification.remove();
                }
            });
        }, 4000);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new DeploylyApp();
});

// Add some additional interactive effects
document.addEventListener('mousemove', (e) => {
    const shapes = document.querySelectorAll('.shape');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.5;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        
        shape.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Add scroll-based animations
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-bg');
    const speed = scrolled * 0.5;
    
    if (parallax) {
        parallax.style.transform = `translateY(${speed}px)`;
    }
});