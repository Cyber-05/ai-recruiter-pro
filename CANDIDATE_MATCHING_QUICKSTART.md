# 🚀 Candidate Matching - Quick Start Guide

## What Was Built

### Backend:
- ✅ **candidateMatchController.js** - AI matching logic
- ✅ **candidateMatch.js** - API routes
- ✅ **Server integration** - New endpoint registered

### Frontend:
- ✅ **find-candidates.html** - Recruiter candidate finder UI

### Documentation:
- ✅ **CANDIDATE_MATCHING_GUIDE.md** - Full feature guide

---

## How It Works

### 1. **Recruiters Enter Job Requirements**
```
Job Title: Senior React Developer
Skills: React, TypeScript, Node.js
Experience: 5 years
Location: Remote
```

### 2. **AI Analyzes All Verified Candidates**
- Uses GPT-3.5-turbo
- Scores each candidate 0-100%
- Provides reasoning, strengths, gaps

### 3. **Shows Ranked Results**
```
1. John Smith - 92% ⭐⭐⭐
   ✓ 8+ years React, Full-stack
   ⚠ Limited cloud experience

2. Jane Doe - 87% ⭐⭐
   ✓ Strong TypeScript, Team lead
   ⚠ Prefers on-site
```

---

## Testing the Feature

### Prerequisites
1. ✅ Backend running on port 5000
2. ✅ OpenAI API key valid in .env
3. ✅ MongoDB connected
4. ✅ At least 1 verified user in database

### Test Steps

**1. Create Test Candidates**
- If only 1 user (from earlier test), this is fine
- System works with any verified users

**2. Open Candidate Finder**
```
URL: file:///D:/Ai-Recruiter%20Pro/frontend/pages/find-candidates.html
```

**3. Search for Candidates**
- Job Title: "Full Stack Developer" (required)
- Skills: "React, Node.js, MongoDB" (optional)
- Experience: "5" (optional)
- Click "Find Matching Candidates"

**4. View Results**
- See candidate cards with scores
- Read AI reasoning
- View strengths and gaps
- Click "View Profile" or "Contact"

---

## API Testing with cURL

### Test Candidate Matching
```bash
curl -X POST http://localhost:5000/api/candidate-match/find \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "jobTitle": "Senior Frontend Engineer",
    "skills": ["React", "TypeScript"],
    "experience": 5,
    "location": "Remote"
  }'
```

### Search by Skills
```bash
curl -X POST http://localhost:5000/api/candidate-match/search-by-skills \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "skills": ["React", "Node.js"],
    "limit": 10
  }'
```

### Get Top Candidates
```bash
curl http://localhost:5000/api/candidate-match \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## What You'll See

### On Success ✅
```
Found 1 matching candidates

[Card showing candidate details]
- Name, email, company
- Match score (92%)
- AI explanation
- Strengths (✓)
- Gaps (⚠)
- View Profile / Contact buttons
```

### On Error ❌
- "No candidates found" - No verified users exist
- "401 Unauthorized" - Token expired/missing
- "Request failed" - OpenAI API key issue
- "500 Error" - Backend error (check logs)

---

## AI Matching Logic

The system evaluates:

1. **Skills Match** (40%)
   - Do they have required skills?

2. **Experience** (30%)
   - Do they meet years needed?

3. **Education** (15%)
   - Do they meet education requirements?

4. **Overall Fit** (15%)
   - Does profile match role?

**Result:** 0-100% match score

### Example Calculation
- Skills match: 40/40 (90%)
- Experience: 30/30 (5+ years required)
- Education: 15/15 (Bachelor's)
- Overall: 12/15 (80%)
- **Final Score: 92%**

---

## Features Available Now

✅ AI candidate matching by job requirements
✅ Skill-based search
✅ Experience level filtering  
✅ Location filtering
✅ Education filtering
✅ Ranked results (best match first)
✅ AI reasoning for each match
✅ Strengths/gaps analysis
✅ Direct contact button

---

## Features Coming Next

🔄 LinkedIn profile import
🔄 Resume parsing
🔄 Interview scheduling
🔄 Candidate pipeline
🔄 Email notifications
🔄 Assessment scores
🔄 Video interviews

---

## Integration with Dashboard

To add link to Dashboard:

1. Open `frontend/pages/dashboard.html`
2. Add new section in navigation:
```html
<li>
  <div onclick="location.href='find-candidates.html'">
    🔍 Find Candidates
  </div>
</li>
```

3. Add feature card:
```html
<div onclick="location.href='find-candidates.html'">
  <h3>🔍 Find Candidates</h3>
  <p>AI-powered candidate matching for your roles</p>
</div>
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| No candidates appear | Create verified users first, check MongoDB |
| "401 Unauthorized" | Login first, get token, refresh if needed |
| OpenAI error | Check API key is valid, has credits |
| Slow responses | AI analysis takes 5-30 seconds per search |
| Match score seems wrong | Provide more complete candidate data |

---

## Next Steps

1. **Setup** (if not done)
   - Ensure OpenAI key in .env
   - Restart backend

2. **Create Test Data**
   - More candidate profiles for better testing

3. **Test Matching**
   - Try different job titles
   - Try different skill combinations
   - Check quality of results

4. **Get Feedback**
   - Are matches accurate?
   - Is reasoning helpful?
   - Any improvements needed?

---

## Performance Tips

- Candidate search: 5-30 seconds (waiting for AI)
- With 5 candidates: ~10 seconds
- With 20 candidates: ~30 seconds
- With 100+ candidates: 1-2 minutes

To speed up:
- Pre-score popular roles
- Cache results
- Use OpenAI batch API (future)

---

## Success Criteria

System working ✅ when:
- Candidates appear in results
- Match scores make sense (0-100%)
- AI explanations are relevant
- Can filter and search
- Can contact candidates

---

**Your AI Recruiter is now recruiting! 🎯**
