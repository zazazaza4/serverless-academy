const express = require('express');
const cors = require('cors');
require('dotenv').config();

const keys = require('./configs/keys');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.listen(keys.port, () => {
  console.log(`Server running in ${keys.app.mode} mode on port ${keys.port}`);
});
