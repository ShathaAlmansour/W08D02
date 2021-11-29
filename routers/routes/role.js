const express = require("express")
const {createRole,allRoles} = require("../controllers/role");

const roleRouter = express.Router();

roleRouter.post("/createRole", createRole);
roleRouter.get("/allRoles", allRoles);

module.exports = roleRouter;