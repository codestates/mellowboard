const express = require('express');

const router = express.Router();
const { query, body } = require("express-validator");
const post = require("../controllers/post");
const validationError = require("../controllers/error");

const tempMiddleware = (req, res, next) => {
  res.locals.userId = 2;
  next();
}

// 게시글 조회 - 전체 게시글
router.get("/", 
  query("page").default(1).isInt({min: 1}),
  query("size").default(100).isInt(),
  tempMiddleware,
  validationError,
  post.get);

// 게시글 조회 - 내가 쓴 게시글
router.get("/mypage", 
  query("page").default(1).isInt({min: 1}),
  query("size").default(100).isInt(),
  tempMiddleware,
  validationError,
  post.mine);

// 게시글 작성
router.post("/",
  body("content", "글내용을 추가해주세요").notEmpty().isString(),
  body("background", "배경색을 선택해주세요").notEmpty().isString(),
  body("tags").default([]).isArray(),
  validationError,
  tempMiddleware,
  post.post
)

// 게시글 수정
router.patch("/",
  body("post_id").notEmpty().isInt(),
  body("content").default("").isString(),
  body("background").default("").isString(),
  body("tags").default([]).isArray(),
  validationError,
  tempMiddleware,
  post.patch)

router.delete("/",
  body("post_id").notEmpty().isInt(),
  validationError,
  tempMiddleware,
  post.delete
)


module.exports = router;