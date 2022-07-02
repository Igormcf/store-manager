const express = require('express');

const router = express.Router();

const salesController = require('../controllers/salesControllers');

router.post('/', salesController.createSales);

module.exports = router;