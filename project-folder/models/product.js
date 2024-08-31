const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'shopping_db'
});

db.connect();

module.exports = class Product {
    constructor(id, title, price, description) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.description = description;
    }

    save() {
        if (this.id) {
            // Update existing product
            db.query(
                'UPDATE products SET title = ?, price = ?, description = ? WHERE id = ?',
                [this.title, this.price, this.description, this.id],
                (err, results) => {
                    if (err) throw err;
                }
            );
        } else {
            // Insert new product
            db.query(
                'INSERT INTO products (title, price, description) VALUES (?, ?, ?)',
                [this.title, this.price, this.description],
                (err, results) => {
                    if (err) throw err;
                }
            );
        }
    }

    static fetchAll(cb) {
        db.query('SELECT * FROM products', (err, results) => {
            if (err) throw err;
            cb(results);
        });
    }

    static findById(id, cb) {
        db.query('SELECT * FROM products WHERE id = ?', [id], (err, results) => {
            if (err) throw err;
            cb(results[0]);
        });
    }

    static deleteProductById(id, cb) {
        db.query('DELETE FROM products WHERE id = ?', [id], (err, results) => {
            if (err) throw err;
            cb();
        });
    }
};
