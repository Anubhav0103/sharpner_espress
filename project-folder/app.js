const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');

const User = require('./models/user');
const Product = require('./models/product');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const contactRoutes = require('./routes/contact'); 

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes.router);
app.use(shopRoutes);
app.use(contactRoutes); 

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});


sequelize
    .sync()
    .then(result => {
        return User.findByPk(1);
    })
    .then(user => {
        if (!user) {
            return User.create({ name: 'John Doe', email: 'john@example.com' });
        }
        return user;
    })
    .then(user => {
        app.listen(3000, () => {
            console.log('Server is running on http://localhost:3000');
        });
    })
    .catch(err => {
        console.error('Database synchronization failed:', err);
    });



const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');

const User = require('./models/user');
const Product = require('./models/product');
const Cart = require('./models/cart');
const CartItem = require('./models/cartItem');

const cartRoutes = require('./routes/cartRoutes');



app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/cart', cartRoutes);

app.use((req, res, next) => {
    res.status(404).json({ error: 'Not Found' });
});

sequelize
    .sync()
    .then(async () => {
        
        let user = await User.findByPk(1);
        if (!user) {
            user = await User.create({ name: 'John Doe', email: 'john@example.com' });
            await user.createCart();
        }

        app.listen(3000, () => {
            console.log('Server is running on http://localhost:3000');
        });
    })
    .catch(err => {
        console.error('Database synchronization failed:', err);
    });
