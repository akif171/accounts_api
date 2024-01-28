const express = require("express");
const router = express.Router();
const Ledger = require("../models/Ledger");
const {
  getAllLedger,
  createLedger,
  updateLedger,
  deleteLedger,
} = require("../controllers/ledger");

router.post("/", createLedger);

router.get("/", getAllLedger);

router.put("/:id", updateLedger);

router.delete("/:id", deleteLedger);

module.exports = router;
