const express = require('express');

const router = express.Router();

const rescue = require('express-rescue');

const salesController = require('../controllers/salesControllers');

const validJoi = require('../middlewares/validJoi');

router.post('/', validJoi.validSale, rescue(salesController.createSales));

module.exports = router;