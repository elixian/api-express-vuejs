const express = require('express');
const morgan = require('morgan');
const  config  = require('config');



const app = express();
require('./start/db')();
require('./start/route')(app);

// if( !config.get('jwtKey')){
//     throw new Error('FATAL ERROR: jwtKey n\'est pas définie dans les varaiables d\'environnement');
// }

app.use(morgan('tiny'));
require('./start/loggin')();


const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = server ;