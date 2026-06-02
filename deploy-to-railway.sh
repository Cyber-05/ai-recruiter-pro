#!/bin/bash
# 🚀 AI Recruiter Pro - Quick Deployment Script
# This script automates the deployment process to Railway.app

set -e

echo "╔════════════════════════════════════════════════════════════╗"
echo "║  🚀 AI Recruiter Pro - Deployment Helper                  ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Verify Git is ready
echo -e "${BLUE}[1/5]${NC} Checking Git setup..."
if git rev-parse --git-dir > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC} Git repository ready"
else
    echo -e "${YELLOW}✗${NC} Git not initialized"
    echo "Run: git init"
    exit 1
fi

# Step 2: Check if GitHub remote exists
echo -e "${BLUE}[2/5]${NC} Checking GitHub remote..."
if git remote get-url origin > /dev/null 2>&1; then
    GITHUB_URL=$(git remote get-url origin)
    echo -e "${GREEN}✓${NC} GitHub remote configured: $GITHUB_URL"
else
    echo -e "${YELLOW}⚠${NC} No GitHub remote configured yet"
    echo ""
    echo "REQUIRED: Create GitHub repository first!"
    echo "1. Go to https://github.com/new"
    echo "2. Create repository: ai-recruiter-pro"
    echo "3. Then run:"
    echo ""
    echo "git remote add origin https://github.com/YOUR_USERNAME/ai-recruiter-pro.git"
    echo "git branch -M main"
    echo "git push -u origin main"
    echo ""
    exit 1
fi

# Step 3: Check uncommitted changes
echo -e "${BLUE}[3/5]${NC} Checking for uncommitted changes..."
if git diff --quiet && git diff --cached --quiet; then
    echo -e "${GREEN}✓${NC} All changes committed"
else
    echo -e "${YELLOW}⚠${NC} Uncommitted changes found"
    echo "Run: git add . && git commit -m 'Update before deployment'"
    exit 1
fi

# Step 4: Push to GitHub
echo -e "${BLUE}[4/5]${NC} Pushing to GitHub..."
git push -u origin main
echo -e "${GREEN}✓${NC} Successfully pushed to GitHub"

# Step 5: Deployment instructions
echo -e "${BLUE}[5/5]${NC} Deployment instructions..."
echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║  NEXT STEPS: Deploy to Railway                             ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
echo "1. Go to: https://railway.app"
echo "2. Sign up with GitHub (if needed)"
echo "3. Create new project"
echo "4. Select 'Deploy from GitHub repo'"
echo "5. Choose: ai-recruiter-pro"
echo "6. Add these environment variables:"
echo ""
echo "   PORT=5000"
echo "   NODE_ENV=production"
echo "   MONGODB_URI=mongodb+srv://lastandfinal8899_db_user:kX2Hviz2H7jV4Tj4@cluster0.ypoaqxs.mongodb.net/ai-recruiter-pro"
echo "   JWT_SECRET=your-secret-key-change-this"
echo "   JWT_EXPIRE=7d"
echo "   OPENAI_API_KEY=sk-proj-xxxxx"
echo "   SMTP_HOST=smtp.gmail.com"
echo "   SMTP_PORT=587"
echo "   SMTP_USER=your-email@gmail.com"
echo "   SMTP_PASSWORD=your-app-password"
echo ""
echo "7. Click 'Deploy'"
echo "8. Wait for deployment to complete (2-3 minutes)"
echo "9. Copy your Railway URL"
echo ""
echo "🎉 Your app will be LIVE at: https://your-app.railway.app"
echo ""
echo "Test signup/login at: https://your-app.railway.app/pages/signup.html"
echo ""
