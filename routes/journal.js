const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");
const { getAllEntries, createEntry } = require("../controllers/journal");

router.get("/", getAllEntries);

router.post("/", createEntry);

module.exports = router;
