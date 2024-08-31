const Product = require('./models/product');

exports.getAddProduct = (req, res) => {
    res.render('shop/product-add', {
        pageTitle: 'Add Product',
        path: '/admin/add-product'
    });
};

exports.postAddProduct = (req, res) => {
    const { title, price, description } = req.body;
    const product = new Product(null, title, price, description);
    product.save();
    res.redirect('/products');
};

exports.getProducts = (req, res) => {
    Product.fetchAll(products => {
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'All Products',
            path: '/products'
        });
    });
};
