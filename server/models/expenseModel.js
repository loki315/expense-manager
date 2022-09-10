const mongoose = require("mongoose");
const validator = require("validator");

const ExpenseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Transaction name is required"],
    },
    amount: {
      type: Number,
      required: [true, "Transaction amount is required"],
      min: [0, "Amount cannot be negative"],
    },
    date: {
      type: Date,
      default: Date.now(),
    },
    category: {
      type: String,
      required: [true, "Transaction category is required"],
      enum: ["Food", "Transportation", "Entertainment", "Other"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      // type: String,
      ref: "user-data",
    },
  },
  { collection: "expenses" }
);

ExpenseSchema.pre("aggregate", function (next) {
  next();
});

const Expense = mongoose.model("expense-data", ExpenseSchema);

module.exports = Expense;
