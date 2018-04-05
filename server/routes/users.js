const express = require('express');
const router = express.Router(); //Creates a new router object.
const User = require('../models/User');


router.route('/')
  //defines the home page route; gets all Users
  .get((req, res) => {
		User
			.find()
			.then(users => {
					res.status(200).json(users);
			})
	})

	//creates a user
	.post((req,res)=>{
		const AdditionalUser = new User(req.body)  
		.save()
		.then(AdditionalUser => {
			res.status(201).send(AdditionalUser);
	  })
	})

  


//defines the home page route; gets all Users
// router.get('/', (req, res) => {
//   User
//     .find()
//     .then(users => {
//         res.status(200).json(users);
//     });
// });

router.get("/:id", (req, res) => {
	User
		//Model.findById() returns query, which is an object
		.findById({ _id: req.params.id }, (err, user) => {
			if (user){ 
				res.send(user);
			} else if (user === null){
				console.log("No user document exists");
				return res.status(404).send();
			}else {
				console.log("Wrong type of ID was provided");
				return res.status(404).send();
				//mongoose.Types.ObjectId() ; "51bb793aca2ab77a3200000d"-example of valid ID string
			}
		})
});

router.route('/:id')
	.put((req, res, next)	=>{
		User
			.findByIdAndUpdate(req.params.id, { $set: req.body })
      .then(updatedUsers =>{
				res.status(204).send(updatedUsers);
			})
	})
	.delete((req, res, next) => {
		User
			.findByIdAndRemove(req.params.id)
			.then (updatedUsers => {
				res.send(updatedUsers);
			})
	})


// router.post('/',(req,res)=>{
// 	const AdditionalUser = new User(req.body)  
// 	.save()
// 	.then(AdditionalUser => {
// 	  res.status(201).send(AdditionalUser);
// 	});
// });


module.exports = router;