const { user } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = (req, res) => {
  let userInfo;
  try{
    userInfo = isAuthorized(req);
  }
  catch(err) {
    return res.status(401).send({ data: null, message: 'not authorized' });
  }
  return res.json({
    data: {userInfo}
  })
};
