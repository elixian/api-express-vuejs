const express = require('express');
const bodyParser = require('body-parser')
const morgan = require('morgan');
const cors = require('cors')

//instanciate express
const app = express();


app.use(cors())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//connect mongodb
require('./start/db')();
//call all routes
require('./start/route')(app);

// if( !config.get('jwtKey')){
//     throw new Error('FATAL ERROR: jwtKey n\'est pas définie dans les varaiables d\'environnement');
// }

app.use(morgan('tiny'));
require('./start/loggin')();


const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = server ;