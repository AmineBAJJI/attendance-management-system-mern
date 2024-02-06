const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");

router.get("/students", studentController.getAllStudents);
router.get("/students/:id", studentController.getStudentById);
router.post("/api/students", studentController.createStudent);
router.get("/students/class/:class", studentController.getStudentsByClass);

module.exports = router;
