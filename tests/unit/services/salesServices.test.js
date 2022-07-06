const sinon = require('sinon');
const { expect } = require('chai');
const saleModel = require('../../../models/salesModels');
const saleService = require('../../../services/salesServices');
const productModel = require('../../../models/productsModels');

describe('Testa a função createSales', () => {

  describe('Quando é informado um productId válido', () => {

    before(() => {
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