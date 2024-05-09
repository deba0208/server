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
    const newEntry = new Data({ co2, co, pm25, nh4, TVOC, Temperature, Humidity });

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
