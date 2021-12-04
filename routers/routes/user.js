const express = require("express");

const { register, logIn } = require("./../controllers/user");

const usersRouter = express.Router();

usersRouter.post("/register", register);
usersRouter.post("/logIn", logIn);

module.exports = usersRouter;