class DeploylyApp {
    constructor() {
        this.apiBaseUrl = 'http://localhost:8000/api';
        this.generatedFiles = {};
        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        const form = document.getElementById('generateForm');
        const deployBtn = document.getElementById('deployBtn');

        form.addEventListener('submit', (e) => this.handleGenerate(e));
        deployBtn.addEventListener('click', () => this.handleDeploy());
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

        try {
            const response = await fetch(`${this.apiBaseUrl}/generate-files`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    description: description
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            if (data.success && data.files) {
                this.generatedFiles = data.files;
                this.showResults(data.files, projectName);
            } else {
                throw new Error('Failed to generate files');
            }

        } catch (error) {
            console.error('Generation error:', error);
            this.showError('Failed to generate website. Please try again.');
        } finally {
            this.showLoading(false);
        }
    }

    async handleDeploy() {
        const projectName = document.getElementById('projectName').value;
        
        if (!this.generatedFiles || Object.keys(this.generatedFiles).length === 0) {
            this.showError('No files to deploy. Please generate a website first.');
            return;
        }

        const deployBtn = document.getElementById('deployBtn');
        const originalText = deployBtn.innerHTML;
        deployBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Deploying...';
        deployBtn.disabled = true;

        try {
            const response = await fetch(`${this.apiBaseUrl}/deploy`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    project_name: projectName,
                    files: this.generatedFiles
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            if (data.success && data.deployment_url) {
                this.showDeploymentSuccess(data.deployment_url);
            } else {
                throw new Error('Deployment failed');
            }

        } catch (error) {
            console.error('Deployment error:', error);
            this.showError('Failed to deploy website. Please try again.');
        } finally {
            deployBtn.innerHTML = originalText;
            deployBtn.disabled = false;
        }
    }

    showResults(files, projectName) {
        const resultsSection = document.getElementById('resultsSection');
        const filesList = document.getElementById('filesList');
        
        // Clear previous results
        filesList.innerHTML = '';
        
        // Populate files list
        Object.keys(files).forEach(filename => {
            const fileItem = document.createElement('div');
            fileItem.className = 'flex items-center justify-between p-3 bg-gray-50 rounded-lg';
            fileItem.innerHTML = `
                <div class="flex items-center">
                    <i class="fas fa-file-code text-blue-600 mr-3"></i>
                    <span class="font-medium">${filename}</span>
                </div>
                <button class="text-purple-600 hover:text-purple-800 text-sm" onclick="app.viewFile('${filename}')">
                    View
                </button>
            `;
            filesList.appendChild(fileItem);
        });

        // Show preview if index.html exists
        if (files['index.html']) {
            this.showPreview(files['index.html']);
        }

        resultsSection.classList.remove('hidden');
        resultsSection.scrollIntoView({ behavior: 'smooth' });
    }

    showPreview(htmlContent) {
        const previewFrame = document.getElementById('previewFrame');
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        previewFrame.src = url;
    }

    showDeploymentSuccess(deploymentUrl) {
        const deploymentUrlDiv = document.getElementById('deploymentUrl');
        const deploymentLink = document.getElementById('deploymentLink');
        
        deploymentLink.href = deploymentUrl;
        deploymentLink.textContent = deploymentUrl;
        deploymentUrlDiv.classList.remove('hidden');
        
        this.showSuccess('Website deployed successfully!');
    }

    viewFile(filename) {
        if (this.generatedFiles[filename]) {
            const content = this.generatedFiles[filename];
            const newWindow = window.open('', '_blank');
            newWindow.document.write(`
                <html>
                    <head>
                        <title>${filename}</title>
                        <style>
                            body { font-family: monospace; padding: 20px; background: #f5f5f5; }
                            pre { background: white; padding: 20px; border-radius: 8px; overflow: auto; }
                        </style>
                    </head>
                    <body>
                        <h2>${filename}</h2>
                        <pre>${this.escapeHtml(content)}</pre>
                    </body>
                </html>
            `);
        }
    }

    showLoading(show) {
        const loadingState = document.getElementById('loadingState');
        if (show) {
            loadingState.classList.remove('hidden');
        } else {
            loadingState.classList.add('hidden');
        }
    }

    showError(message) {
        alert(`Error: ${message}`);
    }

    showSuccess(message) {
        alert(`Success: ${message}`);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize the app
const app = new DeploylyApp();