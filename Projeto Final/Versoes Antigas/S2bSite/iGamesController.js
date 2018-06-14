//const Mongoose =  require('mongoose');

function pessoas() 
{
    this.dados = [
        {situation:'Available' ,title:"Metal Gear Solid ",storeId:'5b0e047172285227ffea0e07', price:59.99},
        {situation:'Available' ,title:"Metal Gear Solid 2 ",storeId:'5b0e047172285227ffea0e07', price:59.99},
    ];
};


angular
.module('iGames',[])
.controller('iGamesController', [pessoas]);


let myGame = new Game()