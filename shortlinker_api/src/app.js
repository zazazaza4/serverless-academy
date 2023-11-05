const express = require('express');
const cors = require('cors');

const keys = require('./configs/keys');
const routes = require('./routes');
const logger = require('./utils/logger');
const connectDB = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use(routes);

app.listen(keys.port, () => {
  logger.log(`Server running on port ${keys.port}`);
});
