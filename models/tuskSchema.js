const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
const { Schema, model } = mongoose;

const taskSchema = new Schema({
  taskName: String,
  taskDescription: String,
  priority: { type: String, default: null },
  status: { type: String, default: "inactive" },
  executor: { type: String, default: null }
});

module.exports = model("Task", taskSchema);
