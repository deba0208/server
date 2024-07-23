// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

const mongoUrl = process.env.MONGO_URI;
const dataRoutes = require("./Router/dataRouter");
const googleRouter = require("./Router/googleRouter");
mongoose
  .connect(mongoUrl, {
    dbName: process.env.dbName,
  })
  .then(() => {})
  .catch((err) => {
    console.log(err);
  });

app.use("/data", dataRoutes);
app.use("/auth", googleRouter);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
