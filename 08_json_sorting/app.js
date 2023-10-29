const { fetchData } = require('./services/api.service');
const { findValueOfKey } = require('./utils/dataProcessing');
const { urls } = require('./consts');

const fetchAndProcessURLData = async (searching, urls) => {
  const total = { true: 0, false: 0, fail: 0 };

  const promises = urls.map(async (url) => {
    try {
      const data = await fetchData(url);
      const isFound = findValueOfKey(data, searching);

      if (isFound === null) {
        throw new Error(`This object does not contain a ${searching}`);
      }

      total[isFound]++;
      return `[Success] ${url}: isDone - ${isFound}`;
    } catch (error) {
      total.fail++;
      return `[Fail] ${url}: The endpoint is unavailable`;
    }
  });

  const list = await Promise.all(promises);

  return {
    list,
    total,
  };
};

const start = async () => {
  try {
    const searching = 'isDone';
    const { list, total } = await fetchAndProcessURLData(searching, urls);

    list.forEach((result) => {
      console.log(result);
    });

    console.log(`
        Found True values: ${total.true},
        Found False values: ${total.false},
        Found Fail: ${total.fail},
    `);
  } catch (error) {
    console.error('An error occurred while processing the API list:', error);
  }
};

start();
