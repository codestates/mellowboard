const { sign, verify } = require('jsonwebtoken');

module.exports = {
  generateAccessToken: (data) => sign(data, process.env.ACCESS_SECRET, {expiresIn: "2h"}),
  generateRefreshToken: (data) => sign(data, process.env.REFRESH_SECRET, {expiresIn: "30d"}),
  sendTokenInCookie: (res, accessToken) => {
    res.cookie("jwt", accessToken, { SameSite: "Strict", httpOnly: true, secure: false })
  },
  isAuthorized: (req) => verify(req.cookies.jwt, process.env.REFRESH_SECRET)
};
