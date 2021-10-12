const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth');

// routes
router.get('/logout', auth.logout);
router.get('/overlap', auth.dup);
router.post('/signup', auth.signup);
router.post('/signin', auth.signin);
router.post('/refresh', auth.refresh);

module.exports = router;