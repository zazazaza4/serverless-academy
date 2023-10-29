// Load Env
require('./libs/loadEnvFromFile');

const baseTestUrl = 'https://server-test-serverless-8.vercel.app';

const urls = [
  'https://jsonbase.com/sls-team/json-793',
  'https://jsonbase.com/sls-team/json-955',
  'https://jsonbase.com/sls-team/json-231',
  'https://jsonbase.com/sls-team/json-931',
  'https://jsonbase.com/sls-team/json-93',
  'https://jsonbase.com/sls-team/json-342',
  'https://jsonbase.com/sls-team/json-770',
  'https://jsonbase.com/sls-team/json-491',
  'https://jsonbase.com/sls-team/json-281',
  'https://jsonbase.com/sls-team/json-718',
  'https://jsonbase.com/sls-team/json-310',
  'https://jsonbase.com/sls-team/json-806',
  'https://jsonbase.com/sls-team/json-469',
  'https://jsonbase.com/sls-team/json-258',
  'https://jsonbase.com/sls-team/json-516',
  'https://jsonbase.com/sls-team/json-79',
  'https://jsonbase.com/sls-team/json-706',
  'https://jsonbase.com/sls-team/json-521',
  'https://jsonbase.com/sls-team/json-350',
  'https://jsonbase.com/sls-team/json-64',
];

const testUrls = [
  'https://server-test-serverless-8.vercel.app/type1',
  'https://server-test-serverless-8.vercel.app/type2',
  'https://server-test-serverless-8.vercel.app/type3',
  'https://server-test-serverless-8.vercel.app/type4',
  'https://server-test-serverless-8.vercel.app/type5',
  'https://server-test-serverless-8.vercel.app/type6',
  'https://server-test-serverless-8.vercel.app/type7',
  'https://server-test-serverless-8.vercel.app/type8',
  'https://server-test-serverless-8.vercel.app/type9',
  'https://server-test-serverless-8.vercel.app/type10',
  'https://server-test-serverless-8.vercel.app/type11',
  'https://server-test-serverless-8.vercel.app/type12',
  'https://server-test-serverless-8.vercel.app/type13',
  'https://server-test-serverless-8.vercel.app/type14',
  'https://server-test-serverless-8.vercel.app/type15',
  'https://server-test-serverless-8.vercel.app/type16',
  'https://server-test-serverless-8.vercel.app/type17',
  'https://server-test-serverless-8.vercel.app/type18',
  'https://server-test-serverless-8.vercel.app/type19',
  'https://server-test-serverless-8.vercel.app/type20',
];

if (process.env.NODE_ENV === 'production') {
  module.exports = { urls };
} else {
  module.exports = { urls: testUrls, baseTestUrl };
}
