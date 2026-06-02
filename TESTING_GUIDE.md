# 🚀 Testing Guide - AI Recruiter Pro

## ⚠️ IMPORTANT - Gmail Setup Required

### 1. Get Gmail App Password (Required for OTP emails)

1. Go to: https://myaccount.google.com/security
2. Scroll down to "App passwords" (only appears if 2FA is enabled)
3. If no "App passwords" option:
   - Enable 2-Factor Authentication first
   - Then go back to App passwords
4. Select "Mail" and "Windows Computer" (or your OS)
5. Generate and copy the 16-character password
6. Add to `backend/.env`:
   ```
   SMTP_USER=your-gmail@gmail.com
   SMTP_PASS=xxxx xxxx xxxx xxxx
   ```

### 2. Setup Backend

```bash
cd backend
npm install

# Create .env file with:
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ai-recruiter-pro
JWT_SECRET=test-secret-key-12345
OPENAI_API_KEY=sk-your-key-here
SMTP_USER=your-gmail@gmail.com
SMTP_PASS=your-app-password-here
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### 3. Start Backend

```bash
npm start
# Should see: "Server running on port 5000"
```

---

## 📝 Test Cases

### **Test 1: Signup with Gmail Only ✅**

**Steps:**
1. Open `frontend/pages/signup.html`
2. Fill signup form:
   - First Name: John
   - Last Name: Doe
   - Email: **your-actual-gmail@gmail.com** (must be real Gmail)
   - Username: testuser123
   - Password: Password@123

**Expected:**
- ✅ Only Gmail accepted (try with non-Gmail first to verify)
- ✅ Receive OTP email within seconds
- ✅ Move to OTP verification screen

**Test Non-Gmail (should fail):**
```
Email: test@yahoo.com
Expected Error: "Only Gmail addresses are accepted"
```

---

### **Test 2: OTP Verification ✅**

**Steps:**
1. After signup, check email for OTP
2. Enter 6-digit code into form
3. Click "Verify Code"

**Expected:**
- ✅ OTP accepted
- ✅ Welcome email sent
- ✅ Redirects to dashboard
- ✅ Token stored in localStorage

**Test Expired OTP (should fail):**
```
1. Wait 15+ minutes
2. Try old OTP
Expected Error: "OTP expired"
```

**Test Wrong OTP (should fail):**
```
1. Enter incorrect code (e.g., 999999)
Expected Error: "Invalid OTP"
```

---

### **Test 3: Login After Signup ✅**

**Steps:**
1. Sign out
2. Go to `login.html`
3. Enter credentials used in signup
4. Click "Sign In"

**Expected:**
- ✅ Successful login
- ✅ Token stored
- ✅ Redirect to dashboard

**Test Unverified Email (should fail):**
```
Create account but don't verify OTP
Try to login with that email
Expected Error: "Please verify your email first"
```

---

### **Test 4: AI Resume Analyzer ✅**

**Steps:**
1. After login, click "Analyze Resume"
2. Paste resume text:
```
SARAH ANDERSON
Email: sarah@example.com
Phone: (555) 123-4567

PROFESSIONAL SUMMARY
Senior Frontend Engineer with 8 years of experience in React, TypeScript, and modern web technologies.

EXPERIENCE
Senior Frontend Engineer at Tech Corp (2021-Present)
- Led development of 5+ critical features using React and TypeScript
- Improved app performance by 40% through optimization
- Mentored 3 junior developers

SKILLS
React, TypeScript, Next.js, GraphQL, Node.js, Tailwind CSS

EDUCATION
M.S. Computer Science, Stanford University (2019)
```

3. Optional: Paste job description
4. Click "Analyze Resume"

**Expected:**
- ✅ API connects to OpenAI
- ✅ Returns analysis with:
  - Skills extracted
  - Strengths identified
  - Weaknesses identified
  - Match percentage
  - Hire recommendation
- ✅ Success message shown
- ✅ Modal closes

**If fails with OpenAI error:**
```
Check:
1. API key is valid: https://platform.openai.com/account/api-keys
2. API key has credits
3. .env file has OPENAI_API_KEY set
```

---

### **Test 5: Interview Generator ✅**

**Steps:**
1. Click "Generate Interview Questions"
2. Fill form:
   - Job Role: Senior Frontend Engineer
   - Difficulty: Intermediate
   - Question Count: 5

3. Click "Generate Interview"

**Expected:**
- ✅ Connects to OpenAI
- ✅ Returns 5 interview questions
- ✅ Questions have:
  - Question text
  - Type (technical, behavioral, etc)
  - Expected answer points
  - Time estimate
- ✅ Success message shown

---

### **Test 6: Dashboard Statistics ✅**

**Steps:**
1. Login to dashboard
2. Check stats section

**Expected:**
- ✅ Resumes Analyzed: Shows count
- ✅ Plan Type: Shows "Free"
- ✅ Average Score: Shows percentage
- ✅ Top Skill: Shows most used skill

---

## 🔧 API Testing with cURL

### Test Signup
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username":"testuser",
    "email":"your-gmail@gmail.com",
    "password":"Password@123",
    "firstName":"John",
    "lastName":"Doe",
    "company":"Test Inc"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Account created! Check your email for verification code",
  "userId": "...",
  "email": "your-gmail@gmail.com"
}
```

### Test Verify OTP
```bash
curl -X POST http://localhost:5000/api/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{
    "email": "your-gmail@gmail.com",
    "otp": "123456"
  }'
```

### Test Resend OTP
```bash
curl -X POST http://localhost:5000/api/auth/resend-otp \
  -H "Content-Type: application/json" \
  -d '{
    "email": "your-gmail@gmail.com"
  }'
```

### Test Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "your-gmail@gmail.com",
    "password": "Password@123"
  }'
```

### Test Resume Analysis
```bash
curl -X POST http://localhost:5000/api/resumes/analyze \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "resumeText": "Your resume content here",
    "fileName": "resume.pdf",
    "jobDescription": "Optional job description"
  }'
```

### Test Interview Generation
```bash
curl -X POST http://localhost:5000/api/interviews/generate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "jobRole": "Senior Frontend Engineer",
    "difficulty": "intermediate",
    "count": 5
  }'
```

---

## ✅ Checklist

### Authentication
- [ ] Signup only accepts Gmail
- [ ] OTP sent to email
- [ ] OTP verification works
- [ ] Login requires verified email
- [ ] Token stored and used
- [ ] Login with correct credentials works
- [ ] Login with wrong password fails
- [ ] Unverified email can't login

### AI Features
- [ ] Resume analysis works
- [ ] Returns skills extracted
- [ ] Returns strengths/weaknesses
- [ ] Returns match percentage
- [ ] Interview questions generated
- [ ] Questions have proper format
- [ ] Different difficulties work

### Dashboard
- [ ] Stats display correctly
- [ ] Modals open/close
- [ ] Forms submit properly
- [ ] Error messages show
- [ ] Success messages show
- [ ] Logout works

### Errors
- [ ] Non-Gmail rejection works
- [ ] Expired OTP shows error
- [ ] Wrong OTP shows error
- [ ] Invalid credentials on login
- [ ] Missing OpenAI key error
- [ ] API timeout handled

---

## 🐛 Troubleshooting

### "Only Gmail addresses are accepted"
✅ Working correctly - only Gmail allowed

### "OTP not received"
1. Check spam folder
2. Verify SMTP credentials in .env
3. Check App password is correct
4. Try resending

### "Invalid OpenAI response"
1. Check API key is valid
2. Verify API key has credits
3. Check rate limits not exceeded
4. Try again in 60 seconds

### "MongoDB connection error"
```bash
# Start MongoDB
mongod

# Or use MongoDB Atlas connection string in .env
```

### "CORS error"
- Backend must be running
- Frontend API_URL must match backend URL
- Check `Access-Control-Allow-Origin` headers

---

## 🎯 Success Criteria

All tests pass when:
- ✅ Signup works (Gmail only)
- ✅ OTP verification works
- ✅ Login works after verification
- ✅ Resume analyzer AI works
- ✅ Interview generator AI works
- ✅ Dashboard shows stats
- ✅ All error cases handled

---

## 📊 Test Results Template

```
Date: __________
Backend: ✅/❌
MongoDB: ✅/❌
OpenAI: ✅/❌
Gmail Setup: ✅/❌

Signup (Gmail only): ✅/❌
OTP Verification: ✅/❌
Login: ✅/❌
Resume Analyzer: ✅/❌
Interview Generator: ✅/❌
Dashboard: ✅/❌

Notes:
_____________________________
_____________________________
```

---

## 🚀 Quick Start (Copy-Paste)

```bash
# 1. Start backend
cd backend
npm start

# 2. Open signup page
# http://localhost:3000/frontend/pages/signup.html

# 3. Use test Gmail: your-gmail@gmail.com
# 4. Wait for OTP email
# 5. Enter OTP
# 6. Access dashboard
# 7. Test AI features
```

Happy testing! 🎉
