const Ledger = require("../models/Ledger");
const Transaction = require("../models/Transaction");

const createLedger = async (req, res) => {
  console.log(req.body);
  try {
    const ledger = await Ledger.create(req.body);
    return res.status(201).json(ledger);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "bad request" });
  }
};

const getAllLedger = async (req, res) => {
  try {
    const allLedger = await Ledger.find({}).populate("transactionIds");
    return res.status(200).json(allLedger);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "bad request" });
  }
};

const updateLedger = async (req, res) => {
  const { id } = req.params;
  try {
    const ledger = await Ledger.findById(id);
    const transactions = await Transaction.find({
      $or: [
        { "debit.account_name": ledger.account_name },
        { "credit.account_name": ledger.account_name },
      ],
    });

    let newTransactions = [];

    transactions.map((entry) => {
      // let newId;
      // ledger.transactionIds.map((transId) => {
      //   if (entry._id.toString() !== transId.toString()) {
      //     newId = entry._id;
      //   }
      //   console.log(entry._id.toString() == transId.toString());
      // });
      newTransactions.push(newId);
    });

    const newObj = {
      account_name: ledger.account_name,
      transactionIds: newTransactions,
    };
    if (newTransactions.length !== 0) {
      const newLedger = await Ledger.findByIdAndUpdate(id, newObj);
      return res.status(200).json(newLedger);
    }

    // console.log(newLedger); 
    return res.status(200).json({ msg: "already updated." }); 

    // console.log("arr", newTransactions);
    // transactions.map((entry) => console.log("", entry._id));
    // ledger.transactionIds.map((entry) => console.log("old", entry._id));
    // // console.log(transactions.length, ledger.transactionIds.length);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Bad Request" });
  }
};

const deleteLedger = async (req, res) => {
  const { id } = req.params;
  try {
    const ledger = await Ledger.findByIdAndDelete(id);
    return res.status(200).json(ledger);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Bad Request" });
  }
};

module.exports = {
  getAllLedger,
  createLedger,
  updateLedger,
  deleteLedger,
};
