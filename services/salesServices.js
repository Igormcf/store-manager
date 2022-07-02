const salesModel = require('../models/salesModels');

const createSales = async (saleProduct) => {
  const result = await salesModel.createSaleProduct(saleProduct);
  console.log([result], 'result service');
  
  return result;
};

module.exports = {
  createSales,
};