"use strict";
const { ENUM } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("generators", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      report_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      year: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      type: {
        type: ENUM("generator", "vehicle"),
        allowNull: false,
      },
      fuel_type: { type: ENUM("diesel", "petrol", "gas"), allowNull: false },
      number: { type: Sequelize.INTEGER, allowNull: false },
      activity_data: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      emissions: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
    });

    await queryInterface.addIndex("generators", ["report_id"]);
    await queryInterface.addIndex(
      "generators",
      ["report_id", "type", "fuel_type"],
      {
        unique: true,
        name: "unique_report_type_fuel",
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("generators");
  },
};
