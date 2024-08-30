const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'products.json'
);

const getProductsFromFile = (cb) => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            return cb([]);
        }
        cb(JSON.parse(fileContent));
    });
};

const writeProductsToFile = (products, cb) => {
    fs.writeFile(p, JSON.stringify(products), (err) => {
        if (err) {
            console.log(err);
        }
        if (cb) {
            cb();
        }
    });
};

module.exports = class Product {
    constructor(title) {
        this.title = title;
    }

    save() {
        getProductsFromFile((products) => {
            products.push(this);
            writeProductsToFile(products);
        });
    }

    static fetchAll(cb) {
        getProductsFromFile(cb);
    }
};
