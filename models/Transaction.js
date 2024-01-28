const mongoose = require("mongoose");
const { Schema } = mongoose;

const transactionSchema = new Schema(
  {
    debit: {
      account_name: { type: String, required: true },
      account_type: { type: String, required: true },
      amount: { type: Number, required: true },
    },
    credit: {
      account_name: { type: String, required: true },
      account_type: { type: String, required: true },
      amount: { type: Number, required: true },
    },
    description: {
      type: String,
      required: true,
    },
    // userId: {
    //   type: String,
    //   required: true,
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
