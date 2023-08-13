const express = require("express");
const touristRouter = express.Router();
const touristController = require("../controllers/TouristController");
const { authentication } = require("../middlewares/auth.middleware");

touristRouter
  .route("/createTourist")
  .post([authentication], touristController.createTourist);

touristRouter
  .route("/updateTourist/:id")
  .put([authentication], touristController.updateTourist);

touristRouter
  .route("/deleteTourist/:id")
  .delete([authentication], touristController.deleteTourist);

touristRouter
  .route("/getTourist/:id")
  .get([authentication], touristController.getByTouristId);

touristRouter
  .route("/getTourist")
  .get([authentication], touristController.getTourists);

module.exports = {
  touristRouter,
};
