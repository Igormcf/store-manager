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

module.exports = {
  getProducts,
};