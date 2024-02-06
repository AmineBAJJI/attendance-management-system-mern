const express = require("express");
const router = express.Router();
const professorController = require("../controllers/professorController");

router.get("/professors/:professorId", professorController.getProfessorById);
router.get("/professors", professorController.getAllProfessors);

module.exports = router;
