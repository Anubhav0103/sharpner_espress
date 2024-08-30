

const path = require('path');


exports.getContactUs = (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'contact.html'));
};


exports.postContactUs = (req, res) => {
    const { name, email } = req.body;
    console.log(`Name: ${name}, Email: ${email}`);
    res.redirect('/success');
};


exports.getSuccess = (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'success.html'));
};
