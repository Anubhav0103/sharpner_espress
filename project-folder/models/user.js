const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');
const Cart = require('./cart');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
});

User.hasOne(Cart, { onDelete: 'CASCADE' });
Cart.belongsTo(User);

module.exports = User;