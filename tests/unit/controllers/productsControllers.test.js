const sinon = require('sinon');
const { expect } = require('chai');

const productsService = require('../../../services/productsServices');
const productsController = require('../../../controllers/productsControllers');

describe('Busca todos os produtos no BD', () => {

  describe('Quando não existe nenhum produto', async () => {
    const request = {};
    const response = {};

    before(() => {
      response.status = sinon.stub().returns(response);;
      response.json = sinon.stub().returns();

      sinon.stub(productsService, 'getProducts').resolves([]);
    });

    after(() => {
      productsService.getProducts.restore();
    });

    it('é chamado o método "status" passando o código 404', async () => {
      await productsController.getAllProducts(request, response);

      expect(response.status.calledWith(404)).to.be.equal(true);
    });

    it('é chamado o método "json" passando um objeto', async () => {
      await productsController.getAllProducts(request, response);

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });

  });

  describe('Quando existem produtos', () => {
    const request = {};
    const response = {};
    const result = [
      {
        "id": 1,
        "name": "Martelo de Thor"
      },
      {
        "id": 2,
        "name": "Traje de encolhimento"
      },
      {
        "id": 3,
        "name": "Escudo do Capitão América"
      }
    ]

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productsService, 'getProducts').resolves(result);
    });

    after(() => {
      productsService.getProducts.restore();
    });

    it('é chamado o método "status" passando o código 200', async () => {
      await productsController.getAllProducts(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o método "json" passando um objeto', async () => {
      await productsController.getAllProducts(request, response);

      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });

  });

  describe('Procura um produto pelo id', () => {

    describe('quando o id informado não é encontrado', async () => {
      const request = {};
      const response = {};

      before(() => {
        request.params = { id: 1 };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(productsService, 'getProducts').resolves([]);
      });

      after(() => {
        productsService.getProducts.restore();
      });

      it('é chamado o método "status" passando o código 404', async () => {
        await productsController.getProductId(request, response);

        expect(response.status.calledWith(404)).to.be.equal(true);
      });

      it('é chamado o método "json" passando um objeto', async () => {
        await productsController.getProductId(request, response);

        expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
      });

    });

    describe('quando o id informado é encontrado', async () => {
      const request = {};
      const response = {};
      const result = {
        "id": 2,
        "name": "Traje de encolhimento"
      }

      before(() => {
        request.params = { id: 1 };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(productsService, 'getProducts').resolves([result]);
      });

      after(() => {
        productsService.getProducts.restore();
      });

      it('é chamado o método "status" passando o código 200', async () => {
        await productsController.getProductId(request, response);

        expect(response.status.calledWith(200)).to.be.equal(true);
      });

      it('é chamado o método "json" passando um objeto', async () => {
        await productsController.getProductId(request, response);

        expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
      });

    });

  });
});

describe('Testa a função createProduct', () => {

  describe('Quando é informado um nome válido', async () => {
    const request = {};
    const response = {};

    before(() => {
      request.body = { "name": "naruto" };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productsService, 'createProduct').resolves({ id: "4", name: "naruto" });
    });

    after(() => {
      productsService.createProduct.restore();
    });

    it('é chamado o método "status" passando o código 201', async () => {
      await productsController.createProduct(request, response);

      expect(response.status.calledWith(201)).to.be.equal(true);
    });

    it('É chamado o método "json" passando um objeto', async () => {
      await productsController.createProduct(request, response);

      expect(response.json.calledWith(sinon.match.object)).to.be.true;
    });
  });
});

describe('Testa os retornos da função updateProduct', () => {

  describe('Quando não encontra o produto no BD', async () => {
    const request = {};
    const response = {};

    before(() => {
      sinon.stub(productsService, 'getProducts').resolves([]);
      request.params = { id: 10 };
      request.body = { "name": "naruto" };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productsService, 'updateProduct').resolves({ id: "10", name: "naruto" });
    });

    after(() => {
      productsService.getProducts.restore();
      productsService.updateProduct.restore();
    });

    it('é chamado o método "status" passando o código 404', async () => {
      await productsController.updateProduct(request, response);

      expect(response.status.calledWith(404)).to.be.equal(true);
    });

    it('é chamado o método "json" passando um objeto', async () => {
      await productsController.updateProduct(request, response);

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });

  describe('Quando encontra e edita um produto no BD', async () => {
    const request = {};
    const response = {};

    before(() => {
      sinon.stub(productsService, 'getProducts').resolves([{ id: 1, name: 'Martelo de Thor' }]);
      request.params = { id: 1 };
      request.body = { "name": "naruto" };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productsService, 'updateProduct').resolves({ id: "1", name: "naruto" });
    });

    after(() => {
      productsService.getProducts.restore();
      productsService.updateProduct.restore();
    });

    it('é chamado o método "status" passando o código 200', async () => {
      await productsController.updateProduct(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o método "json" passando um objeto', async () => {
      await productsController.updateProduct(request, response);

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });
});

describe('Testa quando não deleta um produto', () => {

  describe('Quando não é informado um id válido', () => {
    const request = {};
    const response = {};

    before(() => {
      sinon.stub(productsService, 'getProducts').resolves([]);
      request.params = { id: 10 };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productsService, 'deletProduct').resolves({});
    });

    after(() => {
      productsService.getProducts.restore();
      productsService.deletProduct.restore();
    });

    it('é chamado o método "status" passando o código 404', async () => {
      await productsController.deletProduct(request, response);

      expect(response.status.calledWith(404)).to.be.equal(true);
    });

    it('é chamado o método "json" passando um objeto', async () => {
      await productsController.deletProduct(request, response);

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });
});

describe('Testa quando deleta um produto', () => {

  describe('Quando não é informado um id válido', async () => {
    const request = {};
    const response = {};

    before(() => {
      sinon.stub(productsService, 'getProducts').resolves([{ id: 1, name: 'Martelo de Thor' }]);
      request.params = { id: 1 };
      response.status = sinon.stub().returns(response);
      response.end = sinon.stub();
      sinon.stub(productsService, 'deletProduct').resolves(1);
    });

    after(() => {
      productsService.getProducts.restore();
      productsService.deletProduct.restore();
    });

    it('é chamado o método "status" passando o código 204', async () => {
      await productsController.deletProduct(request, response);

      expect(response.status.calledWith(204)).to.be.equal(true);
    });
  });
});

describe('Testa a função getQuery', () => {
  const request = {};
  const response = {};

  describe('Quando não é informado uma query', () => {

    before(() => {
      sinon.stub(productsService, 'getProducts').resolves([
        { id: 1, name: 'Martelo de Thor' },
        { id: 2, name: 'Traje de encolhimento' },
        { id: 3, name: 'Escudo do Capitão América' }
      ]);
      request.query = { q: '' };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    });

    after(() => {
      productsService.getProducts.restore();
    });

    it('é chamado o método "status" passando o código 200', async () => {
      await productsController.getQuery(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o método "json" passando um array', async () => {
      await productsController.getQuery(request, response);

      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });

  describe('Quando é informado uma query', () => {

    before(() => {
      sinon.stub(productsService, 'getQuery').resolves([{ id: 1, name: 'Martelo de Thor' }]);
      request.query = { q: 'Martelo' };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    });

    after(() => {
      productsService.getQuery.restore();
    });

    it('é chamado o método "status" passando o código 200', async () => {
      await productsController.getQuery(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o método "json" passando um array', async () => {
      await productsController.getQuery(request, response);

      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });
});