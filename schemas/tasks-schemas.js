const { Schema } = require("mongoose");
const { handleMongooseError } = require("../helpers");

const Joi = require("joi");

const dateRegexp = /^\d{4}-\d{2}-\d{2}$/;
const timeRegexp = /^([01]\d|2[0-3]):([0-5]\d)$/;
const priorityList = ["low", "medium", "high"];
const categoryList = ["to-do", "in-progress", "done"];

const taskSchema = new Schema(
  {
    title: {
      type: String,
      maxLength: 250,
      required: [true, "Set title for task"],
    },
    date: {
      type: String,
      match: dateRegexp,
      required: [true, "Set date for task"],
    },
    start: {
      type: String,
      match: timeRegexp,
      required: [true, "Set start time for task"],
    },
    end: {
      type: String,
      match: timeRegexp,
      required: [true, "Set end time for task"],
      validate: {
        validator: function (val) {
          return (val > this.start);
        },
        message: "End time {VALUE} must be > than start time!",
      },
    },
    priority: {
      type: String,
      enum: priorityList,
      required: [true, "Set priority for task"],
    },
    category: {
      type: String,
      enum: categoryList,
      required: [true, "Set category for task"],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

taskSchema.post("save", handleMongooseError);

const taskAddSchema = Joi.object({
  title: Joi.string().max(250).required(),
  date: Joi.string().pattern(dateRegexp).required(),
  start: Joi.string().pattern(timeRegexp).required(),
  end: Joi.string().pattern(timeRegexp).required(),
  priority: Joi.string().valid(...priorityList).required(),
  category: Joi.string().valid(...categoryList).required(),
});

const taskUpdateSchema = Joi.object({
  title: Joi.string().max(250),
  date: Joi.string().pattern(dateRegexp),
  start: Joi.string().pattern(timeRegexp),
  end: Joi.string().pattern(timeRegexp),
  priority: Joi.string().valid(...priorityList),
  category: Joi.string().valid(...categoryList),
}).or("title", "date", "start", "end", "priority", "category");

module.exports = {
  taskSchema,
  taskAddSchema,
  taskUpdateSchema,
};
