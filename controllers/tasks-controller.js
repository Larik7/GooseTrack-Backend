const { Task } = require("../models/tasks");

const { HttpError } = require("../helpers");
const { ctrlWrapper } = require("../decorators");

const getTasksPerMonth = async (req, res) => {
  const result = 0;
  res.json(result);
};

const addTask = async (req, res) => {
  const result = 0;
  res.json(result);
};

const updateTask = async (req, res) => {
  const result = 0;
  res.json(result);
};

const deleteTask = async (req, res) => {
  const result = 0;
  res.json(result);
};

module.exports = {
  getTasksPerMonth: ctrlWrapper(getTasksPerMonth),
  addTask: ctrlWrapper(addTask),
  updateTask: ctrlWrapper(updateTask),
  deleteTask: ctrlWrapper(deleteTask),
};
