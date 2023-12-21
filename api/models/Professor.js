const mongoose = require("mongoose");

const professorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  is_program_manager: {
    type: Boolean,
    default: false,
  },
  program: {
    type: String,
    default: "",
    required: function () {
      return this.is_program_manager;
    },
  },
});

const Professor = mongoose.model("Professor", professorSchema, "professors");

module.exports = Professor;
