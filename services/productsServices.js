const productsModel = require('../models/productsModels');

const getProducts = async (id = null) => {
  if (id) {
    const productId = await productsModel.getProductId(id);

    return productId;
  }

  const allProducts = await productsModel.getAllProducts();
  
  const sortedProducts = allProducts.sort((a, b) => a.id - b.id);
  
  return sortedProducts;
};

const createProduct = async ({ name }) => {
  const { id } = await productsModel.createProduct({ name });

  return {
    id,
    name,
  };
};

module.exports = {
  getProducts,
  createProduct,
};