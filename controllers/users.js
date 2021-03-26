const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const User = require('../models/users');


//user new route
router.get('/new', (req,res) => {
	res.render('users/new.ejs', {currentUser: req.session.currentUser})
})

// user seed route
// router.get('/new/seed', (req,res)=> {
// 	User.create([
// 	{
// 		username:"Wren",
// 		password:"IDontKillTh3m",
// 		admin:true
// 	}
// 	], (err, data) => {
// 		if (err) {
// 			console.log(err)
// 		}
// 		res.redirect('/sessions/new')
// 	})
// })

//user create route
router.post('/', (req,res) => {
	req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(13))

	User.create(req.body, (err, createdUser) => {
		if (err) {
			if(err.code===11000) {
				res.send('User already exists!')
			}
		} else {
			console.log(createdUser)
			res.rediret('/')
		}
	})
})

module.exports = router;