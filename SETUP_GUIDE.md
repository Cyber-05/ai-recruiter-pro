# AI Recruiter Pro - Full Stack Setup Guide

## 🚀 Project Overview

AI Recruiter Pro is a fully functional AI-powered recruitment platform with:
- **Backend API** - Node.js/Express with MongoDB
- **Authentication** - JWT-based secure auth with bcrypt
- **AI Integration** - OpenAI API for resume analysis & interview generation
- **Frontend** - Beautiful, fully-functional dashboard with enhanced animations
- **Payment System** - Stripe integration ready
- **Real Features** - Resume analysis, interview generation, candidate tracking

## 📋 Prerequisites

- Node.js (v16+)
- MongoDB (local or Atlas)
- OpenAI API Key
- Stripe Account (optional, for payments)

## 🔧 Installation & Setup

### 1. Backend Setup

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create .env file
copy .env.example .env

# Edit .env with your credentials:
# - MONGODB_URI: Your MongoDB connection string
# - OPENAI_API_KEY: Your OpenAI API key
# - JWT_SECRET: Any random string for JWT
# - STRIPE_SECRET_KEY: Your Stripe secret key (optional)
```

### 2. MongoDB Setup

**Option A: Local MongoDB**
```bash
# Install MongoDB
# Windows: Download from https://www.mongodb.com/try/download/community
# Mac: brew install mongodb-community
# Linux: Follow official docs

# Start MongoDB
mongod
```

**Option B: MongoDB Atlas (Cloud)**
```
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a cluster
4. Get connection string: mongodb+srv://username:password@cluster.mongodb.net/database
5. Add to .env: MONGODB_URI=your_connection_string
```

### 3. Start Backend Server

```bash
# From backend folder
npm start
# or for development with auto-reload:
npm run dev

# Server will run on: http://localhost:5000
# Test API: http://localhost:5000/api/health
```

## 🎯 API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/login` - Sign in
- `POST /api/auth/logout` - Sign out

### Resumes
- `POST /api/resumes/analyze` - Analyze resume with AI
- `GET /api/resumes` - Get user's resumes

### Interviews
- `POST /api/interviews/generate` - Generate interview questions
- `GET /api/interviews` - Get generated interviews

### Dashboard
- `GET /api/dashboard/stats` - Get user stats

### Users
- `GET /api/users/profile` - Get profile
- `PUT /api/users/profile` - Update profile

## 🎨 Frontend Setup

All frontend files are in `/frontend/pages/`:
- `signup.html` - User registration
- `login.html` - User login
- `dashboard.html` - Main dashboard with all features

### Testing Frontend

1. Open `index.html` in browser (landing page)
2. Click "Start Free" to go to signup
3. Create account
4. Access fully functional dashboard

### Features on Dashboard

✅ **Resume Analyzer**
- Paste resume content
- Add optional job description
- Get AI analysis with skills extraction
- Receive ATS score and recommendations

✅ **Interview Generator**
- Select job role
- Choose difficulty level (Beginner/Intermediate/Advanced)
- Generate custom interview questions
- Export questions as PDF

✅ **Dashboard Statistics**
- Resumes analyzed count
- Current subscription plan
- Average candidate match score
- Top skills identified

## 🤖 OpenAI Integration

The system uses OpenAI GPT-3.5-turbo for:
1. **Resume Analysis** - Extract skills, summarize experience, generate hiring recommendations
2. **Interview Questions** - Create role-specific technical and behavioral questions
3. **Job Descriptions** - Generate professional job postings

### Getting OpenAI API Key

1. Go to https://platform.openai.com/account/api-keys
2. Sign up or login
3. Create new API key
4. Add to `.env`: `OPENAI_API_KEY=sk_...`

## 💳 Stripe Integration (Payment System)

The payment infrastructure is set up. To enable:

1. Create Stripe account at https://stripe.com
2. Get API keys from dashboard
3. Add to `.env`:
   ```
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_PUBLISHABLE_KEY=pk_test_...
   ```

## 📊 Database Models

### User Model
```javascript
{
  username, email, password,
  firstName, lastName, company,
  subscription: { plan, status, stripeCustomerId, resumesUsed },
  features: { resumeAnalyzer, atsChecker, interviewGenerator, etc },
  apiKey, isVerified
}
```

### Resume Model
```javascript
{
  userId, fileName,
  extractedData: { name, skills, experience, education },
  analysis: { aiSummary, strengths, weaknesses, hireRecommendation },
  atsScore: { score, keywords, formatting, experience }
}
```

### Interview Model
```javascript
{
  userId, jobRole, difficulty,
  questions: [{ question, type, expectedAnswerKeyPoints, estimatedTime }],
  duration, createdAt
}
```

## 🔐 Security Features

- ✅ Password hashing with bcryptjs
- ✅ JWT token-based authentication
- ✅ Protected routes with middleware
- ✅ CORS enabled
- ✅ Environment variables for sensitive data
- ✅ Input validation

## 🚀 Deployment

### Backend Deployment (Heroku, Railway, Render)

1. Push code to Git
2. Connect to deployment platform
3. Set environment variables
4. Deploy

### Frontend Deployment (Vercel, Netlify)

1. Push frontend to Git
2. Connect to deployment platform
3. Update API_URL in frontend files
4. Deploy

### Database Deployment

Use MongoDB Atlas for managed cloud database

## 📈 Revenue Generation Features

1. **Freemium Model**
   - Free: 10 resumes/month, basic features
   - Pro: $49/month, unlimited resumes, all features
   - Enterprise: Custom pricing

2. **Subscription Management**
   - Stripe integration for payments
   - Automatic billing
   - Usage tracking per user

3. **API Access** (Future)
   - Monetize API access for integrations
   - Per-request pricing model

## 🎯 Next Steps to Enhance

1. **Add Email Verification** - Verify user emails on signup
2. **Implement Password Reset** - Add forgotten password flow
3. **Team Collaboration** - Share candidates between team members
4. **Advanced Analytics** - More detailed hiring insights
5. **Candidate Ranking** - AI-powered candidate comparison
6. **PDF Export** - Export resumes, interviews, reports
7. **Integrations** - Connect with LinkedIn, ATS systems
8. **Mobile App** - React Native mobile version

## 🛠️ Troubleshooting

### MongoDB Connection Error
- Check MongoDB is running: `mongod`
- Verify MONGODB_URI in .env
- For Atlas: Ensure IP whitelist includes your IP

### OpenAI API Error
- Verify API key is correct
- Check API key has credits
- Rate limits: May need to wait 60 seconds

### CORS Error
- Ensure backend is running
- Frontend API_URL should point to backend
- Check CORS headers in server.js

### Port Already in Use
```bash
# Find and kill process on port 5000
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:5000 | xargs kill -9
```

## 📚 API Testing with cURL

```bash
# Signup
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Analyze Resume (with token)
curl -X POST http://localhost:5000/api/resumes/analyze \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"resumeText":"...","fileName":"resume.pdf"}'
```

## 📝 Project Structure

```
d:\Ai-Recruiter Pro\
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── .env
│   ├── models/
│   │   ├── User.js
│   │   ├── Resume.js
│   │   ├── Interview.js
│   │   ├── Candidate.js
│   │   └── Job.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── resumeController.js
│   │   └── interviewController.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── resumes.js
│   │   ├── interviews.js
│   │   ├── users.js
│   │   ├── dashboard.js
│   │   └── ...
│   └── middleware/
│       └── auth.js
├── frontend/
│   ├── pages/
│   │   ├── signup.html
│   │   ├── login.html
│   │   └── dashboard.html
│   └── assets/
│       ├── css/
│       └── js/
├── index.html (Landing page)
└── README.md
```

## 🎓 Learning Resources

- Node.js: https://nodejs.org/docs
- Express: https://expressjs.com
- MongoDB: https://docs.mongodb.com
- OpenAI: https://platform.openai.com/docs
- Stripe: https://stripe.com/docs

## 💡 Tips

1. Keep API key secret - never commit .env to Git
2. Test locally before deploying
3. Monitor API usage and costs
4. Use rate limiting for production
5. Implement logging for debugging
6. Regular backups of MongoDB
7. Update dependencies regularly

## 📞 Support

For issues:
1. Check error messages carefully
2. Review console logs (browser & terminal)
3. Verify all environment variables
4. Ensure all services are running
5. Check API documentation

---

**Ready to launch your AI recruitment platform?** 🚀

1. Set up MongoDB
2. Get OpenAI API key
3. Run `npm install` in backend
4. Create .env file with credentials
5. Start backend: `npm start`
6. Open index.html in browser
7. Sign up and start using!

Happy recruiting! 🎉
