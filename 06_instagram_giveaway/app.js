const path = require("path");

const { getPathToFilesAsync } = require("./utils/getPathToFiles");
const { getUniqueWordsFromFile } = require("./utils/getUniqueWordsFromFile");

const getUniqueValuesFromFiles = async () => {
  const memory = new Map();

  const dirPath = path.join(__dirname, "words");
  const wordsPath = await getPathToFilesAsync(dirPath);
  const wordsPromise = wordsPath.map(async (wordPath) => {
    const uniqueWords = await getUniqueWordsFromFile(wordPath);
    return uniqueWords;
  });

  const uniqueWordsArrays = await Promise.all(wordsPromise);

  for (const uniqueWords of uniqueWordsArrays) {
    for (const word of uniqueWords) {
      const count = memory.get(word) || 0;
      memory.set(word, count + 1);
    }
  }

  return { memory, fileCount: wordsPath.length };
};

const uniqueValues = (data) => {
  return data.size;
};

const existInAllFiles = (array, fileCount) => {
  return array.filter((count) => count === fileCount).length;
};

const existInAtleastTen = (array, atLeast = 10) => {
  return array.filter((count) => count >= atLeast).length;
};

const start = async () => {
  console.time();
  const { memory, fileCount } = await getUniqueValuesFromFiles();
  const arrayCount = Array.from(memory.values());

  console.log(`Unique Values: ${uniqueValues(memory)}`); // returns 129240
  console.log(
    `Words existing in all files: ${existInAllFiles(arrayCount, fileCount)}`
  ); // returns 441
  console.log(
    `Words existing in at least 10 files: ${existInAtleastTen(arrayCount)}`
  ); // returns 73245

  console.timeEnd(); // 2.215s
};

start();
