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