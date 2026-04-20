const { pool } = require('../config/db');

async function createUser({ name, email, password, role = 'customer' }) {
  const [result] = await pool.execute(
    `INSERT INTO users (name, email, password, role)
     VALUES (?, ?, ?, ?)`,
    [name, email, password, role]
  );

  return {
    id: result.insertId,
    name,
    email,
    role
  };
}

async function findUserByEmail(email) {
  const [rows] = await pool.execute(
    `SELECT id, name, email, password, role, created_at
     FROM users
     WHERE email = ?
     LIMIT 1`,
    [email]
  );

  return rows[0] || null;
}

module.exports = {
  createUser,
  findUserByEmail
};
