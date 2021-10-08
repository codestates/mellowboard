var express = require('express');
var router = express.Router();
const users = require('../controllers/users');

router.get('/', users.get);
router.patch('/', users.patch);
router.delete('/', users.del);

module.exports = router;