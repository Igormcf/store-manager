const salesModel = require('../models/salesModels');
const productModel = require('../models/productsModels');

const createSales = async (saleProduct) => {
  const listProductsIds = saleProduct.map((item) => item.productId);
  console.log(listProductsIds, 'array ids');
  await Promise.all(listProductsIds.map(async (item) => {
    const getId = await productModel.getProductId(item);
    console.log(getId, 'getId');
    if (getId.length === 0) {
      const error = new Error('Product not found');
      error.code = 'notFound';
      error.status = 404;
      throw error;
    }
  }));

  const result = await salesModel.createSaleProduct(saleProduct);
  
  return result;
};

/* const getSaleId = async (id) => {
  const saleId = await salesModel.getSaleId(id);

  return saleId;
}; */

module.exports = {
  createSales,
  /* getSaleId, */
};