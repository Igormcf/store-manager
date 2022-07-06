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

const getSales = async (id = null) => {
  if (id) {
    const saleForId = await salesModel.getSaleId(id);

    return saleForId;
  } 

  const allSales = await salesModel.getAllSales();
  
  return allSales;
};

const deleteSale = async (id) => {
  const result = await salesModel.deleteSale(id);

  if (result === null) return null;

  return result;
};

module.exports = {
  createSales,
  getSales,
  deleteSale,
};
