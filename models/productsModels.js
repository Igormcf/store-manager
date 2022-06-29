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

module.exports = {
  getAllProducts,
  getProductId,
  createProduct,
};