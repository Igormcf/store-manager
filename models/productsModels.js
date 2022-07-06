const connection = require('./connection');

const getAllProducts = async () => {
  const [allProducts] = await connection.execute('SELECT * FROM StoreManager.products;');

  return allProducts;
};

const getProductId = async (id) => {
  const [productId] = await connection
    .execute('SELECT * FROM StoreManager.products WHERE id = ?;', [id]);

  return productId;
};

const createProduct = async ({ name }) => {
  const [result] = await connection
    .execute('INSERT INTO StoreManager.products (name) VALUES (?);', [name]);

  return {
    id: result.insertId,
  };
};

const updateProduct = async (id, name) => {
  const [result] = await connection
    .execute('UPDATE StoreManager.products SET name = ? WHERE id = ?;', [name, id]);

  return result;
};

const deletProduct = async (id) => {
  const [result] = await connection
    .execute('DELETE FROM StoreManager.products WHERE id = ?;', [id]);

  if (result.affectedRows < 1) return null;

  return result.affectedRows;
};

module.exports = {
  getAllProducts,
  getProductId,
  createProduct,
  updateProduct,
  deletProduct,
};