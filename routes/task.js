// routes/tasks.js

const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware");
const taskController = require("../controllers/taskController");

const router = express.Router();

// Create a new task
router.post("/", authMiddleware, taskController.createTask);

// Get all tasks with pagination and sorting
router.get("/", authMiddleware, taskController.getTasks);

// Get task by ID
router.get("/:id", authMiddleware, taskController.getTaskById);

// Update a task
router.put("/:id", authMiddleware, taskController.updateTask);

// Delete a task
router.delete("/:id", authMiddleware, taskController.deleteTask);

module.exports = router;
