const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  dateTime: { type: Date },
});

const TransactionModel = mongoose.model("Transaction", TransactionSchema);

module.exports = TransactionModel;
