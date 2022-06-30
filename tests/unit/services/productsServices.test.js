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

describe('Testa a função createProduct', () => {

  describe('Quando não é informado um nome válido', () => {

    before(() => {
      sinon.stub(productsModel, 'createProduct').resolves({ id: "" });
    });

    after(() => {
      productsModel.createProduct.restore();
    });

    const name = {
      "name": "na"
    };

    it('retorna um obejto', async () => {

      const result = await productsService.createProduct(name);

      expect(result).to.be.a('object');
    });

    it('o objeto não contém um valor para a chave id', async () => {
      const result = await productsService.createProduct(name);

      expect(result.id).to.be.equal("");
    });
  });

  describe('Quando é informado um nome válido', () => {
    before(() => {
      sinon.stub(productsModel, 'createProduct').resolves({ id: 4 });
    });

    after(() => {
      productsModel.createProduct.restore();
    });

    const name = {
      "name": "naruto"
    };

    it('retorna um obejto', async () => {

      const result = await productsService.createProduct(name);

      expect(result).to.be.a('object');
    });

    it('o objeto contém um valor para a chave id', async () => {
      const result = await productsService.createProduct(name);

      expect(result.id).to.be.equal(4);
    });

    it('o objeto contém a chave "name"', async () => {
      const result = await productsService.createProduct(name);

      expect(result).to.include.keys("name")
    });
  });
});

describe('Testa a função updateProduct', () => {

  describe('Quando o novo nome é inválido', () => {
    before(() => {
      sinon.stub(productsModel, 'updateProduct').resolves([{}]);
    });

    after(() => {
      productsModel.updateProduct.restore();
    });

    it('Retorna um objeto', async () => {
      const result = await productsService.updateProduct(1, "nar");

      expect(result).to.be.a('object');
    });

    it('O objeto está vazio', async () => {
      const result = await productsService.updateProduct(1, "nar");

      expect(result).to.be.not.empty;
    });

    it('O objeto não contém o novo nome', async () => {
      const result = await productsService.updateProduct(1, "nar");

      expect(result).to.be.not.equal({ id: 1, name: "nar" });
    });
  });

  describe('Quando o novo nome é válido', () => {
    before(() => {
      sinon.stub(productsModel, 'updateProduct').resolves([{ id: 1, name: "naruto" }]);
    });

    after(() => {
      productsModel.updateProduct.restore();
    });

    it('Retorna um objeto', async () => {
      const result = await productsService.updateProduct(1, "naruto");

      expect(result).to.be.a('object');
    });

    it('O objeto não está vazio', async () => {
      const result = await productsService.updateProduct(1, "naruto");

      expect(result).to.be.not.empty;
    });

    it('O objeto contém o novo nome', async () => {
      const result = await productsService.updateProduct(1, "naruto");

      expect(result).to.be.not.equal({ id: 1, name: "naruto" });
    });
  });
})
