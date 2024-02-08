const mongoose = require("mongoose");

const absenceSchema = new mongoose.Schema({
  student_id: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  justified: {
    type: Boolean,
    default: false,
  },
  session_id: {
    type: String,
    required: true,
  },
});

const Absence = mongoose.model("Absence", absenceSchema);

module.exports = Absence;
