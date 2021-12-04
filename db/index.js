const mongoose = require("mongoose");
require("dotenv").config();

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(process.env.DB, options)
  .then(() => console.log("Can use DB"))
  .catch((err) => console.log(err));