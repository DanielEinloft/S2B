class iGamesControllerClass {
	constructor(iGamesService)
	{
		this.iGamesService = iGamesService;
		
		this.gameList = []; 
		this.stores = [];

		this.searchString = '';
		this.currentUser = {};
		this.password;
		this.email;
	}


	ListStores()
	{
		try
		{
			this.iGamesService.ListStores()
			.then(resultado => 
			{
				this.stores = resultado.stores;
				document.getElementById("mainPage").style.display= "none";
				document.getElementById("listStores").style.display= "block";
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
				this.currentUser = JSON.parse(resultado.user);
				console.log(this.currentUser.name);
				document.getElementById("subscribe").style.display = "none";
				document.getElementById("enter").style.display= "none";
				document.getElementById("profile").style.display= "block";
				document.getElementById("mainPage").style.display= "none";
				document.getElementById("UserPage").style.display= "block";


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
.module('iGames',[])
.controller('iGamesController', ['iGamesService',iGamesControllerClass]);