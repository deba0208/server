const iciCalculation = (Temperature, Humidity) => {
    const tempRange = [20, 25]
    const humiRange = [30, 60]
    const tempN = Math.abs(Temperature - tempRange[0]) / (tempRange[1] - tempRange[0]);
    const humiN = Math.abs(Humidity - humiRange[0]) / (humiRange[1] - humiRange[0]);
    const ICI = (tempN + humiN) / 2;
    return ICI;
}

const iapiCalculation = (co2, co, pm25, TVOC, nh3) => {
    const pm25Range = [0, 40]
    const nh3Range = [0, 5]
    const coRange = [0, 9]
    const co2Range = [400, 1200]
    const tvocRange = [0, 1000]
    const co2N = Math.abs(co2 - co2Range[0]) / (co2Range[1] - co2Range[0]);
    const coN = Math.abs(co - coRange[0]) / (coRange[1] - coRange[0]);
    const pm25N = Math.abs(pm25 - pm25Range[0]) / (pm25Range[1] - pm25Range[0]);
    const tvocN = Math.abs(TVOC - tvocRange[0]) / (tvocRange[1] - tvocRange[0]);
    const nh3N = Math.abs(nh3 - nh3Range[0]) / (nh3Range[1] - nh3Range[0]);
    const IAPI = (co2N + coN + pm25N + tvocN + nh3N) / 5;
    return IAPI;
}


const eCalculation = (co2, co, pm25, nh3, TVOC, Temperature, Humidity) => {
    const ICI = iciCalculation(Temperature, Humidity);
    const IAPI = iapiCalculation(co2, co, pm25, TVOC, nh3);
    const IEI = 10 * (ICI + IAPI) / 2;
    console.log(IEI);
    return IEI;
}

module.exports = { eCalculation };