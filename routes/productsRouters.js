const express = require('express');

const rescue = require('express-rescue');

const router = express.Router();

const validMiddleWare = require('../middlewares/validJoi');

const productsController = require('../controllers/productsControllers');

router.get('/', rescue(productsController.getAllProducts));

router.get('/:id', rescue(productsController.getProductId));

router.post('/', validMiddleWare, rescue(productsController.createProduct));

module.exports = router;