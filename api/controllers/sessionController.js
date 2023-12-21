const Session = require("../models/Session");
const Professor = require("../models/Professor");
const jwt = require("jsonwebtoken");

module.exports.getSessionsByDate = async (req, res) => {
  const { date } = req.params;

  try {
    const token = req.cookies.jwt;
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const { id: userId, role } = decodedToken;

    if (role !== "professor") {
      return res.status(403).json({
        message: "Vous n'avez pas les droits nécessaires.",
      });
    }

    const professor = await Professor.findOne({ user_id: userId });

    if (!professor) {
      return res.status(404).json({
        message: "Professor not found in the database.",
      });
    }
    const professorId = professor._id;

    const sessions = await Session.find({
      date: new Date(date),
      professor_id: professorId,
    });

    if (sessions.length === 0) {
      return res.status(404).json({
        message: "Pas de séances dans cette date pour vous.",
      });
    }

    res.json(sessions);
  } catch (error) {
    console.error("Error:", error);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }

    res.status(401).json({ message: "Token invalide" });
  }
};

module.exports.addNewSession = async (req, res) => {
  const {
    professor_id,
    class: className,
    date,
    start_time,
    end_time,
    room,
    subject,
  } = req.body;

  try {
    // Check for overlapping sessions
    const overlappingSessions = await Session.find({
      date: new Date(date),
      room,
      $or: [
        {
          $and: [
            { start_time: { $lte: start_time } },
            { end_time: { $gte: start_time } },
          ],
        },
        {
          $and: [
            { start_time: { $lte: end_time } },
            { end_time: { $gte: end_time } },
          ],
        },
      ],
    });

    if (overlappingSessions.length > 0) {
      return res.status(409).json({
        message:
          "Cette plage horaire est déjà réservée pour une autre séance qui chevauche celle-ci.",
        overlappingSessions,
      });
    }

    // Create a new session if no conflicts are found
    const newSession = await Session.create({
      professor_id,
      class: className,
      date: new Date(date),
      start_time,
      end_time,
      room,
      subject,
    });
    res.json(newSession);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
