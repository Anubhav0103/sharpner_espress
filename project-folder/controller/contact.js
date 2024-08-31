const Product = require('./models/product');

exports.getAddProduct = (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'add-product.html'));
};

exports.postAddProduct = (req, res) => {
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/shop');
};

exports.getProducts = (req, res) => {
    Product.fetchAll((products) => {
        res.sendFile(path.join(__dirname, '../views', 'shop.html'), { products });
    });
};
