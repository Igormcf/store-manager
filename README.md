# Store Manager

## Sobre o projeto:

Neste projeto desenvolvi uma API RESTful, com `Node.js` e `Express`, utilizando a arquitetura `MSC` (model-service-controller), sendo um sistema de gerenciamento de vendas no formato dropshipping onde é possível criar, visualizar, deletar e atualizar produtos e vendas `(CRUD)`, utilizando o banco de dados `MySQL` para a gestão de dados. Além disso, com o auxílio das ferramentas `Mocha`, `Chai` e `Sinon`, desenvolvi testes unitários a fim de verificar as funcionalidades da API. Para realizar a validação dos dados foi utilizado `Joi`. 

## Orientações para a Execução:

<details>
  <summary><strong>Com Docker</strong></summary><br />
  
  - Execute o serviço `node` com o comando `docker-compose up -d`, para inicializar o container `store_manager` e outro chamado `store_manager_db`.
  - Rode o comando `docker exec -it store_manager bash` para acessar o terminal interativo do container.
  - Instale as dependências com `npm install` .
</details>

<details>
  <summary><strong>Localmente</strong></summary><br />
  
  - Necessário o `node` instalado.
  - Instale as dependências com `npm install`.
</details>

## Outras informações:

<details>
  <summary><strong>Tabelas</strong></summary><br />
  
  O banco possui três tabelas:
  - A tabela `products`, com os atributos `id` e `name`;
  - A tabela `sales`, com os atributos `id` e `date`;
  - A tabela `sales_products`, com os atributos `sale_id`, `product_id` e `quantity`;
  - O script de criação do banco de dados pode ser visto [aqui](migration.sql);
  - O script que popula o banco de dados pode ser visto [aqui](seed.sql);
</details>
