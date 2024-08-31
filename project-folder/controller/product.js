const Product = require('../models/product');

exports.getAddProduct = (req, res) => {
    res.render('shop/product-add', {
        pageTitle: 'Add Product',
        path: '/admin/add-product'
    });
};

exports.postAddProduct = (req, res) => {
    const { title, price, description } = req.body;
    Product.create({ title, price, description })
        .then(() => {
            res.redirect('/products');
        })
        .catch(err => {
            console.error('Error adding product:', err);
            res.status(500).send('Internal Server Error');
        });
};

exports.getProducts = (req, res) => {
    Product.findAll()
        .then(products => {
            res.render('shop/product-list', {
                prods: products,
                pageTitle: 'All Products',
                path: '/products'
            });
        })
        .catch(err => {
            console.error('Error fetching products:', err);
            res.status(500).send('Internal Server Error');
        });
};
