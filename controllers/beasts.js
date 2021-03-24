const express = require('express'); 
const router = express.Router();

const Beast = require('../models/beastsModel.js')

//multer maybe
// const multer = require('multer');
// const path = require('path'); 

// const storage = multer.diskStorage({
// 	destination: './public/uploads',
// 	filename: (req,file,cb) => {
// 		cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
// 	}
// });

// const upload = multer({storage: storage})



// //home page <-- moved to server.js for sessions/users use
// router.get('/', (req,res) => {
// 	res.render('home.ejs')
// })

//index
router.get('/blog', (req,res) => {
	Beast.find({}, (err, foundBeasts, next) => {
		if (err) {
			console.log(err)
			next(err)
		} else {
			res.render('index.ejs', {beasts: foundBeasts, currentUser: req.session.currentUser})
		}

	})
})

//seed
// router.get('/seed', (req,res) => {
// 	Beast.create([
// 	{
// 		name:"Griffin",
// 		location: "Greece",
// 		description: "Territorial beast. Has the body, tail, and back legs of a lion; the head and wings of an eagle; and sometimes an eagle's talons as its front feet.",
// 		dispatched: true,
// 		img: "https://cdn.pixabay.com/photo/2019/02/25/00/54/griffin-4018762_1280.png"
// 	},
// 	{
// 		name:"Cockatrice",
// 		location:"England",
// 		description: "Has a nasty look in its eye. It's essentially a two-legged dragon or serpent-like creature with a rooster's head.",
// 		dispatched: true,
// 		img: "https://cdn.pixabay.com/photo/2016/03/31/21/38/basilisk-1296543_1280.png"
// 	},
// 	{
// 		name: "Gorgon",
// 		location: "Greece",
// 		description:"Don't look at one directly, has a stone-cold look. Part snake, part woman - has living snakes for hair. ",
// 		dispatched: true,
// 		img: "https://cdn.pixabay.com/photo/2017/01/31/21/46/amulet-2027504_1280.png"
// 	},
// 	{
// 		name: "Sea Serpent",
// 		location: "off the coast of Norway",
// 		description: "A limbless water creature longer than most ships and likes the taste of sailors. Has a venomous bite and scales to match the water, making it nearly invisible.",
// 		dispatched: true,
// 		img: "https://ipswich.files.wordpress.com/2018/11/nahant-sea-serpent.jpg"
// 	},
// 	{
// 		name: "Wendigo",
// 		location: "North America",
// 		description:"Believed to have once been a human that now hunts those lost in the woods. Can mimick the sounds of humans. It is humanoid in shape, but gaunt. The head resembles the skull of a stag and has a terrible smell.",
// 		dispatched: true,
// 		img: "https://bengalspurr.com/wp-content/uploads/2019/06/Wendigo-e1560276946456.jpg"
// 	}

// 	], (err, data) => {
// 		if (err) {
// 			console.log(err)
// 		}
// 		res.redirect('/wren/blog')
// 	})
// })

//new route
router.get('/blog/new', (req,res) => {
	res.render('new.ejs', {currentUser: req.session.currentUser})
})

//show route
router.get('/blog/:id', (req, res) => {
	Beast.findById(req.params.id, (err, foundBeast) => {
		res.render('show.ejs', {beast: foundBeast, currentUser: req.session.currentUser})
	})
})

//post route
router.post('/blog', (req, res) => {
	if(req.body.dispatched === 'on') {
		req.body.dispatched = true;
	} else {
		req.body.dispatched = false;
	}
	Beast.create(req.body, (err, createdBeast) => {
		if (err) {
			console.log(err)
			res.send(err)
		} else {
			res.redirect('/wren/blog')
		}
	})
})

//delete route
router.delete('/blog/:id', (req,res) => {
	Beast.findByIdAndRemove(req.params.id, (err, data) => {
		if (err) {
			console.log(err)
		} else {
			console.log(data)
			res.redirect('/wren/blog')
		}
	})
})


//edit route
router.get('/blog/:id/edit', (req,res) => {
	Beast.findById(req.params.id, (err, foundBeast) => {
		res.render('edit.ejs', {
			beast: foundBeast, currentUser: req.session.currentUser
		})
	})
})

//update route
router.put('/blog/:id', (req,res) => {
	if (req.body.dispatched === 'on'){
		req.body.dispatched = true;
	} else {
		req.body.dispatched = false
	}
	Beast.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, udpatedBeast) => {
		res.redirect('/wren/blog')
	})
})

module.exports = router;




















