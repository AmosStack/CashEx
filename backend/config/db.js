const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'Aruserver@123',
  database: process.env.DB_NAME || 'cash',
  port: Number(process.env.DB_PORT) || 3307,
  waitForConnections: true,
  connectionLimit: Number(process.env.DB_CONNECTION_LIMIT || 10),
  queueLimit: 0
});

async function testConnection() {
  const connection = await pool.getConnection();
  connection.release();
}

module.exports = {
  pool,
  testConnection
};
