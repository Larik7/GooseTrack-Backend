const { model } = require("mongoose");

const { taskSchema } = require("../schemas/tasks-schemas");

const Task = model("task", taskSchema);

module.exports = {
  Task,
}
