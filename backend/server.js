const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Request timeout middleware - Give requests more time on production
app.use((req, res, next) => {
  const timeout = process.env.NODE_ENV === 'production' ? 60000 : 30000; // 60s on prod, 30s locally
  res.setTimeout(timeout, () => {
    console.warn(`Request timeout for ${req.method} ${req.url}`);
    res.status(503).json({ error: 'Request timeout - server busy' });
  });
  next();
});

// Database Connection
const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  maxPoolSize: 10,
  minPoolSize: 2,
  serverSelectionTimeoutMS: process.env.NODE_ENV === 'production' ? 60000 : 5000,
  socketTimeoutMS: process.env.NODE_ENV === 'production' ? 180000 : 45000,
  family: 4,
  retryWrites: true,
  w: 'majority',
  connectTimeoutMS: process.env.NODE_ENV === 'production' ? 60000 : 10000,
  heartbeatFrequencyMS: 10000,
  bufferCommands: false, // Disable buffering to prevent timeout issues
  maxIdleTimeMS: 45000,
  authSource: 'admin'
};

// Create MongoDB URI with retry parameters
let mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ai-recruiter-pro';
if (!mongoURI.includes('retryWrites')) {
  const separator = mongoURI.includes('?') ? '&' : '?';
  mongoURI += separator + 'retryWrites=true&w=majority&maxPoolSize=10&serverSelectionTimeoutMS=60000';
}

let mongoConnected = false;

mongoose.connect(mongoURI, mongoOptions)
  .then(() => {
    mongoConnected = true;
    console.log('✅ MongoDB connected successfully');
  })
  .catch(err => {
    console.log('❌ MongoDB connection error:', err.message);
    // Attempt to reconnect after delay
    setTimeout(() => {
      mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ai-recruiter-pro', mongoOptions)
        .then(() => {
          mongoConnected = true;
          console.log('✅ MongoDB reconnected successfully');
        })
        .catch(err => console.log('❌ MongoDB reconnection failed:', err.message));
    }, 5000);
  });

// Monitor MongoDB connection state
mongoose.connection.on('connected', () => {
  mongoConnected = true;
  console.log('✅ Mongoose connected to MongoDB');
});

mongoose.connection.on('disconnected', () => {
  mongoConnected = false;
  console.log('⚠️ Mongoose disconnected from MongoDB');
});

// Middleware to ensure database is ready before processing API requests
app.use((req, res, next) => {
  // Allow health check and static files without DB
  if (req.path === '/api/health' || !req.path.startsWith('/api/')) {
    return next();
  }
  
  // For API requests, check MongoDB connection
  if (mongoConnected) {
    next();
  } else {
    res.status(503).json({ error: 'Database not ready - please try again in a moment' });
  }
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/resumes', require('./routes/resumes'));
app.use('/api/interviews', require('./routes/interviews'));
app.use('/api/jobs', require('./routes/jobs'));
app.use('/api/candidates', require('./routes/candidates'));
app.use('/api/public-search', require('./routes/publicSearch'));
app.use('/api/candidate-match', require('./routes/candidateMatch'));
app.use('/api/payments', require('./routes/payments'));
app.use('/api/dashboard', require('./routes/dashboard'));

// Serve static frontend files
const frontendPath = path.join(__dirname, '../frontend');
const rootPath = path.join(__dirname, '..');

app.use(express.static(frontendPath));
app.use(express.static(rootPath));

// SPA fallback routes
app.get('/', (req, res) => {
  res.sendFile(path.join(rootPath, 'index.html'));
});

// Catch-all for SPA routing
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api/')) {
    return next(); // Let API error handling take care of it
  }
  // Serve the requested file if it exists in frontend or root
  const filePath = path.join(frontendPath, req.path);
  res.sendFile(filePath, (err) => {
    if (err) {
      // If file doesn't exist, serve index.html for SPA routing
      res.sendFile(path.join(rootPath, 'index.html'), (indexErr) => {
        if (indexErr) {
          res.status(404).json({ error: 'Not found' });
        }
      });
    }
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'API is running', timestamp: new Date() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});

module.exports = app;
