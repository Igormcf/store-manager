const salesService = require('../services/salesServices');

const createSales = async (req, res) => {
  const { statusCode, result } = await salesService.createSales(req.body);
  console.log(await salesService.createSales(req.body));
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

module.exports = {
  createSales,
  getAllSales,
  getSaleId,
};