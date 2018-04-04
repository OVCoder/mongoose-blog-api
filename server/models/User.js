//imports mongoose and extracts Schema into its own variable
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//creates a new Mongoose Schema with properties
const UserSchema = new Schema({
  firstName:{ type: String, required:true}, //firstName property is a string and required
	lastName:{type: String, required: true},
	email: {type: String, required: true},
	social:{
		facebook: { type: String, required: false},
		twitter: {type: String, required: false},
		linkedIn: {type: String, required: false}
	},
	blogs: [{type: Schema.Types.ObjectId, ref: 'Blog'}]	//configures relationship (Users have many blogs)
});

//User (singular name) is a name of the collection our model is for.
//Mongoose automatically looks for the plural version of our model name.
//Thus, the model User is for the users collection in the database. 
//The .model() function makes a copy of schema. Need to make sure that everything
// has been added to schema before calling .model().

module.exports = mongoose.model('User', UserSchema);