const sinon = require('sinon');
const { expect } = require('chai');
const saleModel = require('../../../models/salesModels');
const saleService = require('../../../services/salesServices');
const productModel = require('../../../models/productsModels');

describe('Testa a função createSales', () => {

  describe('Quando é informado um productId válido', () => {

    before(() => {
      sinon.stub(productModel, 'getProductId').resolves([[{ id: 1, name: 'Martelo de Thor' }]]);
      sinon.stub(saleModel, 'createSaleId').resolves(4)
      sinon.stub(saleModel, 'createSaleProduct').resolves([{
        fieldCount: 0,
        affectedRows: 1,
        insertId: 0,
        info: '',
        serverStatus: 2,
        warningStatus: 0
      }]);
    });

    after(() => {
      productModel.getProductId.restore();
      saleModel.createSaleId.restore();
      saleModel.createSaleProduct.restore();
    });

    it('Retorna um objeto', async () => {
      const result = await saleService.createSales([
        {
          "productId": 1,
          "quantity": 1
        }
      ]);
    
      expect(result).to.be.a('object');
    });
  });

  describe('Quando é informado um productId inválido', () => {
    before(() => {
      sinon.stub(productModel, 'getProductId').resolves([]);
    });

    after(() => {
      productModel.getProductId.restore();
    });

    it('Retorna um objeto', async () => {
      const result = await saleService.createSales([
        {
          "productId": 10,
          "quantity": 1
        }
      ]);

      expect(result).to.be.a('object');
    });

    it('O objeto tem a chave statusCode com 404', async () => {
      const result = await saleService.createSales([
        {
          "productId": 10,
          "quantity": 1
        }
      ]);

      expect(result.statusCode).to.be.equal(404);
    });
  });
});

describe('Busca todas as vendas no BD', () => {

  describe('Quando não existem vendas', () => {
    before(() => {
      const resultExecute = [];

      sinon.stub(saleModel, 'getAllSales').resolves(resultExecute);
    });

    after(() => {
      saleModel.getAllSales.restore();
    });

    it('retorna um array', async () => {
      const result = await saleService.getSales();

      expect(result).to.be.a('array');
    });

    it('o array está vazio', async () => {
      const result = await saleService.getSales();

      expect(result).to.be.empty;
    });
  });

  describe('Quando existem vendas', () => {
    before(() => {
      const resultExecute = [
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

      sinon.stub(saleModel, 'getAllSales').resolves(resultExecute);
    });

    after(() => {
      saleModel.getAllSales.restore();
    });

    it('retorna um array', async () => {
      const result = await saleService.getSales();

      expect(result).to.be.a('array');
    });

    it('o array está vazio', async () => {
      const result = await saleService.getSales();

      expect(result).to.be.not.empty;
    });

  });
});

describe('Procura uma venda pelo id', () => {

  describe('quando um id é informado', () => {

    before(() => {
      const resultExecute = {
        "date": "2022-07-06T18:55:24.000Z",
        "productId": 3,
        "quantity": 15
      };

      sinon.stub(saleModel, 'getSaleId').resolves(resultExecute);
    });

    after(() => {
      saleModel.getSaleId.restore();
    });

    it('Retorna um objeto', async () => {
      const result = await saleService.getSales(2);

      expect(result).to.be.a('object');
    });

    it('O array não está vazio', async () => {
      const result = await saleService.getSales(2);

      expect(result).to.be.not.empty;
    });

  });
});

describe('Testa quando não deleta uma venda', () => {

  describe('Quando não é informado um id válido', () => {
    before(() => {
      sinon.stub(saleModel, 'deleteSale').resolves(null);
    });

    after(() => {
      saleModel.deleteSale.restore();
    });
    it('retorna null', async () => {
      const result = await saleService.deleteSale(10);

      expect(result).to.be.equal(null);
    });
  });
});

describe('Testa quando deleta uma venda', () => {

  describe('Quando é informado um id válido', () => {
    before(() => {
      sinon.stub(saleModel, 'deleteSale').resolves(1);
    });

    after(() => {
      saleModel.deleteSale.restore();
    });
    it('retorna o valor da chave affectedRows', async () => {
      const result = await saleService.deleteSale(3);

      expect(result).to.be.equal(1);
    });
  });
});

describe('Testa a função updateSale', () => {

  describe('Quando é informado um payload válido', () => {
    before(() => {
      sinon.stub(productModel, 'getProductId').resolves([[{ id: 1, name: 'Martelo de Thor' }]]);
      sinon.stub(saleModel, 'updateSale').resolves([{
        fieldCount: 0,
        affectedRows: 1,
        insertId: 0,
        info: '',
        serverStatus: 2,
        warningStatus: 0
      }]);
    });

    after(() => {
      productModel.getProductId.restore();
      saleModel.updateSale.restore();
    });

    it('Retorna um objeto', async () => {
      const result = await saleService.updateSale(1, [
        {
          "productId": 1,
          "quantity": 22
        }
      ]);

      expect(result).to.be.a('object');
    });

    it('O objeto contém as chaves statusCode e result', async () => {
      const result = await saleService.updateSale(1, [
        {
          "productId": 1,
          "quantity": 22
        }
      ]);

      expect(result).to.includes.all.keys('statusCode', 'result');
    });
  });

  describe('Quando é informado um payload inválido', () => {
    before(() => {
      sinon.stub(productModel, 'getProductId').resolves([[]]);
      sinon.stub(saleModel, 'updateSale').resolves([]);
    });

    after(() => {
      productModel.getProductId.restore();
      saleModel.updateSale.restore();
    });

    it('Retorna um objeto', async () => {
      const result = await saleService.updateSale(1, [
        {
          "productId": 10,
          "quantity": 22
        }
      ]);

      expect(result).to.be.a('object');
    });

    it('O objeto tem a chave statusCode com 404', async () => {
      const result = await saleService.updateSale(1, [
        {
          "productId": 10,
          "quantity": 22
        }
      ]);

      expect(result.statusCode).to.be.equal(404);
    });
  });
});