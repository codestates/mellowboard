var express = require('express');
// const { router } = require('./auth');
var router = express.Router();
const post = require("../controllers/post");

/* GET users listing. */

// 게시글 조회 - 전체 게시글
router.get("/", post.get);
router.post("/", post.post);







router.get('/', function (req, res, next) {
  res.status(200).send({
    "message": "게시글을 조회합니다.",
    "result" : true,
    "posts"  :
      [{
        "id"        : "id",
        "isMine"    : "boolean",
        "content"   : "content",
        "background": "background",
        "created_at": "created_at",
        "updated_at": "updated_at",
        "tag"       : ["tag1", "..."]
      }, "..."],
    "pages"  : {
      "total": "total",
      "size" : "size",
      "page" : "page"
    }
  });
});

// 게시글 조회 - 사용자가 작성한 게시글
router.get('/me', function (req, res, next) {
  res.status(200).send({
    "message": "게시글을 조회합니다.",
    "result" : true,
    "posts"  :
      [{
        "id"        : "id",
        "content"   : "content",
        "background": "background",
        "created_at": "created_at",
        "updated_at": "updated_at",
        "tag"       : ["tag", "..."]
      }, "..."],
    "pages"  : {
      "total": "total",
      "size" : "size",
      "page" : "page"
    }
  });
});

// 게시글 작성
router.post('/', function (req, res, next) {
  res.status(201).send({
    "message": "게시글을 작성했습니다.",
    "result" : true,
    "posts"  :
      {
        "id"        : "id",
        "content"   : "content",
        "background": "background",
        "created_at": "created_at",
        "updated_at": "updated_at",
        "tag"       : ["tag", "..."]
      },
  });
});

// 게시글 수정
router.patch('/', function (req, res, next) {
  res.status(200).send({
    "message": "게시글을 작성했습니다.",
    "result" : true,
    "posts"  :
      {
        "id"        : "id",
        "content"   : "content",
        "background": "background",
        "created_at": "created_at",
        "updated_at": "updated_at",
        "tag"       : ["tag", "..."]
      }
  });
  res.status(403).send({
    "message": "타인의 게시글은 수정할 수 없습니다."
  })
});

// 게시글 삭제
router.delete('/', function (req, res, next) {
  res.status(200).send({
    "message": "게시글을 삭제했습니다.",
    "result" : true
  });
  res.status(403).send({
    "message": "해당 게시글 삭제는 금지되어 있습니다."
  })
});

module.exports = router;
