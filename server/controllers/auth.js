const {User} = require('../models');
const {generateAccessToken, sendTokenInCookie, generateRefreshToken, isAuthorized} = require('./token_functions');
const bcrypt = require('bcrypt');

// 변수 이름 변경
/* GET users listing. */
// 로그아웃 - 완료
module.exports = {
  logout: (req, res) => {
    res.clearCookie("jwt");
    return res.status(301).send('Moved Permanently');
  },

// ID 중복검사 - 완료
  dup: async (req, res) => {
    const isValidUser = await User.findOne({
      where: {email: req.body.email}
    });
    if (isValidUser) {
      return res.status(200).send({
        "message": "중복된 아이디 입니다.",
        "result" : true
      });
    } else {
      return res.status(200).send({
        "message": "사용가능한 아이디 입니다.",
        "result" : true
      });
    }
  },

// 회원가입 - 완료
  signup: async (req, res) => {
    if (!req.body || !req.body.email || !req.body.password || !req.body.userId) {
      return res.status(400).send({
        "message": "회원가입을 실패했습니다.",
        "result" : false
      })
    }
    // encrypted password
    const saltRounds = 10;
    const encryptedPassword = await bcrypt.hash(req.body.password, saltRounds);
    const encryptedUserInfo = {
      userId : req.body.userId,
      email   : req.body.email,
      password: encryptedPassword
    };
    // end encrypted user info

    // create record in DB
    const [userInfo, created] = await User.findOrCreate({
      where   : {email: req.body.email},
      defaults: encryptedUserInfo
    });

    if (!created) {
      return res.status(400).send({
        "message": "회원가입을 실패했습니다.",
        "result" : false
      })
    }
    userInfo.save();
    const accessToken = generateAccessToken(userInfo.toJSON());
    sendTokenInCookie(res, generateRefreshToken(userInfo.toJSON()));
    return res.status(201).send({
      "message"    : "회원가입을 성공했습니다.",
      "result"     : true,
      "userinfo"   :
        {
          "userId"  : userInfo.dataValues.userId,
          "email"    : userInfo.dataValues.email,
          "createdAt": userInfo.dataValues.createdAt,
          "updatedAt": userInfo.dataValues.updatedAt
        },
      "accessToken": accessToken
    });
  },

// 로그인 - 완료
  signin: async (req, res) => {
    // 가입한 유저인지 확인
    const userInfo = await User.findOne({where: {userId: req.body.userId}});
    if (!userInfo) {
      return res.status(401).send({
        "message": "로그인에 실패했습니다.",
        "result" : false
      })
    }

    // 비밀번호가 맞는지 확인
    const hash = userInfo.toJSON().password;
    const isValidPassword = await bcrypt.compare(req.body.password, hash);
    if (!isValidPassword) {
      return res.status(401).send({
        "message": "로그인에 실패했습니다.",
        "result" : false
      })
    }

    // generate accessToken & declare accessToken
    const accessToken = generateAccessToken(userInfo.toJSON());
    // send refresh token
    sendTokenInCookie(res, generateRefreshToken(userInfo.toJSON()));
    return res.status(200).json({
      "message"    : "로그인을 성공했습니다.",
      "result"     : true,
      "userinfo"   :
        {
          "userId"  : userInfo.dataValues.userId,
          "email"    : userInfo.dataValues.email,
          "createdAt": userInfo.dataValues.createdAt,
          "updatedAt": userInfo.dataValues.updatedAt
        },
      "accessToken": accessToken
    });
  },

// 토큰 갱신 - 완료
  refresh: async (req, res) => {
    let userInfo;
    try {
      userInfo = isAuthorized(req);
    } catch (err) {
      return res.status(401).send({data: null, message: 'not authorized'});
    }

    const isValidUser = await User.findOne({
      where: {email: userInfo.email}
    });

    if (!isValidUser) {
      return res.status(401).send({
        "message": "토큰 갱신에 실패했습니다. 로그아웃 이후 다시 로그인 해주세요.",
        "result" : false
      });
    } else {
      const accessToken = generateAccessToken(userInfo.toJSON());
      return res.status(200).send({
        "message"    : "access token 발급이 성공했습니다.",
        "result"     : true,
        "userinfo"   :
          {
            "userId"  : userInfo.dataValues.userId,
            "email"    : userInfo.dataValues.email,
            "createdAt": userInfo.dataValues.createdAt,
            "updatedAt": userInfo.dataValues.updatedAt
          },
        "accessToken": accessToken
      });
    }
  }
};
