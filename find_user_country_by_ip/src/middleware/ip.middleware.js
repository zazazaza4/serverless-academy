const ipToInt = require('../utils/ipToInt');

const getIP = (req, res, next) => {
  const userIp =
    request.headers['cf-connecting-ip'] ||
    request.headers['x-real-ip'] ||
    request.headers['x-forwarded-for'] ||
    request.socket.remoteAddress ||
    '';

  req.ip = userIp;
  req.userIP = ipToInt(userIp);
  next();
};

module.exports = getIP;
