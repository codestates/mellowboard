const { user } = require('../../models');
const { Users } = require('../../__tests__/fixtures/model');
const { generateAccessToken, sendAccessToken } = require('../tokenFunctions');

module.exports = async (req, res) => {
  // TODO: 로그인 정보를 통해 사용자 인증 후 토큰 전달
  const userInfo = await user.findOne({where: {email: req.body.email, password: req.body.password}});
  if(!userInfo) return res.status(404).send("invalid user");

  sendAccessToken(res, generateAccessToken(userInfo.toJSON()));
  return res.json({message: "ok"});
};
