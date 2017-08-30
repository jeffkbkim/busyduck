var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');
var WorkPosition = require('./work-position');
var schema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    isAdmin: {type: Boolean, required: true},
    workPositions: [{type: Schema.Types.ObjectId, ref: 'WorkPosition'}]
});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', schema);