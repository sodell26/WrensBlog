require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;
const session = require('express-session')


//mongoose
const mongoose = require('mongoose');

const methodOverride = require('method-override');

app.use(methodOverride('_method'));

// //body parser
// app.use(express.json());

//maybe for multer
// app.set('view engine', "ejs")

const mongoURI = process.env.MONGODBURI

const db = mongoose.connection;

mongoose.connect(mongoURI, {
	useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, ()=>{
	console.log('database connected')
})

db.on('error', (err)=> { console.log('ERROR: ', err)});
db.on('connected', ()=> { console.log("mongo connected")})
db.on('disconnected', ()=> { console.log("mongo disconnected")})

app.use(express.static('public'))

app.use(express.urlencoded({extended:true}))

app.use(session({
	secret: process.env.SECRET,
	resave: false,
	saveUninitialized: false
}))

//controllers
const beastControllers = require('./controllers/beasts.js')
app.use('/wren', beastControllers)


const usersControllers = require('./controllers/users')
app.use('/users', usersControllers)

const sessionsControllers = require('./controllers/sessions')
app.use('/sessions', sessionsControllers)

app.get('/', (req,res) => {
	res.render('home.ejs', {
		currentUser: req.session.currentUser
	})
})

app.listen(PORT, () => {
	console.log("Be very quiet...")
})
