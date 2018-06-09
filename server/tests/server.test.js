const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Student} = require('./../models/student');
const {Company} = require('./../models/company');

const companies = [
  new Company({
    name : 'CompanyOne'
  }),
  new Company({
    name : 'CompanyTwo'
  })
];

const populateCompanies = (done) => {
  Company.remove({}).then(() => {
    return Company.insertMany(companies);
  }).then(() => done());
}

beforeEach(populateCompanies);

describe('POST /companies', () => {
    it('should register a new company', (done) => {
      var companyName = 'companyThree';

      request(app)
      .post('/companies')
      .send({name : companyName})
      .expect(200)
      .expect((res) => {
        expect(res.body.name).toBe(companyName);
      })
      .end((err, res) => {
        if(err){
          return done(err);
        }

        Company.find({name : companyName}).then((companies) =>{
          expect(companies.length).toBe(1);
          expect(companies[0].name).toBe(companyName);
          done();
        }).catch((e) => done(e));
    });
});

  it('should not register a company if already registered', (done) => {
    var companyName = companies[0].name;

    request(app)
    .post('/companies')
    .send({name : companyName})
    .expect(400)
    .end((err, res) => {
      if(err){
        return done(err);
      }
      Company.find().then((companies) => {
        expect(companies.length).toBe(2);
        done();
      }).catch((e) => done());
    });
  });
});
