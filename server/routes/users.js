const express = require('express');
const users = require('../controllers/users');
const isValidToken = require("../middleware/isValidToken");

const router = express.Router();

router.use(isValidToken.isValid);
router.get('/', users.get);
router.patch('/', users.patch);
router.delete('/', users.del);

module.exports = router;