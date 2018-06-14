
/*
Author: Daniel Centeno Einloft.
Date:05/06/2018
Students to Business Program - Web Development 
Create server using Express.
*/


const express = require('express');
const cors = require('cors');
const routes = require('../iGames/routes/Routes.js');


const app = express();
app.use(cors())



app.use(express.static(__dirname + "/cliente"));
app.use('/',routes);




//run server at port 3000
app.listen(3000, () => {
    console.log('App na porta 3000');
});