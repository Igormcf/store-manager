const connection = require('./connection');

const createSaleId = async () => {
  const [resultId] = await connection
    .execute('INSERT INTO StoreManager.sales (date) VALUES (NOW())');

  return resultId.insertId;
};

const createSaleProduct = async (saleId, saleProduct) => {
  const query = `
    INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?);`;

  const [result] = await connection
    .execute(query, [saleId, saleProduct.productId, saleProduct.quantity]);
  
  return result;
};

module.exports = {
  createSaleId,
  createSaleProduct,
};