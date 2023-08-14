"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TouristAmount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TouristAmount.belongsTo(models.Currency, { foreignKey: "currencyId" });
      TouristAmount.belongsTo(models.Tour, { foreignKey: "tourId" });
      TouristAmount.belongsTo(models.Tourist, { foreignKey: "touristId" });
    }
  }
  TouristAmount.init(
    {
      tourId: DataTypes.INTEGER,
      currencyId: DataTypes.INTEGER,
      totalAmountInUsd: DataTypes.FLOAT,
      totalAmountInRupees: DataTypes.FLOAT,
      receivedAmountInUsd: DataTypes.FLOAT,
      receivedAmountInRupees: DataTypes.FLOAT,
      touristId: DataTypes.INTEGER,
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      paranoid: true,
      modelName: "TouristAmount",
    }
  );
  return TouristAmount;
};
