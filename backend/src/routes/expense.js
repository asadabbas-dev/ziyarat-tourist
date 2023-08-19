const express = require("express");
const expenseRouter = express.Router();
const expenseController = require("../controllers/ExpenseController");
const { authentication } = require("../middlewares/auth.middleware");

module.exports = {
  expenseRouter,
};

expenseRouter
  .route("/create")
  .post([authentication], expenseController.expenseController);

expenseRouter
  .route("/update/:id")
  .post([authentication], expenseController.expenseController);
