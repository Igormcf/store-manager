const salesModel = require('../models/salesModels');
const productModel = require('../models/productsModels');

const createSales = async (saleProduct) => {
  const listProductsIds = saleProduct.map((item) => item.productId);
  const getId = await listProductsIds.map(async (item) => productModel.getProductId(item));
  const newId = await Promise.all(getId);
  const findArraNull = newId.some((item) => item.length === 0);
  
  if (findArraNull) {
    return { statusCode: 404, result: { message: 'Product not found' } };
  }

  const saleId = await salesModel.createSaleId();
 
  await Promise.all(saleProduct.map(async (item) => {
    await salesModel.createSaleProduct(saleId, item);
  }));

  return { statusCode: 201, result: { id: saleId, itemsSold: saleProduct } };
};

module.exports = {
  createSales,
};

/* if (newId.length === 0) {
    const error = new Error('Product not found');
    error.code = 'notFound';
    error.status = 404;
    throw error;
  }  */
/* await Promise.all(listProductsIds.map(async (item) => {
const getId = await productModel.getProductId(item);
 
if (getId.length === 0) {
  const error = new Error('Product not found');
  error.code = 'notFound';
  error.status = 404;
  throw error;
}
})); */