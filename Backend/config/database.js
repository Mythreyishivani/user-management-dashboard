const { Sequelize } = require('sequelize');

// Create a Sequelize instance
const sequelize = new Sequelize('user_dashboard', 'postgres', 'new_password', {
    host: 'localhost',
    dialect: 'postgres',
    logging: console.log, // optional, logs SQL queries
});

sequelize.authenticate()
    .then(() => console.log('PostgreSQL Connected!'))
    .catch(err => console.log('Error: ' + err));

module.exports = sequelize;

