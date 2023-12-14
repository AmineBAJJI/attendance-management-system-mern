const express = require("express");
const router = express.Router();
const sessionController = require("../controllers/sessionController");
const { requireAuth } = require("../middlewares/authMiddleware");

router.use(requireAuth);

router.get("/sessions/date/:date", sessionController.getSubjectsByDate);

router.get(
  "sessions/date/:date/subject/:subject",
  sessionController.getSessionByDateAndSubject
);

router.post("/sessions/add", sessionController.addNewSession);

router.get(
  "/sessions/date/:date/subject/:subject",
  sessionController.getSessionByDateAndSubject
);

module.exports = router;
