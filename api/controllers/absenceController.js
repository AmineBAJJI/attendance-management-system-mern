// absenceController.js
const mongoose = require("mongoose");
const Absence = require("../models/absenceModel");
const Student = require("../models/studentModel");


async function getAllAbsences(req, res) {
  try {
    const absences = await Absence.find();
    res.status(200).json({
      success: true,
      data: absences,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}


async function getAbsenceById(req, res) {
  const absenceId = req.params.absenceId;

  try {
    const absence = await Absence.findById(absenceId);

    if (!absence) {
      return res.status(404).json({
        message: "Absence not found",
      });
    }

    res.status(200).json({
      success: true,
      data: absence,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

// Controller function to add a new absence
async function addAbsence(req, res) {
  const { student_id, date, justified, session_id } = req.body;

  console.log("student_id:", student_id);

  const absence = new Absence({
    student_id,
    date: new Date(date),
    justified,
    session_id,
  });

  try {
    const newAbsence = await absence.save();
    res.status(201).json({
      success: true,
      data: newAbsence,
    });
  } catch (error) {
    console.error("Error in addAbsence:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

// Controller function to update an absence to justified=true
async function updateAbsence(req, res) {
  const absenceId = req.params.absenceId;

  try {
    const updatedAbsence = await Absence.findByIdAndUpdate(
      absenceId,
      { justified: true },
      { new: true }
    );

    if (!updatedAbsence) {
      return res.status(404).json({ error: "Absence not found" });
    }

    res.status(200).json({
      success: true,
      data: updatedAbsence,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

// Controller function to get absences by class
async function getAbsenceByClass(req, res) {
  const { class: className } = req.params;

  try {
    console.log("Class Name:", className); // Log class name

    const absencesByClass = await Absence.find({
      student_id: {
        $in: await Student.find({ class: className }).distinct("_id"),
      },
    })
      .populate({
        path: "student_id",
        model: "Student", // Use the correct model name
        select: "_id last_name first_name", // Add other fields if needed
      })
      .select("student_id date justified session_id"); // Include other fields you need

    console.log("absencesByClass:", absencesByClass); // Log the result to check

    res.status(200).json({
      success: true,
      data: absencesByClass,
    });
  } catch (error) {
    console.error("Error in getAbsenceByClass:", error); // Log the error for debugging
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

module.exports = {
  getAllAbsences,
  getAbsenceById,
  addAbsence,
  updateAbsence,
  getAbsenceByClass,
};
