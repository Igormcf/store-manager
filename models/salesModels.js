const connection = require('./connection');

const createSaleProduct = async (saleProduct) => {
  const [resultId] = await connection
    .execute('INSERT INTO StoreManager.sales (date) VALUES (NOW())');
  
  await Promise.all(saleProduct.map(async (item) => {
    const query = `
    INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?);`;

    await connection.execute(query, [resultId.insertId, item.productId, item.quantity]);
  }));

  const [lastId] = await connection
    .execute('SELECT id FROM StoreManager.sales ORDER BY id DESC LIMIT 1');

  const idSale = Object.values(lastId[0]);

  return {
    id: idSale[0],
    itemsSold: saleProduct,
  };
};

/* const getSaleId = async (id) => {
  const [saleId] = await connection.execute('SELECT * FROM StoreManager.sales WHERE id = ?', [id]);

  return saleId;
}; */

module.exports = {
  createSaleProduct,
  /* getSaleId, */
};