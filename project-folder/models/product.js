const { DataTypes } = require('sequelize');
const sequelize = require('/database');

const Product = sequelize.define('Product', {
    // Define attributes
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

module.exports = Product;
