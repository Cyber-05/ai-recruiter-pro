# 🚀 AI Recruiter Pro - Easy Deployment Guide

## Quickest Deployment (5 minutes)

### Option 1: Deploy with Railway.app (EASIEST)

**Step 1: Prepare Your Repository**
```bash
cd d:\Ai-Recruiter Pro

# Initialize Git (if not already done)
git init
git add .
git commit -m "Initial: AI Recruiter Pro"
```

**Step 2: Push to GitHub**
```bash
# Create new GitHub repository at github.com/new
# Then:
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ai-recruiter-pro.git
git push -u origin main
```

**Step 3: Deploy to Railway**
1. Go to https://railway.app
2. Sign up with GitHub (1 click)
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Select your ai-recruiter-pro repository
6. Click "Deploy"

**Step 4: Configure Environment Variables**
Railway → Settings → Environment Variables
```
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://lastandfinal8899_db_user:kX2Hviz2H7jV4Tj4@cluster0.ypoaqxs.mongodb.net/ai-recruiter-pro?retryWrites=true&w=majority
JWT_SECRET=your-secret-key-change-this
JWT_EXPIRE=7d
OPENAI_API_KEY=sk-proj-xxxxx
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
FRONTEND_URL=https://your-app.railway.app
STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

**Step 5: Get Your Public URL**
Railway generates a URL like: `https://ai-recruiter-pro-production.railway.app`

✅ Your app is now LIVE!

---

### Option 2: Deploy with Render.com

1. Go to https://render.com
2. Sign up with GitHub
3. New → Web Service
4. Select your GitHub repo
5. Set Name: `ai-recruiter-pro`
6. Set Build Command: `cd backend && npm install`
7. Set Start Command: `cd backend && npm start`
8. Add environment variables (same as Railway)
9. Click Deploy

✅ Live URL: `https://ai-recruiter-pro.onrender.com`

---

### Option 3: Deploy with Heroku

1. Go to https://heroku.com
2. Create new app: `ai-recruiter-pro`
3. Connect GitHub repository
4. Enable automatic deployments
5. Set Config Vars (environment variables)
6. Click Deploy

✅ Live URL: `https://ai-recruiter-pro.herokuapp.com`

---

## Local Testing Before Deployment

### Start Backend
```bash
cd backend
npm install
npm start
```

Expected output:
```
Server running on port 5000
MongoDB connected
Environment: development
```

### Open Frontend in Chrome
```
http://localhost:3000/frontend/pages/signup.html
```

### Test Signup
1. Open signup page
2. Enter:
   - First Name: Test
   - Last Name: User
   - Company: Test Corp
   - Email: testuser@gmail.com
   - Username: testuser123
   - Password: Test123456!
3. Click "Create Account"
4. Wait for OTP email (or check backend console)
5. Enter OTP code
6. Should redirect to dashboard

### Test Login
1. Go to login page
2. Enter email: testuser@gmail.com
3. Enter password: Test123456!
4. Click "Sign In"
5. Should show OTP verification
6. Enter OTP
7. Redirect to dashboard ✓

---

## Post-Deployment Checklist

### ✓ Test Signup
- [ ] Access signup page
- [ ] Fill form with test data
- [ ] OTP sent successfully
- [ ] Verify OTP works
- [ ] Redirect to dashboard

### ✓ Test Login
- [ ] Access login page
- [ ] Enter credentials
- [ ] OTP received
- [ ] Verify code
- [ ] Dashboard loads

### ✓ Test Features
- [ ] Job seeker profile creation
- [ ] Job search functionality
- [ ] Job posting (recruiter)
- [ ] Analytics dashboard
- [ ] Public candidate search

### ✓ Database Connection
- [ ] Can create users
- [ ] Data persists
- [ ] MongoDB connected

### ✓ Performance
- [ ] Pages load quickly
- [ ] No console errors
- [ ] API responses fast
- [ ] Database queries optimized

---

## Frontend Deployment Options

### Option A: Frontend on Same Server (Easiest)
- Backend serves frontend files
- Single deployment
- No CORS issues
- ✅ Recommended for your case

### Option B: Frontend on Vercel
1. Push frontend folder to separate GitHub repo
2. Import to Vercel
3. Set environment variable:
   `REACT_APP_API_URL=https://your-backend.railway.app/api`

### Option C: Frontend on Netlify
1. Build optimized frontend
2. Deploy to Netlify
3. Set build command: `npm run build`
4. Configure API URL in environment

---

## Environment Variables Reference

```bash
# Server
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://your-app.railway.app

# Database
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/database

# JWT
JWT_SECRET=your-super-secret-key-change-this
JWT_EXPIRE=7d

# OpenAI
OPENAI_API_KEY=sk-proj-xxxxx

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=app-specific-password

# Payment (Optional)
STRIPE_PUBLIC_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx
```

---

## Troubleshooting

### ❌ "Cannot connect to MongoDB"
- Solution: Check MONGODB_URI in environment variables
- Ensure IP whitelist includes your deployed server IP
- Test connection string locally first

### ❌ "API returns 404"
- Solution: Verify backend routes are correct
- Check if backend is running
- Ensure frontend is using correct API URL

### ❌ "CORS error"
- Solution: Verify FRONTEND_URL matches deployment URL
- Check CORS headers in backend/server.js
- Frontend must use full API URL

### ❌ "OTP not sending"
- Solution: Check SMTP credentials
- Verify Gmail app-specific password
- Check email service connection

### ❌ "Deploy failed"
- Solution: Check build logs in Railway/Render console
- Verify Node version compatible
- Ensure all dependencies in package.json

---

## Getting Your Railway URL

After successful deployment on Railway:

1. Open your Railway dashboard
2. Go to your project
3. Click "Deployments"
4. Find your domain (usually `https://ai-recruiter-pro-production.railway.app`)
5. Share this URL with users!

Example: `https://ai-recruiter-pro-production.railway.app`

---

## Update Frontend API URL After Deployment

### Option 1: Update Locally (Before Deployment)
Edit `frontend/config.js`:
```javascript
const deployedBackend = 'https://your-deployed-url.railway.app/api';
return deployedBackend;
```

### Option 2: Use localStorage
In browser console:
```javascript
localStorage.setItem('backendUrl', 'https://your-app.railway.app/api');
```

### Option 3: Environment Variable
Add to deployed environment:
```
BACKEND_URL=https://your-app.railway.app/api
```

---

## Monitoring & Logs

### View Logs in Railway
```
Railway Dashboard → Logs → View all logs
```

### Common Log Messages
```
✓ MongoDB connected - DB working
✓ Server running on port 5000 - Backend active
✓ User created - Signup working
✓ Token verified - Auth working
```

### Error Logs
```
✗ Cannot connect to MongoDB - DB issue
✗ JWT verification failed - Auth issue
✗ CORS error - Configuration issue
```

---

## Security Notes

⚠️ **Before Going Live:**

1. **Change JWT_SECRET** - Don't use example values
2. **Use Strong Passwords** - Database user should have strong password
3. **Enable HTTPS** - Railway/Render provide free HTTPS
4. **Restrict MongoDB Access** - Set IP whitelist
5. **Use Environment Variables** - Never commit secrets
6. **Enable CORS Properly** - Only allow your domain

---

## Test URLs

### Local
- Backend: `http://localhost:5000/api`
- Frontend: `http://localhost:3000`
- Signup: `http://localhost:3000/frontend/pages/signup.html`
- Login: `http://localhost:3000/frontend/pages/login.html`

### Deployed (Railway Example)
- Backend: `https://ai-recruiter-pro-production.railway.app/api`
- Frontend: `https://ai-recruiter-pro-production.railway.app`
- Signup: `https://ai-recruiter-pro-production.railway.app/frontend/pages/signup.html`
- Login: `https://ai-recruiter-pro-production.railway.app/frontend/pages/login.html`

---

## Quick Commands

```bash
# Local testing
npm install
npm start

# Git setup
git init
git add .
git commit -m "AI Recruiter Pro"
git push

# Check deployment
curl https://your-app.railway.app/api/health

# View logs
railway logs -f
```

---

## Support

If deployment fails:
1. Check build logs in Railway/Render console
2. Verify all environment variables are set
3. Test backend locally first
4. Check MongoDB connection
5. Review error messages carefully

---

## Success Indicators

✅ Deployment successful when:
- [ ] App loads in browser without errors
- [ ] Signup form submits successfully
- [ ] OTP verification works
- [ ] Login functionality works
- [ ] Dashboard loads with data
- [ ] No CORS errors in console
- [ ] Database writes/reads working

---

**Your AI Recruiter Pro is now ready to deploy and go LIVE!** 🚀

Choose Railway for easiest 5-minute deployment!

