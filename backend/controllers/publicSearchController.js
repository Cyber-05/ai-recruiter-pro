/**
 * Public Candidate Search Controller
 * Handles searching for candidates from public sources
 */

const PublicProfileSearchService = require('../services/publicProfileSearchService');
const Candidate = require('../models/Candidate');
const User = require('../models/User');

/**
 * Search public profiles
 * GET /api/candidates/search-public
 */
exports.searchPublicProfiles = async (req, res) => {
  try {
    const { query, filterType = 'all' } = req.query;

    if (!query) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    if (query.length < 2) {
      return res.status(400).json({ error: 'Query must be at least 2 characters' });
    }

    console.log(`[API] Searching public profiles: ${query}`);

    // Search across free public sources
    const results = await PublicProfileSearchService.searchPublicProfiles(
      query,
      filterType
    );

    res.status(200).json({
      success: true,
      query: query,
      filterType: filterType,
      resultsCount: results.length,
      results: results,
      sources: ['GitHub', 'Stack Overflow', 'Upwork', 'Portfolio Sites'],
    });
  } catch (error) {
    console.error('[API] Search error:', error);
    res.status(500).json({
      error: 'Search failed',
      details: error.message,
    });
  }
};

/**
 * Search by specific source
 * GET /api/candidates/search-source/:source
 */
exports.searchBySource = async (req, res) => {
  try {
    const { source } = req.params;
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    console.log(`[API] Searching ${source}: ${query}`);

    let results = [];

    switch (source.toLowerCase()) {
      case 'github':
        results = await PublicProfileSearchService.searchGitHub(query);
        break;
      case 'stackoverflow':
      case 'stack-overflow':
        results = await PublicProfileSearchService.searchStackOverflow(query);
        break;
      case 'upwork':
        results = await PublicProfileSearchService.searchUpwork(query);
        break;
      case 'portfolio':
        results = await PublicProfileSearchService.searchPortfolios(query);
        break;
      default:
        return res.status(400).json({
          error: 'Invalid source',
          supportedSources: ['github', 'stackoverflow', 'upwork', 'portfolio'],
        });
    }

    res.status(200).json({
      success: true,
      source: source,
      query: query,
      resultsCount: results.length,
      results: results,
    });
  } catch (error) {
    console.error(`[API] ${source} search error:`, error);
    res.status(500).json({
      error: `${source} search failed`,
      details: error.message,
    });
  }
};

/**
 * Import candidate from search result
 * POST /api/candidates/import-from-search
 */
exports.importCandidateFromSearch = async (req, res) => {
  try {
    const { searchResult } = req.body;

    if (!searchResult) {
      return res.status(400).json({ error: 'Search result is required' });
    }

    // Create candidate profile from search result
    const candidateData = PublicProfileSearchService.createCandidateProfile(
      searchResult
    );

    // Check if candidate already exists (by source + sourceUrl)
    const existingCandidate = await Candidate.findOne({
      source: candidateData.source,
      sourceUrl: candidateData.sourceUrl,
    });

    if (existingCandidate) {
      return res.status(409).json({
        error: 'Candidate already imported',
        candidateId: existingCandidate._id,
      });
    }

    // Create new candidate
    const candidate = new Candidate(candidateData);
    await candidate.save();

    console.log(`[API] Imported candidate: ${candidate.name} from ${candidate.source}`);

    res.status(201).json({
      success: true,
      message: 'Candidate imported successfully',
      candidate: candidate,
    });
  } catch (error) {
    console.error('[API] Import error:', error);
    res.status(500).json({
      error: 'Import failed',
      details: error.message,
    });
  }
};

/**
 * Get all imported candidates
 * GET /api/candidates/imported
 */
exports.getImportedCandidates = async (req, res) => {
  try {
    const { source, skip = 0, limit = 20 } = req.query;

    let query = {};
    if (source) {
      query.source = source;
    }

    const candidates = await Candidate.find(query)
      .sort({ createdAt: -1 })
      .skip(parseInt(skip))
      .limit(parseInt(limit));

    const total = await Candidate.countDocuments(query);

    res.status(200).json({
      success: true,
      total: total,
      count: candidates.length,
      skip: parseInt(skip),
      limit: parseInt(limit),
      candidates: candidates,
    });
  } catch (error) {
    console.error('[API] Get candidates error:', error);
    res.status(500).json({
      error: 'Failed to fetch candidates',
      details: error.message,
    });
  }
};

/**
 * Get candidate by ID
 * GET /api/candidates/imported/:id
 */
exports.getImportedCandidateById = async (req, res) => {
  try {
    const { id } = req.params;

    const candidate = await Candidate.findById(id);

    if (!candidate) {
      return res.status(404).json({ error: 'Candidate not found' });
    }

    res.status(200).json({
      success: true,
      candidate: candidate,
    });
  } catch (error) {
    console.error('[API] Get candidate error:', error);
    res.status(500).json({
      error: 'Failed to fetch candidate',
      details: error.message,
    });
  }
};

/**
 * Delete imported candidate
 * DELETE /api/candidates/imported/:id
 */
exports.deleteImportedCandidate = async (req, res) => {
  try {
    const { id } = req.params;

    const candidate = await Candidate.findByIdAndDelete(id);

    if (!candidate) {
      return res.status(404).json({ error: 'Candidate not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Candidate deleted successfully',
    });
  } catch (error) {
    console.error('[API] Delete candidate error:', error);
    res.status(500).json({
      error: 'Failed to delete candidate',
      details: error.message,
    });
  }
};

/**
 * Get search statistics
 * GET /api/candidates/search-stats
 */
exports.getSearchStats = async (req, res) => {
  try {
    const sourceStats = await Candidate.aggregate([
      {
        $group: {
          _id: '$source',
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);

    const total = await Candidate.countDocuments();

    res.status(200).json({
      success: true,
      totalCandidates: total,
      bySource: sourceStats,
      sources: sourceStats.map((s) => s._id),
    });
  } catch (error) {
    console.error('[API] Stats error:', error);
    res.status(500).json({
      error: 'Failed to fetch statistics',
      details: error.message,
    });
  }
};

/**
 * Match job with imported candidates
 * POST /api/candidates/match-job
 */
exports.matchJobWithCandidates = async (req, res) => {
  try {
    const { jobId, maxResults = 10 } = req.body;

    if (!jobId) {
      return res.status(400).json({ error: 'Job ID is required' });
    }

    // This would use the AI scoring service
    // For now, return candidates sorted by relevance

    const candidates = await Candidate.find({})
      .limit(maxResults)
      .sort({ relevanceScore: -1 });

    res.status(200).json({
      success: true,
      jobId: jobId,
      matchedCandidates: candidates,
      count: candidates.length,
    });
  } catch (error) {
    console.error('[API] Match error:', error);
    res.status(500).json({
      error: 'Matching failed',
      details: error.message,
    });
  }
};
