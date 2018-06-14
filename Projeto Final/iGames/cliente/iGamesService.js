/*
Author: Daniel Centeno Einloft
Students to Business Program - Web Development 
Receives data from iGamesController and sends http requests to the server
*/


class HttpError extends Error {
    constructor(response){
        super(`${response.status} : ${response.statusText}`);
        this.name = 'HttpError';
        this.response = response;
    }
}


class iGamesServiceClass 
{
    constructor($http){this.$http = $http}

    ListStores() 
    {
        let result = this.$http.get('/stores');
        return result.then(
            (response ) => { return {stores: response.data}},
            (httpErro) => {throw new HttpError(httpErro)});
    }


    ListStoreGames(searchString)
    {
        let buff = {};
        buff._id = searchString;
        
        let post = JSON.stringify(buff);
        let result = this.$http.get(`/stores/${searchString}/games`);
        return result.then(
            (response ) => { return {gameList: response.data}},
            (httpErro) => {throw new HttpError(httpErro)});

    }
    FindGames(searchString) 
    {
        let buff = {};
        buff.title = searchString;

        let post = JSON.stringify(buff);
        let result = this.$http.post('/games',post);
        return result.then(
            (response ) => { return {gameList: response.data}},
            (httpErro) => {throw new HttpError(httpErro)});
    }

    FindUserStoreStores(searchString)
    {
        let buff = {};
        buff._id = searchString;
        
        let post = JSON.stringify(buff);
        let result = this.$http.get(`/userstore/${searchString}/stores`);
        return result.then(
            (response ) => { return {UserStoreList: response.data.StoreID}},
            (httpErro) => {throw new HttpError(httpErro)});
    }

    FindUserGames(searchString) 
    {

        let buff = {};
        buff._id = searchString;
        
        let post = JSON.stringify(buff);
        let result = this.$http.get(`/users/${searchString}/games`);
        return result.then(
            (response ) => { return {gameList: response.data}},
            (httpErro) => {throw new HttpError(httpErro)});
    }

    SearchStores(searchString) 
    {
        let buff = {};
        buff.storeName = searchString;

        let post = JSON.stringify(buff);
        let result = this.$http.post('/stores',post);
        return result.then(
            (response ) => { return {stores: response.data}},
            (httpErro) => {throw new HttpError(httpErro)});
    }

    LogIn(email,password) 
    {
        let buff = {};
        buff.email = email;
        buff.password = password;

        let post = JSON.stringify(buff);
        let result = this.$http.post('/enter',post);
        return result.then(
            (response ) => { return {user: JSON.stringify(response.data)}},
            (httpErro) => {throw new HttpError(httpErro)});
    }


    CreateStore(newStore)
    {
        let post = JSON.stringify(newStore);
        let result = this.$http.post('/userstore/stores',post);
        return result.then(
            (response) => {return {store: JSON.stringify(response.data)}},
            (httpErro) => {throw new HttpError(httpErro)});
    }

    CreateGame(newGame)
    {
        let post = JSON.stringify(newGame);
        let result = this.$http.post('/stores/games',post);
        return result.then(
            (response) => {
                return {game: JSON.stringify(response.data)}
            },
            (httpErro) => {throw new HttpError(httpErro)});
    }

/*
    RemoveStore(storeId)
    {
        let result = this.$http.delete(`/store/${storeId}`);
        return result.then(
            (response ) => { return {flag: response.data}},
            (httpErro) => {throw new HttpError(httpErro)});
    }
*/
    DeleteGame(gameId)
    {
        let result = this.$http.delete(`/games/${gameId}`);
        return result.then(
            (response ) => { return {flag: response.data}},
            (httpErro) => {throw new HttpError(httpErro)});
    }
    LetGoGame(game)
    {

        let result = this.$http.patch(`/games/letgo/${game.UserHolding}`,game);
        return result.then(
            (response ) => { return {user: JSON.stringify(response.data)}},
            (httpErro) => {throw new HttpError(httpErro)});
    }


    HoldGame(game,userId)
    {
        let result = this.$http.patch(`/games/hold/${userId}`,game);
        return result.then(
            (response ) => { return {user: JSON.stringify(response.data)}},
            (httpErro) => {throw new HttpError(httpErro)});
    }

    CreateUser(userObj)
    {
        let post = JSON.stringify(userObj);
        let result = this.$http.post('/users',post);
        return result.then(
            (response) => {return {user: JSON.stringify(response.data)}},
            (httpErro) => {throw new HttpError(httpErro)});

    }

    CreateUserStore(userObj)
    {
        let post = JSON.stringify(userObj);
        let result = this.$http.post('/userstore',post);
        return result.then(
            (response) => {
                return {user: JSON.stringify(response.data)}
            },
            (httpErro) => {throw new HttpError(httpErro)});

    }

}




angular
.module('iGames')
.service('iGamesService', iGamesServiceClass);



