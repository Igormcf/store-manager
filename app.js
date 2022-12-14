require('dotenv').config();

const express = require('express');

const app = express();

app.use(express.json());

const routes = require('./routes');

const middleWareError = require('./middlewares/error');

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', routes.productsRouters);

app.use('/sales', routes.salesRouters);

app.use(middleWareError);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;