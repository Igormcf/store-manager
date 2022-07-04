const Joi = require('joi');

const saleDTO = Joi.array().items(
  Joi.object(
    {
      productId: Joi.number().required(),
      quantity: Joi.number().min(1).required(),
    },
  ),
).messages({
  'any.required': '"{{#key}}" is required',
  'number.min': '"{{#key}}" must be greater than or equal to 1',
});

const validSale = (req, res, next) => {
  const { error } = saleDTO.validate(req.body);

  if (error) {
    const [message] = error.details.map((e) => e.message);
    return error.details[0].message.includes('required') ? res.status(400).json({ message })
      : res.status(422).json({ message });
  }

  next();
};

module.exports = validSale;