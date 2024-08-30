const express = require('express');
const router = express.Router();


const products = [];


router.get('/add-product', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../views', 'add-product.html'));
});


router.post('/add-product', (req, res, next) => {
    products.push({ title: req.body.title, size: req.body.size });
    res.redirect('/shop');
});

module.exports = { router, products };
