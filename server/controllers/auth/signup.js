const { user } = require('../../models');
const { generateAccessToken } = require('../tokenFunctions');

module.exports = async (req, res) => {
  // TODO: 회원가입 및 사용자 생성 로직을 작성하세요.
  if(!req.body || !req.body.email || !req.body.password || !req.body.username || !req.body.mobile){
    return res.status(422).send("insufficient parameters supplied");
  }
  const [userInfo, created] = await user.findOrCreate({
    where: {email: req.body.email},
    defaults: req.body
  });
  if(!created){
    return res.status(409).send("email exists");
  }

  userInfo.save();
  const accessToken = generateAccessToken(userInfo.toJSON());
  res.cookie("jwt", accessToken, {SameStie: "Strict", httpOnly: true, secure: false});
  return res.status(201).json({message: "ok"});
};
