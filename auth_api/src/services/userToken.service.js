const jwt = require('jsonwebtoken');

const keys = require('../configs/keys');
const pool = require('../db');

class TokenService {
  async generateTokens(user) {
    try {
      const payload = { id: user.id };

      const accessToken = jwt.sign(payload, keys.jwt.secretAccess, {
        expiresIn: keys.jwt.accessLife,
      });
      const refreshToken = jwt.sign(payload, keys.jwt.secretRefresh);

      const query =
        'INSERT INTO usersToken(user_id, token) VALUES ($1, $2) RETURNING *';
      const params = [user.id, refreshToken];

      await pool.query(query, params);

      return { accessToken, refreshToken };
    } catch (error) {
      throw new Error(`Error fetching user: ${error.message}`);
    }
  }

  verifyToken(token) {
    try {
      return jwt.verify(token, keys.jwt.secretAccess);
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}

module.exports = new TokenService();
