const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://ashishksahu9002:UF2VUXrXgnqte9q3@dev.usbbtrp.mongodb.net/cloneDevTinder"
  );
};

module.exports = connectDB