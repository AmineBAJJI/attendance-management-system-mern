// absenceController.js
const mongoose = require("mongoose");
const Absence = require("../models/absenceModel");
const Student = require("../models/studentModel");
const Session = require("../models/sessionModel");
const { ObjectId } = require("mongoose").Types;

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

// Controller function to get absences for a specific student by ID
async function getAbsenceByStudentId(req, res) {
  const student_id = req.params.student_id;

  try {
    // Find absences for the specific student
    const absences = await Absence.find({ student_id });

    if (absences.length === 0) {
      return res.status(404).json({
        message: "Pas d'absences pour cet étudiant",
        absences: [], // Return an empty array when there are no absences
      });
    }

    // Fetch session details for each absence
    const absencesWithSessions = await Promise.all(
      absences.map(async (absence) => {
        try {
          // Populate session details for the given absence
          const populatedAbsence = await Absence.populate(absence, {
            path: "session_id",
            model: "Session",
          });

          // Exclude session_id from the toObject() method
          const { session_id, ...absenceWithoutSessionId } =
            populatedAbsence.toObject();

          return {
            ...absenceWithoutSessionId,
            session_info: populatedAbsence.session_id, // Rename to session_info
          };
        } catch (error) {
          console.error("Error while processing absence:", error.message);
          return null;
        }
      })
    );

    // Filter out null values resulting from errors in processing individual absences
    const validAbsencesWithSessions = absencesWithSessions.filter(Boolean);

    res.status(200).json({
      absences: validAbsencesWithSessions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

// Controller function to add multiple absences
async function addAbsences(req, res) {
  const absencesData = req.body;

  try {
    // Validate input data
    if (!Array.isArray(absencesData) || absencesData.length === 0) {
      return res
        .status(400)
        .json({ error: "Invalid or empty array of absences" });
    }

    // Create an array to store the new Absence instances
    const absences = [];

    // Iterate through the absencesData array and create Absence instances
    for (const data of absencesData) {
      const { student_id, date, justified, session_id } = data;

      // Validate individual absence data
      if (!student_id || !date || !session_id) {
        return res.status(400).json({ error: "Invalid absence data" });
      }

      // Create a new Absence instance
      const absence = new Absence({
        student_id,
        date: new Date(date),
        justified: !!justified,
        session_id,
      });

      absences.push(absence);
    }

    // Save all the new absences to the database
    await Absence.insertMany(absences);

    // Send a success response
    res.status(201).json({ message: "Absences added successfully", absences });
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: error.message });
  }
}

async function updateAbsence(req, res) {
  const { absenceId } = req.params;
  try {
    // Find the absence by ID
    const absence = await Absence.findById(absenceId);

    if (!absence) {
      return res.status(404).json({ message: "Absence not found" });
    }

    // Update the justified field to true
    absence.justified = true;

    // Save the updated absence
    await absence.save();

    // Send the updated absence as a response
    res.json(absence);
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: error.message });
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
  getAbsenceByStudentId,
  addAbsences,
  updateAbsence,
  getAbsenceByClass,
};
