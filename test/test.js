// import chai from "chai";
// import chaiHttp from "chai-http";
// import server from "../index.js";

import chai from "chai";
import chaiHttp from "chai-http";
import server from "../src/index.js";
import request from "supertest";

//Assertion style
chai.should();

chai.use(chaiHttp);

const tempPost = {
  Title : "Messy Post",
  Body : "cjhkcfgbjhcfgwebhfebn?",
  ImageLink : "https://youtu.be/f3wOS11SP9I"
};

const updatePost = {
  Title : "New Post title",
  Body : "cjhkcfgbjhcfgwebhfebn?",
  ImageLink : "https://youtu.be/f3wOS11SP9I"
};

describe("Blog CRUD", () => {
  //get all posts

  describe("GET /api/Getblog", () => {
    it("It Should GET all Posts", (done) => {
      chai
        .request(server)
        .get("/api/Getblog")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        })
        .timeout(10000);
    });
  });

  //get post by id

  describe("GET /api/Getblog/:id", () => {
    it("It Should GET a Post by ID", (done) => {
      const _id = "61f6bd7b0713577b87e01a13";
      chai
        .request(server)
        .get("/api/Getblog/" + _id)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("_id");
          res.body.should.be.a("object");
          res.body.should.have.property("title");
          res.body.should.have.property("body");
          res.body.should.have.property("imgLink");
          res.body.should.have.property("_id").equals(_id);
          done();
        })
        .timeout(10000);
    });
  });

  //post route

  describe("POST Blog", () => {
    let tempToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWYzYTQ0MThkNDQwYzhlODE2ZDQwOWQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NDMzODAzNjZ9.Ku9uyjYv-aYUB7Xka4ezHWWnPsy_y9z0hT7t3CqcHMI"
  it("should post blog with valid credentials", (done) => {
    request(server)
      .post("/api/Postblog")
      .set({
          'admin-token': tempToken,
      })  
      .send(tempPost)
      .expect(200)
      
       done();
      // .then((res) => {
      //   expect(res.body.email).to.be.eql(tempUser.Email);
      //   done();
      // })
      // .catch((err) => done(err));
  });

});

  //delete route

  describe("DELETE /api/Deleteblog/:id", () => {
    let tempToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWYzYTQ0MThkNDQwYzhlODE2ZDQwOWQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NDMzODAzNjZ9.Ku9uyjYv-aYUB7Xka4ezHWWnPsy_y9z0hT7t3CqcHMI"
    it("It Should DELETE a Post by ID", (done) => {
      const _id = "61f6bd7b0713577b87e01a13";
      request(server)
        .delete("/api/Getblog/" + _id)
        .set({
          'admin-token': tempToken,
        })
        .expect(200)  

          done();
          
        })
        .timeout(10000);
    
  });

  //patch route

  describe("PATCH /api/Updateblog/:id", () => {
    let tempToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWYzYTQ0MThkNDQwYzhlODE2ZDQwOWQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NDMzODAzNjZ9.Ku9uyjYv-aYUB7Xka4ezHWWnPsy_y9z0hT7t3CqcHMI"
    it("It Should PATCH a Post by ID", (done) => {
      const _id = "61f6bd7b0713577b87e01a13";
      request(server)
        .patch("/api/Updateblog/" + _id)
        .set({
          'admin-token': tempToken,
        })
        .send(updatePost)
        .expect(200)  

          done();
          
        })
        .timeout(10000);
    
  });


});