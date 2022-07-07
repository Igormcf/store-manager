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

const updateProduct = async (id, name) => {
  await productsModel.updateProduct(id, name);

  return {
    id,
    name,
  };
};

const deletProduct = async (id) => {
  const result = await productsModel.deletProduct(id);

  if (result === null) return null;
  
  return result;
};

const getQuery = async (query) => {
  const result = await productsModel.getQuery(query);
  console.log(result, 'result, query service');
  return result;
};

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deletProduct,
  getQuery,
};