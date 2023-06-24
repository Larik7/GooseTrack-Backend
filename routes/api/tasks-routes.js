const express = require("express");

const tasksController = require("../../controllers/tasks-controller");

const schemas = require("../../schemas/tasks-schemas");

const { validateBody } = require("../../decorators");

// !?! - заглушка
// const { authenticate } = require("../../middlewares");

const authenticate = async (req, res, next) => {
  req.user = { _id: "64846fd595e7224c749fbe7f"};
  next();
};

// !?!

const router = express.Router();

router.use(authenticate);

router.get("/", tasksController.getTasksPerMonth);

router.post("/", validateBody(schemas.taskAddSchema), tasksController.addTask);

router.put("/:id", validateBody(schemas.taskUpdateSchema), tasksController.updateTask);

router.patch("/:id", validateBody(schemas.taskUpdateSchema), tasksController.updateTask);

router.delete("/:id", tasksController.deleteTask);

module.exports = router;
