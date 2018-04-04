const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
  title:{ type: String, required:true}, //firstName property is a string and required
	article:{type: String, required: true},
	published: {type: Date, required: true},
  featured: { type: Boolean, required: true},
  authorId: {type: Schema.Types.ObjectId, required: true, ref: 'User'},
  //author:{type: Schema.Types.ObjectId, ref: 'User'}//configures relationship (Blogs have one user)
});

module.exports = mongoose.model('Blog', BlogSchema);