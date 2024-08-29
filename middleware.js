const express = require('express');
const app = express();

// Middleware 1: Logging
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Middleware 2: Authentication (Example)
app.use((req, res, next) => {
    if (req.headers.authorization) {
        next();
    } else {
        res.status(401).send('Unauthorized');
    }
});

// Route
app.get('/', (req, res) => {
    res.send('<h1>Hello to Node.js</h1>');
});

// Start server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
