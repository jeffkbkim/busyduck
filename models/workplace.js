var mongoose = require('mongoose');
var WorkPosition = require('./work-position');
var mongooseUniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;
var schema = new Schema({
    name : {type: String, required: true, unique: true},
    city : {type: String, required: true},
    street : {type: String, required: true, unique: true},
    state : {type: String},
    workPositions : [{type: Schema.Types.ObjectId, ref : WorkPosition}]
});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('WorkPlace', schema);
