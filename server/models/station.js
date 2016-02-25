var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StationSchema = new mongoose.Schema({
	name: String,
	frequency: String,
	wave: String,
	call_sign: String,
	genre: String,
	location: String,
	url: String,
	description: String,
	created_at: Date,
	comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
	// _user: [{type: Schema.Types.ObjectId, ref: 'User'}]
})

mongoose.model('Station', StationSchema);