const mongoose = require('mongoose');
const validator = require('validator');

const {companySchema} = require('./company');

var studentSchema = new mongoose.Schema({
  name : {
    type: String,
    required : true,
  },
  department : {
    type : String
  },
  rollNumber: {
      type: Number,
      required: true,
      unique: true
  },
  email: {
    type : String,
    unique:true,
    validate : {
      validator: function(email){
        return validator.isEmail(email);
      },
      message : '{VALUE} is not a valid emaid id'
    }
  },
  cgpa:{
    type :Number
  },
  password : {
    type : String,
    minlength: 6,
    required: true
  },
  registeredCompanies : [companySchema],
  tokens:[{
    access : {
      type : String,
      required : true
    },
  token : {
    type : String,
    required : true
  }}]
});

var Student = mongoose.model('Student', studentSchema);

module.exports = {Student};
