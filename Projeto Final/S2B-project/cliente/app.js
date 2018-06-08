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