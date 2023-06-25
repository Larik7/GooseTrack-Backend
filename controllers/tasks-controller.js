const { Task } = require("../models/tasks");

const { HttpError } = require("../helpers");
const { ctrlWrapper } = require("../decorators");

const getTasksPerMonth = async (req, res) => {
  const result = 1;
  res.json(result);
};

const addTask = async (req, res) => {
  const owner = req.user._id;
  const result = await Task.create({ ...req.body, owner });
  res.status(201).json(result);
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const owner = req.user._id;

  const result = await Task.findOneAndUpdate({ _id: id, owner }, req.body, { new: true });
  if (!result) {
    throw HttpError(404, `Task with id = ${id} for user with id = ${owner} not found`);
  }
  res.json(result);
};

const deleteTask = async (req, res) => {
  const result = 4;
  res.json(result);
};

module.exports = {
  getTasksPerMonth: ctrlWrapper(getTasksPerMonth),
  addTask: ctrlWrapper(addTask),
  updateTask: ctrlWrapper(updateTask),
  deleteTask: ctrlWrapper(deleteTask),
};
