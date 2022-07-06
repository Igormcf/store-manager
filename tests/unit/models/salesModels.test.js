const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const saleModel = require('../../../models/salesModels');

describe('Adiciona uma nova venda no DB', () => {
  describe('Testa a função createSaleId', () => {

    before(() => {
      sinon.stub(connection, 'execute').resolves([{
        fieldCount: 0,
        affectedRows: 1,
        insertId: 6,
        info: '',
        serverStatus: 2,
        warningStatus: 0
      }]);
    });

    after(() => {
      connection.execute.restore();
    });

    it('Se retorna um id', async () => {
      const result = await saleModel.createSaleId();
      console.log(result, 'teste');
      expect(result).to.be.equal(6);
    });
  });

  describe('Testa a função createSaleProduct', () => {

    before(() => {
      sinon.stub(connection, 'execute').resolves([{
        fieldCount: 0,
        affectedRows: 1,
        insertId: 0,
        info: '',
        serverStatus: 2,
        warningStatus: 0
      }]);
    });

    after(() => {
      connection.execute.restore();
    });

    it('Se retorna um objeto', async () => {
      const result = await saleModel.createSaleProduct(6, [
        {
          "productId": 2,
          "quantity": 1
        }
      ]);

      expect(result).to.be.a('object');
    });

    it('Se retorna o objeto não está vazio', async () => {
      const result = await saleModel.createSaleProduct(6, [
        {
          "productId": 2,
          "quantity": 1
        }
      ]);

      expect(result).to.be.not.empty;
    });
    
  });
});