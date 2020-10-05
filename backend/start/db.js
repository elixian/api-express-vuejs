const mongoose = require('mongoose');
const config = require('config');
const winston = require('winston')

module.exports = () => {
    const connectionString = `mongodb://${config.get('db.host')}:${config.get('db.port')}/${config.get('db.dbName')}`;

    mongoose.connect(connectionString,{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
        .then(() => winston.info(`Connected to MongoDB... ${connectionString}`));
}