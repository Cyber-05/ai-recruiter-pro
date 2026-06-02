const express = require('express');
const { signup, verifyOTP, resendOTP, login, logout } = require('../controllers/authController');

const router = express.Router();

router.post('/signup', signup);
router.post('/verify-otp', verifyOTP);
router.post('/resend-otp', resendOTP);
router.post('/login', login);
router.post('/logout', logout);

module.exports = router;
