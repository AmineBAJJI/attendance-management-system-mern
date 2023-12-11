const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 8080;
const app = express();
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const { authMiddleware } = require("./middlewares/authMiddleware");
const cors = require("cors");
//mongodb connection
connectDB();

//middlewares
const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));  // Use cors middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(authRoutes);
app.use(cookieParser());

app.get("/", function (req, res) {
  res.send("hello");
});

app.listen(port, () => {
  console.log(
    `Server Running in ${process.env.NODE_MODE} Mode on port ${process.env.PORT}`
  );
});
