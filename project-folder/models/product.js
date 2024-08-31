const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');
const User = require('./user');

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
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    }
});


User.hasMany(Product, { onDelete: 'CASCADE' });
Product.belongsTo(User);


const CartItem = require('./cartItem');
const Cart = require('./cart');

Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

module.exports = Product;