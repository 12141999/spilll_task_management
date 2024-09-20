// controllers/taskController.js

const Task = require('../models/taskSchema');

// Create a new task
exports.createTask = async (req, res) => {
  const { title, description } = req.body;

  try {
    const task = new Task({
      title,
      description,
      userId: req.user.id
    });
    await task.save();
    res.status(201).json({message: 'success',task});
  } catch (error) {
    res.status(400).json({ message: 'Error creating task', error: error.message });
  }
};

// Get all tasks with pagination and sorting
exports.getTasks = async (req, res) => {
  const { page = 1, limit = 10, sort = 'createdAt' } = req.query;

  const pageNumber = parseInt(page, 10);
  const limitNumber = parseInt(limit, 10);
  const validSortFields = ['createdAt', 'updatedAt'];

  // Check for valid sort field
  if (!validSortFields.includes(sort)) {
    return res.status(400).json({ message: 'Invalid sort field. Use createdAt or updatedAt.' });
  }

  try {
    const tasks = await Task.find({ userId: req.user.id })
      .sort({ [sort]: 1 }) // Sort ascending
      .skip((pageNumber - 1) * limitNumber) // Skip previous pages
      .limit(limitNumber); // Limit tasks

    const totalTasks = await Task.countDocuments({ userId: req.user.id });

    res.json({
      message: 'success',
      tasks,
      currentPage: pageNumber,
      totalPages: Math.ceil(totalTasks / limitNumber),
      totalTasks
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error: error.message });
  }
};

// Get task by ID
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.user.id });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({message: 'success',task});
  } catch (error) {
    res.status(500).json({ message: 'Error fetching task', error: error.message });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  const { title, description, status } = req.body;

  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { title, description, status },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({message: 'success',task});
  } catch (error) {
    res.status(400).json({ message: 'Error updating task', error: error.message });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'success'});
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task', error: error.message });
  }
};
