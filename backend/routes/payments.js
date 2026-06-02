const express = require('express');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// Placeholder routes
router.get('/', authMiddleware, (req, res) => {
  res.json({ success: true, payments: [] });
});

router.post('/create-checkout-session', authMiddleware, (req, res) => {
  res.json({ success: true, sessionId: 'cs_test_' + Math.random().toString(36).substring(7) });
});

module.exports = router;
