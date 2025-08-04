"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("waste_usage", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      report_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      waste_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      unit_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      treatment: {
        type: Sequelize.ENUM(
          "Recycled",
          "Combustion",
          "Composting",
          "Landfill"
        ),
        allowNull: false,
      },
      activity_data: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      emissions: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
    });

    await queryInterface.addIndex("waste_usage", ["report_id"]);
    await queryInterface.addIndex("waste_usage", ["report_id", "waste_id"], {
      unique: true,
      name: "waste_usage_report_waste",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("waste_usage");
  },
};
