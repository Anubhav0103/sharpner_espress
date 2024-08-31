const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../util/database');
const User = require('./user'); // Import User model

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
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
        allowNull: true
    }
});


User.hasMany(Product, { onDelete: 'CASCADE' });
Product.belongsTo(User);

module.exports = Product;
