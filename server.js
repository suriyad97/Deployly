import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontend')));

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Deployly API is running' });
});

app.post('/api/generate-files', async (req, res) => {
  try {
    const { businessDescription } = req.body;
    
    // Mock response with placeholder files
    const files = {
      'index.html': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated Website</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <h1>Welcome to Your Generated Website</h1>
    </header>
    <main>
        <p>Business Description: ${businessDescription || 'No description provided'}</p>
        <p>This is a placeholder website generated based on your business description.</p>
    </main>
    <script src="script.js"></script>
</body>
</html>`,
      'styles.css': `body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 20px;
    background-color: #f4f4f4;
}

header {
    background-color: #333;
    color: white;
    padding: 1rem;
    text-align: center;
}

main {
    max-width: 800px;
    margin: 2rem auto;
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}`,
      'script.js': `console.log('Generated website loaded successfully!');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded');
});`
    };
    
    res.json({ 
      success: true, 
      files: files,
      message: 'Files generated successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

app.post('/api/deploy', async (req, res) => {
  try {
    const { projectData } = req.body;
    
    // Placeholder for deployment logic
    res.json({ 
      success: true, 
      message: 'Deployment initiated',
      deploymentId: `deploy_${Date.now()}`
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Serve frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Deployly server running on http://0.0.0.0:${PORT}`);
});