const express = require('express');

const rescue = require('express-rescue');

const router = express.Router();

const productsController = require('../controllers/productsControllers');

router.get('/', rescue(productsController.getAllProducts));

router.get('/:id', rescue(productsController.getProductId));

router.post('/', productsController.createProduct);

module.exports = router;