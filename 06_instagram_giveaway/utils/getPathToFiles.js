const fs = require("fs").promises;
const path = require("path");

const getPathToFilesAsync = async (dirPath) => {
  try {
    const files = await fs.readdir(dirPath);
    return files.map((file) => path.join(dirPath, file));
  } catch (error) {
    throw error;
  }
};

module.exports = { getPathToFilesAsync };
