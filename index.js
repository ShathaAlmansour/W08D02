const express = require("express");
require("dotenv").config();
const cors = require("cors");
require("./db");
const app = express();

app.use(express.json());
app.use(cors());
