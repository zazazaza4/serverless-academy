const mongoose = require('mongoose');
const keys = require('../configs/keys');

const logger = require('../utils/logger');

const connectDB = async () => {
  try {
    await mongoose.connect(keys.db.url, { dbName: keys.db.name });
    logger.log('Database Connected');
  } catch (err) {
    logger.error(err.message);
  }
};

module.exports = connectDB;
