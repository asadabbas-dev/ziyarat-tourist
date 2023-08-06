"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Country extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Country.hasMany(models.Expense, { foreignKey: "countryId" });
      Country.belongsTo(models.Currency, { foreignKey: "currencyId" });

      Country.belongsToMany(models.Tour, {
        through: models.TourCountry,
        foreignKey: "countryId",
        otherKey: "tourId",
        as: "tours",
      });
    }
  }
  Country.init(
    {
      name: DataTypes.STRING,
      currencyId: DataTypes.INTEGER,
      isActive: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Country",
    }
  );
  return Country;
};
