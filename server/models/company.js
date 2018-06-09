const mongoose = require('mongoose');


var companySchema = new mongoose.Schema({
  name : {
    type: String,
    required : true,
    unique:true
  }
});

var Company = mongoose.model('Company',companySchema);

module.exports = {Company, companySchema};
