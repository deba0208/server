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

  console.log("db connect");
}).catch((err) => {
  console.log(err);
});

const authentication = (req, res, next) => {
  const auHeader = req.headers.authentication;
  console.log(auHeader);
  if (auHeader) {
    next();
  } else {
    res.json({ message: "authentication failed" });
  }
}
const component = (body) => {
  const comp = body.split(",");
  const newComps = {
    co2: Number(comp[0]),
    co: Number(comp[1]),
    nh4: Number(comp[2]),
    pm25: Number(comp[3]),
    TVOC: Number(comp[4]),
    AQI: Number(comp[5]),
    Temperature: Number(comp[6]),
    Humidity: Number(comp[7]),
  }
  return newComps;
}
// app.get("/data", (req, res) => {
//   fs.readFile("new.json", "utf-8", (err, data) => {
//     if (err) throw err;
//     res.status(200).json(JSON.parse(data));
//   });
// });

// app.post("/data", (req, res) => {
//   {
//     const creatNewEntry = {
//       id: Math.floor(Math.random() * 1000000),
//       date: req.body,
//     };
//     fs.readFile("new.json", "utf-8", (err, data) => {
//       if (err) throw err;
//       const entry = JSON.parse(data);
//       entry.push(creatNewEntry);
//       fs.writeFile("new.json ", JSON.stringify(entry), (err) => {
//         if (err) throw err;
//         res.send(creatNewEntry);
//       });
//     });
//   } // else {
//   //   res.send("Error");
//   // }
//   // Process the data as needed
// });
app.get("/data", async (req, res) => {
  try {
    const data = await Data.find();
    console.log(data);
    res.json(data);

  } catch (error) {
    res.status(500).send(error.message);
  }
})
app.post("/data", authentication, async (req, res) => {
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
