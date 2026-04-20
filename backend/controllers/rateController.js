const asyncHandler = require('../utils/asyncHandler');
const { getAllRates, createRate, updateRateById } = require('../models/rateModel');

const getRates = asyncHandler(async (_req, res) => {
  const rates = await getAllRates();
  return res.json(rates);
});

const createRateHandler = asyncHandler(async (req, res) => {
  const { currency_from, currency_to, buy_rate, sell_rate } = req.body;

  if (!currency_from || !currency_to || buy_rate == null || sell_rate == null) {
    return res.status(400).json({
      message: 'currency_from, currency_to, buy_rate and sell_rate are required'
    });
  }

  const rate = await createRate({
    currencyFrom: currency_from,
    currencyTo: currency_to,
    buyRate: buy_rate,
    sellRate: sell_rate
  });

  return res.status(201).json(rate);
});

const updateRate = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { buy_rate, sell_rate } = req.body;

  if (buy_rate == null || sell_rate == null) {
    return res.status(400).json({ message: 'buy_rate and sell_rate are required' });
  }

  const updated = await updateRateById(id, {
    buyRate: buy_rate,
    sellRate: sell_rate
  });

  if (!updated) {
    return res.status(404).json({ message: 'Rate not found' });
  }

  return res.json({ message: 'Rate updated successfully' });
});

module.exports = {
  getRates,
  createRateHandler,
  updateRate
};
