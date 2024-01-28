const mongoose = require("mongoose");
const { Schema } = mongoose;

const ledgerSchema = new Schema(
  {
    account_name: { type: String, required: true },
    transactionIds: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Transaction" },
    ],
    // userId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ledger", ledgerSchema);
