var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost:27017/PlacementApp");

module.exports = {mongoose}; // in es6
