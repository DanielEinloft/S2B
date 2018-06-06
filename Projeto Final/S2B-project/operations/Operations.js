/*
Author: Daniel Centeno Einloft
Base on:

*/

const {Game, Store, User,UserStore, DBStores} = require('../api/Models.js');
const DBService = require('../api/DBService.js');

class Operations
{



    static async UpdateStore(req,res, next)
    {
        try 
        {
            if (!req.body || !req.body._id || !req.body.storeName || !req.body.userStore|| !req.body.CEP|| !req.body.address) 
            {
                res.status(400).send('Objeto inválido de requisição');
            } 
            else
            {
                let store = new Store(req.body);
                let result = await DBService.UpdateStore(store);
                res.status(201).send('0');
            }
        }
        catch (erro) {
            res.status(500);
            next(erro);
        }
    }


    static async UpdateUserStore(req, res, next)
    {
        try 
        {
            if (!req.body || !req.body._id || !req.body.name || !req.body.email|| !req.body.password|| !req.body.address) 
            {
                res.status(400).send('Objeto inválido de requisição');
            }
            else
            {
                let userStore = new UserStore(req.body);
                let result = await DBService.UpdateUserStore(userStore);
                res.status(201).send('0');
            }
            
                      
       }
        catch (erro) {
            res.status(500);
            next(erro);
        }
    }


/*
    {"_id":"5b0ddb31f6d2cf1d2d086d41",
    "name": "Daniel EinloftX",
"email":"daniel@gmail.com",
"password":"1234561234",
"address":"rua2"}*/
    static async UpdateUser(req, res, next)
    {
        try 
        {
            if (!req.body || !req.body._id || !req.body.name || !req.body.email|| !req.body.password|| !req.body.address) 
            {
                res.status(400).send('Objeto inválido de requisição');
            }
            else
            {
                let user = new User(req.body);
                let result = await DBService.UpdateUser(user);
                res.status(201).send('0');
            }
            
                      
       }
        catch (erro) {
            res.status(500);
            next(erro);
        }
    }


    static async UpdateGame(req,res, next)
    {
        try 
        {
            if (!req.body.title || !req.body.storeId|| !req.body.price) 
            {
                res.status(400).send('Objeto inválido de requisição');
            }
            else
            {
                let game = new Game(req.body);
                let result = await DBService.UpdateGame(game);
                res.status(201).send('0');
            }
        }
        catch (erro) {
            res.status(500);
            next(erro);
        }
    }

    

    //localhost:3000/games/1
    static async RemoveGame(req,res, next)
    {
        try 
        {
            if (!req.params || !req.params.id) 
            {
                res.status(400).send('Objeto inválido de requisição');
            }
            else
            {
                let result = await DBService.RemoveGame(req.params.id);
                
                switch(result)
                {
                    case 8: // game not found
                           res.status(500);
                           break; 
                    case 0: //operation completed! :D
                           res.status(201).json('0'); 
                           break;
                    default: //unexpected error
                       res.status(500);
                       break;
                }
            }
        }
        catch (erro) {
            res.status(500);
            next(erro);
        }
    }


    //{"situation":"Available","units":1,"title":"Metal Gear Solid 4","storeId":"5b0e03570cf807271619012e","price":59.99,"holdTime":"2018-05-31T05:28:42.872Z"}
    //localhost:3000/games/letgo/5b0ddb31f6d2cf1d2d086d41
    static async LetGoGame(req,res, next)
    {
        try 
        {
            if (!req.body.title || !req.body.storeId|| !req.body.price || !req.params || !req.params._userId) 
            {
                res.status(400).send('Objeto inválido de requisição');
            }
            else
            {
                let game = new Game(req.body);
                let result = await DBService.LetGoGame(req.params._userId,game);
                
                switch(result)
                {
                    case 8: // game  not valid
                        res.status(500).send('8');
                        break; 
                    case 0: //operation completed! :D
                        res.status(201).json(result); //utilizar para a pagina do user -> usar id p/ abrir pg user
                        break;
                    default: //unexpected error
                        res.status(500).send('-1');
                        break;
                }
            }


       }
        catch (erro) {
            res.status(500);
            next(erro);
        }
    }




    //{"situation":"Available","units":1,"title":"Metal Gear Solid 4","storeId":"5b0e03570cf807271619012e","price":59.99,"holdTime":"2018-05-31T05:28:42.872Z"}
    //localhost:3000/games/hold/5b0ddb31f6d2cf1d2d086d41
    static async HoldGame(req,res, next)
    {
        try 
        {
            if (!req.body.title || !req.body.storeId|| !req.body.price || !req.params || !req.params._userId) 
            {
                res.status(400).send('Objeto inválido de requisição');
            }
            else
            {
                let game = new Game(req.body);
                let result = await DBService.HoldGame(req.params._userId,game);
                
                switch(result)
                {
                    case 8: // game  not valid
                        res.status(500).send('8');
                        break; 
                    case 0: //operation completed! :D
                        res.status(201).json(result); //utilizar para a pagina do user -> usar id p/ abrir pg user
                        break;
                    default: //unexpected error
                        res.status(500).send('-1');
                        break;
                }  
            }
            


       }
        catch (erro) {
            res.status(500);
            next(erro);
        }
    }

    //{"situation":"Available","units":1,"title":"Metal Gear Solid 4","storeId":"5b0e03570cf807271619012e","price":59.99,"holdTime":"2018-05-31T05:28:42.872Z"}
    static async CreateGame(req,res, next)
    {
        try 
        {
            if (!req.body || !req.body.title || !req.body.storeId || !req.body.price) 
            {
                res.status(400).send('Objeto inválido de requisição');
            }
            else
            {
                let newGame = new Game(req.body);
                let result = await DBService.CreateGame(newGame);

                switch(result)
                {
                    case 7: // store  not valid
                            res.status(500).send('7');
                            break; 
                    case 0: //operation completed! :D
                            res.status(201).json(result); //utilizar para a pagina do user -> usar id p/ abrir pg user
                            break;
                    default: //unexpected error
                            res.status(500).send('-1');
                            break;
                }
            }
            


       }
        catch (erro) {
            res.status(500);
            next(erro);
        }
    }



    /*
    {
	"storeName": "MEGAMIDIA INFORMATICA LTDA", 
	"address": "xyz3243XXX", 
	"CEP":90810080,
	"userStore": "5b0e047172285227ffea0e06"}
    */
    static async AddStore(req,res, next)
    {
        try 
        {
            if (!req.body || !req.body.storeName || !req.body.userStore|| !req.body.CEP|| !req.body.address) 
            {
                res.status(400).send('Objeto inválido de requisição');
            }
            else
            {
                let newStore = new Store(req.body);
                let result = await DBService.CreateStore(newStore);
                switch(result)
                {
                    case 3: // no store at datapoa database
                            res.status(400).send('3');
                            break; 
                    case 4: // invalid CEP at datapoa database
                            res.status(400).send('4');
                            break;
                    case 11: // CEP ja cadastrado
                            res.status(400).send('11');
                            break;
                    case 6: // invalid userstore
                            res.status(400).send('6');
                            break;
                    case -1: //unexpected error
                            res.status(400).send('-1');
                            break;
                    case 0: //operation completed! :D
                            res.status(201).json(result);
                            break;
                    default: //unexpected error
                            res.status(500).send('-1');
                            break;
                }                
            }
            

       }
        catch (erro) {
            res.status(500);
            next(erro);
        }
    }


    static async CreateUserStore(req, res, next)
    {
        try 
        {
            if (!req.body.name || !req.body.email|| !req.body.password|| !req.body.address) 
            {
                res.status(400).send('Objeto inválido de requisição');
            }
            else
            {
                let newUserStore = new UserStore(req.body);
                let result = await DBService.CreateUserStore(newUserStore);
                
                switch(result)
                {
                    case 1: // username already exists
                            res.status(400).send('1');
                            break; 
                    case 2: // email already exists
                            res.status(400).send('2');
                            break;
                    case -1: //unexpected error
                            res.status(400).send('-1');
                            break;
                    case 0: //operation completed! :D
                            res.status(201).json(result);
                            break;
                    default: //unexpected error
                            res.status(500).send('-1');
                            break;
                }                
            }
            

       }
        catch (erro) {
            res.status(500);
            next(erro);
        }
    }



    //{"email":"danielStore@gmail.com","password": "1234561234"}
    static async LogIn(req, res, next)
    {

        try 
        {
            if (!req.body || !req.body.email || !req.body.password) 
            {
                res.status(400).send('Objeto inválido de requisição');
            }
            else
            {
                let result = await DBService.UserLogIn(req.body.email,req.body.password);
                console.log(result);
                switch(result)
                {
                    case 9: // email does not exists
                            res.status(400).send('9');
                            break; 
                    case 10: // wrong password
                            res.status(400).send('10');
                            break;
                    case -1: //unexpected error
                            res.status(400).send('-1');
                            break;
                    default: //operation completed! :D
                            res.status(201).json(result);
                            break;
                }
            }
            

        }
        catch (erro) 
        {
            res.status(500);
            next(erro);
        }
    }




    /*
    {"name": "Daniel EinloftX",
"email":"daniel@gmail.com",
"password":"1234561234",
"address":"rua"}
    */
    static async CreateUser(req, res, next)
    {
        try 
        {
            if (!req.body || !req.body.name || !req.body.email|| !req.body.password|| !req.body.address) 
            {
                res.status(400).send('Objeto inválido de requisição');
            }
            else
            {
                let newUser = new User(req.body);
                let result = await DBService.CreateUser(newUser);
                
                switch(result)
                {
                    case 1: // username already exists
                            res.status(400).send('1');
                            break; 
                    case 2: // email already exists
                            res.status(400).send('2');
                            break;
                    case -1: //unexpected error
                            res.status(400).send('-1');
                            break;
                    case 0: //operation completed! :D
                            res.status(201).json(result);
                            break;
                    default: //unexpected error
                            res.status(400).send('-1');
                            break;
                }
            }
            

        }
        catch (erro) 
        {
            res.status(500);
            next(erro);
        }
    }


    //localhost:3000/stores/5b0e047172285227ffea0e07/games
    static async ListStoreGames(req,res, next)
    {
        try 
        {
            if (!req.params || !req.params._id) 
            {
                res.status(400).send('Dado inválido de requisição');
            }
            else
            {
                let result = await DBService.ListStoreGames(req.params._id);
                if(result == 7) //store not found
                    res.status(400).send('7');
    
                res.status(201).json(result);
            }
            


        } 
        catch (erro) //A generic error message, given when no more specific message is suitable
        {
            res.status(500);
            next(erro);
        }
    }

    static async FindStore(req,res, next)
    {
        try 
        {
            if (!req.body || !req.body.storeName) 
            {
                res.status(400).send('Dado inválido de requisição');
            }
            else
            {
                let result = await DBService.FindStoreByName(req.body.storeName);
                res.status(201).json(result);
            }


        } 
        catch (erro) //A generic error message, given when no more specific message is suitable
        {
            res.status(500);
            next(erro);
        }
    }

    
    //{"title": "Metal Gear Solid "}
    static async FindGames(req,res, next)
    {
        try 
        {
            if (!req.body || !req.body.title) 
            {
                res.status(400).send('Dado inválido de requisição');
            }
            else
            {
                let result = await DBService.FindGamesByName(req.body.title);
                                console.log(result)

                res.status(201).json(result);  
            }

        } 
        catch (erro) //A generic error message, given when no more specific message is suitable
        {
            res.status(500);
            next(erro);
        }  
    }



    //localhost:3000/users/5b0ddb31f6d2cf1d2d086d41/games
    static async FindUserGames(req,res, next)
    {
        try 
        {
            if (!req.params || !req.params._id) 
            {
                res.status(400).send('Dado inválido de requisição');
            }
            else
            {
                let result = await DBService.ListUserGames(req.params._id);
                if(result == 12) //user not found
                    res.status(400).send('12');
                else
                    res.status(201).json(result);  
            }

        } 
        catch (erro) //A generic error message, given when no more specific message is suitable
        {
            res.status(500);
            next(erro);
        }  
    }




    static async CreateDB(req,res,next)
    {
        try 
        {
            let result = await DBService.CreateDataPoaServer();
            console.log(result);
            res.status(201).send('ok');  

        } 
        catch (erro) //A generic error message, given when no more specific message is suitable
        {
            res.status(500);
            next(erro);
        } 
    }


    static async ListStores(req,res, next)
    {
        try 
        {
            let result = await DBService.ListStores();
            console.log(result);
            res.status(201).json(result);  

        } 
        catch (erro) //A generic error message, given when no more specific message is suitable
        {
            res.status(500);
            next(erro);
        }  
    }




}

module.exports = Operations;