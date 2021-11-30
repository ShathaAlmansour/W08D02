const userModel = require("./../../db/models/user");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
require("dotenv").config();

const register = async (req, res) => {
  const { email, password, role } = req.body;

  const SALT = Number(process.env.SALT);
  const savedEmail = email.toLowerCase();
  const hashedPassword = await bcrypt.hash(password, SALT);
  const newUser = new userModel({
    email: savedEmail,
    password: hashedPassword,
    role,
  });

  newUser
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const login = (req, res) => {
  const { email, password } = req.body;
  const SECRET_KEY = process.env.SECRET;
  const savedEmail = email.toLowerCase();

  userModel
    .findOne({ email: savedEmail })
    .then(async (result) => {
      if (result) {
        if (email == result.email) {


          const unhashPassword = await bcrypt.compare(
            password,
            result.password
          );

          if (unhashPassword) {
            const payload = {
              role: result.role,
            };
            const options = {
              expiresIn: "60m",
            };
            const token = await jwt.sign(payload, SECRET_KEY, options);

            res.status(200).json(result);
          } else {
            res.status(400).json("invalid email or password");
          }
        } else {
          res.status(400).json("invalid email or password");
        }
      } else {
        res.status(400).json("email does not exist");
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports = { register, login };
