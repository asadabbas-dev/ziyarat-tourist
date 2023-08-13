const express = require("express");
const touristAmountRouter = express.Router();
const touristAmountController = require("../controllers/TouristAmountController");
const { authentication } = require("../middlewares/auth.middleware");

touristRouter
  .route("/create")
  .post([authentication], touristController.createTourist);

touristRouter
  .route("/update/:id")
  .put([authentication], touristController.updateTourist);

touristRouter
  .route("/delete/:id")
  .delete([authentication], touristController.deleteTourist);

touristRouter
  .route("/getTouristAmount/:id")
  .get([authentication], touristController.getByTouristId);

touristRouter
  .route("/getTouristAmounts")
  .get([authentication], touristController.getTourists);
module.exports = {
  touristAmountRouter,
};
