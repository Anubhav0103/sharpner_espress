const sequelize = require('./models/database');
const Product = require('/models/product');

sequelize.sync()
    .then(() => {
        console.log('Database & tables created!');
    })
    .catch(err => {
        console.error('Error syncing database:', err);
    });
