const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('./db/mongoose');
const {Student} = require('./models/student');
const {Company} = require('./models/company');

var port = 3000;
var app = express();

app.use(bodyParser.json());

app.post('/companies', (req, res) => {
  var company = new Company({
    name : req.body.name
  });

  company.save().then((company) => {
    res.status(200).send(company)
  }).catch((e) => {
    res.status(400).send(e);
  })
});

app.get('/companies', (req, res) => {
  Company.find({}).then((companies) => {
    res.status(200).send(companies);
  }).catch((e) => {
    res.send(400).send(e);
  });
});

app.delete('/companies/:companyName', (req, res) => {
  var companyName = req.params.companyName;
  Company.findOneAndDelete({name : companyName}).then((company) => {
    if(!company){
      return res.status(404).send('404 not found');
    }
      res.status(200).send(company);
  }).catch((e) => {
    res.send(400).send(e);
  });

});


app.listen(port, () => {
  console.log(`app started on server ${port}`);
});

module.exports = {app};
