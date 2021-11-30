const mongoose = require("mongoose");
require("dotenv").config();

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(`${process.env.DB}`, options, () => {
  try {
    console.log("DB Can Use");
  } catch (error) {
    console.error(error);
  }
});