import chai from "chai";
import chaiHttp from "chai-http";
import mocha from "mocha";
import request from "supertest";
import app from "../index.js";
const { it, describe, beforeEach, afterEach } = mocha;

chai.should();

chai.use(chaiHttp);

const userLogin2 = {
  email:"andela@andela.com",
  password:"Andelhfjhfj"
};

const tempLogin = {
    email: "ndicunguyesteve@gmail.com",
    password: "Diderot"
}

const userRegister = {
    email:"janesmith123578@andela.com",
    password:"Andelahfghfh",
    firstname:"Jane",
    lastname:"Smith"
};

describe("Register & login", () => {




describe("Register users", () => {
    it("It Should Register a user", (done) => {
    request(app)
      .post("/register")
      .send(userRegister)
      .end((err, res) => {
        res.should.have.status(200);
       done();
      })
  
  });
  
  });
  



// login test


describe("Login users", () => {
    it("It Should login a user", (done) => {
    request(app)
      .post("/login") 
      .send(tempLogin)
      .end((err, res) => {
        res.should.have.status(400);
       done();
      })
  
  });
  
  });

 
describe("Don't Login users", () => {
  it("It Should not login a user", (done) => {
  request(app)
    .post("/login") 
    .send(userLogin2)
    .end((err, res) => {
      res.should.have.status(400);
     done();
    })

});

});

  
});
