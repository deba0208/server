const express = require("express");
const router = express.Router();
const { componentModel } = require("../Models/data");
const { eCalculation } = require("../function/ieiCalculation");
const { currentData } = require("../function/currentData");

router.get("/", async (req, res) => {
  try {
    const data = await componentModel.find();
    // console.log(data);
    res.json(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
router.post("/", async (req, res) => {
  try {
    const { co2, co, pm25, nh4, TVOC, AQI, Temperature, Humidity } = req.body;
    // console.log(req.body);
    const nh3 = nh4 * 0.944;
    const IEI = eCalculation(co2, co, pm25, nh3, TVOC, Temperature, Humidity);
    const time = currentData();
    const newEntry = new componentModel({
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
      Room: "Room2",
    });
    await newEntry.save();
    res.status(200).json({ message: "new entry successfully" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
