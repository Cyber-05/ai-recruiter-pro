/**
 * Public Profile Search Service
 * Searches free public sources for candidate profiles
 * Uses Google Custom Search, public APIs, and web scraping
 */

const https = require('https');
const http = require('http');
const { URL } = require('url');

class PublicProfileSearchService {
  /**
   * Search for candidates across free public sources
   * @param {string} query - Search query (name, skills, location)
   * @param {string} filterType - Type: 'all', 'github', 'stackoverflow', 'twitter', 'google'
   */
  static async searchPublicProfiles(query, filterType = 'all') {
    console.log(`[Public Search] Searching for: ${query}`);
    
    try {
      const results = [];

      if (filterType === 'all' || filterType === 'github') {
        const githubResults = await this.searchGitHub(query);
        results.push(...githubResults);
      }

      if (filterType === 'all' || filterType === 'stackoverflow') {
        const soResults = await this.searchStackOverflow(query);
        results.push(...soResults);
      }

      if (filterType === 'all' || filterType === 'twitter') {
        const twitterResults = await this.searchTwitter(query);
        results.push(...twitterResults);
      }

      if (filterType === 'all' || filterType === 'google') {
        const googleResults = await this.searchGoogle(query);
        results.push(...googleResults);
      }

      // Deduplicate and sort by relevance
      const unique = this.deduplicateResults(results);
      return unique.sort((a, b) => b.relevanceScore - a.relevanceScore);
    } catch (error) {
      console.error('[Public Search] Error:', error.message);
      throw error;
    }
  }

  /**
   * Search GitHub for public developer profiles
   */
  static async searchGitHub(query) {
    try {
      console.log(`[GitHub] Searching: ${query}`);
      const results = [];

      // GitHub Users API (public, no auth needed for basic search)
      const userSearchUrl = `https://api.github.com/search/users?q=${encodeURIComponent(
        query
      )}&per_page=10`;

      const githubResults = await this.fetchJSON(userSearchUrl, {
        headers: { 'User-Agent': 'AIRecruiterPro' },
      });

      if (githubResults.items) {
        for (const user of githubResults.items) {
          // Get detailed user info
          const userDetails = await this.fetchJSON(user.url, {
            headers: { 'User-Agent': 'AIRecruiterPro' },
          });

          // Get public repos to extract skills
          const repos = await this.fetchJSON(user.repos_url, {
            headers: { 'User-Agent': 'AIRecruiterPro' },
          });

          const skills = this.extractSkillsFromRepos(repos);

          results.push({
            source: 'GitHub',
            sourceUrl: user.html_url,
            name: userDetails.name || user.login,
            username: user.login,
            bio: userDetails.bio || '',
            location: userDetails.location || '',
            company: userDetails.company || '',
            publicRepos: userDetails.public_repos || 0,
            followers: userDetails.followers || 0,
            avatar: user.avatar_url,
            skills: skills.slice(0, 10), // Top 10 skills
            email: userDetails.email || 'Not public',
            profile: {
              title: 'GitHub Developer',
              experience: this.estimateExperience(userDetails.created_at),
              portfolio: user.html_url,
            },
            relevanceScore: this.calculateRelevance(query, {
              name: user.login,
              bio: userDetails.bio,
              skills: skills,
            }),
          });
        }
      }

      console.log(`[GitHub] Found ${results.length} profiles`);
      return results;
    } catch (error) {
      console.error('[GitHub] Search error:', error.message);
      return [];
    }
  }

  /**
   * Search Stack Overflow for developer profiles
   */
  static async searchStackOverflow(query) {
    try {
      console.log(`[StackOverflow] Searching: ${query}`);
      const results = [];

      // Stack Overflow Public API (free, no auth needed)
      const searchUrl = `https://api.stackexchange.com/2.3/users?inname=${encodeURIComponent(
        query
      )}&site=stackoverflow&pagesize=10`;

      const soResults = await this.fetchJSON(searchUrl);

      if (soResults.items) {
        for (const user of soResults.items) {
          // Get user badges and tags (topics/skills)
          const tagsUrl = `https://api.stackexchange.com/2.3/users/${user.user_id}/tags?site=stackoverflow&pagesize=20`;
          const tags = await this.fetchJSON(tagsUrl);

          const skills = tags.items
            ? tags.items.map((t) => ({
                name: t.name,
                score: t.count,
              }))
            : [];

          results.push({
            source: 'Stack Overflow',
            sourceUrl: user.link,
            name: user.display_name,
            username: user.display_name,
            location: user.location || 'Not specified',
            reputation: user.reputation || 0,
            badge_counts: user.badge_counts || {},
            avatar: user.profile_image,
            skills: skills.slice(0, 10),
            profile: {
              title: 'Stack Overflow Expert',
              reputation: user.reputation,
              badges: user.badge_counts.gold + user.badge_counts.silver + user.badge_counts.bronze,
              portfolio: user.link,
            },
            relevanceScore: this.calculateRelevance(query, {
              name: user.display_name,
              skills: skills.map((s) => s.name),
            }),
          });
        }
      }

      console.log(`[StackOverflow] Found ${results.length} profiles`);
      return results;
    } catch (error) {
      console.error('[StackOverflow] Search error:', error.message);
      return [];
    }
  }

  /**
   * Search Twitter for tech professionals
   */
  static async searchTwitter(query) {
    try {
      console.log(`[Twitter] Searching: ${query}`);
      // Note: Twitter API requires authentication even for public search
      // For now, we return empty to indicate this would need API key
      // Users can manually search Twitter and copy profile info

      console.log('[Twitter] Requires API key - user manual search recommended');
      return [];
    } catch (error) {
      console.error('[Twitter] Search error:', error.message);
      return [];
    }
  }

  /**
   * Search Google for public profiles and portfolios
   */
  static async searchGoogle(query) {
    try {
      console.log(`[Google Search] Searching: ${query}`);
      const results = [];

      // Since Google CSE requires setup, we'll search for common profile patterns
      const searchPatterns = [
        `${query} site:github.com`,
        `${query} site:stackoverflow.com`,
        `${query} site:linkedin.com`,
        `${query} portfolio OR resume filetype:pdf`,
        `${query} "developer" OR "engineer" site:.dev OR site:.io`,
      ];

      // For a real implementation, use Google Custom Search API
      // For now, return structured recommendations
      results.push({
        source: 'Google Search',
        sourceUrl: `https://www.google.com/search?q=${encodeURIComponent(query)}`,
        suggestion:
          `Try searching on Google for: "${query}" and check public profiles`,
        instructions: [
          'Search GitHub (site:github.com)',
          'Search Stack Overflow (site:stackoverflow.com)',
          'Search LinkedIn public profiles',
          'Search personal portfolios (.dev, .io)',
          'Search for resume/CV files',
        ],
        relevanceScore: 50,
      });

      return results;
    } catch (error) {
      console.error('[Google Search] Error:', error.message);
      return [];
    }
  }

  /**
   * Extract programming skills from repository languages
   */
  static extractSkillsFromRepos(repos) {
    const skills = {};

    if (!Array.isArray(repos)) return [];

    repos.forEach((repo) => {
      if (repo.language) {
        skills[repo.language] = (skills[repo.language] || 0) + 1;
      }
    });

    // Convert to array and sort by frequency
    return Object.entries(skills)
      .sort((a, b) => b[1] - a[1])
      .map(([skill]) => skill)
      .slice(0, 15);
  }

  /**
   * Estimate years of experience from profile creation date
   */
  static estimateExperience(createdAt) {
    const created = new Date(createdAt);
    const now = new Date();
    const years = (now - created) / (1000 * 60 * 60 * 24 * 365);
    return Math.floor(years);
  }

  /**
   * Calculate relevance score based on query match
   */
  static calculateRelevance(query, profile) {
    let score = 0;
    const queryLower = query.toLowerCase();

    // Name match (highest priority)
    if (profile.name && profile.name.toLowerCase().includes(queryLower)) {
      score += 100;
    }

    // Bio/description match
    if (profile.bio && profile.bio.toLowerCase().includes(queryLower)) {
      score += 50;
    }

    // Skills match
    if (Array.isArray(profile.skills)) {
      const matchingSkills = profile.skills.filter((skill) =>
        queryLower.includes(skill.toLowerCase())
      );
      score += matchingSkills.length * 20;
    }

    // Base score
    score += 30;

    return Math.min(score, 100); // Cap at 100
  }

  /**
   * Deduplicate results from multiple sources
   */
  static deduplicateResults(results) {
    const seen = new Set();
    const unique = [];

    results.forEach((result) => {
      const key =
        (result.username || result.name || result.sourceUrl).toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        unique.push(result);
      }
    });

    return unique;
  }

  /**
   * Generic JSON fetch with timeout
   */
  static async fetchJSON(urlString, options = {}) {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('Request timeout'));
      }, 5000);

      const url = new URL(urlString);
      const protocol = url.protocol === 'https:' ? https : http;

      const requestOptions = {
        headers: {
          'User-Agent': 'AIRecruiterPro/1.0',
          ...options.headers,
        },
      };

      protocol
        .get(url, requestOptions, (res) => {
          let data = '';

          res.on('data', (chunk) => {
            data += chunk;
          });

          res.on('end', () => {
            clearTimeout(timeout);
            try {
              const json = JSON.parse(data);
              resolve(json);
            } catch (e) {
              reject(new Error('Invalid JSON response'));
            }
          });
        })
        .on('error', (err) => {
          clearTimeout(timeout);
          reject(err);
        });
    });
  }

  /**
   * Search Upwork (free profiles)
   * Note: Upwork doesn't have a public API, but profiles are searchable
   */
  static async searchUpwork(query) {
    try {
      console.log(`[Upwork] Searching: ${query}`);
      // Upwork profiles are searchable on Google
      const profileUrl = `https://www.google.com/search?q=${encodeURIComponent(
        query + ' site:upwork.com'
      )}`;

      return [
        {
          source: 'Upwork',
          sourceUrl: profileUrl,
          suggestion: `Search Upwork for freelancers matching: "${query}"`,
          relevanceScore: 40,
        },
      ];
    } catch (error) {
      console.error('[Upwork] Search error:', error.message);
      return [];
    }
  }

  /**
   * Search common portfolio domains
   */
  static async searchPortfolios(query) {
    try {
      console.log(`[Portfolio] Searching: ${query}`);

      const portfolioSearches = [
        {
          source: 'Portfolio Search',
          sourceUrl: `https://www.google.com/search?q="${query}" portfolio`,
          suggestion: `Search for personal portfolios matching: "${query}"`,
        },
        {
          source: 'Dev.to',
          sourceUrl: `https://www.google.com/search?q=${encodeURIComponent(
            query + ' site:dev.to'
          )}`,
          suggestion: 'Search DEV.to for technical writers',
        },
        {
          source: 'Medium',
          sourceUrl: `https://www.google.com/search?q=${encodeURIComponent(
            query + ' site:medium.com'
          )}`,
          suggestion: 'Search Medium for technical articles',
        },
      ];

      return portfolioSearches.map((p) => ({
        ...p,
        relevanceScore: 35,
      }));
    } catch (error) {
      console.error('[Portfolio] Search error:', error.message);
      return [];
    }
  }

  /**
   * Create candidate profile from search result
   */
  static createCandidateProfile(searchResult) {
    return {
      name: searchResult.name || searchResult.username || 'Unknown',
      email: searchResult.email || '',
      location: searchResult.location || 'Not specified',
      title: searchResult.profile?.title || 'Professional',
      skills: searchResult.skills || [],
      experience: searchResult.profile?.experience || 0,
      portfolio: searchResult.profile?.portfolio || searchResult.sourceUrl,
      source: searchResult.source,
      sourceUrl: searchResult.sourceUrl,
      avatar: searchResult.avatar || '',
      bio: searchResult.bio || '',
      profileData: {
        githubUsername: searchResult.username,
        repositories: searchResult.publicRepos,
        followers: searchResult.followers,
        soReputation: searchResult.reputation,
        relevanceScore: searchResult.relevanceScore,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}

module.exports = PublicProfileSearchService;
