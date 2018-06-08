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
    res.send(company)
  }).catch((e) => {
    res.status(400).send(e);
  })
});


app.listen(port, () => {
  console.log(`app started on server ${port}`);
});
