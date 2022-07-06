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

describe('Busca as vendas no BD', () => {

  describe('Quando não existem vendas', async () => {
    const request = {};
    const response = {};

    before(() => {
      response.status = sinon.stub().returns(response);;
      response.json = sinon.stub().returns();

      sinon.stub(saleService, 'getSales').resolves([]);
    });

    after(() => {
      saleService.getSales.restore();
    });

    it('é chamado o método "status" passando o código 404', async () => {
      await saleController.getAllSales(request, response);

      expect(response.status.calledWith(404)).to.be.equal(true);
    });

    it('é chamado o método "json" passando um objeto', async () => {
      await saleController.getAllSales(request, response);

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });

  });

  describe('Quando existem vendas', () => {
    const request = {};
    const response = {};
    const result = [
      {
        "saleId": 1,
        "date": "2022-07-06T18:55:24.000Z",
        "productId": 1,
        "quantity": 5
      },
      {
        "saleId": 1,
        "date": "2022-07-06T18:55:24.000Z",
        "productId": 2,
        "quantity": 10
      }
    ];

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(saleService, 'getSales').resolves(result);
    });

    after(() => {
      saleService.getSales.restore();
    });

    it('é chamado o método "status" passando o código 200', async () => {
      await saleController.getAllSales(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o método "json" passando um objeto', async () => {
      await saleController.getAllSales(request, response);

      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });

  });

  describe('Procura uma venda pelo id', () => {

    describe('quando o id informado não é encontrado', async () => {
      const request = {};
      const response = {};

      before(() => {
        request.params = { id: 2 };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(saleService, 'getSales').resolves([]);
      });

      after(() => {
        saleService.getSales.restore();
      });

      it('é chamado o método "status" passando o código 404', async () => {
        await saleController.getSaleId(request, response);

        expect(response.status.calledWith(404)).to.be.equal(true);
      });

      it('é chamado o método "json" passando um objeto', async () => {
        await saleController.getSaleId(request, response);

        expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
      });

    });

    describe('quando o id informado é encontrado', async () => {
      const request = {};
      const response = {};
      const result = [{
        "date": "2022-07-06T18:55:24.000Z",
        "productId": 3,
        "quantity": 15
      }];

      before(() => {
        request.params = { id: 1 };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(saleService, 'getSales').resolves([result]);
      });

      after(() => {
        saleService.getSales.restore();
      });

      it('é chamado o método "status" passando o código 200', async () => {
        await saleController.getSaleId(request, response);

        expect(response.status.calledWith(200)).to.be.equal(true);
      });

      it('é chamado o método "json" passando um array', async () => {
        await saleController.getSaleId(request, response);

        expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
      });

    });

  });
});

describe('Testa quando não deleta uma venda', () => {

  describe('Quando não é informado um id válido', () => {
    const request = {};
    const response = {};

    before(() => {
      request.params = { id: 10 };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(saleService, 'deleteSale').resolves({});
    });

    after(() => {
      saleService.deleteSale.restore();
    });

    it('é chamado o método "status" passando o código 404', async () => {
      await saleController.deleteSale(request, response);

      expect(response.status.calledWith(404)).to.be.equal(true);
    });

    it('é chamado o método "json" passando um objeto', async () => {
      await saleController.deleteSale(request, response);

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });
});

describe('Testa quando deleta uma venda', () => {

  describe('Quando não é informado um id válido', async () => {
    const request = {};
    const response = {};

    before(() => {
      request.params = { id: 1 };
      response.status = sinon.stub().returns(response);
      response.end = sinon.stub();
      sinon.stub(saleService, 'deleteSale').resolves(1);
    });

    after(() => {
      saleService.deleteSale.restore();
    });

    it('é chamado o método "status" passando o código 204', async () => {
      await saleController.deleteSale(request, response);
  
      expect(response.status.calledWith(204)).to.be.equal(true);
    });
  });
});