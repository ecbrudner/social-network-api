const { connect, connection } = require('mongoose');

const connectionString = 'mongodb://localhost:27017';

connect(connectionString);

module.exports = connection;