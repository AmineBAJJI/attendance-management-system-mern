const mongoose = require("mongoose");
const classEnums = require("../constants/classEnums");

const studentSchema = new mongoose.Schema({
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    trim: true,
  },
  firstName: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
  },
  cne: {
    type: String,
    required: [true, "CNE is required"],
    unique: true,
    trim: true,
  },
  apogee: {
    type: String,
    required: [true, "Apogee is required"],
    unique: true,
    trim: true,
  },
  className: {
    type: String,
    required: [true, "Class name is required"],
    enum: classEnums,
  },
  healthInfo: {
    hasChronicDisease: {
      type: Boolean,
      default: false,
    },
    chronicDiseaseDetails: {
      type: String,
      default: null,
    },
    hasDisability: {
      type: Boolean,
      default: false,
    },
    disabilityDetails: {
      type: String,
      default: null,
    },
  },
});

const Student = mongoose.model("student", studentSchema);

module.exports = Student;
