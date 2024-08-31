const Product = require('../models/product');
const User = require('../models/user');

exports.getProducts = (req, res) => {
    User.findByPk(1) // Replace with req.user.id for authenticated users
        .then(user => {
            return user.getProducts();
        })
        .then(products => {
            res.render('shop/product-list', {
                prods: products,
                pageTitle: 'All Products',
                path: '/products'
            });
        })
        .catch(err => console.log(err));
};

exports.getProduct = (req, res) => {
    const prodId = req.params.productId;
    Product.findByPk(prodId)
        .then(product => {
            res.render('shop/product-detail', {
                product: product,
                pageTitle: product.title,
                path: '/products'
            });
        })
        .catch(err => console.log(err));
};

exports.postCart = (req, res) => {
    const prodId = req.body.productId;
    let fetchedCart;
    let newQuantity = 1;
    req.user.getCart()
        .then(cart => {
            fetchedCart = cart;
            return cart.getProducts({ where: { id: prodId } });
        })
        .then(products => {
            let product;
            if (products.length > 0) {
                product = products[0];
            }

            if (product) {
                const oldQuantity = product.cartItem.quantity;
                newQuantity = oldQuantity + 1;
                return product;
            }
            return Product.findByPk(prodId);
        })
        .then(product => {
            return fetchedCart.addProduct(product, {
                through: { quantity: newQuantity }
            });
        })
        .then(() => {
            res.redirect('/cart');
        })
        .catch(err => console.log(err));
};

exports.postDeleteProduct = (req, res) => {
    const prodId = req.params.productId;
    User.findByPk(1) req.user.id for authenticated users
        .then(user => {
            return user.getProducts({ where: { id: prodId } });
        })
        .then(products => {
            const product = products[0];
            return product.destroy();
        })
        .then(result => {
            res.redirect('/products');
        })
        .catch(err => console.log(err));
};
