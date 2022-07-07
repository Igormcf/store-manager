const salesService = require('../services/salesServices');

const createSales = async (req, res) => {
  const { statusCode, result } = await salesService.createSales(req.body);

  return res.status(statusCode).json(result);
};

const getAllSales = async (_req, res) => {
  const rows = await salesService.getSales();

  if (rows.length === 0) {
    return res.status(404).json({ message: 'Sale not found' });
  }

  return res.status(200).json(rows);
};

const getSaleId = async (req, res) => {
  const { id } = req.params;

  const rows = await salesService.getSales(id);

  if (rows.length === 0) {
    return res.status(404).json({ message: 'Sale not found' });
  }

  return res.status(200).json(rows);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;

  const findProduct = await salesService.getSales(id);

  if (findProduct.length === 0) {
    return res.status(404).json({ message: 'Sale not found' });
  }

  await salesService.deleteSale(id);

  return res.status(204).end();
};

const updateSale = async (req, res) => {
  const { id } = req.params;

  const findSale = await salesService.getSales(id);

  if (findSale.length === 0) {
    return res.status(404).json({ message: 'Sale not found' });
  }

  const { statusCode, result } = await salesService.updateSale(id, req.body);

  return res.status(statusCode).json(result);
};

module.exports = {
  createSales,
  getAllSales,
  getSaleId,
  deleteSale,
  updateSale,
};