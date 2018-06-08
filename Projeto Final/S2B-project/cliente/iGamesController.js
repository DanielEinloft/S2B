class iGamesControllerClass {
	constructor(iGamesService,$location,$rootScope)
	{
		this.iGamesService = iGamesService;
		
		this.gameList = []; 

		this.searchString = '';
		this.password;
		this.email;
		this.$location = $location;
		this.$rootScope = $rootScope;
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
				document.getElementById("subscribe").style.display = "none";
				document.getElementById("enter").style.display= "none";
				document.getElementById("profile").style.display= "block";
				this.$location.path('/user');
			})
			.catch(erro => {
				this.stores = [];
				console.log(erro)
				});


		}
		catch(err)
		{
			this.gameList = [];
			console.log(`Erro: ${err}`);
		} 

	}

    FindGames()
	{
		try
		{
			this.iGamesService.FindGames(this.searchString)
			.then(resultado => this.gameList = resultado.gameList)
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

}
angular
.module('iGames')
.controller('iGamesController', ['iGamesService','$location','$rootScope',iGamesControllerClass])