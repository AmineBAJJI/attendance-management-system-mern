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

// Get students by class
module.exports.getStudentsByClass = async (req, res) => {
  const { class: className } = req.params;
  try {
    const students = await Student.find({ class: className });
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get students by class and element
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

// Get student by class, element, and ID
module.exports.getStudentsByClassAndElementAndId = async (req, res) => {
  const { class: className, element, id: studentId } = req.params;

  try {
    const student = await Student.findOne({ _id: studentId });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const sessionIds = await Session.find({
      element,
      class: className,
    }).distinct("_id");

    const elementAbsences = await Absence.find({
      session_id: { $in: sessionIds },
      student_id: studentId,
    });

    const element_absences = elementAbsences.length;
    const element_justified = elementAbsences.filter(
      (absence) => absence.justified
    ).length;

    const element_not_justified = element_absences - element_justified;

    const totalAbsences = await Absence.find({
      student_id: studentId,
    });

    const total_justified = totalAbsences.filter(
      (absence) => absence.justified
    );
    const total_not_justified = totalAbsences.length - total_justified.length;

    const studentWithAbsences = {
      ...student.toObject(),
      total_absences: totalAbsences.length,
      element_absences: element_absences,
      element_not_justified: element_not_justified,
      element_justified: element_justified,
      total_justified: total_justified.length,
      total_not_justified: total_not_justified,
    };

    // Send the result as a JSON response
    res.json(studentWithAbsences);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new student
module.exports.createStudent = async (req, res) => {
  const {
    last_name,
    first_name,
    cne,
    apogee,
    class_name,
    has_chronic_cisease,
    has_disability,
  } = req.body;

  try {
    const newStudent = new Student({
      last_name,
      first_name,
      cne,
      apogee,
      class: class_name,
      has_chronic_cisease,
      has_disability,
    });

    await newStudent.save();

    res.status(201).json(newStudent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
