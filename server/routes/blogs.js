const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const User = require('../models/User');

router.route('/')
  .get((req, res) => {
    Blog
      .find()
      .then(blogs => {
        res.status(200).json(blogs);
      })
  })
  .post((req, res, next) => {
    // New higher scope variable
    let dbUser = null;

    // Fetch the user from the database
    User
      .findById(req.body.authorId)
      .then(user => {
      
      // Store the fetched user in higher scope variable
      dbUser = user; 
      console.log("\n\n\n----- Found user is ", user.firstName, user._id);     
      console.log("\n---- BODY", req.body);
      // Create a blog
      const newBlog = new Blog(req.body);

      // Bind the user to it
      newBlog.author = user._id;

      // Save it to the database
      return newBlog.save();
    })
    .then(blog => {
        // Push the saved blog to the array of blogs associated with the User
        dbUser.blogs.push(blog);

        // Save the user back to the database and respond to the original HTTP request with a copy of the newly created blog.
        dbUser
          .save()
          .then(() => res.status(201).json(blog));
    })
    
  });

  router.route('/featured')
    .get((req, res) => {
      Blog
        .where({"featured": true})
        .then(blog => {
          res.send(blog);
        })
    })

router.route('/:id')
  .get((req, res) => {
    Blog
      .findById({_id: req.params.id}, (err, blog) => {
        if (blog) {
          return res.send(blog);
        } else if (blog === null){
          return res.status(404).send();
          console.log("No blog exists for submitted ID");
        } else {
          console.log("Wrong type of ID was provided");
          return res.status(404).send();
        }
      })
  })

  .put((req, res, next) => {
    Blog
    .findByIdAndUpdate(req.params.id, { $set: req.body })
    .then (updatedUsers => {
      res.status(204).send(updatedUsers);
    })
  })

  .delete((req, res, next) => {
    Blog
      .findByIdAndRemove(req.params.id)
      .then (blog => {
        res.send(blog);
      })
  })

  
 

module.exports = router;