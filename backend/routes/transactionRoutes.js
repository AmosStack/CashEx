const express = require('express');
const {
  createTransactionHandler,
  getUserTransactions,
  getAdminTransactions
} = require('../controllers/transactionController');
const { authenticate, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authenticate, createTransactionHandler);
router.get('/user', authenticate, getUserTransactions);
router.get('/', authenticate, authorizeRoles('admin'), getAdminTransactions);

module.exports = router;
