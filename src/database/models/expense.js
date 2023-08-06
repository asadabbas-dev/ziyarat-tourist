"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Expense extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Expense.belongsTo(models.Currency, { foreignKey: "currencyId" });
      Expense.belongsTo(models.Country, { foreignKey: "countryId" });
      // One expense has belongs to one country
    }
  }
  Expense.init(
    {
      item: DataTypes.STRING,
      purchaseDate: DataTypes.DATE,
      quantity: DataTypes.STRING,
      description: DataTypes.STRING,
      currencyId: DataTypes.INTEGER,
      countryId: DataTypes.INTEGER,
      isActive: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Expense",
    }
  );
  return Expense;
};
