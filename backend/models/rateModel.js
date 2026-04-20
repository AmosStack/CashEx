const { pool } = require('../config/db');

async function getAllRates() {
  const [rows] = await pool.execute(
    `SELECT id, currency_from, currency_to, buy_rate, sell_rate, updated_at
     FROM rates
     ORDER BY updated_at DESC`
  );

  return rows;
}

async function createRate({ currencyFrom, currencyTo, buyRate, sellRate }) {
  const [result] = await pool.execute(
    `INSERT INTO rates (currency_from, currency_to, buy_rate, sell_rate)
     VALUES (?, ?, ?, ?)`,
    [currencyFrom, currencyTo, buyRate, sellRate]
  );

  return {
    id: result.insertId,
    currency_from: currencyFrom,
    currency_to: currencyTo,
    buy_rate: buyRate,
    sell_rate: sellRate
  };
}

async function updateRateById(id, { buyRate, sellRate }) {
  const [result] = await pool.execute(
    `UPDATE rates
     SET buy_rate = ?, sell_rate = ?
     WHERE id = ?`,
    [buyRate, sellRate, id]
  );

  return result.affectedRows > 0;
}

async function getRatePair(currencyFrom, currencyTo) {
  const [rows] = await pool.execute(
    `SELECT id, currency_from, currency_to, buy_rate, sell_rate, updated_at
     FROM rates
     WHERE currency_from = ? AND currency_to = ?
     LIMIT 1`,
    [currencyFrom, currencyTo]
  );

  return rows[0] || null;
}

module.exports = {
  getAllRates,
  createRate,
  updateRateById,
  getRatePair
};
