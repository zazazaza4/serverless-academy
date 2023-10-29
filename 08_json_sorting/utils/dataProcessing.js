const findValueOfKey = (obj, keyToFind) => {
  if (obj === null || typeof obj !== 'object') {
    return null;
  }

  for (const [key, value] of Object.entries(obj)) {
    if (key === keyToFind) {
      return value;
    }

    if (typeof value === 'object') {
      const isFound = findValueOfKey(value, keyToFind);
      if (isFound !== null) {
        return isFound;
      }
    }
  }

  return null;
};

module.exports = {
  findValueOfKey,
};
