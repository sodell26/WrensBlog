const express = require('express'); 
const router = express.Router();

const Beast = require('../models/beastsModel.js')

//home page
router.get('/', (req,res) => {
	res.render('home.ejs')
})

module.exports = router;