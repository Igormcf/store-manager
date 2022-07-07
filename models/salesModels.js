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

const getAllSales = async () => {
  const [allSales] = await connection
    .execute(`SELECT s.id AS saleId, s.date, sp.product_id AS productId,
    sp.quantity FROM StoreManager.sales AS s
    INNER JOIN StoreManager.sales_products AS sp
    ON s.id = sp.sale_id
    ORDER BY s.id, sp.product_id;`);

  return allSales;
};

const getSaleId = async (id) => {
  const [saleForId] = await connection
    .execute(`SELECT s.date, sp.product_id AS productId, sp.quantity FROM StoreManager.sales AS s
    INNER JOIN StoreManager.sales_products AS sp
    ON s.id = sp.sale_id
    WHERE s.id = ?
    ORDER BY s.id, sp.product_id;`, [id]);
  
  return saleForId;
};

const deleteSale = async (id) => {
  const [result] = await connection
    .execute('DELETE FROM StoreManager.sales WHERE id = ?;', [id]);

  if (result.affectedRows < 1) return null;

  return result.affectedRows;
};

const updateSale = async (saleId, saleProduct) => {
  const [result] = await connection
    .execute(`UPDATE StoreManager.sales_products
      SET quantity = ?
      WHERE sale_id = ?
      AND product_id = ?;`, [saleProduct.quantity, saleId, saleProduct.productId]);
  
  return result;
};

module.exports = {
  createSaleId,
  createSaleProduct,
  getAllSales,
  getSaleId,
  deleteSale,
  updateSale,
};