"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("TouristAmounts", "updatedAt", {
      allowNull: true,
      type: Sequelize.DataTypes.DATE,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("TouristAmounts", "updatedAt", {
      allowNull: true,
      type: Sequelize.DataTypes.DATE,
    });
  },
};
