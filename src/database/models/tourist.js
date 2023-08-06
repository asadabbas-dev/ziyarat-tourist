"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tourist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Tourist.belongsTo(models.User, { foreignKey: "userId" });
      Tourist.hasMany(models.TouristAmount, { foreignKey: "touristId" });
    }
  }
  Tourist.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      cnic: DataTypes.STRING,
      age: DataTypes.INTEGER,
      address: DataTypes.STRING,
      phone: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      tourId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Tourist",
    }
  );
  return Tourist;
};
