var mongoose = require('mongoose');
var User = require('./user');
var Schema = mongoose.Schema;
var schema = new Schema ({
    workplace : {type: String, required: true},
    type : {type: String, required: true},
    status : {type: String, required: true},
    color : {type: String, required: true}
});

module.exports = mongoose.model('WorkPosition', schema);