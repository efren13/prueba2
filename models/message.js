'use strict'

var i =0;
var mongoose = rewuire('mongoose');
var Schema = mongoose.Schema;

var MessageSchema = Schema({
    text:String,
    created_at: String,
    emitter: {type:Schema.ObjectId, ref:'User'},
    receiver: {type:Schema.ObjectId, ref: 'User'}

});

module.exports = mongoose.module('Message', MessageSchema);