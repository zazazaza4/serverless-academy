const fs = require("fs").promises;

const getUniqueWordsFromFile = async (filePath) => {
  try {
    const fileContent = await fs.readFile(filePath, "utf-8");
    const words = fileContent.split("\n");
    const uniqueWords = new Set(words);
    return Array.from(uniqueWords);
  } catch (err) {
    console.error(`Error reading file '${filePath}': ${err.message}`);
    return [];
  }
};

module.exports = {
  getUniqueWordsFromFile,
};
