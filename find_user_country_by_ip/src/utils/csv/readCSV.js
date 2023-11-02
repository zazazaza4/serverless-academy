const csv = require('csv-parser');
const fs = require('fs');

async function readCSVFile() {
  const results = [];

  return new Promise((resolve, reject) => {
    const stream = fs.createReadStream('src/db/ip_location.csv');
    stream
      .pipe(csv(['from', 'to', 'short', 'country']))
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
}

module.exports = readCSVFile;
