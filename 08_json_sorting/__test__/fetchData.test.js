const axios = require('axios');

const { fetchData } = require('../services/api.service');
const { baseTestUrl } = require('../consts');

describe('fetchData function', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should fetch data successfully', async () => {
    const mockedAxios = jest.spyOn(axios, 'get');
    const responseData = { content: 'test', isDone: true };
    mockedAxios.mockResolvedValue({ data: responseData });

    const url = `${baseTestUrl}/test`;

    const result = await fetchData(url);

    expect(result).toEqual(responseData);
    expect(axios.get).toHaveBeenCalledTimes(1);
  });

  test('should throw an error after 3 failed attempts', async () => {
    const mockedAxios = jest.spyOn(axios, 'get');
    mockedAxios.mockRejectedValue('Failed to fetch data');

    const url = 'https://network.error.after.attempts.com';

    try {
      await fetchData(url, 3);
    } catch (error) {
      expect(error.message).toBe(`Failed to fetch data from ${url}`);
      expect(mockedAxios).toHaveBeenCalledTimes(3);
    }
  });
});
