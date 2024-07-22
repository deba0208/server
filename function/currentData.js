const currentDate = () => {
    // Get current date
    const currentDate = new Date();
    const indiaTime = moment(currentDate).tz("Asia/Kolkata")
    const formattedDate = indiaTime.format("HH:mm:ss DD:MM:YYYY");

    return formattedDate;
};

module.exports = { currentDate };