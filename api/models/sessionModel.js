const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  module: {
    type: String,
    required: true,
  },
  element: {
    type: String,
    required: true,
  },
  professor_id: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  start_time: {
    type: String,
    required: true,
  },
  end_time: {
    type: String,
    required: true,
  },
  room: {
    type: String,
    required: true,
  },
});

const Session = mongoose.model("Session", sessionSchema);

module.exports = Session;
