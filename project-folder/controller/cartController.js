const Cart = require('../models/cart');
const CartItem = require('../models/cartItem');
const Product = require('../models/product');
const User = require('../models/user');

exports.getCart = async (req, res) => {
    try {
       
        const user = await User.findByPk(1, { include: Cart });
        const cart = await user.getCart();
        const items = await cart.getProducts();

        res.json(items);
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.addToCart = async (req, res) => {
    const { productId } = req.body;

    try {
       
        const user = await User.findByPk(1, { include: Cart });
        const cart = await user.getCart();
        const product = await Product.findByPk(productId);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        
        const [cartItem, created] = await CartItem.findOrCreate({
            where: {
                CartId: cart.id,
                ProductId: product.id
            },
            defaults: {
                quantity: 1
            }
        });

        if (!created) {
            
            cartItem.quantity += 1;
            await cartItem.save();
        }

        res.status(200).json({ message: 'Product added to cart successfully' });
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.deleteFromCart = async (req, res) => {
    const { productId } = req.params;

    try {
        
        const user = await User.findByPk(1, { include: Cart });
        const cart = await user.getCart();

        const cartItem = await CartItem.findOne({
            where: {
                CartId: cart.id,
                ProductId: productId
            }
        });

        if (!cartItem) {
            return res.status(404).json({ error: 'Product not found in cart' });
        }

        await cartItem.destroy();

        res.status(200).json({ message: 'Product removed from cart successfully' });
    } catch (error) {
        console.error('Error deleting from cart:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};