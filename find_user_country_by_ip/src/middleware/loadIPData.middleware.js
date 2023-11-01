const readCSVFile = require('../utils/readCSV');

let results = [];

const loadIPData = async (req, res, next) => {
  if (results.length === 0) {
    try {
      results = await readCSVFile();
    } catch (error) {
      console.error('Error reading CSV file:', error);
    }
  }

  req.db = results;
  next();
};

module.exports = loadIPData;
