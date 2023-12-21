const express = require("express");
const router = express.Router();
const sessionController = require("../controllers/sessionController");
const { requireAuth } = require("../middlewares/authMiddleware");

router.use(requireAuth);

router.get(
  "/sessions/date/:date/class/:class",
  sessionController.getSubjectsByDate
);

router.get(
  "sessions/date/:date/subject/:subject",
  sessionController.getSessionByDateAndSubject
);

router.post("/sessions/add", sessionController.addNewSession);

module.exports = router;
