Comandos importantes:
- yarn - instala as dependências do projeto
- yarn add - adicionar uma nova dependência, usar a flag `-D` quando for uma dependência apenas para dev, por ex os tipos das bibliotecas
- yarn prisma migrate dev - criar a base de dados ou dar update sempre que algo for alterado
- yarn dev - correr o projeto em desenvolvimento, sempre que um arquivo é alterado ele reinicia automaticamente

Criar sempre o arquivo `.env` com base no que está no `.env.example`

Se tiverem a extenção `Prettier - Code formatter` instalada sempre que salvarem o arquivo é feito um prettier print no arquivo

--------

# Testes:
Para testar devemos fazer o seguinte:
- Criar um arquivo `.env.test` identico ao `.env`, porem trocamos o nome `neighbouthub` para `neighbouthubTEST`.
- Criar um arquivo `*.test.ts` que contenha os testes daquela rota, igual ao [LoginAccount.test.ts](./src/useCases/User/LoginAccount/LoginAccount.test.ts)
- Executar o comando `yarn test` para executar os testes