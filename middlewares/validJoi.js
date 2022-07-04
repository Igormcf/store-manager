const Joi = require('joi');

const characterDTO = Joi.object({
  name: Joi.string().min(5).required(),
});

const validMiddleWare = (req, res, next) => {
  const { error } = characterDTO.validate(req.body);
  
  if (error) {
    console.log(error, 'validJoi');
    const [message] = error.details.map((e) => e.message);
    return error.details[0].message.includes('required') ? res.status(400).json({ message })
      : res.status(422).json({ message });
  }

  next();
};

module.exports = validMiddleWare;