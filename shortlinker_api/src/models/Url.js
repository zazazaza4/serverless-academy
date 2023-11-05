const mongoose = require('mongoose');

const UrlSchema = new mongoose.Schema({
  origUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: Date.now,
  },
});

module.exports = mongoose.model('Url', UrlSchema);
