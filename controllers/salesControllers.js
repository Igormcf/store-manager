const salesService = require('../services/salesServices');

const createSales = async (req, res, next) => {
  const result = await salesService.createSales(req.body);

  if (result.error) {
    return next(result.error);
  }

  return res.status(201).json(result);
};

module.exports = {
  createSales,
};