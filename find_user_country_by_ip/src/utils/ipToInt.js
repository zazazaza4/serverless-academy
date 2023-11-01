const ipToInt = (ip) => {
  return ip
    .split('.')
    .map(parseFloat)
    .reduce((total, part) => total * 256 + part);
};

module.exports = ipToInt;
