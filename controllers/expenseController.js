const catchAsync = require("../utils/catchAsync");
const Expense = require("../models/expenseModel");
const factory = require("./handleFactory");
const ObjectID = require("mongodb").ObjectID;

exports.createExpense = factory.createOne(Expense);
exports.getOneExpenses = factory.getAll(Expense);
exports.deleteExpense = factory.deleteOne(Expense);

exports.getAll = catchAsync(async (req, res, next) => {
  const docs = await Expense.aggregate([
    {
      $match: {
        user: new ObjectID(req.params.id),
      },
    },
    {
      $group: {
        _id: "$category",
        amount: { $sum: "$amount" },
      },
    },
    {
      $project: {
        _id: 0,
        category: "$_id",
        amount: 1,
      },
    },
  ]);

  res.status(200).json({
    success: true,
    data: {
      docs,
    },
  });
});
