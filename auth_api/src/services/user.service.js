const bcrypt = require('bcrypt');

const pool = require('../db');

class UserService {
  async getMe(id) {
    try {
      const queryText = 'SELECT * FROM users WHERE id = $1';
      const params = [id];

      const user = await pool.query(queryText, params);
      return user.rows[0];
    } catch (error) {
      throw new Error(`Error fetching user: ${error.message}`);
    }
  }

  async create(email, password) {
    try {
      const queryFinding = 'SELECT * FROM users WHERE email = $1';
      const existingUser = await pool.query(queryFinding, [email]);

      if (existingUser.rows.length > 0) {
        throw new Error('User with this email already exists');
      }

      const queryText =
        'INSERT INTO users(email, password) VALUES ($1, $2) RETURNING *';

      const hash = await bcrypt.hash(password, 4);
      const params = [email, hash];

      const newUser = await pool.query(queryText, params);
      return newUser.rows[0];
    } catch (error) {
      throw new Error(`Error fetching user: ${error.message}`);
    }
  }

  async findByEmail(email) {
    const queryText = 'SELECT * FROM users WHERE email = $1';
    const params = [email];

    try {
      const user = await pool.query(queryText, params);

      if (!user.rows[0]) {
        throw new Error('User with this email does not exists');
      }
      return user.rows[0];
    } catch (error) {
      throw new Error(`Error fetching user: ${error.message}`);
    }
  }
}

module.exports = new UserService();
