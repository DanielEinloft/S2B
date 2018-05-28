/*
Author: Daniel Centeno Einloft.
Date:27/05/2018
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


	
	
	
	//better and cleaner interface to update any information from the databank. DOES NOT VALIDATE ANY INFORMATION, THERE'S NO RULES HERE.
	FindGameById : function(searchString) {return Game.findOne({_id: searchString});},
	FindStoreById : function(searchString) {return Store.findOne({_id: searchString});},
	FindUserById : function(searchString) {return User.findOne({_id: searchString});},
	FindUserStoreById : function(searchString) {return UserStore.findOne({_id: searchString});},
		
	FindGameByName : function(searchString) {return Game.find().where("title").equals(searchString).exec();},
	FindStoreByName : function(searchString) {return Store.find().where("storeName").equals(searchString).exec();},
	FindUserByName : function(searchString) {return User.findOne({name: searchString});},
	FindUserStoreByName : function(searchString) {return UserStore.findOne({name: searchString});},
	
	InsertData : function (newData){return newData.save();},
	AddGameToStore : function(newGame){return Store.update({_id:newGame.store}, {$push: {games: newGame}}).exec()},
	AddGameToUser : function(newGame){return User.update({_id:newGame.user}, {$push: {games: newGame}}).exec()},



	RemoveGame : function (searchString){return Game.remove({_id:searchString}).exec();},
	RemoveGameFromStore : function (info){return Store.update({_id:info.storeId}, {$pull: {games: info.gameId}}).exec() },
	RemoveGameFromUser : function (info){return User.update({_id:info.storeId}, {$pull: {games: info.gameId}}).exec() },
	RemoveStore : function (searchString){return Store.remove({_id:searchString}).exec();},
	RemoveUser : function (searchString){return User.remove({_id:searchString}).exec(); },
	RemoveUserStore : function (searchString){return UserStore.remove({_id:searchString}).exec();},
	
	
	UpdateGame : function(game) {{return Game.update({_id:game._id}, {$set: {title: game.title ,situation: game.situation, price: game.price, holdTime: game.holdTime}}).exec()}},
	UpdateStoreInformation : function(store) {return Store.update({_id:store._id}, {$set: {storeName: store.storeName, address: store.address, CEP: store.CEP}}).exec()},
	UpdateUserInformation : function(user) {return User.update({_id:user._id}, {$set: {name:  user.name, lastName: user.lastName, CPF:  user.CPF, email: user.email, password:  user.password,address: user.address, creditCardNumber:  user.creditCardNumber,creditCardSecurityCode: user.creditCardSecurityCode }}).exec()},
	UpdateUserStoreInformation : function(userStore) {return UserStore.update({_id:user._id}, {$set: {storeName:  userStore.storeName, managerName: userStore.managerName, CPF:  userStore.CPF, email:  userStore.email, password:  userStore.password,address: userStore.address, creditCardNumber:  userStore.creditCardNumber,StoreID: userStore.StoreID }}).exec()},


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

