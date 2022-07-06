const sinon = require('sinon');
const { expect } = require('chai');

const saleService = require('../../../services/salesServices');
const saleController = require('../../../controllers/salesControllers');

describe('Testa a função createSales', () => {

  describe('Quando informa um payload inválido', () => {
    const request = {};
    const response = {};

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(saleService, 'createSales').resolves({
        statusCode: 404,
        result: { message: 'Product not found' },
      });
    });

    after(() => {
      saleService.createSales.restore();
    });

    it('é chamado o método "status" passando o código 404', async () => {
      await saleController.createSales(request, response);

      expect(response.status.calledWith(404)).to.be.equal(true);
    });

    it('é chamado o método "json" passando um objeto', async () => {
      await saleController.createSales(request, response);

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });

  describe('Quando informa um payload válido', () => {
    const request = {};
    const response = {};

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(saleService, 'createSales').resolves({
        statusCode: 201,
        result: {
          id: 3, itemsSold: [
            {
              "productId": 2,
              "quantity": 1
            }
          ] },
      });
    });

    after(() => {
      saleService.createSales.restore();
    });

    it('é chamado o método "status" passando o código 201', async () => {
      await saleController.createSales(request, response);

      expect(response.status.calledWith(201)).to.be.equal(true);
    });

    it('é chamado o método "json" passando um objeto', async () => {
      await saleController.createSales(request, response);

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });
});