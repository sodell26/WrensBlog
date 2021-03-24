const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const User = require('../models/users');


//session new route
router.get('/new', (req,res) => {
	res.render('sessions/new.ejs', {currentUser: req.session.currentUser})
})

//user login
router.post('/', (req,res) => {
	User.findOne({ username: req.body.username}, (err, foundUser) => {
		if (err) {
			res.send(err)
		} else {
			if(foundUser) {
				console.log(foundUser)
				if(bcrypt.compareSync(req.body.password, foundUser.password)) {
					req.session.currentUser = foundUser
					res.redirect('/')
				} else {
					res.send('<h1>invalid password</h1>')
				}
			} else {
				res.send("<h1>user not found</h1>")
			}
		}
	})
})

router.delete('/', (req,res) => {
	req.session.destroy(()=> {
		res.redirect('/')
	})
})

module.exports = router;