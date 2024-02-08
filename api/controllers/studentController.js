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

module.exports.getStudentsByClass = async (req, res) => {
  const { class: className, element } = req.params;

  try {
    // Find students with the specified class name
    const students = await Student.find({ class: className });

    // Iterate through each student and calculate the number of absences
    const studentsWithAbsences = await Promise.all(
      students.map(async (student) => {
        const numberOfAbsences = await Absence.countDocuments({
          student_id: student._id,
          element,
        });

        // Add the calculated number of absences to the student object
        return {
          ...student.toObject(),
          number_element: numberOfAbsences,
        };
      })
    );

    // Send the result as a JSON response
    res.json(studentsWithAbsences);
  } catch (error) {
    // Handle any errors and send a 500 status with an error message
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
