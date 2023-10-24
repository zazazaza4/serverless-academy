// Load Env
require("./libs/loadEnvFromFile");

const botToken = process.env.BOT_TOKEN;
const weatherToken = process.env.API_WEATHER_KEY;

const city = "Kharkiv";

const intervalEnum = {
  INTERVAL_3: 1,
  INTERVAL_6: 2,
};

const currencyEnum = {
  EUR: "EUR",
  USDT: "USDT",
};

const COMMANDS = {
  START: /\/start/,
  WEATHER: "/Погода",
  CURRENCY: "/Курс валют",
  USDT: "USDT",
  EUR: "EUR",
  PREVIOUS: "Попереднe меню",
  INTERVAL_3: "Кожні 3 години",
  INTERVAL_6: "Кожні 6 години",
  WIND: "Вітер",
};

module.exports = {
  botToken,
  weatherToken,
  city,
  intervalEnum,
  COMMANDS,
  currencyEnum,
};
