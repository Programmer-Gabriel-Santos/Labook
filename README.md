## LabBook

### Objetivos deste projeto:

Treinar e demonstrar habilidades com as principais tecnologias de desenvolvimento backend em ambiente nodeJS. Este projeto simula as funcionalidades básicas de uma rede social.

#### Observação

Após as mudanças na plataforma Heroku, a api encontra-se indisponível para testes, o link da documentação servirá apenas como exemplo, logo mais este detalhe será corrigido.

Link para a documentação da API: https://documenter.getpostman.com/view/21555755/2s83S59rvj

Desenvolvido por: Gabriel dos Santos https://www.linkedin.com/in/dev-gabriel-dos-santos-silva/

Informações:

### Principais tecnologias:

Typescript; NodeJS; Express; Knex; Bcryptjs; MySQL.

### Como foi feito?

Foi desenvolvido em typescript e em ambiante nodeJS. Utilizando o paradigma da POO e modelagem beseada na arquitetura em camadas. Utilizando a biblioteca Express para conexão entre front e API. Para conexão entre API e banco de dados, foi utilizado o kenex com query builder para maior segurança no envio de informações. Para segurança de dados do usuário foi feito o hash de dados sensíveis utilizando o bcryptJS. E para gerenciamento de dados foi utilizado o MySQL. Deploy através do heroku.

### Funcionalidades:

#### Criar conta:

Para se cadastrar deve ser informado um email num formato válido, um nome de no mínimo 5 caracteres e uma senha de no mínimo 6 caracteres e um máximo de 16. Após isso receberá um token para acessar as funcionalidades da aplicação.

Atenção! Após 24h o token não será mais válido, sendo nescessário fazer login para continuar usando a aplicação.

#### Login: 
Informe o email e password.

#### Criação de um post:

O usuário é capaz de realizar uma postagem (por enquanto, apenas texto. Em breve mais recursos como imagem).

#### Vizualizar posts:
Por padrão serão retornados um máximo de 20 posts (se houver), também é possível escolher o limite de posts por requisição e/ou usar a opção de paginação. Para mais detalhes de como fazer consulte a documentação da api.

#### Deletar um post que o pertença:
Apenas admins podem deletar qualquer post que achar apropriado.

#### Curtir um post.

#### Descurtir um post.

#### Como utilizar?

Você precisará rodar a aplicação localmente, para isso precisa ter o [NodeJS](https://nodejs.org/en/download/) instalado. Após isso clone este repositório em sua máquina, crie e preencha o arquivo .env com as seguintes variáveis: 

{

const PORT = 3003

const DB_HOST = ""

const DB_USER = ""

const DB_PASSWORD = ""

const DB_DATABASE = ""

const JWT_KEY = "sua key para jwt"

const JWT_EXPIRES_IN = "tempo de expiração do token"

const BCRYPT_SALT_ROUNDS = "custo de tempo para cada verificação"

}

feito isso, cole em seu terminal: 'npm install' e 'npm start' e estará pronto para uso.

Recomendo também o uso do Postman para você testar as rotas, ele vai te ajudar a ter uma resposta "visual" das requisições e você também poderá usá-lo para enviar dados. Poderá usar a versão web, basta criar uma conta no link: https://identity.getpostman.com/signup . Após criar a conta poderá usá-lo no link: https://web.postman.co/ .
