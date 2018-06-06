const express = require('express');
const bodyParser = require('body-parser');
const Operations = require('../operations/Operations.js');
const router = express.Router();
const jsonParser = bodyParser.json();



router.get('/create', Operations.CreateDB); //create DB

//GET operations
router.get('/stores', Operations.ListStores); //LIST ALL STORES
router.get('/stores/:_id/games', Operations.ListStoreGames); // list store games
router.get('/users/:_id/games', Operations.FindUserGames); //get user games


//POST operations
router.post('/games',jsonParser, Operations.FindGames); //search games by name
router.post('/stores',jsonParser, Operations.FindStore); //search stores by name




router.post('/users',jsonParser, Operations.CreateUser); // create user
router.post('/enter',jsonParser, Operations.LogIn); // create user
router.post('/userstore',jsonParser, Operations.CreateUserStore); // create user/log in 
router.post('/userstore/stores',jsonParser, Operations.AddStore); // add store
router.post('/stores/games',jsonParser, Operations.CreateGame); // add game


//PATCH operations.
router.patch('/games/hold/:_userId',jsonParser, Operations.HoldGame); // add game
router.patch('/games/letgo/:_userId',jsonParser, Operations.LetGoGame); // letgo game
router.patch('/games',jsonParser, Operations.UpdateGame); // update game
router.patch('/users',jsonParser, Operations.UpdateUser); // update user
router.patch('/userstore',jsonParser, Operations.UpdateUserStore); // update user store
router.patch('/stores',jsonParser, Operations.UpdateStore); // update store


//DELETE operations
router.delete('/games/:id', Operations.RemoveGame); // add game


module.exports = router;