const axios = require('axios');
const NodeCache = require('node-cache');

const { currencyEnum } = require('../consts');

const currencyCache = new NodeCache({ stdTTL: 300 });

const Banks = {
  MONOBANK: {
    url: 'https://api.monobank.ua/bank/currency',
    name: 'MonoBank',
    action([USD, EUR]) {
      return {
        USD: {
          rateBuy: USD.rateBuy,
          rateSell: USD.rateSell,
        },
        EUR: {
          rateBuy: EUR.rateBuy,
          rateSell: EUR.rateSell,
        },
      };
    },
  },
  PRIVATBANK: {
    name: 'Privatbank',
    url: 'https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=5',
    action(data) {
      return data.reduce((acc, currency) => {
        if (currencyEnum[currency.ccy]) {
          acc[currency.ccy] = {
            rateBuy: currency.buy,
            rateSell: currency.sale,
          };
        }
        return acc;
      }, {});
    },
  },
};

const fetchCurrency = async ({ name, url, action }) => {
  try {
    const { data } = await axios.get(url);

    const currencyData = {
      bank: name,
      ...action(data),
    };

    currencyCache.set(`${name}Data`, currencyData);

    return currencyData;
  } catch (error) {
    const cachedData = currencyCache.get(`${name}Data`);

    if (cachedData) {
      return cachedData;
    }
    throw new Error(`Error fetching or accessing cached data for ${name}`);
  }
};

const formatCurrency = (type, ...currency) => {
  if (currency.length > 0) {
    return currency.reduce((acc, data) => {
      const { rateBuy, rateSell } = data[type];
      return (
        acc +
        `${data.bank}: Купівля/Продаж: ${Number(rateBuy).toFixed(2)}/${Number(
          rateSell
        ).toFixed(2)} ${type} \n`
      );
    }, '');
  }
  return 'Недостатньо даних для відображення валюти.';
};

const getCurrency = async (currency) => {
  try {
    const dates = await Promise.all([
      fetchCurrency(Banks.MONOBANK),
      fetchCurrency(Banks.PRIVATBANK),
    ]);

    return formatCurrency(currency, ...dates);
  } catch (error) {
    console.error(error);
    return 'На жаль, наразі не вдалося отримати інформацію.';
  }
};

module.exports = {
  getCurrency,
};
