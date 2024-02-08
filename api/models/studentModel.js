const mongoose = require("mongoose");
const classEnums = require("../constants/classEnums");

const studentSchema = new mongoose.Schema({
  last_name: {
    type: String,
    required: [true, "Last name is required"],
    trim: true,
  },
  first_name: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
  },
  cne: {
    type: String,
    unique: true,
    trim: true,
  },
  apogee: {
    type: String,
    required: [true, "Apogee is required"],
    unique: true,
    trim: true,
  },
  class: {
    type: String,
    required: [true, "Class name is required"],
    enum: classEnums,
  },
  has_chronic_cisease: {
    type: Boolean,
    default: false,
  },
  has_disability: {
    type: Boolean,
    default: false,
  },
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
