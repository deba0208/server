// server.js
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require("cors");
const mongoose = require("mongoose");

const { title } = require("process");
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());
const Data = require("./Models/data");
const username = "dasbabai2017";
const password = "EyVc7dHpN9gtrzxa";
mongoose.connect(`mongodb+srv://${username}:${password}@allcomponantvalue.226u6wj.mongodb.net/`, {
  dbName: "AQI",

}).then((result) => {

  // console.log("db connect");
}).catch((err) => {
  console.log(err);
});

const authentication = (req, res, next) => {
  const auHeader = req.headers.authentication;
  // console.log(auHeader);
  if (auHeader) {
    next();
  } else {
    res.json({ message: "authentication failed" });
  }
}

const currentDate = () => {
  // Get current date
  const currentDate = new Date();

  // Get individual date components
  const hours = String(currentDate.getHours()).padStart(2, '0'); // Add leading zero if necessary
  const minutes = String(currentDate.getMinutes()).padStart(2, '0'); // Add leading zero if necessary
  const seconds = String(currentDate.getSeconds()).padStart(2, '0'); // Add leading zero if necessary
  const day = String(currentDate.getDate()).padStart(2, '0'); // Add leading zero if necessary
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Add leading zero if necessary (months are zero-based)
  const year = String(currentDate.getFullYear()); // Get last two digits of year

  // Create formatted date string
  const formattedDate = `${hours}:${minutes}:${seconds} ${day}:${month}:${year}`;

  return formattedDate;

}
app.get("/data", async (req, res) => {
  try {
    const data = await Data.find();
    // console.log(data);
    res.json(data);

  } catch (error) {
    res.status(500).send(error.message);
  }
})
app.post("/data", async (req, res) => {
  try {
    const { co2, co, pm25, nh4, TVOC, AQI, Temperature, Humidity } = req.body;
    // console.log(req.body);
    const time = currentDate();
    const newEntry = new Data({ time, co2, co, pm25, nh4, TVOC, Temperature, Humidity });

    // console.log(req.body);
    // const value = component(req.body);
    // const newEntry = new Data(value);
    await newEntry.save();
    res.status(200).json({ message: "new entry successfully" });
  } catch (error) {
    res.status(500).send(error.message);
  }
})
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
