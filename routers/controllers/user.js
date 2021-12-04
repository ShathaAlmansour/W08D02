const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const usersModel = require("./../../db/models/user");

const SALT = Number(process.env.SALT);
const SECRET = process.env.SECRETKEY;

const register = async (req, res) => {
  const { email, password, role } = req.body;

  const savedEmail = email.toLowerCase();
  const savedPassword = await bcrypt.hash(password, SALT);

  const newUser = new usersModel({
    email: savedEmail,
    password: savedPassword,
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

const logIn = (req, res) => {
  const { email, password } = req.body;

  const savedEmail = email.toLowerCase();

  usersModel
    .findOne({ email: savedEmail })
    .then(async (result) => {
      if (result) {
        if (result.email === savedEmail) {
          const savedPassword = await bcrypt.compare(password, result.password);

          if (savedPassword) {
            const payload = {
              role: result.role,
            };

            const options = {
              expiresIn: "60m",
            };

            const token = await jwt.sign(payload, SECRET, options);

            res.status(200).json({ result, token });
          } else {
            res.status(400).json("invalid email or password");
          }
        } else {
          res.status(400).json("invalid email or password");
        }
      } else {
        res.status(404).json("email dose not exist");
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports = { register, logIn };
