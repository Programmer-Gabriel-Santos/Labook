LabBook

Objetivos deste projeto:

Treinar e demonstrar habilidades com as principais tecnologias de desenvolvimento backend em ambiente nodeJS. Este projeto simula as funcionalidades básicas de uma rede social.

Link para a documentação da API: https://documenter.getpostman.com/view/21555755/2s83S59rvj

Desenvolvido por: Gabriel dos Santos https://www.linkedin.com/in/gabriel-dos-santos-silva-a50999217/

Informações:

Principais tecnologias: 

Typescript;
NodeJS;
Express;
Knex;
Bcryptjs;
MySQL.

Como foi feito?

 Foi desenvolvido em typescript e em ambiante nodeJS.
 Utilizando o paradigma da POO e modelagem beseada na arquitetura em camadas. 
 Utilizando a biblioteca Express para conexão entre front e API.
 Para conexão entre API e banco de dados, foi utilizado o kenex com query builder para maior segurança no envio de informações.
 Para segurança de dados do usuário foi feito o hash de dados sensíveis utilizando o bcryptJS.
 E para gerenciamento de dados foi utilizado o MySQL.
 Deploy através do heroku.

Funcionalidades:

 Criar conta:
 
 Para se cadastrar deve ser informado um email num formato válido,
 um nome de no mínimo 5 caracteres e uma senha de no mínimo 6 caracteres e um máximo de 16. 
 Após isso receberá um token para acessar as funcionalidades da aplicação. 

 Atenção! Após 24h o token não será mais válido, sendo nescessário fazer login para continuar usando a aplicação.

 Login: informe o email e password.

 Criação de um post:

 O usuário é capaz de realizar uma postagem (por enquanto, apenas texto. Em breve mais recursos como imagem).

 Vizualizar todos os posts.

 Deletar um post que o pertença. Apenas admins podem deletar qualquer post que achar apropriado.

 Curtir um post.

 Descurtir um post.