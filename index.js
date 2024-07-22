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
const dataRoutes = require("./Router/dataRouter")
mongoose
  .connect(mongoUrl, {
    dbName: process.env.dbName,
  })
  .then(() => { })
  .catch((err) => {
    console.log(err);
  });


app.use("/data", dataRoutes)

// app.get("/data", async (req, res) => {
//   try {
//     const data = await Data.find();
//     // console.log(data);
//     res.json(data);
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// });
// app.post("/data", async (req, res) => {
//   try {
//     const { co2, co, pm25, nh4, TVOC, AQI, Temperature, Humidity } = req.body;
//     // console.log(req.body);
//     const nh3 = nh4 * 0.944;
//     const IEI = eCalculation(co2, co, pm25, nh3, TVOC, Temperature, Humidity);
//     const time = currentDate();
//     const newEntry = new Data({
//       time,
//       co2,
//       co,
//       pm25,
//       nh3,
//       TVOC,
//       IEI,
//       AQI,
//       Temperature,
//       Humidity,
//       Room: "Room2"
//     });
//     await newEntry.save();
//     res.status(200).json({ message: "new entry successfully" });
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// });
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
