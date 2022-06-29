const sinon = require('sinon');
const { expect } = require('chai');
const productsModel = require('../../../models/productsModels');
const productsService = require('../../../services/productsServices');

describe('Busca todos os produtos no BD', () => {

  describe('Quando não existe nenhum produto', () => {
    before(() => {
      const resultExecute = [];

      sinon.stub(productsModel, 'getAllProducts').resolves(resultExecute);
    });

    after(() => {
      productsModel.getAllProducts.restore();
    });

    it('retorna um array', async () => {
      const result = await productsService.getProducts();

      expect(result).to.be.a('array');
    });

    it('o array está vazio', async () => {
      const result = await productsService.getProducts();

      expect(result).to.be.empty;
    });
  });

  describe('Quando existem produtos', () => {
    before(() => {
      const resultExecute = [
        {
          "id": 1,
          "name": "Martelo de Thor",
        },
        {
          "id": 2,
          "name": "Traje de encolhimento",
        }
      ];

      sinon.stub(productsModel, 'getAllProducts').resolves(resultExecute);
    });

    after(() => {
      productsModel.getAllProducts.restore();
    });

    it('retorna um array', async () => {
      const result = await productsService.getProducts();

      expect(result).to.be.a('array');
    });

    it('o array está vazio', async () => {
      const result = await productsService.getProducts();

      expect(result).to.be.not.empty;
    });

  });
});

describe('Procura um produto pelo id', () => {

  describe('quando um id informado', () => {

    before(() => {
      const resultExecute = {
        "id": 1,
        "name": "Martelo de Thor"
      };

      sinon.stub(productsModel, 'getProductId').resolves(resultExecute);
    });

    after(() => {
      productsModel.getProductId.restore();
    });

    it('retorna um obejto', async () => {
      const result = await productsService.getProducts(1);

      expect(result).to.be.a('object');
    });

    it('o objeto não está vazio', async () => {
      const result = await productsService.getProducts(1);

      expect(result).to.be.not.empty;
    });
    
  });
});

