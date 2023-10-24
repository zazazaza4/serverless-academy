const axios = require("axios");
const NodeCache = require("node-cache");

const currencyCache = new NodeCache({ stdTTL: 300 });

const getCurrency = async (type) => {
  try {
    const currencyFetched = await fetchCurrency(type);

    return formatCurrency(currencyFetched, type);
  } catch (error) {
    const cachedData = currencyCache.get("currencyData");

    if (cachedData && cachedData[type]) {
      const currency = cachedData[type];
      return formatCurrency(currency, type);
    } else {
      return "На жаль, наразі не вдалося отримати інформацію.";
    }
  }
};

const formatCurrency = (currency, type) => {
  const { rateBuy, rateSell } = currency;

  return `Купівля/Продаж: ${rateBuy}/${rateSell} ${type}`;
};

const fetchCurrency = async (type) => {
  try {
    const { data } = await axios.get("https://api.monobank.ua/bank/currency");

    const currencyData = {
      USDT: {
        rateBuy: data[0].rateBuy,
        rateSell: data[0].rateSell,
      },
      EUR: {
        rateBuy: data[1].rateBuy,
        rateSell: data[1].rateSell,
      },
    };

    currencyCache.set("currencyData", currencyData);

    return currencyData[type];
  } catch (error) {
    throw new Error(`Failed to fetch currency data: ${error.message}`);
  }
};

module.exports = {
  getCurrency,
};
