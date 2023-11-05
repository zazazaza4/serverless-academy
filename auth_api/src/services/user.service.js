const bcrypt = require('bcrypt');

const { APIError } = require('../constants/errors');
const pool = require('../db');

class UserService {
  async getMe(id) {
    const queryText = 'SELECT * FROM users WHERE id = $1';
    const params = [id];

    const user = await pool.query(queryText, params);
    return user.rows[0];
  }

  async create(email, password) {
    const queryFinding = 'SELECT * FROM users WHERE email = $1';
    const existingUser = await pool.query(queryFinding, [email]);

    if (existingUser.rows.length > 0) {
      throw new APIError('User with this email already exists');
    }

    const queryText =
      'INSERT INTO users(email, password) VALUES ($1, $2) RETURNING *';

    const hash = await bcrypt.hash(password, 4);
    const params = [email, hash];

    const newUser = await pool.query(queryText, params);
    return newUser.rows[0];
  }

  async findByEmail(email) {
    const queryText = 'SELECT * FROM users WHERE email = $1';
    const params = [email];

    const user = await pool.query(queryText, params);

    if (!user.rows[0]) {
      throw new APIError('User with this email does not exists');
    }
    return user.rows[0];
  }
}

module.exports = new UserService();
