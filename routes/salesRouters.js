const express = require('express');

const router = express.Router();

const rescue = require('express-rescue');

const salesController = require('../controllers/salesControllers');

const validSale = require('../middlewares/validSale');

router.post('/', validSale, rescue(salesController.createSales));

router.get('/', rescue(salesController.getAllSales));

router.get('/:id', rescue(salesController.getSaleId));

module.exports = router;