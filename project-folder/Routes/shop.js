const express = require('express');
const router = express.Router();
const adminData = require('./admin');

router.get('/shop', (req, res, next) => {
    res.render('shop', { products: adminData.products });
});

module.exports = router;
