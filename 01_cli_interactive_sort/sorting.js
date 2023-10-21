const sortWordsByName = (words) => {
  return [...words].sort((a, b) =>
    a.toLowerCase().localeCompare(b.toLowerCase())
  );
};

const sortDigitsAsc = (digits) => {
  return [...digits].sort((a, b) => Number(a) - Number(b));
};

const sortDigitsDes = (digits) => {
  return [...digits].sort((a, b) => Number(b) - Number(a));
};

const sortWordsByLength = (words) => {
  return [...words].sort((a, b) => a.length - b.length);
};

const getUniqueWords = (words) => {
  return Array.from(new Set(words));
};

const getUniqueValues = (words, digits) => {
  const setValues = new Set([...words, ...digits]);
  return Array.from(setValues);
};

module.exports = {
  sortWordsByName,
  sortDigitsAsc,
  sortDigitsDes,
  sortWordsByLength,
  getUniqueWords,
  getUniqueValues,
};
