Depend�ncias: MongoDB, nodeJS
--------------------------------------------------------------------------------------------------------------------------------------------------------
A) Crie o banco de dados:
1- Execute o MongoDB (sudo ./mongod para linux e mongod para windows)
2 - Abra o MongoDB Compass e crie duas databases: Datapoa e SiteData
3 - Importe o arquivo dbstores.json para a database Datapoa e o restante para a database SiteData.
4- Garanta que a hierarquia seja esta:

Datapoa
	dbstores

SiteData
	games
	stores
	users
	userstores

5 - O software MongoDB pode dar erro de importa��o (motivo desconhecido). Neste caso, v� para B)2a.

--------------------------------------------------------------------------------------------------------------------------------------------------------
B) 
1 - V� para a pasta iGames utilizando o terminal do windows ou linux e, pelo node, execute o servidor iGamesServidor.js. O servidor ir� executar na porta 3000.
2a - Caso aconte�a o erro na importa��o do banco dbstores, abra o browser (ou alguma ferramenta que fa�a requisi��es http) no seguinte endere�o: localhost:3000/create e espere a cria��o do banco (vai ser criado 69946 itens).

Agora o site pode ser executado utilizando o endere�o localhost:3000, que ser� redirecionado para a p�gina localhost:3000/#/mural.