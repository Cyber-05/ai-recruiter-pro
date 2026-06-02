#!/bin/bash
# AI Recruiter Pro - One-Click Deployment Script
# This script prepares your project for deployment to Railway.app

echo "🚀 AI Recruiter Pro - Deployment Setup"
echo "========================================"
echo ""

# Check if .gitignore exists
if [ ! -f .gitignore ]; then
    echo "Creating .gitignore..."
    cat > .gitignore << 'EOF'
# Dependencies
node_modules/
package-lock.json
yarn.lock

# Environment
.env
.env.local
.env.*.local

# Logs
logs/
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# OS
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
*.swp
*.swo

# Build
dist/
build/
.next/

# Testing
coverage/
.nyc_output/

# Cache
.cache/
.eslintcache

# Temp
tmp/
temp/
EOF
    echo "✓ .gitignore created"
fi

# Check if Procfile exists
if [ ! -f Procfile ]; then
    echo "Creating Procfile for Railway..."
    cat > Procfile << 'EOF'
web: cd backend && npm start
EOF
    echo "✓ Procfile created"
fi

# Check backend package.json for start script
if ! grep -q '"start"' backend/package.json; then
    echo "⚠️ Warning: backend/package.json missing start script"
    echo "Add this to backend/package.json:"
    echo '"start": "node server.js"'
fi

echo ""
echo "✓ Deployment files created!"
echo ""
echo "📋 Next Steps:"
echo "1. Push to GitHub:"
echo "   git init"
echo "   git add ."
echo "   git commit -m 'Initial commit: AI Recruiter Pro'"
echo "   git branch -M main"
echo "   git remote add origin https://github.com/YOUR_USERNAME/ai-recruiter-pro.git"
echo "   git push -u origin main"
echo ""
echo "2. Deploy to Railway:"
echo "   - Go to railway.app"
echo "   - Click 'New Project'"
echo "   - Select 'Deploy from GitHub'"
echo "   - Connect your repository"
echo "   - Add environment variables from .env"
echo "   - Click deploy!"
echo ""
echo "3. Database:"
echo "   - Use your existing MongoDB Atlas connection"
echo "   - Add MONGODB_URI to Railway environment"
echo ""
echo "4. Environment Variables Needed:"
echo "   - PORT=5000"
echo "   - MONGODB_URI=your_mongodb_url"
echo "   - JWT_SECRET=your_secret"
echo "   - OPENAI_API_KEY=your_key"
echo "   - NODE_ENV=production"
echo ""
