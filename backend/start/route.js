const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const user = require('../routes/users');
const error = require('../middleware/error');
module.exports = function (app) {
    //app.use(express.json());


    app.use(cors())
    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    // parse application/json
    app.use(bodyParser.json());
    app.use('/api/users', user);

    app.use(error);
}