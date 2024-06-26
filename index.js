// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const moment = require("moment-timezone");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
const Data = require("./Models/data");
const mongoUrl = process.env.MONGO_URI;
const { eCalculation } = require("./function/ieiCalculation");
mongoose
  .connect(mongoUrl, {
    dbName: process.env.dbName,
  })
  .then(() => { })
  .catch((err) => {
    console.log(err);
  });

const authentication = (req, res, next) => {
  const auHeader = req.headers.authentication;
  // console.log(auHeader);
  if (auHeader.split(" ")[1] === "123456789") {
    next();
  } else {
    res.json({ message: "authentication failed" });
  }
};

const currentDate = () => {
  // Get current date
  const currentDate = new Date();

  // Get individual date components
  // const hours = String(currentDate.getHours()).padStart(2, "0"); // Add leading zero if necessary
  // const minutes = String(currentDate.getMinutes()).padStart(2, "0"); // Add leading zero if necessary
  // const seconds = String(currentDate.getSeconds()).padStart(2, "0"); // Add leading zero if necessary
  // const day = String(currentDate.getDate()).padStart(2, "0"); // Add leading zero if necessary
  // const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Add leading zero if necessary (months are zero-based)
  // const year = String(currentDate.getFullYear()); // Get last two digits of year

  // Create formatted date string
  const indiaTime = moment(currentDate).tz("Asia/Kolkata")
  const formattedDate = indiaTime.format("HH:mm:ss DD:MM:YYYY");

  return formattedDate;
};
app.get("/data", async (req, res) => {
  try {
    const data = await Data.find();
    // console.log(data);
    res.json(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
app.post("/data", async (req, res) => {
  try {
    const { co2, co, pm25, nh4, TVOC, AQI, Temperature, Humidity } = req.body;
    // console.log(req.body);
    const nh3 = nh4 * 0.944;
    const IEI = eCalculation(co2, co, pm25, nh3, TVOC, Temperature, Humidity);
    const time = currentDate();
    const newEntry = new Data({
      time,
      co2,
      co,
      pm25,
      nh3,
      TVOC,
      IEI,
      AQI,
      Temperature,
      Humidity,
      Room: "Room2"
    });

    // console.log(req.body);
    // const value = component(req.body);
    // const newEntry = new Data(value);
    await newEntry.save();
    res.status(200).json({ message: "new entry successfully" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
