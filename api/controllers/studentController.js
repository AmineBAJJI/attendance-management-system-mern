const Student = require("../models/studentModel");

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
