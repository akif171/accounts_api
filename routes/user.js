const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { createUser, userLogin, userLogout } = require("../controllers/user");
const jwt = require("jsonwebtoken");

router.post("/register", createUser);
router.post("/login", userLogin);
router.post("/logout", userLogout);

module.exports = router;
