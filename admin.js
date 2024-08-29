const express = require('express');
const router = express.Router();
router.get('/add-product', (req, res) => {
    res.send(`
        <form action="/admin/add-product" method="POST">
            <input type="text" name="productName" placeholder="Product Name">
            <input type="text" name="productSize" placeholder="Product Size">
            <button type="submit">Add Product</button>
        </form>
    `);
});

router.post('/add-product', (req, res) => {
    console.log(req.body); // Logs the parsed form data to the console
    res.send('Product added successfully!');
});

module.exports = router;
