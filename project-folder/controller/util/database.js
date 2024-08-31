const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('expense_management', 'root', 'yourpassword', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;