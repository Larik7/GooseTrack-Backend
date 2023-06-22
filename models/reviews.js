const { model } = require("mongoose");

const { reviewSchema } = require("../schemas/reviews-schemas");

const Review = model("review", reviewSchema);

module.exports = {
  Review,
}
