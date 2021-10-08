var express = require('express');
var router = express.Router();
const comments = require('../controllers/comments');

router.get('/', comments.get);
router.get('/mypage', comments.mypage);
router.post('/', comments.post);
router.patch('/', comments.patch);
router.delete('/', comments.del);

module.exports = router;