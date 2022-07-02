const salesService = require('../services/salesServices');

const createSales = async (req, res) => {
  const result = await salesService.createSales(req.body);

  console.log(result, 'result controler');
  return res.status(201).json(result);
};

module.exports = {
  createSales,
};