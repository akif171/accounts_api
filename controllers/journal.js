const Transaction = require("../models/Transaction");

const getAllEntries = async (req, res) => {
  const { account } = req.query;
  console.log(account);

  let transactions;
  try {
    if (account) {
      transactions = await Transaction.find({
        $or: [
          { "debit.account_name": account },
          { "credit.account_name": account },
        ],
      });
    }
    else{

      transactions = await Transaction.find({});
    }


    return res.status(200).json(transactions);
  } catch (error) {
    console.log(error);

    return res.status(500).json({ msg: "Bad Request." });
  }
};

const createEntry = async (req, res) => {
  console.log(req.body);
  try {
    const transaction = await Transaction.create(req.body);

    return res.status(201).json({ transaction });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "bad request" });
  }
};

module.exports = {
  getAllEntries,
  createEntry,
};
