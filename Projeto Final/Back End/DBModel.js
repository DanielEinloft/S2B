/*
Author: Daniel Centeno Einloft.
Last Modification:29/05/2018
Students to Business Program - Web Development 
*/

//for file operations
const Readline = require('readline');
const Stream = require('stream');
const fs = require('fs')


//Data Bank 
const Mongoose =  require('mongoose');
const {Game, Store, User,UserStore, DBStores} = require('./schemas');

//const url = 'mongodb://localhost:27017';



//container for data bank operations
exports.DBModel = 
{
	//create databank from any JSON file.
	async CreateDataBank(connectionUrl,filename)
	{
		let client;
		try
		{
			client = await Mongoose.connect(connectionUrl);
			let instream = fs.createReadStream(filename);
			let outstream = new Stream();
			let rl = Readline.createInterface(instream,outstream);
		
	
			rl.on('line', async function(line)
			{
				let buff = new DBStores(JSON.parse(line));
				await buff.save();
			});
	
			//last line of the file
			rl.on('close',function(line)
			{
				rl.close();
				if(client && client.connection)
					client.connection.close();
				console.log("Connection closed");
			});
		}
		catch(err)
		{
			console.error(`Fatal Error: ${err}`);
		}
	},
	//CreateDataBank(`${url}/Datapoa`,"newComercio.json");


	
	//DataPOA Operations
	Datapoa_FindStoreByName : function(searchString) {return DBStores.find().where("storeName").equals(searchString).exec();},
	Datapoa_FindStoreByCEP : function(searchString) {return DBStores.find().where("CEP").equals(searchString).exec();},





	
	//better and cleaner interface to update any information from the databank. DOES NOT VALIDATE ANY INFORMATION, THERE'S NO RULES HERE.
	FindGameById : function(searchString) {return Game.findOne({_id: searchString});},
	FindStoreById : function(searchString) {return Store.findOne({_id: searchString});},
	FindUserById : function(searchString) {return User.findOne({_id: searchString});},
	FindUserStoreById : function(searchString) {return UserStore.findOne({_id: searchString});},
	FindGamesFromStore: function (searchString){return Game.find().where('store').equals(searchString).exec();},	
	FindGamesFromUser: function (searchString){return Game.find().where('user').equals(searchString).exec();},	


	FindUserByEmail : function(searchString) {return User.findOne({email: searchString});},
	FindUserStoreByEmail : function(searchString) {return UserStore.findOne({email: searchString});},
	FindStoreByCEP : function(searchString) {return Store.findOne({CEP: searchString});},


	FindGameByName : function(searchString) {return Game.find().where("title").equals(searchString).exec();},
	FindStoreByName : function(searchString) {return Store.find().where("storeName").equals(searchString).exec();},
	FindUserByName : function(searchString) {return User.findOne({name: searchString});},
	FindUserStoreByName : function(searchString) {return UserStore.findOne({name: searchString});},
	
	InsertData : function (newData){return newData.save();},
	AddGameToStore : function(newGame){return Store.update({_id:newGame.storeId}, {$push: {games: newGame._id}}).exec()},
	AddGameToUser : function(newGame){return User.update({_id:newGame.UserHolding}, {$push: {games: newGame._id}}).exec()},
	AddStoreFromUserStore : function (newStore){return UserStore.update({_id:newStore.userStore}, {$push: {StoreID: newStore._id}}).exec() },


	RemoveGame : function (searchString){return Game.remove({_id:searchString}).exec();},
	RemoveGameFromStore : function (gameToRemove){return Store.update({_id:gameToRemove.storeId}, {$pull: {games: gameToRemove._id}}).exec() },
	RemoveGameFromUser : function (gameToRemove){return User.update({_id:gameToRemove.UserHolding}, {$pull: {games: gameToRemove._id}}).exec() },
	RemoveStore : function (searchString){return Store.remove({_id:searchString}).exec();},
	RemoveUser : function (searchString){return User.remove({_id:searchString}).exec(); },
	RemoveUserStore : function (searchString){return UserStore.remove({_id:searchString}).exec();},
	
	
	UpdateGame : function(game) {return Game.update({_id:game._id}, {$set: game}).exec();},
	UpdateStore : function(store) {return Store.update({_id:store._id}, {$set: store}).exec();},
	UpdateUser : function(user) {return User.update({_id:user._id}, {$set: user}).exec();},
	UpdateUserStore : function(userStore) {return UserStore.update({_id:userStore._id}, {$set: userStore}).exec();},

	


	async openConnectionAndExecuteOperation(connectionUrl, Operation, opParameters)
	{
		let client;
		let result;
		try
		{
			client = await Mongoose.connect(connectionUrl);
			result = await Operation(opParameters);
			//console.log(result);

		}
		catch(err)
		{
			console.error(`Fatal Error: ${err}`);
			return err;
		}
		finally
		{
	
			if(client && client.connection)
			{
				client.connection.close();
				console.log("Connection closed.");
				return result;
			}
			
		}
	}


};

