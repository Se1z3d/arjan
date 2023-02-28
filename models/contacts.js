let mongoose = require('mongoose');
let contactsModel = mongoose.Schema({
    CustomerID: String,
    Customer_Name: String,
    Customer_Number: String,
    Email_ID: String,

},
    {
        collection: "contacts"
    });

module.exports = mongoose.model('contacts', contactsModel);