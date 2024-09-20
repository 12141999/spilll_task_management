const request = require("supertest");
const chai = require("chai");
const app = require("../server");
const User = require("../models/userSchema");

const { expect } = chai;

describe("User Authentication", () => {
  before(async () => {
    // Clear the database before tests
    await User.deleteMany({});
  });

  it("should register a new user", async () => {
    const response = await request(app)
      .post("/api/register")
      .send({
        username: "testuser",
        email: "test@example.com",
        password: "password123",
      });

    expect(response.status).to.equal(201);
    expect(response.body).to.have.property("token");
  });

  it("should log in an existing user", async () => {
    const response = await request(app)
      .post("/api/login")
      .send({ email: "test@example.com", password: "password123" });

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property("token");
  });

  it("should not log in with invalid credentials", async () => {
    const response = await request(app)
      .post("/api/login")
      .send({ email: "test@example.com", password: "12345678" });

    expect(response.status).to.equal(401);
  });
});
