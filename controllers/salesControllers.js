const salesService = require('../services/salesServices');

const createSales = async (req, res) => {
  const { statusCode, result } = await salesService.createSales(req.body);
  console.log(await salesService.createSales(req.body));
  return res.status(statusCode).json(result);
};

module.exports = {
  createSales,
};