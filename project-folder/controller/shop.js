const Product = require('../models/product');

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

exports.getProduct = (req, res) => {
    const prodId = req.params.productId;
    Product.findByPk(prodId)
        .then(product => {
            if (!product) {
                return res.status(404).render('404', { pageTitle: 'Product Not Found' });
            }
            res.render('shop/product-detail', {
                product: product,
                pageTitle: product.title,
                path: '/products'
            });
        })
        .catch(err => {
            console.error('Error fetching product:', err);
            res.status(500).send('Internal Server Error');
        });
};

exports.postDeleteProduct = (req, res) => {
    const prodId = req.params.productId;
    Product.destroy({ where: { id: prodId } })
        .then(() => {
            res.redirect('/products');
        })
        .catch(err => {
            console.error('Error deleting product:', err);
            res.status(500).send('Internal Server Error');
        });
};
