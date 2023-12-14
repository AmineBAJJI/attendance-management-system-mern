const Session = require("../models/Session");
const jwt = require("jsonwebtoken");

module.exports.getSubjectsByDate = async (req, res) => {
  const { date } = req.params;

  try {
    const sessions = await Session.find({
      date: new Date(date),
    });
    if (sessions.length === 0) {
      return res
        .status(404)
        .json({ message: "Pas de séances dans cette date pour vous." });
    }
    const subjects = [...new Set(sessions.map((session) => session.subject))];
    res.json({ subjects });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.testRoute = async (req, res) => {
  console.log("Reached testRoute controller");
  res.status(200).json({ message: "Test route works!" });
};

module.exports.getSessionByDateAndSubject = async (req, res) => {
  const { date, subject } = req.params;
  const decodedSubject = decodeURIComponent(subject);

  try {
    const token = req.cookies.jwt;
    console.log("Token:", token);
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decodedToken);

    const { id: userId, role } = decodedToken;

    if (role !== "professor") {
      return res.status(403).json({
        message: "Vous n'avez pas les droits nécessaires.",
      });
    }

    const sessions = await Session.find({
      date: new Date(date),
      subject: decodedSubject,
      professor_id: userId,
    });
    console.log(new Date(date));

    if (sessions.length === 0) {
      return res
        .status(404)
        .json({ message: "Pas de séances dans cette date pour vous." });
    }

    res.json(sessions);
  } catch (error) {
    console.error("Error:", error); // Add this line to log any errors

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

module.exports.getSessionByDateAndSubject = async (req, res) => {
  const { date, subject } = req.params;
  const decodedSubject = decodeURIComponent(subject);

  try {
    const token = req.cookies.jwt;
    console.log("Token:", token);

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decodedToken);

    const { id: userId, role } = decodedToken;

    if (role !== "professor") {
      return res.status(403).json({
        message: "Vous n'avez pas les droits nécessaires.",
      });
    }

    const sessions = await Session.find({
      date: new Date(date),
      subject: decodedSubject,
      professor_id: userId,
    });

    if (sessions.length === 0) {
      return res
        .status(404)
        .json({ message: "Pas de séances dans cette date pour vous." });
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
