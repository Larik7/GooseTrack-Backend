const { Schema } = require("mongoose");
const { handleMongooseError } = require("../helpers");

const Joi = require("joi");

const reviewSchema = new Schema(
  {
    content: {
      type: String,
      required: [true, "Set content for review"],
    },
    rating: {
      type: Number,
      required: [true, "Set rating for review"],
      min: 0,
      max: 5,
      validate: {
        validator: Number.isInteger,
        message: '{VALUE} is not an integer value'
      },      
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

reviewSchema.post("save", handleMongooseError);

const reviewAddSchema = Joi.object({
  content: Joi.string().required().messages({
    "any.required": "missing required content field",
  }),
  rating: Joi.number().integer().min(0).max(5).required().messages({
    "any.required": "missing required rating field",
  }),
});

const reviewUpdateSchema = Joi.object({
  content: Joi.string(),
  rating: Joi.number().integer().min(0).max(5),
}).or("content", "rating");

module.exports = {
  reviewSchema,
  reviewAddSchema,
  reviewUpdateSchema,
};
