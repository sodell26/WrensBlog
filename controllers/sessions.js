const bcrypt = require('bcrypt');
const express = require('express');
const sessions = express.Router();
const User = require('../models/users');


//session new route
sessions.get('/new', (req,res) => {
	res.render('sessions/new.ejs', {currentUser: req.session.currentUser})
})

//user login
sessions.post('/', (req,res) => {
	User.findOne({ username: req.body.username}, (err, foundUser) => {
		if (err) {
			res.send(err)
		} else if (!foundUser){
			res.send('<a href="/sessions/new">user not found</a>')
				} else {
					if (bcrypt.compareSync(req.body.password, foundUser.password)) {
						req.session.currentUser = foundUser
						res.redirect('/wren/blog')
			} else {
				res.send('<a href="/sessions/new"> password does not match</a>')
			}
		}
	})
})

sessions.delete('/', (req,res) => {
	req.session.destroy(()=> {
		res.redirect('/')
	})
})

module.exports = sessions;

