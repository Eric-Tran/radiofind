var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new mongoose.Schema({
	_station: {type: Schema.Types.ObjectId, ref: 'Station'},
	comment: String,
	user: String,
	created_at: Date
})

mongoose.model('Comment', CommentSchema);
