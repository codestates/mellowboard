var express = require('express');
var router = express.Router();
const posts = require("../controllers/posts");

router.get('/', posts.get);
router.post('/', posts.post);
router.get('/mypage', posts.mypage);
router.patch('/', posts.patch);
router.delete('/', posts.del);

module.exports = router;