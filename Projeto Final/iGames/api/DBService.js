
/*
Author: Daniel Centeno Einloft and Rafael Geiss.
Date:12/06/2018
Students to Business Program - Web Development 
This file implements all server's operations. The methods check if the operation is valid or not and, if an error occurs, return a flag. All errors are explained at 'Tabela de Erros.txt'
*/



const {DBModel} = require('./MongoDBModel');

//Data Bank 
const Mongoose =  require('mongoose');
const {Game, Store, User,UserStore, DBStores} = require('./Models');

const url = 'mongodb://localhost:27017';
const urlSite = `${url}/SiteData`;
const urlDataPoa = `${url}/Datapoa`;


// Class that provides the operations executed by the server.
class DBService
{


	static async CreateUser(newUser)
	{
		if(await DBModel.openConnectionAndExecuteOperation(urlSite,DBModel.FindUserByName,newUser.name) != undefined)
			return 1;// user already exists
		if(await DBModel.openConnectionAndExecuteOperation(urlSite,DBModel.FindUserStoreByName,newUser.name) != undefined)
			return 1;// user already exists
		else if(await DBModel.openConnectionAndExecuteOperation(urlSite,DBModel.FindUserByEmail,newUser.email) != undefined )
			return 2;//email already exists
		else if(await DBModel.openConnectionAndExecuteOperation(urlSite,DBModel.FindUserStoreByEmail,newUser.email) != undefined )
			return 2;//cpf already exists
		else
			if(await DBModel.openConnectionAndExecuteOperation(urlSite,DBModel.InsertData,newUser) != undefined)
				return 0; //operation completed!
			else
				return -1; //error inserting data
	}


	static async CreateUserStore(newUserStore)
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
			if( await DBModel.openConnectionAndExecuteOperation(urlSite,DBModel.InsertData,newUserStore) !=undefined)
				return 0;
			else 
				return -1;
	}

	static async CreateStore(newStore)
	{

		//checking datapoa database
		let datapoaNameStores = await DBService.CheckDataPoaName(newStore.storeName);

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
			return 11;// CEP ja existe
		else if( await DBModel.openConnectionAndExecuteOperation(urlSite,DBModel.FindUserStoreById,newStore.userStore) == undefined)
			return 6;
		
		
		await DBModel.openConnectionAndExecuteOperation(urlSite,DBModel.InsertData,newStore);
		await DBModel.openConnectionAndExecuteOperation(urlSite,DBModel.AddStoreFromUserStore,newStore);
		return 0;
	}


	static async CreateGame(newGame)
	{
		let store = await DBModel.openConnectionAndExecuteOperation(urlSite,DBModel.FindStoreById,newGame.storeId);
		if( store == undefined)
			return 7;

		
		//if store exists,add a game and add to the store list
		await DBModel.openConnectionAndExecuteOperation(urlSite,DBModel.InsertData,newGame);
		await DBModel.openConnectionAndExecuteOperation(urlSite,DBModel.AddGameToStore,newGame);
		return newGame;		
	}


	static async HoldGame(userId,gameId)
	{

		let game = await DBModel.openConnectionAndExecuteOperation(urlSite,DBModel.FindGameById,gameId);
		if(game == undefined)
			return 8;// game not found

		game.situation = 'On Hold';
		game.UserHolding = userId;
		await DBModel.openConnectionAndExecuteOperation(urlSite,DBModel.UpdateGame,game);
		await DBModel.openConnectionAndExecuteOperation(urlSite,DBModel.AddGameToUser,game);
		return 0;
	}


	static async LetGoGame(userId,gameId)
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
	}

	static async RemoveGame(gameId)
	{
		let game = await DBModel.openConnectionAndExecuteOperation(urlSite,DBModel.FindGameById,gameId);
		if(game == undefined)
			return 8;// game not found

		if(game.UserHolding != undefined)
			await DBModel.openConnectionAndExecuteOperation(urlSite,DBModel.RemoveGameFromUser,game);

		await DBModel.openConnectionAndExecuteOperation(urlSite,DBModel.RemoveGameFromStore,game);
		await DBModel.openConnectionAndExecuteOperation(urlSite,DBModel.RemoveGame,gameId);
		return 0;
	
	}



	//more straightforward operations.
	//update

	static async UpdateGame(game){	await DBModel.openConnectionAndExecuteOperation(urlSite,DBModel.UpdateGame,game);return 0;}
	
	static async UpdateUser(user){await DBModel.openConnectionAndExecuteOperation(urlSite,DBModel.UpdateUser,user);return 0;}

	static async UpdateUserStore(userStore){await DBModel.openConnectionAndExecuteOperation(urlSite,DBModel.UpdateUserStore,userStore);return 0;}

	static async UpdateStore(store){await DBModel.openConnectionAndExecuteOperation(urlSite,DBModel.UpdateStore,store); return 0;}


	//find games
	static async FindGamesByName(searchString)
	{

		let result = await DBModel.openConnectionAndExecuteOperation(urlSite,DBModel.FindGameByName,searchString);
		let gamesList =  [];
		for( let i = 0; i< result.length; i++)
		{
			gamesList.push(await DBModel.openConnectionAndExecuteOperation(urlSite,DBModel.FindGameByIdPopulate, result[i]));
		}

		console.log(gamesList);


		return  gamesList;


	}
	static async FindStoreByName(searchString){return await DBModel.openConnectionAndExecuteOperation(urlSite,DBModel.FindStoreByName,searchString);}

	static async ListStoreGames(storeId)
	{	
		if(await DBModel.openConnectionAndExecuteOperation(urlSite,DBModel.FindStoreById,storeId)== undefined)
			return 7;
		return await DBModel.openConnectionAndExecuteOperation(urlSite,DBModel.FindGamesFromStore, storeId);

	}

	//modificar......nao otimizado.
	static async ListUserGames(userId)
	{
		if(await DBModel.openConnectionAndExecuteOperation(urlSite,DBModel.FindUserById,userId)== undefined)
			return 12;//user not found
		let result = await DBModel.openConnectionAndExecuteOperation(urlSite,DBModel.FindGamesFromUser, userId);
		
		let gamesList =  [];
		for( let i = 0; i< result.games.length; i++)
		{
			gamesList.push(await DBModel.openConnectionAndExecuteOperation(urlSite,DBModel.FindGameByIdPopulate, result.games[i]));
		}

		return  gamesList;

	}

	static async ListUserStoreStores(userId)
	{
		if(await DBModel.openConnectionAndExecuteOperation(urlSite,DBModel.FindUserStoreById,userId)== undefined)
			return 12;
		let result = await DBModel.openConnectionAndExecuteOperation(urlSite,DBModel.FindStoresFromUserStore, userId);
		
		return result;
	}






	static async UserLogIn(userEmail,userPassword)
	{
		let user = await DBModel.openConnectionAndExecuteOperation(urlSite,DBModel.FindUserByEmail,userEmail);
		if(user == undefined)
		{
			let userStore = await DBModel.openConnectionAndExecuteOperation(urlSite,DBModel.FindUserStoreByEmail,userEmail);
			if(userStore == undefined)
				return 9; //email doesnt exist
			else if(userStore.password != userPassword)
				return 10;
			return userStore;

		}
		if(user.password != userPassword)
			return 10;

		return user;

	}

	static async ListStores()
	{
		return await DBModel.openConnectionAndExecuteOperation(urlSite,DBModel.ListStores, null);
	}


	//DataPoa Operations
	static async CheckDataPoaName(saerchString)
	{
		return await DBModel.openConnectionAndExecuteOperation(urlDataPoa,DBModel.Datapoa_FindStoreByName, saerchString);
	}

	static async CheckDataPoaCEP(searchString)
	{
		return await DBModel.openConnectionAndExecuteOperation(urlDataPoa,DBModel.Datapoa_FindStoreByCEP, searchString);
	}

	static async CreateDataPoaServer()
	{
		await DBModel.CreateDataBank(urlDataPoa,"newComercio.json");
		console.log("Databank created!");
		return 0;
	}

};

module.exports = DBService;
