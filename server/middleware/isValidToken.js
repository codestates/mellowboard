const {verify} = require('jsonwebtoken');

module.exports = { 
  isValid: async (req, res, next) => {
    /*
    * 로그인 상태를 유지하는 middleware.
    * access token이 서버에서 발급한 것인지 확인한다.
    * ACCESS_SECRET이 맞는지 확인한다.
    * */

    const {authorization} = req.headers;
    let userId;
    try{
    const accessToken = authorization.split(' ')[1];
      userId = await verify(accessToken, process.env.ACCESS_SECRET).id;
    }catch(err){
      return res.status(401).json({
        message: "토큰이 올바르지 않습니다.",
        result: false
      })
    }

    // const userInfo = await User.findByPk(userId);
    res.locals.userId = userId;
    next();
  },
  getUserId: async(req, res, next) => {
    const {authorization} = req.headers;
    let userId;
    try{
    const accessToken = authorization.split(' ')[1];
      userId = await verify(accessToken, process.env.ACCESS_SECRET).id;
    }catch(e) {
      userId = 0;
    }
  
    res.locals.userId = parseInt(userId, 10);
    next();
  }
}