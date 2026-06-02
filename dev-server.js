/**
 * Local Development Server
 * Serves frontend files + proxies API requests to backend
 * Usage: npm run dev
 */

const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Enable CORS
app.use(cors());

// Serve static files from frontend directory
app.use(express.static(path.join(__dirname, 'frontend')));

// Serve HTML pages with caching disabled
app.get('*.html', (req, res) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.sendFile(path.join(__dirname, 'frontend', req.path));
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Frontend server is running', timestamp: new Date() });
});

// 404 handler - serve index for SPA support
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'), (err) => {
    if (err) {
      res.status(404).json({ 
        error: 'Not found',
        path: req.path,
        message: 'Please make sure you are accessing a valid page'
      });
    }
  });
});

app.listen(PORT, () => {
  console.log('');
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║    🚀 AI Recruiter Pro - Development Server               ║');
  console.log('╠════════════════════════════════════════════════════════════╣');
  console.log(`║    Frontend:  http://localhost:${PORT}                         ║`);
  console.log(`║    Backend:   http://localhost:5000/api                    ║`);
  console.log('╠════════════════════════════════════════════════════════════╣');
  console.log('║    Quick Links:                                            ║');
  console.log(`║    • Signup:    http://localhost:${PORT}/pages/signup.html  ║`);
  console.log(`║    • Login:     http://localhost:${PORT}/pages/login.html   ║`);
  console.log(`║    • Dashboard: http://localhost:${PORT}/pages/dashboard.html║`);
  console.log('║    • Features:  http://localhost:${PORT}/pages/features.html ║');
  console.log('╠════════════════════════════════════════════════════════════╣');
  console.log('║    Note: Start backend with: cd backend && npm start      ║');
  console.log('╚════════════════════════════════════════════════════════════╝');
  console.log('');
});
