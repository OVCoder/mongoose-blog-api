const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');

//Instructing mongoose to connect to our local MongoDB instance (connects to a database server running locally on the default port). 
//Below is the minimum needed to connect my-blog database running locally on the default port (27017).
//mongodb:// -A required prefix to identify that this is a sting in the standard connection format.
mongoose.connect('mongodb://localhost/my-blog');

//Enabling promises for mongoose (for easier async operations)
mongoose.Promise = Promise;

const app = express();
app.use(bodyParser.json()); // for parsing application/json

// Mounting a new morgan logger middleware function (using the given format argument,
// that is a string of a predefined name) to be executed for every request to the app.
app.use(morgan('dev'));

//connecting "/api/users" to the Express app
app.use('/api/users', require('./routes/users'));
app.use('/api/blogs', require('./routes/blogs'));

app.get('/', (req, res) => {
    res.status(200).send('my server is updated');
});


 

module.exports = app;

