const express = require('express');
const shopController = require('../controllers/shop');
const router = express.Router();

router.get('/products', shopController.getProducts);
router.get('/products/:productId', shopController.getProduct);
router.get('/cart', shopController.getCart);
router.post('/cart', shopController.postCart);
router.post('/delete/:productId', shopController.postDeleteProduct);
module.exports = router;

