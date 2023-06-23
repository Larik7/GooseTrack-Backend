const express = require("express");

const reviewsController = require("../../controllers/reviews-controller");

const schemas = require("../../schemas/reviews-schemas");

const { validateBody } = require("../../decorators");

// !?! - заглушка
// const { authenticate } = require("../../middlewares");

const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../../helpers");
const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const subscriptionList = ["starter", "pro", "business"];

const userSchema = new Schema(
  {
    email: {
      type: String,
      match: emailRegexp,
      unique: true,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, "Password is required"],
    },
    subscription: {
      type: String,
      enum: subscriptionList,
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationCode: {
      type: String,
      required: [true, 'Verify code is required'],
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

const authenticate = async (req, res, next) => {
  req.user = { _id: "64846fd595e7224c749fbe7f"};
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
