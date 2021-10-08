const {verify} = require('jsonwebtoken');
const {User} = require('../models');
module.exports = async (req, res, next) => {
  /*
  * 로그인 상태를 유지하는 middleware.
  * access token이 서버에서 발급한 것인지 확인한다.
  * ACCESS_SECRET이 맞는지 확인한다.
  * */
  const authorization = req.headers.authorization;
  const accessToken = authorization.split(' ')[1];
  const userId = verify(accessToken, process.env.ACCESS_SECRET).userId;
  const userInfo = (await User.findOne({
    where: {userId: userId}
  }));
  if (userInfo) res.locals.userId = userInfo.toJSON().id;
  next();
}