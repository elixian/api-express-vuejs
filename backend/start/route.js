const express = require('express');
const user = require('../routes/users');
const error = require('../middleware/error');
module.exports= function(app){
    app.use(express.json());

    
    app.use('/api/users',user); //TODO function route

    app.use(error);
}

