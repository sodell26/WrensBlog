const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const beastSchema = new Schema({
	name: {type: String, required: true},
	location: String,
	description: String,
	dispatched: Boolean
});

const Beast = model('Beast', beastSchema)

module.exports = Beast;