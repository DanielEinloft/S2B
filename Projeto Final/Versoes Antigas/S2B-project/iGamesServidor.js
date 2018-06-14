const express = require('express');
const cors = require('cors');
const routes = require('../S2B-project/routes/Routes.js');


const app = express();
app.use(cors())



app.use(express.static(__dirname + "/cliente"));
app.use('/',routes);





app.listen(3000, () => {
    console.log('App na porta 3000');
});