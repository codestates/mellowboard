const express = require('express');
const { query, body } = require("express-validator");
const validationError = require("../middleware/error");
const comment = require("../controllers/comments");
const {isValidToken} = require("../middleware")

const router = express.Router();
// router.use(isValidToken);

/* GET users listing. */
// 댓글 조회 - 게시글의 댓글
router.get("/", 
  query("postId").notEmpty().isInt(),
  query("page").default(1).isInt({min: 1}),
  query("size").default(100).isInt(),
  validationError,
  isValidToken.getUserId,
  comment.get);

// 댓글 조회 - 내가 쓴 댓글
router.get("/mypage", 
  query("page").default(1).isInt({min: 1}),
  query("size").default(100).isInt(),
  validationError,
  isValidToken.isValid,
  comment.mine);

// 댓글 작성
router.post("/",
  body("postId").notEmpty().isInt(),
  body("comment").notEmpty().isString(),
  validationError,
  isValidToken.getUserId,
  comment.post
)

// 댓글 수정
router.patch("/",
  body("commentId").notEmpty().isInt(),
  body("comment").notEmpty().isString(),
  validationError,
  isValidToken.isValid,
  comment.patch)

// 댓글 삭제
router.delete("/",
  body("commentId").notEmpty().isInt(),
  validationError,
  isValidToken.isValid,
  comment.delete)

module.exports = router;
