const express = require('express');

const router = express.Router();
const { query, body } = require("express-validator");
const post = require("../controllers/posts");
const validationError = require("../middleware/error");
const {isValidToken} = require("../middleware")

// 게시글 조회 - 전체 게시글
router.get("/", 
  isValidToken.getUserId,
  query("page").default(1).isInt({min: 1}),
  query("size").default(100).isInt(),
  validationError,
  post.get);

// 게시글 조회 - 내가 쓴 게시글
router.get("/mypage", 
  isValidToken.isValid,
  query("page").default(1).isInt({min: 1}),
  query("size").default(100).isInt(),
  validationError,
  post.mine);

// 게시글 작성
router.post("/",
  isValidToken.isValid,
  body("content", "글내용을 추가해주세요").notEmpty().isString(),
  body("background", "배경색을 선택해주세요").notEmpty().isString(),
  body("tags").default([]).isArray(),
  validationError,
  post.post
)

// 게시글 수정
router.patch("/",
  isValidToken.isValid,
  body("postId").notEmpty().isInt(),
  body("content").default("").isString(),
  body("background").default("").isString(),
  body("tags").default([]).isArray(),
  validationError,
  post.patch)

router.delete("/",
  isValidToken.isValid,
  body("postId").notEmpty().isInt(),
  validationError,
  post.delete
)


module.exports = router;