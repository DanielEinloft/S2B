angular
.module('iGames',['ngRoute'])
.config(function($routeProvider, $locationProvider){
    $routeProvider
    .when('/teste', {
        templateUrl: 'teste.html',
        controller: 'iGamesController',
        controllerAs: 'controller', 
    })
    .when('/mural',
    {
        templateUrl: 'mural.html'
    })
    .when('/listalojas',
    {
        templateUrl: 'lista-lojas.html',
        controller: 'iGamesController',
        controllerAs: 'controller'
    })
    .when('/user',
    {
        templateUrl: 'user.html',
        controller: 'iGamesController',
        controllerAs: 'controller'
    })
    .when('/userstore',
    {
        templateUrl: 'usuarioLoja.html',
        controller: 'iGamesController',
        controllerAs: 'controller'
    })
    .when('/games',{
        templateUrl: 'procuraJogos.html',
        controller: 'iGamesController',
        controllerAs: 'controller'
    })
    .when('/cadastro',{
        templateUrl: 'cadastro.html',
        controller: 'iGamesController',
        controllerAs: 'controller'
    })
    .when('/creategame',{
        templateUrl: 'cadastroJogo.html',
        controller: 'iGamesController',
        controllerAs: 'controller'
    })
    .when('/store/games',{
        templateUrl: 'jogosLoja.html',
        controller: 'iGamesController',
        controllerAs: 'controller'
    })
	.otherwise({
		redirectTo: '/mural'
	})
	$locationProvider.hashPrefix('');
	
})
.run(['$rootScope', function($root)
{
    $root.variavel = true;
    $root.stores = [];
    $root.currentUser = {};
    $root.currentUserGames = {};
    $root.searchString = '';
    $root.gameList = [];
    $root.userStoreStores = [];
    $root.currentStore = {};


    $root.$on('$routeChangeStart', function(e, curr, prev) 
    { 
        if (curr.$$route && curr.$$route.resolve) 
        {
          // Mostra mensagem enquanto promises não resolvidas
          $root.loadingView = true;
        }
      });
    
      $root.$on('$routeChangeSuccess', function(e, curr, prev) 
      { 
        // Esconde mensagem
        $root.loadingView = false;
	  });
}]);