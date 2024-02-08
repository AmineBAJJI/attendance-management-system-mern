const Student = require("../models/studentModel");
const Absence = require("../models/absenceModel");
const Session = require("../models/sessionModel");
// Get all students
module.exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific student by ID
module.exports.getStudentById = async (req, res) => {
  const studentId = req.params.id;
  try {
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getStudentsByClass = async (req, res) => {
  const { class: className } = req.params;
  try {
    const students = await Student.find({ class: className });
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getStudentsByClassAndElement = async (req, res) => {
  const { class: className, element } = req.params;

  try {
    // Find the students with the specified class name
    const students = await Student.find({ class: className });

    // Get session IDs for the given element and class
    const sessionIds = await Session.find({
      element,
      class: className,
    }).distinct("_id");

    // Find absences for the specified sessions
    const absences = await Absence.find({ session_id: { $in: sessionIds } });

    // Create a map to store the count of absences for each student
    const absenceCountMap = new Map();

    // Count absences for each student
    absences.forEach((absence) => {
      const studentId = absence.student_id.toString();
      absenceCountMap.set(studentId, (absenceCountMap.get(studentId) || 0) + 1);
    });

    // Build the response with total_absences for each student
    const studentsWithAbsences = students.map(async (student) => {
      const studentIdString = student._id.toString();

      // Calculate total number of absences for the student
      const totalAbsences = await Absence.countDocuments({
        student_id: studentIdString,
      });
      const total_justified = await Absence.countDocuments({
        student_id: studentIdString,
        justified: true,
      });
      const total_not_justified = totalAbsences - total_justified;

      const element_justified = await Absence.countDocuments({
        student_id: studentIdString,
        session_id: { $in: sessionIds },
        justified: true,
      });
      const element_not_justified = await Absence.countDocuments({
        student_id: studentIdString,
        session_id: { $in: sessionIds },
        justified: false,
      });

      return {
        ...student.toObject(),
        element_absences: absenceCountMap.get(studentIdString) || 0,
        total_absences: totalAbsences,
        total_justified: total_justified,
        total_not_justified: total_not_justified,
        element_justified: element_justified,
        element_not_justified: element_not_justified,
      };
    });

    // Send the result as a JSON response
    res.json(await Promise.all(studentsWithAbsences));
  } catch (error) {
    // Handle errors related to finding students or absences
    res.status(500).json({ error: error.message });
  }
};

// Create a new student
module.exports.createStudent = async (req, res) => {
  const { lastName, firstName, cne, apogee, className, healthInfo } = req.body;

  try {
    const newStudent = new Student({
      lastName,
      firstName,
      cne,
      apogee,
      className,
      healthInfo,
    });

    await newStudent.save();

    res.status(201).json(newStudent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
