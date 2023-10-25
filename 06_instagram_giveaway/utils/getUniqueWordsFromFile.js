const fs = require("fs").promises;

const getUniqueWordsFromFile = async (filePath) => {
  try {
    const fileContent = await fs.readFile(filePath, "utf-8");
    const lines = fileContent.split("\n");
    const uniqueWords = new Set();

    for (const word of lines) {
      uniqueWords.add(word);
    }

    return Array.from(uniqueWords);
  } catch (err) {
    console.error(`Error reading file '${filePath}': ${err.message}`);
    return [];
  }
};

module.exports = {
  getUniqueWordsFromFile,
};
