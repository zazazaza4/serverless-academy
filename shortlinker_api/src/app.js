const express = require('express');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');

const keys = require('./configs/keys');
const routes = require('./routes');
const logger = require('./utils/logger');
const connectDB = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

app.use(mongoSanitize());
app.use(helmet());
app.use(xss());
app.use(hpp());
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100,
});
app.use(limiter);

connectDB();

app.use(routes);

app.listen(keys.port, () => {
  logger.log(`Server running on port ${keys.port}`);
});
