const express = require("express");
const authController = require("../controllers/authController");
const expenseController = require("../controllers/expenseController");

const router = express.Router();

router.post("/create", expenseController.createExpense);
router.get("/getOne/:id", expenseController.getOneExpenses);
router.delete("/delete/:id", expenseController.deleteExpense);
router.get("/getAll/:id", expenseController.getAll);

module.exports = router;
