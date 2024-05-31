const mongoose = require("mongoose");


const componentSchema = new mongoose.Schema({

    time: {
        type: String,
        require: true
    },
    co2: {
        type: Number,
        require: true
    },

    co: {
        type: Number,
        require: true
    },
    pm25: {
        type: Number,
        require: true
    },

    nh3: {
        type: Number,
        require: true
    },
    IEI: {
        type: Number,
        require: true,
    },

    AQI: {
        type: Number,
        require: true
    },
    TVOC: {
        type: Number,
        require: true
    },

    Temperature: {
        type: Number,
        require: true
    },
    Humidity: {
        type: Number,
        require: true
    },
    Room: {
        type: String,
        require: true
    }


});

const componentModel = mongoose.model("data2", componentSchema);


module.exports = componentModel; 
