/**
 * Public Candidate Search Routes
 * Routes for searching and importing candidates from public sources
 */

const express = require('express');
const publicSearchController = require('../controllers/publicSearchController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

/**
 * Public search endpoints (no auth required for basic search)
 */

// Search across all public sources
router.get('/search-public', publicSearchController.searchPublicProfiles);

// Search specific source (GitHub, StackOverflow, etc.)
router.get('/search-source/:source', publicSearchController.searchBySource);

// Get search statistics
router.get('/search-stats', publicSearchController.getSearchStats);

/**
 * Protected endpoints (auth required)
 */

// Import candidate from search result
router.post(
  '/import-from-search',
  authMiddleware,
  publicSearchController.importCandidateFromSearch
);

// Get all imported candidates
router.get('/imported', authMiddleware, publicSearchController.getImportedCandidates);

// Get specific imported candidate
router.get('/imported/:id', authMiddleware, publicSearchController.getImportedCandidateById);

// Delete imported candidate
router.delete(
  '/imported/:id',
  authMiddleware,
  publicSearchController.deleteImportedCandidate
);

// Match job with imported candidates
router.post(
  '/match-job',
  authMiddleware,
  publicSearchController.matchJobWithCandidates
);

module.exports = router;
