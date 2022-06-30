const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const productsModel = require('../../../models/productsModels');

describe('Busca todos os produtos no BD', () => {

  describe('Quando não existe nenhum produto', () => {

    before(() => {
      const resultExecute = [[]];

      sinon.stub(connection, 'execute').resolves(resultExecute);
    });

    after(() => {
      connection.execute.restore();
    });

    it('retorna um array', async () => {
      const result = await productsModel.getAllProducts();

      expect(result).to.be.a('array');
    });

    it('o array está vazio', async () => {
      const result = await productsModel.getAllProducts();

      expect(result).to.be.empty;
    });
  });

  describe('Quando existem produtos', () => {
    before(() => {
      const result = [
        {
          "id": 1,
          "name": "Martelo de Thor",
        },
        {
          "id": 2,
          "name": "Traje de encolhimento",
        }
      ];

      sinon.stub(productsModel, 'getAllProducts').resolves(result);
    });

    after(() => {
      productsModel.getAllProducts.restore();
    });

    it('retorna um array', async () => {
      const result = await productsModel.getAllProducts();

      expect(result).to.be.a('array');
    });

    it('o array não está vazio', async () => {
      const result = await productsModel.getAllProducts();

      expect(result).to.be.not.empty;
    });

  });
});

describe('Procura um produto pelo id', () => {

  before(() => {
    const resultExecute = [
      {
        "id": 1,
        "name": "Martelo de Thor"
      },
      {
        "id": 2,
        "name": "Traje de encolhimento"
      }
    ];

    sinon.stub(connection, 'execute').resolves([resultExecute[0]]);
  });

  after(() => {
    connection.execute.restore();
  });

  describe('quando um id informado', () => {

    it('retorna um obejto', async () => {
      const result = await productsModel.getProductId(1);

      expect(result).to.be.a('object');
    });

    it('o objeto não está vazio', async () => {
      const result = await productsModel.getProductId(1);

      expect(result).to.be.not.empty;
    });

    it('o objeto retorna as chaves de um produto', async () => {
      const result = await productsModel.getProductId(1);

      expect(result).to.include.all.keys("id", "name");
    });
    
  });
});

describe('Testa quando não é criado um novo produto', () => {
  before(() => {
    sinon.stub(connection, 'execute').resolves([{ id: "" }]);
  }); 

  after(() => {
    connection.execute.restore();
  });
  
  describe('Quando não é informado um nome válido', () => {
    const name = {
      "name": "na"
    }; 
    it('retorna um obejto', async () => {
      const result = await productsModel.createProduct(name);

      expect(result).to.be.a('object');
    });

    it('o objeto não contém um valor para a chave id', async () => {
      const result = await productsModel.createProduct(name);

      expect(result.id).to.be.equal(undefined);
    });

  });
});

describe('Testa quando é criado um novo produto', () => {
  before(() => {
    sinon.stub(connection, 'execute').resolves([{ id: "4" }]);
  });

  after(() => {
    connection.execute.restore();
  });

  describe('Quando é informado um nome válido', () => {
    const name = {
      "name": "naruto"
    }
    it('retorna um obejto', async () => {
      const result = await productsModel.createProduct(name);

      expect(result).to.be.a('object');
    });

    it('o objeto contém um valor para a chave id', async () => {
      const result = await productsModel.createProduct(name);

      expect(result.id).to.include.members;
    });

  });
});