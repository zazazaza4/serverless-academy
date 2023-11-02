const { ipToInt } = require('../utils/ip/ipConversion');

const getIP = (req, res, next) => {
  const userIp =
    req.headers['x-forwarded-for'] ||
    req.socket.remoteAddress ||
    req.headers['x-real-ip'] ||
    req.headers['cf-connecting-ip'] ||
    '';

  req.userIP = userIp;
  req.userIntIP = ipToInt(userIp);

  next();
};

module.exports = getIP;
