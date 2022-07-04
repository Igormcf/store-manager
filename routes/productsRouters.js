const express = require('express');

const rescue = require('express-rescue');

const router = express.Router();

const validJoi = require('../middlewares/validJoi');

const productsController = require('../controllers/productsControllers');

router.get('/', rescue(productsController.getAllProducts));

router.get('/:id', rescue(productsController.getProductId));

router.post('/', validJoi.validMiddleWare, rescue(productsController.createProduct));

router.put('/:id', validJoi.validMiddleWare, rescue(productsController.updateProduct));

router.delete('/:id', rescue(productsController.deletProduct));

module.exports = router;