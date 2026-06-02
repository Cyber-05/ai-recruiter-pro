/**
 * Intelligent Scoring Service - Advanced Local AI Candidate Matching
 * Provides sophisticated candidate matching without external API dependencies
 */

const scoreCandidate = (candidate, jobRequirements) => {
  const scores = {
    skills: scoreSkills(candidate, jobRequirements),
    experience: scoreExperience(candidate, jobRequirements),
    education: scoreEducation(candidate, jobRequirements),
    location: scoreLocation(candidate, jobRequirements),
    culture: scoreCulture(candidate, jobRequirements),
    availability: scoreAvailability(candidate, jobRequirements)
  };

  // Weighted scoring
  const weights = {
    skills: 0.35,
    experience: 0.25,
    education: 0.15,
    location: 0.10,
    culture: 0.10,
    availability: 0.05
  };

  const totalScore = Math.round(
    Object.keys(scores).reduce((sum, key) => {
      return sum + scores[key] * weights[key];
    }, 0)
  );

  return {
    score: Math.min(100, Math.max(0, totalScore)),
    breakdown: scores,
    weights,
    reasoning: generateReasoning(scores, jobRequirements),
    strengths: extractStrengths(scores, candidate, jobRequirements),
    gaps: extractGaps(scores, candidate, jobRequirements),
    recommendations: generateRecommendations(scores, candidate, jobRequirements)
  };
};

const scoreSkills = (candidate, jobRequirements) => {
  const requiredSkills = jobRequirements.requiredSkills || [];
  if (!requiredSkills.length) return 75;

  const candidateSkills = (candidate.skills || []).map(s => s.toLowerCase());
  
  if (candidateSkills.length === 0) return 0;

  let matchCount = 0;
  let expertCount = 0;

  requiredSkills.forEach(skill => {
    const normalizedSkill = skill.toLowerCase().trim();
    if (candidateSkills.includes(normalizedSkill)) {
      matchCount++;
      // Check proficiency level if available
      const skillObj = candidate.skills.find(s => s.toLowerCase() === normalizedSkill);
      if (skillObj && (skillObj.proficiency === 'expert' || skillObj.level === 'expert')) {
        expertCount++;
      }
    }
  });

  const matchPercentage = (matchCount / requiredSkills.length) * 100;
  const expertBonus = expertCount * 5;
  
  return Math.min(100, matchPercentage + expertBonus);
};

const scoreExperience = (candidate, jobRequirements) => {
  const requiredYears = jobRequirements.experienceYears || 0;
  const candidateYears = candidate.yearsOfExperience || 0;

  if (requiredYears === 0) return 80;
  if (candidateYears === 0) return 20;

  if (candidateYears >= requiredYears) {
    // Reward overqualification but not too much
    const bonus = Math.min(10, candidateYears - requiredYears);
    return Math.min(100, 85 + bonus);
  }

  const percentMatch = (candidateYears / requiredYears) * 100;
  return Math.max(0, percentMatch - 10); // Slight penalty for underqualification
};

const scoreEducation = (candidate, jobRequirements) => {
  const requiredEducation = jobRequirements.education?.toLowerCase() || '';
  const candidateEducation = candidate.education?.toLowerCase() || '';

  if (!requiredEducation) return 70;
  if (!candidateEducation) return 30;

  const educationLevels = {
    'high school': 1,
    'associate': 2,
    'bachelor': 3,
    "bachelor's": 3,
    'master': 4,
    "master's": 4,
    'phd': 5,
    'doctorate': 5
  };

  let requiredLevel = 2;
  let candidateLevel = 1;

  for (const [key, level] of Object.entries(educationLevels)) {
    if (requiredEducation.includes(key)) requiredLevel = level;
    if (candidateEducation.includes(key)) candidateLevel = level;
  }

  if (candidateLevel >= requiredLevel) {
    return 85 + (candidateLevel - requiredLevel) * 5;
  }

  return Math.max(20, 50 - (requiredLevel - candidateLevel) * 15);
};

const scoreLocation = (candidate, jobRequirements) => {
  const requiredLocation = jobRequirements.location?.toLowerCase() || '';
  const candidateLocation = candidate.location?.toLowerCase() || '';

  if (!requiredLocation || requiredLocation === 'remote') return 100;
  if (!candidateLocation) return 50;

  // Check for remote preference
  if (requiredLocation.includes('remote') || candidateLocation.includes('remote')) {
    return 100;
  }

  // Check for same city/region
  if (candidateLocation.includes(requiredLocation) || requiredLocation.includes(candidateLocation)) {
    return 95;
  }

  // Same country/region gets partial score
  const countryMatch = candidateLocation.split(',').some(part =>
    requiredLocation.includes(part.trim())
  );

  return countryMatch ? 70 : 40;
};

const scoreCulture = (candidate, jobRequirements) => {
  const jobIndustry = jobRequirements.industry?.toLowerCase() || '';
  const candidateBackground = candidate.industry?.toLowerCase() || '';

  if (!jobIndustry) return 70;
  if (!candidateBackground) return 60;

  if (candidateBackground === jobIndustry) return 100;
  if (candidateBackground.includes(jobIndustry) || jobIndustry.includes(candidateBackground)) {
    return 85;
  }

  // Check for relevant transferable industries
  const techIndustries = ['tech', 'software', 'it', 'startup', 'saas'];
  const isTechJob = techIndustries.some(ind => jobIndustry.includes(ind));
  const isCandidateTech = techIndustries.some(ind => candidateBackground.includes(ind));

  if (isTechJob && isCandidateTech) return 80;

  return 60;
};

const scoreAvailability = (candidate, jobRequirements) => {
  const jobType = jobRequirements.jobType?.toLowerCase() || '';
  const candidateAvailability = candidate.availability?.toLowerCase() || 'available';

  if (candidateAvailability.includes('immediately') || candidateAvailability.includes('available')) {
    return 100;
  }

  if (candidateAvailability.includes('week')) return 85;
  if (candidateAvailability.includes('month')) return 70;
  if (candidateAvailability.includes('negotiable')) return 80;

  return 60;
};

const generateReasoning = (scores, jobRequirements) => {
  const sortedScores = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  const reasons = [];

  if (scores.skills >= 80) {
    reasons.push('Strong skills match with required technologies');
  } else if (scores.skills >= 60) {
    reasons.push('Good partial skills match');
  }

  if (scores.experience >= 80) {
    reasons.push('Well-matched or exceeds experience requirements');
  }

  if (scores.education >= 80) {
    reasons.push('Appropriate educational background');
  }

  if (scores.location >= 90) {
    reasons.push('Perfect location alignment');
  }

  if (reasons.length === 0) {
    reasons.push('Meets basic job qualifications');
  }

  return reasons.join('. ') + '.';
};

const extractStrengths = (scores, candidate, jobRequirements) => {
  const strengths = [];

  if (scores.skills >= 75) {
    strengths.push(`Strong technical skills (${scores.skills}% match)`);
  }

  if (scores.experience >= 80) {
    strengths.push('Exceeds experience requirements');
  }

  if (scores.location >= 90) {
    strengths.push('Perfect location fit');
  }

  if (candidate.yearsOfExperience > jobRequirements.experienceYears * 1.5) {
    strengths.push('Significant industry experience');
  }

  if (scores.education >= 85) {
    strengths.push('Strong educational credentials');
  }

  return strengths.slice(0, 3);
};

const extractGaps = (scores, candidate, jobRequirements) => {
  const gaps = [];

  if (scores.skills < 70) {
    gaps.push('Some required technical skills are missing');
  }

  if (scores.experience < 60) {
    gaps.push('Experience below ideal level for role');
  }

  if (scores.education < 70) {
    gaps.push('Education background could be stronger');
  }

  if (scores.location < 70) {
    gaps.push('Location may require relocation consideration');
  }

  if (scores.availability < 70) {
    gaps.push('May not be immediately available');
  }

  return gaps.slice(0, 3);
};

const generateRecommendations = (scores, candidate, jobRequirements) => {
  const recommendations = [];

  if (scores.skills < 75) {
    recommendations.push('Consider skills training programs in needed areas');
  }

  if (scores.location < 70 && !jobRequirements.location?.toLowerCase().includes('remote')) {
    recommendations.push('Discuss relocation or remote options');
  }

  if (scores.availability < 80) {
    recommendations.push('Confirm start date and availability timeline');
  }

  if (scores.experience >= 90 && scores.skills >= 85) {
    recommendations.push('Fast-track interview process - strong match');
  }

  return recommendations;
};

// Advanced job matching for job seekers
const scoreJobForCandidate = (job, candidate) => {
  const scores = {
    roleMatch: scoreRoleMatch(job, candidate),
    salaryMatch: scoreSalaryMatch(job, candidate),
    growthPotential: scoreGrowthPotential(job, candidate),
    workEnvironment: scoreWorkEnvironment(job, candidate),
    benefits: scoreBenefits(job, candidate),
    careerPath: scoreCareerPath(job, candidate)
  };

  const weights = {
    roleMatch: 0.30,
    salaryMatch: 0.25,
    growthPotential: 0.20,
    workEnvironment: 0.10,
    benefits: 0.10,
    careerPath: 0.05
  };

  const totalScore = Math.round(
    Object.keys(scores).reduce((sum, key) => {
      return sum + scores[key] * weights[key];
    }, 0)
  );

  return {
    score: Math.min(100, Math.max(0, totalScore)),
    breakdown: scores,
    reasoning: generateJobReasoning(scores),
    why: generateWhyThisJob(scores, job, candidate),
    concerns: generateJobConcerns(scores, job, candidate),
    nextSteps: ['Review company culture', 'Prepare technical questions', 'Research team members']
  };
};

const scoreRoleMatch = (job, candidate) => {
  const requiredSkills = job.requiredSkills || [];
  if (!requiredSkills.length) return 70;

  const candidateSkills = (candidate.skills || []).map(s => s.toLowerCase());
  
  if (candidateSkills.length === 0) return 20;

  const matchCount = requiredSkills.filter(skill =>
    candidateSkills.some(cs => cs.includes(skill.toLowerCase()))
  ).length;

  return Math.min(100, (matchCount / requiredSkills.length) * 100);
};

const scoreSalaryMatch = (job, candidate) => {
  const jobSalary = job.salaryRange?.max || job.salary || 0;
  const candidateExpectation = candidate.salaryExpectation || 0;

  if (!jobSalary || !candidateExpectation) return 75;

  const difference = jobSalary - candidateExpectation;
  const percentDifference = (difference / candidateExpectation) * 100;

  if (percentDifference >= 0) return 100;
  if (percentDifference >= -10) return 90;
  if (percentDifference >= -20) return 75;
  if (percentDifference >= -30) return 60;
  
  return 40;
};

const scoreGrowthPotential = (job, candidate) => {
  const hasLeadershipPath = job.seniority?.includes('lead') || job.seniority?.includes('manager');
  const hasLearningPath = job.mentoring === true || job.training === true;

  let score = 70;
  if (hasLeadershipPath) score += 15;
  if (hasLearningPath) score += 10;

  return Math.min(100, score);
};

const scoreWorkEnvironment = (job, candidate) => {
  const jobType = job.jobType?.toLowerCase() || '';
  const candidatePreference = candidate.jobTypePreference?.toLowerCase() || '';

  if (candidatePreference.includes(jobType)) return 100;
  
  const remotePreference = candidate.remotePreference || 'hybrid';
  const jobRemote = job.remote === true ? 'remote' : job.remote === false ? 'onsite' : 'hybrid';

  if (remotePreference === jobRemote) return 90;
  if (remotePreference === 'flexible' || remotePreference === 'hybrid') return 80;

  return 60;
};

const scoreBenefits = (job, candidate) => {
  let score = 70;
  
  if (job.healthInsurance) score += 10;
  if (job.retirement) score += 10;
  if (job.paidTimeOff) score += 5;
  if (job.equity) score += 5;

  return Math.min(100, score);
};

const scoreCareerPath = (job, candidate) => {
  const isAligned = job.requiredSkills?.some(skill =>
    candidate.careerGoals?.toLowerCase().includes(skill.toLowerCase())
  );

  return isAligned ? 90 : 70;
};

const generateJobReasoning = (scores) => {
  const topScores = Object.entries(scores)
    .filter(([_, score]) => score >= 80)
    .map(([key, _]) => key);

  const reasons = [];
  if (topScores.includes('roleMatch')) reasons.push('Perfect role match');
  if (topScores.includes('salaryMatch')) reasons.push('Great compensation');
  if (topScores.includes('growthPotential')) reasons.push('Strong growth opportunities');

  return reasons.length ? reasons.join('. ') + '.' : 'Good overall job fit.';
};

const generateWhyThisJob = (scores, job, candidate) => {
  const why = [];
  
  if (scores.roleMatch >= 80) why.push('Your skills align perfectly with this role');
  if (scores.salaryMatch >= 80) why.push('Compensation meets your expectations');
  if (scores.growthPotential >= 85) why.push('Excellent opportunities for career advancement');
  if (scores.workEnvironment >= 85) why.push('Work environment matches your preferences');

  return why;
};

const generateJobConcerns = (scores, job, candidate) => {
  const concerns = [];

  if (scores.roleMatch < 70) concerns.push('Some required skills may need development');
  if (scores.salaryMatch < 70) concerns.push('Salary may be below expectations');
  if (scores.growthPotential < 70) concerns.push('Limited growth opportunities');

  return concerns;
};

module.exports = {
  scoreCandidate,
  scoreJobForCandidate,
  calculateAverageScore: (candidates) => {
    if (!candidates.length) return 0;
    const sum = candidates.reduce((acc, c) => acc + c.score, 0);
    return Math.round(sum / candidates.length);
  }
};
