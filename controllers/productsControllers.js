const productsService = require('../services/productsServices');

const getAllProducts = async (_req, res) => {
  const rows = await productsService.getProducts();

  if (rows.length === 0) {
    return res.status(404).json({ message: 'Product not found' });
  }

  return res.status(200).json(rows);
};

const getProductId = async (req, res) => {
  const { id } = req.params;

  const rows = await productsService.getProducts(id);

  if (rows.length === 0) {
    return res.status(404).json({ message: 'Product not found' });
  }

  return res.status(200).json(rows[0]);
};

const createProduct = async (req, res) => {
  const { name } = req.body;

  const newProduct = await productsService.createProduct({ name });

  return res.status(201).json(newProduct);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const findProduct = await productsService.getProducts(id);

  if (findProduct.length === 0) {
    return res.status(404).json({ message: 'Product not found' });
  }

  const editedProduct = await productsService.updateProduct(id, name);
  console.log(editedProduct);

  return res.status(200).json(editedProduct);
};

module.exports = {
  getAllProducts,
  getProductId,
  createProduct,
  updateProduct,
};