var express = require('express');
var router = express.Router();

/* GET users listing. */
// 로그아웃
router.get('/logout', function (req, res, next) {
  res.status(301).send('Moved Permanently');
});

// ID 중복검사
router.post('/dup', function (req, res, next) {
  res.status(200).send({
    "message": "사용가능한 아이디 입니다. or 중복된 아이디 입니다.",
    "result" : true
  });
});

// 회원가입
router.post('/signup', function (req, res, next) {
  res.status(201).send({
    "message"     : "회원가입을 성공했습니다.",
    "result"      : true,
    "userinfo"    :
      {
        "userid"   : "userid",
        "email"    : "email",
        "createdAt": "created time",
        "updatedAt": "updated time"
      },
    "accessToken" : "accessToken",
    "refreshToken": "refreshToken"
  });
  res.status(400).send({
    "message": "회원가입을 실패했습니다.",
    "result" : false
  })
});

// 로그인
router.post('/signin', function (req, res, next) {
  res.status(200).send({
    "message"    : "로그인을 성공했습니다.",
    "result"     : true,
    "userinfo"   :
      {
        "userid"   : "userid",
        "email"    : "email",
        "createdAt": "created time",
        "updatedAt": "updated time"
      },
    "accessToken": "accessToken"
  });
  res.status(401).send({
    "message": "로그인에 실패했습니다.",
    "result" : false
  })
});

// 토큰 갱신
router.post('/refresh', function (req, res, next) {
  res.status(200).send({
    "message"    : "access token 발급이 성공했습니다.",
    "result"     : true,
    "userinfo"   :
      {
        "userid"   : "userid",
        "email"    : "email",
        "createdAt": "created time",
        "updatedAt": "updated time"
      },
    "accessToken": "accessToken"
  });
});

module.exports = router;
