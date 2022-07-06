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

describe('Busca todas as vendas no BD', () => {

  describe('Quando não existem vendas', () => {

    before(() => {
      const resultExecute = [[]];

      sinon.stub(connection, 'execute').resolves(resultExecute);
    });

    after(() => {
      connection.execute.restore();
    });

    it('retorna um array', async () => {
      const result = await saleModel.getAllSales();

      expect(result).to.be.a('array');
    });

    it('o array está vazio', async () => {
      const result = await saleModel.getAllSales();

      expect(result).to.be.empty;
    });
  });

  describe('Quando existem vendas', () => {
    before(() => {
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

      sinon.stub(connection, 'execute').resolves(result);
    });

    after(() => {
      connection.execute.restore();
    });

    it('retorna um objeto', async () => {
      const result = await saleModel.getAllSales();

      expect(result).to.be.a('object');
    });

    it('o objeto não está vazio', async () => {
      const result = await saleModel.getAllSales();

      expect(result).to.be.not.empty;
    });
  });
});

describe('Procura uma venda pelo id', () => {

  before(() => {
    const resultExecute = [
      {
        "date": "2022-07-06T18:55:24.000Z",
        "productId": 3,
        "quantity": 15
      }
    ];

    sinon.stub(connection, 'execute').resolves([resultExecute[0]]);
  });

  after(() => {
    connection.execute.restore();
  });

  describe('quando um id informado', () => {

    it('retorna um obejto', async () => {
      const result = await saleModel.getSaleId(2);

      expect(result).to.be.a('object');
    });

    it('o objeto não está vazio', async () => {
      const result = await saleModel.getSaleId(2);

      expect(result).to.be.not.empty;
    });

    it('o objeto retorna as chaves de uma venda', async () => {
      const result = await saleModel.getSaleId(2);

      expect(result).to.include.all.keys("date", "productId", "quantity");
    });

  });
});

describe('Testa quando não deleta uma venda', () => {

  before(() => {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 0 }]);
  });

  after(() => {
    connection.execute.restore();
  });

  describe('Quando não é informado um id válido', () => {

    it('retorna um objeto', async () => {
      const result = await saleModel.deleteSale(10);

      expect(result).to.be.equal(null);
    });
  });
});

describe('Testa quando deleta um produto', () => {

  before(() => {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
  });

  after(() => {
    connection.execute.restore();
  });

  describe('Quando é informado um id válido', () => {

    it('retorna o valor da chave affectedRows', async () => {
      const result = await saleModel.deleteSale(2);

      expect(result).to.be.equal(1);
    });
  });
});