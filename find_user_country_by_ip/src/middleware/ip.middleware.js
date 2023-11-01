const ipToInt = require('../utils/ipToInt');

const getIP = (req, res, next) => {
  const userIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  req.ip = userIp;
  req.userIP = ipToInt(userIp);
  next();
};

module.exports = getIP;
