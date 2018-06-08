//class iGamesServiceClass {
//    FindGames() {
//        return [
//            {_id:1,title:'Um Nome',idade:12},
//            {_id:2,title:'Outro Nome',idade:25}
//        ];
//    }
//}


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



    
/*





    CreateUser(userObj) 
    {
        let post = JSON.stringify(userObj);
        let result = this.$http.post('/users',post);
        return result.then(
            (response ) => { return {flag: response.data}},
            (httpErro) => {throw new HttpError(httpErro)});
    }

    CreateUserStore(userStoreObj) 
    {
        let post = JSON.stringify(userStoreObj);
        let result = this.$http.post('/userstore',post);
        return result.then(
            (response ) => { return {flag: response.data}},
            (httpErro) => {throw new HttpError(httpErro)});
    }

    CreateStore(storeObj) 
    {
        let post = JSON.stringify(storeObj);
        let result = this.$http.post('/userstore/stores',post);
        return result.then(
            (response ) => { return {flag: response.data}},
            (httpErro) => {throw new HttpError(httpErro)});
    }

    CreateGame(gameObj) 
    {
        let post = JSON.stringify(gameObj);
        let result = this.$http.post('/stores/games',post);
        return result.then(
            (response ) => { return {flag: response.data}},
            (httpErro) => {throw new HttpError(httpErro)});
    }


*/
    
    //TODO
    /*
    HoldGame(){}
    LetGoGame(){}
    UpdateGame(){}
    UpdateUser(){}
    UpdateUserStore(){}
    UpdateStore(){}
    RemoveGame(){}
    */

}




angular
.module('iGames')
.service('iGamesService', iGamesServiceClass);



