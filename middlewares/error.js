module.exports = (err, _req, res, _next) => {
  // Caso o erro possua uma propriedade `status`, devolvemos esse status, juntamente com a mensagem do erro
  if (err.status) {
    return res.status(err.status).json({ message: err.message });
  }
  // Caso o erro seja um erro do joi
  if (err.isJoi) {
    // Devolvemos o status 400 Bad Request com a mensagem de erro que o Joi gerou.
    return res.status(400).json({ message: err.details[0].message });
  }
  // Caso o erro não seja de nenhum dos dois tipos acima, ele é um erro desconhecido

  // Imprimimos o erro no console para que possamos debugá-lo
  console.log(err);
  return res.status(500).json({ message: 'Erro interno do servidor' });
};