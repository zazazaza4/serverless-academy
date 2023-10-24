// Load Env
require("./libs/loadEnvFromFile");

const botToken = process.env.BOT_TOKEN;
const weatherToken = process.env.API_WEATHER_KEY;

const city = "Kharkiv";
const intervalEnum = {
  INTERVAL_3: 1,
  INTERVAL_6: 2,
};
const COMMANDS = {
  START: /\/start/,
  FORECAST: `Forecast in ${city}`,
  INTERVAL_3: "At intervals of 3 hours",
  INTERVAL_6: "At intervals of 6 hours",
};

module.exports = { botToken, weatherToken, city, intervalEnum, COMMANDS };
