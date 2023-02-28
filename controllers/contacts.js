let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
//create a reference to the db Schema which is the model
let Contacts = require('../models/contacts');

//we want to display the bookList
module.exports.displayList = (req, res, next) => {
    Contacts.find((err, contactList) => {
        if (err) {
            return console.error(err);
        }
        else if (!req.user) {
            return res.redirect('/login');
        }
        else {
            console.log(contactList);
            const sortedContactList = contactList.sort((a, b) => a.Customer_Name.localeCompare(b.Customer_Name))
            res.render('contact/list', { title: 'Business Contacts', ContactList: sortedContactList, displayName: req.user ? req.user.displayName : '' });
        }
    });
}
module.exports.displayAddPage = (req, res, next) => {
    res.render('contact/add', { title: 'Add Contact', displayName: req.user ? req.user.displayName : '' })
}

module.exports.processAddPage = (req, res, next) => {
    let newContact = Contacts({
        "Customer_Name": req.body.name,
        "Customer_Number": req.body.number,
        "Email_ID": req.body.email
    });
    Contacts.create(newContact, (err, Contact) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/contactList');
        }
    });
}

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;
    Contacts.findById(id, (err, contactToEdit) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.render('contact/edit', { title: 'Edit Contact', contact: contactToEdit, displayName: req.user ? req.user.displayName : '' });
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id;
    let updatedContact = Contacts({
        "_id": id,
        "Customer_Name": req.body.Name,
        "Customer_Number": req.body.Number,
        "Email_ID": req.body.Email_ID
    });

    console.log('updatedContact', req.body.name)

    Contacts.updateOne({ _id: id }, updatedContact, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            //console.log(bookList);
            res.redirect('/contactList');
        }
    });
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;
    Contacts.remove({ _id: id }, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/contactList');
        }
    });
}