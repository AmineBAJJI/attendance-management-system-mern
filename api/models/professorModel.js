const mongoose = require("mongoose");

const professorSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  isProgramManager: {
    type: Boolean,
    default: false,
  },
  program: {
    type: String,
    default: "",
    required: function () {
      return this.isProgramManager;
    },
  },
});

const Professor = mongoose.model("Professor", professorSchema, "professors");

module.exports = Professor;
