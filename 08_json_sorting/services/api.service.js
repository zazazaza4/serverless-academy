const axios = require('axios');

const fetchData = async (url, attempts = 3) => {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    if (attempts > 1) {
      return await fetchData(url, attempts - 1);
    }
    throw new Error(`Failed to fetch data from ${url}`);
  }
};

module.exports = {
  fetchData,
};
