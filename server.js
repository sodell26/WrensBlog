require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.Port;


//mongoose
const mongoose = require('mongoose');

const methodOverride = require('method-override');

app.use(methodOverride('_method'));

//body parser
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.set('view engine', "ejs")

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

//controllers
const beastControllers = require('./controllers/beasts.js')
app.use('/wren', beastControllers)



app.listen(port, () => {
	console.log("Be very quiet...")
})
