const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//Instructing mongoose to connect to our local MongoDB instance
mongoose.connect('mongodb://localhost/my-blog');

//Enabling promises for mongoose (for easier async operations)
mongoose.Promise = Promise;

const app = express();
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.status(200).send('my server is updated');
})

module.exports = app;

