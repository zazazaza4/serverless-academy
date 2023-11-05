module.exports = {
  app: {
    name: 'JSON_BASE',
    apiURL: '',
  },
  port: process.env.PORT || 5000,
  db: {
    url: process.env.MONGO_URL,
    name: process.env.MONGO_DB_NAME,
  },
};
