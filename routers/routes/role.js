const express = require("express");

const { createRole, getRole } = require("./../controllers/role");

const rolesRouter = express.Router();

rolesRouter.post("/createRole", createRole);
rolesRouter.get("/getRole", getRole);

module.exports = rolesRouter;