/*
Author: Daniel Centeno Einloft
Students to Business Program - Web Development 
Angular Controller. Receives data from HTML and send them to iGamesServices
*/

class iGamesControllerClass {
	constructor(iGamesService,$location,$rootScope)
	{
		this.iGamesService = iGamesService;
		

		this.password;
		this.email;
		this.$location = $location;
		this.$rootScope = $rootScope;
		this.userType = '0';
	}



	ListStores()
	{
        this.$location.path('/listalojas');
		try
		{
			this.iGamesService.ListStores()
			.then(resultado => 
			{
				this.$rootScope.stores = resultado.stores;

			 })
			.catch(erro => {
				this.stores = [];
				console.log(erro)
				});
		}
		catch(err)
		{
			this.stores = [];
			console.log(`Erro: ${err}`);
		} 
    }


    LogOff()
    {
    	this.$rootScope.currentUser = {};
    	this.$rootScope.currentUserGames = [];
    	this.$rootScope.currentStore = {};

    	//displays "Inscreva-se" and "Enter" buttons
		document.getElementById("subscribe").style.display = "block";
		document.getElementById("enter").style.display= "block";
		document.getElementById("profile").style.display= "none";

		this.$location.path('/mural');

    }

	LogIn()
	{


		try
		{
			this.email = document.getElementById("userInput").value;
			this.password = document.getElementById("password").value;

			this.iGamesService.LogIn(this.email,this.password)
			.then(resultado => 
			{
				this.$rootScope.currentUser = JSON.parse(resultado.user);


				//displays "Meu Perfil" button
				document.getElementById("subscribe").style.display = "none";
				document.getElementById("enter").style.display= "none";
				document.getElementById("profile").style.display= "block";


				//if is a normal user
				if(this.$rootScope.currentUser.games != undefined)
				{	
					this.iGamesService.FindUserGames(this.$rootScope.currentUser._id)
					.then(resultado => 
					{		
						this.$rootScope.currentUserGames = resultado.gameList;
						this.$location.path('/user');
					})			
					.catch(erro => {
						console.error(erro);
					});

				}//if it's a user store
				else if(this.$rootScope.currentUser.StoreID != undefined)
				{

					this.iGamesService.FindUserStoreStores(this.$rootScope.currentUser._id)
					.then(resultado => 
					{		
						this.$rootScope.userStoreStores = resultado.UserStoreList;
						this.$location.path('/userstore');
					})			
					.catch(erro => {
						console.error(erro);
					});
				}

			})
			.catch(erro => {Console.error(erro);});


		}
		catch(err)
		{
			this.gameList = [];
			console.log(`Erro: ${err}`);
		} 

	}





    GoToProfile()
    {
     	if(this.$rootScope.currentUser.games != undefined)
			this.$location.path('/user');
		if(this.$rootScope.currentUser.StoreID != undefined)
			this.$location.path('/userstore');
  
    }

    GoToCreateGame($index)
    {

		this.$rootScope.currentStore = this.$rootScope.userStoreStores[$index];
		this.$location.path('/creategame');
    }


	LetGoGame($index)
	{
		this.iGamesService.LetGoGame(this.$rootScope.currentUserGames[$index])
		.then (resultado =>	this.$rootScope.currentUserGames.splice($index,1))
		.catch(erro => {console.error(erro);});

	}

/*
	RemoveStore($index)
	{
		this.iGamesService.RemoveStore(this.$rootScope.userStoreStores[$index]._id)
		.then (resultado =>	{
			this.$rootScope.userStoreStores.splice($index,1);
		})
		.catch(erro => {console.error(erro);});
	}

*/
	DeleteGame($index)
	{
		this.iGamesService.DeleteGame(this.$rootScope.currentUserGames[$index]._id)
		.then (resultado =>	{
			this.$rootScope.currentUserGames.splice($index,1);
		})
		.catch(erro => {console.error(erro);});
	}


	HoldGame($index)
	{
		if(this.$rootScope.currentUser._id != undefined && this.$rootScope.currentUser.games != undefined)
		{
			this.iGamesService.HoldGame(this.$rootScope.gameList[$index],this.$rootScope.currentUser._id)
			.then (resultado =>	{
				//dele game from current list and add to user's games list
				this.$rootScope.currentUserGames.push(this.$rootScope.gameList[$index]);

				this.$rootScope.gameList.splice($index,1);

			})
			.catch(erro => {console.error(erro);});
		}
	}


	GoTo(locationString)
	{
		this.$location.path(locationString);
	}


	ListStoreGames($index)
	{


		this.iGamesService.ListStoreGames(this.$rootScope.userStoreStores[$index]._id)
		.then(resultado => 
		{		
			this.$rootScope.currentUserGames = resultado.gameList;
			this.$rootScope.currentStore = this.$rootScope.userStoreStores[$index];
			this.$location.path('/store/games');
		})			
		.catch(erro => {
			console.error(erro);
		});





	}

    FindGames()
	{
		this.$rootScope.searchString = document.getElementById("searchInput").value;

		try
		{
			this.iGamesService.FindGames(this.$rootScope.searchString)
			.then(resultado => {
				this.$rootScope.gameList = [];
				let buff = resultado.gameList;
				for(let i  =0; i< buff.length; i++)
					if(buff[i].situation == 'Available')
						this.$rootScope.gameList.push(buff[i]);
				
				this.$location.path('/games');
			})
			.catch(erro => {
				this.gameList = [];
				console.log(erro)
				});
			console.log(this.gameList);
		}
		catch(err)
		{ 
			this.gameList = [];
			console.log(`Erro: ${err}`);
		} 
	};


    CreateGame(newGame)
    {
    	if(newGame.title != undefined && newGame.price != undefined)
    	{
    		newGame.storeId = this.$rootScope.currentStore._id;
			this.iGamesService.CreateGame(newGame)
			.then(resultado => {this.$location.path('/userstore');})
			.catch(erro =>
			{
				console.log(erro)
			});




    	}
    }

    CreateStore(newStore)
    {
    	if(newStore.CEP  && newStore.address && newStore.storeName )
    	{
    		newStore.userStore = this.$rootScope.currentUser._id;
			this.iGamesService.CreateStore(newStore)
    		.then(resultado => 
    		{
    			this.$rootScope.userStoreStores.push(JSON.parse(resultado.store));
    			this.$location.path('/userstore');
    		})
			.catch(erro =>
			{
				console.log(erro)
			});
    	}
    }

	CreateUser(newUser)
	{
		if(newUser.name  && newUser.email && newUser.password && newUser.address )
			if(this.userType==0) //new user
			{

				try
				{
					this.iGamesService.CreateUser(newUser)
					.then(resultado => {
						this.$rootScope.currentUser = JSON.parse(resultado.user);

						//displays 'Meu perfil' page
						document.getElementById("subscribe").style.display = "none";
						document.getElementById("enter").style.display= "none";
						document.getElementById("profile").style.display= "block";
		

						this.iGamesService.FindUserGames(this.$rootScope.currentUser._id)
						.then(resultado => 
						{		
							this.$rootScope.currentUserGames = resultado.gameList;
							this.$location.path('/user');
						})			
						.catch(erro => {
							console.error(erro);
						});


						
					})
					.catch(erro =>
					{
						console.log(erro)
					});
				}
				catch(err)
				{
					console.log(`Erro: ${err}`);
				} 



			}
			else if(this.userType == 1) //new store user
			{
			
				try
				{
					this.iGamesService.CreateUserStore(newUser)
					.then(resultado => {
						this.$rootScope.currentUser = JSON.parse(resultado.user);

						document.getElementById("subscribe").style.display = "none";
						document.getElementById("enter").style.display= "none";
						document.getElementById("profile").style.display= "block";
		

						this.iGamesService.FindUserStoreStores(this.$rootScope.currentUser._id)
						.then(resultado => 
						{		
							this.$rootScope.userStoreStores = resultado.UserStoreList;
							this.$location.path('/userstore');
						})			
						.catch(erro => {
							console.error(erro);
						});
						
					})
					.catch(erro =>
					{
						console.log(erro)
					});
				}
				catch(err)
				{
					console.log(`Erro: ${err}`);
				} 

			}
	}


}
angular
.module('iGames')
.controller('iGamesController', ['iGamesService','$location','$rootScope',iGamesControllerClass])