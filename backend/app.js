require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const rateRoutes = require('./routes/rateRoutes');
const conversionRoutes = require('./routes/conversionRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();
const frontendDir = path.join(__dirname, '..', 'frontend');

function sendFrontendPage(fileName) {
  return (_req, res) => {
    res.sendFile(path.join(frontendDir, fileName));
  };
}

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('/', sendFrontendPage('index.html'));
app.get('/index.html', sendFrontendPage('index.html'));
app.get('/auth.html', sendFrontendPage('auth.html'));
app.get('/rates.html', sendFrontendPage('rates.html'));
app.get('/convert.html', sendFrontendPage('convert.html'));
app.get('/transactions.html', sendFrontendPage('transactions.html'));

app.use('/api/auth', authRoutes);
app.use('/api/rates', rateRoutes);
app.use('/api/convert', conversionRoutes);
app.use('/api/transactions', transactionRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
