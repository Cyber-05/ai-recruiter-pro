# ✅ Pre-Deployment Checklist

Use this checklist to verify everything is working before deploying to production.

---

## 🔧 Prerequisites

- [ ] Node.js v14+ installed (`node --version`)
- [ ] npm v6+ installed (`npm --version`)
- [ ] MongoDB Atlas account active
- [ ] Chrome browser available
- [ ] Internet connection working
- [ ] Git installed (for deployment)
- [ ] GitHub account (for deployment)
- [ ] Railway/Render/Heroku account (for deployment)

---

## 🏗️ Local Setup

- [ ] Backend dependencies installed (`cd backend && npm install`)
- [ ] Frontend dependencies installed (`npm install`)
- [ ] `.env` file exists in backend folder
- [ ] `.env` contains all required variables:
  - [ ] `MONGODB_URI` set correctly
  - [ ] `JWT_SECRET` set
  - [ ] `PORT=5000`
  - [ ] `NODE_ENV=development`
  - [ ] `OPENAI_API_KEY` set
- [ ] Config file exists: `frontend/config.js`

---

## ✅ Backend Verification

- [ ] Backend starts without errors: `cd backend && npm start`
- [ ] MongoDB connection successful (logs show "MongoDB connected")
- [ ] Server listening on port 5000
- [ ] No error messages in terminal
- [ ] Can access health endpoint: `curl http://localhost:5000/api/health`

---

## ✅ Frontend Verification

- [ ] Frontend dev server starts: `npm run dev` (from root)
- [ ] Server running on port 3000
- [ ] No compilation errors
- [ ] Pages load without 404 errors

---

## 📝 Signup Flow Testing

### Step 1: Access Signup Page
- [ ] Open: `http://localhost:3000/pages/signup.html`
- [ ] Page loads without errors
- [ ] All form fields visible
- [ ] Form styling looks correct

### Step 2: Submit Signup Form
```
Fill with:
- First Name: John
- Last Name: Test
- Company: Test Corp
- Email: your-gmail@gmail.com ⚠️ MUST BE GMAIL
- Username: johntest123
- Password: Test123456!
```
- [ ] Form accepts input
- [ ] Submit button clickable
- [ ] Loading spinner appears
- [ ] No console errors (F12)

### Step 3: Wait for Response
- [ ] Request completes in < 3 seconds
- [ ] No timeout errors
- [ ] Backend logs show signup event
- [ ] OTP generated and logged

### Step 4: Enter OTP
- [ ] Check backend console for OTP code
- [ ] OTP input fields appear
- [ ] Can type digits into OTP fields
- [ ] Auto-focus between fields works

### Step 5: Verify Success
- [ ] OTP verification succeeds
- [ ] Redirects to dashboard
- [ ] Dashboard loads without errors
- [ ] User name displays (e.g., "John Test")
- [ ] Welcome message visible
- [ ] Logout button present

---

## 🔑 Login Flow Testing

### Step 1: Clear Browser Cache
- [ ] Open DevTools (F12)
- [ ] Application tab → LocalStorage → Clear All
- [ ] Or restart browser

### Step 2: Access Login Page
- [ ] Open: `http://localhost:3000/pages/login.html`
- [ ] Page loads correctly
- [ ] All form fields present

### Step 3: Enter Credentials
```
Enter:
- Email: your-gmail@gmail.com
- Password: Test123456!
```
- [ ] Form accepts input
- [ ] Submit button clickable
- [ ] No console errors

### Step 4: OTP Step
- [ ] OTP input appears
- [ ] Get OTP from backend console or email
- [ ] Enter 6 digits successfully

### Step 5: Verify Login Success
- [ ] Redirects to dashboard
- [ ] User data displays correctly
- [ ] JWT token saved in localStorage
- [ ] Can access all pages via menu
- [ ] Logout works
- [ ] Re-login works

---

## 🌐 API Verification

Test each endpoint with curl or Postman:

- [ ] Health check: `GET http://localhost:5000/api/health`
- [ ] Signup: `POST http://localhost:5000/api/auth/signup`
- [ ] Verify OTP: `POST http://localhost:5000/api/auth/verify-otp`
- [ ] Login: `POST http://localhost:5000/api/auth/login`
- [ ] Jobs list: `GET http://localhost:5000/api/jobs`
- [ ] Candidates list: `GET http://localhost:5000/api/candidates`
- [ ] Public search: `GET http://localhost:5000/api/public-search/profiles?query=react`

---

## 💾 Database Verification

- [ ] Can create users (verified above)
- [ ] User data persists
- [ ] Can query MongoDB Atlas dashboard
- [ ] Collections created: Users, Jobs, Candidates, etc.
- [ ] Data appears in MongoDB Atlas

---

## 🎨 Frontend Pages Verification

Test each page loads without errors:

- [ ] Index/Home: `http://localhost:3000/pages/index.html`
- [ ] Signup: `http://localhost:3000/pages/signup.html`
- [ ] Login: `http://localhost:3000/pages/login.html`
- [ ] Dashboard: `http://localhost:3000/pages/dashboard.html`
- [ ] Job Search: `http://localhost:3000/pages/job-search.html`
- [ ] Post Jobs: `http://localhost:3000/pages/post-jobs.html`
- [ ] Find Candidates: `http://localhost:3000/pages/find-candidates.html`
- [ ] Public Search: `http://localhost:3000/pages/search-candidates-public.html`
- [ ] Analytics: `http://localhost:3000/pages/recruiter-analytics.html`
- [ ] Profile: `http://localhost:3000/pages/job-seeker-profile.html`
- [ ] Features: `http://localhost:3000/pages/features.html`

For each page:
- [ ] Loads without 404 errors
- [ ] Styling looks correct
- [ ] No console errors (F12)
- [ ] Responsive on mobile (F12 → Toggle device toolbar)
- [ ] Developer footer visible ("Developed By Kulwanth Kotagiri")

---

## 🔒 Security Verification

- [ ] Passwords are hashed (not readable in database)
- [ ] JWT tokens expire after 7 days
- [ ] OTP expires after 15 minutes
- [ ] Protected routes require authentication
- [ ] CORS configured correctly
- [ ] `.env` file NOT committed to git
- [ ] `.gitignore` includes `.env` and `node_modules`

---

## 📱 Browser & Responsiveness

- [ ] All pages work in Chrome
- [ ] All pages work in Firefox (optional)
- [ ] Mobile view works (DevTools → Toggle device)
- [ ] Tablet view looks correct
- [ ] Desktop view looks professional
- [ ] Animations smooth
- [ ] No layout shifts

---

## ⚡ Performance

- [ ] Pages load in < 2 seconds
- [ ] Signup completes in < 3 seconds
- [ ] Login completes in < 2 seconds
- [ ] Search results in < 1 second
- [ ] No memory leaks (DevTools → Performance)
- [ ] No network errors
- [ ] API responses fast

---

## 📋 Code Quality

- [ ] No console errors (F12)
- [ ] No console warnings (F12)
- [ ] No broken links
- [ ] All images load
- [ ] All CSS loads
- [ ] All JavaScript executes
- [ ] No 404 errors

---

## 🚀 Deployment Readiness

### Files Present
- [ ] `Procfile` exists
- [ ] `package.json` has start script
- [ ] `backend/package.json` has dependencies
- [ ] `frontend/config.js` handles URL switching
- [ ] `.env` template or instructions provided

### Documentation
- [ ] `QUICK_START.md` complete
- [ ] `LOCAL_TESTING_GUIDE.md` complete
- [ ] `DEPLOYMENT_GUIDE.md` complete
- [ ] `.gitignore` configured
- [ ] `README.md` updated

### GitHub Prep
- [ ] Git repository initialized: `git init`
- [ ] `.env` NOT included: `git status` should NOT show .env
- [ ] Ready to push: `git push`

---

## 🌐 Deployment Testing

### Before Deployment
- [ ] All above checklist items complete
- [ ] Local testing successful
- [ ] No errors in any flow
- [ ] Performance acceptable
- [ ] Ready to go public

### Railway Deployment
- [ ] GitHub account connected
- [ ] Repository pushed to GitHub
- [ ] Railway project created
- [ ] Environment variables set in Railway
- [ ] Deployment successful
- [ ] Deploy URL obtained

### Post-Deployment
- [ ] App loads from public URL
- [ ] Signup works on production
- [ ] Login works on production
- [ ] OTP verification works
- [ ] Database connection verified
- [ ] API responds from production

---

## 🧪 Production Verification

### Access Production URL
```
https://your-app.railway.app/pages/signup.html
```

- [ ] Page loads without errors
- [ ] All styling correct
- [ ] No mixed content warnings (https/http)

### Test Signup (Production)
- [ ] Create test account with Gmail
- [ ] OTP works
- [ ] Dashboard accessible
- [ ] Account in MongoDB

### Test Login (Production)
- [ ] Login with new account
- [ ] OTP works
- [ ] Dashboard displays
- [ ] Logout works

### Test Features (Production)
- [ ] Public search works
- [ ] Job search works
- [ ] Dashboard loads
- [ ] Navigation works
- [ ] All pages accessible

---

## 📊 Final Verification

- [ ] Local testing: ✅ PASSED
- [ ] All pages tested: ✅ PASSED
- [ ] Signup/Login working: ✅ PASSED
- [ ] Database connected: ✅ PASSED
- [ ] API responding: ✅ PASSED
- [ ] Deployment successful: ✅ PASSED
- [ ] Production signup works: ✅ PASSED
- [ ] Production login works: ✅ PASSED

---

## ✅ Ready to Launch!

If all checkboxes are checked:

✅ **Your AI Recruiter Pro is production ready!**

🚀 **Go LIVE with confidence!**

---

## 📞 Troubleshooting

If any item fails, check:

1. **Logs** - Terminal errors
2. **Console** - Browser errors (F12)
3. **Network** - API calls (F12 → Network)
4. **Database** - MongoDB Atlas connection
5. **Environment** - .env variables
6. **Documentation** - DEPLOYMENT_GUIDE.md

---

**Date Checked:** ________________

**Tester Name:** ________________

**Status:** ☐ READY TO DEPLOY | ☐ NEEDS FIXES

