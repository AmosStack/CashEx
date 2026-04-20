const asyncHandler = require('../utils/asyncHandler');
const { getRatePair } = require('../models/rateModel');
const {
  createTransaction,
  getTransactionsByUserId,
  getAllTransactions
} = require('../models/transactionModel');

const createTransactionHandler = asyncHandler(async (req, res) => {
  const { currency_from, currency_to, amount, type, status } = req.body;

  if (!currency_from || !currency_to || amount == null || !type) {
    return res.status(400).json({
      message: 'currency_from, currency_to, amount and type are required'
    });
  }

  if (!['buy', 'sell'].includes(type)) {
    return res.status(400).json({ message: "type must be 'buy' or 'sell'" });
  }

  const numericAmount = Number(amount);
  if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
    return res.status(400).json({ message: 'amount must be a positive number' });
  }

  const pair = await getRatePair(currency_from, currency_to);
  if (!pair) {
    return res.status(404).json({ message: 'Rate pair not found' });
  }

  const rate = type === 'buy' ? Number(pair.buy_rate) : Number(pair.sell_rate);
  const total = Number((numericAmount * rate).toFixed(2));

  const transaction = await createTransaction({
    userId: req.user.id,
    currencyFrom: currency_from,
    currencyTo: currency_to,
    amount: numericAmount,
    rateUsed: rate,
    total,
    type,
    status: status || 'completed'
  });

  return res.status(201).json(transaction);
});

const getUserTransactions = asyncHandler(async (req, res) => {
  const transactions = await getTransactionsByUserId(req.user.id);
  return res.json(transactions);
});

const getAdminTransactions = asyncHandler(async (_req, res) => {
  const transactions = await getAllTransactions();
  return res.json(transactions);
});

module.exports = {
  createTransactionHandler,
  getUserTransactions,
  getAdminTransactions
};
