const { sign, verify } = require('jsonwebtoken');

module.exports = {
  generateAccessToken: (data) => {
    delete data.password;
    return sign(data, process.env.ACCESS_SECRET, {expiresIn: "2h"});
  },
  generateRefreshToken: (data) => {
    delete data.password;
    return sign(data, process.env.REFRESH_SECRET, {expiresIn: "2h"});
  },
  sendTokenInCookie: (res, accessToken) => {
    res.cookie("jwt", accessToken, { SameSite: "Strict", httpOnly: true, secure: false });
  },
  isAuthorized: (req) => {
    return verify(req.cookies.jwt, process.env.REFRESH_SECRET);
  }
};
