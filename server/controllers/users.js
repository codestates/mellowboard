/* GET users listing. */
// 회원정보 조회
module.exports = {
  get: (req, res) => {
    return res.status(200).send({
      "message" : "회원정보를 조회합니다.",
      "result"  : true,
      "userinfo":
        {
          "userid"   : "userid",
          "email"    : "email",
          "createdAt": "created time",
          "updatedAt": "updated time"
        }
    });
  },

// 회원정보 수정
  patch: (req, res) => {
    return res.status(200).send({
      "message" : "회원정보를 수정하였습니다.",
      "result"  : true,
      "userinfo":
        {
          "userid"   : "userid",
          "email"    : "email",
          "createdAt": "created time",
          "updatedAt": "updated time"
        }
    });
  },

// 회원정보 삭제
  del: (req, res) => {
    return res.status(200).send({
      "message": "회원정보를 삭제하였습니다.",
      "result" : true
    });
  }
};
