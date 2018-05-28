const {DBModel} = require('./DBModel');

//Data Bank 
const Mongoose =  require('mongoose');
const {Game, Store, User,UserStore, DBStores} = require('./schemas');

const url = 'mongodb://localhost:27017';



//TODO: Exceções


let DBController = 
{
	async FindGames(gameName){return await DBModel.openConnectionAndExecuteOperation(`${url}/SiteData`,DBModel.FindGameByName,gameName);},
	async FindStores(storeName){return await DBModel.openConnectionAndExecuteOperation(`${url}/SiteData`,DBModel.FindStoreByName,storeName);},


	async ListStoreGames(storeId)
	{
		let currentStore = await DBModel.openConnectionAndExecuteOperation(`${url}/SiteData`,DBModel.FindStoreById,storeId);

		let gamesList = [];
		for(let gameId of currentStore.games) 
			gamesList.push(await DBModel.openConnectionAndExecuteOperation(`${url}/SiteData`,DBModel.FindGameById,gameId))

		return gamesList;
	},

	async ListUserGames(userId)
	{
		let currentUser = await DBModel.openConnectionAndExecuteOperation(`${url}/SiteData`,DBModel.FindUserById,userId);

		let gamesList = [];
		for(let gameId of currentUser.games) 
			gamesList.push(await DBModel.openConnectionAndExecuteOperation(`${url}/SiteData`,DBModel.FindGameById,gameId))

		return gamesList;
	},


	//TODO
	/*async FindGameFromStore(storeId,gameName)
	{},

	async HoldGame(userId,gameId)
	{let currentUser = await DBModel.openConnectionAndExecuteOperation(`${url}/SiteData`,DBModel.FindUserById,userId);}
	*/

};



console.log(DBController.ListUserGames("5b09ce594dfe8f1e8cfac43d"));

(async function main()
{



	//let game = new Game({situation:'On Hold' ,title:"Uncharted 8 ",user:'5b09ce594dfe8f1e8cfac43d', price:39.99});
	//await DBModel.openConnectionAndExecuteOperation(`${url}/SiteData`,DBModel.InsertData,game);
	//await DBModel.openConnectionAndExecuteOperation(`${url}/SiteData`,DBModel.AddGameToUser,game);

	//let asdas = 1234;
	//console.log(typeof asdas);
	//console.log(new User({name: 1234,lastName: "Einloft", CPF:666, email:"daniel@gmail.com", password:"1234561234",address:"rua"}));
	//await DBModel.openConnectionAndExecuteOperation(`${url}/SiteData`,DBModel.UpdateUserInformation,user);



	// add game
	//let game = new Game({_id: '5b09c2d4b38149198d933521',situation:'On Hold' ,title:"Uncharted 2 ",store:'5b09b719d6cb9514478a21e4', price:39.99});
	//await openConnectionAndExecuteOperation(`${url}/SiteData`,InsertData,game);
	//await openConnectionAndExecuteOperation(`${url}/SiteData`,AddGameToStore,game);

	//await openConnectionAndExecuteOperation(`${url}/SiteData`,UpdateGame,game);


	//let store = new Store({_id: '5b09ca22e6fec11d2c14b9a9', storeName: "GameCenter", address: "xyz", CEP:"1234"});
	//await openConnectionAndExecuteOperation(`${url}/SiteData`,UpdateStoreInformation,store);

	//let user =  new User({name: "Daniel",lastName: "Einloft", CPF:123456, email:"daniel@gmail.com", password:"1234561234",address:"rua"});
	//await openConnectionAndExecuteOperation(`${url}/SiteData`,InsertData,user);


	//let user =  new User({_id: '5b09d41e638bf420f7c29cec', name: "Daniel",lastName: "Einloft", CPF:666, email:"daniel@gmail.com", password:"1234561234",address:"rua"});
	//await openConnectionAndExecuteOperation(`${url}/SiteData`,UpdateUserInformation,user);


	//let info = {};
	//info.storeId = '5b09b719d6cb9514478a21e4';
	//info.gameId = '5b09c28a54231f19452d3716';
	//await openConnectionAndExecuteOperation(`${url}/SiteData`,RemoveGameFromStore,info);

	//await openConnectionAndExecuteOperation(`${url}/SiteData`,RemoveGame,'5b09c28a54231f19452d3716');

})();
