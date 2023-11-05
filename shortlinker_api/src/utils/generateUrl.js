const { customAlphabet } = require('nanoid');

const generateUrl = (n = 6) => {
  const nanoid = customAlphabet(
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890',
    n
  );

  return nanoid();
};

module.exports = generateUrl;
