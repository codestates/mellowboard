const express = require('express');
const { query, body } = require("express-validator");
const validationError = require("../controllers/error");
const comment = require("../controllers/comment");

const router = express.Router();

const tempMiddleware = (_, res, next) => {
  res.locals.userId = 2;
  next();
}
/* GET users listing. */
// 댓글 조회 - 게시글의 댓글
router.get("/", 
  query("post_id").notEmpty().isInt(),
  query("page").default(1).isInt({min: 1}),
  query("size").default(100).isInt(),
  tempMiddleware,
  validationError,
  comment.get);

// 댓글 조회 - 내가 쓴 댓글
router.get("/mypage", 
  query("page").default(1).isInt({min: 1}),
  query("size").default(100).isInt(),
  tempMiddleware,
  validationError,
  comment.mine);

// 댓글 작성
router.post("/",
  body("post_id").notEmpty().isInt(),
  body("comment").notEmpty().isString(),
  validationError,
  tempMiddleware,
  comment.post
)

// 댓글 수정
router.patch("/",
  body("comment_id").notEmpty().isInt(),
  body("comment").notEmpty().isString(),
  validationError,
  tempMiddleware,
  comment.patch)

// 댓글 삭제
router.delete("/",
  body("comment_id").notEmpty().isInt(),
  validationError,
  tempMiddleware,
  comment.delete)

module.exports = router;
