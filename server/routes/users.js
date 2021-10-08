const express = require('express');
const { User } = require("../models");

const router = express.Router();
// User.
// console.log(User.json());
/* GET users listing. */
// 회원정보 조회
router.get('/', function(req, res, next) {
  res.status(200).send({
    "message" : "회원정보를 조회합니다.",
    "result"  : true,
    "userinfo" :
      {
        "userid" : "userid",
        "email"  : "email",
        "createdAt": "created time",
        "updatedAt": "updated time"
      }
  });
});

// 회원정보 수정
router.patch('/', function(req, res, next) {
  res.status(200).send({
    "message" : "회원정보를 수정하였습니다.",
    "result"  : true,
    "userinfo" :
      {
        "userid" : "userid",
        "email"  : "email",
        "createdAt": "created time",
        "updatedAt": "updated time"
      }
  });
});

// 회원정보 삭제
router.delete('/', function(req, res, next) {
  res.status(200).send({
    "message" : "회원정보를 삭제하였습니다.",
    "result"  : true
  });
});

module.exports = router;
