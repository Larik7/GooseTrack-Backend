const express = require("express");

const tasksController = require("../../controllers/tasks-controller");

const schemas = require("../../schemas/tasks-schemas");

const { auth, validateBody, isValidId } = require("../../middlewares");

const router = express.Router();

router.use(auth);

router.get("/", tasksController.getTasksPerMonth);

router.post("/", validateBody(schemas.taskAddSchema), tasksController.addTask);

router.put("/:id", isValidId, validateBody(schemas.taskUpdateSchema), tasksController.updateTask);

router.patch("/:id", isValidId, validateBody(schemas.taskUpdateSchema), tasksController.updateTask);

router.delete("/:id", isValidId, tasksController.deleteTask);

module.exports = router;
