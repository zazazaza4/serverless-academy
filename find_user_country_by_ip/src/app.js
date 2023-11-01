const express = require('express');
const cors = require('cors');
require('dotenv').config();

const locationRoute = require('./routes/location.route');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use('/', locationRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
