module.exports = {
  app: {
    name: 'Auth API',
    apiURL: '',
    mode: process.env.NODE_ENV,
  },
  port: process.env.PORT || 5000,
  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD || '',
    port: Number(process.env.DB_PORT),
  },
  jwt: {
    secretAccess: process.env.ACCESS_TOKEN_PRIVATE_KEY,
    secretRefresh: process.env.REFRESH_TOKEN_PRIVATE_KEY,
    accessLife: '1h',
  },
};
