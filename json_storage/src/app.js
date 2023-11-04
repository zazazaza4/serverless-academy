const express = require('express');
const cors = require('cors');

const keys = require('./configs/keys');
const routes = require('./routes');
const logger = require('./utils/logger');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routes);

app.listen(keys.port, () => {
  logger.log(`Server running on port ${keys.port}`);
});