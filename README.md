# W08D02

## The packages used
1- npm i express (To build a backend server)

1- npm i cors (The benefit in it when using Front End)

1- npm i dotenv (To hide some sensitive things)

1- npm i jsonwebtoken (It contains 3 items and can only be changed on paylad)

1- npm i mongoose (To create the database)

1- npm i bcrypt (Password encryption)

1- npm i nodmone (globe)

## models-roleSchema
const mongoose = require("mongoose");
const role = new mongoose.Schema({
  role: { type: String, required: true },
  permissions: { type: Array, required: true },
});
module.exports = mongoose.model("Role", role);

 ## models-userSchema
const mongoose = require("mongoose");
const user = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
});
module.exports = mongoose.model("User", user);

## routers-controllers-role
const rolemodel = require("../../db/models/role");

const newrolr =(req,res)=>{ const {role,permossion}=req.body;

const newrolr = new rolemodel({
    role,
    permossion,

});
newrolr
.save()
.then((result)=>{
    res.json(result);

})
.catch((err)=>{
   res.status(err)
})
}

const getrole = (req, res)=>{ rolemodel .find({}) .then(result=>{ res.json(result);

})
.catch((err)=>{
 res.json(err);
})
}

module.exports = {newrolr,getrole}

## routers-controllers-user
const userModel = require("./../../db/models/user");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

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
  const SECRET_KEY = process.env.SECRET_KEY;
  userModel
    .findOne({ email })
    .then(async (result) => {
      if (result) {
        if (email === result.email) {
          const payload = {
            role: result.role,
          };

          const options = {
            expiresIn: "60m",
          };

          const token = await jwt.sign(payload, SECRET_KEY, options);
          console.log(token);

          const unhashPassword = await bcrypt.compare(
            password,
            result.password
          );

          if (unhashPassword) {
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

## routers-routes-role

const express = require("express");
const { createRole, roles } = require("./../controllers/role");

const roleRouter = express.Router();

roleRouter.post("/createrole", createRole);
roleRouter.get("/roles", roles);

module.exports = roleRouter;

## routers-routes-user
const express = require("express");
const { register, login } = require("./../controllers/user");
const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);

module.exports = userRouter;
