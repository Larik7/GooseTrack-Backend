const express = require("express");

const reviewsController = require("../../controllers/reviews-controller");

const schemas = require("../../schemas/reviews-schemas");

const { validateBody } = require("../../decorators");

// !?! - заглушка
// const { authenticate } = require("../../middlewares");

const authenticate = async (req, res, next) => {
  req.user = { _id: "12345"};
  next();
};

// !?!

const router = express.Router();

router.use(authenticate);

router.get("/", reviewsController.getAllReviews);

router.get("/own", authenticate, reviewsController.getReview);

router.post("/own", authenticate, validateBody(schemas.reviewAddSchema), reviewsController.addReview);

router.put("/own", authenticate, validateBody(schemas.reviewUpdateSchema), reviewsController.updateReview);

router.patch("/own", authenticate, validateBody(schemas.reviewUpdateSchema), reviewsController.updateReview);

router.delete("/own", authenticate, reviewsController.deleteReview);

module.exports = router;
