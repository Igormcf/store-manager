const express = require('express');

const rescue = require('express-rescue');

const router = express.Router();

const validMiddleWare = require('../middlewares/validJoi');

const productsController = require('../controllers/productsControllers');

router.get('/', rescue(productsController.getAllProducts));

router.get('/:id', rescue(productsController.getProductId));

router.post('/', validMiddleWare, rescue(productsController.createProduct));

router.put('/:id', validMiddleWare, rescue(productsController.updateProduct));

router.delete('/:id', rescue(productsController.deletProduct));

module.exports = router;