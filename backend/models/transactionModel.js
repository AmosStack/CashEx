const { pool } = require('../config/db');

async function createTransaction({
  userId,
  currencyFrom,
  currencyTo,
  amount,
  rateUsed,
  total,
  type,
  status = 'completed'
}) {
  const [result] = await pool.execute(
    `INSERT INTO transactions
     (user_id, currency_from, currency_to, amount, rate_used, total, type, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [userId, currencyFrom, currencyTo, amount, rateUsed, total, type, status]
  );

  return {
    id: result.insertId,
    user_id: userId,
    currency_from: currencyFrom,
    currency_to: currencyTo,
    amount,
    rate_used: rateUsed,
    total,
    type,
    status
  };
}

async function getTransactionsByUserId(userId) {
  const [rows] = await pool.execute(
    `SELECT id, user_id, currency_from, currency_to, amount, rate_used, total, type, status, created_at
     FROM transactions
     WHERE user_id = ?
     ORDER BY created_at DESC`,
    [userId]
  );

  return rows;
}

async function getAllTransactions() {
  const [rows] = await pool.execute(
    `SELECT t.id, t.user_id, u.name AS user_name, u.email AS user_email,
            t.currency_from, t.currency_to, t.amount, t.rate_used, t.total,
            t.type, t.status, t.created_at
     FROM transactions t
     INNER JOIN users u ON u.id = t.user_id
     ORDER BY t.created_at DESC`
  );

  return rows;
}

module.exports = {
  createTransaction,
  getTransactionsByUserId,
  getAllTransactions
};
