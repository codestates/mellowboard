/* GET users listing. */
// 회원정보 조회
const {User} = require("../models");
module.exports = {
  get: async (req, res) => {
    console.log(res.locals.userId);
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
      message: "잘못된 접근입니다."
    })
  },

// 회원정보 수정
  patch: async (req, res) => {
    if (res.locals.userId) {
      const editedUserInfoData = await User.update({
        "password": req.body.password,
        "email"   : req.body.email
      }, {
        where: {id: res.locals.userId}
      })
      if (!editedUserInfoData) return res.status(401).send({
        message: "아이디 없음. 잘못된 접근입니다."
      });
      console.log(editedUserInfoData);
      const userInfoData = await User.findOne({where: {id: res.locals.userId}});
      const userInfo = userInfoData.toJSON();
      return res.status(200).send({
        "message" : "회원정보를 수정하였습니다.",
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
      message: "잘못된 접근입니다."
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
      console.log('del', deletedUserInfoData);
      return res.status(200).send({
        "message": "회원정보를 삭제하였습니다.",
        "result" : true
      });
    }
    return res.status(401).send({
      message: "잘못된 접근입니다."
    })

  }
};
