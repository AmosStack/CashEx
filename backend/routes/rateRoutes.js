const express = require('express');
const {
  getRates,
  createRateHandler,
  updateRate
} = require('../controllers/rateController');
const { authenticate, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getRates);
router.post('/', authenticate, authorizeRoles('admin'), createRateHandler);
router.put('/:id', authenticate, authorizeRoles('admin'), updateRate);

module.exports = router;
