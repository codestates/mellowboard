const bcrypt = require('bcrypt')

/* GET users listing. */
// 회원정보 조회
const {User} = require("../models");
const {generateAccessToken} = require("./token_functions");
module.exports = {
  get: async (req, res) => {
    if (res.locals.userId) {
      const userInfoData = await User.findOne({where: {id: res.locals.userId}});
      const userInfo = userInfoData.toJSON();
      return res.status(200).send({
        "message" : "회원정보를 조회합니다.",
        "result"  : true,
        "userinfo":
          {
            "userId"   : userInfo.userId,
            "email"    : userInfo.email,
            "createdAt": userInfo.createdAt,
            "updatedAt": userInfo.updatedAt
          }
      });
    }
    return res.status(401).send({
      message: "잘못된 접근입니다.",
      result: false
    })
  },

// 회원정보 수정
  patch: async (req, res) => {
    if (res.locals.userId) {
      const encryptedPassword = bcrypt.hashSync(req.body.password, 10);
      const editedUserInfoData = await User.update({
        email   : req.body.email,
        password: encryptedPassword
      }, {
        where: {id: res.locals.userId}
      })
      if (!editedUserInfoData) return res.status(401).send({
        message: "아이디 없음. 잘못된 접근입니다.",
        result : false
      });
      const userInfoData = await User.findOne({where: {id: res.locals.userId}});
      const userInfo = userInfoData.toJSON();
      const accessToken = generateAccessToken(userInfo);
      return res.status(200).send({
        "message"    : "회원정보를 수정하였습니다.",
        "result"     : true,
        "userinfo"   :
          {
            "userId"   : userInfo.userId,
            "email"    : userInfo.email,
            "createdAt": userInfo.createdAt,
            "updatedAt": userInfo.updatedAt
          },
        "accessToken": accessToken
      });
    }
    return res.status(401).send({
      message: "잘못된 접근입니다.",
      result : false
    })
  },

// 회원정보 삭제
  del: async (req, res) => {
    if (res.locals.userId) {
      const deletedUserInfoData = await User.destroy({
        where: {
          id: res.locals.userId
        }
      });
      if(!deletedUserInfoData) return res.status(401).send({
        message: "잘못된 접근입니다.",
        result: false
      })

      return res.status(200).send({
        "message": "회원정보를 삭제하였습니다.",
        "result" : true
      });

    }
    return res.status(401).send({
      message: "잘못된 접근입니다.",
      result: false
    })

  }
};
