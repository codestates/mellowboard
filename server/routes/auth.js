var express = require('express');
var router = express.Router();
const auth = require('../controllers/auth');
const isValidToken = require('../middleware/isValidToken')

// routes
// router.get('/logout', 'middleware', auth.logout);
router.get('/logout', isValidToken, auth.logout);
router.get('/overlap', auth.dup);
router.post('/signup', auth.signup);
router.post('/signin', auth.signin);
router.post('/refresh', auth.refresh);

module.exports = router;