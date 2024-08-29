const express = require('express');
const bodyParser = require('body-parser');
const app = express();


app.use(bodyParser.urlencoded({ extended: false }));

// Route to display the form
app.get('/add-product', (req, res) => {
    res.send(`
        <form action="/product" method="POST">
            <input type="text" name="productName" placeholder="Product Name">
            <input type="text" name="productSize" placeholder="Product Size">
            <button type="submit">Add Product</button>
        </form>
    `);
});


app.post('/product', (req, res) => {
    console.log(req.body); // Logs the parsed form data to the console
    res.send('Product added successfully!');
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
