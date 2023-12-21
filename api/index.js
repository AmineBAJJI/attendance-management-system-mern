const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 8080;
const app = express();
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const studentRoutes = require("./routes/studentRoutes");
const cookieParser = require("cookie-parser");
const { authMiddleware } = require("./middlewares/authMiddleware");






//mongodb connection
connectDB();


app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use("/api", authRoutes);
app.use("/api", sessionRoutes);


app.get("/", function (req, res) {
  res.send("hello");
});

app.listen(port, () => {
  console.log(
    `Server Running in ${process.env.NODE_MODE} Mode on port ${process.env.PORT}`
  );
});
