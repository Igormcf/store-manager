const express = require('express');

const router = express.Router();

const rescue = require('express-rescue');

const salesController = require('../controllers/salesControllers');

const validSale = require('../middlewares/validSale');

router.post('/', validSale, rescue(salesController.createSales));

module.exports = router;