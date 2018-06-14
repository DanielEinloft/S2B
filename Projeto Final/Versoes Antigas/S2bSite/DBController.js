const {DBModel} = require('./DBModel');

//Data Bank 
const Mongoose =  require('mongoose');
const {Game, Store, User,UserStore, DBStores} = require('./schemas');

const url = 'mongodb://localhost:27017';
const urlSite = `${url}/SiteData`;
const urlDataPoa = `${url}/Datapoa`;



//return await DBModel.openConnectionAndExecuteOperation(urlSite,DBModel.OPERACAO,INPUT);
let DBController = 
{

	async CreateUser(newUser)
	{
		if(await DBModel.openConnectionAndExecuteOperation(urlSite,DBModel.FindUserByName,newUser.name) != undefined)
			return 1;// user already exists
		if(await DBModel.openConnectionAndExecuteOperation(urlSite,DBModel.FindUserStoreByName,newUser.name) != undefined)
			return 1;// user already exists
		else if(await DBModel.openConnectionAndExecuteOperation(urlSite,DBModel.FindUserByCPF,newUser.CPF) != undefined )
			return 2;//cpf already exists
		else if(await DBModel.openConnectionAndExecuteOperation(urlSite,DBModel.FindUserStoreByCPF,newUser.CPF) != undefined )
			return 2;//cpf already exists
		else
			if(await DBModel.openConnectionAndExecuteOperation(urlSite,DBModel.InsertData,newUser) != undefined)
				return 0; //operation completed!
			else
				return -1; //error inserting data
	},


	async CreateUserStore(newUserStore)
	{
		if(await DBModel.openConnectionAndExecuteOperation(urlSite,DBModel.FindUserByName,newUserStore.name) != undefined)
			return 1;// user already exists
		if(await DBModel.openConnectionAndExecuteOperation(urlSite,DBModel.FindUserStoreByName,newUserStore.name) != undefined)
			return 1;// user already exists
		else if(await DBModel.openConnectionAndExecuteOperation(urlSite,DBModel.FindUserByEmail,newUserStore.email) != undefined )
			return 2;//email already exists
		else if(await DBModel.openConnectionAndExecuteOperation(urlSite,DBModel.FindUserStoreByEmail,newUserStore.email) != undefined )
			return 2;//email already exists
		else
			await DBModel.openConnectionAndExecuteOperation(urlSite,DBModel.InsertData,newUserStore);
	},

	//TODO;
	async CreateStore(newStore)
	{

		//checking datapoa database
		let datapoaNameStores = await DBController.CheckDataPoaName(newStore.storeName);

		//store name is valid?
		if( datapoaNameStores.length == 0) 
			return 3;		

		//CEP is valid?
		let storeCEPFound = false;
		for(let dbStore of datapoaNameStores)
		{
			if(dbStore.CEP == newStore.CEP)
			{
				storeCEPFound = true;
				break;
			}

		}
			
		if(storeCEPFound == false)
			return 4;



		//site data operations
		if(await DBModel.openConnectionAndExecuteOperation(urlSite,DBModel.FindStoreByCEP,newStore.CEP) != undefined)
			return 3;// CEP ja existe
		else if( await DBModel.openConnectionAndExecuteOperation(urlSite,DBModel.FindUserStoreById,newStore.userStore) == undefined)
			return 6;
		
		
		await DBModel.openConnectionAndExecuteOperation(urlSite,DBModel.InsertData,newStore);
		await DBModel.openConnectionAndExecuteOperation(urlSite,DBModel.AddStoreFromUserStore,newStore);
		return 0;
	},


	async CreateGame(newGame)
	{
		let store = await DBModel.openConnectionAndExecuteOperation(urlSite,DBModel.FindStoreById,newGame.storeId);
		if( store == undefined)
			return 7;

		
		//if store exists,add a game and add to the store list
		await DBModel.openConnectionAndExecuteOperation(urlSite,DBModel.InsertData,newGame);
		await DBModel.openConnectionAndExecuteOperation(urlSite,DBModel.AddGameToStore,newGame);
		return 0;		
	},


	async HoldGame(userId,gameId)
	{

		let game = await DBModel.openConnectionAndExecuteOperation(urlSite,DBModel.FindGameById,gameId);
		if(game == undefined)
			return 8;// game not found

		game.situation = 'On Hold';
		game.UserHolding = userId;
		game.holdTime = Date.now;
		await DBModel.openConnectionAndExecuteOperation(urlSite,DBModel.UpdateGame,game);
		await DBModel.openConnectionAndExecuteOperation(urlSite,DBModel.AddGameToUser,game);
		return 0;
	},


	async LetGoGame(userId,gameId)
	{
		let game = await DBModel.openConnectionAndExecuteOperation(urlSite,DBModel.FindGameById,gameId);
		if(game == undefined)
			return 8;// game not found

		await DBModel.openConnectionAndExecuteOperation(urlSite,DBModel.RemoveGameFromUser,game);
		game.situation = 'Available';
		game.UserHolding = undefined;
		await DBModel.openConnectionAndExecuteOperation(urlSite,DBModel.UpdateGame,game);
		await DBModel.openConnectionAndExecuteOperation(urlSite,DBModel.RemoveGameFromUser,game);
		return 0;
	},

	async RemoveGame(gameId)
	{
		let game = await DBModel.openConnectionAndExecuteOperation(urlSite,DBModel.FindGameById,gameId);
		if(game == undefined)
			return 8;// game not found

		if(game.UserHolding != undefined)
			await DBModel.openConnectionAndExecuteOperation(urlSite,DBModel.RemoveGameFromUser,game);

		await DBModel.openConnectionAndExecuteOperation(urlSite,DBModel.RemoveGameFromStore,game);
		await DBModel.openConnectionAndExecuteOperation(urlSite,DBModel.RemoveGame,gameId);
		return 0;
	
	},






	//more straightforward operations.
	//update

	async UpdateGame(game){	await DBModel.openConnectionAndExecuteOperation(urlSite,DBModel.UpdateGame,game);return 0;},
	
	async UpdateUser(user){await DBModel.openConnectionAndExecuteOperation(urlSite,DBModel.UpdateUser,user);return 0;},	

	async UpdateUserStore(userStore){await DBModel.openConnectionAndExecuteOperation(urlSite,DBModel.UpdateUserStore,userStore);return 0;},	

	async UpdateStore(store){await DBModel.openConnectionAndExecuteOperation(urlSite,DBModel.UpdateStore,store); return 0;},


	//find
	async FindGamesByName(searchString){return await DBModel.openConnectionAndExecuteOperation(urlSite,DBModel.FindGameByName,searchString);},
	async FindStoreByName(searchString){return await DBModel.openConnectionAndExecuteOperation(urlSite,DBModel.FindStoreByName,searchString);},

	async ListStoreGames(storeId)
	{
		if(await DBModel.openConnectionAndExecuteOperation(urlSite,DBModel.FindStoreById,storeId))
			return 7;
		return await DBModel.openConnectionAndExecuteOperation(urlSite,DBModel.FindGamesFromStore, storeId);

	},


	//DataPoa Operations
	async CheckDataPoaName(saerchString)
	{
		return await DBModel.openConnectionAndExecuteOperation(urlDataPoa,DBModel.Datapoa_FindStoreByName, saerchString);
	},

	async CheckDataPoaCEP(searchString)
	{
		return await DBModel.openConnectionAndExecuteOperation(urlDataPoa,DBModel.Datapoa_FindStoreByCEP, searchString);
	}


};







(async function main()
{


	let myUser = new User({
		//_id: '5b0dd78d4db14e1b321a5c6e',
		name: "Daniel EinloftX",
		email:"daniel@gmail.com",
		password:"1234561234",
		address:"rua"});
	
	
	let myUserStore =  new UserStore({ 
		//_id: '5b0ddb31f6d2cf1d2d086d42',
		name: "Isadora RamosXXXXX", 
		email:"daniel@gmail.com", 
		password:"1234561234",
		address:"rua"});

	
	let myStore = new Store({ 
		storeName: "MEGAMIDIA INFORMATICA LTDA", 
		address: "xyz3243XXX", 
		CEP:90810010,
		userStore: '5b0e047172285227ffea0e06'});//'5b0ddb31f6d2cf1d2d086d42'});


	let myGame = new Game({
		//_id:'5b0dfc6374812524dba16f98',
		situation:'Available' ,
		title:"Metal Gear Solid ",
		storeId:'5b0e047172285227ffea0e07',//'5b0dedd1b1bef81fedffd354', 
		price:59.99});
	



	//-----------------------------OPERACOES--------------------------------
	//console.log(await DBController.CreateUser(myUser));
	//console.log(await DBController.CreateUserStore(myUserStore));
	console.log(await DBController.CreateStore(myStore));
	//console.log(await DBController.CreateGame(myGame));
	//console.log(await DBController.LetGoGame('5b0ddb31f6d2cf1d2d086d41','5b0e03f29dba55277e2ac7e6'));
	//console.log(await DBController.RemoveGame('5b0e03f29dba55277e2ac7e6'));


	//DATAPOA
	//console.log(await DBController.CheckDataPoaName('MEGAMIDIA INFORMATICA LTDA'));
	//console.log(await DBController.CheckDataPoaCEP('90810080'));

})();



/*

[ { _id: 5b086b32ccd29c1ab580af13,
    storeName: 'MEGAMIDIA INFORMATICA LTDA',
    address: 'AV DIARIO DE NOTICIAS, 300/1031',
    CEP: 90810080,
    district: 'CRISTAL',
    description: 'LOJA DE MICROCOMPUTADORES, COMPUTADORES PESSOAIS',
    __v: 0 },
  { _id: 5b086b32ccd29c1ab580af12,
    storeName: 'MEGAMIDIA INFORMATICA LTDA',
    address: 'AV DIARIO DE NOTICIAS, 300/1031',
    CEP: 90810080,
    district: 'CRISTAL',
    description: 'SUPRIMENTO P/ COMPUTADORES E MATERIAIS INFORMATICA',
    __v: 0 },
  { _id: 5b086b32ccd29c1ab580af11,
    storeName: 'MEGAMIDIA INFORMATICA LTDA',
    address: 'AV TULIO DE ROSE, 80/112',
    CEP: 91340110,
    district: 'PASSO DA AREIA',
    description: 'SUPRIMENTO P/ COMPUTADORES E MATERIAIS INFORMATICA',
    __v: 0 } ]







*/