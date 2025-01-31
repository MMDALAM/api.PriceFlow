const mongoose = require("mongoose");

const projectSchema = mongoose.Schema(
  {
    title: { type: String },
    des: { type: String },
    img: { type: [String] },
    type: { type: String },
    category: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
