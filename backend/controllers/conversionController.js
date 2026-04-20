const asyncHandler = require('../utils/asyncHandler');
const { getRatePair } = require('../models/rateModel');

const convertCurrency = asyncHandler(async (req, res) => {
  const { from, to, amount, type } = req.body;

  if (!from || !to || amount == null || !type) {
    return res.status(400).json({ message: 'from, to, amount and type are required' });
  }

  if (!['buy', 'sell'].includes(type)) {
    return res.status(400).json({ message: "type must be 'buy' or 'sell'" });
  }

  const numericAmount = Number(amount);
  if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
    return res.status(400).json({ message: 'amount must be a positive number' });
  }

  const pair = await getRatePair(from, to);
  if (!pair) {
    return res.status(404).json({ message: 'Rate pair not found' });
  }

  const rate = type === 'buy' ? Number(pair.buy_rate) : Number(pair.sell_rate);
  const total = Number((numericAmount * rate).toFixed(2));

  return res.json({
    rate,
    total
  });
});

module.exports = {
  convertCurrency
};
