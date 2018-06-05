class iGamesControllerClass {
	constructor(iGamesService)
	{
		this.iGamesService = iGamesService;
		this.gameList = []; 
		this.stores = [];
		this.searchString = '';
	}

	ListStores()
	{
		try
		{
			this.iGamesService.ListStores()
			.then(resultado => this.stores = resultado.stores)
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
    };



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