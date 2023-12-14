const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/signup", authController.signup_post);
router.post("/api/login", authController.login_post);
router.post("/api/logout", authController.logout_get);

module.exports = router;
