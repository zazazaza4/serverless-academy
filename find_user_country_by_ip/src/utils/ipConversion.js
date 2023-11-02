const ipToInt = (ip) => {
  return ip
    .split('.')
    .map(parseFloat)
    .reduce((total, part) => total * 256 + part);
};

function intToIP(num) {
  const octet1 = (num >>> 24) & 255;
  const octet2 = (num >>> 16) & 255;
  const octet3 = (num >>> 8) & 255;
  const octet4 = num & 255;
  return `${octet1}.${octet2}.${octet3}.${octet4}`;
}

module.exports = {
  ipToInt,
  intToIP,
};
