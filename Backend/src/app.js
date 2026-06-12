const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session")
const passport = require("passport")

const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);
 
app.use(
  passport.initialize()
);

 
app.use("/api/auth", authRoutes);

module.exports = app;