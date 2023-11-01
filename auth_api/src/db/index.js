const { Pool } = require('pg');
const keys = require('../configs/keys');

const pool = new Pool({
  ...keys.db,
  max: 5,
});

module.exports = pool;
