const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const session = require("express-session");
require("dotenv").config();
require("./Config/passport-setup");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
// app.use(
//   cookieSession({
//     name: "session",
//     keys: ["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"],
//     maxAge: 24 * 60 * 60 * 1000,
//   })
// );
app.use(
  session({
    secret: "YOUR SECRET KEY",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

const mongoUrl = process.env.MONGO_URI;
const dataRoutes = require("./Router/dataRouter");
const googleRouter = require("./Router/googleRouter");

mongoose
  .connect(mongoUrl, {
    dbName: process.env.dbName,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.use("/data", dataRoutes);
app.use("/auth", googleRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
