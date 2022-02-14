import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import server from "../index.js";
import request from "supertest";

//Assertion style
chai.should();

chai.use(chaiHttp);

const tempPost = {
  title : "Messy Post",
  body : "cjhkcfgbjhcfgwebhfebn?",
  imgLink : "https://youtu.be/f3wOS11SP9I"
};

const updatePost = {
  title : "New Post title",
  body : "cjhkcfgbjhcfgwebhfebn?",
  imgLink : "https://youtu.be/f3wOS11SP9I"
};

describe("My posts", () => {
  //get all posts

  describe("Get all posts", () => {
    it("It Should get all Posts", (done) => {
      chai
        .request(server)
        .get("/posts/getAllPosts")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        })
        .timeout(10000);
    });
  });

  //get post by id

  // describe("Get a post by Id", () => {
  //   it("It Should GET a Post by ID", (done) => {
  //     const _id = "6202b2ef194ad87db1e67afa";
  //     chai
  //       .request(server)
  //       .get("/posts/getSinglePost/" + _id)
  //       .end((err, res) => {
  //         res.should.have.status(200);
  //         res.body.should.be.a("object");
  //         done();
        
  //   });
  // });

  //post route

  describe("Create a post", () => {
    let tempToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIwMjhlZGM1NDI5ZDA3ZTBiNzIzNmFkIiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTY0NDg3MjM1MiwiZXhwIjoxNjQ0ODc1OTUyfQ._DNe4eDlHcVex1mYV_aXyX9wAqGVP6d9GH37KZAoM0k"
  it("It should create a post ", (done) => {
    request(server)
      .post("/posts/createPost")
      .set({
          'token': tempToken,
      })  
      .send(tempPost)
      .expect(200)
      
       done();
      })
      .timeout(10000);
  });

});

  //delete route

  describe("Delete posts", () => {
    let tempToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIwMjhlZGM1NDI5ZDA3ZTBiNzIzNmFkIiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTY0NDg3MjM1MiwiZXhwIjoxNjQ0ODc1OTUyfQ._DNe4eDlHcVex1mYV_aXyX9wAqGVP6d9GH37KZAoM0k"
    it("It Should delete a Post by ID", (done) => {
      const _id = "6202b2ef194ad87db1e67afa";
      request(server)
        .delete("/posts/deletePost/" + _id)
        .set({
          'token': tempToken,
        })
        .expect(200)  

          done();
          
        })
        .timeout(10000);
    
  });

  //patch route

  describe("Update posts", () => {
    let tempToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIwMjhlZGM1NDI5ZDA3ZTBiNzIzNmFkIiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTY0NDg3MjM1MiwiZXhwIjoxNjQ0ODc1OTUyfQ._DNe4eDlHcVex1mYV_aXyX9wAqGVP6d9GH37KZAoM0k"
    it("It Should update a post", (done) => {
      const _id = "6202b2ef194ad87db1e67afa";
      request(server)
        .patch("/posts/updatePost/" + _id)
        .set({
          'token': tempToken,
        })
        .send(updatePost)
        .expect(200)  

          done();
          
        })
        .timeout(10000);
    
  });
