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

        sinon.stub(productsService, 'getProducts').resolves(result);
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