var express = require('express');
var router = express.Router();
const auth = require('../controllers/auth');

router.get('/logout', auth.logout);
router.post('/siginup', auth.signup);
router.post('/siginin', auth.signin);
router.post('/refresh', auth.refresh);

module.exports = router;