const mysql = require('mysql2');
const dbConfig = require('../config/db.config');
const { logger } = require('../utils');

const connection = mysql.createConnection(dbConfig);

connection.connect((error) => {
    if (error) {
        throw error;
    }
    logger('Successfully connected to the database.');
});

module.exports = connection;
