const { default: mongoose } = require("mongoose");

const connectDB = async (url) => {
  await mongoose
    .connect(url)
    .then(() => {
      console.log("DB Connected...");
    })
    .catch(() => {
      console.log("DB Connection Failed !!");
    });
};

module.exports = connectDB;
