const { Op } = require("sequelize");
const db = require("../database/models");
const { Tourist, Country, TouristAmount } = require("../database/models");

const addTouristAmount = async (req, res) => {
  try {
    let {
      tourId,
      currencyId,
      totalAmountInUsd,
      totalAmountInRupees,
      receivedAmountInUsd,
      receivedAmountInRupees,
      touristId,
    } = req.body;

    const touristAmountObj = {
      tourId,
      currencyId,
      totalAmountInUsd,
      totalAmountInRupees,
      receivedAmountInUsd,
      receivedAmountInRupees,
      touristId,
    };

    const touristAmount = await TouristAmount.create(touristAmountObj);
    res.status(201).json({
      data: touristAmount,
      message: "tourist amount added successfully",
      status: "success",
    });
  } catch (error) {
    console.error("error saving:", error);
    res.status(500).json({
      data: null,
      message: "internal server error i.e. " + error,
      status: "error",
    });
  }
};

const updateTouristAmount = async (req, res) => {
  const id = req.params.id;
  let {
    tourId,
    currencyId,
    totalAmountInUsd,
    totalAmountInRupees,
    receivedAmountInUsd,
    receivedAmountInRupees,
    touristId,
  } = req.body;

  const existingEntity = await TouristAmount.findByPk(id);
  if (!existingEntity) {
    return res.status(404).json({ error: "record not found" });
  }

  const result = await TouristAmount.update(
    {
      tourId: tourId,
      currencyId: currencyId,
      totalAmountInUsd: totalAmountInUsd,
      totalAmountInRupees: totalAmountInRupees,
      receivedAmountInUsd: receivedAmountInUsd,
      receivedAmountInRupees: receivedAmountInRupees,
      touristId: touristId,
    },
    {
      where: {
        id: id,
      },
    }
  );

  res.status(201).json({
    data: result,
    message: "record updated successfully",
    status: "success",
  });
};

module.exports = {
  addTouristAmount,
  updateTouristAmount,
};
