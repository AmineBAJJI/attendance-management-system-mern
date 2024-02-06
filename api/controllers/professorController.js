const Professor = require("../models/professorModel");

// Controller functions for professors
async function getProfessorById(req, res) {
  const professorId = req.params.professorId;

  try {
    const professor = await Professor.findById(professorId);

    if (!professor) {
      return res.status(404).json({
        message: "Professor not found",
      });
    }

    res.status(200).json({
      success: true,
      data: professor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

// Controller functions for professors
async function getAllProfessors(req, res) {
  try {
    const professors = await Professor.find();

    res.status(200).json({
      success: true,
      data: professors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

module.exports = {
  getAllProfessors,
  getProfessorById,
};
