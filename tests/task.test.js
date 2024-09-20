const request = require("supertest");
const chai = require("chai");
const app = require("../server");
const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");
const Task = require("../models/taskSchema");

const { expect } = chai;

describe("Task Management", () => {
  let token;

  before(async () => {
    await User.deleteMany({});
    await Task.deleteMany({});

    // Create a test user and log in to get a token
    const userResponse = await request(app)
      .post("/api/register")
      .send({
        username: "testuser",
        email: "test@example.com",
        password: "password123",
      });

    token = userResponse.body.token;
  });

  it("should create a new task", async () => {
    const response = await request(app)
      .post("/api/tasks/")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "New Task", description: "Task description" });

    expect(response.status).to.equal(201);
    expect(response.body.task).to.have.property("_id");
    expect(response.body.task.title).to.equal("New Task");
  });

  it("should get all tasks for the user", async () => {
    const response = await request(app)
      .get("/api/tasks/")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).to.equal(200); // Check for success status
    expect(response.body).to.have.property("tasks"); // Ensure tasks property exists
    expect(response.body.tasks).to.be.an("array"); // Check if tasks is an array
    expect(response.body.tasks).to.have.lengthOf(1); // Check the length of the tasks array
  });

  //Error handling case
  it("should not access tasks without a token", async () => {
    const response = await request(app).get("/api/tasks/");

    expect(response.status).to.equal(401);
  });

  it("should update a task", async () => {
    // First, retrieve the user ID from the token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.id;

    // Find a task for the user using the userId
    const task = await Task.findOne({ userId: userId });

    expect(task).to.exist; // Check if the task exists

    const response = await request(app)
      .put(`/api/tasks/${task._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Updated Task",
        description: "Updated description",
        status: "completed",
      });

    expect(response.status).to.equal(200); // Check for success status
    expect(response.body.task.title).to.equal("Updated Task"); // Check the updated title
  });

  it("should delete a task", async () => {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.id;

    const task = await Task.findOne({ userId: userId });

    expect(task).to.exist; // Check if the task exists

    const response = await request(app)
      .delete(`/api/tasks/${task._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).to.equal(200); // Check for success status
    expect(response.body.message).to.equal("success"); // Check for confirmation message

    //Verify that the task no longer exists in the database
    const deletedTask = await Task.findById(task._id);
    expect(deletedTask).to.be.null; // Ensure the task was deleted
  });
});
